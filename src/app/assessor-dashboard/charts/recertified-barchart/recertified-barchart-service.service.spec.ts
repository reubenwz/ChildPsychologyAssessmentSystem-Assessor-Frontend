import { TestBed } from '@angular/core/testing';

import { RecertifiedBarchartServiceService } from './recertified-barchart-service.service';

describe('RecertifiedBarchartServiceService', () => {
  let service: RecertifiedBarchartServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecertifiedBarchartServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
