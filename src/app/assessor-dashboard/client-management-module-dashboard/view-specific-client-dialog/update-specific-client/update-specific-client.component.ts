import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { ClientService } from '../../client.service';
import { AssessorEmailsService } from '../../../../services/assessor-emails.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GendersService } from '../../../../services/genders.service';
import { ApplicationStateService } from '../../../../services/application-state.service';

@Component({
  selector: 'app-update-specific-client',
  templateUrl: './update-specific-client.component.html',
  styleUrls: ['./update-specific-client.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateSpecificClientComponent implements OnInit {
  public clientDetailsUpdateForm: FormGroup;
  @Output()
  public disableEditingEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  public ethnicity = [
    { name: 'Chinese', code: 'Chinese' },
    { name: 'Malay', code: 'Malay' },
    { name: 'Indian', code: 'Indian' },
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
    public assessorEmailsService: AssessorEmailsService,
    public gendersService: GendersService,
    private formBuilder: FormBuilder
  ) {
    this.clientDetailsUpdateForm = formBuilder.group({
      clientId: ['', [Validators.required]],
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

  ngOnInit(): void {
    this.updateFormDetails();
  }

  updateClient() {
    this.clientService.updateClient(this.clientDetailsUpdateForm.getRawValue());
  }

  public cancelUpdate() {
    this.disableEditingEvent.emit(true);
  }

  private updateFormDetails() {
    const client = this.clientService.specificClient$.getValue();
    if (client) {
      this.clientDetailsUpdateForm.setValue({
        clientId: client.clientId,
        clientUniqueId: client.clientUniqueId,
        idNumber: client.idNumber,
        name: client.name,
        gender: client.gender,
        dob: new Date(client.dob),
        address: client.address,
        ethnicity: client.ethnicity,
        admissionType: client.admissionType,
        placementType: client.placementType,
        accommodationStatus: client.accommodationStatus,
        accommodationType: client.accommodationType,
        educationLevel: client.educationLevel,
        currentOccupation: client.currentOccupation,
        monthlyIncome: client.monthlyIncome,
        assessorEmail: client.assessor?.email || '',
      });
    }
  }

  public selectAssessor(selectedData: any) {
    this.clientDetailsUpdateForm.patchValue(
      {
        assessorEmail: selectedData.value,
      },
      { emitEvent: true }
    );
  }
}
