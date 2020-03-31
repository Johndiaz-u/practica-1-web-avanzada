package edu.pucmm.practica10.controller.roles;

import edu.pucmm.practica10.payload.roles.RolResponse;
import edu.pucmm.practica10.repository.rol.RolRepository;
import edu.pucmm.practica10.utils.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/roles")
public class RolController {

    @Autowired
    RolRepository rolRepository;

    @GetMapping
    public ResponseEntity<?> getAllRoles() {

        Set<String> roles1 = new HashSet<>();

        rolRepository.findAll()
                .forEach(r -> {
                    roles1.add(r.getName());
                });

        return ResponseEntity.ok(new JsonResponse(new RolResponse().setRoles(roles1)));

    }
}
