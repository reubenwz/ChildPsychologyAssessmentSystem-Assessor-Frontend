import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Assessment } from '../../models/assessment';
import { DatePipe } from '@angular/common';
import { CareTakerAssessmentResponse } from './CareTakerResponseInterface';
import { AssessmentStatusEnum } from 'src/app/models/assessment-status-enum';
@Component({
  selector: 'app-approve-assessment',
  templateUrl: './approve-assessment.component.html',
  styleUrls: ['./approve-assessment.component.sass'],
})
export class ApproveAssessmentComponent implements OnInit {
  styleOBJ = {
    'background-image':
      'linear-gradient(to bottom, white, rgba(245, 141, 34, 0.5))',
  };
  styleBTM = {
    'background-image':
      'linear-gradient(to bottom, white, rgba(34, 190, 245, 0.52))',
  };
  public assessmentId: string = '';
  public assessorName: string = '';
  public clientName: string = '';
  public reason: string = '';

  public selectedAssessment!: Assessment;
  public selectedAssessmentStatusEnum!: AssessmentStatusEnum;
  public currentLOC!: number;
  public assessmentReason: string = '';
  public responseArray: any[] = [];
  public assDate?: any;
  public approvedDate?: any;
  public kidsOtherAsses: any[] = [];

  // public caretakerResponseArray: CareTakerAssessmentResponse[] = [];
  public allCareTakerAssessments: Array<CareTakerAssessmentResponse> = [];
  public cols: any[] = [
    { field: 'qc', header: 'Qn. Code' },
    { field: 'qt', header: 'Question Title' },
    { field: 'rv', header: 'Response Value' },
  ];

  constructor(
    private datepipe: DatePipe,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let params = this.route.snapshot.params;
    this.assessmentId = params['id'];
    this.assessorName = params['assessorName'];
    this.clientName = params['clientName'];
    this.reason = params['reason'];

    this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/assessment/${this.assessmentId}`,
        {}
      )
      .subscribe((response) => {
        this.selectedAssessment = response;
        this.selectedAssessmentStatusEnum = response.status;
        this.currentLOC = response.loc;
        this.assessmentReason = response.reason;
        this.responseArray = response.response;
        this.assDate = this.datepipe.transform(
          new Date(response.assessmentDate),
          'dd MMMM yyyy'
        );
        this.approvedDate = this.datepipe.transform(
          new Date(response.approvedDate),
          'dd MMMM yyyy'
        );
      });
    this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/caretakerAssessments/${this.assessmentId}`,
        {}
      )
      .subscribe((response) => {
        this.allCareTakerAssessments = response;
        //console.log(this.allCareTakerAssessments[0]);
      });
  }

  approveAssessment(): void {
    this.apiService
      .authenticatedPost<any>(
        `/cans-backend-rws/Resources/assessmentValidation/assessment/approveAssessment`,
        {
          assessment_id: this.assessmentId,
        }
      )
      .subscribe((response) => {
        this.router.navigate(['dashboard/validation']);
      });
  }
  rejectAssessment(): void {
    this.apiService
      .authenticatedPost<any>(
        `/cans-backend-rws/Resources/assessmentValidation/assessment/rejectAssessment`,
        {
          assessment_id: this.assessmentId,
        }
      )
      .subscribe((response) => {
        this.router.navigate(['dashboard/validation']);
      });
  }
}
