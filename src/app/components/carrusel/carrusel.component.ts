import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})
export class CarruselComponent {
  @Input() items: any[] = []; 
  
  @Output() itemClick = new EventEmitter<any>(); // Evento para manejar clics en un ítem

  onItemClick(item: any) {
    this.itemClick.emit(item);
  }
}
