import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  styleUrl: './item-cart.component.css',
  styles: [
    `.p-stepper {
        flex-basis: 40rem;
    } 
    `
  ]
})
export class ItemCartComponent implements OnInit {
  active: number | undefined = 0;
  public items: any = JSON.parse(localStorage.getItem("cartItems") || "");
  constructor() {
    console.log(this.items);
  }

  ngOnInit(): void {
    
  }


}
