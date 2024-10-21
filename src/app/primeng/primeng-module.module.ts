import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';



@NgModule({
  declarations: [],
  imports: [   
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,

  ], exports:[
    CarouselModule,
    ButtonModule
  ]
})
export class PrimengModuleModule { }
