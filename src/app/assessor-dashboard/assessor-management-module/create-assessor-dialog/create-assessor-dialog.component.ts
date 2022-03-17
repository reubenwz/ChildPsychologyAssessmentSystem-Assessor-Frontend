import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { OrganisationManagementService } from '../../organisation-management-module-dashboard/organisation-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssessorService } from '../assessor.service';
import { Organisation } from '../../../models/organisation';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AssessorActions } from '../assessor-actions';
import { CreateAssessorParams } from '../create-assessor-params';
import { ApplicationStateService } from '../../../services/application-state.service';

@Component({
  selector: 'app-create-assessor-dialog',
  templateUrl: './create-assessor-dialog.component.html',
  styleUrls: ['./create-assessor-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAssessorDialogComponent implements OnInit, OnDestroy {
  public readonly createAssessorForm: FormGroup;
  public readonly selectedOrganisation: Organisation;
  private assessorSubscription$?: Subscription;

  constructor(
    public applicationStateService: ApplicationStateService,
    public organisationManagementService: OrganisationManagementService,
    public assessorService: AssessorService,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder
  ) {
    this.selectedOrganisation = config.data;
    this.createAssessorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.max(32)]],
      email: ['', [Validators.required, Validators.email, Validators.max(64)]],
    });
  }

  public createAssessor() {
    const createAssessorParams: CreateAssessorParams = {
      name: this.createAssessorForm.get('name')?.value,
      email: this.createAssessorForm.get('email')?.value,
      organisation_id: this.selectedOrganisation.organisationId,
    };
    this.assessorService.createAssessor(createAssessorParams);
  }

  ngOnInit(): void {
    this.assessorSubscription$ = this.assessorService.serviceState$
      .pipe(
        filter(
          (result) => result === AssessorActions.SUCCESSFUL_ASSESSOR_CREATION
        )
      )
      .subscribe(() => {
        this.createAssessorForm.reset();
      });
  }

  ngOnDestroy(): void {
    if (this.assessorSubscription$) {
      this.assessorSubscription$.unsubscribe();
    }
  }
}
