import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAssessmentComponent } from './approve-assessment.component';

describe('ApproveAssessmentComponent', () => {
  let component: ApproveAssessmentComponent;
  let fixture: ComponentFixture<ApproveAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
