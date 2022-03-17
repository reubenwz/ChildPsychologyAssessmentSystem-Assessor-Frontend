import { TestBed } from '@angular/core/testing';

import { CaretakerAssessmentFormService } from './caretaker-assessment-form.service';

describe('CaretakerAssessmentFormService', () => {
  let service: CaretakerAssessmentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaretakerAssessmentFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
