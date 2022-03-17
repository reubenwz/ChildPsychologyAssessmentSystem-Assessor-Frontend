import { TestBed } from '@angular/core/testing';

import { ToptraumaTraumapercentageServiceService } from './toptrauma-traumapercentage-service.service';

describe('ToptraumaTraumapercentageServiceService', () => {
  let service: ToptraumaTraumapercentageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToptraumaTraumapercentageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
