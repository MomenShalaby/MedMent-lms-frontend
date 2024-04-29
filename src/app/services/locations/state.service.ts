import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private countries = new BehaviorSubject<any>({}); // Define the type of countries

  constructor(private http: HttpClient) {
  }

  getStates(country_id: string ): Observable<any> {
    // return this.countries.asObservable();
    return this.http.get(`http://127.0.0.1:8000/api/countries/${country_id}/states`);
  }
  
}
