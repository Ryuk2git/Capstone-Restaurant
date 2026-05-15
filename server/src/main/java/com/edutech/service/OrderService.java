package com.edutech.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.edutech.model.MenuItem;
import com.edutech.model.Order;

public interface OrderService {
    Order createOrder(Order order);
    List<Order> getAllOrders();
    Order getOrderById(Long id);
    List<Order> getOrdersByUser(Long userId);
    void cancelOrder(Long id);
    void deleteOrder(Long id);
    Double calculateTotal(List<MenuItem> items);

}
