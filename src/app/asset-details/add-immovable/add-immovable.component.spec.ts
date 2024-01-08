import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImmovableComponent } from './add-immovable.component';

describe('AddImmovableComponent', () => {
  let component: AddImmovableComponent;
  let fixture: ComponentFixture<AddImmovableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImmovableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImmovableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
