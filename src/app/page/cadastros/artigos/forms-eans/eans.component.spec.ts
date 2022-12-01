import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EansComponent } from './eans.component';

describe('EansComponent', () => {
  let component: EansComponent;
  let fixture: ComponentFixture<EansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
