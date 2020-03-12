package edu.pucmm.practica10.data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
public class User implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String username;
    private String password;
    private String email;
    @OneToOne
    private Client client;
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Rol> roles;

    public Long getId() {
        return id;
    }

    public User setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public User setName(String name) {
        this.name = name;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public User setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public User setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public User setEmail(String email) {
        this.email = email;
        return this;
    }

    public Set<Rol> getRoles() {
        return roles;
    }

    public User setRoles(Set<Rol> roles) {
        this.roles = roles;
        return this;
    }

    public Client getClient() {
        return client;
    }

    public User setClient(Client client) {
        this.client = client;
        return this;
    }

    public User addRol(Rol rol) {
        if (this.roles == null) {
            this.roles = new HashSet<>();
        }
        this.roles.add(rol);

        return this;
    }
}
