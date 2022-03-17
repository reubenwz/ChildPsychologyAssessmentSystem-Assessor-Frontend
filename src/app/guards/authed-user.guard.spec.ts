import { TestBed } from '@angular/core/testing';

import { AuthedUserGuard } from './authed-user.guard';

describe('AuthedUserGuard', () => {
  let guard: AuthedUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthedUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
