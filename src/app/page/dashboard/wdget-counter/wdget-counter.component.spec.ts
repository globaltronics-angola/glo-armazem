import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdgetCounterComponent } from './wdget-counter.component';

describe('WdgetCounterComponent', () => {
  let component: WdgetCounterComponent;
  let fixture: ComponentFixture<WdgetCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdgetCounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WdgetCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
