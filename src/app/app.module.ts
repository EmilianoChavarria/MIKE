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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainPageComponent,
    ProductComponent,
    SidebarComponent
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
