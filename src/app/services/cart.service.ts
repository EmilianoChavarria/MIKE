import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cartItems';
  private items: any[] = [];
  private cartItemsCount: BehaviorSubject<number>;
  cartItemsCount$;

  constructor() {
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

