import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [],
  imports: [   
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,

  ], exports:[
    ButtonModule
  ]
})
export class PrimengModuleModule { }
