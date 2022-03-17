import { TestBed } from '@angular/core/testing';

import { ScoresLinechartServiceService } from './scores-linechart-service.service';

describe('ScoresLinechartServiceService', () => {
  let service: ScoresLinechartServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoresLinechartServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
