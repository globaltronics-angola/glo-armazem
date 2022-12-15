import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLocalizacaoComponent } from './new-localizacao.component';

describe('NewLocalizacaoComponent', () => {
  let component: NewLocalizacaoComponent;
  let fixture: ComponentFixture<NewLocalizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLocalizacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLocalizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
