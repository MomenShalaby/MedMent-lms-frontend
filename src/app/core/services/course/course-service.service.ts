import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateCourse } from '../../models/course.model';

const token = JSON.parse(localStorage.getItem("token")as string);

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
    return this.http.get<any>(`${this.baseUrl}/courses/${id}/sections?include=lectures`);
  }

  getCourseSection(id: number | undefined,  sectionId: number | undefined) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses/${id}/sections/${sectionId}?include=lectures`);
  }

  getCourseLectures(id: number | undefined, sectionId: number | undefined) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses/${id}/sections/${sectionId}/lectures`);
  }

  getCourseLecture(id: number | undefined, sectionId: number | undefined, lectureId: number | undefined) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses/${id}/sections/${sectionId}/lectures/${lectureId}`);
  }

  addCourse(course: FormData) : Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/courses`, course, {headers});
  }
  
  updateCourse(id: number | undefined, course: UpdateCourse) : Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.baseUrl}/courses/${id}`, course, {headers});
  }

  updateCourseImage(id: number | undefined, image: FormData) : Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/courses/${id}/image?_method=PUT`, image, {headers});
  }

  deleteCourse(id: number | undefined) : Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.baseUrl}/courses/${id}`, {headers});
  }

  addCourseSection(id: number | undefined, course: FormData) : Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/courses/${id}/sections`, course, {headers});
  }
  
  updateCourseSection(id: number | undefined, sectionId: number | undefined, course: FormData) : Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.baseUrl}/courses/${id}/sections/${sectionId}`, course, {headers});
  }

  deleteCourseSection(id: number | undefined, sectionId: number | undefined) : Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.baseUrl}/courses/${id}/sections/${sectionId}`, {headers});
  }

  addCourseLecture(id: number | undefined, sectionId: number | undefined, course: FormData) : Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/courses/${id}/sections/${sectionId}/lectures`,
      course, {headers});
  }
  
  updateCourseLecture(id: number | undefined, sectionId: number | undefined,
    lectureId: number | undefined, course: FormData) : Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.baseUrl}/courses/${id}/sections/${sectionId}/lectures/${lectureId}`,
      course, {headers});
  }

  deleteCourseLecture(id: number | undefined, sectionId: number | undefined) : Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.baseUrl}/courses/${id}/sections/${sectionId}`, {headers});
  }
}
