import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service'
import { BehaviorSubject } from 'rxjs';
import { Assessor } from 'src/app/models/assessor';
import { Organisation } from 'src/app/models/organisation';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-update-profile-form',
  templateUrl: './update-profile-form.component.html',
  styleUrls: ['./update-profile-form.component.sass'],
})
export class UpdateProfileFormComponent implements OnInit {
  public isProcessing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public successMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  public updateProfileForm: FormGroup;
  public genders: any[] = [
    {
      label: 'Male',
      value: 'Male',
    },
    {
      label: 'Female',
      value: 'Female',
    },
    {
      label: 'Others',
      value: 'Others',
    },
    {
      label: 'Unspecified',
      value: 'Unspecified',
    },
  ];
  public currAss: any = {};

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
  ) {
    this.updateProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      // dob: ['', Validators.required],
      // gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.currAss = (this.storageService.retrieveJsonData('currentAssessor'))
    this.getProfile();
  }

  getProfile() {
    this.updateProfileForm.setValue({
      name: this.currAss.assessor.name
    });
    this.apiService
      .authenticatedGet<Assessor>(
        '/cans-backend-rws/Resources/Assessor/get-detail',
        {}
      )
      .subscribe(
        (response) => {
          this.updateProfileForm.setValue({
            name: response.name,
          });
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.errorMessage$.next(errorMessageInJson.error);
          } else {
            this.errorMessage$.next(err.message);
          }
        }
      );
  }

  updateProfile() {
    this.isProcessing$.next(true);
    const data = {
      name: this.updateProfileForm.get('name')?.value,
    };
    this.apiService
      .authenticatedPost<any>(
        '/cans-backend-rws/Resources/Assessor/detail-change',
        data
      )
      .subscribe(
        (response) => {
          console.log(response)
          this.currAss.assessor.name = this.updateProfileForm.get('name')?.value;
          this.storageService.storeJsonData('currentAssessor', this.currAss)
          console.log(this.storageService.retrieveJsonData('currentAssessor'))
          this.isProcessing$.next(false);
          this.successMessage$.next(response.message);
          this.errorMessage$.next(null);
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
  }
}
