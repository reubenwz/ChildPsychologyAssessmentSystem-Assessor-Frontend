import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ClientService } from '../client.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AssessorEmailsService } from 'src/app/services/assessor-emails.service';
import { ClientServiceActions } from '../client-service-actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-specific-client-dialog',
  templateUrl: './view-specific-client-dialog.component.html',
  styleUrls: ['./view-specific-client-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSpecificClientDialogComponent implements OnInit, OnDestroy {
  public editMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private successSubscription$?: Subscription;

  constructor(
    public clientService: ClientService,
    public assessorEmailsService: AssessorEmailsService,
    private route: ActivatedRoute
  ) {
    let selectedClientId = this.route.snapshot.params['id'];
    console.log(selectedClientId);
    this.clientService.viewClientDetail(selectedClientId);
  }

  ngOnInit(): void {
    this.successSubscription$ = this.clientService.serviceState$
      .pipe(
        filter((msg) => msg === ClientServiceActions.SUCCESSFUL_CLIENT_UPDATE)
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
    this.assessorEmailsService.retrieveAssessorEmails();
  }

  public disableEditing() {
    this.editMode$.next(false);
  }
}
