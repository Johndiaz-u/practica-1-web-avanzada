package edu.pucmm.practica10.payload.rental;

import edu.pucmm.practica10.data.EquipmentRental;
import edu.pucmm.practica10.payload.client.ClientResponse;
import edu.pucmm.practica10.payload.equipment.EquipmentResponse;
import edu.pucmm.practica10.payload.equipmentRental.EquipmentRentalResponse;
import edu.pucmm.practica10.payload.family.FamilyResponse;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

public class RentalResponse {
    private Long id;

    private Date date;

    private Date dateDelivery;

    private Boolean returned;

    private ClientResponse client;

    private List<EquipmentRentalResponse> equipmentRental;

    public Long getId() {
        return id;
    }

    public RentalResponse setId(Long id) {
        this.id = id;

        return this;
    }

    public Date getDate() {
        return date;
    }

    public RentalResponse setDate(Date date) {
        this.date = date;

        return this;
    }

    public Date getDateDelivery() {
        return dateDelivery;
    }

    public RentalResponse setDateDelivery(Date dateDelivery) {
        this.dateDelivery = dateDelivery;

        return this;
    }

    public ClientResponse getClient() {
        return client;
    }

    public RentalResponse setClient(ClientResponse client) {
        this.client = client;

        return this;
    }

    public Boolean getReturned() {
        return returned;
    }

    public RentalResponse setReturned(Boolean returned) {
        this.returned = returned;

        return this;
    }

    public List<EquipmentRentalResponse> getEquipmentRental() {
        return equipmentRental;
    }

    public RentalResponse setEquipmentRental(List<EquipmentRentalResponse> equipmentRental) {
        this.equipmentRental = equipmentRental;

        return this;
    }

    public RentalResponse getEquipmentRentalResponses(Set<EquipmentRental> equipmentRentals) {
        List<EquipmentRentalResponse> equipmentRentalResponses = new ArrayList<>();
        equipmentRentals.forEach(e -> {
            equipmentRentalResponses.add(new EquipmentRentalResponse()
                    .setId(e.getId())
                    .setQuantity(e.getQuantity())
                    .setReturned(e.getReturned())
                    .setEquipment(new EquipmentResponse()
                            .setId(e.getEquipment().getId())
                            .setActive(e.getEquipment().getActive())
                            .setFee(e.getEquipment().getFee())
                            .setName(e.getEquipment().getName())
                            .setFamily(new FamilyResponse().setName(e.getEquipment().getFamily().getName()))));
        });

        return this.setEquipmentRental(equipmentRentalResponses);
    }
}
