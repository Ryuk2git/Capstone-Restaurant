package com.edutech.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.edutech.model.Restaurant;
import com.edutech.repository.RestaurantRepository;

public class RestaurantServiceImpl implements RestaurantService {
	@Autowired
	private RestaurantRepository restaurantRepository;

	@Override
	public List<Restaurant> getAllRestuatrant() throws SQLException {
		return restaurantRepository.findAll();
	}

	@Override
	public Restaurant getRestuarantById(Long id) throws SQLException {
		return restaurantRepository.findById(id).get();
	}

	@Override
	public Restaurant addRestaurant(Restaurant restaurant) throws SQLException {
		return restaurantRepository.save(restaurant);
	}

	@Override
	public Restaurant updateRestaurant(Long id, Restaurant restaurant) throws SQLException {
		return restaurantRepository.save(restaurant);
	}

	@Override
	public void deleteRestuarant(Long id) throws SQLException {
restaurantRepository.deleteById(id);
	}
	
}
