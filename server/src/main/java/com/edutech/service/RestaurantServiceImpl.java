package com.edutech.service;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;

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
public class RestaurantServiceImpl implements RestaurantService {
	@Autowired
	private RestaurantRepository restaurantRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RestaurantManagerAssignmentRepository assignmentRepository;

	@Override
	public Restaurant createRestaurant(Restaurant restaurant) {
		return restaurantRepository.save(restaurant);
	}

	@Override
	public List<Restaurant> getAllRestaurants() {
		return restaurantRepository.findAll();
	}

	@Override
	public Restaurant getRestaurantById(Long id) {
		return restaurantRepository.findById(id).orElseThrow();
	}

	@Override
	public Restaurant updateRestaurant(Long id, Restaurant updatedRestaurant) {
		Restaurant restaurant = getRestaurantById(id);

		restaurant.setName(updatedRestaurant.getName());
		restaurant.setLocation(updatedRestaurant.getLocation());
		restaurant.setAddress(updatedRestaurant.getAddress());
		restaurant.setEmail(updatedRestaurant.getEmail());
		restaurant.setPhoneNumber(updatedRestaurant.getPhoneNumber());

		return restaurantRepository.save(restaurant);
	}

	@Override
	public void deleteRestaurant(Long id) {
		Restaurant restaurant = getRestaurantById(id);
		restaurantRepository.delete(restaurant);
	}

	@Override
	public void assignManager(AssignManagerRequest request) {
		Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId()).orElseThrow();
		User manager = userRepository.findById(request.getUser()).orElseThrow();
		RestaurantManagerAssignment assignment = new RestaurantManagerAssignment();

		assignment.setRestaurant(restaurant);
		assignment.setManager(manager);

		assignmentRepository.save(assignment);
	}

	public RestaurantManagerAssignmentDTO mapToDTO(RestaurantManagerAssignment assignment) {
		return new RestaurantManagerAssignmentDTO(
				assignment.getId(),
				assignment.getRestaurant().getName(),
				assignment.getRestaurant().getLocation(),
				assignment.getManager().getUsername(),
				assignment.getManager().getEmail(),
				LocalDateTime.now());
	}

}
