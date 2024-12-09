import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  public orders: any[] = [];
  profileForm!: FormGroup;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getOrders();
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      surname: ['', Validators.required]
    });
  }

  getOrders() {
    const userId = localStorage.getItem('id') || '';
    this.orderService.getById(parseInt(userId)).subscribe((response: any) => {
      this.orders = response.object;
      console.log('Órdenes:', this.orders);
    }, (error: any) => {
      console.error('Error al obtener las órdenes:', error);
    });
  }

  cancelOrder(orderId: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar orden',
      cancelButtonText: 'No, mantener orden'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.cancelOrder(orderId).subscribe((response: any) => {
          console.log(response);
          this.ngOnInit();
          Swal.fire(
            'Cancelada',
            'La orden ha sido cancelada exitosamente.',
            'success'
          );
          this.getOrders(); // Actualizar la lista de órdenes
        }, (error: any) => {
          console.log(error);
          Swal.fire(
            'Error',
            'Hubo un problema al cancelar la orden.',
            'error'
          );
          console.error('Error al cancelar la orden:', error);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
  
      const formatedData = {
        email: this.profileForm.value.email,
        password: this.profileForm.value.password,
        person: {
          name: this.profileForm.value.name,
          lastname: this.profileForm.value.lastname,
          surname: this.profileForm.value.surname
        },
        rol: {
          id: 3
        },
        id: parseInt(localStorage.getItem('id') || '')
      };
  
      this.userService.update(formatedData).subscribe(
        (response: any) => {
          console.log(response);
  
          // Mostrar alerta
          Swal.fire({
            title: 'Actualización Exitosa',
            text: 'Tu perfil ha sido actualizado. Por favor, inicia sesión con tus nuevas credenciales.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            // Limpiar el localStorage y redirigir a /login
            localStorage.clear();
            window.location.href = '/login'; // Redirigir al login
          });
        },
        (error: any) => {
          console.error('Error al actualizar el perfil:', error);
          Swal.fire(
            'Error',
            'Hubo un problema al actualizar tu perfil.',
            'error'
          );
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
  
}
