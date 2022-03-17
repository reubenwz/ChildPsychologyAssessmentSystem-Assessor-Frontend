import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BehaviorSubject } from 'rxjs';
import { LoginTokenResponse } from './login-token-response';
import { StorageService } from 'src/app/services/storage.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public processing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private storageService: StorageService,
    private navBarService: NavbarService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    
  }

  public login(): void {
    this.processing$.next(true);
    this.errorMessage$.next(null);
    const data = this.loginForm.getRawValue();
    this.apiService
      .post<LoginTokenResponse>(
        '/cans-backend-rws/Resources/Assessor/login',
        data
      )
      .subscribe(
        (response) => {
          this.storageService.storeJsonData('currentAssessor', response);
          this.apiService.setToken(response.token);
          this.processing$.next(false);
          let currUser = this.storageService.retrieveJsonData('currentAssessor');
          console.log(currUser)
          currUser.role === 'assessor' ? this.router.navigate(['dashboard']) : this.router.navigate(['dashboard/charts'])
          this.navBarService.determineNavBarItems();
        },
        (err) => {
          this.processing$.next(false);
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.errorMessage$.next(errorMessageInJson.error);
          } else {
            this.errorMessage$.next(err.message);
          }
        }
      );
  }
}
