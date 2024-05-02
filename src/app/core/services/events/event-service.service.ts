import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(private http: HttpClient) { }
  
  baseUrl: string = "http://localhost:8000";

  getEvents(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/events`);
  }
}
