import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StafSancComponent } from './staf-sanc.component';

describe('StafSancComponent', () => {
  let component: StafSancComponent;
  let fixture: ComponentFixture<StafSancComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StafSancComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StafSancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
