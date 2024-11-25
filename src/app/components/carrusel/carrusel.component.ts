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

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  public isSelected:boolean = false;
  favorites: Product[] = [];

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

addFavorite() {
  this.items = this.items.map((item: Product) => ({
    ...item,
    isSelected: false,
  }));
}


toggleHeart(item: any) {
  const index = this.favorites.findIndex(fav => fav.id === item.id);
  if (index === -1) {
    this.favorites.push(item);
    item.isSelected = true;
  } else {
    this.favorites.splice(index, 1);
    item.isSelected = false;
  }

  console.log('Favorites:', this.favorites);
}

navigateToProduct(product: Product) {
  this.router.navigate(['/product', product.name], { state: { product } });
}



}
