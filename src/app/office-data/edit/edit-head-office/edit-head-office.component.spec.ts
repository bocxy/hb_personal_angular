import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeadOfficeComponent } from './edit-head-office.component';

describe('AddHeadOfficeComponent', () => {
  let component: AddHeadOfficeComponent;
  let fixture: ComponentFixture<AddHeadOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHeadOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHeadOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
