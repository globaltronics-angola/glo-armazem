import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGeralComponent } from './form-geral.component';

describe('FormGeralComponent', () => {
  let component: FormGeralComponent;
  let fixture: ComponentFixture<FormGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGeralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
