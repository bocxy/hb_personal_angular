import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeDataComponent } from './office-data.component';

describe('OfficeDataComponent', () => {
  let component: OfficeDataComponent;
  let fixture: ComponentFixture<OfficeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
