import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductCart } from '../product/product.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  styleUrl: './item-cart.component.css',
  styles: [
    `.p-stepper {
        flex-basis: 40rem;
    } 
    `
  ]
})
export class ItemCartComponent implements OnInit {
  active: number | undefined = 0;
  public items: any = JSON.parse(localStorage.getItem("cartItems") || "");
  constructor(private cartService: CartService, private router: Router) {
    console.log("🚀 ~ ItemCartComponent ~ items:", this.items)
    
  }

  ngOnInit(): void {

  }

  removeFromCart(index: number) {
    // Llamada al servicio para eliminar el producto
    this.cartService.removeFromCart(index);
    // Actualizar los items en el componente
    this.items = this.cartService.getItems();
  }

  goProduct(productObject: any) {
    const product = { ...productObject };
    delete product.color;
    delete product.size;
    console.log(product);
    this.router.navigate(['/product', product.name], { state: { product } });
  }

  navigateToProduct(product: any) {
    this.router.navigate(['/product', product.name], { state: { product } });
  }
}
