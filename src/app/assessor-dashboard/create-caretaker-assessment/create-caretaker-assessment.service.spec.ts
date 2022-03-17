import { TestBed } from '@angular/core/testing';

import { CreateCaretakerAssessmentService } from './create-caretaker-assessment.service';

describe('CreateCaretakerAssessmentService', () => {
  let service: CreateCaretakerAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCaretakerAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
