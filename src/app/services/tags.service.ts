import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private apiUrl = 'http://127.0.0.1:8000/api/tags';
  // private tags = new BehaviorSubject<any>({}); 

  constructor(private http: HttpClient) { }
  getTags(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }
  getTagsByPage(page: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}`);
  }
}
