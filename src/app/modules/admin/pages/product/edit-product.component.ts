import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { StockService } from '../../../../services/stock.service';
import { UploadEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [MessageService]
})
export class EditProductComponent {
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
  public selectedImage: string | null = null;
  private uploadedImage: File | null = null;
  public product: any;
  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private stockService: StockService,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute

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
  name: string | null = '';
  card: any;

  ngOnInit(): void {
    this.productService.getCategories().subscribe((response: any) => {
      this.categories = response.object;
    });
    this.productService.getColors().subscribe((response: any) => {
      this.colors = response.object;
    });
    this.productService.getSizes().subscribe((response: any) => {
      this.sizes = response.object;
    });

    // Llena el formulario si el producto existe
    if (this.product) {
      this.productForm.patchValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        gender: this.product.gender,
        category: this.product.category,
        color: this.product.color,
        size: this.product.size,
        stock: this.product.stock,
      });
    }
  }


  visible: boolean = false;
  visible1: boolean = false;

  onImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  showDialog() {
    this.visible = true;
  }

  showDialog1() {
    this.visible1 = true;
  }


  saveProduct() {
    const productData = {
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      gender: this.productForm.value.gender,
      category: { idCategory: this.productForm.value.category.idCategory },
    };

    // Guardar el producto
    this.productService.saveProduct(productData).subscribe((response: any) => {
      const productId = response.object.id; // Obtener el ID del producto

      // Formatear los datos del stock
      const formatedStock = {
        product: { id: productId },
        size: { id: this.productForm.value.size.id },
        color: { id: this.productForm.value.color.id },
        stock: this.productForm.value.stock,
      };

      // Guardar el stock
      this.stockService.saveStock(formatedStock).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Producto y stock guardados correctamente',
        });

        // Subir la imagen si está seleccionada
        if (this.uploadedImage) {
          const colorId = this.productForm.value.color.id; // Obtener el ID del color

          // Llamar al servicio de subida de imagen
          const formData = new FormData();
          formData.append('images', this.uploadedImage); // Asegúrate de que `this.uploadedImage` sea un archivo válido

          this.productService.uploadImages(productId, colorId, [this.uploadedImage]).subscribe({
            next: () => {
              console.log('Imagen subida correctamente');
              this.messageService.add({
                severity: 'success',
                summary: 'Imagen subida correctamente',
              });

              // Mostrar SweetAlert después de que se haya subido la imagen
              Swal.fire({
                title: '¡Éxito!',
                text: 'Producto y stock guardados correctamente. La imagen se ha subido correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });

              // regresar a admin/products
              this.router.navigate(['/admin/products']);
            },
            error: (err) => {
              console.error('Error al subir la imagen', err);
              this.messageService.add({
                severity: 'error',
                summary: 'Error al subir la imagen',
                detail: err.message,
              });

              // Mostrar SweetAlert de error si falla la carga de la imagen
              Swal.fire({
                title: '¡Error!',
                text: 'Hubo un problema al subir la imagen. Inténtalo nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            },
          });
        }
      });
    });
  }


  saveColor() {
    console.log(this.colorForm.value);
    this.productService.saveColor(this.colorForm.value).subscribe((response: any) => {
      console.log(response);
      this.colors.push(response.object);
      this.visible = false;
    }, (error) => {
      console.log(error);
    })
  }

  saveSize() {
    console.log(this.sizeForm.value);
    this.productService.saveSize(this.sizeForm.value).subscribe((response: any) => {
      console.log(response);
      this.sizes.push(response.object);
      this.visible1 = false;
    }, (error) => {
      console.log(error);
    })
  }

}
