package com.edutech.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.edutech.dto.AssignManagerRequest;
import com.edutech.dto.RestaurantManagerAssignmentDTO;
import com.edutech.model.RestaurantManagerAssignment;

public interface RestaurantManagerAssignmentService {
    RestaurantManagerAssignmentDTO assignManager(AssignManagerRequest request);
    List<RestaurantManagerAssignmentDTO> getAllAssignments();
    List<RestaurantManagerAssignmentDTO> getAssignmentsByManager(Long managerId);
    void removeAssignment(Long assignmentId);
}
