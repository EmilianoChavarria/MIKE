import { Component } from '@angular/core';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-orders-a',
  templateUrl: './orders-a.component.html',
  styleUrl: './orders-a.component.css'
})
export class OrdersAComponent {
  public orders: any[] = [];

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    const userId = localStorage.getItem('id') || '';
    this.orderService.getById(parseInt(userId)).subscribe((response: any) => {
      this.orders = response.object;
      console.log('Órdenes:', this.orders);
    }, (error: any) => {
      console.error('Error al obtener las órdenes:', error);
    });
  }
}
