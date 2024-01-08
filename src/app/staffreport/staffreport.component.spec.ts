import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffreportComponent } from './staffreport.component';

describe('StaffreportComponent', () => {
  let component: StaffreportComponent;
  let fixture: ComponentFixture<StaffreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
