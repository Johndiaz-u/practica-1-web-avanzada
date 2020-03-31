package edu.pucmm.practica10.payload.client;

import edu.pucmm.practica10.data.Rental;
import edu.pucmm.practica10.payload.rental.RentalResponse;
import edu.pucmm.practica10.payload.user.UserResponse;

import java.util.HashSet;
import java.util.Set;

public class ClientResponse {

    private Long id;
    private String cedula;
    private String firstName;
    private String lastName;
    private String photo;
    private UserResponse user;
    private Set<RentalResponse> rentals;

    public Long getId() {
        return id;
    }

    public ClientResponse setId(Long id) {
        this.id = id;
        return this;
    }

    public String getCedula() {
        return cedula;
    }

    public ClientResponse setCedula(String cedula) {
        this.cedula = cedula;

        return this;
    }

    public String getPhoto() {
        return photo;
    }

    public ClientResponse setPhoto(String photo) {
        this.photo = photo;

        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public ClientResponse setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public ClientResponse setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public UserResponse getUser() {
        return user;
    }

    public ClientResponse setUser(UserResponse user) {
        this.user = user;

        return this;
    }

    public Set<RentalResponse> getRentals() {
        return rentals;
    }

    public ClientResponse setRentals(Set<RentalResponse> rentals) {
        this.rentals = rentals;

        return this;
    }

    public ClientResponse putRentals(Set<Rental> rentals) {
        Set<RentalResponse> rentalsResponse = new HashSet<>();

        rentals
                .forEach(e -> {
                    rentalsResponse.add(new RentalResponse()
                        .setId(e.getId())
                        .setDate(e.getDate())
                        .setDateDelivery(e.getDateDelivery())
                        .setId(e.getId())
                        .setReturned(e.getReturned())
                        .getEquipmentRentalResponses(e.getEquipmentRentals()));
                });



        return setRentals(rentalsResponse);
    }


}
