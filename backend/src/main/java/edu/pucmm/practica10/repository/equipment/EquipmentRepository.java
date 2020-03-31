package edu.pucmm.practica10.repository.equipment;

import edu.pucmm.practica10.data.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
}
