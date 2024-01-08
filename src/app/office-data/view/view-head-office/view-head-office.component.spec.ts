import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHeadOfficeComponent } from './view-head-office.component';

describe('ViewHeadOfficeComponent', () => {
  let component: ViewHeadOfficeComponent;
  let fixture: ComponentFixture<ViewHeadOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHeadOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHeadOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
