import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../../model/feedback';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.baseUrl, feedback);
  }

  getFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.baseUrl);
  }

  getFeedbackByMenu(menuItemId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/menu/${menuItemId}`);
  }
  
getFeedbackByRestaurant(restaurantId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/restaurant/${restaurantId}`);
  }

  deleteFeedback(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

}
