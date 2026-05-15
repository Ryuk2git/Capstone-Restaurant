package com.edutech.service;

import java.sql.SQLException;
import java.util.List;


import com.edutech.model.Feedback;

public interface FeedbackService {
    Feedback submitFeedback(Feedback feedback);
    List<Feedback> getAllFeedback();
    List<Feedback> getFeedbackByMenu(Long menuItemId);

    // Not given in instruction but may be needed
    Feedback getFeedbackById(Long id);
    Feedback updateFeedback(Long id,Feedback feedback);
    void deleteFeedback(Long id);

}
