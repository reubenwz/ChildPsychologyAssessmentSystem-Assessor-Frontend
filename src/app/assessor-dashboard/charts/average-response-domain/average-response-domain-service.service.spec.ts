import { TestBed } from '@angular/core/testing';

import { AverageResponseDomainServiceService } from './average-response-domain-service.service';

describe('AverageResponseDomainServiceService', () => {
  let service: AverageResponseDomainServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AverageResponseDomainServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
