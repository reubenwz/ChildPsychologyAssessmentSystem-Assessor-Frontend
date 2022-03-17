import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssessorService } from '../../assessor.service';
import { ViewSpecificAssessorService } from '../view-specific-assessor.service';
import { UpdateAssessorParams } from '../../update-assessor-params';
import { ApplicationStateService } from '../../../../services/application-state.service';

@Component({
  selector: 'app-update-specific-assessor',
  templateUrl: './update-specific-assessor.component.html',
  styleUrls: ['./update-specific-assessor.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateSpecificAssessorComponent {
  public assessorDetailsUpdateForm?: FormGroup;

  constructor(
    public applicationStateService: ApplicationStateService,
    public assessorService: AssessorService,
    public viewSpecificAssessor: ViewSpecificAssessorService,
    private formBuilder: FormBuilder
  ) {
    const assessor = this.assessorService.specificAssessor$.value;
    this.assessorDetailsUpdateForm = this.formBuilder.group({
      name: [assessor?.name, [Validators.required, Validators.max(32)]],
      email: [
        assessor?.email,
        [Validators.required, Validators.email, Validators.max(64)],
      ],
      assessorId: [assessor?.assessorId, [Validators.required]],
      supervisor: [assessor?.supervisor ? assessor?.supervisor : null, []],
    });
  }

  public updateAssessor() {
    if (this.assessorDetailsUpdateForm) {
      const supervisor =
        this.assessorDetailsUpdateForm.get('supervisor')?.value;
      const assessorDetails: UpdateAssessorParams = {
        assessorId: Number.parseInt(
          this.assessorDetailsUpdateForm.get('assessorId')?.value
        ),
        email: this.assessorDetailsUpdateForm.get('email')?.value,
        name: this.assessorDetailsUpdateForm.get('name')?.value,
        supervisor_id: supervisor ? supervisor.assessorId : '',
      };

      this.assessorService.updateAssessor(assessorDetails);
    }
  }
}
