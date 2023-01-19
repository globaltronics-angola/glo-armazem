import { TestBed } from '@angular/core/testing';

import { PrinterArticlesService } from './printer-articles.service';

describe('PrinterArticlesService', () => {
  let service: PrinterArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrinterArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
