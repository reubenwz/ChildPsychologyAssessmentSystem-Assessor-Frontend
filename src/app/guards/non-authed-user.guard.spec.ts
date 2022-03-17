import { TestBed } from '@angular/core/testing';

import { NonAuthedUserGuard } from './non-authed-user.guard';

describe('NonAuthedUserGuard', () => {
  let guard: NonAuthedUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NonAuthedUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
