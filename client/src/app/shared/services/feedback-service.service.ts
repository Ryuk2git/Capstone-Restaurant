import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../../model/feedback';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseUrl =
    `${environment.apiUrl}/feedback`;

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

  getAllFeedback(): Observable<Feedback[]> {

    return this.http.get<Feedback[]>(
      this.baseUrl,
      {
        headers: this.getHeaders()
      }
    );

  }

  addFeedback(
    feedback: Feedback
  ): Observable<Feedback> {

    return this.http.post<Feedback>(
      this.baseUrl,
      feedback,
      {
        headers: this.getHeaders()
      }
    );

  }

  deleteFeedback(
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