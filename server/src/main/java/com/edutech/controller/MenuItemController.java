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

import com.edutech.model.MenuItem;
import com.edutech.service.MenuItemService;

@RestController
@RequestMapping("/api/menuItems")
public class MenuItemController {

   @Autowired
   private MenuItemService menuItemService;

   @GetMapping
   public ResponseEntity<List<MenuItem>> getAllMenuItem() {
      try {
         List<MenuItem> menu = menuItemService.getAllMenuItem();
         return ResponseEntity.status(200).body(menu);

      } catch (Exception e) {
         return ResponseEntity.status(500).build();
      }
   }

   @GetMapping("/{id}")
   public ResponseEntity<MenuItem> getMenuItemById(@PathVariable Long id) {
      try {

         MenuItem menu = menuItemService.getMenuItemById(id);
         return ResponseEntity.status(200).body(menu);
      } catch (Exception e) {
         return ResponseEntity.status(500).build();
      }
   }

   @PostMapping
   public ResponseEntity<MenuItem> addMenuItem(@RequestBody MenuItem menuItem) {
      try {

         MenuItem menu = menuItemService.addMenuItem(menuItem);
         return ResponseEntity.status(201).body(menu);
      } catch (Exception e) {

         return ResponseEntity.status(500).build();
      }
   }

   @PutMapping("/{id}")
   public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem menuItem) {
      try {

         MenuItem menu = menuItemService.updateMenuItem(id, menuItem);

         return ResponseEntity.status(200).body(menu);

      } catch (Exception e) {
         return ResponseEntity.status(500).build();
      }
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
      try {

         menuItemService.deleteMenuItem(id);

         return ResponseEntity.status(200).build();
      } catch (Exception e) {
         return ResponseEntity.status(500).build();
      }
   }

}
