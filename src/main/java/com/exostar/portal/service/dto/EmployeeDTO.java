package com.exostar.portal.service.dto;

import com.exostar.portal.repository.dto.Employee;
import java.io.Serializable;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * A DTO representing a employee, with only the public attributes.
 */
@Builder(toBuilder = true)
public class EmployeeDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String firstName;

    private String lastName;

    private String employeeCode;

    private String email;

    private String address;

    private String fileName;

    private String starRating;

    private String city;

    private String state;

    private String zip;

    public EmployeeDTO() {
        // Empty constructor needed for Jackson.
    }

    public EmployeeDTO(Employee employee) {
        this.id = employee.getId();
        // Customize it here if you need, or not, firstName/lastName/etc
        this.employeeCode = employee.getEmployeeCode();
    }

    public EmployeeDTO(
        Long id,
        String firstName,
        String lastName,
        String employeeCode,
        String email,
        String address,
        String fileName,
        String starRating,
        String city,
        String state,
        String zip
    ) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeCode = employeeCode;
        this.email = email;
        this.address = address;
        this.fileName = fileName;
        this.starRating = starRating;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getStarRating() {
        return starRating;
    }

    public void setStarRating(String starRating) {
        this.starRating = starRating;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    @Override
    public String toString() {
        return (
            "EmployeeDTO [id=" +
            id +
            ", firstName=" +
            firstName +
            ", lastName=" +
            lastName +
            ", employeeCode=" +
            employeeCode +
            ", email=" +
            email +
            ", address=" +
            address +
            ", fileName=" +
            fileName +
            ", starRating=" +
            starRating +
            ", city=" +
            city +
            ", state=" +
            state +
            ", zip=" +
            zip +
            "]"
        );
    }
}
