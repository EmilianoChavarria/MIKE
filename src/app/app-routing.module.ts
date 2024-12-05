import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProductComponent } from './pages/product/product.component';
import { ItemCartComponent } from './pages/item-cart/item-cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FilterListComponent } from './components/filter-list/filter-list.component';
import { FilterListMenComponent } from './components/filter-list-Men/filter-list-men.component';
import { HomeSellerComponent } from './pages/home-seller/home-seller.component';
import { CategoryComponent } from './components/category/category.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';


const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mujeres', component: FilterListComponent },
  { path: 'hombres', component: FilterListMenComponent },
  {
    path: 'homeSeller', component: HomeSellerComponent
  },
  { path: 'myOrders', component: MyOrdersComponent },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  {
    path: 'cart', component: ItemCartComponent
  },
  { path: 'product/:name', component: ProductComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
