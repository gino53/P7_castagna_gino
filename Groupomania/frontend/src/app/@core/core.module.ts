import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpInterceptorProviders } from './interceptors';
import { RouterModule } from '@angular/router';
import * as fr from '@angular/common/locales/fr';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    HttpInterceptorProviders
  ]
})
export class CoreModule { 
  constructor() {
    registerLocaleData(fr.default);
  }
}