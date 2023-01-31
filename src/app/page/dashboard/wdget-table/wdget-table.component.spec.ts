import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdgetTableComponent } from './wdget-table.component';

describe('WdgetTableComponent', () => {
  let component: WdgetTableComponent;
  let fixture: ComponentFixture<WdgetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdgetTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WdgetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
