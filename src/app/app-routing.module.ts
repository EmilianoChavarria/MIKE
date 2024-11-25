import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProductComponent } from './pages/product/product.component';
import { ItemCartComponent } from './pages/item-cart/item-cart.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { FinalFormComponent } from './components/final-form/final-form.component';

const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  {
    path: 'cart', component: ItemCartComponent, children: [
      {
        path: 'address', 
        component: AddressFormComponent,
      },
      {
        path: 'payment',
        component: PaymentFormComponent,
      },
      {
        path: 'final',
        component: FinalFormComponent,
      }
    ],
  },
  { path: 'product/:name', component: ProductComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
