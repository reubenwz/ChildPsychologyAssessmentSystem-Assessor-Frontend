import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Assessor } from 'src/app/models/assessor';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import * as FileSaver from 'file-saver';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AssessmentStripped } from 'src/app/models/assessment-stripped';
import { Assessment } from 'src/app/models/assessment';
import { AssessorEmailsService } from 'src/app/services/assessor-emails.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css'],
})
export class ValidationComponent implements OnInit {
  public currentAssessor$: BehaviorSubject<Assessor> =
    new BehaviorSubject<Assessor>({} as any);

  public assessorDetails$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  private currAssessorId$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  public currAssessorName$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  public currAssessorSupervisees$: BehaviorSubject<Assessor[]> =
    new BehaviorSubject<Assessor[]>(new Array());

  public selectedSuperviseeAssessments$: BehaviorSubject<Assessment[]> =
    new BehaviorSubject<Assessment[]>(new Array());

  public selectedSuperviseeId: number = 0;

  public selectedSuperviseeName: string = '';

  public selectedAssessment$?: any;

  public selectedAssessmentType?: string;
  public assessmentTypeDropDown: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >(new Array());

  public currAssessorSuperviseesSubmittedStrippedAssessments: AssessmentStripped[] =
    [];

  public currAssessorSuperviseesApprovedStrippedAssessments: AssessmentStripped[] =
    [];

  public currAssessorSuperviseesRejectedStrippedAssessments: AssessmentStripped[] =
    [];
  public currAssessorSuperviseesAssignedStrippedAssessments: AssessmentStripped[] =
    [];

  public currAssessorSuperviseesSubmittedStrippedAssessments$: BehaviorSubject<
    AssessmentStripped[]
  > = new BehaviorSubject<AssessmentStripped[]>(new Array());

  public noSupervisee: boolean = false;

  constructor(
    public datepipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.currentAssessor$.next(
      this.storageService.retrieveJsonData('currentAssessor')
    );
    this.currAssessorId$.next(this.currentAssessor$.value.assessorId);
    this.currAssessorName$.next(this.currentAssessor$.value.name);
    this.getCurrentAssessorSupervisees();
    this.getCurrAssessorSuperviseesSubmittedStrippedAssessments();
  }

  getSelectRowSuperviseeAssessments(
    assessmentId: string,
    assessorName: string,
    clientName: string,
    reason: string
  ): void {
    this.router.navigate([
      'approve-assessment',
      assessmentId,
      assessorName,
      clientName,
      reason,
    ]);
  }

  getCurrAssessorSuperviseesSubmittedStrippedAssessments(): void {
    this.apiService
      .authenticatedGet<AssessmentStripped[]>(
        `/cans-backend-rws/Resources/assessmentValidation/assessments/allSubmitted`,
        {}
      )
      .subscribe((response) => {
        this.currAssessorSuperviseesSubmittedStrippedAssessments$.next(
          response
        );
      });
  }

  getCurrentAssessorSupervisees(): void {
    console.log(this.currAssessorId$.value);
    this.apiService
      .authenticatedGet<Assessor[]>(
        '/cans-backend-rws/Resources/assessmentValidation/supervisees',
        {}
      )
      .subscribe(
        (response) => {
          this.currAssessorSupervisees$.next(response);
          response.forEach((assessor) => {
            this.apiService
              .authenticatedGet<AssessmentStripped[]>(
                `/cans-backend-rws/Resources/assessmentValidation/assessments/submitted/${assessor.assessorId}`,
                {}
              )
              .subscribe((response) => {
                response.forEach((x) => {
                  this.currAssessorSuperviseesSubmittedStrippedAssessments.push(
                    x
                  );
                });
              });
            this.apiService
              .authenticatedGet<AssessmentStripped[]>(
                `/cans-backend-rws/Resources/assessmentValidation/assessments/approved/${assessor.assessorId}`,
                {}
              )
              .subscribe((response) => {
                response.forEach((x) => {
                  this.currAssessorSuperviseesApprovedStrippedAssessments.push(
                    x
                  );
                });
              });
            this.apiService
              .authenticatedGet<AssessmentStripped[]>(
                `/cans-backend-rws/Resources/assessmentValidation/assessments/rejected/${assessor.assessorId}`,
                {}
              )
              .subscribe((response) => {
                response.forEach((x) => {
                  this.currAssessorSuperviseesRejectedStrippedAssessments.push(
                    x
                  );
                });
              });
            this.apiService
              .authenticatedGet<AssessmentStripped[]>(
                `/cans-backend-rws/Resources/assessmentValidation/assessments/assigned/${assessor.assessorId}`,
                {}
              )
              .subscribe((response) => {
                response.forEach((x) => {
                  this.currAssessorSuperviseesAssignedStrippedAssessments.push(
                    x
                  );
                });
              });
          });
        },
        (err) => (this.noSupervisee = true)
      );
  }

  getProfileOfSupervisee(superviseeId: number) {
    this.apiService
      .authenticatedGet<Assessor>(
        `/cans-backend-rws/Resources/AssessorManagement-AdminSystem/assessors/${superviseeId}`,
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
  selectAssessmentRow(): void {
    //approved // submitted
    this.router.navigate([
      'approve-assessment',
      this.selectedAssessment$.assessmentUniqueId,
    ]);
  }
}
