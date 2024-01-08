import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgaDetailsComponent } from './cga-details.component';

describe('CgaDetailsComponent', () => {
  let component: CgaDetailsComponent;
  let fixture: ComponentFixture<CgaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CgaDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
