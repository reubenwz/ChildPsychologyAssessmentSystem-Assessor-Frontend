import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AssessorService } from '../assessor.service';
import { Assessor } from '../../../models/assessor';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationStateService } from '../../../services/application-state.service';

@Component({
  selector: 'app-toggle-assessor-active-dialog',
  templateUrl: './toggle-assessor-active-dialog.component.html',
  styleUrls: ['./toggle-assessor-active-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleAssessorActiveDialogComponent {
  public assessor: Assessor;
  public toggleAssessorActiveForm: FormGroup;

  constructor(
    public applicationStateService: ApplicationStateService,
    private assessorService: AssessorService,
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.assessor = config.data;
    this.toggleAssessorActiveForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  public toggleActive() {
    this.assessorService.toggleActiveStatus(this.assessor.assessorId);
    this.ref.close();
  }
}
