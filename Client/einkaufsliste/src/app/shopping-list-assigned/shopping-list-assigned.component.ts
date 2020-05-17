import {Component, Input, OnInit} from '@angular/core';
import {Shoppinglist} from "../shared/shoppinglist";
import {ShoppinglistCacheService} from "../shared/shoppinglist-cache.service";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-shopping-list-assigned',
  templateUrl: './shopping-list-assigned.component.html',
  styles: []
})
export class ShoppingListAssignedComponent implements OnInit {
  @Input() shoppinglist: Shoppinglist;
  shoppinglists: Shoppinglist[];

  constructor(private sc: ShoppinglistCacheService, public authService: AuthenticationService) { }

  ngOnInit(): void {
    // Get Lists by Helper ID
    this.sc.getListsByHelperId(this.authService.getCurrentUserId()).subscribe(res => this.shoppinglists = res);
  }

}
