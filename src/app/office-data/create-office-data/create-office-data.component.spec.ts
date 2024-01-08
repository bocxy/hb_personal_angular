import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOfficeDataComponent } from './create-office-data.component';

describe('CreateOfficeDataComponent', () => {
  let component: CreateOfficeDataComponent;
  let fixture: ComponentFixture<CreateOfficeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOfficeDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOfficeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
