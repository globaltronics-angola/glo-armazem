import { TestBed } from '@angular/core/testing';

import { StorageServicePaginateService } from './storage.service.paginate.service';

describe('StorageServicePaginateService', () => {
  let service: StorageServicePaginateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageServicePaginateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
