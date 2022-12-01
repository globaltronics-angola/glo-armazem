import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmazemComponent } from './armazem.component';

describe('ArmazemComponent', () => {
  let component: ArmazemComponent;
  let fixture: ComponentFixture<ArmazemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmazemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmazemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
