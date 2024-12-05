import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './pages/product/product.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModuleModule } from '../../primeng/primeng-module.module';
import { BrowserModule } from '@angular/platform-browser';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ManageProductComponent } from './pages/manage-product/manage-product.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { GeneralComponent } from './pages/general/general.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { ProductsComponent } from './pages/products/products.component';
import { EditProductComponent } from './pages/product/edit-product.component';
import { OrdersAComponent } from './pages/orders-a/orders-a.component';




@NgModule({
  declarations: [
    ProductComponent,
    MainPageComponent,
    ManageProductComponent,
    SidebarComponent,
    NavbarComponent,
    GeneralComponent,
    EstadisticasComponent,
    ProductsComponent,
    EditProductComponent,
    OrdersAComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModuleModule
    
  ],
  exports: [
    ProductComponent
  ]
})
export class AdminModule { }
