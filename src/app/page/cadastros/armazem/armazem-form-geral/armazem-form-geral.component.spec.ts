import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmazemFormGeralComponent } from './armazem-form-geral.component';

describe('ArmazemFormGeralComponent', () => {
  let component: ArmazemFormGeralComponent;
  let fixture: ComponentFixture<ArmazemFormGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmazemFormGeralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmazemFormGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
