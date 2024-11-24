import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/Product.interface';



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit, OnDestroy {
  public responsiveOptions: any;
  public firstResponsiveOptions: any;
  public resizeSubscription: any;
  public isMobile: boolean = false;
  public productList: Product[] = [];
  public shirtList: Product[] = [];
  public shortList: Product[] = [];
  constructor(private router: Router, private poductService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  // TODO: poner intefaces correctas
  public categories: any = [
    { image: 'assets/img/products/product1.png', name: "Zapatos" },
    { image: 'assets/img/products/product2.png', name: "Shorts" },
    { image: 'assets/img/products/product3.png', name: "Bolsas" },
    { image: 'assets/img/products/product4.webp', name: "Playeras" },
    { image: 'assets/img/products/product5.png', name: "Pantalones" },
    // {image: 'assets/img/products/product6.webp', name: "Tenis"},
  ]

  

  getProducts() {
    this.poductService.getAll().subscribe((response: { object: Product[] }) => {
      console.log(response.object);
      this.productList = response.object;
      this.shirtList = this.filterProducts(1);
      this.shortList = this.filterProducts(2);
    });
  }

  filterProducts(id: number): Product[] {
    const filteredProducts = this.productList.filter((product: Product) => {
      return product.category.idCategory === id;
    });
    console.log('Productos filtrados:', filteredProducts);
    return filteredProducts.slice(0, 10);
  }


  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeSubscription);
  }

}
