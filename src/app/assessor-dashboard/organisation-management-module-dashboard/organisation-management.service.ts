import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Organisation } from '../../models/organisation';
import { GenericLabelValue } from '../../models/generic-label-value';
import { OrganisationManagementServiceActions } from './organisation-management-service-actions';
import { ApplicationStateService } from '../../services/application-state.service';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrganisationManagementService {
  public readonly selectedOrganisation$: BehaviorSubject<Organisation | null> =
    new BehaviorSubject<Organisation | null>(null);
  public readonly organisation$: BehaviorSubject<Organisation> =
    new BehaviorSubject<Organisation>({} as any);
  public readonly organisationTypes$: BehaviorSubject<GenericLabelValue[]> =
    new BehaviorSubject<GenericLabelValue[]>([]);
  public readonly serviceState$: Subject<OrganisationManagementServiceActions> =
    new Subject<OrganisationManagementServiceActions>();

  constructor(
    private applicationStateService: ApplicationStateService,
    private apiService: ApiService,
    private storageService: StorageService,
  ) {
    console.log(this.storageService.retrieveJsonData('currentAssessor'))
    this.selectedOrganisation$.next(this.storageService.retrieveJsonData('currentAssessor').assessor.organisation)
    // console.log(this.storageService.retrieveJsonData('currentAssessor').assessor.organisation.name)
  }

}
