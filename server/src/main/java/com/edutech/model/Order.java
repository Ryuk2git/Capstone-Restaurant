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

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "customer_orders")
public class Order {
	// Attribute Declarations
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_id")
	private Long id;

	@Column(name = "customer_name")
	private String customerName;

	@Column(name = "order_time")
	private Date orderTime; // sql date

	@Column(name = "status")
	private String status;

	@Column(name = "total_amount")
	private Double totalAmount;

	@ManyToOne
	@JoinColumn(name = "restaurant_id")
	@JsonBackReference
	private Restaurant restaurant;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonBackReference
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
