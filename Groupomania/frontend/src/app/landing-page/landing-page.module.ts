import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRoutingModule } from './landing-page-routing.module';
import { FormComponent } from './components/landing-page.component';


@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
