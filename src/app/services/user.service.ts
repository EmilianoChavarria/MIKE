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
      'Authorization': `Bearer ${token}`
    });
  }
  constructor(private http: HttpClient) { }

  login(userInfo: any) {
    return this.http.post(`${this.URL}/auth/login`, userInfo);
  }

  findOne(id: number) {
    return this.http.get(`${this.URL}/user/findById/${id}`, {
      headers: this.getHeaders(),
    })
  }
}
