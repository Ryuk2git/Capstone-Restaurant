package com.edutech.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import com.edutech.model.Order;

public interface OrderService {

	List<Order> getAllOrders() throws SQLException;

	Order getOrderById(Long id) throws SQLException;

	Order addOrder(Order order) throws SQLException;

	Order updateOrder(Long id, Order order) throws SQLException;

	void deleteOrder(Long id) throws SQLException;

}
