import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImmovableComponent } from './edit-immovable.component';

describe('EditImmovableComponent', () => {
  let component: EditImmovableComponent;
  let fixture: ComponentFixture<EditImmovableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditImmovableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditImmovableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
