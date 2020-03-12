package edu.pucmm.practica10.payload.user;

import javax.validation.constraints.NotBlank;

public class PhotoRequest {

    @NotBlank
    String photo;

    public String getPhoto() {
        return photo;
    }

    public PhotoRequest setPhoto(String photo) {
        this.photo = photo;
        return this;
    }
}
