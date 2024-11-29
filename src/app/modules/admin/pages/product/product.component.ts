import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { StockService } from '../../../../services/stock.service';
import { UploadEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [MessageService]
})
export class ProductComponent {
  public categories: any;
  public colors: any;
  public sizes: any;
  public genders = [
    { name: "MALE", id: 1, value: "Hombre" },
    { name: "FEMALE", id: 2, value: "Mujer" }
  ]
  public productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    category: ['', [Validators.required]],
    color: ['', [Validators.required]],
    size: ['', [Validators.required]],
    stock: ['', [Validators.required]],

  })
  public colorForm: FormGroup = this.fb.group({
    colorName: ['', [Validators.required]],
    hex: ['', [Validators.required]],
  })

  public sizeForm: FormGroup = this.fb.group({
    sizeName: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private stockService: StockService,
    private messageService: MessageService

  ) {

  }

  uploadedFiles: any[] = [];


  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log(this.uploadedFiles);

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  ngOnInit(): void {
    this.productService.getCategories().subscribe((response: any) => {
      this.categories = response.object
    })
    this.productService.getColors().subscribe((response: any) => {
      this.colors = response.object
    })
    this.productService.getSizes().subscribe((response: any) => {
      this.sizes = response.object
    })
  }

  visible: boolean = false;
  visible1: boolean = false;

  showDialog() {
    this.visible = true;
  }

  showDialog1() {
    this.visible1 = true;
  }


  saveProduct() {
    console.log(this.productForm.value);
    let formatedProduct = {
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      gender: this.productForm.value.gender,
      category: { idCategory: this.productForm.value.category.idCategory },
    }


    this.productService.saveProduct(formatedProduct).subscribe((response: any) => {
      let formatedStock = {
        product: {
          id: response.object.id
        },
        size: {
          id: this.productForm.value.color.id
        },
        color: {
          id: this.productForm.value.size.id
        },
        stock: this.productForm.value.stock
      }
      this.stockService.saveStock(formatedStock).subscribe((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      })
    }, (error) => {
      console.log(error);
    })
  }

  saveColor() {
    console.log(this.colorForm.value);
    this.productService.saveColor(this.colorForm.value).subscribe((response:any) => {
      console.log(response);
      this.colors.push(response.object);
      this.visible = false;
    }, (error) => {
      console.log(error);
    })
  }

  saveSize() {
    console.log(this.sizeForm.value);
    this.productService.saveSize(this.sizeForm.value).subscribe((response:any) => {
      console.log(response);
      this.sizes.push(response.object);
      this.visible1 = false;
    }, (error) => {
      console.log(error);
    })
  }
}
