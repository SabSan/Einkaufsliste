import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListAssignedComponent } from './shopping-list-assigned.component';

describe('ShoppingListAssignedComponent', () => {
  let component: ShoppingListAssignedComponent;
  let fixture: ComponentFixture<ShoppingListAssignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListAssignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
