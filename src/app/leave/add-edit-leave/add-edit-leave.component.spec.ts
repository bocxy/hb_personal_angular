import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLeaveComponent } from './add-edit-leave.component';

describe('AddEditLeaveComponent', () => {
  let component: AddEditLeaveComponent;
  let fixture: ComponentFixture<AddEditLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
