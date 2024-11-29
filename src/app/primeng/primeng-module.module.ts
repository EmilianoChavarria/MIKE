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
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';



import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ], exports: [
    CarouselModule,
    ButtonModule,
    MenuModule,
    BadgeModule,
    RippleModule,
    AvatarModule,
    ToastModule,
    StepsModule,
    TabViewModule,
    StepperModule,
    RadioButtonModule,
    DialogModule,
    FloatLabelModule,
    ProgressSpinnerModule,
    DropdownModule,
    InputMaskModule,
    FileUploadModule,
    
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule

  ]
})
export class PrimengModuleModule { }
