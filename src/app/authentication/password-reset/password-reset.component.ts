import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.sass'],
})
export class PasswordResetComponent implements OnInit {
  public passwordResetForm: FormGroup;
  public isProcessing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public successMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.passwordResetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  public resetPassword() {
    this.isProcessing$.next(true);

    const data = {
      email: this.passwordResetForm.get('email')?.value,
    };

    this.apiService
      .post<any>('/cans-backend-rws/Resources/Assessor/password-reset', data)
      .subscribe(
        (response) => {
          this.isProcessing$.next(false);
          this.successMessage$.next(response.message);
          this.errorMessage$.next(null);
          // Clear form after using
          this.passwordResetForm.reset();
        },
        (err: HttpErrorResponse) => {
          this.isProcessing$.next(false);
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.errorMessage$.next(errorMessageInJson.error);
          } else {
            this.errorMessage$.next(err.message);
          }
          this.successMessage$.next(null);
        }
      );
  }
}
