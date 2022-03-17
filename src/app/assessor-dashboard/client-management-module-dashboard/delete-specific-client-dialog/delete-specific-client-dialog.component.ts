import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../../models/client';
import { ApplicationStateService } from '../../../services/application-state.service';

@Component({
  selector: 'app-delete-specific-client-dialog',
  templateUrl: './delete-specific-client-dialog.component.html',
  styleUrls: ['./delete-specific-client-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteSpecificClientDialogComponent {
  public deletionConfirmationForm: FormGroup;
  public client: Client;

  constructor(
    public applicationStateService: ApplicationStateService,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig
  ) {
    this.deletionConfirmationForm = formBuilder.group({
      message: ['', [Validators.required]],
    });
    this.client = config.data;
  }

  confirmDeletion() {
    this.ref.close(true);
  }
}
