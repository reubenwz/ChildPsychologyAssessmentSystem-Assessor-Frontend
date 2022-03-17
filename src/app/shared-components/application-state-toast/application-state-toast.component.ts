import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApplicationStateService } from '../../services/application-state.service';

@Component({
  selector: 'app-application-state-toast',
  templateUrl: './application-state-toast.component.html',
  styleUrls: ['./application-state-toast.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class ApplicationStateToastComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private applicationStateService: ApplicationStateService
  ) {}

  ngOnInit(): void {
    this.applicationStateService.successMessage$.subscribe((message) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success!',
        detail: message,
      });
    });

    this.applicationStateService.errorMessage$.subscribe((message) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error!',
        detail: message,
      });
    });
  }
}
