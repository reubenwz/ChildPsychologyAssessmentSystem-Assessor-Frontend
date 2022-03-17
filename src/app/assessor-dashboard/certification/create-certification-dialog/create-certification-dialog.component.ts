import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CertificationService } from '../certification.service';
import { filter } from 'rxjs/operators';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CertificationServiceActions } from '../certification-service-actions';
import { ApplicationStateService } from '../../../services/application-state.service';

@Component({
  selector: 'app-create-certification-dialog',
  templateUrl: './create-certification-dialog.component.html',
  styleUrls: ['./create-certification-dialog.component.sass'],
})
export class CreateCertificationDialogComponent implements OnInit {
  private successSubscription$?: Subscription;
  public createCertificationForm: FormGroup;
  today:Date = new Date();
  nowYear = this.today.getFullYear();
  public minDateForCreateCert:Date = new Date();
  public maxDateForCreateCert:Date = new Date();

  constructor(
    public certificationService: CertificationService,
    public applicationStateService: ApplicationStateService,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef
  ) {
    this.createCertificationForm = this.formBuilder.group({
      dateOfCert: ['', [Validators.required]],
      vignette: ['', [Validators.required]],
      recentScore: ['', [Validators.required]],
      noOfTimesRecertified: ['', [Validators.required]],
    });
    this.minDateForCreateCert.setFullYear(this.today.getFullYear() - 2);
  }

  public createCertification() {
    this.certificationService.createCertification(
      this.createCertificationForm.getRawValue()
    );
  }

  ngOnInit(): void {
    this.successSubscription$ = this.certificationService.serviceState$
      .pipe(
        filter(
          (msg) =>
            msg ===
            CertificationServiceActions.SUCCESSFUL_CERTIFICATION_CREATION
        )
      )
      .subscribe(() => {
        this.ref.close();
      });
  }

  ngOnDestroy(): void {
    if (this.successSubscription$) {
      this.successSubscription$.unsubscribe();
    }
  }
}
