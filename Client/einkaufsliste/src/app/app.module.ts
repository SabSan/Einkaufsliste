import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEntryComponent } from './shopping-list-entry/shopping-list-entry.component';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';
import { ShoppinglistCacheService } from "./shared/shoppinglist-cache.service";
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app-routing.module";
import {registerLocaleData} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ShoppingListFormComponent } from './shopping-list-form/shopping-list-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import { ShoppingListFeedbackComponent } from './shopping-list-feedback/shopping-list-feedback.component';
import { ShoppingListAssignedComponent } from './shopping-list-assigned/shopping-list-assigned.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingListEntryComponent,
    ShoppingListDetailsComponent,
    HomeComponent,
    ShoppingListFormComponent,
    LoginComponent,
    ShoppingListFeedbackComponent,
    ShoppingListAssignedComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [ShoppinglistCacheService, AuthenticationService,
    {provide: LOCALE_ID, useValue: 'de'},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
