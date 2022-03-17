import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrganisationManagementService } from './organisation-management.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { OrganisationManagementServiceActions } from './organisation-management-service-actions';

@Component({
  selector: 'app-organisation-management-module-dashboard',
  templateUrl: './organisation-management-module-dashboard.component.html',
  styleUrls: ['./organisation-management-module-dashboard.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class OrganisationManagementModuleDashboardComponent
  implements OnInit, OnDestroy
{
  public selectOrgMessage$: BehaviorSubject<string> =
    new BehaviorSubject<string>('Select Organisation');
  private createOrgRef?: DynamicDialogRef;
  private deleteOrgRef?: DynamicDialogRef;
  private orgServiceSubscription$?: Subscription;
  private routeSubscription$?: Subscription;

  constructor(
    private dialogService: DialogService,
    public organisationManagementService: OrganisationManagementService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    if (this.createOrgRef) {
      this.createOrgRef.close();
    }
    if (this.deleteOrgRef) {
      this.deleteOrgRef.close();
    }
    if (this.orgServiceSubscription$) {
      this.orgServiceSubscription$.unsubscribe();
    }
    if (this.routeSubscription$) {
      this.routeSubscription$.unsubscribe();
    }
  }
}
