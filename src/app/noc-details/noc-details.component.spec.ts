import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocDetailsComponent } from './noc-details.component';

describe('NocDetailsComponent', () => {
  let component: NocDetailsComponent;
  let fixture: ComponentFixture<NocDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NocDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
