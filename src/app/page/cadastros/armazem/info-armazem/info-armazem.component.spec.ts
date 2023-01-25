import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoArmazemComponent } from './info-armazem.component';

describe('InfoArmazemComponent', () => {
  let component: InfoArmazemComponent;
  let fixture: ComponentFixture<InfoArmazemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoArmazemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoArmazemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
