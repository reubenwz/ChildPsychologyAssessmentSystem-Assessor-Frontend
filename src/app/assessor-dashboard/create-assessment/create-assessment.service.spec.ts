import { TestBed } from '@angular/core/testing';

import { CreateAssessmentService } from './create-assessment.service';

describe('CreateAssessmentService', () => {
  let service: CreateAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
