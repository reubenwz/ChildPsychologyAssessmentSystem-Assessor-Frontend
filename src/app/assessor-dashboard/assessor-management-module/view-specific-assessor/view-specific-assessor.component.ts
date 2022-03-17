import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AssessorService } from '../assessor.service';
import { ActivatedRoute } from '@angular/router';
import { OrganisationManagementService } from '../../organisation-management-module-dashboard/organisation-management.service';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Assessor } from '../../../models/assessor';
import { ConfirmationService } from 'primeng/api';
import { Certification } from '../../../models/certification';
import { CertificationService } from '../../../services/certification.service';
import { filter } from 'rxjs/operators';
import { CertificationServiceActions } from '../../../services/certification-service-actions';
import { ViewSpecificAssessorService } from './view-specific-assessor.service';
import { AssessorActions } from '../assessor-actions';
import { ApplicationStateService } from '../../../services/application-state.service';
import { Client } from 'src/app/models/client';
import { ClientService } from '../../client-management-module-dashboard/client.service';
import { ViewSpecificClientDialogComponent } from '../../client-management-module-dashboard/view-specific-client-dialog/view-specific-client-dialog.component';

@Component({
  selector: 'app-view-specific-assessor',
  templateUrl: './view-specific-assessor.component.html',
  styleUrls: ['./view-specific-assessor.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService, ConfirmationService],
})
export class ViewSpecificAssessorComponent implements OnInit, OnDestroy {
  private addSuperviseeDialog?: DynamicDialogRef;
  private certificationServiceSubscription$?: Subscription;
  private routeSubscription$?: Subscription;
  private assessorServiceSubscription$?: Subscription;
  private ref?: DynamicDialogRef;

  constructor(
    public applicationStateService: ApplicationStateService,
    public assessorService: AssessorService,
    public certificationService: CertificationService,
    public organisationManagementService: OrganisationManagementService,
    public viewSpecificAssessor: ViewSpecificAssessorService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private clientService: ClientService,
  ) {
    
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

  public removeSupervisee($event: Event, supervisee: Assessor) {
    if ($event && $event.target && supervisee !== null) {
      this.confirmationService.confirm({
        key: 'deleteConfirmationPopup',
        target: $event.target,
        message: 'Are you sure that you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const assessor = this.assessorService.specificAssessor$.value;
          if (assessor) {
            this.assessorService.removeSuperviseeFromAssessor(
              supervisee,
              assessor
            );
          }
        },
      });
    }
  }

  public removeCertification($event: Event, certification: Certification) {
    if ($event && $event.target && certification !== null) {
      this.confirmationService.confirm({
        key: 'deleteConfirmationPopup',
        target: $event.target,
        message: 'Are you sure that you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.certificationService.deleteCertification(certification);
        },
      });
    }
  }

  ngOnInit(): void {
    this.routeSubscription$ = this.route.params.subscribe((routeParams) => {
      const routeId = routeParams['id'];
      if (routeId !== null) {
        const assessorId = Number.parseInt(routeId);
        this.assessorService.getSpecificAssessor(assessorId);
        if (this.certificationServiceSubscription$) {
          this.certificationServiceSubscription$.unsubscribe();
        }
        // Refresh the client whenever there's a successful deletion of certificate
        this.certificationServiceSubscription$ =
          this.certificationService.serviceState$
            .pipe(
              filter(
                (value) =>
                  value === CertificationServiceActions.SUCCESSFUL_DELETE
              )
            )
            .subscribe(() => {
              this.assessorService.getSpecificAssessor(assessorId);
            });
      }
    });

    this.assessorServiceSubscription$ =
      this.assessorService.serviceState$.subscribe((result) => {
        if (result === AssessorActions.SUCCESSFUL_ASSESSOR_UPDATE) {
          this.viewSpecificAssessor.disableEditing();
        }
      });
  }

  public enableEditing() {
    this.viewSpecificAssessor.enableEditing();
  }

  ngOnDestroy(): void {
    if (this.addSuperviseeDialog) {
      this.addSuperviseeDialog.close();
    }

    if (this.certificationServiceSubscription$) {
      this.certificationServiceSubscription$.unsubscribe();
    }

    if (this.routeSubscription$) {
      this.routeSubscription$.unsubscribe();
    }
  }
}
