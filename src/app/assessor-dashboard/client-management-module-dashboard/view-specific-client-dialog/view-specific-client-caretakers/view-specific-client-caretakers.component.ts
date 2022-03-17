import { Component, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ClientService } from '../../client.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CaretakersService } from '../../../../services/caretakers.service';
import { Subscription } from 'rxjs';
import { CaretakersServiceActions } from '../../../../services/caretakers-service-actions';
import { ApplicationStateService } from '../../../../services/application-state.service';
import { CreateCaretakerDialogComponent } from '../../create-caretaker-dialog/create-caretaker-dialog.component';

@Component({
  selector: 'app-view-specific-client-caretakers',
  templateUrl: './view-specific-client-caretakers.component.html',
  styleUrls: ['./view-specific-client-caretakers.component.sass'],
  providers: [ConfirmationService, DialogService],
})
export class ViewSpecificClientCaretakersComponent implements OnDestroy {
  private createCaretakerDialogRef?: DynamicDialogRef;
  private caretakersState$: Subscription;

  constructor(
    public applicationStateService: ApplicationStateService,
    public clientService: ClientService,
    public caretakersService: CaretakersService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {
    this.caretakersState$ = this.caretakersService.serviceState$.subscribe(
      (newState) => {
        if (
          newState === CaretakersServiceActions.SUCCESSFUL_CARETAKER_DELETION ||
          newState === CaretakersServiceActions.SUCCESSFUL_STATUS_TOGGLE
        ) {
          // Refresh the state of the client completely
          const client = this.clientService.specificClient$.value;
          if (client) {
            this.clientService.viewClientDetail(client.clientId);
          }
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.createCaretakerDialogRef) {
      this.createCaretakerDialogRef.close();
    }
  }

  addCaretakerToCurrentClient() {
    const client = this.clientService.specificClient$.getValue();
    if (client) {
      this.createCaretakerDialogRef = this.dialogService.open(
        CreateCaretakerDialogComponent,
        {
          header: 'Adding caretaker for ' + client.name,
          width: '80%',
          contentStyle: { height: '80vh', overflow: 'auto' },
          baseZIndex: 105,
        }
      );
    }
  }

  public toggleCaretakerStatus($event: Event, caretakerId: number) {
    if ($event && $event.target && caretakerId !== null) {
      this.confirmationService.confirm({
        key: 'deleteConfirmationPopup',
        target: $event.target,
        message: 'Are you sure that you want to toggle the caretaker status?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.caretakersService.toggleActiveStatus(caretakerId);
        },
      });
    }
  }

  public deleteCaretaker($event: Event, caretakerId: number) {
    if ($event && $event.target && caretakerId !== null) {
      this.confirmationService.confirm({
        key: 'deleteConfirmationPopup',
        target: $event.target,
        message: 'Are you sure that you want to delete the caretaker?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.caretakersService.deleteCaretaker(caretakerId);
        },
      });
    }
  }
}
