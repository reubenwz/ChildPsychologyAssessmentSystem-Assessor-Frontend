import { Injectable } from '@angular/core';
import { FilterService, SelectItemGroup } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
  deps: [FilterService],
})
export class AssessorEmailsService {
  public groupedAssessorEmails$: BehaviorSubject<SelectItemGroup[]> =
    new BehaviorSubject<SelectItemGroup[]>([]);
  public filteredAssessorEmails$: BehaviorSubject<SelectItemGroup[]> =
    new BehaviorSubject<SelectItemGroup[]>([]);
  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(
    private filterService: FilterService,
    private apiService: ApiService
  ) {}

  retrieveAssessorEmails() {
    this.apiService
      .authenticatedGet<SelectItemGroup[]>(
        '/cans-backend-rws/Resources/AssessorManagement-AssessorSystem/assessors'
      )
      .subscribe(
        (response) => {
          this.errorMessage$.next(null);
          this.groupedAssessorEmails$.next(response);
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.errorMessage$.next(errorMessageInJson.error);
          } else {
            this.errorMessage$.next(err.message);
          }
        }
      );
  }

  filterAssessorEmails(event: any) {
    let query = event.query;
    let filteredGroups = [];

    const existingEmailAddresses = this.groupedAssessorEmails$.getValue();
    for (let optgroup of existingEmailAddresses) {
      let filteredSubOptions = this.filterService.filter(
        optgroup.items,
        ['label'],
        query,
        'contains'
      );
      if (filteredSubOptions && filteredSubOptions.length) {
        filteredGroups.push({
          label: optgroup.label,
          value: optgroup.value,
          items: filteredSubOptions,
        });
      }
    }

    this.filteredAssessorEmails$.next(filteredGroups);
  }
}
