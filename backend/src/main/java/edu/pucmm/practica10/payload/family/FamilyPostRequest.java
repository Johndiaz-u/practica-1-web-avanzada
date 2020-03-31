package edu.pucmm.practica10.payload.family;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

public class FamilyPostRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String name;
    private Long parentId;
    @NotNull
    private Set<Long> equipments;

    public String getName() {
        return name;
    }

    public FamilyPostRequest setName(String name) {
        this.name = name;

        return this;
    }

    public Long getParentId() {
        return parentId;
    }

    public FamilyPostRequest setParentId(Long parentId) {
        this.parentId = parentId;

        return this;
    }

    public Set<Long> getEquipments() {
        return equipments;
    }

    public FamilyPostRequest setEquipments(Set<Long> equipments) {
        this.equipments = equipments;

        return this;
    }
}