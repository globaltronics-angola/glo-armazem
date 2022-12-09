import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaArtigosComponent } from './entrada-artigos.component';

describe('EntradaArtigosComponent', () => {
  let component: EntradaArtigosComponent;
  let fixture: ComponentFixture<EntradaArtigosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradaArtigosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntradaArtigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
