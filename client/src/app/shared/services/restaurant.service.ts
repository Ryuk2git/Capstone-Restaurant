import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../../model/restaurant';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { User } from '../../model/user';
import { AssignManagerRequest } from '../../model/loginrequest';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
   //Write your logic here
}
