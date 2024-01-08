import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPromotionComponent } from './emp-promotion.component';

describe('EmpPromotionComponent', () => {
  let component: EmpPromotionComponent;
  let fixture: ComponentFixture<EmpPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpPromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
