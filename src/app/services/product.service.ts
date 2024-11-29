import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../interface/Product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private URL: string = environment.baseUrl;
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3MzI0MjEwOTYsImV4cCI6MTczMzAyNTg5Nn0.DUiDgoYj8oGnollOUVT0n_Kz_Rl2tYlRB1v02G6Rq0M`
    });
  }
  constructor(private http: HttpClient) { }

  // Endpoints de Products

  getAll(): Observable<{ object: Product[] }> {
    return this.http.get<{ object: Product[] }>(`${this.URL}/product/`, {
      headers: this.getHeaders(),
    });
  }

  saveProduct(product: any) {
    return this.http.post(`${this.URL}/product/save`, product, {
      headers: this.getHeaders(),
    })
  }

  // Endpoints de Products
  getCategories() {
    return this.http.get(`${this.URL}/category/`, {
      headers: this.getHeaders(),
    })
  }


  // Endpoints de Colors
  getColors() {
    return this.http.get(`${this.URL}/color/`, {
      headers: this.getHeaders(),
    })
  }

  saveColor(color: any) {
    return this.http.post(`${this.URL}/color/save`, color, {
      headers: this.getHeaders(),
    })
  }
  

  // Endpoints de Sizes
  getSizes() {
    return this.http.get(`${this.URL}/size/`, {
      headers: this.getHeaders(),
    })
  }

  saveSize(size: any) {
    return this.http.post(`${this.URL}/size/save`, size, {
      headers: this.getHeaders(),
    })
  }





}
