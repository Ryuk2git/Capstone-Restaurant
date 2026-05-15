package com.edutech.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.autoconfigure.AutoConfiguration;
// import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.edutech.model.User;
import com.edutech.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow();
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(user.getRole().name()));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities
                // AuthorityUtils.createAuthorityList(user.getRole()

        );
    }

    // Register user (encode password)
    public User registerUser(User user) {
        // Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // 2. Get user by username
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow();
    }

    // 3. Get user profile by ID
    public User getUserProfile(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    // 4. Get all users
    public List<User> findAllUser() {
        return userRepository.findAll();
    }

    // 5. Get all users with roles (same entity already contains role)
    public List<User> getUserRolesDetails() {
        return userRepository.findAll();
    }

    // 6. Find by username (direct repo call)
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow();
    }

}
