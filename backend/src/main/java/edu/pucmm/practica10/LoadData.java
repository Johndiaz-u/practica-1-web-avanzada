package edu.pucmm.practica10;

import edu.pucmm.practica10.data.*;
import edu.pucmm.practica10.exception.AppException;
import edu.pucmm.practica10.repository.client.ClientRepository;
import edu.pucmm.practica10.repository.equipment.EquipmentRepository;
import edu.pucmm.practica10.repository.equipmentRental.EquipmentRentalRepository;
import edu.pucmm.practica10.repository.family.FamilyRepository;
import edu.pucmm.practica10.repository.rental.RentalRepository;
import edu.pucmm.practica10.repository.rol.RolRepository;
import edu.pucmm.practica10.repository.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Date;

@Service
public class LoadData {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RolRepository rolRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    EquipmentRepository equipmentRepository;

    @Autowired
    RentalRepository rentalRepository;

    @Autowired
    EquipmentRentalRepository equipmentRentalRepository;

    @Autowired
    FamilyRepository familyRepository;

    public static final Logger LOG = LoggerFactory.getLogger(LoadData.class);

    @PostConstruct
    public void loadData() {

        Rol rolUser = rolRepository.findByName(Rol.ROLE_USER).orElseThrow(() -> new AppException("User Role not set."));
        Rol rolAdmin = rolRepository.findByName(Rol.ROLE_ADMIN).orElseThrow(() -> new AppException("Couldn't User set Roles"));

        Client client = new Client()
                .setCedula("05412342")
                .setFirstName("Administrador")
                .setLastName("ADMINz");

        clientRepository.save(client);

        User user = new User()
                .setEmail("admin@admin.com")
                .setPassword(passwordEncoder.encode("admin"))
                .setUsername("admin")
                .setName("Administrator")
                .setClient(client)
                .addRol(rolUser)
                .addRol(rolAdmin);
        LOG.info("Saving User ADMIN");

        userRepository.save(user);

        Equipment eq = new Equipment()
                .setName("CPU x1")
                .setFee(0.5)
                .setActive(true);

        equipmentRepository.save(eq);

        Rental rental = new Rental()
                .setClient(client)
                .setDate(new Date())
                .setDateDelivery(new Date())
                .setReturned(false);

        rentalRepository.save(rental);

        EquipmentRental equipmentRental = new EquipmentRental()
                .setEquipment(eq)
                .setQuantity(5)
                .setReturned(false)
                .setRental(rental);

        equipmentRentalRepository.save(equipmentRental);

        Family familyElectronicos = new Family().setName("Electrónicos");
        Family familyComputadores = new Family().setName("Computadores").setParent(familyElectronicos);

        familyRepository.save(familyElectronicos);
        familyRepository.save(familyComputadores);

        eq.setFamily(familyComputadores);

        equipmentRepository.saveAndFlush(eq);


    }
}
