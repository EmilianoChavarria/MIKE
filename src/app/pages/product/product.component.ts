import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interface/Product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [MessageService]
})
export class ProductComponent implements OnInit {
  product: any;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private cartService: CartService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.['product'];
  }

  ngOnInit(): void {
    console.log(this.product);
  }

  selectedSize: string | null = null;

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  selectedColor: string | null = null;

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Producto  agregado al carrito correctamente' });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.show()
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
    console.log("Producto eliminado");
  }

  clearCart() {
    this.cartService.clearCart();
    console.log("Carrito vaciado");
  }
}


