import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interface/Product.interface';

export interface ProductCart {
  product: Product,
  color: string,
  size: string,
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [MessageService]
})
export class ProductComponent implements OnInit {
  product: any;
  public colors = [
    { idColor: 1, colorName: "blue", colorHex: "#1d4ed8" },
    { idColor: 2, colorName: "pink", colorHex: "#FF00FF" },
    { idColor: 3, colorName: "green", colorHex: "#00FF00" },
  ]
  public showColorError: boolean = false;
  constructor(
    private router: Router,
    private messageService: MessageService,
    private cartService: CartService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.['product'];
  }

  ngOnInit(): void {
    // console.log("🚀 ~ ProductComponent ~ ngOnInit ~ this.product:", this.product)
    if (this.product?.color) {
      const colorFound = this.colors.find(color => color.colorName === this.product.color.colorName);
      if (colorFound) {
        this.selectedColor = colorFound;
      }
    }
  }

  selectedSize: string | null = null;

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  selectedColor: any;

  selectColor(color: any): void {
    this.selectedColor = {
      idColor: color.idColor,
      colorName: color.colorName,
      colorHex: color.colorHex
    };
    this.showColorError = false;
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Acción correcta', detail: 'Producto  agregado al carrito correctamente' });
  }

  addToCart(product: ProductCart) {
      // genera un ID diferente para cada producto
    const generateTempId = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    const formatedProduct = {
      ...product,
      tempId: generateTempId(),
      color: this.selectedColor,
      size: this.selectedSize,
      quantity: 1
    };

    if (formatedProduct.color == null) {
      this.showColorError = true;
    } else {
      this.showColorError = false;
      console.log(formatedProduct);
      this.cartService.addToCart(formatedProduct);
      this.show();
    }
  }

  // removeItem(index: number) {
  //   this.cartService.removeFromCart(index);
  //   console.log("Producto eliminado");
  // }

  // clearCart() {
  //   this.cartService.clearCart();
  //   console.log("Carrito vaciado");
  // }



}


