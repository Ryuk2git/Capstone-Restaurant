import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../../model/restaurant';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { User } from '../../model/user';
import { RestaurantManagerAssignmentDTO } from '../../model/restaurant-manager-assignment-dto';

@Injectable({
  providedIn:'root'
})
export class RestaurantService {

  private baseUrl=`${environment.apiUrl}/restaurants`;

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

  getAllRestaurants():Observable<Restaurant[]>{

    return this.http.get<Restaurant[]>(
      this.baseUrl,
      {
        headers:this.getHeaders()
      }
    );

  }

  getRestaurantById(
    id:number
  ):Observable<Restaurant>{

    return this.http.get<Restaurant>(
      `${this.baseUrl}/${id}`,
      {
        headers:this.getHeaders()
      }
    );

  }

  addRestaurant(
    restaurant:Restaurant
  ):Observable<Restaurant>{

    return this.http.post<Restaurant>(
      this.baseUrl,
      restaurant,
      {
        headers:this.getHeaders()
      }
    );

  }

  updateRestaurant(
    id:number,
    restaurant:Restaurant
  ):Observable<Restaurant>{

    return this.http.put<Restaurant>(
      `${this.baseUrl}/${id}`,
      restaurant,
      {
        headers:this.getHeaders()
      }
    );

  }

  deleteRestaurant(
    id:number
  ):Observable<any>{

    return this.http.delete(
      `${this.baseUrl}/${id}`,
      {
        headers:this.getHeaders()
      }
    );

  }

  assignManager(
    assignment:RestaurantManagerAssignmentDTO
  ):Observable<any>{

    return this.http.post(
      `${environment.apiUrl}/assignments`,
      assignment,
      {
        headers:this.getHeaders()
      }
    );

  }

}