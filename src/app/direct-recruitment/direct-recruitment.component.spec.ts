import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectRecruitmentComponent } from './direct-recruitment.component';

describe('DirectRecruitmentComponent', () => {
  let component: DirectRecruitmentComponent;
  let fixture: ComponentFixture<DirectRecruitmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectRecruitmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
