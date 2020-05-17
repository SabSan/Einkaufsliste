import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShoppingListFactory} from "../shared/shopping-list-factory";
import {ShoppinglistCacheService} from "../shared/shoppinglist-cache.service";
import {ActivatedRoute, Router} from "@angular/router";
//import {Listentry} from "../shared/listentry";
import {Shoppinglist, Listentry} from "../shared/shoppinglist";
import {ShoppingListFormErrorMessages} from "./shopping-list-form-error-messages";
import {AuthenticationService} from "../shared/authentication.service";
import {Feedback} from "../shared/feedback";

@Component({
  selector: 'bs-shopping-list-form',
  templateUrl: './shopping-list-form.component.html',
  styles: []
})
export class ShoppingListFormComponent implements OnInit {

  // Skript 3 Seite 17
  shoppinglistForm: FormGroup;
  shoppinglist = ShoppingListFactory.empty();
  errors: { [key: string]: string} = {};
  isUpdating = false;
  listentries: FormArray;
  feedbacks: FormArray;
  currUser = this.authService.getCurrentUserId();

  constructor(
    private fb: FormBuilder,
    private sc: ShoppinglistCacheService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdating = true;
      this.sc.getSingle(id).subscribe(shoppinglist => {
        this.shoppinglist = shoppinglist;
        this.initList();
      });
    }
    this.initList();
  }

  initList(){
    this.buildListentriesArray();

    this.shoppinglistForm = this.fb.group({
      id: this.shoppinglist.id,
      title: [this.shoppinglist.title, Validators.required],
      bought_until: [this.shoppinglist.bought_until, Validators.required],
      price: this.shoppinglist.price,
      //creator_id: this.shoppinglist.creator_id,
      listentries: this.listentries,
      feedbacks: this.feedbacks
    });
    this.shoppinglistForm.statusChanges.subscribe(() => this. updateErrorMessages ());

    console.log(this.shoppinglist);
  }

  buildListentriesArray() {
    console.log(this.shoppinglist.listentries);
    if(this.shoppinglist.listentries.length == 0 ){
      this.shoppinglist.listentries.push(new Listentry( 0 , '' , '' , null, this.shoppinglist.id))
    }
    this.listentries = this.fb.array (
      this.shoppinglist.listentries.map (
        t => this.fb.group({
          id: this.fb.control(t.id),
          description: this.fb.control(t.description, [Validators.required]),
          amount: this.fb.control(t.amount, [Validators.required]),
          max_price: this.fb.control(t.max_price, [Validators.required])
        })
      )
    );
    console.log(this.listentries);
  }

  addListentriesControl() {
     this.listentries.push(this.fb.group({id:null, description: null, amount: null,  max_price: null}));
  }

  submitForm() {
    const shoppinglist: Shoppinglist = ShoppingListFactory.fromObject(this.shoppinglistForm.value);
    console.log(shoppinglist);
    shoppinglist.listentries = this.shoppinglistForm.value.listentries;
    shoppinglist.feedbacks = this.shoppinglistForm.value.feedbacks;
    console.log(shoppinglist);
    if(this.isUpdating) {
      console.log(this.shoppinglist);
      console.log(this.shoppinglist.bought_until);
      this.sc.update(shoppinglist).subscribe( res => {
        this.router.navigate(['../../lists', shoppinglist.id], {relativeTo: this.route});
      });
    } else {
      shoppinglist.creator_id = this.currUser;
      console.log(shoppinglist);
      console.log(shoppinglist.bought_until);

      this.sc.create(shoppinglist).subscribe( res => {
        this.shoppinglist = ShoppingListFactory.empty();
        this.shoppinglistForm.reset(ShoppingListFactory.empty());
        this.router.navigate(['../lists'], {relativeTo: this.route});
      });
    }
  }

  updateErrorMessages(){
    this.errors = {};
    for(const message of ShoppingListFormErrorMessages ) {
      const control = this.shoppinglistForm.get(message.forControl);
      if ( control &&
        control.dirty &&
        control.invalid &&
        control.errors[ message.forValidator ] &&
        !this.errors[ message.forControl ]) {
        this.errors[ message.forControl ] = message.text ;
      }
    }
  }
}
