package com.edutech.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.dto.AssignManagerRequest;
import com.edutech.dto.RestaurantManagerAssignmentDTO;
import com.edutech.model.Restaurant;
import com.edutech.model.RestaurantManagerAssignment;
import com.edutech.model.User;
import com.edutech.repository.RestaurantManagerAssignmentRepository;
import com.edutech.repository.RestaurantRepository;
import com.edutech.repository.UserRepository;

@Service
public class RestaurantManagerAssignmentServiceImpl implements RestaurantManagerAssignmentService {
    @Autowired
    private RestaurantManagerAssignmentRepository assignmentRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public RestaurantManagerAssignmentDTO assignManager(AssignManagerRequest request) {

        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId()).orElseThrow();

        User manager = userRepository.findById(request.getUser()).orElseThrow();

        RestaurantManagerAssignment assignment = new RestaurantManagerAssignment();

        assignment.setRestaurant(restaurant);
        assignment.setManager(manager);

        RestaurantManagerAssignment savedAssignment = assignmentRepository.save(assignment);

        return mapToDTO(savedAssignment);
    }

    @Override
    public List<RestaurantManagerAssignmentDTO>
    getAllAssignments() {
        return assignmentRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<RestaurantManagerAssignmentDTO>
    getAssignmentsByManager(Long managerId) {
        return assignmentRepository.findAll()
                .stream()
                .filter(assignment ->
                        assignment.getManager()
                                .getId()
                                .equals(managerId))
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void removeAssignment(Long assignmentId) {
        RestaurantManagerAssignment assignment = assignmentRepository.findById(assignmentId).orElseThrow();
        assignmentRepository.delete(assignment);
    }

    private RestaurantManagerAssignmentDTO mapToDTO(RestaurantManagerAssignment assignment) {
        return new RestaurantManagerAssignmentDTO(
                assignment.getId(),
                assignment.getRestaurant().getName(),
                assignment.getRestaurant().getLocation(),
                assignment.getManager().getUsername(),
                assignment.getManager().getEmail(),
                LocalDateTime.now()
        );
    }



}
