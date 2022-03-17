import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { SubAssessmentModule } from './SubAssessmentMod';
import { CreateAssessmentService } from '../create-assessment.service';
import { CaretakerAssessmentFormComponent } from '../../create-caretaker-assessment/caretaker-assessment-form/caretaker-assessment-form.component';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AssessmentFormService {
  public allQnsSub?: Subscription;
  public ageGroupQuestionsForKidForm$: BehaviorSubject<any[]> =
    new BehaviorSubject<any[]>([]); // all the questions

  public questionDomainMenu$: BehaviorSubject<MenuItem[]> = new BehaviorSubject<
    MenuItem[]
  >([]);

  public ageGrpListQns: any[] = [];

  questionsForIndivDomain$: Observable<any>;
  private questionsToDisplaySubject = new Subject<any>();

  previousValues$: Observable<any>;
  private previousValuesSubject = new Subject<any>();

  private numData: { [param: string]: number } = {};
  private stringData: { [param: string]: string } = {};

  public responseNumberObjInitial$: BehaviorSubject<{
    [param: string]: number;
  }> = new BehaviorSubject<{ [param: string]: number }>(this.numData);
  public responseNotesObjInitial$: BehaviorSubject<{
    [param: string]: string;
  }> = new BehaviorSubject<{ [param: string]: string }>(this.stringData);

  public responseNumberObj$: BehaviorSubject<{ [param: string]: number }> =
    new BehaviorSubject<{ [param: string]: number }>(this.numData);
  public responseNotesObj$: BehaviorSubject<{ [param: string]: string }> =
    new BehaviorSubject<{ [param: string]: string }>(this.stringData);

  public isCurrentPageModule: Boolean = false;
  public isCurrentPageLastPage: Boolean = true;
  public isCurrentPageFirstPage: Boolean = true;

  public subModules: { [param: string]: SubAssessmentModule } = {};
  public subModuleSubject: Subject<{ [param: string]: SubAssessmentModule }> =
    new Subject<{ [param: string]: SubAssessmentModule }>();

  public unansweredQuestions: Subject<Array<string>> = new Subject<Array<string>>();
  public unansweredCaretakerAssessments$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private apiService: ApiService, private storageService: StorageService) {
    this.questionsForIndivDomain$ =
      this.questionsToDisplaySubject.asObservable();
    this.previousValues$ = this.previousValuesSubject.asObservable();
    console.log(this.responseNumberObj$.value)
  }

  checkClientAssessmentValid(assId: number): void { //check if the client's submission is valid
    this.checkCaretakerAssesValid(assId);
    var checkingSub = this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/assessment/submitAssessment/checkAssessmentResponses/${assId}`
      )
      .subscribe(
        ((unfilledQuestions: any) => {
          console.log(unfilledQuestions)
          this.unansweredQuestions.next(unfilledQuestions);
        })
        ,
        (errorResponse) => {
          console.error(errorResponse.error)
          // this.unansweredQuestions.next(errorResponse.error);
        }
      ); // end outer sub
  }

  checkCaretakerAssesValid(assId: number) { //TODO
    this.apiService
      .authenticatedGet<any>(`/cans-backend-rws/Resources/Assessment/assessment/submitAssessment/checkCaretakerAssessmentResponses/${assId}`)
      .subscribe((gotUnAnsweredCaretakerResponse) => {
        console.log(gotUnAnsweredCaretakerResponse)
        this.unansweredCaretakerAssessments$.next(gotUnAnsweredCaretakerResponse);
        this.storageService.storeJsonData('unfilledCaretakerQns', gotUnAnsweredCaretakerResponse)
      },
        (errorResponse) => {
          console.log(errorResponse)
        }
      ) // end subscribe 

  }

  onAssessmentFormLoadGetPrevPersistedResponseValues(assessmentId: number) {
    console.log('loading prev response for assID ' + assessmentId)
    this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/assessment/${assessmentId}`,
        {}
      )
      .subscribe(
        (prevValuesResponse: any) => {
          if (prevValuesResponse.response.length === 0) {
          } else {
            // console.log(prevValuesResponse)
            prevValuesResponse.response.forEach((qnObj: any) => {
              let formResponse = {
                questionCode: qnObj.question.questionCode,
                responseValue: qnObj.responseValue,
                responseNotes: qnObj.responseNotes,
              };

              if (
                Object.keys(this.responseNumberObjInitial$.value).indexOf(
                  formResponse.questionCode as string
                ) >= 0 &&
                formResponse.responseValue > -2
              ) {
                this.numData[formResponse.questionCode] =
                  formResponse.responseValue;
                this.stringData[formResponse.questionCode] =
                  formResponse.responseNotes;
              } else {
                this.numData[formResponse.questionCode] = -2;
                this.stringData[formResponse.questionCode] = '';
              }
              this.responseNumberObj$.next(this.numData);
              this.responseNotesObj$.next(this.stringData);
            });
          }
        },
        (err) => console.log(err)
      );
  }

  submitResponses(assessmentId: number): void {
    console.log(assessmentId)
    // console.log('submittingResponses for assID ' + assessmentId)
    var dataToBackend = {
      assessment_id: String(assessmentId),
      question_codes: new Array<string>(),
      response_values: new Array<number>(),
      response_notes: new Array<string>(),
    };

    const answeredEntries = Object.entries(
      this.responseNumberObj$.value
    ).filter((x) => x[1] > -2);
    // console.log(answeredEntries)
    const answeredNotesEntries = Object.entries(
      this.responseNotesObj$.value
    ).filter((x) => x.length > 0);

    for (const property in answeredEntries) {
      dataToBackend.question_codes.push(answeredEntries[property][0]);
      dataToBackend.response_values.push(answeredEntries[property][1]);
      for (const noteIndex in answeredNotesEntries) {
        if (
          answeredNotesEntries[noteIndex][0] === answeredEntries[property][0]
        ) {
          // same qnCode
          dataToBackend.response_notes.push(answeredNotesEntries[noteIndex][1]);
        }
      }
    }
    console.log(dataToBackend)

    if (dataToBackend.response_values.findIndex((x: number) => x > -2) >= 0) {
      this.apiService
        .authenticatedPost<any>(
          `/cans-backend-rws/Resources/Assessment/assessment/responses`,
          JSON.parse(JSON.stringify(dataToBackend))
        )
        .subscribe(
          (postFormResponse) => {
            // console.log(postFormResponse)
          },
          (err) => {
            console.log(err.error);
          }
        );
    }
  }

  submitEntireAssessment(assessmentId: number) {
    console.log('Submitting Entire Assessment Response: ' + assessmentId);
    var dataToBackEnd = {
      "assessment_id": assessmentId
    };
    console.log(dataToBackEnd)
    this.apiService
      .authenticatedPost<any>(
        `/cans-backend-rws/Resources/Assessment/assessment/submitAssessment/`,
        JSON.parse(JSON.stringify(dataToBackEnd))
      )
      .subscribe(
        (assessmentSubmitResponse) => {
          console.log(assessmentSubmitResponse);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getSpecificDomainQns(indomainName: string) {
    this.numData = {};
    this.stringData = {};
    // let allQns: any[] = this.ageGroupQuestionsForKidForm$.value;
    this.allQnsSub = CreateAssessmentService.ageGroupQuestionsForKid$.subscribe((allQns) => {
      if (allQns.length > 0) {
        for (var i = 0; i < allQns.length; i++) {
          if (allQns[i].domainName === indomainName) {
            if (i === allQns.length - 1) {
              this.isCurrentPageLastPage = true;
            } else {
              this.isCurrentPageLastPage = false;
            }
            if (i === 0) {
              this.isCurrentPageFirstPage = true;
            } else {
              this.isCurrentPageFirstPage = false;
            }
            this.isCurrentPageModule = allQns[i].module;

            var specDomainQns = allQns[i].fullListQuestions.sort(
              (a: any, b: any) =>
                +a.questionCode.split('.')[1] - +b.questionCode.split('.')[1]
            );

            specDomainQns.forEach((element: any) => {
              if (element.subModule !== undefined) {
                this.subModules[element.questionCode] = {
                  subModuleName: element.subModule.subModuleName,
                  subQuestions: element.subModule.subQues,
                };
              }
            }); //end forEach

            this.subModuleSubject.next(this.subModules);
            this.questionsToDisplaySubject.next(specDomainQns);
            console.log(specDomainQns)
            for (var j = 0; j < specDomainQns.length; j++) {
              this.numData[specDomainQns[j].questionCode] = -2;
              this.stringData[specDomainQns[j].questionCode] = '';
              if (specDomainQns[j].subModule !== undefined) {
                var luckyDomainSubQues = specDomainQns[j].subModule.subQues;
                for (var k = 0; k < luckyDomainSubQues.length; k++) {
                  this.numData[luckyDomainSubQues[k].questionCode] = -2;
                  this.stringData[luckyDomainSubQues[k].questionCode] = '';
                }
              }
            }
            break;
          } else {
            continue;
          }
        }
        this.responseNumberObjInitial$.next(this.numData);
        this.responseNotesObjInitial$.next(this.stringData);
      }
    })

  } // end method
}
