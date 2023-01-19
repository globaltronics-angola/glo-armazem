import { TestBed } from '@angular/core/testing';

import { PrinterArticlesService } from './printer-articles.service';

//@ts-ignore
describe('PrinterArticlesService', () => {
  let service: PrinterArticlesService;
//@ts-ignore
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrinterArticlesService);
  });
//@ts-ignore
  it('should be created', () => {
    //@ts-ignoreF
    expect(service).toBeTruthy();
  });
});
