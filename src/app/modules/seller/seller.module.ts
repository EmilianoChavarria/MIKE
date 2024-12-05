import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { SellerModuleRoutingModule } from './seller-routing.module';



@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    SellerModuleRoutingModule
  ]
})
export class SellerModule { }
