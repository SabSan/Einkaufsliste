import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {Listentry, Shoppinglist, User} from "../shared/shoppinglist";
import {ShoppinglistCacheService} from "../shared/shoppinglist-cache.service";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: []
})
export class ShoppingListComponent implements OnInit {
  @Input() shoppinglist: Shoppinglist;
  shoppinglists: Shoppinglist[];

  constructor(private sc: ShoppinglistCacheService, public authService: AuthenticationService) { }

  ngOnInit() {
    if(this.authService.isHelper()) {
      this.sc.getWhereNoHelper().subscribe(res => this.shoppinglists = res);
    } else {
      // Get Lists by Creator ID
      this.sc.getListsByCreatorId(this.authService.getCurrentUserId()).subscribe(res => this.shoppinglists = res);
    }
  }
}
