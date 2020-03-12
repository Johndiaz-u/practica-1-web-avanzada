package edu.pucmm.practica10.data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class EquipmentRental implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Equipment equipment;

    private Integer quantity;

    @Column(columnDefinition = "boolean default true")
    private Boolean returned;

    @ManyToOne
    private  Rental rental;

    public Long getId() {
        return id;
    }

    public EquipmentRental setId(Long id) {
        this.id = id;
        return this;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public EquipmentRental setEquipment(Equipment equipment) {
        this.equipment = equipment;
        return this;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public EquipmentRental setQuantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public Boolean getReturned() {
        return returned;
    }

    public EquipmentRental setReturned(Boolean returned) {
        this.returned = returned;
        return this;
    }

    public Rental getRental() {
        return rental;
    }

    public EquipmentRental setRental(Rental rental) {
        this.rental = rental;

        return this;
    }
}
