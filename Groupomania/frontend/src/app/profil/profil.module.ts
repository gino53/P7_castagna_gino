import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilRoutingModule } from './profil-routing.module';
import { AuthGuard } from '../@core/guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    ProfilRoutingModule
  ],
  providers: [
    AuthGuard
  ]
})
export class ProfilModule { }
