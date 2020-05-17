import {Component, Input, OnInit} from '@angular/core';
import {Shoppinglist} from "../shared/shoppinglist";

@Component({
  selector: 'a.bs-shopping-list-entry',
  templateUrl: './shopping-list-entry.component.html',
  styles: []
})
export class ShoppingListEntryComponent implements OnInit {
  @Input() shoppinglist: Shoppinglist;

  constructor() { }

  ngOnInit(): void {
  }

}
