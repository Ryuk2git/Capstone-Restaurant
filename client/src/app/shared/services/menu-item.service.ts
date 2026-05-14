import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../../model/menu-item';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

   
 private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addMenuItem(menuItem: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(this.baseUrl, menuItem);
  }

  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.baseUrl);
  }

  getMenuItemById(id: number): Observable<MenuItem> {
    return this.http.get<MenuItem>(`${this.baseUrl}/${id}`);
  }

  getMenuItemsByRestaurant(restaurantId: number): Observable<MenuItem[]> {
    
return this.http.get<MenuItem[]>(`${this.baseUrl}/restaurant/${restaurantId}`);
  }

  updateMenuItem(id: number, menuItem: MenuItem): Observable<MenuItem> {
    return this.http.put<MenuItem>(`${this.baseUrl}/${id}`, menuItem);
  }

  deleteMenuItem(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  searchByName(name: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.baseUrl}?name=${name}`);
  }
  
filterByType(menuType: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.baseUrl}?menuType=${menuType}`);
  }


}
