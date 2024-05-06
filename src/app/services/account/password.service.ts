import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }
  private email = new BehaviorSubject<object>({})


  private handleError(operation = 'operation', user: object) {
    return (error: any): Observable<object> => {
      console.error(`${operation} failed:`, error);
      // Let the app keep running by returning an empty result.
      return throwError(error);
    };
  }
  forgetPassword(email: object) {
    return this.http.post('http://127.0.0.1:8000/api/password/forgot', email, httpOptions)
      
    .pipe(
      catchError(this.handleError('send email', email))
    );
  }
  resetPassword(email: object) {
    return this.http.post('http://127.0.0.1:8000/api/password/reset', email, httpOptions)
      
    .pipe(
      catchError(this.handleError('send email', email))
    );
  }
}
