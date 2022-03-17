import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Subject } from 'rxjs';
import { CaretakersServiceActions } from './caretakers-service-actions';
import { ApplicationStateService } from './application-state.service';
import { CreateCaretakerParams } from '../assessor-dashboard/client-management-module-dashboard/create-caretaker-dialog/create-caretaker-params';

@Injectable({
  providedIn: 'root',
})
export class CaretakersService {
  public readonly serviceState$: Subject<CaretakersServiceActions> =
    new Subject<CaretakersServiceActions>();

  constructor(
    private apiService: ApiService,
    private applicationStateService: ApplicationStateService
  ) {}

  public toggleActiveStatus(caretakerId: Number): void {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedPost<any>(
        '/cans-backend-rws/Resources/clientManagementAssessorSystem/caretakers/' +
          caretakerId +
          '/updateActive'
      )
      .subscribe(
        (response) => {
          this.applicationStateService.showSuccessMessage(response.message);
          this.serviceState$.next(
            CaretakersServiceActions.SUCCESSFUL_STATUS_TOGGLE
          );
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
            CaretakersServiceActions.UNSUCCESSFUL_STATUS_TOGGLE
          );
        }
      );
  }

  public createCaretaker(caretakerDetails: CreateCaretakerParams) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedPost<any>(
        '/cans-backend-rws/Resources/clientManagementAssessorSystem/caretakers',
        JSON.parse(JSON.stringify(caretakerDetails))
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Caregiver created successfully!'
          );
          this.serviceState$.next(
            CaretakersServiceActions.SUCCESSFUL_CARETAKER_CREATION
          );
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
            CaretakersServiceActions.UNSUCCESSFUL_CARETAKER_DELETION
          );
        }
      );
  }

  public deleteCaretaker(id: number): void {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedDelete<any>(
        '/cans-backend-rws/Resources/clientManagementAssessorSystem/caretakers/' +
          id
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Caregiver deleted successfully!'
          );
          this.serviceState$.next(
            CaretakersServiceActions.SUCCESSFUL_CARETAKER_DELETION
          );
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
            CaretakersServiceActions.UNSUCCESSFUL_CARETAKER_DELETION
          );
        }
      );
  }
}
