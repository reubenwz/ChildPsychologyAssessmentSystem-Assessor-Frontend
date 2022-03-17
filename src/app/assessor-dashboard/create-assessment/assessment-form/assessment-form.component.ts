import { Component, OnInit } from '@angular/core';
import { AssessmentFormService } from './assessment-form.service';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateAssessmentService } from '../create-assessment.service';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Caretaker } from 'src/app/models/caretaker';
import { CaretakerAssessment } from 'src/app/models/caretaker-assessment';
import { CaretakerAssessmentCaretaker } from 'src/app/models/caretakerAssessmentsCaretaker';
import { MenuItem, MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.sass'],
  providers: [MessageService, ConfirmationService],
})
export class AssessmentFormComponent implements OnInit {
  currDomainName!: string;
  kidAge?: number;
  currentClientName?: string;
  domainQnList?: any[];
  currAssId: number = -1;
  subscription!: Subscription;
  activeIndex: number = 0;
  completedCaretakerAssessmentId?: number[];
  uncompletedAssessmentCaretakers: any[] = [];
  uncompletedAssessmentCaretakers2: any[] = [];
  completedAssessmentCaretakers: any[] = [];
  caretakerAssessmentCaretakers: any[] = [];
  noMoreUnattempt: boolean = true;
  atLeastOneAttempt: boolean = false;
  displayModal: boolean = false;
  displaySubmitSuccessModal: boolean = false;
  minusTwoStillArr: any[] = [];
  caretakerUnansweredArray: any[] = [];
  routeParamSub?: Subscription;
  routeSub?: Subscription;
  allResFilledSub?: Subscription;
  parentRouteParamSub?: Subscription;
  initialQuestionsSub?: Subscription;
  mySubscription?: Subscription;
  unanswedCaretakerResponsesSub?: Subscription;
  progressBarValue: number = 0;
  showSpinning = false;

  public selectedCaretaker?: Caretaker;
  public selectedCaretakerId: number = 0;
  public selectedCaretakerType?: any;
  public selectedCaretakerName: string = '';
  public currentClientId?: number;
  public caretakerDropDown: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    new Array()
  );
  public caretakerTypeDropDown: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >(new Array());

  submitButtonStyle = {
    background: 'green',
  };

  prevButtonStyle = {
    background: 'rgba(255, 165, 70, 1)',
  };

  nextButtonStyle = {
    background: 'rgba(177, 255, 173, 0.8)',
  };

  naBgStyle = {
    background: 'rgba(206, 206, 206, 1)',
  }

  public currClientCaretakers$: BehaviorSubject<Caretaker[]> =
    new BehaviorSubject<Caretaker[]>(new Array());

  public currAssessmentCaretakerAssessments$: BehaviorSubject<
    CaretakerAssessment[]
  > = new BehaviorSubject<CaretakerAssessment[]>(new Array());

  public responseNumeralsForModule: any[] = [
    { label: 'N/A', value: -1, inactive: false },
    { label: '0', value: 0, inactive: false },
    { label: '1', value: 1, inactive: false },
    { label: '2', value: 2, inactive: false },
    { label: '3', value: 3, inactive: false },
  ];

  public responseNumeralsNotM: any[] = [
    { label: 'N/A', value: -1, inactive: true },
    { label: '0', value: 0, inactive: false },
    { label: '1', value: 1, inactive: false },
    { label: '2', value: 2, inactive: false },
    { label: '3', value: 3, inactive: false },
  ];

  public selectedResponseNumeral: number = -2; //by default is -2

  constructor(
    public assessmentFormService: AssessmentFormService,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
  ) {

  }

  ngOnInit(): void {
    this.routeParamSub = this.route.params.subscribe((params) => {
      this.loadQns();
    });
  }

  loadQns() {
    let childRouterParams = this.route.snapshot.params;
    let parentRouterParams = this.route.parent?.snapshot.params;
    this.currAssId = parentRouterParams?.['assId'];
    this.currentClientId = parentRouterParams?.['kidId'];
    this.currentClientName = parentRouterParams?.['kidName'];
    this.currDomainName = childRouterParams['domainName'];
    this.kidAge = childRouterParams['kidAge'];
    this.getCaretakers();
    this.getCaretakerTypes();
    this.getAssessmentCaretakerAssessment();
    this.getX();
    this.assessmentFormService.getSpecificDomainQns(this.currDomainName);
    this.assessmentFormService.onAssessmentFormLoadGetPrevPersistedResponseValues(
      this.currAssId
    );
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.assessmentFormService.responseNumberObj$.next({});
    this.assessmentFormService.responseNotesObj$.next({});
    this.routeParamSub?.unsubscribe();
    this.assessmentFormService.allQnsSub?.unsubscribe();
    this.allResFilledSub?.unsubscribe();
    this.unanswedCaretakerResponsesSub?.unsubscribe();
    this.messageService.clear();
  }

  getRatingsDefArray(ratDefObj: any) {
    return Object.values(ratDefObj)
  }

  getDomainDescription() {
    return CreateAssessmentService.domainDesc[this.currDomainName];
  }

  displaySubmitSuccessModalButtonClick() {
    this.displaySubmitSuccessModal = false;
    this.router.navigate(['']);
  }
  skipToLastDomainClick() {
    this.assessmentFormService.submitResponses(this.currAssId);
    let goToNext = (CreateAssessmentService.currDomainSteps[CreateAssessmentService.currDomainSteps.length - 1].routerLink);
    this.router.navigate(goToNext, { relativeTo: this.route.parent });
    this.showBottomCenter();
  }
  async saveButtonClick() {
    this.messageService.clear();
    this.messageService.add({
      key: 'bc', severity: 'info', life: 1000, summary: 'Responses Saved', detail: `Assessment ID: ${this.currAssId} ${this.datePipe.transform(
        new Date(),
        'dd MMMM yyyy h:mm:ss a'
      )}`,
    });
    return this.assessmentFormService.submitResponses(this.currAssId);
  }

  saveAndNextButtonClick() {
    this.assessmentFormService.submitResponses(this.currAssId);
    let currStepIndex = (CreateAssessmentService.currDomainSteps.findIndex((x) => x.label === this.currDomainName));
    let goToNext = (CreateAssessmentService.currDomainSteps[currStepIndex + 1].routerLink);
    this.router.navigate(goToNext, { relativeTo: this.route.parent });
    this.showBottomCenter();
  }

  previousButtonClick() {
    this.assessmentFormService.submitResponses(this.currAssId);
    let currStepIndex = (CreateAssessmentService.currDomainSteps.findIndex((x) => x.label === this.currDomainName))
    if (currStepIndex > 0) {
      let goToPrev = (CreateAssessmentService.currDomainSteps[currStepIndex - 1].routerLink);
      this.router.navigate(goToPrev, { relativeTo: this.route.parent });
    }
  }

  async submitButtonClick() { //TODO
    this.displayModal = true;
    this.showSpinning = true;
    this.saveButtonClick();
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.showSpinning = false;
    this.assessmentFormService.checkClientAssessmentValid(this.currAssId);
    // this.assessmentFormService. show in the same modal => maybe add another table????

    this.allResFilledSub =
      this.assessmentFormService.unansweredQuestions.subscribe(
        (unAnsweredQuestions) => {
          if (unAnsweredQuestions.length > 0) {
            this.minusTwoStillArr = unAnsweredQuestions.sort((x: string, y: string) => {
              return (+x.split('.')[0] * 10 + +x.split('.')[1]) - (+y.split('.')[0] * 10 + +y.split('.')[1])
            });
            this.displayModal = true;
          }
          this.unanswedCaretakerResponsesSub = this.assessmentFormService.unansweredCaretakerAssessments$.subscribe((unAnswerdCaretakerResponsesList) => {
            console.log(unAnswerdCaretakerResponsesList)
            if (unAnswerdCaretakerResponsesList.find((unAnsweredEle: any) => (!unAnsweredEle.isCreated || unAnsweredEle.questionCodes.length > 0 ))) {
              this.caretakerUnansweredArray = unAnswerdCaretakerResponsesList;
              this.displayModal = true;
            } else {
              this.caretakerUnansweredArray = [];
            }
            if (this.minusTwoStillArr.length === 0 && this.caretakerUnansweredArray.length === 0) { //all caretaker done
              this.displayModal = false;
              this.confirmationService.confirm({
                message:
                  'Are you sure that all responses are accurate and true to the best of your knowledge?',
                accept: () => {
                  //Actual logic to perform a confirmation
                  this.assessmentFormService.submitResponses(this.currAssId);
                  this.assessmentFormService.submitEntireAssessment(
                    this.currAssId
                  );
                  this.messageService.clear();
                  // this.messageService.add({ severity: 'success', summary: 'Assessment Submitted', detail: `Please await for your submission's review.` });
                  this.displaySubmitSuccessModal = true;
                },
              }); // end confirmation service
            } // end if
          })
        }
      ); //end allResFilledSub




  }

  onReject() {
    this.messageService.clear('c');
  }
  onConfirm() {
    this.messageService.clear('c');
  }

  showBottomCenter() {
    this.messageService.add({
      key: 'bc', life: 1000, severity: 'info', summary: 'Responses Saved', detail: `Assessment ID: ${this.currAssId} ${this.datePipe.transform(
        new Date(),
        'dd MMMM yyyy h:mm:ss a'
      )}`
    });
  }

  createNewCaretakerAssessment(caretakerId: number, caretakerName: string) {
    this.selectedCaretakerId = caretakerId;
    this.apiService
      .authenticatedPost<any>(
        `/cans-backend-rws/Resources/Assessment/caretakerAssessment`,
        {
          caretaker_id: String(this.selectedCaretakerId),
          assessment_id: String(this.currAssId),
          caretaker_type: this.selectedCaretakerType[caretakerId],
        }
      )
      .subscribe(
        (response: any) => {
          this.router.navigate([
            'start-caretaker-assessment',
            this.currentClientId,
            this.selectedCaretakerId,
            response.caretakerAssessmentId,
            this.currentClientName,
            this.kidAge,
            this.currAssId,
            caretakerName,
          ]);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  resumeCaretakerAssessment(
    caretakerAssessmentId: number,
    caretakerType: string,
    caretakerName: string,
    caretakerId: number
  ) {
    console.log(caretakerId)
    this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/caretakerAssessment/${caretakerAssessmentId}`,
        {}
      )
      .subscribe(
        (response: any) => {
          this.router.navigate([
            'start-caretaker-assessment',
            this.currentClientId,
            caretakerId,
            caretakerAssessmentId,
            this.currentClientName,
            this.kidAge,
            this.currAssId,
            caretakerName,
          ]);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getAssessmentCaretakerAssessment(): void {
    this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/assessment/${this.currAssId}`,
        {}
      )
      .subscribe((response) => {
        this.currAssessmentCaretakerAssessments$.next(
          response.caretakerAssessments
        );
        if (response.caretakerAssessments.length > 0) {
          this.atLeastOneAttempt = true;
        }
        response.caretakerAssessments.forEach(
          (element: CaretakerAssessment) => {
            this.apiService
              .authenticatedGet<any>(
                `/cans-backend-rws/Resources/Assessment/caretakerAssessment/${element.caretakerAssessmentId}`
              )
              .subscribe((response) => {
                let x: CaretakerAssessmentCaretaker = {
                  caretaker: response.caretaker,
                  caretakerAssessment: element,
                };

                let isInArr: boolean = false;
                this.completedCaretakerAssessmentId?.push(
                  element.caretakerAssessmentId
                );
                for (
                  let i = 0;
                  i < this.caretakerAssessmentCaretakers.length;
                  i++
                ) {
                  if (
                    this.caretakerAssessmentCaretakers[i].caretakerAssessment
                      .caretakerAssessmentId == element.caretakerAssessmentId
                  ) {
                    isInArr = true;
                  }
                }
                if (!isInArr) {
                  this.caretakerAssessmentCaretakers.push(x);
                  this.completedAssessmentCaretakers.push(response.caretaker);
                }
              });
          }
        );
      });
  }

  getCaretakers(): void {
    // setTimeout(() => {
    this.selectedCaretakerType = {}
    this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/caretakers/${this.currentClientId}`,
        {}
      )
      .subscribe((response) => {
        let tempList: any[] = [];
        if (this.uncompletedAssessmentCaretakers.length != 0) {
          this.uncompletedAssessmentCaretakers = [];
        }
        response.forEach((caretaker: any) => {
          this.uncompletedAssessmentCaretakers.push(caretaker);
          this.selectedCaretakerType[caretaker.caretakerId] = "";
        }
        );
        this.caretakerDropDown.next(tempList);
        this.currClientCaretakers$.next(response);
      });
    // }, 1000);
  }

  getX() {
    setTimeout(() => {
      if (this.uncompletedAssessmentCaretakers2.length != 0) {
        this.uncompletedAssessmentCaretakers2 = [];
      }
      for (let i = 0; i < this.uncompletedAssessmentCaretakers.length; i++) {
        let caretakerId1 = this.uncompletedAssessmentCaretakers[i].caretakerId;
        let isInArr: boolean = false;
        for (let j = 0; j < this.completedAssessmentCaretakers.length; j++) {
          let caretakerId2 = this.completedAssessmentCaretakers[j].caretakerId;
          if (caretakerId1 == caretakerId2) {
            isInArr = true;
          }
        }
        if (!isInArr) {
          this.uncompletedAssessmentCaretakers2.push(
            this.uncompletedAssessmentCaretakers[i]
          );
        }
      }
      if (this.uncompletedAssessmentCaretakers2.length > 0) {
        this.noMoreUnattempt = false;
      } else {
        this.noMoreUnattempt = true;
      }
    }, 1500);
  }

  getCaretakerFromCaretakerAssessmentId(caretakerAssessmentId: number) {
    this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/caretakerAssessment/${caretakerAssessmentId}`,
        {}
      )
      .subscribe((response) => {
        this.selectedCaretaker = response.caretaker;
      });
  }
  getCaretakerTypes(): void {
    //console.log(this.currentClientId);
    this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/caretaker-types`,
        {}
      )
      .subscribe((response) => {
        let tempList: any[] = [];
        response.caretakerTypes.forEach((caretakerType: any) =>
          tempList.push({
            name: caretakerType.split('_').join(' '),
            value: caretakerType,
          })
        );
        this.caretakerTypeDropDown.next(tempList);
        // console.log(this.assessmentTypeDropDown.value);
      });
  }
}
