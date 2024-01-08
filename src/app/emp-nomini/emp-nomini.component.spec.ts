import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpNominiComponent } from './emp-nomini.component';

describe('EmpNominiComponent', () => {
  let component: EmpNominiComponent;
  let fixture: ComponentFixture<EmpNominiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpNominiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpNominiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
