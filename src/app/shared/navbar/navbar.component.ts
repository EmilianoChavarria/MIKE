import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


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
