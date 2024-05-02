import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:8000";

  getAllCourses(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/courses`);
  }

  getCourseById(id: number | undefined) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/courses/${id}`);
  }
}
