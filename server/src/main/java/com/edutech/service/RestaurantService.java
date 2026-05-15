package com.edutech.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.edutech.dto.AssignManagerRequest;
import com.edutech.model.Restaurant;

public interface RestaurantService {
    Restaurant createRestaurant(Restaurant restaurant);
    List<Restaurant> getAllRestaurants();
    Restaurant getRestaurantById(Long id);
    Restaurant updateRestaurant(Long id, Restaurant restaurant);
    void deleteRestaurant(Long id);
    void assignManager(AssignManagerRequest request);
}
