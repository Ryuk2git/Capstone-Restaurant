package com.edutech.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class RestaurantManagerAssignment {
    // Attributes
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Date assignedAt;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Long restaurantId;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private Long managerId;

    // Empty Constructor
    public RestaurantManagerAssignment() {
    }

    // Paramatrized Constructor
    public RestaurantManagerAssignment(Long id, Date assignedAt, Long restaurantId, Long managerId) {
        this.id = id;
        this.assignedAt = assignedAt;
        this.restaurantId = restaurantId;
        this.managerId = managerId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(Date assignedAt) {
        this.assignedAt = assignedAt;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }

}
