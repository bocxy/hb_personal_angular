import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCircleDataComponent } from './list-circle-data.component';

describe('ListCircleDataComponent', () => {
  let component: ListCircleDataComponent;
  let fixture: ComponentFixture<ListCircleDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCircleDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCircleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
