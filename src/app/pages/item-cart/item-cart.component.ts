import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductCart } from '../product/product.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZipCodeService } from '../../services/zip-code.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { StockService } from '../../services/stock.service';

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

  public address = [
    { id: "1", street: "Noche Buena", country: "Mexico", state: "Morelos", zipCode: "62790" },
    { id: "2", street: "Reyes Magos", country: "Mexico", state: "CDMX", zipCode: "62791" },
    { id: "3", street: "Año Nuevo", country: "Mexico", state: "Monterrey", zipCode: "62791" },
  ]
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
    private router: Router,
    private fb: FormBuilder
  ) {
    const storedItems = localStorage.getItem("cartItems");
    this.items = storedItems ? JSON.parse(storedItems) : [];
    
    console.log("🚀 ~ ItemCartComponent ~ items:", this.items);
  }

  // inputValue: string = ''; // Valor dinámico del input

  // onInputChange(event: any): void {
  //   this.inputValue = event.target.value; // Captura el valor ingresado
  // }

  ngOnInit(): void {
    
  }

  public validZipCode: boolean = false;
  public hasSearched: boolean = false;
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

  verifyStock(productId: number) {
    this.stockService.verifyStock(productId).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    })
  }

  saveAddress() {
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
        "id": 1
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

}

