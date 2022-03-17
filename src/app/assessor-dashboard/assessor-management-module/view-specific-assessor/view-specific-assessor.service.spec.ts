import { TestBed } from '@angular/core/testing';

import { ViewSpecificAssessorService } from './view-specific-assessor.service';

describe('ViewSpecificAssessorService', () => {
  let service: ViewSpecificAssessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewSpecificAssessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
