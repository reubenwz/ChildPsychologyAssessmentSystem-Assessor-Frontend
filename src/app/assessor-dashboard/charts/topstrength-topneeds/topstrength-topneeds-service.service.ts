import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TopstrengthChartResponse } from './topstrength-chart-response';
import { TopneedsChartResponse } from './topneeds-chart-response';
import { ApiService } from 'src/app/services/api.service';
import { TopstrengthTopneedsChartParams } from './topstrength-topneeds-chart-params';
import { filter } from 'rxjs/operators';
import { Chart, ChartEvent } from 'node_modules/chart.js';

@Injectable({
  providedIn: 'root',
})
export class TopstrengthTopneedsServiceService {
  public topstrengthDisplayData$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  public topneedsDisplayData$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
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
  public race$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public gender$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public topstrengthTopneedsChartParams$: BehaviorSubject<TopstrengthTopneedsChartParams> =
    new BehaviorSubject<TopstrengthTopneedsChartParams>({
      start_date: String(new Date()),
      end_date: String(new Date()),
      age_group: '',
    });
  public topstrengthBarChartOptions$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);

  public topneedsBarChartOptions$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);

  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  public treeSelectData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    new Array()
  );

  firstTopstrength: boolean = true;
  firstTopneeds: boolean = true;

  topstrengthChart: any = '';
  firstPointTopstrength: any;

  topneedsChart: any = '';
  firstPointTopneeds: any;

  color: string = '';

  //map needed for color and label pair to carry colors to newly generated chart
  map = new Map();

  // eslint-disable-next-line prettier/prettier
  constructor(private apiService: ApiService) {}

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

  getGender() {
    this.apiService
      .authenticatedGet<any>(
        '/cans-backend-rws/Resources/AssessorVisualisation/gender'
      )
      .subscribe((response) => {
        const gender: any[] = [];
        response.forEach((x: any) =>
          gender.push({ individualRange: x, individualRangeCode: x })
        );
        this.gender$.next(gender);
      });
  }

  getRace() {
    this.apiService
      .authenticatedGet<any>(
        '/cans-backend-rws/Resources/AssessorVisualisation/ethnicity'
      )
      .subscribe((response) => {
        const race: any[] = [];
        response.forEach((x: any) =>
          race.push({ individualRange: x, individualRangeCode: x })
        );
        this.race$.next(race);
      });
  }

  getTopstrengthDisplayData(orgListParam: string): void {
    this.topstrengthTopneedsChartParams$
      .pipe(filter((params) => !!(params.start_date && params.end_date)))
      .subscribe((params) => {
        if (params.start_date) {
          params.start_date = new Date(params.start_date).toISOString();
        }
        if (params.end_date) {
          params.end_date = new Date(params.end_date).toISOString();
        }
        this.apiService
          .authenticatedGet<TopstrengthChartResponse>(
            '/cans-backend-rws/Resources/AssessorVisualisation/topstrength-barchart' +
              orgListParam,
            JSON.parse(JSON.stringify(params))
          )
          .subscribe((response) => {
            let listOfBackgroundColorTopstrength: string[] = [];
            let listOfBorderColorTopstrength: string[] = [];

            for (let i = 0; i < response.data.length; i++) {
              var label = response.labels[i];
              if (this.map.get(label) != undefined) {
                listOfBackgroundColorTopstrength.push(this.map.get(label));
              } else {
                listOfBackgroundColorTopstrength.push(
                  'rgba(255, 99, 132, 0.2)'
                );
                listOfBorderColorTopstrength.push('rgba(255, 99, 132, 1)');
              }
            }
            this.topstrengthDisplayData$.next({
              labels: response.labels,
              datasets: [
                {
                  data: response.data,
                  backgroundColor: listOfBackgroundColorTopstrength,
                  borderColor: listOfBorderColorTopstrength,
                },
              ],
            });
            this.topstrengthBarChartOptions$.next({
              maintainAspectRatio: false,
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Strength',
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Number of strengths',
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: response.title,
                },
              },
              onClick: (click: ChartEvent) => {
                const point = this.topstrengthChart.getElementsAtEventForMode(
                  click,
                  'nearest',
                  { intersect: true },
                  true
                );

                if (point.length) {
                  this.firstPointTopstrength = point[0];
                  var label =
                    this.topstrengthChart.data.labels[
                      this.firstPointTopstrength.index
                    ];
                  var randomColorGenerated = this.color;
                  this.topstrengthChart.data.datasets[0].backgroundColor[
                    this.firstPointTopstrength.index
                  ] = randomColorGenerated;
                  this.map.set(label, randomColorGenerated);
                  this.generateTopstrengthChart();
                }
              },
            });
            this.generateTopstrengthChart();
          });
      });
  }

  getTopneedsDisplayData(orgListParam: string): void {
    this.topstrengthTopneedsChartParams$
      .pipe(filter((params) => !!(params.start_date && params.end_date)))
      .subscribe((params) => {
        if (params.start_date) {
          params.start_date = new Date(params.start_date).toISOString();
        }
        if (params.end_date) {
          params.end_date = new Date(params.end_date).toISOString();
        }
        this.apiService
          .authenticatedGet<TopneedsChartResponse>(
            '/cans-backend-rws/Resources/AssessorVisualisation/topneeds-barchart' +
              orgListParam,
            JSON.parse(JSON.stringify(params))
          )
          .subscribe((response) => {
            let listOfBackgroundColorTopneeds: string[] = [];
            let listOfBorderColorTopneeds: string[] = [];
            for (let i = 0; i < response.data.length; i++) {
              var label = response.labels[i];
              if (this.map.get(label) != undefined) {
                listOfBackgroundColorTopneeds.push(this.map.get(label));
              } else {
                listOfBackgroundColorTopneeds.push('rgba(255, 99, 132, 0.2)');
                listOfBorderColorTopneeds.push('rgba(255, 99, 132, 1)');
              }
            }
            this.topneedsDisplayData$.next({
              labels: response.labels,
              datasets: [
                {
                  data: response.data,
                  backgroundColor: listOfBackgroundColorTopneeds,
                  borderColor: listOfBorderColorTopneeds,
                },
              ],
            });
            this.topneedsBarChartOptions$.next({
              maintainAspectRatio: false,
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Needs',
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Number of needss',
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: response.title,
                },
              },
              onClick: (click: ChartEvent) => {
                const point = this.topneedsChart.getElementsAtEventForMode(
                  click,
                  'nearest',
                  { intersect: true },
                  true
                );

                if (point.length) {
                  this.firstPointTopneeds = point[0];
                  var label =
                    this.topneedsChart.data.labels[
                      this.firstPointTopneeds.index
                    ];
                  var randomColorGenerated = this.color;
                  this.topneedsChart.data.datasets[0].backgroundColor[
                    this.firstPointTopneeds.index
                  ] = randomColorGenerated;
                  this.map.set(label, randomColorGenerated);
                  this.generateTopneedsChart();
                }
              },
            });
            this.generateTopneedsChart();
          });
      });
  }
  generateTopstrengthChart() {
    if (!this.firstTopstrength) {
      this.topstrengthChart.destroy();
    }
    this.topstrengthChart = new Chart('topstrengthChart', {
      type: 'bar',
      data: this.topstrengthDisplayData$.value,
      options: this.topstrengthBarChartOptions$.value,
    });
    this.firstTopstrength = false;
  }
  generateTopneedsChart() {
    if (!this.firstTopneeds) {
      this.topneedsChart.destroy();
    }
    this.topneedsChart = new Chart('topneedsChart', {
      type: 'bar',
      data: this.topneedsDisplayData$.value,
      options: this.topneedsBarChartOptions$.value,
    });
    this.firstTopneeds = false;
  }
  logColor(color: string) {
    this.color = color;
  }
}
