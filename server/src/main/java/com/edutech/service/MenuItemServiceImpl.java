package com.edutech.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.model.MenuItem;
import com.edutech.model.Restaurant;
import com.edutech.repository.MenuItemRepository;
import com.edutech.repository.RestaurantRepository;

@Service
public class MenuItemServiceImpl implements MenuItemService {
    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public MenuItem addMenuItem(MenuItem menuItem) {
        Long restaurantId = menuItem.getRestaurant().getId();
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(() -> new RuntimeException("Restaurant not found"));

        menuItem.setRestaurant(restaurant);

        return menuItemRepository.save(menuItem);
    }

    @Override
    public MenuItem updateMenuItem(Long id, MenuItem item) {

        MenuItem existing = menuItemRepository.findById(id).orElseThrow();

        existing.setName(item.getName());
        existing.setMenuType(item.getMenuType());
        existing.setPrice(item.getPrice());
        existing.setQuantity(item.getQuantity());

        return menuItemRepository.save(existing);
    }

    @Override
    public void deleteMenuItem(Long id) {
        MenuItem item = menuItemRepository.findById(id).orElseThrow();
        menuItemRepository.delete(item);
    }

    @Override
    public List<MenuItem> getMenuItems() {
        return menuItemRepository.findAll();
    }

    @Override
    public List<MenuItem> getMenuItemsByRestaurant(Long restaurantId) {
        return menuItemRepository.findByRestaurantId(restaurantId);
    }

}
