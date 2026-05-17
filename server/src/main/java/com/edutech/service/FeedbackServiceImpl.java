package com.edutech.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.dto.FeedbackDTO;
import com.edutech.model.Feedback;
import com.edutech.model.MenuItem;
import com.edutech.repository.FeedbackRepository;
import com.edutech.repository.MenuItemRepository;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Override
    public Feedback submitFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public Feedback submitFeedbackDTO(FeedbackDTO dto) {
        MenuItem menuItem = menuItemRepository.findById(dto.getMenuItemId()).orElseThrow();
        Feedback feedback = new Feedback();

        feedback.setCustomerName(dto.getCustomerName());
        feedback.setComment(dto.getComment());
        feedback.setRating(dto.getRating());
        feedback.setMenuItem(menuItem);

        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    @Override
    public List<Feedback> getFeedbackByMenu(Long menuItemId) {
        return feedbackRepository.findByMenuItemId(menuItemId);
    }

    public FeedbackDTO mapToDTO(Feedback feedback) {
        return new FeedbackDTO(
                feedback.getCustomerName(),
                feedback.getComment(),
                feedback.getRating(),
                feedback.getMenuItem().getId());
    }

    @Override
    public Feedback getFeedbackById(Long id) {
        return feedbackRepository.findById(id).orElseThrow();
    }

    @Override
    public Feedback updateFeedback(Long id, Feedback updatedFeedback) {
        Feedback feedback = getFeedbackById(id);

        feedback.setCustomerName(updatedFeedback.getCustomerName());
        feedback.setComment(updatedFeedback.getComment());
        feedback.setRating(updatedFeedback.getRating());
        feedback.setMenuItem(updatedFeedback.getMenuItem());
        if (updatedFeedback.getRestaurant() != null) {
            feedback.setRestaurant(updatedFeedback.getRestaurant());
        }

        return feedbackRepository.save(feedback);
    }

    @Override
    public void deleteFeedback(Long id) {
        Feedback feedback = getFeedbackById(id);
        feedbackRepository.delete(feedback);
    }

}
