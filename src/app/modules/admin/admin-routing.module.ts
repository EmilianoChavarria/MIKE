import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { MainPageComponent } from './pages/main-page/main-page.component';



const routes: Routes = [
  { path: 'homeAdmin', component: MainPageComponent },
  { path: 'product', component: ProductComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
