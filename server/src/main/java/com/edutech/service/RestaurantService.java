package com.edutech.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import com.edutech.model.Restaurant;

public interface RestaurantService {

    List<Restaurant> getAllRestuatrant() throws SQLException;

    Restaurant getRestuarantById(Long id) throws SQLException;

    Restaurant addRestaurant(Restaurant restaurant) throws SQLException;

    Restaurant updateRestaurant(Long id, Restaurant restaurant) throws SQLException;

    void deleteRestuarant(Long id) throws SQLException;

}
