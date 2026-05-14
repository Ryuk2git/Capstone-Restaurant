package com.edutech.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edutech.model.Feedback;
import com.edutech.service.FeedbackService;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    @Autowired
    FeedbackService feedbackService;

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        try {
            List<Feedback> feed = feedbackService.getAllFeedback();
       
                return ResponseEntity.status(200).body(feed);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/menu/{menuItemId}")
    public ResponseEntity<Feedback> getFeedback(@PathVariable Long menuItemId) {
        try {
            Feedback feed = feedbackService.getFeedBackById(menuItemId);
            return ResponseEntity.status(200).body(feed);
        } catch (Exception e) {

            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping
    public ResponseEntity<Feedback>addFeedback(@RequestBody Feedback feedback){
        try {
            Feedback feed = feedbackService.addFeedback(feedback);
            return ResponseEntity.status(201).body(feed);
        } catch (Exception e) {
            
            return ResponseEntity.status(500).build();
        }
    }

}
