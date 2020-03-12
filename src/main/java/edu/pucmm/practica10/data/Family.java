package edu.pucmm.practica10.data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Family implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    private Family parent;
    @OneToMany(mappedBy = "parent")
    private Set<Family> subfamilies;
    @OneToMany(mappedBy = "family")
    private Set<Equipment> equipments;

    public Long getId() {
        return id;
    }

    public Family setId(Long id) {
        this.id = id;

        return this;
    }

    public String getName() {
        return name;
    }

    public Family setName(String name) {
        this.name = name;

        return this;
    }

    public Family getParent() {
        return parent;
    }

    public Family setParent(Family parent) {
        this.parent = parent;

        return this;
    }

    public Set<Family> getSubfamilies() {
        return subfamilies;
    }

    public Family setSubfamilies(Set<Family> subfamilies) {
        this.subfamilies = subfamilies;

        return this;
    }

    public Set<Equipment> getEquipments() {
        return equipments;
    }

    public Family setEquipments(Set<Equipment> equipments) {
        this.equipments = equipments;

        return this;
    }

    public Family addSubFamily(Family family) {
        if (this.subfamilies == null) {
            this.subfamilies = new HashSet<>();
        }

        this.subfamilies.add(family);

        return this;
    }

    public Family addEquipment(Equipment equipment) {
        if (this.equipments == null) {
            this.equipments = new HashSet<>();
        }

        this.equipments.add(equipment);

        return this;
    }

}
