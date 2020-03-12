package edu.pucmm.practica10.repository.equipmentRental;

import edu.pucmm.practica10.data.EquipmentRental;
import edu.pucmm.practica10.data.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EquipmentRentalRepository extends JpaRepository<EquipmentRental, Long> {

    public List<EquipmentRental> findAllByRentalAndReturnedIsTrue(Rental rental);

//    List<T> sdsad();

}
