import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
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
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdWFuQGdtYWlsLmNvbSIsImlhdCI6MTczMzcyMDM5NiwiZXhwIjoxNzM0MzI1MTk2fQ.MXqrBdCfqUF6NaaB-NkiUZqGMrUNBRDPmrq_9MWc1iI`
    });
  }

  private getHeadersWithoutContentType(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdWFuQGdtYWlsLmNvbSIsImlhdCI6MTczMzcyMDM5NiwiZXhwIjoxNzM0MzI1MTk2fQ.MXqrBdCfqUF6NaaB-NkiUZqGMrUNBRDPmrq_9MWc1iI`,
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

  updateProduct(product: any) {
    return this.http.put(`${this.URL}/product/update`, product, {
      headers: this.getHeaders(),
    })
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.URL}/product/deleteById/${id}`, {
      headers: this.getHeaders(),
    })
  }

  getProducts(idProduct: number, idColor: number, idSize: number): Observable<any[]> {
    return this.http.get<any[]>(this.URL).pipe(
      map(products => 
        products.filter(product =>
          product.id === idProduct &&
          product.color.id === idColor &&
          product.size.id === idSize
        )
      )
    );
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

  // Endpoints de categories
  getCategories() {
    return this.http.get(`${this.URL}/category/`, {
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
