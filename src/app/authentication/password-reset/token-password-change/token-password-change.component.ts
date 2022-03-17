import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-token-password-change',
  templateUrl: './token-password-change.component.html',
  styleUrls: [
    './token-password-change.component.sass',
    '../password-reset.component.sass',
  ],
})
export class TokenPasswordChangeComponent implements OnInit {
  public tokenPasswordResetForm: FormGroup;
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
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    const routeId = this.route.snapshot.paramMap.get('id');
    this.tokenPasswordResetForm = this.formBuilder.group({
      reset_id: [routeId, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirm_password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {}

  public changePassword() {
    this.isProcessing$.next(true);

    const firstPassword = this.tokenPasswordResetForm.get('password')?.value;
    const secondPassword =
      this.tokenPasswordResetForm.get('confirm_password')?.value;

    if (firstPassword === secondPassword) {
      const data = {
        password: firstPassword,
      };

      this.apiService
        .post<any>(
          '/cans-backend-rws/Resources/Assessor/password-resets/' +
            this.tokenPasswordResetForm.get('reset_id')?.value,
          data
        )
        .subscribe(
          (response) => {
            this.isProcessing$.next(false);
            this.successMessage$.next(response.message);
            this.errorMessage$.next(null);
            // Clear form after using
            this.tokenPasswordResetForm.reset();
          },
          (err: HttpErrorResponse) => {
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
