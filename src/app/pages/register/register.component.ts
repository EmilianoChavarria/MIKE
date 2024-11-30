import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    surname: ['', [Validators.required]],
  });
  public isVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

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
        // Redirigir a la vista de login
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Error en el registro:', error);
      }
    );
  }
}
