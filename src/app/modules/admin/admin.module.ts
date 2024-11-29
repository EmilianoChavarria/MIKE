import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './pages/product/product.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModuleModule } from '../../primeng/primeng-module.module';
import { BrowserModule } from '@angular/platform-browser';
import { MainPageComponent } from './pages/main-page/main-page.component';



@NgModule({
  declarations: [
    ProductComponent,
    MainPageComponent,
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
