import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {CertificationService} from '../../certification.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApplicationStateService} from '../../../../services/application-state.service';
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-update-specific-certification',
  templateUrl: './update-specific-certification.component.html',
  styleUrls: ['./update-specific-certification.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateSpecificCertificationComponent implements OnInit {
  public certificationDetailsUpdateForm: FormGroup;
  @Output()
  public disableEditingEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public applicationStateService: ApplicationStateService,
    public certificationService: CertificationService,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef
  ) {
    this.certificationDetailsUpdateForm = formBuilder.group({
      certificationId: ['', [Validators.required]],
      dateOfCert: ['', [Validators.required]],
      vignette: ['', [Validators.required]],
      recentScore: ['', [Validators.required]],
      noOfTimesRecertified: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.updateFormDetails();
  }

  updateCertification() {
    this.certificationService.updateCertification(
      this.certificationDetailsUpdateForm.getRawValue()
    );
    this.ref.close();
  }

  public cancelUpdate() {
    this.disableEditingEvent.emit(true);
  }

  private updateFormDetails() {
    const certification =
      this.certificationService.specificCertification$.getValue();
    if (certification) {
      this.certificationDetailsUpdateForm.setValue({
        certificationId: certification.certificationId,
        dateOfCert: new Date(certification.dateOfCert),
        vignette: certification.vignette,
        recentScore: certification.recentScore,
        noOfTimesRecertified: certification.noOfTimesRecertified,
      });
    }
  }
}
