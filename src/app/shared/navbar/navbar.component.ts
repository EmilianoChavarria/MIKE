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
  constructor(private cartService: CartService) { }
  ngOnInit(): void {
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
          },
          {
            label: 'Ver pefil',
            icon: 'pi pi-user',
          }
        ]
      },
      {
        separator: true
      }
    ];
    this.cartService.cartItemsCount$.subscribe((count:any) => {
      this.cartItemCount = count;
    });
  }


  countItems() {


  }




  public isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
