import { TestBed } from '@angular/core/testing';

import { AssessorEmailsService } from './assessor-emails.service';

describe('AssessorEmailsService', () => {
  let service: AssessorEmailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessorEmailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
