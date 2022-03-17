import { TestBed } from '@angular/core/testing';

import { LocServiceService } from './loc-service.service';

describe('LocServiceService', () => {
  let service: LocServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
