package com.edutech.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edutech.dto.AssignManagerRequest;
import com.edutech.dto.RestaurantManagerAssignmentDTO;
import com.edutech.model.Restaurant;
import com.edutech.service.RestaurantManagerAssignmentService;
import com.edutech.service.RestaurantService;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

   @Autowired
   private RestaurantService restaurantService;

   @Autowired
   private RestaurantManagerAssignmentService assignmentService;

   @PostMapping
   public ResponseEntity<Restaurant> createRestaurant(@Valid @RequestBody Restaurant restaurant) {
      return ResponseEntity.status(201).body(restaurantService.createRestaurant(restaurant));
   }

   @GetMapping
   public ResponseEntity<List<Restaurant>> getAllRestaurants() {
      return ResponseEntity.ok(restaurantService.getAllRestaurants());
   }

   @GetMapping("/{id}")
   public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
      return ResponseEntity.ok(restaurantService.getRestaurantById(id));
   }

   @PutMapping("/{id}")
   public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Long id, @Valid @RequestBody Restaurant restaurant) {
      return ResponseEntity.ok(restaurantService.updateRestaurant(id, restaurant));
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) {
      restaurantService.deleteRestaurant(id);
      return ResponseEntity.ok().build();
   }

   @PostMapping("/assignmanager")
   public ResponseEntity<RestaurantManagerAssignmentDTO> assignManager(
         @Valid @RequestBody AssignManagerRequest request) {
      return ResponseEntity.status(201).body(assignmentService.assignManager(request));
   }

   @GetMapping("/assignmanager")
   public ResponseEntity<List<RestaurantManagerAssignmentDTO>> getAssignments() {
      return ResponseEntity.ok(assignmentService.getAllAssignments());
   }

}
