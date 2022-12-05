import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoItemsComponent } from './tipo-items.component';

describe('TipoItemsComponent', () => {
  let component: TipoItemsComponent;
  let fixture: ComponentFixture<TipoItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
