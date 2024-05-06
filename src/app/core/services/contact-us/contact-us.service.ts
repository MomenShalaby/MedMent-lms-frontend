import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactUs } from '../../models/contact-us.model';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:8000/api";
  
  sendMessage(contact: ContactUs | undefined) : Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/contactus`, contact);
  }
}
