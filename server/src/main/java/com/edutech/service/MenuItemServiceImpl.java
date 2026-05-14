package com.edutech.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.edutech.model.MenuItem;
import com.edutech.repository.MenuItemRepository;

public class MenuItemServiceImpl implements MenuItemService {
    @Autowired
    private MenuItemRepository menuItemRepository;

    @Override
    public List<MenuItem> getAllMenuItem() throws SQLException {
        return menuItemRepository.findAll();
    }

    @Override
    public MenuItem getMenuItemById(Long id) throws SQLException {
        return menuItemRepository.findById(id).get();
    }

    @Override
    public MenuItem addMenuItem(MenuItem menuItem) throws SQLException {
        return menuItemRepository.save(menuItem);
    }

    @Override
    public MenuItem updateMenuItem(Long id, MenuItem menuItem) throws SQLException {
        return menuItemRepository.save(menuItem);
    }

    @Override
    public void deleteMenuItem(Long id) throws SQLException {
        menuItemRepository.deleteById(id);
    }
	

	

}
