package edu.pucmm.practica10.controller.auth;

import edu.pucmm.practica10.data.User;
import edu.pucmm.practica10.payload.JwtAuthenticationResponse;
import edu.pucmm.practica10.payload.LoginRequest;
import edu.pucmm.practica10.payload.SignUpRequest;
import edu.pucmm.practica10.repository.UserRepositoryS;
import edu.pucmm.practica10.security.JwtTokenProvider;
import edu.pucmm.practica10.utils.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    RolRepository rolRepository;

//    @Autowired
//    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepositoryS userRepositoryS;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtTokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {

        User result = userRepositoryS.store(signUpRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();
//        return ResponseEntity.created(location).body(this.authenticateUser(new LoginRequest().setUsernameOrEmail(signUpRequest.getUsername()).setPassword(signUpRequest.getPassword()))).getBody();
        return ResponseEntity.ok(new JsonResponse("Registred"));

    }
}
