package edu.pucmm.practica10.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class SignUpRequest {
    @NotBlank
    @Size(min = 4, max = 40)
    private String name;

    @NotBlank
    @Size(min = 4, max = 40)
    private String lastName;

    @NotBlank
    @Size(min = 3, max = 15)
    private String username;

    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;

    @NotBlank
    @Size(min = 6, max = 20)
    private String cedula;

    public String getName() {
        return name;
    }

    public SignUpRequest setName(String name) {
        this.name = name;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public SignUpRequest setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public SignUpRequest setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public SignUpRequest setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getCedula() {
        return cedula;
    }

    public SignUpRequest setCedula(String cedula) {
        this.cedula = cedula;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public SignUpRequest setLastName(String lastName) {
        this.lastName = lastName;

        return this;
    }
}
