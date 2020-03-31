package edu.pucmm.practica10.repository;

import edu.pucmm.practica10.data.Client;
import edu.pucmm.practica10.data.Rol;
import edu.pucmm.practica10.data.User;
import edu.pucmm.practica10.exception.AppException;
import edu.pucmm.practica10.exception.BadRequestException;
import edu.pucmm.practica10.payload.SignUpRequest;
import edu.pucmm.practica10.repository.client.ClientRepository;
import edu.pucmm.practica10.repository.rol.RolRepository;
import edu.pucmm.practica10.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserRepositoryS {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RolRepository rolRepository;

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public User store(SignUpRequest signUpRequest) {

        Rol userRole = rolRepository.findByName(Rol.ROLE_USER).orElseThrow(() -> new AppException("User Role not set."));

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new BadRequestException("Username is already taken");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("E-mail address is already taken");
        }

        Client client = new Client()
                .setCedula(signUpRequest.getCedula())
                .setFirstName(signUpRequest.getName())
                .setLastName(signUpRequest.getLastName());

        clientRepository.save(client);

        User user = new User()
                .setEmail(signUpRequest.getEmail())
                .setName(signUpRequest.getName())
                .setUsername(signUpRequest.getUsername())
                .setPassword(passwordEncoder.encode(signUpRequest.getPassword()))
                .setClient(client);

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        return result;
    }
}
