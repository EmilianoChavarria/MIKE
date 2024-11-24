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

    this.resizeSubscription = window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        this.isMobile = false;
      }
    });

    this.firstResponsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
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

  // TODO: poner interface correcta

  public products: any = [
    { image: 'assets/img/products/product4.webp', name: "Playera básica1", price: "249" },
    { image: 'assets/img/products/product4.webp', name: "Playera básica2", price: "299" },
    { image: 'assets/img/products/product4.webp', name: "Playera básica3", price: "229" },
    { image: 'assets/img/products/product4.webp', name: "Playera básica4", price: "149" },
    { image: 'assets/img/products/product4.webp', name: "Playera básica5", price: "349" },
    { image: 'assets/img/products/product4.webp', name: "Playera básica6", price: "249" },
    { image: 'assets/img/products/product4.webp', name: "Playera básica7", price: "249" },
    { image: 'assets/img/products/product4.webp', name: "Playera básica8", price: "249" },
  ];

  navigateToProduct(product: any) {
    this.router.navigate(['/product', product.name], { state: { product } });
  }

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
    return filteredProducts;  
  }


  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeSubscription);
  }

}
