package edu.pucmm.practica10.controller.equipmentRental;

import edu.pucmm.practica10.data.EquipmentRental;
import edu.pucmm.practica10.data.Rental;
import edu.pucmm.practica10.exception.BadRequestException;
import edu.pucmm.practica10.payload.equipment.EquipmentResponse;
import edu.pucmm.practica10.payload.equipmentRental.EquipmentRentalRequest;
import edu.pucmm.practica10.payload.equipmentRental.EquipmentRentalResponse;
import edu.pucmm.practica10.repository.equipment.EquipmentRepository;
import edu.pucmm.practica10.repository.equipmentRental.EquipmentRentalRepository;
import edu.pucmm.practica10.repository.rental.RentalRepository;
import edu.pucmm.practica10.utils.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@SuppressWarnings("Duplicates")
@RestController
@RequestMapping("/api/equipmentRental")
public class EquipmentRentalController {
    @Autowired
    EquipmentRepository equipmentRepository;

    @Autowired
    RentalRepository rentalRepository;

    @Autowired
    EquipmentRentalRepository equipmentRentalRepository;

    @PostMapping
    public ResponseEntity<?> postEquipmentRental(@Valid @RequestBody EquipmentRentalRequest request) {

        EquipmentRental eq = new EquipmentRental()
            .setRental(rentalRepository.findById(request.getRentalId()).orElseThrow(() -> new BadRequestException("Rental not found")))
            .setEquipment(equipmentRepository.findById(request.getEquipmentId()).orElseThrow(() -> new BadRequestException("Equipment not found")))
            .setQuantity(request.getQuantity())
            .setReturned(request.getReturned());

        equipmentRentalRepository.save(eq);

        EquipmentRentalResponse eqResponse = new EquipmentRentalResponse()
                .setId(eq.getId())
                .setQuantity(eq.getQuantity())
                .setReturned(eq.getReturned())
                .setEquipment(new EquipmentResponse()
                        .setActive(eq.getEquipment().getActive())
                        .setFamily(null)
                        .setFee(eq.getEquipment().getFee())
                        .setName(eq.getEquipment().getName()));

        return ResponseEntity.ok(new JsonResponse(eqResponse));
    }

    @PutMapping
    public ResponseEntity<?> putEquipmentRental(@Valid @RequestBody EquipmentRentalRequest request) {

        EquipmentRental eq = equipmentRentalRepository.findById(request.getId()).orElseThrow(() -> new BadRequestException("Not found"));

        Rental rental = rentalRepository.findById(eq.getRental().getId()).orElseThrow(() -> new BadRequestException("Rental not found"));

        if(request.getRentalId() != null)
            eq.setRental(rental);
        if(request.getEquipmentId() != null)
            eq.setEquipment(equipmentRepository.findById(request.getEquipmentId()).orElseThrow(() -> new BadRequestException("Equipment not found")));
        if(request.getQuantity() != null)
            eq.setQuantity(request.getQuantity());
        if(request.getReturned() != null)
            eq.setReturned(request.getReturned());
        equipmentRentalRepository.save(eq);

        int count = equipmentRentalRepository.findAllByRentalAndReturnedIsTrue(rental).size();
        int countRental = rental.getEquipmentRentals().size();

        if(count == countRental){
            rental.setReturned(true);
            rentalRepository.save(rental);
        }

        EquipmentRentalResponse eqResponse = new EquipmentRentalResponse()
                .setId(eq.getId())
                .setQuantity(eq.getQuantity())
                .setReturned(eq.getReturned())
                .setEquipment(new EquipmentResponse()
                    .setActive(eq.getEquipment().getActive())
                    .setFamily(null)
                    .setFee(eq.getEquipment().getFee())
                    .setName(eq.getEquipment().getName()));

        return ResponseEntity.ok(new JsonResponse(eqResponse));
    }
}
