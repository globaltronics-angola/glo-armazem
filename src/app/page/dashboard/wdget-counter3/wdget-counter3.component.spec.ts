import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdgetCounter3Component } from './wdget-counter3.component';

describe('WdgetCounter3Component', () => {
  let component: WdgetCounter3Component;
  let fixture: ComponentFixture<WdgetCounter3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdgetCounter3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WdgetCounter3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
