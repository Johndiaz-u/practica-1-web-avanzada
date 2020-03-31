package edu.pucmm.practica10.payload.client;

public class ClientRequest {

    private Long id;

    private String cedula;

    private String photo;

    public Long getId() {
        return id;
    }

    public ClientRequest setId(Long id) {
        this.id = id;

        return this;
    }

    public String getCedula() {
        return cedula;
    }

    public ClientRequest setCedula(String cedula) {
        this.cedula = cedula;

        return this;
    }

    public String getPhoto() {
        return photo;
    }

    public ClientRequest setPhoto(String photo) {
        this.photo = photo;

        return this;
    }
}
