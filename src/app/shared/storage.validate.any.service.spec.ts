import { TestBed } from '@angular/core/testing';

import { StorageValidateAnyService } from './storage.validate.any.service';

describe('StorageValidateAnyService', () => {
  let service: StorageValidateAnyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageValidateAnyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
