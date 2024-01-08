import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPayComponent } from './emp-pay.component';

describe('EmpPayComponent', () => {
  let component: EmpPayComponent;
  let fixture: ComponentFixture<EmpPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
