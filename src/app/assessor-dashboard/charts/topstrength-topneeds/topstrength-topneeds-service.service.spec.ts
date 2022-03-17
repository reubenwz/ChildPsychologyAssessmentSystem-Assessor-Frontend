import { TestBed } from '@angular/core/testing';

import { TopstrengthTopneedsServiceService } from './topstrength-topneeds-service.service';

describe('TopstrengthTopneedsServiceService', () => {
  let service: TopstrengthTopneedsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopstrengthTopneedsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
