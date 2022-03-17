import { Component, OnInit, ViewChild } from '@angular/core';
import { CaretakerFormResponse } from './caretaker-form-response';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateCaretakerAssessmentService } from '../create-caretaker-assessment.service';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Caretaker } from 'src/app/models/caretaker';
import { CaretakerAssessmentFormService } from './caretaker-assessment-form.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-caretaker-assessment-form',
  templateUrl: './caretaker-assessment-form.component.html',
  styleUrls: ['./caretaker-assessment-form.component.sass'],
  providers: [MessageService]
})

export class CaretakerAssessmentFormComponent implements OnInit {
  currDomainName!: string;
  domainQnList?: any[];
  currAssId: number = -1;
  subscription!: Subscription;
  activeIndex: number = 0;
  currentClientName: any;
  currentClientAge: any;
  currentAssessmentUniqueId: any;
  currentCaretakerName: any;
  routeParamSub?: Subscription;

  public currentCaretakerId: number = 0;
  // public unansweredCaretakerQns?: any;
  public selectedCaretaker?: Caretaker;
  public selectedCaretakerId: number = 0;
  public selectedCaretakerType$: any;
  public selectedCaretakerName: string = '';
  public currentClientId?: number;
  public caretakerDropDown: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    new Array()
  );

  submitButtonStyle = {
    background: 'green',
  };

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

  prevButtonStyle = {
    background: 'rgba(255, 165, 70, 1)',
  };

  nextButtonStyle = {
    background: 'rgba(177, 255, 173, 0.8)',
  };

  naBgStyle = {
    background: 'rgba(206, 206, 206, 1)',
  }

  public selectedResponseNumeral: number = -2; //by default is -2

  public logResponses: CaretakerFormResponse[] =
    new Array<CaretakerFormResponse>();

  constructor(
    public caretakerAssessmentFormService: CaretakerAssessmentFormService,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
    this.routeParamSub = this.route.params.subscribe((params) => {
      this.loadCaretakerQuestions();
    });
  }

  loadCaretakerQuestions() {
    let params = this.route.snapshot.params;
    let parentParams = this.route.parent!.snapshot.params;
    this.currAssId = parentParams['caretakerAssId'];
    this.currDomainName = params['domainName'];
    this.currentClientId = parentParams['currentClientId'];
    this.currentClientName = parentParams['currentClientName'];
    this.currentClientAge = parentParams['currentClientAge'];
    this.currentCaretakerName = parentParams['currentCaretakerName'];
    this.currentAssessmentUniqueId = parentParams['currentAssessmentUniqueId'];
    this.currentCaretakerId = parentParams['caretakerId'];
    this.caretakerAssessmentFormService.getSpecificDomainQns(this.currDomainName);
    this.caretakerAssessmentFormService.onAssessmentFormLoadGetPrevPersistedResponseValues(this.currAssId);
    // try {
    //   this.unansweredCaretakerQns = this.storageService.retrieveJsonData('unfilledCaretakerQns').find((ctCheckRes: any) => ctCheckRes.caregiverId == this.currentCaretakerId)
    // } catch (error) {
      
    // }
  }

  ngOnDestroy() {
    // console.log('destroyed');
    this.routeParamSub?.unsubscribe();
  }

  getRatingsDefArray(ratDefObj: any) {
    return Object.values(ratDefObj)
  }

  previousButtonClick() {
    this.caretakerAssessmentFormService.submitResponses(this.currAssId);
    let currStepIndex = (CreateCaretakerAssessmentService.currDomainSteps.findIndex((x) => x.label === this.currDomainName))
    if (currStepIndex > 0) {
      let goToPrev = (CreateCaretakerAssessmentService.currDomainSteps[currStepIndex - 1].routerLink);
      this.router.navigate(goToPrev, { relativeTo: this.route.parent });
    }
  }

  saveButtonClick() {
    this.caretakerAssessmentFormService.submitResponses(this.currAssId);
  }

  saveAndNextButtonClick() {
    this.caretakerAssessmentFormService.submitResponses(this.currAssId);
    let currStepIndex = (CreateCaretakerAssessmentService.currDomainSteps.findIndex((x) => x.label === this.currDomainName));
    let goToNext = (CreateCaretakerAssessmentService.currDomainSteps[currStepIndex + 1].routerLink);
    this.router.navigate(goToNext, { relativeTo: this.route.parent });
    this.showBottomCenter();
  }

  submitButtonClick() {
    this.caretakerAssessmentFormService.submitResponses(this.currAssId);
    this.router.navigate([
      'start-assessment',
      this.currentClientId,
      this.currentClientName,
      this.currentClientAge,
      this.currentAssessmentUniqueId,
    ]);
  }

  // backtoClientAssessment() {
  //   this.caretakerAssessmentFormService.submitResponses(this.currentAssessmentUniqueId);
  //   this.router.navigate([
  //     'start-assessment',
  //     this.currentClientId,
  //     this.currentClientName,
  //     this.currentClientAge,
  //     this.currentAssessmentUniqueId,
  //   ]);
  // }

  createNewCaretakerAssessment(): void {
    if (this.selectedCaretaker) {
      this.selectedCaretakerId = this.selectedCaretaker.caretakerId;
      this.selectedCaretakerName = this.selectedCaretaker.name;
      this.apiService
        .authenticatedPost<any>(
          `/cans-backend-rws/Resources/Assessment/caretakerAssessment`,
          {
            caretaker_id: String(this.selectedCaretaker.caretakerId),
            assessment_id: String(this.currAssId),
            caretaker_type: this.selectedCaretaker.accommodationType,
          }
        )
        .subscribe(
          (response: any) => {
            this.router.navigate([
              'start-caretaker-assessment',
              this.selectedCaretakerId,
              this.selectedCaretakerName,
              response.assessmentUniqueId,
            ]);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  showBottomCenter() {
    this.messageService.add({
      key: 'bc', life: 1000, severity: 'info', summary: 'Responses Saved', detail: `Caretaker Assessment ID: ${this.currAssId} ${this.datePipe.transform(
        new Date(),
        'dd MMMM yyyy h:mm:ss a'
      )}`
    });
  }
  onReject() {
    this.messageService.clear('c');
  }
  onConfirm() {
    this.messageService.clear('c');
  }

  getCaretakers(): void {
    //console.log(this.currentClientId);
    this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/caretakers/${this.currentClientId}`,
        {}
      )
      .subscribe((response) => {
        let tempList: any[] = [];
        response.forEach((caretaker: any) =>
          tempList.push({
            name: caretaker.name,
            value: caretaker,
          })
        );
        this.caretakerDropDown.next(tempList);
        // console.log(this.assessmentTypeDropDown.value);
      });
  }
}
