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

    // Inicializa BehaviorSubject con el número de items
    this.cartItemsCount = new BehaviorSubject<number>(this.items.length);
    this.cartItemsCount$ = this.cartItemsCount.asObservable();
  }

  // Guarda los cambios en el localStorage y actualiza el BehaviorSubject
  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    this.cartItemsCount.next(this.items.length); // Actualiza el número de items
  }

  // Agrega un producto al carrito
  addToCart(product: any) {
    this.items.push(product);
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
