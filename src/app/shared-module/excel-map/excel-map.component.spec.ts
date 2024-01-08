import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelMapComponent } from './excel-map.component';

describe('ExcelMapComponent', () => {
  let component: ExcelMapComponent;
  let fixture: ComponentFixture<ExcelMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcelMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
