import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { StockService } from '../../services/stock.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-seller',
  templateUrl: './home-seller.component.html',
  styleUrls: ['./home-seller.component.css']
})
export class HomeSellerComponent {
  public categories: any;
  public products: any[] = [];
  public filteredProducts: any[] = [];
  public searchQuery: string = ''; // Propiedad para almacenar el texto de búsqueda
  public selectedCategory: string = ''; // Almacena la categoría seleccionada
  public form: FormGroup = this.fb.group({
    quantity: ['']
  })
  public product: any;
  public visible: boolean = false;
  constructor(
    private poductService: ProductService,
    private stockService: StockService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.poductService.getCategories().subscribe((response: any) => {
      this.categories = response.object.map((item: any) => ({
        idCategory: item.idCategory,
        name: item.name,
        image: `data:image/png;base64,${item.image.image}`
      }));
      console.log('Categorias:', this.categories);
    }, (error: any) => {
      console.error('Error al obtener las categorías:', error);
    });
  }

  getProducts(name: string) {
    this.searchQuery = ''; // Borra el valor del campo de búsqueda cuando se selecciona una categoría
    this.selectedCategory = name; // Guarda la categoría seleccionada
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
          selected: false, // Propiedad para resaltar la tarjeta seleccionada
          idStock: item.id,
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
            idStock: product.idStock,
            stock: product.stock,
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
      this.filteredProducts = [...this.products]; // Inicializar la lista de productos filtrados
      console.log('Productos:', this.products);
    });
  }

  // Método para filtrar los productos por nombre
  filterProductsByName() {
    if (this.searchQuery.trim() === '') {
      this.filteredProducts = [...this.products]; // Si no hay texto de búsqueda, mostrar todos los productos
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  // Método para seleccionar una tarjeta de producto
  selectProduct(product: any) {
    this.filteredProducts.forEach(p => p.selected = false); // Desmarcar todos los productos
    product.selected = true; // Marcar el producto seleccionado
  }

  // Mostrar el modal y pasar el producto seleccionado
  show(product: any) {
    this.product = product;  // Guardamos el producto seleccionado
    this.visible = true;  // Hacemos visible el modal
  }


  public formatedData: any = {
    userBean: {
      id: 1
    },
    addressBean: {
      id: 1
    },
    stockControlBeans: []
  };
  public shopList: any[] = [];
  saveQuantity() {

    const stockControlBean = {
      id: this.product.idStock,
      stock: this.form.value.quantity
    };
    const formatedProduct = {
      ...this.product,
      quantity: parseInt(this.form.value.quantity)
    }

    // Verifica si ya existen datos en stockControlBeans o si es la primera vez que se agrega
    if (!this.formatedData) {
      this.formatedData = {
        userBean: {
          id: 1
        },
        addressBean: {
          id: 1
        },
        stockControlBeans: []
      };
    }

    this.shopList.push(formatedProduct);
    this.formatedData.stockControlBeans.push(stockControlBean);

    console.log(this.shopList);
    console.log(this.formatedData);

  }

  getTotal(): number {
    return this.shopList.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  }

  logout() {
    localStorage.clear();

    

    this.router.navigate(['/home']);
  }

  pay() {
    this.orderService.saveOrder(this.formatedData).subscribe(
      (response: any) => {
        console.log(response);
        

        // SweetAlert2: Éxito
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El pedido se ha sido realizado con éxito.',
          confirmButtonText: 'Aceptar'
        });
        // window.location.reload();
      },
      (error) => {
        console.log(error);

        // SweetAlert2: Error

        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: error.message ? error.error.message : 'Hubo un problema al procesar tu pedido. Intenta de nuevo.',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }


}
