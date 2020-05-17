import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListFeedbackComponent } from './shopping-list-feedback.component';

describe('ShoppingListFeedbackComponent', () => {
  let component: ShoppingListFeedbackComponent;
  let fixture: ComponentFixture<ShoppingListFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
