import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../interface/Product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  public cartItemCount: number = 0;
  public listItems: any = JSON.parse(localStorage.getItem('cartItems') || '[]');
  public isLoggedIn: boolean = false;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this.isLoggedIn = true;
      this.items = [
        {
          separator: true
        },
        {
          label: 'Mi cuenta',
          items: [
            {
              label: 'Mis pedidos',
              icon: 'pi pi-shopping-bag',
              link: 'orders',
            },
            {
              label: 'Ver perfil',
              icon: 'pi pi-user',
              link: 'profile',
            }
          ]
        },
        {
          separator: true
        }
      ];
    }else{
      this.isLoggedIn = false;
      this.items = [
        {
          separator: true
        },
        {
          label: 'Iniciar Sesión',
          items: [
            {
              label: 'Iniciar Sesión',
              icon: 'pi pi-user',
              link: 'login',
            }
          ]
        },
        {
          separator: true
        }
      ];
    }
    console.log(this.isLoggedIn);
    

    // Suscripción al BehaviorSubject para actualizar la cantidad total
    this.cartService.cartItemsCount$.subscribe((count: number) => {
      this.cartItemCount = count;
    });
  }

  public isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
