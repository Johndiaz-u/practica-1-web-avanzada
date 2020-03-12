package edu.pucmm.practica10.repository.rental;

import edu.pucmm.practica10.data.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface RentalRepository extends JpaRepository<Rental, Long> {

    List<Rental> findAll();

    List<Rental> findByClientId(Long id);

    List<Rental> findByClientIdAndDateDeliveryBetweenAndReturnedIsFalse(Long id, Date from, Date to);
}
