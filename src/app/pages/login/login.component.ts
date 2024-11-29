import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required,]],
    password: ['', [Validators.required]],
  })
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
    }
    this.userService.login(formatedInfo).subscribe((response: any) => {
      let userData: any = [];
      localStorage.setItem('token', response.token)
      userData[0] = response.role;
      console.log(response);
      this.userService.findOne(response.id).subscribe((response: any) => {
        // response.object.person.name
        // userData[1] = response.object.person.name ;
        userData[1] = userData[0] === 'ADMIN' ? 'Pepe' : response.object.person.name;
        userData[2] = userData[0] === 'ADMIN' ? 'Hernandez' : response.object.person.lastname;
        userData[3] = userData[0] === 'ADMIN' ? 'Juarez' : response.object.person.surname;


        
        localStorage.setItem("userData", userData);
        switch (userData[0]) {
          case "ADMIN":
            this.router.navigate(["/admin/homeAdmin"])
            break;
          case "USER":
            this.router.navigate(["/home"])
            break;

          default:
            break;
        }
      }, (error) => {
        console.log(error);
      })
    }, (error) => {
      console.log("Entró al error");
      console.log(error);
    })
  }

}
