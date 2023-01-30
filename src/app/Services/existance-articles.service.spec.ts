import { TestBed } from '@angular/core/testing';

import { ExistanceArticlesService } from './existance-articles.service';

describe('ExistanceArticlesService', () => {
  let service: ExistanceArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExistanceArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
