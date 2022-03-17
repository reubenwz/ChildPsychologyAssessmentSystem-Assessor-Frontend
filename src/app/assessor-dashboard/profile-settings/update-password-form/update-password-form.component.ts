import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { UpdatePasswordResponse } from './update-password-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePasswordFormComponent implements OnInit {
  public isProcessing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public successMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public updatePasswordForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.updatePasswordForm = this.formBuilder.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(5)]],
      new_password_confirm: [
        '',
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }

  ngOnInit(): void {}

  updatePassword() {
    this.isProcessing$.next(true);
    const newPassword = this.updatePasswordForm.get('new_password')?.value;
    const newPasswordConfirm = this.updatePasswordForm.get(
      'new_password_confirm'
    )?.value;

    if (newPassword === newPasswordConfirm) {
      const data = {
        old_password: this.updatePasswordForm.get('old_password')?.value,
        new_password: newPassword,
      };
      this.apiService
        .authenticatedPost<UpdatePasswordResponse>(
          '/cans-backend-rws/Resources/Assessor/password-reset-internal',
          data
        )
        .subscribe(
          (response) => {
            this.isProcessing$.next(false);
            this.successMessage$.next(response.message);
            this.errorMessage$.next(null);
            // Clear form after using
            this.updatePasswordForm.reset();
          },
          (err) => {
            this.isProcessing$.next(false);
            if (err.status === 409) {
              const errorMessageInJson: any = err.error;
              this.errorMessage$.next(errorMessageInJson.error);
            } else {
              this.errorMessage$.next(err.message);
            }
          }
        );
    } else {
      this.isProcessing$.next(false);
      this.errorMessage$.next('Passwords do not match!');
      this.successMessage$.next(null);
    }
  }
}
