import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListEntryComponent } from './shopping-list-entry.component';

describe('ShoppingListEntryComponent', () => {
  let component: ShoppingListEntryComponent;
  let fixture: ComponentFixture<ShoppingListEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
