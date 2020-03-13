package edu.pucmm.practica10.controller.rental;

import edu.pucmm.practica10.data.Client;
import edu.pucmm.practica10.data.Rental;
import edu.pucmm.practica10.exception.AppException;
import edu.pucmm.practica10.exception.BadRequestException;
import edu.pucmm.practica10.payload.client.ClientResponse;
import edu.pucmm.practica10.payload.rental.RentalRequest;
import edu.pucmm.practica10.payload.rental.RentalResponse;
import edu.pucmm.practica10.payload.user.UserResponse;
import edu.pucmm.practica10.repository.client.ClientRepository;
import edu.pucmm.practica10.repository.equipment.EquipmentRepository;
import edu.pucmm.practica10.repository.rental.RentalRepository;
import edu.pucmm.practica10.utils.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@SuppressWarnings("Duplicates")
@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    @Autowired
    RentalRepository rentalRepository;

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    EquipmentRepository equipmentRepository;

    @GetMapping
    public ResponseEntity<?> getAllRental() {

        List<RentalResponse> rentals = rentalRepository.findAll().stream()
                .map(e -> {
                    return new RentalResponse()
                            .setId(e.getId())
                            .setClient(new ClientResponse()
                                    .setCedula(e.getClient().getCedula())
//                                    .setPhoto(e.getClient().getPhoto())
                                    .setUser(new UserResponse()
                                        .setEmail(e.getClient().getUser().getEmail())
                                        .setName(e.getClient().getUser().getName())
                                        .setUsername(e.getClient().getUser().getUsername())))
                            .setReturned(e.getReturned())
                            .setDateDelivery(e.getDateDelivery())
                            .setDate(e.getDate())
                            .getEquipmentRentalResponses(e.getEquipmentRentals());
                }).collect(Collectors.toList());

        return ResponseEntity.ok(new JsonResponse(rentals));
    }

    @PostMapping
    public ResponseEntity<?> postRental(@Valid @RequestBody RentalRequest rentalRequest) {

        Client client = clientRepository.findById(rentalRequest.getClientId()).orElseThrow(() -> new AppException("Not found"));

        Rental rental = new Rental()
                .setDateDelivery(rentalRequest.getDateDelivery())
                .setDate(new Date())
                .setReturned(false)
                .setClient(client);

        rentalRepository.save(rental);

        RentalResponse rentalResponse = new RentalResponse()
                .setId(rental.getId())
                .setClient(new ClientResponse()
                        .setCedula(client.getCedula())
//                                    .setPhoto(e.getClient().getPhoto())
                        .setUser(new UserResponse()
                                .setEmail(client.getUser().getEmail())
                                .setName(client.getUser().getName())
                                .setUsername(client.getUser().getUsername())))
                .setReturned(rental.getReturned());


        return ResponseEntity.ok(new JsonResponse(rentalResponse));
    }

    @PutMapping
    public ResponseEntity<?> putRental(@Valid @RequestBody RentalRequest rentalRequest) {

        Rental rental = rentalRepository.findById(rentalRequest.getId()).orElseThrow(() -> new BadRequestException("Not found"));

        if(rentalRequest.getDateDelivery() != null)
            rental.setDateDelivery(rentalRequest.getDateDelivery());

        if(rentalRequest.getReturned() != null)
            rental.setReturned(rentalRequest.getReturned());

        if(rentalRequest.getClientId() != null)
            rental.setClient(clientRepository.findById(rentalRequest.getClientId()).orElseThrow(() -> new AppException("Not found")));

        rentalRepository.save(rental);

        RentalResponse rentalResponse = new RentalResponse()
                .setId(rental.getId())
                .getEquipmentRentalResponses(rental.getEquipmentRentals())
                .setReturned(rental.getReturned())
                .setClient(new ClientResponse()
                        .setCedula(rental.getClient().getCedula())
//                                    .setPhoto(e.getClient().getPhoto())
                        .setUser(new UserResponse()
                            .setEmail(rental.getClient().getUser().getEmail())
                            .setName(rental.getClient().getUser().getName())
                            .setUsername(rental.getClient().getUser().getUsername())));



        return ResponseEntity.ok(new JsonResponse(rentalResponse));
    }

    @GetMapping
    @RequestMapping("/clients/{id}")
    public ResponseEntity<?> getRentalByClient(@PathVariable Long id) {
        List<RentalResponse> rentals = rentalRepository.findByClientId(id).stream()
                .map(e -> {
                    return new RentalResponse()
                                .setId(e.getId())
                                .setClient(new ClientResponse()
                                    .setCedula(e.getClient().getCedula())
//                                    .setPhoto(e.getClient().getPhoto())
                                    .setUser(new UserResponse()
                                            .setEmail(e.getClient().getUser().getEmail())
                                            .setName(e.getClient().getUser().getName())
                                            .setUsername(e.getClient().getUser().getUsername())))
                                .setReturned(e.getReturned())
                                .setDateDelivery(e.getDateDelivery())
                                .setDate(e.getDate())
                                .getEquipmentRentalResponses(e.getEquipmentRentals());
                }).collect(Collectors.toList());


        return ResponseEntity.ok(new JsonResponse(rentals));

    }

    @GetMapping
    @RequestMapping("/clients/{id}/start/{start}/end/{end}")
    public ResponseEntity<?> getRentalByClient(@PathVariable Long id, @PathVariable String start, @PathVariable String end) {

        Date from;
        Date to;

        try{
            from = new SimpleDateFormat("yyyy-MM-dd").parse(start);
            to = new SimpleDateFormat("yyyy-MM-dd").parse(end);
        }catch (Exception e){
            throw new BadRequestException("Bad date format");
        }

        List<RentalResponse> rentals = rentalRepository.findByClientIdAndDateDeliveryBetweenAndReturnedIsFalse(id, from, to).stream()
                .map(e -> {
                    return new RentalResponse()
                            .setId(e.getId())
                            .setClient(new ClientResponse()
                                    .setCedula(e.getClient().getCedula())
//                                    .setPhoto(e.getClient().getPhoto())
                                    .setUser(new UserResponse()
                                            .setEmail(e.getClient().getUser().getEmail())
                                            .setName(e.getClient().getUser().getName())
                                            .setUsername(e.getClient().getUser().getUsername())))
                            .setReturned(e.getReturned())
                            .setDateDelivery(e.getDateDelivery())
                            .setDate(e.getDate())
                            .getEquipmentRentalResponses(e.getEquipmentRentals());
                }).collect(Collectors.toList());


        return ResponseEntity.ok(new JsonResponse(rentals));

    }
}
