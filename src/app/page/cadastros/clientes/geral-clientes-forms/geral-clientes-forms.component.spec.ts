import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeralClientesFormsComponent } from './geral-clientes-forms.component';

describe('GeralClientesFormsComponent', () => {
  let component: GeralClientesFormsComponent;
  let fixture: ComponentFixture<GeralClientesFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeralClientesFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeralClientesFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
