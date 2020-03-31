package edu.pucmm.practica10.payload.user;

import edu.pucmm.practica10.data.Rol;
import edu.pucmm.practica10.payload.client.ClientResponse;

import java.util.HashSet;
import java.util.Set;

public class UserResponse {

    private Long id;
    private String name;
    private String username;
    private String email;
    private ClientResponse client;
    private Set<String> roles;

    public Long getId() {
        return id;
    }

    public UserResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public UserResponse setName(String name) {
        this.name = name;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public UserResponse setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public UserResponse setEmail(String email) {
        this.email = email;
        return this;
    }

    public ClientResponse getClient() {
        return client;
    }

    public UserResponse setClient(ClientResponse client) {
        this.client = client;
        return this;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public UserResponse setRoles(Set<String> roles) {
        this.roles = roles;
        return this;
    }

    public UserResponse addRoles(Set<Rol> rol) {
        Set<String> roles = new HashSet<>();
        if (this.roles == null) {
            this.roles = new HashSet<>();
        }

       rol.forEach(e -> {
            roles.add(e.getName());
       });

        return this.setRoles(roles);
    }
}
