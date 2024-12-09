import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, this.noWhitespaceValidator]],
    password: ['', [Validators.required, this.noWhitespaceValidator]],
    name: ['', [Validators.required, this.noWhitespaceValidator]],
    lastname: ['', [Validators.required, this.noWhitespaceValidator]],
    surname: [''],
  });
  public isVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  register() {
    console.log(this.registerForm.value);
    const formatedInfo = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      name: this.registerForm.value.name,
      lastname: this.registerForm.value.lastname,
      surname: this.registerForm.value.surname,
    };

    this.userService.register(formatedInfo).subscribe(
      (response: any) => {
        console.log('Registro exitoso:', response);

        // Mostrar mensaje de éxito
        Swal.fire({
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido creada con éxito. Ahora puedes iniciar sesión.',
          icon: 'success',
          confirmButtonText: 'Ir al inicio de sesión'
        }).then(() => {
          // Redirigir a la vista de login
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        console.log('Error en el registro:', error);

        // Mostrar mensaje de error
        Swal.fire({
          title: 'Error en el registro',
          text: 'Ocurrió un problema al registrar tu cuenta. Por favor, intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Reintentar'
        });
      }
    );
  }

  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length? null : { 'whitespace': true };       
}
}
