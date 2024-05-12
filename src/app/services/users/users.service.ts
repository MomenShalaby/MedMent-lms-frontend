import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  private user = new BehaviorSubject<object>({})
  isAuthenticated = new BehaviorSubject<boolean>(false);
  baseUrl: string = `http://localhost:8000/api`;

  getIsAuthenticated() {

    console.log('get isAuthenticated', this.isAuthenticated);
    return this.isAuthenticated.asObservable()
  }
  setIsAuthenticated(authenticated: boolean) {
    this.isAuthenticated.next(authenticated)
  }

  setLoggedUser(user: object) {
    this.user.next(user);   
  }
  getLoggedUser() {
    const token = localStorage.getItem('token');
    if (token && this.isAuthenticated) {
      return this.user
    } else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      return this.http.get(`${this.baseUrl}/profile/index`, { headers })
    }
  }

  reset() {
    this.user.next({});
    console.log(this.user.value);

  }
  private handleError(operation = 'operation', user: object) {
    return (error: any): Observable<object> => {
      console.error(`${operation} failed:`, error);
      // Let the app keep running by returning an empty result.
      return throwError(error);
    };
  }
  /** POST: add a new user to the database */
  addUser(user: object): Observable<object> {
    return this.http.post<object>(`${this.baseUrl}/register`, user, httpOptions)
      .pipe(
        tap(() => {
          this.isAuthenticated.next(true);
        }),
        catchError(this.handleError('addUser', user))
      );
  }



  login(user: object) {
    return this.http.post(`${this.baseUrl}/login`, user, httpOptions)
      .pipe(
        tap(() => {
          this.isAuthenticated.next(true);
        }),
        catchError(this.handleError('addUser', user))
      );
  }
}

