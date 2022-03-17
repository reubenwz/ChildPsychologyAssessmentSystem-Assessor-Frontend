import { TestBed } from '@angular/core/testing';

import { DashboardPresentationService } from './dashboard-presentation.service';

describe('DashboardPresentationService', () => {
  let service: DashboardPresentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardPresentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
