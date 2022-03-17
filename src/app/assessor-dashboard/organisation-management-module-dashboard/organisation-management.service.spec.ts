import { TestBed } from '@angular/core/testing';

import { OrganisationManagementService } from './organisation-management.service';

describe('OrganisationManagementService', () => {
  let service: OrganisationManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganisationManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
