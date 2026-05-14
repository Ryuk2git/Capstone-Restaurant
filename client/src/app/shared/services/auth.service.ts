import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role, User } from '../../model/user';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../model/loginrequest';
import { LoginResponse } from '../../model/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
 private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, loginRequest);
  }

  getLoggedInUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/userDetails`);
  }

  
getUserRoles(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/userRoles`);
  }

  getManagers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/managers`);
  }

  saveLoginData(response: LoginResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('userId', response.id.toString());
    localStorage.setItem('username', response.username);
    localStorage.setItem('email', response.email);
    localStorage.setItem('role', response.role);
  }

getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserId(): number {
    return Number(localStorage.getItem('userId'));
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  
logout(): void {
    localStorage.clear();
  }

}
