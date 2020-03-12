package edu.pucmm.practica10.data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
public class Equipment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double fee;
    private Boolean active;

    @ManyToOne
    Family family;

    @OneToMany(mappedBy = "equipment")
    private Set<EquipmentRental> equipmentRentals;

    public Long getId() {
        return id;
    }

    public Equipment setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Equipment setName(String name) {
        this.name = name;
        return this;
    }

    public double getFee() {
        return fee;
    }

    public Equipment setFee(double fee) {
        this.fee = fee;
        return this;
    }

    public Boolean getActive() {
        return active;
    }

    public Equipment setActive(Boolean active) {
        this.active = active;
        return this;
    }

    public Family getFamily() {
        return family;
    }

    public Equipment setFamily(Family family) {
        this.family = family;
        return this;
    }

    public Set<EquipmentRental> getEquipmentRentals() {
        return equipmentRentals;
    }

    public Equipment setEquipmentRentals(Set<EquipmentRental> equipmentRentals) {
        this.equipmentRentals = equipmentRentals;

        return this;
    }

    //    public Set<Family> getFamilies() {
//        return families;
//    }
//
//    public Equipment setFamilies(Set<Family> families) {
//        this.families = families;
//        return this;
//    }
//
//    public Equipment addFamily(Family family) {
//        if (this.families == null) {
//            this.families = new HashSet<>();
//        }
//
//        this.families.add(family);
//
//        return this;
//    }
}
