import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

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

  getTotal() {
    return this.http.get(`${this.URL}/orders/findHistoricalSale`, { headers: this.getHeaders() });
  }

  getSalesByDay() {
    return this.http.get(`${this.URL}/orders/findStats`, { headers: this.getHeaders() });
  }
}
