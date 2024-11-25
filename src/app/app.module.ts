import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PrimengModuleModule } from './primeng/primeng-module.module';
import {MatIconModule} from '@angular/material/icon';
import { ProductComponent } from './pages/product/product.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ItemCartComponent } from './pages/item-cart/item-cart.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { FinalFormComponent } from './components/final-form/final-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainPageComponent,
    ProductComponent,
    SidebarComponent,
    CarruselComponent,
    FooterComponent,
    ItemCartComponent,
    AddressFormComponent,
    PaymentFormComponent,
    FinalFormComponent
  ],
  imports: [
    MatIconModule,
    PrimengModuleModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
