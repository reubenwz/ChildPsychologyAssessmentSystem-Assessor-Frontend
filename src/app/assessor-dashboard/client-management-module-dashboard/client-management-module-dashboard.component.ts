import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ClientService } from './client.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ViewSpecificClientDialogComponent } from './view-specific-client-dialog/view-specific-client-dialog.component';
import { Client } from '../../models/client';
import { ActivatedRoute } from '@angular/router';
import { CreateClientDialogComponent } from './create-client-dialog/create-client-dialog.component';
import { DeleteSpecificClientDialogComponent } from './delete-specific-client-dialog/delete-specific-client-dialog.component';

@Component({
  selector: 'app-client-management-module-dashboard',
  templateUrl: './client-management-module-dashboard.component.html',
  styleUrls: ['./client-management-module-dashboard.component.sass'],
  providers: [DialogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientManagementModuleDashboardComponent
  implements OnInit, OnDestroy
{
  private ref?: DynamicDialogRef;
  private deleteConfirmationRef?: DynamicDialogRef;
  private createClientRef?: DynamicDialogRef;

  constructor(
    public clientService: ClientService,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {
    const routeId = this.route.snapshot.paramMap.get('id');
    const clientId = routeId ? Number.parseInt(routeId) : null;
    if (clientId !== null) {
      this.clientService.viewClientDetail(clientId);
      this.ref = this.dialogService.open(ViewSpecificClientDialogComponent, {
        header: 'Viewing Client Details',
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
      });
    }
  }

  ngOnInit(): void {
    this.clientService.getExistingClients();
  }

  viewClientDetails(client: Client) {
    this.clientService.viewClientDetail(client.clientId);
    this.ref = this.dialogService.open(ViewSpecificClientDialogComponent, {
      header: 'Viewing Client Details: ' + client.name,
      width: '90%',
      contentStyle: { height: '90vh', overflow: 'auto' },
      baseZIndex: 100,
    });
  }

  deleteClient(client: Client) {
    this.deleteConfirmationRef = this.dialogService.open(
      DeleteSpecificClientDialogComponent,
      {
        header: 'Deleting Client: ' + client.name,
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
        data: client,
      }
    );

    this.deleteConfirmationRef.onClose.subscribe((shouldDelete: boolean) => {
      if (shouldDelete) {
        this.clientService.deleteClient(client.clientId);
      }
    });
  }

  public openCreateClientDialog() {
    this.createClientRef = this.dialogService.open(
      CreateClientDialogComponent,
      {
        header: 'Create Client',
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
      }
    );
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    if (this.deleteConfirmationRef) {
      this.deleteConfirmationRef.close();
    }
    if (this.createClientRef) {
      this.createClientRef.close();
    }
  }
}
