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

  private handleError(operation = 'operation', user: object) {
    return (error: any): Observable<object> => {
      console.error(`${operation} failed:`, error);
      // Let the app keep running by returning an empty result.
      return throwError(error);
    };
  }

  login(admin: object) {
    return this.http.post('http://127.0.0.1:8000/api/admin/login', admin, httpOptions)
      .pipe(
        catchError(this.handleError('Admin login', admin))
      );
  }
}
