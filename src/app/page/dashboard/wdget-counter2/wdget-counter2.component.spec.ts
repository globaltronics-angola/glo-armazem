import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdgetCounter2Component } from './wdget-counter2.component';

describe('WdgetCounter2Component', () => {
  let component: WdgetCounter2Component;
  let fixture: ComponentFixture<WdgetCounter2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdgetCounter2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WdgetCounter2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
