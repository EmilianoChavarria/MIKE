import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MIKE';
  showNavbarFooter = true;
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const hiddenRoutes = ['/login',  '/register', '/admin/homeAdmin', '/admin/general', '/admin/estadisticas', '/admin/products', '/admin/product'];
      this.showNavbarFooter = !hiddenRoutes.includes(this.router.url);
    });
  }
}
