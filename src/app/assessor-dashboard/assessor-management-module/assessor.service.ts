import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

import { Assessor } from '../../models/assessor';
import { CreateAssessorParams } from './create-assessor-params';
import { UpdateAssessorParams } from './update-assessor-params';
import { AssessorManagementParams } from './assessor-management-params';
import { OrganisationManagementService } from '../organisation-management-module-dashboard/organisation-management.service';
import { FilterService } from 'primeng/api';
import { AssessorActions } from './assessor-actions';
import { ApplicationStateService } from '../../services/application-state.service';
import { StorageService } from 'src/app/services/storage.service';
import { Client } from 'src/app/models/client';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
  deps: [FilterService],
})
export class AssessorService {
  public readonly existingAssessors$: BehaviorSubject<Assessor[]> =
    new BehaviorSubject<Assessor[]>([]);
  public readonly filteredAssessors$: BehaviorSubject<Assessor[]> =
    new BehaviorSubject<Assessor[]>([]);
  public readonly specificAssessor$: BehaviorSubject<Assessor | null> =
    new BehaviorSubject<Assessor | null>(null);
  public readonly serviceState$: Subject<AssessorActions> =
    new Subject<AssessorActions>();
  private organisationSubscription$?: Subscription;
  public currentOrganisationName: string = '';
  public currentOrganisationId: number = -1;
  private selectedAssessorId: number = -1;

  constructor(
    private applicationStateService: ApplicationStateService,
    private apiService: ApiService,
    private organisationManagementService: OrganisationManagementService,
    private filterService: FilterService,
    private storageService: StorageService,
    private route: ActivatedRoute
  ) {
    // this.currentOrganisationName = this.storageService.retrieveJsonData('currentAssessor').assessor.organisation.name;
    // this.currentOrganisationId = this.storageService.retrieveJsonData('currentAssessor').assessor.organisation.organisationId;
    // this.selectedAssessorId =
  }

  public getExistingAssessors() {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedGet<Assessor[]>(
        '/cans-backend-rws/Resources/AssessorManagement-AssessorSystem/assessors'
        // JSON.parse(JSON.stringify(assessorManagementParams))
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.applicationStateService.endProcessing();
          this.existingAssessors$.next(response);
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
        }
      );
  }

  public getSpecificAssessor(assessorId: number) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedGet<Assessor>(
        `/cans-backend-rws/Resources/AssessorManagement-AssessorSystem/assessors/${assessorId}`
      )
      .subscribe(
        (response) => {
          console.log('sacsdcds');
          console.log(response);
          this.applicationStateService.endProcessing();

          this.apiService
            .authenticatedGet<Client[]>(
              `/cans-backend-rws/Resources/Assessor/clients/${assessorId}`
            )
            .subscribe((specAssClients) => {
              response.clients = specAssClients;
              this.specificAssessor$.next(response);
            });

          // Side effect: when a specific assessor is viewed, the specified assessor's organisation will be loaded
          // this.organisationManagementService.selectOrganisation(
          //   response.organisation
          // );
        },

        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
        }
      );
  }

  public createAssessor(assessorDetails: CreateAssessorParams) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedPost(
        '/cans-backend-rws/Resources/AssessorManagement-AssessorSystem/assessors/',
        JSON.parse(JSON.stringify(assessorDetails))
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Assessor created successfully!'
          );
          this.serviceState$.next(AssessorActions.SUCCESSFUL_ASSESSOR_CREATION);
          this.getExistingAssessors();
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
          this.serviceState$.next(
            AssessorActions.UNSUCCESSFUL_ASSESSOR_CREATION
          );
        }
      );
  }

  public updateAssessor(assessor: UpdateAssessorParams) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedPatch(
        '/cans-backend-rws/Resources/AssessorManagement-AssessorSystem/assessors/' +
          assessor.assessorId,
        JSON.parse(JSON.stringify(assessor))
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Assessor updated successfully!'
          );
          this.getSpecificAssessor(assessor.assessorId);
          this.serviceState$.next(AssessorActions.SUCCESSFUL_ASSESSOR_UPDATE);
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
          this.serviceState$.next(AssessorActions.UNSUCCESSFUL_ASSESSOR_UPDATE);
        }
      );
  }

  public deleteAssessor(assessorId: number) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedDelete(
        '/cans-backend-rws/Resources/AssessorManagement-AssessorSystem/assessors/' +
          assessorId
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Assessor deleted successfully!'
          );
          this.serviceState$.next(AssessorActions.SUCCESSFUL_ASSESSOR_DELETION);
          this.getExistingAssessors();
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
          this.serviceState$.next(
            AssessorActions.UNSUCCESSFUL_ASSESSOR_DELETION
          );
        }
      );
  }

  public removeSuperviseeFromAssessor(
    supervisee: Assessor,
    assessor: Assessor
  ) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedDelete(
        '/cans-backend-rws/Resources/AssessorManagement-AssessorSystem/assessors/' +
          assessor.assessorId +
          '/supervisee/' +
          supervisee.assessorId
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Supervisee relationship removed successfully!'
          );
          this.getSpecificAssessor(assessor.assessorId);
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
        }
      );
  }

  public filterAssessorEmails(event: any, assessor?: Assessor) {
    const query = event.query;
    const existingAssessors = this.existingAssessors$.getValue();
    const filteredSubOptions: Assessor[] = this.filterService.filter(
      existingAssessors,
      ['email'],
      query,
      'contains'
    );
    const filteredStatus: Assessor[] = this.filterService.filter(
      filteredSubOptions,
      ['active'],
      true,
      'equals'
    );
    if (assessor) {
      const optionsWithoutSelf: Assessor[] = this.filterService.filter(
        filteredStatus,
        ['assessorId'],
        assessor.assessorId,
        'notEquals'
      );
      this.filteredAssessors$.next(optionsWithoutSelf);
    } else {
      this.filteredAssessors$.next(filteredStatus);
    }
  }

  public toggleActiveStatus(assessorId: Number): void {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedPost<any>(
        '/cans-backend-rws/Resources/AssessorManagement-AssessorSystem/assessors/' +
          assessorId +
          '/updateActive'
      )
      .subscribe(
        (response) => {
          this.applicationStateService.showSuccessMessage(response.message);
          this.getExistingAssessors();
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
        }
      );
  }
}
