import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(private http: HttpClient) { }
  baseUrl: string = "http://localhost:8000/api/profile/edit";




  //avatar routes
  changeAvatar(token: string, avatar: object) {
    const headers = this.getTokenHeaders(token);
    return this.http.post(`${this.baseUrl}/avatar?_method=PUT`, avatar, { headers })
  }

  removeAvatar(token: string) {
    const headers = this.getTokenHeaders(token);
    return this.http.delete(`${this.baseUrl}/avatar`, { headers })
  }
  //end avatar routes




  // general info routes
  changeGeneralInfo(token: string, info: object) {
    const headers = this.getTokenHeaders(token);
    return this.http.post(`${this.baseUrl}/info?_method=PATCH`, info, { headers })
  }

  // end general info routes


  // getTokenHeaders method remains the same
  getTokenHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

  }
}
