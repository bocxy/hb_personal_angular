import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAssetComponent } from './emp-asset.component';

describe('EmpAssetComponent', () => {
  let component: EmpAssetComponent;
  let fixture: ComponentFixture<EmpAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpAssetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
