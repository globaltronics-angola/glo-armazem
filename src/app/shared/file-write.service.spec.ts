import { TestBed } from '@angular/core/testing';

import { FileWriteService } from './file-write.service';

describe('FileWriteService', () => {
  let service: FileWriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileWriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
