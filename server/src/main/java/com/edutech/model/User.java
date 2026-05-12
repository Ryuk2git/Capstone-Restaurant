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

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "user")
public class User {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "id")
     private Long id;
     @Column(name = "username", unique = true)
     private String username;

     @Column(name = "password")
     private String password;

     @Column(name = "email")
     private String email;

     @Enumerated(EnumType.STRING)
     @Column(nullable = false)
     private Role role;

     @OneToMany(mappedBy = "order")
     @JsonManagedReference
     private List<Order> orders;

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

}
