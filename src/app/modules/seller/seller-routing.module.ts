import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'homeseller', component: MainPageComponent },
  
  { path: 'homeseller', redirectTo: 'general', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerModuleRoutingModule { }
