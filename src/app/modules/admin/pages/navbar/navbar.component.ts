import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public nombre: any = localStorage.getItem('userData');
  public formatedName: any = `Pepe Hernández`;

}
