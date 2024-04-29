import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countries = new BehaviorSubject<any>({}); // Define the type of countries
  private country_id = new BehaviorSubject<string>("0");

  constructor(private http: HttpClient) {
  }

  getCountries(): Observable<any> {
    // return this.countries.asObservable();
    return this.http.get('http://127.0.0.1:8000/api/countries');
  }

  setSelectedCountry(country_id : string){
    this.country_id.next( country_id) ;
  }
}
