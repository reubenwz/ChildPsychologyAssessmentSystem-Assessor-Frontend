import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MenuItem } from 'primeng/api';
@Injectable({
  providedIn: 'root',
})
export class CreateAssessmentService {
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

  public static domainDesc: any = {};

  constructor(private apiService: ApiService) {
    this.firstDomain$ = this.firstDomainSubject.asObservable();
    this.questionsForIndivDomain$ =
      this.questionsToDisplaySubject.asObservable();
  }

  getDomainMenu(kidAge: number): any {
    this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/questions/${kidAge}`,
        {}
      )
      .subscribe((response) => {
        this.tempList = [];
        console.log(response)
        response.forEach((x: any) => {
          CreateAssessmentService.domainDesc[x.domainName] = x.domainDescription;
          var fullList: any[] = [];
          if (x.ageGroups.length > 0) {
            x.ageGroups.forEach((ag: any) => {
              while (ag.questions.length > 0) {
                fullList.push(ag.questions.pop());
              }
            });
            this.tempList.push({
              label: x.domainName,
              tooltip: x.domainDescription,
              routerLink: [
                {
                  outlets: {
                    assForm: ['assessment-form', x.domainName, kidAge],
                  },
                },
              ],
            });
          }
        });

        this.questionDomainMenu$.next(this.tempList);
        // console.log(this.tempList)
        CreateAssessmentService.currDomainSteps = this.tempList;
        this.menuLength = this.tempList.length;
        var dm0 = this.tempList[0].label;
        var loller;
        if (dm0) {
          loller = dm0 as string;
          this.firstDomainSubject.next(loller);
        }
      }); //end api service
  }

  getAllQuestionsForThisKid(kidAge: number) {
    var ageGrpListQns: any[] = [];
    this.apiService
      .authenticatedGet<any>(
        `/cans-backend-rws/Resources/Assessment/questions/${kidAge}`,
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
        CreateAssessmentService.ageGroupQuestionsForKid$.next(ageGrpListQns);
      }); //end api service
  }
}
