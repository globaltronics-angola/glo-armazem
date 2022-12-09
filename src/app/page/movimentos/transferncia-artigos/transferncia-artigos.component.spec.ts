import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfernciaArtigosComponent } from './transferncia-artigos.component';

describe('TransfernciaArtigosComponent', () => {
  let component: TransfernciaArtigosComponent;
  let fixture: ComponentFixture<TransfernciaArtigosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfernciaArtigosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfernciaArtigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
