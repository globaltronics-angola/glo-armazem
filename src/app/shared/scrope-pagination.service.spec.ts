import { TestBed } from '@angular/core/testing';

import { ScropePaginationService } from './scrope-pagination.service';

describe('ScropePaginationService', () => {
  let service: ScropePaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScropePaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
