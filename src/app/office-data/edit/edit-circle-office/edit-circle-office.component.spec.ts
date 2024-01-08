import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCircleOfficeComponent } from './edit-circle-office.component';

describe('EditCircleOfficeComponent', () => {
  let component: EditCircleOfficeComponent;
  let fixture: ComponentFixture<EditCircleOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCircleOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCircleOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
