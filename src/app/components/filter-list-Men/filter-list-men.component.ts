import { Component } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list-men.component.html',
  styleUrl: './filter-list-men.component.css'
})
export class FilterListMenComponent {
  public items: any[] = []; // Lista de productos
  public filteredItems: any[] = []; // Lista filtrada
  public searchTerm: string = ''; // Término de búsqueda
  public productList: any;
  public shirtList: any;
  public shortList: any;
  public hoodieList: any;
  public pantsList: any;
  public sneakerList: any;
  public dressList: any;
  constructor(private stockService: StockService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.stockService.getStock().subscribe((response: any) => {
      console.log(response);

      // Filtrar productos con género "FEMALE"
      const femaleProducts = response.object.filter((item: any) => item.product.gender === 'MALE');

      // Usamos un mapa para agrupar los productos por su id
      const productMap = new Map<number, any>();

      femaleProducts.forEach((item: any) => {
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
      this.pantsList = this.filterProducts(2);  // Filtrar por categoría con idCategory = 4
      this.hoodieList = this.filterProducts(3);  // Filtrar por categoría con idCategory = 3
      this.sneakerList = this.filterProducts(4);  // Filtrar por categoría con idCategory = 6
      this.shortList = this.filterProducts(5);  // Filtrar por categoría con idCategory = 2
      this.dressList = this.filterProducts(6);  // Filtrar por categoría con idCategory = 5
    });
  }


  filterProducts(id: number) {
    const filteredProducts = this.productList.filter((product: any) => {
      return product.category.idCategory === id;  // Filtrar por idCategory
    });
    console.log('Productos filtrados:', filteredProducts);
    return filteredProducts.slice(0, 10);  // Limitar a los primeros 10 productos filtrados
  }

  navigateToProduct(product: any) {
    this.router.navigate(['/product', product.name], { state: { product } });
  }

}
