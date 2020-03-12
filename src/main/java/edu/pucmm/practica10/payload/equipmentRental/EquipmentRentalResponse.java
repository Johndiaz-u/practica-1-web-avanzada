package edu.pucmm.practica10.payload.equipmentRental;

import edu.pucmm.practica10.payload.equipment.EquipmentResponse;

public class EquipmentRentalResponse {

    private Long id;
    private Integer quantity;
    private Boolean returned;
    private EquipmentResponse equipment;

    public EquipmentResponse getEquipment() {
        return equipment;
    }

    public EquipmentRentalResponse setEquipment(EquipmentResponse equipment) {
        this.equipment = equipment;

        return this;
    }

    public Long getId() {
        return id;
    }

    public EquipmentRentalResponse setId(Long id) {
        this.id = id;

        return this;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public EquipmentRentalResponse setQuantity(Integer quantity) {
        this.quantity = quantity;

        return this;
    }

    public Boolean getReturned() {
        return returned;
    }

    public EquipmentRentalResponse setReturned(Boolean returned) {
        this.returned = returned;

        return this;
    }
}
