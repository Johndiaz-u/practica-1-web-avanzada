package edu.pucmm.practica10.payload.family;

import javax.validation.constraints.Size;

public class FamilyRequest {

    @Size(min = 3, max = 20)
    private String name;

    public String getName() {
        return name;
    }

    public FamilyRequest setName(String name) {
        this.name = name;
        return this;
    }
}
