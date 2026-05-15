package com.edutech.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.edutech.model.MenuItem;
public interface MenuItemService {
    MenuItem addMenuItem(MenuItem menuItem);
    MenuItem updateMenuItem(Long id, MenuItem item);
    void deleteMenuItem(Long id);
    List<MenuItem> getMenuItems();
    List<MenuItem> getMenuItemsByRestaurant(Long restaurantId);
}
