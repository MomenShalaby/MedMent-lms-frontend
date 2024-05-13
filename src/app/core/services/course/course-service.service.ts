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
    const headers = new HttpHeaders().set('Authorization', `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2FkbWluL2xvZ2luIiwiaWF0IjoxNzE1NTk5NDg1LCJleHAiOjE3MTU2MDMwODUsIm5iZiI6MTcxNTU5OTQ4NSwianRpIjoiN0ZUMFBuNDd1UFR5aHkwSyIsInN1YiI6IjEiLCJwcnYiOiJkZjg4M2RiOTdiZDA1ZWY4ZmY4NTA4MmQ2ODZjNDVlODMyZTU5M2E5In0.UuLnPgWljn72YnYuuZNM3ykXtDOlh5RZVb1Z1y47oUw`);
    // headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(`${this.baseUrl}/courses`, course, {headers});
  }
}
