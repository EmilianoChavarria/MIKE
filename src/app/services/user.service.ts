import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL: string = environment.baseUrl;
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3MzMxNjE2MzQsImV4cCI6MTczMzc2NjQzNH0.dg1y0Eqw1TOdetNPrUwH58DVZ9zqktnLRsk6YxRQugk`
    });
  }
  constructor(private http: HttpClient) { }

  login(userInfo: any) {
    return this.http.post(`${this.URL}/auth/login`, userInfo);
  }
  register(userInfo: any) {
    return this.http.post(`${this.URL}/auth/register`, userInfo);
  }
  update(userInfo: any) {
    return this.http.put(`${this.URL}/user/update`, userInfo, {
      headers: this.getHeaders(),
    });
  }

  findOne(id: number) {
    return this.http.get(`${this.URL}/user/findById/${id}`, {
      headers: this.getHeaders(),
    })
  }
}
