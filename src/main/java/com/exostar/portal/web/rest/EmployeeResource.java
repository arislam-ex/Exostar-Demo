package com.exostar.portal.web.rest;

import com.exostar.portal.config.Constants;
import com.exostar.portal.domain.FileInfo;
import com.exostar.portal.domain.UploadItem;
import com.exostar.portal.domain.User;
import com.exostar.portal.repository.UserRepository;
import com.exostar.portal.repository.dto.Employee;
import com.exostar.portal.security.AuthoritiesConstants;
import com.exostar.portal.service.EmployeeService;
import com.exostar.portal.service.MailService;
import com.exostar.portal.service.UserService;
import com.exostar.portal.service.dto.AdminUserDTO;
import com.exostar.portal.service.dto.EmployeeDTO;
import com.exostar.portal.service.dto.UploadDTO;
import com.exostar.portal.web.rest.errors.BadRequestAlertException;
import com.exostar.portal.web.rest.errors.EmailAlreadyUsedException;
import com.exostar.portal.web.rest.errors.LoginAlreadyUsedException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;
import java.util.stream.Collectors;
import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/employee")
public class EmployeeResource {

    private static final List<String> ALLOWED_ORDERED_PROPERTIES = Collections.unmodifiableList(
        Arrays.asList(
            "id",
            "login",
            "firstName",
            "lastName",
            "email",
            "activated",
            "langKey",
            "createdBy",
            "createdDate",
            "lastModifiedBy",
            "lastModifiedDate"
        )
    );

    private final Logger log = LoggerFactory.getLogger(EmployeeResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserService userService;

    private final UserRepository userRepository;

    private final MailService mailService;

    private final EmployeeService employeeService;

    public EmployeeResource(
        UserService userService,
        EmployeeService uploadService,
        UserRepository userRepository,
        MailService mailService
    ) {
        this.userService = userService;
        this.employeeService = uploadService;
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getEmployees() {
        String message = "";
        try {
            List<Employee> list = employeeService.getAllEmployees();
            message = "Loaded Employees successfully: ";
            return ResponseEntity.status(HttpStatus.OK).body(list);
        } catch (Exception e) {
            message = "Could not upload the file: " + e.getMessage();
            return ResponseEntity.badRequest().build();
        }
    }

    @RequestMapping(value = "/{name}", method = RequestMethod.GET)
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<Employee>> getEmployeesByFileName(@PathVariable(value = "name") String fileName) {
        log.debug("REST request to get all User for a file");
        if (fileName == null) {
            return ResponseEntity.badRequest().build();
        }

        final List<Employee> list = employeeService.getAllEmployeesByFileName(fileName);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/fileUpload")
    public ResponseEntity<UploadDTO> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            employeeService.saveFile(file);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new UploadDTO(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new UploadDTO(message));
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<UploadDTO> uploadeEmployee(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            employeeService.saveFile(file);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new UploadDTO(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new UploadDTO(message));
        }
    }

    @GetMapping("/files")
    public ResponseEntity<List<FileInfo>> getListFiles() {
        List<FileInfo> fileInfos = employeeService
            .loadAll()
            .map(path -> {
                String filename = path.getFileName().toString();
                String url = MvcUriComponentsBuilder
                    .fromMethodName(EmployeeResource.class, "getFile", path.getFileName().toString())
                    .build()
                    .toString();

                return new FileInfo(filename, url);
            })
            .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = employeeService.load(filename);
        return ResponseEntity
            .ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
            .body(file);
    }

    @DeleteMapping("/files/{filename:.+}")
    public ResponseEntity<UploadDTO> deleteFile(@PathVariable String filename) {
        String message = "";

        try {
            boolean existed = employeeService.delete(filename);

            if (existed) {
                message = "Delete the file successfully: " + filename;
                return ResponseEntity.status(HttpStatus.OK).body(new UploadDTO(message));
            }

            message = "The file does not exist!";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new UploadDTO(message));
        } catch (Exception e) {
            message = "Could not delete the file: " + filename + ". Error: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UploadDTO(message));
        }
    }

    /**
     *
     * @param userDTO the user to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated user.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already in use.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is already in use.
     */
    @PutMapping("/employees")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<AdminUserDTO> updateUser(@Valid @RequestBody AdminUserDTO userDTO) {
        log.debug("REST request to update User : {}", userDTO);
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(userDTO.getId()))) {
            throw new EmailAlreadyUsedException();
        }
        existingUser = userRepository.findOneByLogin(userDTO.getLogin().toLowerCase());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(userDTO.getId()))) {
            throw new LoginAlreadyUsedException();
        }
        Optional<AdminUserDTO> updatedUser = userService.updateUser(userDTO);

        return ResponseUtil.wrapOrNotFound(
            updatedUser,
            HeaderUtil.createAlert(applicationName, "A user is updated with identifier " + userDTO.getLogin(), userDTO.getLogin())
        );
    }

    /**
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body all users.
     */
    @GetMapping("/employees")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<Employee>> getAllUsers(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get all User for an admin");
        if (!onlyContainsAllowedProperties(pageable)) {
            return ResponseEntity.badRequest().build();
        }

        final Page<Employee> page = employeeService.getAllManagedEmployees(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    private boolean onlyContainsAllowedProperties(Pageable pageable) {
        return pageable.getSort().stream().map(Sort.Order::getProperty).allMatch(ALLOWED_ORDERED_PROPERTIES::contains);
    }
}
