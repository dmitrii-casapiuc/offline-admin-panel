import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search'

import { AuthInterceptor } from '@app/utils/auth.interceptor'
import { AppRoutingModule } from '@app/app-routing.module'
import { MaterialModule } from '@app/material.module'
import { AppComponent } from '@app/app.component'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxMatSelectSearchModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
