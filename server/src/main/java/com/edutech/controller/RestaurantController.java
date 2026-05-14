package com.edutech.controller;

import java.util.List;

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

import com.edutech.model.Restaurant;
import com.edutech.service.RestaurantService;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
   @Autowired
   private RestaurantService restaurantService;

   @GetMapping
   public ResponseEntity<List<Restaurant>> getAllRestuarant() {
      try {
         List<Restaurant> res = restaurantService.getAllRestuatrant();
         return ResponseEntity.status(200).body(res);
      } catch (Exception e) {
         return ResponseEntity.status(500).build();
      }
   }

   @GetMapping("/{id}")
   public ResponseEntity<Restaurant> getRestuarantById(@PathVariable Long id) {
      try {

         Restaurant res = restaurantService.getRestuarantById(id);
         return ResponseEntity.status(200).body(res);
      } catch (Exception e) {
         return ResponseEntity.status(500).build();
      }
   }

   @PostMapping
   public ResponseEntity<Restaurant> addRestuarant(@RequestBody Restaurant restaurant) {
      try {

         Restaurant res = restaurantService.addRestaurant(restaurant);
         return ResponseEntity.status(200).body(res);
      } catch (Exception e) {

         return ResponseEntity.status(500).build();
      }
   }

   @PutMapping("/{id}")
   public ResponseEntity<Restaurant> updateRestuarant(@PathVariable Long id, @RequestBody Restaurant restaurant) {
      try {

         Restaurant res = restaurantService.updateRestaurant(id, restaurant);
         return ResponseEntity.status(200).body(res);

      } catch (Exception e) {
         return ResponseEntity.status(500).build();
      }
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<Void> deleteRestuarant(@PathVariable Long id) {
      try {

         restaurantService.deleteRestuarant(id);

         return ResponseEntity.status(200).build();
      } catch (Exception e) {
         return ResponseEntity.status(500).build();
      }
   }

}
