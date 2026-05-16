import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../../model/menu-item';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn:'root'
})
export class MenuItemService {

  private baseUrl=`${environment.apiUrl}menu-items`;

  constructor(
    private http:HttpClient,
    private authService:AuthService
  ){}

  private getHeaders():HttpHeaders{

    const token=this.authService.getToken();

    return new HttpHeaders({
      Authorization:`Bearer ${token}`
    });

  }

  getAllMenuItems():Observable<MenuItem[]>{

    return this.http.get<MenuItem[]>(
      this.baseUrl,
      {
        headers:this.getHeaders()
      }
    );

  }

  getMenuItemById(
    id:number
  ):Observable<MenuItem>{

    return this.http.get<MenuItem>(
      `${this.baseUrl}/${id}`,
      {
        headers:this.getHeaders()
      }
    );

  }

  addMenuItem(
    menuItem:MenuItem
  ):Observable<MenuItem>{

    return this.http.post<MenuItem>(
      this.baseUrl,
      menuItem,
      {
        headers:this.getHeaders()
      }
    );

  }

  updateMenuItem(
    id:number,
    menuItem:MenuItem
  ):Observable<MenuItem>{

    return this.http.put<MenuItem>(
      `${this.baseUrl}/${id}`,
      menuItem,
      {
        headers:this.getHeaders()
      }
    );

  }

  deleteMenuItem(
    id:number
  ):Observable<any>{

    return this.http.delete(
      `${this.baseUrl}/${id}`,
      {
        headers:this.getHeaders()
      }
    );

  }

}