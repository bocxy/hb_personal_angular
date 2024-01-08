import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHeadDataComponent } from './list-head-data.component';

describe('ListHeadDataComponent', () => {
  let component: ListHeadDataComponent;
  let fixture: ComponentFixture<ListHeadDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHeadDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHeadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
