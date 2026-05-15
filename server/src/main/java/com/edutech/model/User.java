package com.edutech.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "users")
public class User {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "id")
     private Long id;

     @NotBlank(message = "Username is required")
     @Size(min = 4, max = 30, message = "Username must be between 4 and 30 characters")
     @Column(name = "username", unique = true)
     private String username;

     @NotBlank(message = "Password is required")
     @Size(min = 8, message = "Password must be atleast 8 long")
     @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=!]).*$", message = "Password must contain uppercase, lowercase, number, and special character")
     @Column(name = "password")
     private String password;

     @NotBlank(message = "Email is required")
     @Email(message = "Invalid email format")
     @Column(name = "email")
     private String email;

     @NotNull(message = "Role is required")
     @Enumerated(EnumType.STRING)
     @Column(nullable = false)
     private Role role;

     @OneToMany(mappedBy = "user")
     @JsonIgnore
     private List<Order> orders;

     @OneToMany(mappedBy = "manager")
     @JsonIgnore
     private List<RestaurantManagerAssignment> assignments;

     public Long getId() {
          return id;
     }

     public void setId(Long id) {
          this.id = id;
     }

     public String getUsername() {
          return username;
     }

     public void setUsername(String username) {
          this.username = username;
     }

     public String getPassword() {
          return password;
     }

     public void setPassword(String password) {
          this.password = password;
     }

     public String getEmail() {
          return email;
     }

     public void setEmail(String email) {
          this.email = email;
     }

     public Role getRole() {
          return role;
     }

     public void setRole(Role role) {
          this.role = role;
     }

     public List<Order> getOrders() {
          return orders;
     }

     public void setOrders(List<Order> orders) {
          this.orders = orders;
     }

     public User(Long id, String username, String password, String email, Role role, List<Order> orders) {
          this.id = id;
          this.username = username;
          this.password = password;
          this.email = email;
          this.role = role;
          this.orders = orders;
     }

     public User() {
     }

    public List<RestaurantManagerAssignment> getAssignments() {
        return assignments;
    }

    public void setAssignments(List<RestaurantManagerAssignment> assignments) {
        this.assignments = assignments;
    }

    public User(Long id,
            @NotBlank(message = "Username is required") @Size(min = 4, max = 30, message = "Username must be between 4 and 30 characters") String username,
            @NotBlank(message = "Password is required") @Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters") @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=!]).*$", message = "Password must contain uppercase, lowercase, number, and special character") String password,
            @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email,
            @NotNull(message = "Role is required") Role role, List<Order> orders,
            List<RestaurantManagerAssignment> assignments) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.orders = orders;
        this.assignments = assignments;
    }

    

}
