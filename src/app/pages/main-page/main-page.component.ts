import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent { 
  // TODO: poner intefaces correctas
public categories:any = [
  {image: 'assets/img/products/product1.png', name: "Zapatos"},
  {image: 'assets/img/products/product2.png', name: "Shorts"},
  {image: 'assets/img/products/product3.png', name: "Bolsas"},
  {image: 'assets/img/products/product4.webp', name: "Playeras"},
  {image: 'assets/img/products/product5.png', name: "Pantalones"},
  // {image: 'assets/img/products/product6.webp', name: "Tenis"},
]

// TODO: poner interface correcta

public products: any = [
{image: 'assets/img/products/product4.webp', name: "Playera básica", price: "249"},
{image: 'assets/img/products/product4.webp', name: "Playera básica", price: "249"},
{image: 'assets/img/products/product4.webp', name: "Playera básica", price: "249"},
{image: 'assets/img/products/product4.webp', name: "Playera básica", price: "249"},
{image: 'assets/img/products/product4.webp', name: "Playera básica", price: "249"},
{image: 'assets/img/products/product4.webp', name: "Playera básica", price: "249"},
{image: 'assets/img/products/product4.webp', name: "Playera básica", price: "249"},
{image: 'assets/img/products/product4.webp', name: "Playera básica", price: "249"},
{image: 'assets/img/products/product4.webp', name: "Playera básica", price: "249"},
]


}
