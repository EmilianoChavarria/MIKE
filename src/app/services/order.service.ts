import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
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

  getById(id: number) {
    return this.http.get(`${this.URL}/orders/findByUser/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Endpoints de Orders
  saveOrder(order: any) {
    return this.http.post(`${this.URL}/orders/save`, order, {
      headers: this.getHeaders(),
    })
  }

  cancelOrder(orderId: number) {
    return this.http.put(`${this.URL}/orders/cancelOrder/${orderId}`, null, {
      headers: this.getHeaders(),
    });
  }
}
