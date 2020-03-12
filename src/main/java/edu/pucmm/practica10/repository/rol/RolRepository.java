package edu.pucmm.practica10.repository.rol;

import edu.pucmm.practica10.data.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RolRepository extends JpaRepository<Rol, Long> {

    Optional<Rol> findByName(String roleName);

    List<Rol> findAll();
}
