import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Assessment } from '../../models/assessment';
import { DatePipe } from '@angular/common';
import { CareTakerAssessmentResponse } from './CareTakerResponseInterface';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.sass'],
})
export class AssessmentComponent implements OnInit {
  styleOBJ = {
    'background-image':
      'linear-gradient(to bottom, white, rgba(245, 141, 34, 0.5))',
  };
  styleBTM = {
    'background-image':
      'linear-gradient(to bottom, white, rgba(34, 190, 245, 0.52))',
  };
  private assessmentId: any = 0;
  public kidId: number = 0;
  public kidName: string = '';
  public kidAge: string = '';

  public selectedAssessment!: Assessment;
  public currentLOC!: number;
  public assessmentReason: string = '';
  public responseArray: any[] = [];
  public assDate?: any;
  public approvedDate?: any;
  public kidsOtherAsses: any[] = [];
  public redoAssessmentId: any = 0;
  public assessmentStatus: any = '';

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
    console.log(params);
    this.assessmentId = +params['id'];
    this.kidId = +params['kidId'];
    this.kidName = params['kidName'];
    this.kidAge = params['kidAge'];
    this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/assessment/${this.assessmentId}`,
        {}
      )
      .subscribe((response) => {
        this.assessmentStatus = response.status;
        this.selectedAssessment = response;
        this.currentLOC = response.loc;
        this.assessmentReason = response.reason;
        this.responseArray = response.response;
        this.assDate = this.datepipe.transform(
          new Date(response.assessmentDate),
          'dd MMMM yyyy'
        );
        try {
          this.approvedDate = this.datepipe.transform(
            new Date(response.approvedDate),
            'dd MMMM yyyy'
          );
        } catch (error) {
          this.approvedDate = null;
        }
      });
    this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/caretakerAssessments/${this.assessmentId}`,
        {}
      )
      .subscribe((response) => {
        this.allCareTakerAssessments = response;
        // console.log(this.allCareTakerAssessments[0]);
      });
  }

  getOtherAssessments(): void {
    this.apiService
      .authenticatedGet<any[]>(
        `/cans-backend-rws/Resources/Assessment/assessmentsId/${this.kidId}`,
        {}
      )
      .subscribe((response) => {
        this.kidsOtherAsses = response;
      });
    let currAssIdIndex = -1;
    this.kidsOtherAsses.forEach((x) =>
      x.assessmentId == this.assessmentId
        ? (currAssIdIndex = this.kidsOtherAsses.indexOf(x))
        : null
    );
    currAssIdIndex > -1 ? this.kidsOtherAsses.splice(currAssIdIndex, 1) : null;
  }

  backButtonClick() {
    this.router.navigate(['']);
  }

  redoAssessment() {
    console.log('kid age');
    console.log(this.kidAge);
    this.apiService
      .authenticatedPost<any>(
        `/cans-backend-rws/Resources/Assessment/assessment/redoAssessment`,
        { assessment_id: this.assessmentId }
      )
      .subscribe((response) => {
        this.redoAssessmentId = response.assessmentId;
        this.router.navigate([
          'start-assessment',
          this.kidId,
          this.kidName,
          this.kidAge,
          this.redoAssessmentId,
        ]);
      });
  }
}
