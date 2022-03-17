import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Certification } from '../models/certification';
import { BehaviorSubject } from 'rxjs';
import { CertificationServiceActions } from './certification-service-actions';
import { ApplicationStateService } from './application-state.service';

@Injectable({
  providedIn: 'root',
})
export class CertificationService {
  public serviceState$: BehaviorSubject<CertificationServiceActions | null> =
    new BehaviorSubject<CertificationServiceActions | null>(null);

  constructor(
    private apiService: ApiService,
    private applicationStateService: ApplicationStateService
  ) {}

  deleteCertification(certification: Certification) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedDelete(
        '/cans-backend-rws/Resources/AssessorManagement-AdminSystem/certifications/' +
          certification
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Certification deleted successfully!'
          );
          this.serviceState$.next(
            CertificationServiceActions.SUCCESSFUL_DELETE
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
            CertificationServiceActions.UNSUCCESSFUL_DELETE
          );
        }
      );
  }
}
