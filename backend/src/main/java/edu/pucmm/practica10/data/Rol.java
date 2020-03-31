package edu.pucmm.practica10.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class Rol implements Serializable {

    public static final String ROLE_USER = "ROLE_USER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;


    public Long getId() {
        return id;
    }

    public Rol setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Rol setName(String name) {
        this.name = name;
        return this;
    }
}
