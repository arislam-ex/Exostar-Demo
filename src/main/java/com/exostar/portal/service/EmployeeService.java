package com.exostar.portal.service;

import com.exostar.portal.config.Constants;
import com.exostar.portal.domain.Authority;
import com.exostar.portal.domain.UploadItem;
import com.exostar.portal.domain.UploadMessage;
import com.exostar.portal.repository.AuthorityRepository;
import com.exostar.portal.repository.EmployeeRepository;
import com.exostar.portal.repository.PersistentTokenRepository;
import com.exostar.portal.repository.dto.Employee;
import com.exostar.portal.service.dto.AdminUserDTO;
import com.exostar.portal.service.dto.EmployeeDTO;
import com.opencsv.CSVReader;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

/**
 * Service class for managing employees.
 */
@Service
@Transactional
public class EmployeeService {

    private final Logger log = LoggerFactory.getLogger(EmployeeService.class);

    private final EmployeeRepository employeeRepository;

    private final PasswordEncoder passwordEncoder;

    private final PersistentTokenRepository persistentTokenRepository;

    private final AuthorityRepository authorityRepository;

    private final CacheManager cacheManager;

    private final Path root = Paths.get("uploads");

    private static final long MAX_UPLOAD_FILE_SIZE = 1000000;

    public EmployeeService(
        EmployeeRepository employeeRepository,
        PasswordEncoder passwordEncoder,
        PersistentTokenRepository persistentTokenRepository,
        AuthorityRepository authorityRepository,
        CacheManager cacheManager
    ) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
        this.persistentTokenRepository = persistentTokenRepository;
        this.authorityRepository = authorityRepository;
        this.cacheManager = cacheManager;
        init();
    }

    public void init() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    @Transactional(readOnly = true)
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll().stream().collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<Employee> getAllEmployeesByFileName(String fileName) {
        return employeeRepository.findAllByFileName(fileName).stream().collect(Collectors.toList());
    }

    public boolean saveFile(MultipartFile file) {
        try {
            log.info("----------------");
            String originalFilename = file.getOriginalFilename();
            log.info("Upload file name: " + originalFilename);
            log.info("Upload file size: " + file.getSize() + " bytes");
            int rowNumber = 0;
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
            UploadMessage errorMessage = new UploadMessage();
            CSVReader reader = null;
            try {
                reader = new CSVReader(new BufferedReader(new InputStreamReader(file.getInputStream(), "utf-8"), 64000));
                List<String[]> data = reader.readAll();
                byte[] bytes = file.getBytes();
                String completeData = new String(bytes);
                String[] rows = completeData.split("#");
                for (String[] columns : data) {
                    if (columns.length > 8) {
                        int counter = 0;
                        String firstName = columns[counter].trim();
                        String lastName = columns[++counter].trim();
                        String code = columns[++counter].trim();
                        String address = columns[++counter].trim();
                        String city = columns[++counter].trim();
                        String state = columns[++counter].trim();
                        String zip = columns[++counter].trim();
                        String email = columns[++counter].trim();
                        String rating = columns[++counter].trim();
                        EmployeeDTO employeeDTO = new EmployeeDTO();
                        employeeDTO.setFirstName(firstName);
                        employeeDTO.setLastName(lastName);
                        employeeDTO.setEmployeeCode(code);
                        employeeDTO.setAddress(address);
                        employeeDTO.setCity(city);
                        employeeDTO.setState(state);
                        employeeDTO.setZip(zip);
                        employeeDTO.setEmail(email);
                        employeeDTO.setStarRating(rating);
                        employeeDTO.setFileName(originalFilename);
                        employeeRepository.save(createEmployee(employeeDTO));
                    }
                }
            } catch (IOException ex) {
                log.error("IOException parsing csv: " + ex.getMessage(), ex);
            }
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }

            throw new RuntimeException(e.getMessage());
        }
        return true;
    }

    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }

    public boolean delete(String filename) {
        try {
            Path file = root.resolve(filename);
            return Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    public Employee createEmployee(EmployeeDTO employeeDTO) {
        Employee employee = new Employee();
        employee.setEmployeeCode(employeeDTO.getEmployeeCode().toLowerCase());
        employee.setFirstName(employeeDTO.getFirstName());
        employee.setLastName(employeeDTO.getLastName());
        if (employeeDTO.getEmail() != null) {
            employee.setEmail(employeeDTO.getEmail().toLowerCase());
        }
        employee.setAddress(employeeDTO.getAddress());
        employee.setEmail(employeeDTO.getEmail());
        employee.setCity(employeeDTO.getCity());
        employee.setState(employeeDTO.getState());
        employee.setZip(employeeDTO.getZip());
        if (employeeDTO.getStarRating() == null) {
            employee.setStarRating(employeeDTO.getStarRating()); // default language
        } else {
            employee.setStarRating(Constants.DEFAULT_RATING);
        }
        employee.setFileName(employeeDTO.getFileName());
        if (employee.getEmail() != null && employee.getFileName() != null) {
            employeeRepository.save(employee);
        }
        //this.clearEmployeeCaches(employee);
        log.debug("Created Information for Employee: {}", employee);
        return employee;
    }

    /**
     * Update all information for a specific employee, and return the modified employee.
     *
     * @param employeeDTO employee to update.
     * @return updated employee.
     */
    public Optional<EmployeeDTO> updateEmployee(EmployeeDTO employeeDTO) {
        return Optional
            .of(employeeRepository.findById(employeeDTO.getId()))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .map(employee -> {
                //this.clearEmployeeCaches(employee);
                employee.setEmployeeCode(employeeDTO.getEmployeeCode().toLowerCase());
                employee.setFirstName(employeeDTO.getFirstName());
                employee.setLastName(employeeDTO.getLastName());
                if (employeeDTO.getEmail() != null) {
                    employee.setEmail(employeeDTO.getEmail().toLowerCase());
                }
                return employee;
            })
            .map(EmployeeDTO::new);
    }

    public void deleteEmployee(String employeeCode) {
        employeeRepository
            .findOneByEmployeeCode(employeeCode)
            .ifPresent(employee -> {
                employeeRepository.delete(employee);
                //this.clearEmployeeCaches(employee);
                log.debug("Deleted Employee: {}", employee);
            });
    }

    @Transactional(readOnly = true)
    public Page<Employee> getAllManagedEmployees(Pageable pageable) {
        return employeeRepository.findAll(pageable);
    }
}
