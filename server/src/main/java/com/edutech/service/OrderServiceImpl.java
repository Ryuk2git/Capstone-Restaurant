package com.edutech.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.edutech.model.Order;
import com.edutech.repository.OrderRepository;

public class OrderServiceImpl implements OrderService {
    
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> getAllOrders() throws SQLException {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(Long id) throws SQLException {
        return orderRepository.findById(id).get();
    }

    @Override
    public Order addOrder(Order order) throws SQLException {
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrder(Long id, Order order) throws SQLException {
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Long id) throws SQLException {
        orderRepository.deleteById(id);
    }

    // Write your logic here

}
