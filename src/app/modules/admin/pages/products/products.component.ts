import { Component } from '@angular/core';
import { StockService } from '../../../../services/stock.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  public items: any[] = []; // Lista de productos
  public filteredItems: any[] = []; // Lista filtrada
  public searchTerm: string = ''; // Término de búsqueda

  constructor(private stockService: StockService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    this.stockService.getStock().subscribe((data: any) => {
      console.log(data);
      // Construir la lista de productos
      this.items = data.object.map((item: any) => {
        return {
          id: item.id,
          product: item.product,
          category: item.product.category,
          stock: item.stock,
          image: this.getImage(item.product.images), // Obtener imagen
          size: item.size,
          color: item.color,
        };
      });

      // Inicializar la lista filtrada
      this.filteredItems = [...this.items];
      console.log(this.items);
    });
  }

  // Función para obtener la imagen o una imagen predeterminada
  private getImage(images: any[]): string {
    if (images && images.length > 0) {
      return `data:image/png;base64,${images[0].image}`;
    }
    return 'assets/default-image.png';  // Imagen por defecto
  }

  // Función para filtrar los productos según el nombre
  onSearch(): void {
    this.filteredItems = this.items.filter(item =>
      item.product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  delete(productId: any, stockId: any): void {
    // Show SweetAlert confirmation
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the deleteStock service to delete the product
        this.stockService.deleteStock(stockId).subscribe((data: any) => {
          console.log(data);
          // Show success message

          Swal.fire(
            'Eliminado!',
            'El producto ha sido eliminado.',
            'success'
          );

          //después de 3 segundoshacerecarga de la página
          setTimeout(function () {
            window.location.reload();
          }, 2200);


        });
      }
    });
  }

  navigateToProduct(product: any): void {
    this.router.navigate(['/admin/editProduct'], { state: { product } });
  }

}
