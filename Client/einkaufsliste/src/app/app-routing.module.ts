import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingListDetailsComponent } from "./shopping-list-details/shopping-list-details.component";
import {HomeComponent} from "./home/home.component";
import {ShoppingListFormComponent} from "./shopping-list-form/shopping-list-form.component";
import {LoginComponent} from "./login/login.component";
import {ShoppingListAssignedComponent} from "./shopping-list-assigned/shopping-list-assigned.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'lists', component: ShoppingListComponent },
  { path: 'lists/:id', component: ShoppingListDetailsComponent },
  { path: 'admin', component: ShoppingListFormComponent },
  { path: 'admin/:id', component: ShoppingListFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'assigned', component: ShoppingListAssignedComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
