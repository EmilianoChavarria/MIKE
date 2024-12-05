import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductCart } from '../product/product.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZipCodeService } from '../../services/zip-code.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { StockService } from '../../services/stock.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/Product.interface';
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  styleUrl: './item-cart.component.css',
  styles: [
    `.p-stepper {
        flex-basis: 40rem;
    } 
    `
  ]
})
export class ItemCartComponent implements OnInit {

  active: number | undefined = 0;
  private data: any = localStorage.getItem("userData");
  public form: FormGroup = this.fb.group({
    address: ['', [Validators.required]],
  });
  public addressForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    street: ['', [Validators.required]],
    number: ['', [Validators.required]],
    zipCode: ['', [Validators.required]],
    province: [''],
    state: [''],
    colonie: [''],
  })

  public address: any;

  public paymentMethods = [
    { id: "1", cardNumber: "1625 2524 2568 7845", ccv: 199, expirationDate: "Morelos", zipCode: "62790" },
    { id: "2", street: "Reyes Magos", country: "Mexico", state: "CDMX", zipCode: "62791" },
    { id: "3", street: "Año Nuevo", country: "Mexico", state: "Monterrey", zipCode: "62791" },
  ]
  public items: any;
  public colonies: any;
  public isLoading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private cartService: CartService,
    private zipCodeService: ZipCodeService,
    private stockService: StockService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private fb: FormBuilder
  ) {
    const storedItems = localStorage.getItem("cartItems");
    this.items = storedItems ? JSON.parse(storedItems) : [];

    console.log("🚀 ~ ItemCartComponent ~ items:", this.items);
  }


  inputValue: string = ''; // Valor dinámico del input

  onInputChange(event: any): void {
    this.inputValue = event.target.value; // Captura el valor ingresado
  }
  inputValue2: string = ''; // Valor dinámico del input

  onInputChange2(event: any): void {
    this.inputValue2 = event.target.value; // Captura el valor ingresado
  }
  inputValue3: string = ''; // Valor dinámico del input

  onInputChange3(event: any): void {
    this.inputValue3 = event.target.value; // Captura el valor ingresado
  }

  ngOnInit(): void {
    const userId = this.data?.split(",")[4].replace(']', '');
    //TODO: Cambiar por el id del usuario
    const userIdTemp = parseInt(localStorage.getItem("id") || '');

    this.cartService.getById(userIdTemp).subscribe((response: any) => {
      console.log(response);
      this.address = response.object;
    }, (error) => {
      console.log("error");
      console.log(error);
    })


    this.total();
    this.stockService.getStock().subscribe((response: any) => {
      this.checkList = response.object;
      console.log("🚀 ~ ItemCartComponent ~ this.stockService.getStock ~ this.checkList:", this.checkList)
      this.filterProductsForAllItems();

    }, (error) => {
      console.log(error);
    })
  }

  public validZipCode: boolean = false;
  public hasSearched: boolean = false;
  public checkList: any;
  searchCity(cp: any) {
    let province: any;
    let state: any;
    this.isLoading = true;
    this.zipCodeService.getCP(cp).subscribe((response: any) => {
      console.log(response);
      this.isLoading = false;
      if (response.results.length === 0) {
        console.log("Es invalido");
        this.validZipCode = true
      } else {
        this.validZipCode = false;
        this.hasSearched = true;
        this.colonies = response.results[cp];
        province = response.results[cp][0].province;
        state = response.results[cp][0].state;
        // console.log(response.results[cp][0].province);
        this.addressForm.controls['province'].setValue(province);
        this.addressForm.controls['state'].setValue(state);
      }
    }, (error) => {
      console.log(error);
    });
  }

  // verifyStock(productId: number) {
  //   this.stockService.verifyStock(productId).subscribe((response) => {
  //     console.log(response);
  //   }, (error) => {
  //     console.log(error);
  //   })
  // }
  public filteredProducts: any;
  public productQuantities: { id: number, stock: number }[] = [];

  filterProductsForAllItems(): void {
    if (!this.items || this.items.length === 0) {
      console.log('No hay productos en el carrito.');
      return;
    }

    this.productQuantities = [];

    this.items.forEach((product: any) => {
      const idProduct = product.id;
      const idColor = product.color?.id || null;
      const idSize = product.size?.id || null;

      const filteredProduct = this.checkList.find((filteredProduct: any) => {
        return (
          filteredProduct.id === idProduct &&
          (!idColor || filteredProduct.color?.id === idColor) &&
          (!idSize || filteredProduct.size?.id === idSize)
        );
      });

      if (filteredProduct) {
        if (product.quantity < filteredProduct.stock) {
          console.log(`Producto ${idProduct} tiene stock suficiente.`);
        } else {
          console.log(`Producto ${idProduct} ha alcanzado el límite de stock.`);
        }

        this.productQuantities.push({
          id: filteredProduct.id,
          stock: product.quantity,
        });
        console.log(this.productQuantities);
      } else {
        console.log(`El producto ${idProduct} no fue encontrado en el inventario.`);
      }
    });

    localStorage.setItem("productQuantities", JSON.stringify(this.productQuantities));
    console.log("Arreglo actualizado:", this.productQuantities);
  }

  filterProducts(idProduct: number, idColor: number, idSize: number, product: any): void {
    // Filtrar productos según parámetros
    this.filteredProducts = this.checkList.filter((filteredProduct: any) => {
      return (
        filteredProduct.id === +idProduct &&
        (!idColor || filteredProduct.color?.id === +idColor) &&
        (!idSize || filteredProduct.size?.id === +idSize)
      );
    });

    // Validar y actualizar la cantidad
    if (this.filteredProducts.length > 0) {
      const filteredProduct = this.filteredProducts[0];
      if (product.quantity < filteredProduct.stock) {
        product.quantity += 1;
        console.log(`Quantity incrementado a: ${product.quantity}`);

        // Actualizar el localStorage
        const storedItems = localStorage.getItem("cartItems");
        if (storedItems) {
          const items = JSON.parse(storedItems);

          // Buscar el producto en el localStorage
          const itemIndex = items.findIndex((item: any) => {
            return (
              item.id === idProduct &&
              (!idColor || item.color?.id === idColor) &&
              (!idSize || item.size?.id === idSize)
            );
          });

          if (itemIndex !== -1) {
            items[itemIndex].quantity = product.quantity; // Actualizar cantidad en el arreglo
            localStorage.setItem("cartItems", JSON.stringify(items)); // Guardar en localStorage
            console.log('LocalStorage actualizado:', items);

            // Llamar la función para actualizar el nuevo arreglo con cantidades
            this.filterProductsForAllItems();
          } else {
            console.log('El producto no fue encontrado en el localStorage.');
          }
        } else {
          console.log('No hay productos en el localStorage.');
        }
      } else {
        console.log(`La cantidad no puede ser mayor al stock: ${filteredProduct.stock}`);
      }
    } else {
      console.log('No se encontró un producto que coincida con los parámetros proporcionados.');
    }
  }

  filterProductsDecrement(idProduct: number, idColor: number, idSize: number, product: any): void {
    // Filtrar productos según los parámetros proporcionados
    this.filteredProducts = this.checkList.filter((filteredProduct: any) => {
      return (
        filteredProduct.id === +idProduct &&
        (!idColor || filteredProduct.color?.id === +idColor) &&
        (!idSize || filteredProduct.size?.id === +idSize)
      );
    });

    // Validar y actualizar la cantidad (restando 1)
    if (this.filteredProducts.length > 0) {
      const filteredProduct = this.filteredProducts[0];
      if (product.quantity > 1) {
        product.quantity -= 1;
        console.log(`Quantity decrementado a: ${product.quantity}`);

        // Actualizar el localStorage
        const storedItems = localStorage.getItem("cartItems");
        if (storedItems) {
          const items = JSON.parse(storedItems);

          // Buscar el producto en el localStorage
          const itemIndex = items.findIndex((item: any) => {
            return (
              item.id === idProduct &&
              (!idColor || item.color?.id === idColor) &&
              (!idSize || item.size?.id === idSize)
            );
          });

          if (itemIndex !== -1) {
            items[itemIndex].quantity = product.quantity; // Actualizar la cantidad en el arreglo
            localStorage.setItem("cartItems", JSON.stringify(items)); // Guardar en localStorage
            console.log('LocalStorage actualizado:', items);

            // Llamar la función para actualizar el nuevo arreglo con cantidades
            this.filterProductsForAllItems();
          } else {
            console.log('El producto no fue encontrado en el localStorage.');
          }
        } else {
          console.log('No hay productos en el localStorage.');
        }
      } else {
        console.log(`La cantidad no puede ser menor a 1.`);
      }
    } else {
      console.log('No se encontró un producto que coincida con los parámetros proporcionados.');
    }
  }


  total() {
    const total = this.items.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0);
    return total;
  }


  saveAddress() {
    let data = localStorage.getItem("userData");
    let idUser = data?.split(",")[4];
    //TODO: Cambiar por el id del usuario
    let idUserTemp = parseInt(localStorage.getItem("id") || '');
    console.log(this.addressForm.value);
    // if (this.addressForm.invalid) {
    //   return Object.values(this.form.controls).forEach(control => {
    //     control.markAllAsTouched();
    //   });
    // }
    let formatedObject = {
      street: this.addressForm.value.street,
      country: "México",
      state: this.addressForm.value.state,
      province: this.addressForm.value.province,
      zipCode: this.addressForm.value.zipCode,
      fullName: this.addressForm.value.name,
      neighborhood: this.addressForm.value.colonie.city,
      phoneNumber: this.addressForm.value.number,
      userBean: {
        "id": idUserTemp
      }
    }
    console.log("🚀 ~ ItemCartComponent ~ saveAddress ~ formatedObject:", formatedObject)
    this.cartService.saveAddress(formatedObject).subscribe((response) => {
      console.log(response);

    }, (error) => {
      console.log(error);
    })
  }


  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
    this.items = this.cartService.getItems();

    // SweetAlert2: Producto eliminado del carrito
    Swal.fire({
      icon: 'success',
      title: '¡Eliminado!',
      text: 'El producto ha sido eliminado de tu carrito.',
      confirmButtonText: 'Aceptar'
    });
  }


  goProduct(productObject: any) {
    const product = { ...productObject };
    delete product.color;
    delete product.size;
    console.log(product);
    this.router.navigate(['/product', product.name], { state: { product } });
  }

  navigateToProduct(product: any) {
    this.router.navigate(['/product', product.name], { state: { product } });
  }

  pay() {
    let formatedData = {
      userBean: {
        // Parse to number
        id: parseInt(localStorage.getItem("id") || '')
      },
      addressBean: {
        id: this.form.value.address
      },
      stockControlBeans: [...this.productQuantities],
    };

    this.orderService.saveOrder(formatedData).subscribe(
      (response) => {
        console.log(response);
        this.items = [];
        localStorage.removeItem("cartItems");

        // SweetAlert2: Éxito
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Tu pedido ha sido realizado con éxito.',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/home']);
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

    console.log("🚀 ~ ItemCartComponent ~ pay ~ formatedData:", formatedData);
  }


}

