import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../interface/Product.interface';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent {
  @Input() items: any[] = [];
  @Output() itemClick = new EventEmitter<any>();

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;


  constructor(private router: Router) { }

  moveScroll(direction: number) {
    const scrollAmount = 1000;
    const container = this.scrollContainer.nativeElement;

    if (container) {
      container.scrollTo({
        left: container.scrollLeft + direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  navigateToProduct(product: Product) {
    this.router.navigate(['/product', product.name], { state: { product } });
  }


  onItemClick(item: any) {
    this.itemClick.emit(item);
  }
}
