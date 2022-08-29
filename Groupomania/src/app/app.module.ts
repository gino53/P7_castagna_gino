import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { PostListComponent } from './post-list/post-list.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
