package edu.pucmm.practica10.payload.equipment;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class EquipmentRequest {

    private Long id;

    @NotBlank
    @Size(min = 1, max = 32)
    private String name;
    @NotNull
    @Min(value = 0L, message = "The value must be positive")
    private double fee;
    @NotNull
    @Min(value = 0L)
    private Long familyId;

    public Long getId() {
        return id;
    }

    public EquipmentRequest setId(Long id) {
        this.id = id;

        return this;
    }

    public String getName() {
        return name;
    }

    public EquipmentRequest setName(String name) {
        this.name = name;

        return this;
    }

    public double getFee() {
        return fee;
    }

    public EquipmentRequest setFee(double fee) {
        this.fee = fee;

        return this;
    }

    public Long getFamilyId() {
        return familyId;
    }

    public EquipmentRequest setFamilyId(Long familyId) {
        this.familyId = familyId;

        return this;
    }
}
