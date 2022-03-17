import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

import { Client } from '../../models/client';
import { ClientUpdateParams } from './view-specific-client-dialog/client-update-params';
import { ApplicationStateService } from '../../services/application-state.service';
import { ClientServiceActions } from './client-service-actions';
import { ClientCreateParams } from './create-client-dialog/client-create-params';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  public existingClients$: BehaviorSubject<Client[]> = new BehaviorSubject<
    Client[]
  >([]);
  public specificClient$: BehaviorSubject<Client | null> =
    new BehaviorSubject<Client | null>(null);
  public serviceState$: Subject<ClientServiceActions> =
    new Subject<ClientServiceActions>();

  constructor(
    private apiService: ApiService,
    private applicationStateService: ApplicationStateService
  ) {}

  getExistingClients() {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedGet<any>(
        '/cans-backend-rws/Resources/clientManagementAssessorSystem/assigned',
        {}
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.applicationStateService.endProcessing();
          this.existingClients$.next(response);
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

  viewClientDetail(id: number) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedGet<Client>(
        `/cans-backend-rws/Resources/clientManagementAssessorSystem/clients/${id}`
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.applicationStateService.endProcessing();
          this.specificClient$.next(response);
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            //this.applicationStateService.showErrorMessage(err.message);
          }
        }
      );
  }

  updateClient(clientDetails: ClientUpdateParams) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedPatch<any>(
        '/cans-backend-rws/Resources/clientManagementAssessorSystem/clients/' +
          clientDetails.clientId,
        JSON.parse(JSON.stringify(clientDetails))
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Client updated successfully!'
          );
          // Re-fetch client list to update
          this.serviceState$.next(
            ClientServiceActions.SUCCESSFUL_CLIENT_UPDATE
          );
          this.getExistingClients();
          this.viewClientDetail(clientDetails.clientId);
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
            ClientServiceActions.UNSUCCESSFUL_CLIENT_UPDATE
          );
        }
      );
  }

  createClient(clientDetails: ClientCreateParams) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedPost<any>(
        '/cans-backend-rws/Resources/clientManagementAssessorSystem/clients',
        JSON.parse(JSON.stringify(clientDetails))
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Client created successfully!'
          );
          // Update client list
          this.serviceState$.next(
            ClientServiceActions.SUCCESSFUL_CLIENT_CREATION
          );
          this.getExistingClients();
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
            ClientServiceActions.UNSUCCESSFUL_CLIENT_CREATION
          );
        }
      );
  }

  deleteClient(id: number) {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedDelete<any>(
        `/cans-backend-rws/Resources/clientManagementAssessorSystem/clients/${id}`
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Client deleted successfully!'
          );
          // Re-fetch client list to update
          this.serviceState$.next(
            ClientServiceActions.SUCCESSFUL_CLIENT_DELETION
          );
          this.getExistingClients();
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
            ClientServiceActions.UNSUCCESSFUL_CLIENT_DELETION
          );
        }
      );
  }
}
