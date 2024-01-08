import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffStrengthComponent } from './staff-strength.component';

describe('StaffStrengthComponent', () => {
  let component: StaffStrengthComponent;
  let fixture: ComponentFixture<StaffStrengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffStrengthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
