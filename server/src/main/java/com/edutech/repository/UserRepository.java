package com.edutech.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutech.model.User;

public interface UserRepository extends JpaRepository<User,Long>{
	User findByUsername(String username);
	
}

