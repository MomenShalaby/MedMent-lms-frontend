import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/tags`, {headers});
  }

  addUserTags(tags: number[]): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/usertags`, tags, {headers});
  }
}
