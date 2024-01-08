import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfficeDataComponent } from './list-office-data.component';

describe('ListOfficeDataComponent', () => {
  let component: ListOfficeDataComponent;
  let fixture: ComponentFixture<ListOfficeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfficeDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfficeDataComponent);
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
