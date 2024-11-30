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
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3MzI5NDU0NDQsImV4cCI6MTczMzU1MDI0NH0.xOeETW0oarhFoJEJIwD1G1zuGVd34SUZidU-Q2sd6N4`
    });
  }

  private getHeadersWithoutContentType(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3MzI5NDU0NDQsImV4cCI6MTczMzU1MDI0NH0.xOeETW0oarhFoJEJIwD1G1zuGVd34SUZidU-Q2sd6N4`,
    });
  }
  constructor(private http: HttpClient) { }

  // Endpoints de Products

  getAll() {
    return this.http.get(`${this.URL}/product/`, {
      headers: this.getHeaders(),
    });
  }

  saveProduct(product: any) {
    return this.http.post(`${this.URL}/product/save`, product, {
      headers: this.getHeaders(),
    })
  }

  uploadImages(productId: number, colorId: number, files: File[]): Observable<any> {
    const formData = new FormData();

    // Agregar archivos al FormData
    files.forEach((file) => {
      formData.append('images', file, file.name);
    });

    // Construir la URL
    const url = `${this.URL}/images/associate/${productId}/${colorId}`;

    // Enviar la solicitud HTTP (sin 'Content-Type')
    return this.http.post(url, formData, {
      headers: this.getHeadersWithoutContentType(),
    });
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
