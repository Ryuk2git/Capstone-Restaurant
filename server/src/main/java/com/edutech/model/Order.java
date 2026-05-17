package com.edutech.model;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "customer_orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @NotBlank(message = "Customer name is required")
    @Size(min = 2, max = 50, message = "Customer name must be between 2 and 50 characters")
    @Column(name = "customer_name")
    private String customerName;

    @NotNull(message = "Order time is required")
    @Column(name = "order_time")
    private Date orderTime;

    @NotBlank(message = "Order status is required")
    @Pattern(
        regexp = "PENDING|CONFIRMED|PREPARING|DELIVERED|CANCELLED",
        message = "Invalid order status"
    )
    @Column(name = "status")
    private String status;

    @NotNull(message = "Total amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Total amount must be greater than 0")
    @Digits(integer = 10, fraction = 2, message = "Invalid amount format")
    @Column(name = "total_amount")
    private Double totalAmount;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    @JsonIgnoreProperties({"menuItems"})
    private Restaurant restaurant;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference(value = "user-order")
    private User user;

	// Empty Constructor
    public Order() {
    }

	// Paramatrized Constructor
    public Order(Long id, String customerName, Date orderTime, String status, Double totalAmount, Restaurant restaurant, User user) {
        this.id = id;
        this.customerName = customerName;
        this.orderTime = orderTime;
        this.status = status;
        this.totalAmount = totalAmount;
        this.restaurant = restaurant;
        this.user = user;
    }

	// Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Date getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
