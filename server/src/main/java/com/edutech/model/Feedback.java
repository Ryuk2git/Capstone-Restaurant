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
@Table(name = "feedback")
public class Feedback {
   // Attribute Declarations
   @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @Column(name = "customer_name")
   private String customerName;

   @Column(name = "comment")
   private String comment;

   @Column(name = "rating")
   private Integer rating;

   @ManyToOne
   @JoinColumn(name = "menu_item_id")
   @JsonBackReference
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
