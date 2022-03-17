import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

import { Certification } from '../../models/certification';
import { CertificationUpdateParams } from './view-specific-certification-dialog/certification-update-params';
import { ApplicationStateService } from '../../services/application-state.service';
import { CertificationServiceActions } from './certification-service-actions';
import { CertificationCreateParams } from './create-certification-dialog/certification-create-params';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CertificationService {
  public existingCertifications$: BehaviorSubject<Certification[]> =
    new BehaviorSubject<Certification[]>([]);
  public specificCertification$: BehaviorSubject<Certification | null> =
    new BehaviorSubject<Certification | null>(null);
  public serviceState$: Subject<CertificationServiceActions> =
    new Subject<CertificationServiceActions>();

  public mostRecentCert$: BehaviorSubject<any |null> = new BehaviorSubject<any | null>(null);

  constructor(
    private apiService: ApiService,
    private applicationStateService: ApplicationStateService,
    private storageService: StorageService
  ) { }

  getExistingCertifications() {
    let mostRecentCert = {};
    let mostRecentDate = new Date('1965-08-09');
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedGet<Certification[]>(
        '/cans-backend-rws/Resources/Certification/certificates'
      )
      .subscribe(
        (response) => {
          this.applicationStateService.endProcessing();
          console.log(response);
          response.forEach((cert: any) => {
            cert.dateOfCert = new Date(cert.dateOfCert.substring(0, 10));
            cert.expiryDate = new Date(
              cert.dateOfCert.getFullYear() + 2,
              cert.dateOfCert.getMonth(),
              cert.dateOfCert.getDate()
            );
            if (cert.dateOfCert > mostRecentDate) {
              mostRecentCert = cert;
              this.storageService.storeJsonData(
                'mostRecentCert',
                mostRecentCert
              );
            }
          });
          this.mostRecentCert$.next(mostRecentCert);
          this.existingCertifications$.next(response);
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

  // viewCertificationDetail(id: number) {
  //   this.applicationStateService.startProcessing();
  //   this.apiService
  //     .authenticatedGet<Certification>(
  //       '/cans-backend-rws/Resources/Certification/certifications/' + id
  //     )
  //     .subscribe(
  //       (response) => {
  //         this.applicationStateService.endProcessing();
  //         this.specificCertification$.next(response);
  //       },
  //       (err) => {
  //         if (err.status === 409) {
  //           const errorMessageInJson: any = err.error;
  //           this.applicationStateService.showErrorMessage(
  //             errorMessageInJson.error
  //           );
  //         } else {
  //           this.applicationStateService.showErrorMessage(err.message);
  //         }
  //       }
  //     );
  // }

  updateCertification(certificationDetails: CertificationUpdateParams) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedPatch<any>(
        '/cans-backend-rws/Resources/Certification/certificate/' +
        certificationDetails.certificationId,
        JSON.parse(JSON.stringify(certificationDetails))
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Certification updated successfully!'
          );
          // Re-fetch certification list to update
          this.serviceState$.next(
            CertificationServiceActions.SUCCESSFUL_CERTIFICATION_UPDATE
          );
          this.getExistingCertifications();
          //this.viewCertificationDetail(certificationDetails.certificationId);
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
            CertificationServiceActions.UNSUCCESSFUL_CERTIFICATION_UPDATE
          );
        }
      );
  }
  deleteCertificate(certificateId: number) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedDelete<any>(
        '/cans-backend-rws/Resources/Certification/certificate/' + certificateId
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Certification deleted successfully!'
          );
          // Re-fetch cert list to update
          this.serviceState$.next(
            CertificationServiceActions.SUCCESSFUL_CERTIFICATION_DELETION
          );
          this.getExistingCertifications();
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
            CertificationServiceActions.UNSUCCESSFUL_CERTIFICATION_DELETION
          );
        }
      );
  }

  createCertification(certificationDetails: CertificationCreateParams) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedPost<any>(
        '/cans-backend-rws/Resources/Certification/certificate',
        JSON.parse(JSON.stringify(certificationDetails))
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Certification created successfully!'
          );
          // Update certification list
          this.serviceState$.next(
            CertificationServiceActions.SUCCESSFUL_CERTIFICATION_CREATION
          );
          this.getExistingCertifications();
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
            CertificationServiceActions.UNSUCCESSFUL_CERTIFICATION_CREATION
          );
        }
      );
  }
}
