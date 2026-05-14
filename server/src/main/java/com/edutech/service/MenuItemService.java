package com.edutech.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import com.edutech.model.MenuItem;

public interface MenuItemService {

	List<MenuItem> getAllMenuItem() throws SQLException;

	MenuItem getMenuItemById(Long id) throws SQLException;

	MenuItem addMenuItem(MenuItem menuItem) throws SQLException;

	MenuItem updateMenuItem(Long id, MenuItem menuItem) throws SQLException;

	void deleteMenuItem(Long id) throws SQLException;

}
