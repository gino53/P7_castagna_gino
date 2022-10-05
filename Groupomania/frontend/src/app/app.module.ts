import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './@core/core.module';
import { LandingModule } from './landing-page/landing-page.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    LandingModule,
    AuthModule,
    BrowserAnimationsModule,
    MatMenuModule,
    OverlayModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }