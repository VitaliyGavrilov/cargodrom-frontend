import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './error.interceptor';
import { TokenInterceptor } from './token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { PageTitleService } from './page-title.service';
import { TitleStrategy } from '@angular/router';
import { DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { MaterialModule } from './material/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { LoaderComponent } from './loader/loader.component';
import { LoadingInterceptor } from './interceptors/loader.interceptor';
import { SharedModule } from './shared/shared.module';
import { RequestRateComponent } from './pages/components/request-rate/request-rate.component';
import { RateEditorComponent } from './pages/components/rate-editor/rate-editor.component';
import { PagesModule } from './pages/pages.module';




@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,


  ],
  imports: [
    // PagesModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    NgScrollbarModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    },
    {
      provide: TitleStrategy,
      useClass: PageTitleService
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeRu);
  }
 }
