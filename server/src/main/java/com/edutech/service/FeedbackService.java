package com.edutech.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.edutech.model.Feedback;

@Service
public interface FeedbackService {

	List<Feedback> getAllFeedback() throws SQLException;

	Feedback getFeedBackById(Long id) throws SQLException;

	Feedback addFeedback(Feedback feedback) throws SQLException;

}
