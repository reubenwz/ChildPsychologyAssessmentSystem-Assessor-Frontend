import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardPresentationService {
  public readonly presentationMode$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public readonly presentationStep$: BehaviorSubject<number> =
    new BehaviorSubject<number>(1);
  public readonly canNavigatePrevious$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public readonly canNavigateNext$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  private minStep = 1;
  private maxStep = 9;

  constructor() {}

  public goNext() {
    const currentValue = this.presentationStep$.value;
    if (currentValue < this.maxStep) {
      this.presentationStep$.next(currentValue + 1);
      this.canNavigatePrevious$.next(true);
      if (currentValue + 1 === this.maxStep) {
        this.canNavigateNext$.next(false);
      }
    }
  }

  public goPrevious() {
    const currentValue = this.presentationStep$.value;
    if (currentValue > this.minStep) {
      this.presentationStep$.next(currentValue - 1);
      this.canNavigateNext$.next(true);
      if (currentValue - 1 === this.minStep) {
        this.canNavigatePrevious$.next(false);
      }
    }
  }

  public goPresent() {
    this.presentationMode$.next(true);
  }

  public exitPresent() {
    this.presentationMode$.next(false);
  }

  public showInStep(stepNumber: number): boolean {
    if (this.presentationMode$.value) {
      return this.presentationStep$.value === stepNumber;
    }

    return true;
  }
}
