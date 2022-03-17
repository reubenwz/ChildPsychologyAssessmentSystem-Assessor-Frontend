import { NavbarService } from 'src/app/services/navbar.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CertificationService } from './certification.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ViewSpecificCertificationDialogComponent } from './view-specific-certification-dialog/view-specific-certification-dialog.component';
import { CreateCertificationDialogComponent } from './create-certification-dialog/create-certification-dialog.component';
import { Certification } from '../../models/certification';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.sass'],
  providers: [DialogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificationComponent implements OnInit, OnDestroy {
  private ref?: DynamicDialogRef;
  private deleteConfirmationRef?: DynamicDialogRef;
  private createCertificationRef?: DynamicDialogRef;
  public currentAssessor$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    public certificationService: CertificationService,
    public navbarService: NavbarService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private storageService: StorageService
  ) {
    const routeId = this.route.snapshot.paramMap.get('id');
    const certificationId = routeId ? Number.parseInt(routeId) : null;
    if (certificationId !== null) {
      //this.certificationService.viewCertificationDetail(certificationId);
      this.ref = this.dialogService.open(
        ViewSpecificCertificationDialogComponent,
        {
          header: 'Viewing Certification Details',
          width: '90%',
          contentStyle: { height: '90vh', overflow: 'auto' },
          baseZIndex: 100,
        }
      );
    }
    this.currentAssessor$.next(
      this.storageService.retrieveJsonData('currentAssessor')
    );
  }

  ngOnInit(): void {
    this.certificationService.getExistingCertifications();
  }

  deleteCertificate(certificateId: number) {
    this.certificationService.deleteCertificate(certificateId);
  }

  viewCertificationDetails(certification: Certification) {
     this.certificationService.specificCertification$.next(certification);
     this.ref = this.dialogService.open(
       ViewSpecificCertificationDialogComponent,
       {
         header:
           'Viewing Certification Details: ' + certification.certificationId,
         width: '90%',
         contentStyle: { height: '90vh', overflow: 'auto' },
         baseZIndex: 100,
       }
     );
  }

  public openCreateCertificationDialog() {
    this.createCertificationRef = this.dialogService.open(
      CreateCertificationDialogComponent,
      {
        header: 'Create Certification',
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
      }
    );
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    if (this.deleteConfirmationRef) {
      this.deleteConfirmationRef.close();
    }
    if (this.createCertificationRef) {
      this.createCertificationRef.close();
    }
  }
}
