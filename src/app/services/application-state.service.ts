import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationStateService {
  public readonly isProcessing$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public readonly successMessage$: Subject<string> = new Subject<string>();
  public readonly errorMessage$: Subject<string> = new Subject<string>();

  constructor() {}

  public showSuccessMessage(message: string) {
    this.successMessage$.next(message);
    this.endProcessing();
  }

  public showErrorMessage(message: string) {
    this.errorMessage$.next(message);
    this.endProcessing();
  }

  public startProcessing() {
    this.isProcessing$.next(true);
  }

  public endProcessing() {
    this.isProcessing$.next(false);
  }
}
