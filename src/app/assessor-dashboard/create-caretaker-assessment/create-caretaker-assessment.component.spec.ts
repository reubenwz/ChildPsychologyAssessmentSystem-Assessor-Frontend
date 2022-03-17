import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCaretakerAssessmentComponent } from './create-caretaker-assessment.component';

describe('CreateCaretakerAssessmentComponent', () => {
  let component: CreateCaretakerAssessmentComponent;
  let fixture: ComponentFixture<CreateCaretakerAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCaretakerAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCaretakerAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
