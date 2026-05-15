import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role, User } from '../../model/user';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../../model/loginrequest';
import { LoginResponse } from '../../model/login-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  // REGISTER FUNCTION

  register(user: User): Observable<string> {
    return this.http.post(`${this.baseUrl}auth/register`, user, {
      responseType: 'text' // backend returns plain string
    });
  }

  // LOGIN FUNCTION
  // Sends login request and stores user + token
  login(credentials: LoginRequest, rememberMe: boolean): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}auth/login`, credentials).pipe(
      tap((response: LoginResponse) => {
        // Decide storage type
        const storage = rememberMe ? localStorage : sessionStorage;

        // Clear old data
        this.clearStorage();

        storage.setItem('token', response.token); //  Store token

        // store user data
        storage.setItem('userId', String(response.userId));
        storage.setItem('username', response.username);
        storage.setItem('email', response.email);
        storage.setItem('role', response.role);
      })
    );
  }

  // LOGOUT FUNCTION
  logout(): void {
    this.clearStorage();
    this.router.navigate(['/login']);
  }

  // CHECK IF USER LOGGED IN
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // GET TOKEN
  getToken(): string | null {
    return sessionStorage.getItem('token') || localStorage.getItem('token');
  }

  // GET COMPLETE USER OBJECT
  // Constructs User object from storage
  getCurrentUser(): User | null {

    const id = this.getUserId();
    const username = this.getValue('username');
    const email = this.getValue('email');
    const role = this.getRole();

    // If any essential value missing → return null
    if (
      id === null ||
      Number.isNaN(id) ||
      !username ||
      !email ||
      !role
    ) {
      return null;
    }

    return {
      id: id,
      username: username,
      email: email,
      role: role,
      password: '',   // not stored for security
      orders: []      // empty (backend fetch needed)
    };
  }

  // GET USER ROLE (Enum)
  // Converts string → Role enum
  getRole(): Role | null {
    const roleStr = this.getValue('role');
    if (!roleStr) return null;
    // Convert string to enum safely
    if (roleStr === 'ADMIN') return Role.ADMIN;
    if (roleStr === 'MANAGER') return Role.MANAGER;
    if (roleStr === 'CUSTOMER') return Role.CUSTOMER;

    return null;
  }

  // ROLE CHECK (IMPORTANT)
  // Used for role-based access control
  hasRole(role: Role): boolean {
    return this.getRole() === role;
  }

  // GET USER ID
  getUserId(): number | null {
    const id = this.getValue('userId');
    return id ? Number(id) : null;
  }

  // CREATE AUTH HEADERS
  // Adds JWT token to API requests
  getAuthHeaders(): HttpHeaders {

    const token = this.getToken();

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  // HTTP OPTIONS (REUSABLE)
  getAuthOptions() {
    return {
      headers: this.getAuthHeaders()
    };
  }

  // HELPER METHOD TO GET VALUE
  // Reads from session first, then local
  private getValue(key: string): string | null {
    return sessionStorage.getItem(key) || localStorage.getItem(key);
  }

  // CLEAR STORAGE
  private clearStorage(): void {
    const keys = ['token', 'userId', 'username', 'email', 'role'];
    keys.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  }
}
