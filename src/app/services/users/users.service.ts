import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
export class UsersService {

  constructor(private http: HttpClient) { }
  private user = new BehaviorSubject<object>({})


  setLoggedUser(newUser: object) {
    this.user.next(newUser)
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
    return this.http.post<object>('http://127.0.0.1:8000/api/register', user, httpOptions)
      .pipe(
        catchError(this.handleError('addUser', user))
      );
  }


  
  login(user: object) {
    return this.http.post('http://127.0.0.1:8000/api/login', user, httpOptions)
      .pipe(
        catchError(this.handleError('addUser', user))
      );
  }
}

