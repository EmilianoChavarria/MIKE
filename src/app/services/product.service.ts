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

  getAll(): Observable<{ object: Product[] }> {
    return this.http.get<{ object: Product[] }>(`${this.URL}/product/`, {
      headers: this.getHeaders(),
    });
  }

 



}
