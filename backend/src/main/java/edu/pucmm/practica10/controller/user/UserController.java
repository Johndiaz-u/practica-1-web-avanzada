package edu.pucmm.practica10.controller.user;

import edu.pucmm.practica10.data.Rol;
import edu.pucmm.practica10.data.User;
import edu.pucmm.practica10.exception.AppException;
import edu.pucmm.practica10.payload.ApiResponse;
import edu.pucmm.practica10.payload.client.ClientResponse;
import edu.pucmm.practica10.payload.user.PhotoRequest;
import edu.pucmm.practica10.payload.user.UserRequest;
import edu.pucmm.practica10.payload.user.UserResponse;
import edu.pucmm.practica10.repository.rol.RolRepository;
import edu.pucmm.practica10.repository.user.UserRepository;
import edu.pucmm.practica10.security.CurrentUser;
import edu.pucmm.practica10.security.UserPrincipal;
import edu.pucmm.practica10.utils.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RolRepository rolRepository;


    @GetMapping("/me")
    public ResponseEntity<?> userLogged(@CurrentUser UserPrincipal userPrincipal) {

        if (userPrincipal == null) {
            return ResponseEntity.ok(new ApiResponse(false, "User not logged."));
        }

        return ResponseEntity.ok(new JsonResponse(userPrincipal));
    }


    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<?> getAllUsers(HttpServletResponse response) {
        List<UserResponse> users = userRepository.findAll().stream()
                .map(e -> {
                    return new UserResponse()
                            .setId(e.getId())
                            .setEmail(e.getEmail())
                            .setName(e.getName())
                            .setUsername(e.getUsername())
                            .addRoles(e.getRoles())
                            .setClient(new ClientResponse()
                                    .setCedula(e.getClient().getCedula())
                                    .setFirstName(e.getClient().getFirstName())
                                    .setLastName(e.getClient().getLastName())
                                    .putRentals(e.getClient().getRentals()));
                }).collect(Collectors.toList());

        return ResponseEntity.ok(new JsonResponse(users));
    }

    @GetMapping
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(HttpServletResponse response, @PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException("User not found"));
        UserResponse userResponse = new UserResponse()
            .setId(user.getId())
            .setEmail(user.getEmail())
            .setName(user.getName())
            .setUsername(user.getUsername())
            .addRoles(user.getRoles())
            .setClient(new ClientResponse()
                .setCedula(user.getClient().getCedula())
                .setFirstName(user.getClient().getFirstName())
                .setLastName(user.getClient().getLastName())
                .putRentals(user.getClient().getRentals())
                .setPhoto(user.getClient().getPhoto()));

//        user.get

        return ResponseEntity.ok(new JsonResponse(userResponse));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editUser(@Valid @RequestBody UserRequest userRequest, @PathVariable Long id) {

        User user = userRepository.findById(id).orElseThrow(() -> new AppException("User not found"));
        if (userRequest.getRoles() != null) {
            user.setRoles(null);
            for (String rolName: userRequest.getRoles()) {
                Rol rol = rolRepository.findByName(rolName).orElseThrow(() -> new AppException(("Rol not found")));
                user.addRol(rol);
            }
        }

        if (userRequest.getName() != null) {
            user.setName(userRequest.getName());
        }

        if (userRequest.getPassword() != null) {
            user.setPassword(userRequest.getPassword());
        }

        userRepository.saveAndFlush(user);

        UserResponse userResponse = new UserResponse()
                .setUsername(user.getUsername())
                .setEmail(user.getEmail())
                .setName(user.getName());

        return ResponseEntity.ok(new JsonResponse(userResponse));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(HttpServletResponse response, @PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException("User not found"));

        userRepository.delete(user);

        return ResponseEntity.ok(new JsonResponse("User deleted!"));
    }

    @PutMapping("/photo")
    public ResponseEntity<?> uploadPhoto(HttpServletResponse response, @Valid @RequestBody PhotoRequest photoRequest, @CurrentUser UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId()).orElseThrow(() -> new AppException("User not found"));


        user.getClient().setPhoto(photoRequest.getPhoto());

        userRepository.save(user);


        return ResponseEntity.ok(new JsonResponse(new UserResponse()
                .setClient(new ClientResponse()
                    .putRentals(user.getClient().getRentals())
                    .setPhoto(user.getClient().getPhoto())
                    .setId(user.getClient().getId())
                    .setFirstName(user.getClient().getFirstName())
                    .setLastName(user.getClient().getLastName())
                    .setCedula(user.getClient().getCedula()))
                .setEmail(user.getEmail())
                .setName(user.getName())
                .setUsername(user.getUsername())));
    }

}
