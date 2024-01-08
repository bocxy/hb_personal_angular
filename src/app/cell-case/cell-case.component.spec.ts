import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCaseComponent } from './cell-case.component';

describe('CellCaseComponent', () => {
  let component: CellCaseComponent;
  let fixture: ComponentFixture<CellCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
