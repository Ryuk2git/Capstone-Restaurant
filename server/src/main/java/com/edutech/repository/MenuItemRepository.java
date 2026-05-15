package com.edutech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutech.model.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem,Long> {
	List<MenuItem> findByRestaurantId(Long restaurantId);

}

