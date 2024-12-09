import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { GeneralComponent } from './pages/general/general.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { ProductsComponent } from './pages/products/products.component';
import { EditProductComponent } from './pages/product/edit-product.component';
import { CategoryComponent } from '../../components/category/category.component';
import { OrdersAComponent } from './pages/orders-a/orders-a.component';



const routes: Routes = [
  { path: 'homeAdmin', component: MainPageComponent },
  { path: 'general', component: GeneralComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product', component: ProductComponent },
  { path: 'ordenes', component: OrdersAComponent },
  { path: 'editProduct', component: EditProductComponent },
  { path: 'products/:categoryName', component: CategoryComponent },
  { path: '', redirectTo: 'general', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
