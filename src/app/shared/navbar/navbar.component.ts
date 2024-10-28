import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;


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
  }

  toggleDropdown(dropdownId: string): void {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    }
  }


  public isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
