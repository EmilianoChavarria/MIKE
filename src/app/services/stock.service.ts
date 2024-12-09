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

  private getHeaders1(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdWFuQGdtYWlsLmNvbSIsImlhdCI6MTczMzcyMDM5NiwiZXhwIjoxNzM0MzI1MTk2fQ.MXqrBdCfqUF6NaaB-NkiUZqGMrUNBRDPmrq_9MWc1iI`
    });
  }

  constructor(private http: HttpClient) { }

  getStock(){
    return this.http.get(`${this.URL}/stockControl/`, {
      headers: this.getHeaders1(),
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

  updateStock(stock: any) {
    return this.http.put(`${this.URL}/stockControl/updateStock`, stock, {
      headers: this.getHeaders(),
    })
  }

  deleteStock(id: number) {
    return this.http.delete(`${this.URL}/stockControl/deleteStockControl/${id}`, {
      headers: this.getHeaders(),
    })
  }
}
