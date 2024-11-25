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
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { TabViewModule } from 'primeng/tabview';
import { StepperModule } from 'primeng/stepper';


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
    AvatarModule,
    ToastModule,
    StepsModule,
    TabViewModule,
    StepperModule
  ]
})
export class PrimengModuleModule { }
