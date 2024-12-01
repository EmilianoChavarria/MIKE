import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './pages/product/product.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModuleModule } from '../../primeng/primeng-module.module';
import { BrowserModule } from '@angular/platform-browser';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ManageProductComponent } from './pages/manage-product/manage-product.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { GeneralComponent } from './pages/general/general.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { ProductsComponent } from './pages/products/products.component';




@NgModule({
  declarations: [
    ProductComponent,
    MainPageComponent,
    ManageProductComponent,
    SidebarComponent,
    NavbarComponent,
    GeneralComponent,
    EstadisticasComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    PrimengModuleModule
  ],
  exports: [
    ProductComponent
  ]
})
export class AdminModule { }
