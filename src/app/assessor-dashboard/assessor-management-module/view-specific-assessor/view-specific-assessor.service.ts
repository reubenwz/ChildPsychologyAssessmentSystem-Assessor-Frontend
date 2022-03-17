import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewSpecificAssessorService {
  public readonly editMode$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor() {}

  public loadSpecificAssessorClients() {
    
  }

  public enableEditing() {
    this.editMode$.next(true);
  }

  public disableEditing() {
    this.editMode$.next(false);
  }
}
