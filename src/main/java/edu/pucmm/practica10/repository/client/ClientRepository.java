package edu.pucmm.practica10.repository.client;

import edu.pucmm.practica10.data.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {

    List<Client> findAll();

    Optional<Client> findById(Long id);

    Optional<Client> getByUserId(Long id);

}
