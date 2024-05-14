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
    return this.http.get<any>(`${this.baseUrl}/events/${id}?include=attendees,attendees.user,tags`);
  }

  addEvent(eventData: object): Observable<any> {
    const token = JSON.parse(localStorage.getItem("token") as string);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/events`, eventData, { headers });
  }
  updateEvent(eventData: object, id: number): Observable<any> {
    const token = JSON.parse(localStorage.getItem("token") as string);
    const headers = this.getTokenHeaders(token)
    return this.http.post<any>(`${this.baseUrl}/events/${id}?_method=PUT`, eventData, { headers });
  }

  updateEventImage(eventData: object, id :number): Observable<any> {
    const token = JSON.parse(localStorage.getItem("token") as string);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/events/${id}/image?_method=PUT`, eventData, { headers });
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

  getTagEvents(id: number | undefined): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/events/${id}?include=events`);
  }

  getTokenHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
  }
}

