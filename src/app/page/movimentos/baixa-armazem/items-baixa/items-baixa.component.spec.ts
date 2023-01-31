import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsBaixaComponent } from './items-baixa.component';

describe('ItemsBaixaComponent', () => {
  let component: ItemsBaixaComponent;
  let fixture: ComponentFixture<ItemsBaixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsBaixaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsBaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
