import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GendersService } from '../../../services/genders.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CaretakersService } from '../../../services/caretakers.service';
import { CaretakersServiceActions } from '../../../services/caretakers-service-actions';
import { ApplicationStateService } from '../../../services/application-state.service';

@Component({
  selector: 'app-create-caretaker-dialog',
  templateUrl: './create-caretaker-dialog.component.html',
  styleUrls: ['./create-caretaker-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCaretakerDialogComponent implements OnInit, OnDestroy {
  public addCaretakerForm: FormGroup;
  private successSubscription$?: Subscription;
  public relationships = [
    { name: 'Mother', code: 'Mother' },
    { name: 'Father', code: 'Father' },
    { name: 'Brother', code: 'Brother' },
    { name: 'Sister', code: 'Sister' },
    { name: 'Grandmother', code: 'Grandmother' },
    { name: 'Grandfather', code: 'Grandfather' },
    { name: 'Uncle', code: 'Uncle' },
    { name: 'Aunt', code: 'Aunt' },
    { name: 'Relative', code: 'Relative' },
    { name: 'Others', code: 'Others' },
  ];
  public educationLevel = [
    { name: 'Primary', code: 'Primary' },
    { name: 'Secondary', code: 'Secondary' },
    { name: 'A Level', code: 'A Level' },
    { name: 'Diploma', code: 'Diploma' },
    { name: 'Bachelor', code: 'Bachelor' },
    { name: 'Master', code: 'Master' },
    { name: 'PhD', code: 'PhD' },
  ];
  public accommodationStatus = [
    { name: 'Owner - occupier', code: 'Owner occupier' },
    { name: 'Rented - Others', code: 'Rented - Others' },
    {
      name: 'Staying with friends/family as a short term guest',
      code: 'Staying with friends/family as a short term guest',
    },
    { name: 'Homeless', code: 'Homeless' },
    { name: 'Others', code: 'Others' },
  ];
  public accommodationType = [
    { name: 'HDB 2 Room', code: 'HDB 2 Room' },
    { name: 'HDB 3 Room', code: 'HDB 3 Room' },
    { name: 'HDB 4 Room', code: 'HDB 4 Room' },
    { name: 'HDB 5 Room', code: 'HDB 5 Room' },
    { name: 'HDB maisonette', code: 'HDB maisonette' },
    { name: 'Condo', code: 'Condo' },
    { name: 'Landed', code: 'Landed' },
  ];
  constructor(
    public applicationStateService: ApplicationStateService,
    public clientService: ClientService,
    public caretakersService: CaretakersService,
    public gendersService: GendersService,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder
  ) {
    const client = this.clientService.specificClient$.getValue();
    this.addCaretakerForm = this.formBuilder.group({
      caretakerUniqueId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      idNumber: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: [new Date(), [Validators.required]],
      relationshipToClient: ['', [Validators.required]],
      address: ['', [Validators.required]],
      educationLevel: ['', [Validators.required]],
      currentOccupation: ['', [Validators.required]],
      accommodationStatus: ['', [Validators.required]],
      accommodationType: ['', [Validators.required]],
      monthlyIncome: [0, [Validators.required, Validators.min(0)]],
      clientId: [client?.clientId || '', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.caretakersService.serviceState$
      .pipe(
        filter(
          (state) =>
            state === CaretakersServiceActions.SUCCESSFUL_CARETAKER_CREATION
        )
      )
      .subscribe(() => {
        const client = this.clientService.specificClient$.getValue();
        if (client) {
          this.clientService.viewClientDetail(client.clientId);
        }
        this.ref.close();
      });
  }

  ngOnDestroy(): void {
    if (this.successSubscription$) {
      this.successSubscription$.unsubscribe();
    }
  }

  public addCaretaker() {
    this.caretakersService.createCaretaker(this.addCaretakerForm.getRawValue());
  }

  public cancelAddCaretaker() {
    this.ref.close();
  }
}
