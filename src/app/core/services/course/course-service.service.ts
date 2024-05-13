import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCourse } from '../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:8000/api";

  getAllCourses(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses?include=category,sections,sections.lectures`);
  }

  getCourseById(id: number | undefined) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses/${id}?include=category,sections,sections.lectures`);
  }

  getCategoryCourses(id: number | undefined) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses?categoryId=${id}`);
  }

  getRelatedCourse(prerequisites: string | undefined) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses?prerequisites=${prerequisites}`);
  }

  getCourseSections(id: number | undefined) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses/${id}?include=category`);
  }

  getCourseLectures(id: number | undefined) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses/${id}?include=category`);
  }

  addCourse(course: FormData) : Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/courses`, course, {headers});
  }
}
