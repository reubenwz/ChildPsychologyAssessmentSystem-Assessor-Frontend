import { TestBed } from '@angular/core/testing';

import { CaretakersService } from './caretakers.service';

describe('CaretakersService', () => {
  let service: CaretakersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaretakersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
