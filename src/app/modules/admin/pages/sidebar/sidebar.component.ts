import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  logout() {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with logout
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        this.isLoggedIn = false;
        
        // Navigate to the home page
        this.router.navigate(['/home']);
        
        // Show success message
        Swal.fire(
          'Sesión cerrada!',
          'Has cerrado sesión correctamente.',
          'success'
        );
      }
    });
  }
}
