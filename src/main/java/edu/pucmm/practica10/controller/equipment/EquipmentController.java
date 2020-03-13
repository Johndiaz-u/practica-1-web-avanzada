package edu.pucmm.practica10.controller.equipment;

import edu.pucmm.practica10.data.Equipment;
import edu.pucmm.practica10.exception.BadRequestException;
import edu.pucmm.practica10.payload.equipment.EquipmentRequest;
import edu.pucmm.practica10.payload.equipment.EquipmentResponse;
import edu.pucmm.practica10.payload.family.FamilyResponse;
import edu.pucmm.practica10.repository.equipment.EquipmentRepository;
import edu.pucmm.practica10.repository.family.FamilyRepository;
import edu.pucmm.practica10.utils.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/equipments")
public class EquipmentController {
    @Autowired
    EquipmentRepository equipmentRepository;

    @Autowired
    FamilyRepository familyRepository;

    @GetMapping
    public ResponseEntity<?> getAllEquipments() {

        List<EquipmentResponse> equipments = equipmentRepository.findAll().stream()
                .map(e -> {
                    return new EquipmentResponse()
                            .setId(e.getId())
                            .setActive(e.getActive())
                            .setFee(e.getFee())
                            .setName(e.getName())
                            .setFamily(new FamilyResponse()
                                .setName(e.getFamily().getName()));
                }).collect(Collectors.toList());

        return ResponseEntity.ok(new JsonResponse(equipments));
    }
    @PostMapping
    public ResponseEntity<?> postEquipment(@Valid @RequestBody EquipmentRequest equipment) {

        Equipment eq = new Equipment()
                .setActive(true)
                .setName(equipment.getName())
                .setFee(equipment.getFee())
                .setFamily(familyRepository.findById(equipment.getFamilyId()).orElseThrow(() -> new BadRequestException("Not found")));

        equipmentRepository.save(eq);


        EquipmentResponse equipmentResponse = new EquipmentResponse()
                .setActive(eq.getActive())
                .setId(eq.getId())
                .setActive(eq.getActive())
                .setFee(eq.getFee())
                .setName(eq.getName())
                .setFamily(new FamilyResponse()
                        .setName(eq.getFamily().getName()));

        return ResponseEntity.ok(new JsonResponse(equipmentResponse));
    }
}
