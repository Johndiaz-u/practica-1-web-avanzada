package edu.pucmm.practica10.payload.equipmentRental;

import javax.validation.constraints.Min;

public class EquipmentRentalRequest {
    private Long id;


    @Min(value = 0L)
    private Long equipmentId;
    @Min(value = 0L, message = "The value must be positive")
    private Integer quantity;
    private Boolean returned;
    @Min(value = 0L)
    private Long rentalId;

    public Long getId() {
        return id;
    }

    public EquipmentRentalRequest setId(Long id) {
        this.id = id;

        return this;
    }

    public Long getEquipmentId() {
        return equipmentId;
    }

    public EquipmentRentalRequest setEquipmentId(Long equipmentId) {
        this.equipmentId = equipmentId;

        return this;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public EquipmentRentalRequest setQuantity(Integer quantity) {
        this.quantity = quantity;

        return this;
    }

    public Boolean getReturned() {
        return returned;
    }

    public EquipmentRentalRequest setReturned(Boolean returned) {
        this.returned = returned;

        return this;
    }

    public Long getRentalId() {
        return rentalId;
    }

    public EquipmentRentalRequest setRentalId(Long rentalId) {
        this.rentalId = rentalId;

        return this;
    }
}
