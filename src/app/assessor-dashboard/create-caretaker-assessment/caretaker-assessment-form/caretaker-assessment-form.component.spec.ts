import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaretakerAssessmentFormComponent } from './caretaker-assessment-form.component';

describe('CaretakerAssessmentFormComponent', () => {
  let component: CaretakerAssessmentFormComponent;
  let fixture: ComponentFixture<CaretakerAssessmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaretakerAssessmentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaretakerAssessmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
