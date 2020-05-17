import { Component } from '@angular/core';
import {Shoppinglist} from "./shared/shoppinglist";
import {AuthenticationService} from "./shared/authentication.service";
import {ShoppinglistCacheService} from "./shared/shoppinglist-cache.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  //shoppinglist: Shoppinglist;

  constructor(public authService: AuthenticationService) {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    } else {
      return "Login";
    }
  }
}
