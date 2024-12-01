import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cartItems';
  private items: any[] = [];
  private cartItemsCount: BehaviorSubject<number>;
  private URL: string = environment.baseUrl;
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3MzI5NDU0NDQsImV4cCI6MTczMzU1MDI0NH0.xOeETW0oarhFoJEJIwD1G1zuGVd34SUZidU-Q2sd6N4`
    });
  }
  cartItemsCount$;

  constructor(private http: HttpClient) {
    // Inicializa los items desde el localStorage
    const storedItems = localStorage.getItem(this.storageKey);
    this.items = storedItems ? JSON.parse(storedItems) : [];

    // Inicializa BehaviorSubject con el total de cantidades
    this.cartItemsCount = new BehaviorSubject<number>(this.getTotalQuantity());
    this.cartItemsCount$ = this.cartItemsCount.asObservable();
  }

  // Obtiene el total de las cantidades de los productos en el carrito
  private getTotalQuantity(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Guarda los cambios en el localStorage y actualiza el BehaviorSubject
  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    this.cartItemsCount.next(this.getTotalQuantity());  // Actualiza con el total de cantidades
  }

  // Agrega un producto al carrito o incrementa su cantidad
  addToCart(product: any) {
    const existingProduct = this.items.find(item => {
      return Object.keys(product).every(key => {
        if (key === 'tempId' || key === 'quantity') return true;
        if (typeof product[key] === 'object') {
          return JSON.stringify(product[key]) === JSON.stringify(item[key]);
        }
        return product[key] === item[key];
      });
    });

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }

    this.saveToLocalStorage();
  }


  //endpoint de address
  saveAddress(addressForm: any) {
    return this.http.post(`${this.URL}/address/save`, addressForm, {
      headers: this.getHeaders(),
    })
  }

  getById(id: number) {
    return this.http.get(`${this.URL}/address/findByUserId/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Obtiene todos los productos del carrito
  getItems() {
    return this.items;
  }

  // Limpia completamente el carrito
  clearCart() {
    this.items = [];
    this.saveToLocalStorage();
    return this.items;
  }

  // Elimina un producto del carrito por su índice
  removeFromCart(index: number) {
    this.items.splice(index, 1);
    this.saveToLocalStorage();
  }
}

