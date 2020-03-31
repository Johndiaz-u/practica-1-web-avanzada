package edu.pucmm.practica10.payload.roles;

import java.util.Set;

public class RolResponse {

    private Set<String> roles;

    public Set<String> getRoles() {
        return roles;
    }

    public RolResponse setRoles(Set<String> roles) {
        this.roles = roles;
        return this;
    }
}
