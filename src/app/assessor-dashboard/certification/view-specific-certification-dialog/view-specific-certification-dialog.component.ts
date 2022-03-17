import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import {CertificationService} from '../certification.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {CertificationServiceActions} from '../certification-service-actions';

@Component({
  selector: 'app-view-specific-certification-dialog',
  templateUrl: './view-specific-certification-dialog.component.html',
  styleUrls: ['./view-specific-certification-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSpecificCertificationDialogComponent implements OnInit {
  public editMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private successSubscription$?: Subscription;

  constructor(
    public certificationService: CertificationService
  ) {
  }

  ngOnInit(): void {
    this.successSubscription$ = this.certificationService.serviceState$
      .pipe(
        filter(
          (msg) =>
            msg === CertificationServiceActions.SUCCESSFUL_CERTIFICATION_UPDATE
        )
      )
      .subscribe(() => {
        this.disableEditing();
      });
  }

  ngOnDestroy(): void {
    if (this.successSubscription$) {
      this.successSubscription$.unsubscribe();
    }
  }

  public enableEditing() {
    this.editMode$.next(true);
  }

  public disableEditing() {
    this.editMode$.next(false);
  }
}
