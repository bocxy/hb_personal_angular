import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgaRegisterComponent } from './cga-register.component';

describe('CgaRegisterComponent', () => {
  let component: CgaRegisterComponent;
  let fixture: ComponentFixture<CgaRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CgaRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CgaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
