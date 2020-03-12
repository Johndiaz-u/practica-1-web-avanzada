package edu.pucmm.practica10.payload.family;

import edu.pucmm.practica10.data.Equipment;
import edu.pucmm.practica10.data.Family;
import edu.pucmm.practica10.payload.equipment.EquipmentResponse;

import java.util.HashSet;
import java.util.Set;

public class FamilyResponse {

    private Long id;

    private String name;

    private FamilyResponse parent;

    private Set<EquipmentResponse> equipments;

    private Set<FamilyResponse> subfamilies;

    public Long getId() {
        return id;
    }

    public FamilyResponse setId(Long id) {
        this.id = id;

        return this;
    }

    public String getName() {
        return name;
    }

    public FamilyResponse setName(String name) {
        this.name = name;

        return this;
    }

    public FamilyResponse getParent() {
        return parent;
    }

    public FamilyResponse setParent(FamilyResponse parent) {
        this.parent = parent;
        return this;
    }

    public Set<EquipmentResponse> getEquipments() {
        return equipments;
    }

    public FamilyResponse setEquipments(Set<EquipmentResponse> equipments) {
        this.equipments = equipments;
        return this;
    }

    public Set<FamilyResponse> getSubfamilies() {
        return subfamilies;
    }

    public FamilyResponse setSubfamilies(Set<FamilyResponse> subfamilies) {
        this.subfamilies = subfamilies;

        return this;
    }

    public FamilyResponse putEquipments(Set<Equipment> equipments) {
        Set<EquipmentResponse> equipmentResponses = new HashSet<>();

        equipments.forEach(e -> {
            equipmentResponses
                    .add(new EquipmentResponse()
                        .setName(e.getName())
                        .setActive(e.getActive())
                        .setFee(e.getFee())
                        .setId(e.getId()));
        });

        return setEquipments(equipmentResponses);
    }

    public FamilyResponse putSubfamily(Set<Family> families) {
        Set<FamilyResponse> familyResponses = new HashSet<>();

        families.forEach(e -> {
            familyResponses
                    .add(new FamilyResponse()
                            .setId(e.getId())
                        .setName(e.getName())
                            .putSubfamily(e.getSubfamilies())
                    );
        });

        return setSubfamilies(familyResponses);
    }
}
