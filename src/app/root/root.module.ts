import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatars';
import { MaterialModule } from '../shared/material.module';
import { NotificationBarComponent } from './component/notification-bar/notification-bar.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { RootDefaultComponent } from './component/root-default/root-default.component';
import { HttpRequestInterceptor } from './http-interceptor';
import { routes } from './route';

@NgModule({
  declarations: [
    RootDefaultComponent,
    PageNotFoundComponent,
    NotificationBarComponent
  ],
  imports: [
    AvatarModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledNonBlocking' }),
    FlexLayoutModule
  ],
  providers: [
    [
      { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
    ]
  ],
  bootstrap: [RootDefaultComponent]
})
export class RootModule { }
