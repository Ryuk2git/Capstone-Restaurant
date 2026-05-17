package com.edutech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutech.model.RestaurantManagerAssignment;

public interface RestaurantManagerAssignmentRepository extends JpaRepository<RestaurantManagerAssignment, Long> {
	List<RestaurantManagerAssignment> findByManagerId(Long managerId);

}

