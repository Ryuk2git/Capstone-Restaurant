export interface LoginResponse {
  id: number;
  token: string;
  username: string;
  email: string;
  role: 'ADMIN' |'MANAGER'|'CUSTOMER';
}


