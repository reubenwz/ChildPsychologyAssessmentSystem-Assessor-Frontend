import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Assessor } from '../../../models/assessor';
import { AssessorService } from '../assessor.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AssessorActions } from '../assessor-actions';
import { ApplicationStateService } from '../../../services/application-state.service';

@Component({
  selector: 'app-delete-assessor-dialog',
  templateUrl: './delete-assessor-dialog.component.html',
  styleUrls: ['./delete-assessor-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAssessorDialogComponent implements OnInit, OnDestroy {
  public deleteAssessorForm: FormGroup;
  public assessorData: Assessor;
  private assessorSubscription$?: Subscription;

  constructor(
    public assessorService: AssessorService,
    public applicationStateService: ApplicationStateService,
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.assessorData = config.data;
    this.deleteAssessorForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.assessorSubscription$ = this.assessorService.serviceState$
      .pipe(
        filter(
          (result) => result === AssessorActions.SUCCESSFUL_ASSESSOR_DELETION
        )
      )
      .subscribe(() => {
        this.ref.close();
      });
  }

  public deleteAssessor() {
    this.assessorService.deleteAssessor(this.assessorData.assessorId);
  }

  ngOnDestroy(): void {
    if (this.assessorSubscription$) {
      this.assessorSubscription$.unsubscribe();
    }
  }
}
