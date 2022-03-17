import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Assessor } from 'src/app/models/assessor';
import { StorageService } from 'src/app/services/storage.service';
import { MenuItem } from 'primeng/api';
import { CreateAssessmentService } from './create-assessment.service';
import { AssessmentFormService } from './assessment-form/assessment-form.service';
@Component({
  selector: 'app-create-assessment',
  templateUrl: './create-assessment.component.html',
  styleUrls: ['./create-assessment.component.sass'],
})
export class CreateAssessmentComponent implements OnInit {
  styleForm = {
    'background-image':
      'linear-gradient(to bottom, white, rgba(245, 141, 34, 0.16))',
  };
  activeIdx: number = -1;
  progressBarVal: number = 0;
  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public kidId: number = 0;
  public kidName: string = '';
  public kidAge: number = -1;
  public selectedAssId: number = -1;
  private currAssessorId$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public currentAssessor$: BehaviorSubject<Assessor> =
    new BehaviorSubject<Assessor>({} as any);
  public currAssessorName$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  public selectedClientId: number = 0;
  public selectedClientName: string = '';

  public stepsItems: MenuItem[] = [];

  private sub?: Subscription;
  private firstDomainSub?: Subscription;

  constructor(
    public datepipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    public assessmentService: CreateAssessmentService,
    private storageService: StorageService,
    private assessmentFormService: AssessmentFormService
  ) {}

  ngOnInit(): void {
    console.log(this.activeIdx)
    this.sub = this.route.params.subscribe((params) => {
      this.kidId = +params['kidId'];
      this.kidName = params['kidName'];
      this.kidAge = +params['kidAge'];
      this.selectedAssId = +params['assId'];
      this.currentAssessor$.next(
        this.storageService.retrieveJsonData('currentAssessor')
      );
      this.currAssessorId$.next(
        this.currentAssessor$.getValue().assessorId
      );
      this.currAssessorName$.next(
        this.currentAssessor$.getValue().name
      );

      this.assessmentService.getDomainMenu(this.kidAge);
      this.assessmentService.getAllQuestionsForThisKid(this.kidAge);

      this.firstDomainSub = this.assessmentService.firstDomain$.subscribe((firstDomain) => {
        // console.log('firstDomain is: ' + firstDomain);
        this.router.navigate(
          [
            {
              outlets: {
                assForm: ['assessment-form', firstDomain, this.kidAge],
              },
            },
          ],
          { relativeTo: this.route } //{ relativeTo: this.route }
        );
      });
    });
  }

  stepButtonClick(event: any): number {
    console.log(this.assessmentService.menuLength)
    this.assessmentFormService.submitResponses(+this.route.snapshot.params['assId'])
    return +event //get the index from the assessmentFormService Domains....
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.firstDomainSub?.unsubscribe();
  }
}
