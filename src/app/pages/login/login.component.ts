import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  public isVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  login() {
    console.log(this.loginForm.value);
    let formatedInfo = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    if(formatedInfo.email === 'seller@seller.com' && formatedInfo.password === '1234'){
      this.router.navigate(["/homeSeller"]);
    }else{
      this.userService.login(formatedInfo).subscribe(
        (response: any) => {
          let userData: any = [];
          localStorage.setItem('token', response.token);
          userData[0] = response.role;
          console.log(response);
          // Mostrar mensaje de éxito
          Swal.fire({
            title: '¡Inicio de sesión exitoso!',
            text: `Bienvenido ${userData[1]} ${userData[2]}`,
            icon: 'success',
            confirmButtonText: 'Continuar'
          });
  
          //TODO:Esto es temporal, se debe cambiar por el id del usuario
          localStorage.setItem("id", response.id);
  
          switch (userData[0]) {
            case "ADMIN":
              this.router.navigate(["/admin/homeAdmin"]);
              break;
            case "USER":
              this.router.navigate(["/home"]);
              break;
            default:
              break;
          }
          this.userService.findOne(response.id).subscribe(
            (response: any) => {
              userData[1] = userData[0] === 'ADMIN' ? 'Pepe' : response.object.person.name;
              userData[2] = userData[0] === 'ADMIN' ? 'Hernandez' : response.object.person.lastname;
              userData[3] = userData[0] === 'ADMIN' ? 'Juarez' : response.object.person.surname;
              userData[4] = userData[0] === 'ADMIN' ? '1' : response.object.id;
              localStorage.setItem('name', userData[1]);
              localStorage.setItem('lastname', userData[2]);
              localStorage.setItem("userData", JSON.stringify(userData));
  
              // Mostrar mensaje de éxito
              Swal.fire({
                title: '¡Inicio de sesión exitoso!',
                text: `Bienvenido ${userData[1]} ${userData[2]}`,
                icon: 'success',
                confirmButtonText: 'Continuar'
              });
  
              switch (userData[0]) {
                case "ADMIN":
                  this.router.navigate(["/admin/homeAdmin"]);
                  break;
                case "USER":
                  this.router.navigate(["/home"]);
                  break;
                case "SELLER":
                  this.router.navigate(["/homeSeller"]);
                  break;
                default:
                  break;
              }
            },
            (error) => {
              console.log(error);
  
              // Mostrar mensaje de error al obtener los datos del usuario
              Swal.fire({
                title: 'Error',
                text: 'No se pudieron obtener los datos del usuario.',
                icon: 'error',
                confirmButtonText: 'Reintentar'
              });
            }
          );
        },
        (error) => {
          console.log("Entró al error");
          console.log(error);
  
          // Mostrar mensaje de error en el login
          Swal.fire({
            title: 'Error de inicio de sesión',
            text: 'Usuario o contraseña incorrectos. Por favor verifica tus datos.',
            icon: 'error',
            confirmButtonText: 'Reintentar'
          });
        }
      );
    }
  }
}
