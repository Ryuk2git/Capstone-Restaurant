package com.edutech.model;

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
@Table(name = "") // To be added later
public class MenuItem {
	// Attribute Declarations
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "menu_type", nullable = false)
	private String menuType;

	@Column(name = "price", nullable = false)
	private Double price;

	@Column(name = "quantity", nullable = false)
	private Integer quantity;

	@ManyToOne
	@JoinColumn(name = "restaurant_id")
	@JsonBackReference
	private Restaurant restaurant;

	// Empty Constructor
	public MenuItem() {
    }

	// Paramatrized Constructor
	public MenuItem(Long id, String name, String menuType, Double price, Integer quantity, Restaurant restaurant) {
        this.id = id;
        this.name = name;
        this.menuType = menuType;
        this.price = price;
        this.quantity = quantity;
        this.restaurant = restaurant;
    }

	// Getters and Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMenuType() {
		return menuType;
	}

	public void setMenuType(String menuType) {
		this.menuType = menuType;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

}
