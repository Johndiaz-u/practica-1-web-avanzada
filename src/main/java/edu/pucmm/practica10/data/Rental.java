package edu.pucmm.practica10.data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Rental implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date;

    private Date dateDelivery;

    @ManyToOne
    private Client client;

    @OneToMany(mappedBy = "rental")
    private Set<EquipmentRental> equipmentRentals;

    private Boolean returned;

    public Long getId() {
        return id;
    }

    public Rental setId(Long id) {
        this.id = id;
        return this;
    }

    public Date getDate() {
        return date;
    }

    public Rental setDate(Date date) {
        this.date = date;
        return this;
    }

    public Date getDateDelivery() {
        return dateDelivery;
    }

    public Rental setDateDelivery(Date dateDelivery) {
        this.dateDelivery = dateDelivery;

        return this;
    }

    public Client getClient() {
        return client;
    }

    public Rental setClient(Client client) {
        this.client = client;
        return this;
    }

    public Set<EquipmentRental> getEquipmentRentals() {
        return equipmentRentals;
    }

    public Rental setEquipmentRentals(Set<EquipmentRental> equipmentRentals) {
        this.equipmentRentals = equipmentRentals;
        return this;
    }

    public Rental addEquipmentRental(EquipmentRental equipmentRental) {
        if (this.equipmentRentals == null) {
            this.equipmentRentals = new HashSet<>();
        }

        this.equipmentRentals.add(equipmentRental);
        return this;
    }

    public Boolean getReturned() {
        return returned;
    }

    public Rental setReturned(Boolean returned) {
        this.returned = returned;

        return this;
    }
}
