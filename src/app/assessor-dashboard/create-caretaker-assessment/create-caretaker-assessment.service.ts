import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MenuItem } from 'primeng/api';
@Injectable({
  providedIn: 'root',
})
export class CreateCaretakerAssessmentService {
  public static ageGroupQuestionsForKid$: BehaviorSubject<any[]> =
    new BehaviorSubject<any[]>([]); // all the questions

  public static currDomainSteps: MenuItem[];
  public tempList: MenuItem[] = [];
  public questionDomainMenu$: BehaviorSubject<MenuItem[]> = new BehaviorSubject<
    MenuItem[]
  >([]);

  firstDomain$: Observable<any>;
  private firstDomainSubject = new Subject<any>();

  questionsForIndivDomain$: Observable<any>;
  private questionsToDisplaySubject = new Subject<any>();

  public menuLength: number = 0;

  constructor(private apiService: ApiService) {
    this.firstDomain$ = this.firstDomainSubject.asObservable();
    this.questionsForIndivDomain$ =
      this.questionsToDisplaySubject.asObservable();
  }

  getDomainMenu(): any {
    this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/questions/caretaker`,
        {}
      )
      .subscribe((response) => {
        this.tempList = [];
        response.forEach((x: any) => {
          var fullList: any[] = [];
          if (x.ageGroups.length > 0) {
            x.ageGroups.forEach((ag: any) => {
              while (ag.questions.length > 0) {
                fullList.push(ag.questions.pop());
              }
            });
            this.tempList.push({
              label: x.domainName,
              routerLink: [
                {
                  outlets: {
                    caretakerAssessmentForm: [
                      'caretaker-assessment-form',
                      x.domainName,
                    ],
                  },
                },
              ],
            });
          }
        });

        this.questionDomainMenu$.next(this.tempList);
        CreateCaretakerAssessmentService.currDomainSteps = this.tempList;
        this.menuLength = this.tempList.length;
        var dm0 = this.tempList[0].label;
        var loller;
        if (dm0) {
          loller = dm0 as string;
          this.firstDomainSubject.next(loller);
        }
      }); //end api service
  }

  getAllQuestionsForThisKid() {
    var ageGrpListQns: any[] = [];
    this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/questions/caretaker`,
        {}
      )
      .subscribe((response) => {
        response.forEach((x: any) => {
          var fullList: any[] = [];
          if (x.ageGroups.length > 0) {
            x.ageGroups.forEach((ag: any) => {
              ag.questions.forEach((qn: any) => {
                fullList.push(qn);
              });
            });

            var tempObj = {
              domainName: x.domainName,
              domainId: x.domainId,
              module: x.module,
              fullListQuestions: fullList, //will contain submodule questions
            };

            ageGrpListQns.push(tempObj);
          }
        });
        CreateCaretakerAssessmentService.ageGroupQuestionsForKid$.next(ageGrpListQns);
      }); //end api service
  }
}
