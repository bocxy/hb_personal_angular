import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditEmpComponent } from './addedit-emp.component';

describe('AddeditEmpComponent', () => {
  let component: AddeditEmpComponent;
  let fixture: ComponentFixture<AddeditEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function beforeEach(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

