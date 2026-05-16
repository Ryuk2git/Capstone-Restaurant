package com.edutech.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edutech.model.MenuItem;
import com.edutech.service.MenuItemService;

@RestController
@RequestMapping("/api/menu-items")
public class MenuItemController {
   @Autowired
   private MenuItemService menuItemService;

   @PostMapping
   public ResponseEntity<MenuItem> addMenuItem(@Valid @RequestBody MenuItem menuItem) {
      return ResponseEntity.status(201).body(menuItemService.addMenuItem(menuItem));
   }

   @GetMapping
   public ResponseEntity<List<MenuItem>> getAllMenuItems() {
      return ResponseEntity.ok(menuItemService.getMenuItems());
   }

   @GetMapping("/{id}")
   public ResponseEntity<List<MenuItem>> getMenuItemsByRestaurant(@PathVariable Long id) {
      return ResponseEntity.ok(menuItemService.getMenuItemsByRestaurant(id));
   }

   @PutMapping("/{id}")
   public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @Valid @RequestBody MenuItem menuItem) {
      return ResponseEntity.ok(menuItemService.updateMenuItem(id, menuItem));
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<String> deleteMenuItem(@PathVariable Long id) {
      menuItemService.deleteMenuItem(id);
      return ResponseEntity.ok("Menu item deleted successfully");
   }

}
