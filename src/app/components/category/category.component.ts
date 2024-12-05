import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  products: any[] = []; // Todos los productos agrupados
  filteredProducts: any[] = []; // Productos después de aplicar filtros

  // Valores para los filtros
  filters = {
    price: 1000,
    color: '',
    size: ''
  };

  constructor(private stockService: StockService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.paramMap.get('categoryName') || '';
    this.getProducts(this.categoryName);
  }

  getProducts(name: string) {
    this.stockService.getStock().subscribe((response: any) => {
      const category = response.object.filter((item: any) => item.product.category.name === name);

      const productMap = new Map<number, any>();
      category.forEach((item: any) => {
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

        if (productMap.has(product.id)) {
          const existingProduct = productMap.get(product.id);
          const existingVariant = existingProduct.variants.find((variant: any) =>
            variant.color.id === product.color.id && variant.size.id === product.size.id);

          if (!existingVariant) {
            existingProduct.variants.push({
              color: product.color,
              size: product.size,
              stock: product.stock,
              image: product.image,
            });
          } else {
            existingVariant.stock += product.stock;
          }
        } else {
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

      this.products = Array.from(productMap.values());
      this.filteredProducts = [...this.products];
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesPrice = product.price <= this.filters.price;
      const matchesColor = this.filters.color === '' || product.variants.some((variant: any) => variant.color.name === this.filters.color);
      const matchesSize = this.filters.size === '' || product.variants.some((variant: any) => variant.size.name === this.filters.size);

      return matchesPrice && matchesColor && matchesSize;
    });
  }

  navigateToProduct(product: any) {
    this.router.navigate(['/product', product.name], { state: { product } });
  }
}
