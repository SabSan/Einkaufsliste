import { TestBed } from '@angular/core/testing';

import { ShoppinglistCacheService } from './shoppinglist-cache.service';

describe('ShoppinglistCacheService', () => {
  let service: ShoppinglistCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppinglistCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
