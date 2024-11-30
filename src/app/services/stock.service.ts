import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
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

  getStock(){
    return this.http.get(`${this.URL}/stockControl/`, {
      headers: this.getHeaders(),
    })
  }

  verifyStock(productId: number) {
    return this.http.get(`${this.URL}/stockControl/findOne/${productId}`, {
      headers: this.getHeaders(),
    })
  }

  saveStock(stock: any) {
    return this.http.post(`${this.URL}/stockControl/save`, stock, {
      headers: this.getHeaders(),
    })
  }
}
