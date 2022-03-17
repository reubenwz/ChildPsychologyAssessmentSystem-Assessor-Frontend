import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GenderLabel } from './gender-label';

@Injectable({
  providedIn: 'root',
})
export class GendersService {
  public genders$: BehaviorSubject<GenderLabel[]> = new BehaviorSubject<
    GenderLabel[]
  >([
    {
      label: 'Male',
      value: 'Male',
    },
    {
      label: 'Female',
      value: 'Female',
    },
    {
      label: 'Others',
      value: 'Others',
    },
    {
      label: 'Unspecified',
      value: 'Unspecified',
    },
  ]);

  constructor() {}
}
