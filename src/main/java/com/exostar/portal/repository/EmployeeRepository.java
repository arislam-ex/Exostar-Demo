package com.exostar.portal.repository;

import com.exostar.portal.repository.dto.Employee;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link Employee} entity.
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    String EMPLOYEES_BY_LOGIN_CACHE = "employeesByLogin";

    String EMPLOYEES_BY_EMAIL_CACHE = "employeesByEmail";
    Optional<Employee> findOneByFirstName(String firstName);
    Optional<Employee> findOneByLastName(String lastName);
    Optional<Employee> findOneByEmailIgnoreCase(String email);
    Optional<Employee> findOneByEmployeeCode(String employeeCode);
    List<Employee> findAllByFileName(String fileName);
}
