import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovableComponent } from './edit-movable.component';

describe('EditMovableComponent', () => {
  let component: EditMovableComponent;
  let fixture: ComponentFixture<EditMovableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMovableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMovableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
