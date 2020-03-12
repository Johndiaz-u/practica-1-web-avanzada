package edu.pucmm.practica10.payload.equipment;

import edu.pucmm.practica10.payload.family.FamilyResponse;

public class EquipmentResponse {

    private Long id;
    private String name;
    private double fee;
    private Boolean active;
    private FamilyResponse family;

    public Long getId() {
        return id;
    }

    public EquipmentResponse setId(Long id) {
        this.id = id;

        return this;
    }

    public String getName() {
        return name;
    }

    public EquipmentResponse setName(String name) {
        this.name = name;

        return this;
    }

    public double getFee() {
        return fee;
    }

    public EquipmentResponse setFee(double fee) {
        this.fee = fee;

        return this;
    }

    public Boolean getActive() {
        return active;
    }

    public EquipmentResponse setActive(Boolean active) {
        this.active = active;

        return this;
    }

    public FamilyResponse getFamily() {
        return family;
    }

    public EquipmentResponse setFamily(FamilyResponse family) {
        this.family = family;

        return this;
    }
}
