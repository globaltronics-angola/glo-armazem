import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRulesComponent } from './users-rules.component';

describe('UsersRulesComponent', () => {
  let component: UsersRulesComponent;
  let fixture: ComponentFixture<UsersRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersRulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
