import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  // private user = new BehaviorSubject<object>({})
  baseUrl: string = "http://localhost:8000/api";
  token : string = JSON.parse(localStorage.getItem('token') as string)

  private handleError(operation = 'operation', user: object) {
    return (error: any): Observable<object> => {
      console.error(`${operation} failed:`, error);
      // Let the app keep running by returning an empty result.
      return throwError(error);
    };
  }

  login(admin: object) : Observable<any>{
    return this.http.post(`${this.handleError}/admin/login`, admin, httpOptions)
  }

  getAdmins() : Observable<any> {
    const headers = this.getTokenHeaders(this.token)
    return this.http.post(`${this.baseUrl}/admins?include=permissions`, { headers})

  }
  getTokenHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
  }
}

