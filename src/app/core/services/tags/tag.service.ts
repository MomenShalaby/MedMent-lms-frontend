import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const token = JSON.parse(localStorage.getItem('token') as string)
@Injectable({
  providedIn: 'root'
})
export class TagService {
  getTagsByPage(page: number): any {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:8000/api";

  getTags(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tags`);
  }
  getAllTags(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/tags/all`, { headers });
  }

  addUserTags(tags: number[]): Observable<any> {   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.baseUrl}/tags/me`, tags, { headers });
  }
}
