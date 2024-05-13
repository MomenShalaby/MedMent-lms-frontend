import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:8000/api";
  token: string = JSON.parse(localStorage.getItem("token") as string);

  getEvents(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/events`);
  }

  getEventById(id: number | undefined): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/events/${id}`);
  }

  addEvent(eventData: object): Observable<any> {
    const token = JSON.parse(localStorage.getItem("token") as string);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/events`, eventData, { headers });
  }

  deleteEvent(id: number): Observable<any> {
    const token = JSON.parse(localStorage.getItem("token") as string);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.baseUrl}/events/${id}`, { headers });
  }

  enrollToEvent(id: number | undefined): Observable<any> {
    const token = JSON.parse(localStorage.getItem("token") as string);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/events/${id}/attendees`, null, { headers });
  }
}
