/*
Main-Dashboard is essentially the home page, unique to each assessor
*/
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Assessor } from 'src/app/models/assessor';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { Client } from 'src/app/models/client';
import * as FileSaver from 'file-saver';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CertificationService } from '../certification/certification.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.sass'],
})
export class MainDashboardComponent implements OnInit {
  rejectedRowStyle = {
    'background-image':
      'linear-gradient(to bottom, white, rgba(247, 58, 37, 0.3));',
  };
  assignedRowStyle = {
    'background-image':
      'linear-gradient(to bottom, white, rgba(247, 181, 37, 0.3));',
  };
  public currentAssessor$: BehaviorSubject<Assessor> =
    new BehaviorSubject<Assessor>({} as any);

  public assessorDetails$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  private currAssessorId: number = -1;

  public currAssessorName$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  public currAssessorClients$: BehaviorSubject<Client[]> = new BehaviorSubject<
    Client[]
  >(new Array());

  public selectedClientAssessments$: BehaviorSubject<any[]> =
    new BehaviorSubject<any[]>(new Array());

  public selectedClientId: number = 0;

  public selectedClientName: string = '';

  public selectedClientAge: number = 0;

  public selectedAssessment$?: any;

  public selectedAssessmentType?: string;
  public assessmentTypeDropDown: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >(new Array());

  public validCert$ = new Subject<any>();

  // private exportColumns: any[] = [];
  constructor(
    public datepipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private storageService: StorageService,
    private certService: CertificationService
  ) {}

  ngOnInit(): void {
    this.checkCertValidity();
    this.currentAssessor$.next(
      this.storageService.retrieveJsonData('currentAssessor').assessor
    );
    this.currAssessorId = this.currentAssessor$.value.assessorId;
    this.currAssessorName$.next(this.currentAssessor$.value.name);
    this.getCurrentAssessorClients();
    this.getAssessmentReasons();
  }

  checkCertValidity(): void {
    // let today = new Date();

    // try {
    //   this.certService.mostRecentCert$.subscribe((currAssMostRecentCert: any) => {
    //     console.log(currAssMostRecentCert)
    //     this.validCert =
    //     new Date(currAssMostRecentCert.expiryDate).getTime() >= today.getTime();
    //   })

    // } catch (error) {

    // }

    this.apiService
      .authenticatedGet<any>(
        '/cans-backend-rws/Resources/AssessorVisualisation/expiredCaseworkerTable',
        {}
      )
      .subscribe((response) => {
        console.log(response);
        const labels: string[] = response.labels;
        this.validCert$.next({ isValid: true });
        labels.forEach((x) => {
          if (x == this.currAssessorName$.value) {
            this.validCert$.next({ isValid: false });
          }
        });
      });
  }

  createNewAssessment(): void {
    if (this.selectedAssessmentType) {
      this.apiService
        .authenticatedPost<any>(
          `/cans-backend-rws/Resources/Assessment/assessment`,
          {
            client_id: String(this.selectedClientId),
            assessor_id: String(this.currAssessorId),
            assessment_reason: this.selectedAssessmentType,
          }
        )
        .subscribe(
          (response: any) => {
            this.router.navigate([
              'start-assessment',
              this.selectedClientId,
              this.selectedClientName,
              this.selectedClientAge,
              response.assessmentUniqueId,
            ]);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  selectAssessmentRow(): void {
    console.log('select called');
    if (this.selectedAssessment$.status == 'ASSIGNED') {
      var assIdPathParam = this.selectedAssessment$.assessmentUniqueId;
      this.router.navigate([
        'start-assessment',
        this.selectedClientId,
        this.selectedClientName,
        this.selectedClientAge,
        assIdPathParam,
      ]);
    } else {
      this.router.navigate([
        'assessment',
        this.selectedAssessment$.assessmentUniqueId,
        this.selectedClientId,
        this.selectedClientName,
        this.selectedClientAge,
      ]);
    }
  }

  getSelectRowClientAssessments(
    clientId: number,
    clientName: string,
    clientAge: number
  ): void {
    this.apiService
      .authenticatedGet<any[]>(
        `/cans-backend-rws/Resources/Assessment/assessmentsId/${clientId}`,
        {}
      )
      .subscribe((response) => {
        this.selectedClientId = clientId;
        this.selectedClientName = clientName;
        this.selectedClientAge = clientAge;
        this.selectedClientAssessments$.next(response);
        response.forEach((x) => {
          x.assessmentDateDisplay = this.datepipe.transform(
            new Date(x.assessmentDate),
            'dd MMMM yyyy'
          );
        });
      });
  }

  getCurrentAssessorClients(): void {
    console.log(this.currentAssessor$);
    this.apiService
      .authenticatedGet<Client[]>(
        `/cans-backend-rws/Resources/Assessor/clients/${this.currAssessorId}`,
        {}
      )
      .subscribe((response) => {
        response.forEach((x) => {
          x.birthday = this.datepipe.transform(new Date(x.dob), 'dd MMMM yyyy');
        });
        this.currAssessorClients$.next(response);
      });
  }

  getProfile() {
    this.apiService
      .authenticatedGet<Assessor>(
        `/cans-backend-rws/Resources/AssessorManagement-AssessorSystem/Assessors/clients/${this.currAssessorId}`,
        {}
      )
      .subscribe(
        (response) => {
          console.log(response);
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
  } //get profile should retrieve all the clients associated with the assessor and all the assessments that the assessor has done, in the form of a list of IDs.

  getAssessmentReasons(): void {
    this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/assessment-types`,
        {}
      )
      .subscribe((response) => {
        let tempList: any[] = [];
        response.assessmentsReasons.forEach((reason: any) =>
          tempList.push({
            name: reason.split('_').join(' '),
            value: reason,
          })
        );
        this.assessmentTypeDropDown.next(tempList);
        // console.log(this.assessmentTypeDropDown.value);
      });
  }
}
