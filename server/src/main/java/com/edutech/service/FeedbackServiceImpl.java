package com.edutech.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.model.Feedback;
import com.edutech.repository.FeedbackRepository;

@Service
public class FeedbackServiceImpl implements FeedbackService {
	@Autowired
	private FeedbackRepository feedbackRepository;

	@Override
	public List<Feedback> getAllFeedback() throws SQLException {
		return feedbackRepository.findAll();

	}

	@Override
	public Feedback getFeedBackById(Long id) throws SQLException {
		return feedbackRepository.findById(id).get();
	}

	@Override
	public Feedback addFeedback(Feedback feedback) throws SQLException {
		return feedbackRepository.save(feedback);
	}

}
