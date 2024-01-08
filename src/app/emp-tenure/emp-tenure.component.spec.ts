import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpTenureComponent } from './emp-tenure.component';

describe('EmpTenureComponent', () => {
  let component: EmpTenureComponent;
  let fixture: ComponentFixture<EmpTenureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpTenureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpTenureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
