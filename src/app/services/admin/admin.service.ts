import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  // private user = new BehaviorSubject<object>({})
  baseUrl: string = 'http://localhost:8000/api';
  token: string = JSON.parse(localStorage.getItem('token') as string);


  login(admin: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/login`, admin, httpOptions);
  }

  getAdmins(): Observable<any> {
    const headers = this.getTokenHeaders(this.token);
    return this.http.get(`${this.baseUrl}/admins?include=permissions`, {
      headers,
    });
  }

  addAdmin(admin: object): Observable<any> {
    const headers = this.getTokenHeaders(this.token);
    return this.http.post(`${this.baseUrl}/admins`, admin, { headers });
  }
  getAdminById(id: number): Observable<any> {
    const headers = this.getTokenHeaders(this.token);
    return this.http.get(`${this.baseUrl}/admins/${id}`, { headers });
  }

  editAdmin(id: number, admin: object): Observable<any> {
    const headers = this.getTokenHeaders(this.token);
    return this.http.put(`${this.baseUrl}/admins/${id}`, admin, { headers });
  }

  deleteAdmin(id: number) {
    const headers = this.getTokenHeaders(this.token);
    return this.http.delete(`${this.baseUrl}/admins/${id}`, { headers });
  }
  getPermissions(): Observable<any> {
    const headers = this.getTokenHeaders(this.token);
    return this.http.get(`${this.baseUrl}/permissions`, { headers });
  }
  getTokenHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
}
