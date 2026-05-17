package com.edutech.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edutech.dto.RestaurantManagerAssignmentDTO;
// import com.edutech.model.RestaurantManagerAssignment;
import com.edutech.service.RestaurantManagerAssignmentService;

import javax.validation.Valid;
import com.edutech.dto.AssignManagerRequest;

@RestController
@RequestMapping("/api/assignmanager")
public class RestaurantManagerAssignmentController {

  @Autowired
  private RestaurantManagerAssignmentService assignmentService;

  @PostMapping
  public ResponseEntity<RestaurantManagerAssignmentDTO> assignManager(
      @Valid @RequestBody AssignManagerRequest request) {
    return ResponseEntity.status(201).body(assignmentService.assignManager(request));
  }

  @GetMapping
  public ResponseEntity<List<RestaurantManagerAssignmentDTO>> getAllAssignments() {
    return ResponseEntity.ok(assignmentService.getAllAssignments());
  }

  @GetMapping("/manager/{managerId}")
  public ResponseEntity<List<RestaurantManagerAssignmentDTO>> getByManager(@PathVariable Long managerId) {
    return ResponseEntity.ok(assignmentService.getAssignmentsByManager(managerId));
  }

}
