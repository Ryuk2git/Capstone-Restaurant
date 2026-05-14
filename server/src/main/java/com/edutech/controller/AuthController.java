package com.edutech.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edutech.dto.LoginRequest;
import com.edutech.dto.LoginResponse;
import com.edutech.model.User;
import com.edutech.repository.UserRepository;
import com.edutech.service.UserService;
import com.edutech.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;


@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {

    // Authenticate user
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
            )
    );

    // Load user from DB
    org.springframework.security.core.userdetails.UserDetails userDetails =
            userDetailsService.loadUserByUsername(request.getUsername());

    // Fetch full User entity (for extra data)
    User user = userRepository.findByUsername(request.getUsername());

    // Generate JWT
    String token = jwtUtil.generateToken(userDetails.getUsername());

    // Return response
    return ResponseEntity.ok(new LoginResponse(
            user.getId(),
            token,
            user.getUsername(),
            user.getEmail(),
            user.getRole()
    ));
}



@Autowired
private UserService userService;

@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody User user) {
    userService.registerUser(user);
    return ResponseEntity.ok("User registered successfully");
}

// @PostMapping("/register")
// public ResponseEntity<?> register(@RequestBody User user) {
//     user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
//     userRepository.save(user);
//     return ResponseEntity.ok("User registered successfully");
// }

}
