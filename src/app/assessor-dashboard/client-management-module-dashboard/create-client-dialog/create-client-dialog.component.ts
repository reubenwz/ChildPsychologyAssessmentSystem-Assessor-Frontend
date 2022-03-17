import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClientService } from '../client.service';
import { filter } from 'rxjs/operators';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClientServiceActions } from '../client-service-actions';
import { ApplicationStateService } from '../../../services/application-state.service';
import { GendersService } from '../../../services/genders.service';

@Component({
  selector: 'app-create-client-dialog',
  templateUrl: './create-client-dialog.component.html',
  styleUrls: ['./create-client-dialog.component.sass'],
})
export class CreateClientDialogComponent implements OnInit, OnDestroy {
  private successSubscription$?: Subscription;
  public createClientForm: FormGroup;

  constructor(
    public clientService: ClientService,
    public applicationStateService: ApplicationStateService,
    public gendersService: GendersService,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef
  ) {
    this.createClientForm = this.formBuilder.group({
      clientUniqueId: ['', [Validators.required]],
      idNumber: ['', [Validators.required]],
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      address: ['', [Validators.required]],
      ethnicity: ['', [Validators.required]],
      admissionType: ['', [Validators.required]],
      placementType: ['', [Validators.required]],
      accommodationStatus: ['', [Validators.required]],
      accommodationType: ['', [Validators.required]],
      educationLevel: ['', [Validators.required]],
      currentOccupation: ['', [Validators.required]],
      monthlyIncome: [0, [Validators.required, Validators.min(0)]],
      assessorEmail: ['', [Validators.email]],
    });
  }

  public createClient() {
    this.clientService.createClient(this.createClientForm.getRawValue());
  }

  ngOnInit(): void {
    this.successSubscription$ = this.clientService.serviceState$
      .pipe(
        filter((msg) => msg === ClientServiceActions.SUCCESSFUL_CLIENT_CREATION)
      )
      .subscribe(() => {
        this.ref.close();
      });
  }

  ngOnDestroy(): void {
    if (this.successSubscription$) {
      this.successSubscription$.unsubscribe();
    }
  }
}
