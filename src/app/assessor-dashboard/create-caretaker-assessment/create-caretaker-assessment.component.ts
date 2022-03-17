import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Assessor } from 'src/app/models/assessor';
import { StorageService } from 'src/app/services/storage.service';
import { MenuItem } from 'primeng/api';
import { CreateCaretakerAssessmentService } from './create-caretaker-assessment.service';

@Component({
  selector: 'app-create-caretaker-assessment',
  templateUrl: './create-caretaker-assessment.component.html',
  styleUrls: ['./create-caretaker-assessment.component.sass'],
})
export class CreateCaretakerAssessmentComponent implements OnInit {
  styleForm = {
    'background-image':
      'linear-gradient(to bottom, white, rgba(245, 40, 145, 0.16))',
  };

  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public selectedAssId: number = -1;
  private currAssessorId$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public currentAssessor$: BehaviorSubject<Assessor> =
    new BehaviorSubject<Assessor>({} as any);
  public currAssessorName$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  public selectedClientId: number = 0;
  public selectedClientName: string = '';
  public currentCaretakerName: string = '';

  public stepsItems: MenuItem[] = [];

  private sub?: Subscription;

  constructor(
    public datepipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    public createCaretakerAssessmentService: CreateCaretakerAssessmentService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.selectedAssId = +params['assId'];
      this.currentCaretakerName = params['currentCaretakerName'];
      this.currentAssessor$.next(
        this.storageService.retrieveJsonData('currentAssessor')
      );
      this.currAssessorId$.next(
        this.currentAssessor$.getValue().assessorId
      );
      this.currAssessorName$.next(
        this.currentAssessor$.getValue().name
      );

      this.createCaretakerAssessmentService.getDomainMenu();
      this.createCaretakerAssessmentService.getAllQuestionsForThisKid();

      this.createCaretakerAssessmentService.firstDomain$.subscribe(
        (firstDomain) => {
          this.router.navigate(
            [
              {
                outlets: {
                  caretakerAssessmentForm: [
                    'caretaker-assessment-form',
                    firstDomain,
                  ],
                },
              },
            ],
            { relativeTo: this.route } //{ relativeTo: this.route }
          );
        }
      );
    });
  }

  previousButtonClick() {
    
  }

  caretakerAssSaveButtonClick() {

  }

  caretakerAssSubmitButtonClick() {

  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
