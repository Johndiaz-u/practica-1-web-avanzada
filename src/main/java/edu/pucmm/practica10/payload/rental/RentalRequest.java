package edu.pucmm.practica10.payload.rental;

import edu.pucmm.practica10.payload.client.ClientResponse;

import java.util.Date;

public class RentalRequest {

    private Long id;

    private Boolean returned;

    private Date dateDelivery;

    private ClientResponse client;

    private Long clientId;

    public Long getId() {
        return id;
    }

    public RentalRequest setId(Long id) {
        this.id = id;
        return this;
    }

    public Boolean getReturned() {
        return returned;
    }

    public RentalRequest setReturned(Boolean returned) {
        this.returned = returned;
        return this;
    }

    public Date getDateDelivery() {
        return dateDelivery;
    }

    public RentalRequest setDateDelivery(Date dateDelivery) {
        this.dateDelivery = dateDelivery;
        return this;
    }

    public ClientResponse getClient() {
        return client;
    }

    public RentalRequest setClient(ClientResponse client) {
        this.client = client;
        return this;
    }

    public Long getClientId() {
        return clientId;
    }

    public RentalRequest setClientId(Long clientId) {
        this.clientId = clientId;

        return this;
    }
}
