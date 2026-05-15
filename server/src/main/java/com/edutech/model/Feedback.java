package com.edutech.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "feedback")
public class Feedback {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @NotBlank(message = "Customer name is required")
   @Size(min = 2, max = 50, message = "Customer name must be between 2 and 50 characters")
   @Column(name = "customer_name")
   private String customerName;

   @NotBlank(message = "Comment is required")
   @Size(min = 5, max = 500, message = "Comment must be between 5 and 500 characters")
   @Column(name = "comment")
   private String comment;

   @NotNull(message = "Rating is required")
   @Min(value = 1, message = "Rating must be at least 1")
   @Max(value = 5, message = "Rating cannot exceed 5")
   @Column(name = "rating")
   private Integer rating;

   @ManyToOne
   @JoinColumn(name = "menu_item_id")
   @JsonIgnore
   private MenuItem menuItem;

   @ManyToOne
   @JoinColumn(name = "restaurant_id")
   private Restaurant restaurant;

   public Feedback() {
   }

   public Feedback(Long id, String customerName, String comment, Integer rating, MenuItem menuItem, Restaurant restaurant) {
    this.id = id;
    this.customerName = customerName;
    this.comment = comment;
    this.rating = rating;
    this.menuItem = menuItem;
    this.restaurant = restaurant;
   }

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

   public String getComment() {
      return comment;
   }

   public void setComment(String comment) {
      this.comment = comment;
   }

   public Integer getRating() {
      return rating;
   }

   public void setRating(Integer rating) {
      this.rating = rating;
   }

   public MenuItem getMenuItem() {
      return menuItem;
   }

   public void setMenuItem(MenuItem menuItem) {
      this.menuItem = menuItem;
   }

   public Restaurant getRestaurant() {
      return restaurant;
   }

   public void setRestaurant(Restaurant restaurant) {
      this.restaurant = restaurant;
   }

}
