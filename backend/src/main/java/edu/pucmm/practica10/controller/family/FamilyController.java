package edu.pucmm.practica10.controller.family;

import edu.pucmm.practica10.data.Family;
import edu.pucmm.practica10.exception.BadRequestException;
import edu.pucmm.practica10.payload.family.FamilyPostRequest;
import edu.pucmm.practica10.payload.family.FamilyResponse;
import edu.pucmm.practica10.repository.equipment.EquipmentRepository;
import edu.pucmm.practica10.repository.family.FamilyRepository;
import edu.pucmm.practica10.utils.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/families")
public class FamilyController {

    @Autowired
    FamilyRepository familyRepository;

    @Autowired
    EquipmentRepository equipmentRepository;

    @GetMapping
    public ResponseEntity<?> getAllFamilies() {
        List<FamilyResponse> families = null;

        families = familyRepository.findAllByParentIsNull()
                .stream()
                .map(e -> {return e.getParent() != null ? null :
                        new FamilyResponse()
                                .setId(e.getId())
                                .setName(e.getName())
                                .putSubfamily(e.getSubfamilies());
                }).collect(Collectors.toList());

        return ResponseEntity.ok(families);
    }

    @GetMapping
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getFamily(HttpServletResponse response, @PathVariable Long id) {

        Family f = familyRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found"));
        FamilyResponse family = new FamilyResponse()
                            .setId(f.getId())
                            .setName(f.getName())
                            .setParent(new FamilyResponse().setName(f.getParent() == null ? null : f.getParent().getName()))
                            .putSubfamily(f.getSubfamilies())
                            .putEquipments(f.getEquipments());;


        return ResponseEntity.ok(family);
    }

    @PostMapping
    public ResponseEntity<?> PostFamily(@Valid @RequestBody FamilyPostRequest familyPostRequest) {

        Family f = new Family()
                .setName(familyPostRequest.getName())
                .setSubfamilies(null);

        if(familyPostRequest.getParentId() != null)
                f.setParent(familyRepository.findById(familyPostRequest.getParentId()).orElseThrow(() -> new BadRequestException("Not found")));

        for (Long equipmentId: familyPostRequest.getEquipments()) {
            f.addEquipment(equipmentRepository.findById(equipmentId).orElseThrow(() -> new BadRequestException("Not found")));
        }

        familyRepository.save(f);

        FamilyResponse familyResponse = new FamilyResponse()
                .setName(f.getName())
                .setParent(new FamilyResponse()
                        .setName(f.getParent() == null ? null : f.getParent().getName()))
                .putEquipments(f.getEquipments());

        return ResponseEntity.ok(new JsonResponse(familyResponse));
    }
}
