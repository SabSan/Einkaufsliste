import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {findIndex, retry} from 'rxjs/operators';
import {Shoppinglist, User} from "../shared/shoppinglist";
import {ShoppinglistCacheService} from "../shared/shoppinglist-cache.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppingListFactory} from "../shared/shopping-list-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Feedback} from "../shared/feedback";
import {ShoppingListFeedbackFactory} from "../shared/shopping-list-feedback-factory";


@Component({
  selector: 'bs-shopping-list-details',
  templateUrl: './shopping-list-details.component.html',
  styles: []
})

export class ShoppingListDetailsComponent implements OnInit {
  shoppinglist: Shoppinglist = ShoppingListFactory.empty();
  feedback = ShoppingListFeedbackFactory.empty();
  feedbackForm: FormGroup;
  feedbacks: FormArray;
  currUser = this.authService.getCurrentUserId();
  roleUser = this.authService.getCurrentUserRole();
  user: User;


  constructor(private sc: ShoppinglistCacheService,
              private router: Router,
              private route: ActivatedRoute,
              public authService: AuthenticationService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.sc.getSingle(params['id']).subscribe(res => {
      this.shoppinglist = res;
      console.log(res);
      this.initFeedback();
    });

    // this.sc.saveFeedback(params['id']).subscribe(feedback => {
    //   this.feedback = feedback;
    //   this.initFeedback();
    // });

    console.log("CURR USER " + this.currUser);
    console.log("ROLE User " + this.roleUser);

  }

  initFeedback(){
    this.feedbackForm = this.fb.group({
      body: this.feedback.body
    });

  }

  removeList() {
    console.log(this.shoppinglist.id);
    if (confirm('Wollen Sie diese Liste wirklich löschen?')) {
      this.sc.remove(this.shoppinglist.id).subscribe(res => this.router.navigate(['../', {relativeTo: this.route}]));
    }
  }

  claimList() {
    console.log("Helfer will Liste übernehmen!");
    const shoppinglist: Shoppinglist = ShoppingListFactory.fromObject(this.shoppinglist);
    console.log(shoppinglist);
    console.log(this.currUser);
    shoppinglist.helper_id = this.currUser;
    if (confirm('Wollen Sie diese Liste übernehmen?')) {
      this.sc.update(shoppinglist).subscribe(res => {
        this.router.navigate(['../lists']);
      });
    }
  }

  addPrice() {
    console.log("Helfer will Preis eintragen!");
    const shoppinglist: Shoppinglist = ShoppingListFactory.fromObject(this.shoppinglist);
    console.log(shoppinglist);
    console.log(this.currUser);
    shoppinglist.helper_id = this.currUser;
    this.sc.update(shoppinglist).subscribe(res => {
      this.router.navigate(['../lists']);
    });
  }

  submitForm() {
    const feedback: Feedback = ShoppingListFeedbackFactory.fromObject(this.feedbackForm.value);
    const params = this.route.snapshot.params;
    console.log(feedback);

    feedback.body = this.feedbackForm.value.body;
    feedback.user_id = this.authService.getCurrentUserId();
    console.log(feedback);

    this.sc.saveFeedback(feedback, params['id']).subscribe(res => {
      this.feedback = ShoppingListFeedbackFactory.empty();
      this.feedbackForm.reset(ShoppingListFeedbackFactory.empty());
      this.router.navigate(['../../lists'], {relativeTo: this.route});
    });
  }

}
