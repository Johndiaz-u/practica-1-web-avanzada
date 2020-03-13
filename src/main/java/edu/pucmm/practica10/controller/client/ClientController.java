package edu.pucmm.practica10.controller.client;

import edu.pucmm.practica10.data.Client;
import edu.pucmm.practica10.exception.AppException;
import edu.pucmm.practica10.exception.BadRequestException;
import edu.pucmm.practica10.payload.client.ClientRequest;
import edu.pucmm.practica10.payload.client.ClientResponse;
import edu.pucmm.practica10.payload.user.UserResponse;
import edu.pucmm.practica10.repository.client.ClientRepository;
import edu.pucmm.practica10.security.CurrentUser;
import edu.pucmm.practica10.security.UserPrincipal;
import edu.pucmm.practica10.utils.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    ClientRepository clientRepository;

    @GetMapping
    public ResponseEntity<?> getClients() {

        List<ClientResponse> clients = clientRepository.findAll().stream()
                .map(e -> {
                    return new ClientResponse()
                            .setId(e.getId())
                            .setCedula(e.getCedula())
                            .setFirstName(e.getFirstName())
                            .setLastName(e.getLastName())
//                            .setPhoto(e.getPhoto())
                            .putRentals(e.getRentals())
                            .setUser(e.getUser() != null ? new UserResponse()
                                    .setName(e.getUser().getName())
                                    .setEmail(e.getUser().getEmail())
                                    .setUsername(e.getUser().getUsername()) : null);
                }).collect(Collectors.toList());

        return ResponseEntity.ok(new JsonResponse(clients));
    }

    @GetMapping
    @RequestMapping("/{id}")
    public ResponseEntity<?> getClientById(@PathVariable Long id) {

        Client e = clientRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found"));

        ClientResponse clientResponse = new ClientResponse()
                .setCedula(e.getCedula())
                .setFirstName(e.getFirstName())
                .setLastName(e.getLastName())
//                .setPhoto(e.getPhoto())
                .putRentals(e.getRentals())
                .setUser(new UserResponse()
                        .setName(e.getUser().getName())
                        .setEmail(e.getUser().getEmail())
                        .setUsername(e.getUser().getUsername()));

        return ResponseEntity.ok(new JsonResponse(clientResponse));
    }

    @PostMapping
    @RequestMapping("/upload")
    public ResponseEntity<?> postUploadPhoto(@Valid @RequestBody ClientRequest clientRequest, @CurrentUser UserPrincipal currentUser) {

        Long idClient = currentUser.getId();

        Client e = clientRepository.getByUserId(idClient).orElseThrow(() -> new AppException("Not found"));
        if(clientRequest.getPhoto() != null)
            e.setPhoto(clientRequest.getPhoto());
        clientRepository.saveAndFlush(e);

        return ResponseEntity.ok(new JsonResponse("Photo Updated"));

    }
}
