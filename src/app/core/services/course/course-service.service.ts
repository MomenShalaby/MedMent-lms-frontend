import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:8000/api";

  getAllCourses(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses`);
  }

  getCourseById(id: number | undefined) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses/${id}?include=category`);
  }

  getCourseSections(id: number | undefined) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses/${id}?include=category`);
  }

  getCourseLectures(id: number | undefined) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses/${id}?include=category`);
  }
}
