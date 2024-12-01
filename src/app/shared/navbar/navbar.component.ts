import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  public name: string = '';
  @ViewChild('productos', { static: false }) productos: ElementRef | undefined;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      // Asigna nombre del usuario
      this.name = localStorage.getItem("userData") || '';
      this.name = this.name.split(',')[1] + ' ' + this.name.split(',')[2];

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
              label: 'Cerrar Sesión',
              icon: 'pi pi-sign-out',
              command: () => this.logout(), // Aquí llamamos a la función logout
            }
          ]
        },
        {
          separator: true
        }
      ];
    } else {
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

    // Suscripción al BehaviorSubject para actualizar la cantidad total
    this.cartService.cartItemsCount$.subscribe((count: number) => {
      this.cartItemCount = count;
    });
  }

  scrollToProductos() {
    this.productos?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  public isMenuOpen = false;

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.isLoggedIn = false;
    // llamar al ngOnInit para que se actualice el navbar
    window.location.reload();

  }
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  moveScroll(direction: number) {
    const scrollAmount = 500;  // Define cuánto deseas desplazar la página
    const currentScroll = window.scrollY;  // Obtiene la posición actual del scroll vertical
  
    // Realiza el desplazamiento
    window.scrollTo({
      top: currentScroll + direction * scrollAmount,  // Desplaza hacia abajo o arriba
      behavior: 'smooth'  // Desplazamiento suave
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
