import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocResponse } from './loc-response';
import { ApiService } from '../../../services/api.service';
import { LocChartParams } from './loc-chart-params';
import { filter } from 'rxjs/operators';
import { AssessmentTypesResponse } from './assessment-types-response';
@Injectable({
  providedIn: 'root',
})
export class LocService {
  public locResponse$: BehaviorSubject<LocResponse | null> =
    new BehaviorSubject<LocResponse | null>(null);
  public locDisplayData$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public startAge$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    { individualRange: '0', individualRangeCode: '0' },
    { individualRange: '7', individualRangeCode: '7' },
    { individualRange: '14', individualRangeCode: '14' },
    { individualRange: '17', individualRangeCode: '17' },
  ]);
  public endAge$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    { individualRange: '6', individualRangeCode: '6' },
    { individualRange: '13', individualRangeCode: '13' },
    { individualRange: '17', individualRangeCode: '17' },
    { individualRange: '20', individualRangeCode: '20' },
  ]);
  public locChartParams$: BehaviorSubject<LocChartParams> =
    new BehaviorSubject<LocChartParams>({
      start_date: String(new Date()),
      end_date: String(new Date()),
      age_group: '',
    });

  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  public assessmentTypes$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    new Array()
  );
  // eslint-disable-next-line prettier/prettier
  constructor(private apiService: ApiService) {
    this.getAssessmentTypes();
  }
  ageValidator(end_age: string) {
    if (end_age == '6') {
      const startAge = [{ individualRange: '0', individualRangeCode: '0' }];
      this.startAge$.next(startAge);
    } else if (end_age == '13') {
      const startAge = [
        { individualRange: '0', individualRangeCode: '0' },
        { individualRange: '7', individualRangeCode: '7' },
      ];
      this.startAge$.next(startAge);
    } else if (end_age == '17') {
      const startAge = [
        { individualRange: '0', individualRangeCode: '0' },
        { individualRange: '7', individualRangeCode: '7' },
        { individualRange: '14', individualRangeCode: '14' },
      ];
      this.startAge$.next(startAge);
    } else if (end_age == '20') {
      const startAge = [
        { individualRange: '0', individualRangeCode: '0' },
        { individualRange: '7', individualRangeCode: '7' },
        { individualRange: '14', individualRangeCode: '14' },
        { individualRange: '17', individualRangeCode: '17' },
      ];
      this.startAge$.next(startAge);
    }
  }

  getAssessmentTypes() {
    this.apiService
      .authenticatedGet<AssessmentTypesResponse>(
        '/cans-backend-rws/Resources/AssessorVisualisation/assessment-types'
      )
      .subscribe((response) => {
        var assListOfDict: any[] = [];
        response.assessmentsReasons.forEach((element: string) => {
          assListOfDict.push({
            assTypeName: element,
            assTypeCode: element,
          });
        });
        this.assessmentTypes$.next(assListOfDict);
      });
  }

  getDisplayData(orgListParam: string): void {
    this.locChartParams$
      .pipe(filter((params) => !!(params.start_date && params.end_date)))
      .subscribe((params) => {
        if (params.start_date) {
          params.start_date = new Date(params.start_date).toISOString();
        }
        if (params.end_date) {
          params.end_date = new Date(params.end_date).toISOString();
        }
        this.apiService
          .authenticatedGet<LocResponse>(
            '/cans-backend-rws/Resources/AssessorVisualisation/locdistributionfilter-barchart' +
              orgListParam,
            JSON.parse(JSON.stringify(params))
          )
          .subscribe((response) => {
            this.locResponse$.next(response);
            let listOfListsData = [];
            listOfListsData = [
              {
                data: [] as any,
                label: 'LOC 1',
                backgroundColor: ['rgba(66, 226, 151, 0.8)'],
              },
              {
                data: [] as any,
                label: 'LOC 2',
                backgroundColor: ['rgba(226, 158, 66, 0.8)'],
              },
              {
                data: [] as any,
                label: 'LOC 3',
                backgroundColor: ['rgba(245, 40, 145, 0.8)'],
              },
            ];
            for (let i = 0; i < response.data.length; i++) {
              listOfListsData[0].data.push(response.data[i][0]);
              listOfListsData[1].data.push(response.data[i][1]);
              listOfListsData[2].data.push(response.data[i][2]);
            } //end for
            listOfListsData.forEach((x) => x.data.reverse());
            this.locDisplayData$.next({
              labels: response.labels.reverse(),
              datasets: listOfListsData,
            });
          });
      });
  }
}
