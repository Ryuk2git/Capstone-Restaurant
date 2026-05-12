package com.edutech.repository;

import com.edutech.model.User;

public interface UserRepository{
	User findByUsername(String username);
	
}

