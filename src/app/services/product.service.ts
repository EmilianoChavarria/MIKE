import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
interface Product {
  id: number,
  name: string,
  description: string,
  price: number,
  entry_date: Date,
  category: Category
}

interface Category {
  idCategory: number,
  name: string
}
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
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3MzIzOTI5NTksImV4cCI6MTczMjM5NDM5OX0.6WBFiaT0GRPnyUi3RpYb39RfGcD5o9Eb-ZwKpNZ1Tl8`
    });
  }
  constructor(private http: HttpClient) { }

  getAll(): Observable<{ object: Product[] }> {
    return this.http.get<{ object: Product[] }>(`${this.URL}/products`);
  }



}
