import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/Product.interface';
import { StockService } from '../../services/stock.service';



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
  constructor(private router: Router,
    private poductService: ProductService,
    private stockService: StockService
  ) { }

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
    this.stockService.getStock().subscribe((response: any) => {
      // Usamos un mapa para agrupar los productos por su id
      const productMap = new Map<number, any>();
  
      response.object.forEach((item: any) => {
        // Extraemos el producto
        const product = {
          id: item.product.id,
          name: item.product.name,
          description: item.product.description,
          price: item.product.price,
          entryDate: item.product.entry_date,
          gender: item.product.gender,
          category: item.product.category,
          image: `data:image/png;base64,${item.product.images[0].image}`,
          color: item.color,
          size: item.size,
          stock: item.stock,
        };
  
        // Si el producto ya existe en el mapa, lo actualizamos con el nuevo color/size
        if (productMap.has(product.id)) {
          const existingProduct = productMap.get(product.id);
  
          // Verificamos si ya existe la combinación de color y tamaño
          const existingVariant = existingProduct.variants.find((variant: any) => 
            variant.color.id === product.color.id && variant.size.id === product.size.id);
  
          if (!existingVariant) {
            // Si no existe la combinación, agregamos la nueva variante
            existingProduct.variants.push({
              color: product.color,
              size: product.size,
              stock: product.stock,
              image: product.image,
            });
          } else {
            // Si la variante ya existe, solo sumamos el stock
            existingVariant.stock += product.stock;
          }
        } else {
          // Si el producto no existe, lo agregamos con la variante
          productMap.set(product.id, {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            entryDate: product.entryDate,
            gender: product.gender,
            category: product.category,
            image: product.image,
            variants: [{
              color: product.color,
              size: product.size,
              stock: product.stock,
              image: product.image,
            }],
          });
        }
      });
  
      // Convertimos el mapa de nuevo en un arreglo para asignarlo a productList
      this.productList = Array.from(productMap.values());
      console.log("🚀 ~ MainPageComponent ~ this.stockService.getStock ~ this.productList:", this.productList);
  
      // Filtrar productos
      this.shirtList = this.filterProducts(1);  // Filtrar por categoría con idCategory = 1
      this.shortList = this.filterProducts(2);  // Filtrar por categoría con idCategory = 2
    });
  }
  
  filterProducts(id: number): Product[] {
    const filteredProducts = this.productList.filter((product: Product) => {
      return product.category.idCategory === id;  // Filtrar por idCategory
    });
    console.log('Productos filtrados:', filteredProducts);
    return filteredProducts.slice(0, 10);  // Limitar a los primeros 10 productos filtrados
  }
  



  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeSubscription);
  }

}
