package edu.pucmm.practica10.repository.family;

import edu.pucmm.practica10.data.Family;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FamilyRepository extends JpaRepository<Family, Long> {

    List<Family> findByName(String name);
    List<Family> findAllByParentIsNull();
}
