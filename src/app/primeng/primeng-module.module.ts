import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';



@NgModule({
  declarations: [],
  imports: [   
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,

  ], exports:[
    CarouselModule,
    ButtonModule,
    MenuModule,
    BadgeModule,
    RippleModule,
    AvatarModule
  ]
})
export class PrimengModuleModule { }
