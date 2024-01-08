import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDivisionDataComponent } from './list-division-data.component';

describe('ListDivisionDataComponent', () => {
  let component: ListDivisionDataComponent;
  let fixture: ComponentFixture<ListDivisionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDivisionDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDivisionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
