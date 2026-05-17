package com.edutech.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

@Entity
public class RestaurantManagerAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Manager is required")
    @ManyToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @NotNull(message = "Restaurant is required")
    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @ManyToOne
    @JoinColumn(name = "assigned_by", nullable = true)
    private User assignedBy;

    private LocalDateTime assignedAt;

    // @OneToMany(mappedBy = "manager")
    // private List<RestaurantManagerAssignment> assignments;

    public RestaurantManagerAssignment() {
    }

    public RestaurantManagerAssignment(Long id, @NotNull(message = "Manager is required") User manager,
            @NotNull(message = "Restaurant is required") Restaurant restaurant,
            List<RestaurantManagerAssignment> assignments) {
        this.id = id;
        this.manager = manager;
        this.restaurant = restaurant;
        // this.assignments = assignments;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getManager() {
        return manager;
    }

    public void setManager(User manager) {
        this.manager = manager;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public User getAssignedBy() {
        return assignedBy;
    }

    public void setAssignedBy(User assignedBy) {
        this.assignedBy = assignedBy;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }

}
