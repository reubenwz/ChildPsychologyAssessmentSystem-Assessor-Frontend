import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AssessorService } from './assessor.service';
import { OrganisationManagementService } from '../organisation-management-module-dashboard/organisation-management.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateAssessorDialogComponent } from './create-assessor-dialog/create-assessor-dialog.component';
import { DeleteAssessorDialogComponent } from './delete-assessor-dialog/delete-assessor-dialog.component';
import { Assessor } from '../../models/assessor';
import { ToggleAssessorActiveDialogComponent } from './toggle-assessor-active-dialog/toggle-assessor-active-dialog.component';
import { ApplicationStateService } from '../../services/application-state.service';

@Component({
  selector: 'app-assessor-management-module',
  templateUrl: './assessor-management-module.component.html',
  styleUrls: ['./assessor-management-module.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class AssessorManagementModuleComponent implements OnInit, OnDestroy {
  private createAssessorRef?: DynamicDialogRef;
  private deleteAssessorRef?: DynamicDialogRef;
  private toggleAssessorActiveRef?: DynamicDialogRef;

  constructor(
    public applicationStateService: ApplicationStateService,
    public assessorService: AssessorService,
    public organisationManagementService: OrganisationManagementService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.assessorService.getExistingAssessors();
  }

  openCreateAssessorDialog() {
    console.log('create asessor dialog() called')
    this.createAssessorRef = this.dialogService.open(
      CreateAssessorDialogComponent,
      {
        header: 'Create Assessor',
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
        data: this.organisationManagementService.selectedOrganisation$.value,
      }
    );
  }

  public openAssessorActiveToggleDialog(assessor: Assessor) {
    this.toggleAssessorActiveRef = this.dialogService.open(
      ToggleAssessorActiveDialogComponent,
      {
        header: 'Toggle Assessor Active Status',
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
        data: assessor,
      }
    );
  }

  public openDeleteAssessorDialog(assessor: Assessor) {
    this.deleteAssessorRef = this.dialogService.open(
      DeleteAssessorDialogComponent,
      {
        header: 'Deleting Assessor ' + assessor.name,
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
        data: assessor,
      }
    );
  }

  ngOnDestroy(): void {
    if (this.createAssessorRef) {
      this.createAssessorRef.close();
    }
    if (this.deleteAssessorRef) {
      this.deleteAssessorRef.close();
    }
    if (this.toggleAssessorActiveRef) {
      this.toggleAssessorActiveRef.close();
    }
  }
}
