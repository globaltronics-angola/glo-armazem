import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserindoDadosComponent } from './inserindo-dados.component';

describe('InserindoDadosComponent', () => {
  let component: InserindoDadosComponent;
  let fixture: ComponentFixture<InserindoDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserindoDadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserindoDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
