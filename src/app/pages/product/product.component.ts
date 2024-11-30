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
  public showColorError: boolean = false;
  public showSizeError: boolean = false;

  // Ahora el producto recibirá las variantes, ya no necesitas un arreglo de colores hardcodeado.
  public variants: any[] = [];

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
    console.log(this.variants);
    // Suponemos que las variantes vienen dentro del objeto product.
    if (this.product?.variants && this.product.variants.length > 0) {
      this.variants = this.product.variants;
    }
    
    // Preseleccionamos el primer color y tamaño si existen en las variantes.
    if (this.variants.length > 0) {
      this.selectedColor = this.variants[0].color;
      this.selectedSize = this.variants[0].size;
    }
  }

  selectedSize: string | null = null;
  selectedColor: any;

  // Método para seleccionar color de las variantes
  selectColor(color: any): void {
    this.selectedColor = color;
    console.log(this.selectedColor);
    this.showColorError = false;
  }

  // Método para seleccionar tamaño de las variantes
  selectSize(size: string): void {
    this.selectedSize = size;
    this.showSizeError = false;
  }

  getUniqueSizes(): string[] {
    const sizes = this.variants.map(variant => variant.size.sizeName); 
    return Array.from(new Set(sizes)); // Devuelve un array con los tamaños 
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Acción correcta', detail: 'Producto agregado al carrito correctamente' });
  }

  addToCart(product: ProductCart) {
    // Genera un ID temporal único para cada variante seleccionada.
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

    // Validación de color y tamaño
    if (!formatedProduct.color) {
      this.showColorError = true;
    } else {
      this.showColorError = false;
    }

    if (!formatedProduct.size) {
      this.showSizeError = true;  
    } else {
      this.showSizeError = false;
    }

    if (formatedProduct.color && formatedProduct.size) {
      console.log(formatedProduct);
      this.cartService.addToCart(formatedProduct);
      this.show(); // Muestra un mensaje de éxito al agregar al carrito
    }
  }
}
