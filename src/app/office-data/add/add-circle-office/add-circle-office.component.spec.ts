import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCircleOfficeComponent } from './add-circle-office.component';

describe('AddCircleOfficeComponent', () => {
  let component: AddCircleOfficeComponent;
  let fixture: ComponentFixture<AddCircleOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCircleOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCircleOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
