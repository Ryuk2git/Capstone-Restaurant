import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../model/order';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl =
    `${environment.apiUrl}/orders`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {

    const token =
      this.authService.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

  }

  getAllOrders(): Observable<Order[]> {

    return this.http.get<Order[]>(
      this.baseUrl,
      {
        headers: this.getHeaders()
      }
    );

  }

  getOrderById(
    id: number
  ): Observable<Order> {

    return this.http.get<Order>(
      `${this.baseUrl}/${id}`,
      {
        headers: this.getHeaders()
      }
    );

  }

  deleteOrder(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.baseUrl}/${id}`,
      {
        headers: this.getHeaders()
      }
    );

  }

}