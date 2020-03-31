package edu.pucmm.practica10.data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Client implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cedula;
    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(columnDefinition = "TEXT")
    private String photo;
    @OneToOne(mappedBy = "client")
    User user;
    @OneToMany(mappedBy = "client")
    private Set<Rental> rentals;

    public Long getId() {
        return id;
    }

    public Client setId(Long id) {
        this.id = id;
        return this;
    }

    public String getCedula() {
        return cedula;
    }

    public Client setCedula(String cedula) {
        this.cedula = cedula;
        return this;
    }

    public String getPhoto() {
        return photo;
    }

    public Client setPhoto(String photo) {
        this.photo = photo;

        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public Client setFirstName(String firstName) {
        this.firstName = firstName;

        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public Client setLastName(String lastName) {
        this.lastName = lastName;

        return this;
    }

    public User getUser() {
        return user;
    }

    public Client setUser(User user) {
        this.user = user;

        return this;
    }

    public Set<Rental> getRentals() {
        return rentals;
    }

    public Client setRentals(Set<Rental> rentals) {
        this.rentals = rentals;

        return this;
    }

    public Client addRentals(Rental rental) {
        if (this.rentals == null) {
            this.rentals = new HashSet<>();
        }

        this.rentals.add(rental);

        return this;
    }
}
