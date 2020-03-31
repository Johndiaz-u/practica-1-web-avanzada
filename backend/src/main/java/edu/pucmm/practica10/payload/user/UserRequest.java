package edu.pucmm.practica10.payload.user;

import java.util.Set;

public class UserRequest {
    private Long id;

    private String name;

    private String username;

    private String password;

    private Set<String> roles;


    public Long getId() {
        return id;
    }

    public UserRequest setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public UserRequest setName(String name) {
        this.name = name;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public UserRequest setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public UserRequest setPassword(String password) {
        this.password = password;
        return this;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public UserRequest setRoles(Set<String> roles) {
        this.roles = roles;
        return this;
    }
}
