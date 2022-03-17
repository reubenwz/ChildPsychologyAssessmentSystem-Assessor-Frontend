import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToptraumaChartResponse } from './toptrauma-chart-response';
import { TraumapercentageChartResponse } from './traumapercentage-chart-response';
import { ApiService } from 'src/app/services/api.service';
import { ToptraumaTraumapercentageChartParams } from './toptrauma-traumapercentage-chart-params';
import { Chart, ChartEvent } from 'node_modules/chart.js';

@Injectable({
  providedIn: 'root',
})
export class ToptraumaTraumapercentageServiceService {
  public toptraumaDisplayData$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public traumapercentageDisplayData$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
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
  public toptraumaTraumapercentageChartParams$: BehaviorSubject<ToptraumaTraumapercentageChartParams> =
    new BehaviorSubject<ToptraumaTraumapercentageChartParams>({
      age_group: '',
    });
  public toptraumaBarChartOptions$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);

  public traumapercentageBarChartOptions$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);

  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  public treeSelectData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    new Array()
  );
  //map needed for color and label pair to carry colors to newly generated chart
  map = new Map();

  firstToptrauma: boolean = true;
  firstTraumapercentage: boolean = true;

  toptraumaChart: any = '';
  firstPointToptrauma: any;

  traumapercentageChart: any = '';
  firstPointTraumapercentage: any;

  color: string = '';

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

  getToptraumaDisplayData(orgListParam: string): void {
    if (!this.firstToptrauma) {
      this.toptraumaChart.destroy();
      this.firstToptrauma = false;
    }
    this.toptraumaTraumapercentageChartParams$.subscribe((params) => {
      this.apiService
        .authenticatedGet<ToptraumaChartResponse>(
          '/cans-backend-rws/Resources/AssessorVisualisation/toptrauma-barchart' +
            orgListParam,
          JSON.parse(JSON.stringify(params))
        )
        .subscribe((response) => {
          let listOfBackgroundColorToptrauma: string[] = [];
          let listOfBorderColorToptrauma: string[] = [];
          for (let i = 0; i < response.data.length; i++) {
            var label = response.labels[i];
            if (this.map.get(label) != undefined) {
              listOfBackgroundColorToptrauma.push(this.map.get(label));
            } else {
              listOfBackgroundColorToptrauma.push('rgba(255, 99, 132, 0.2)');
              listOfBorderColorToptrauma.push('rgba(255, 99, 132, 1)');
            }
          }
          this.toptraumaDisplayData$.next({
            labels: response.labels,
            datasets: [
              {
                data: response.data,
                backgroundColor: listOfBackgroundColorToptrauma,
                borderColor: listOfBorderColorToptrauma,
              },
            ],
          });
          this.toptraumaBarChartOptions$.next({
            maintainAspectRatio: false,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Trauma',
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Number of Traumas',
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
              const point = this.toptraumaChart.getElementsAtEventForMode(
                click,
                'nearest',
                { intersect: true },
                true
              );

              if (point.length) {
                this.firstPointToptrauma = point[0];
                var label =
                  this.toptraumaChart.data.labels[
                    this.firstPointToptrauma.index
                  ];
                var randomColorGenerated = this.color;
                this.toptraumaChart.data.datasets[0].backgroundColor[
                  this.firstPointToptrauma.index
                ] = randomColorGenerated;
                this.map.set(label, randomColorGenerated);
                this.generateToptraumaChart();
              }
            },
          });
          this.generateToptraumaChart();
        });
    });
  }

  getTraumapercentageDisplayData(orgListParam: string): void {
    if (!this.firstTraumapercentage) {
      this.traumapercentageChart.destroy();
      this.firstTraumapercentage = false;
    }
    this.toptraumaTraumapercentageChartParams$.subscribe((params) => {
      this.apiService
        .authenticatedGet<TraumapercentageChartResponse>(
          '/cans-backend-rws/Resources/AssessorVisualisation/traumapercentage-barchart' +
            orgListParam,
          JSON.parse(JSON.stringify(params))
        )
        .subscribe((response) => {
          let listOfBackgroundColorTraumapercentage: string[] = [];
          let listOfBorderColorTraumapercentage: string[] = [];
          for (let i = 0; i < response.data.length; i++) {
            var label = response.labels[i];
            if (this.map.get(label) != undefined) {
              listOfBackgroundColorTraumapercentage.push(this.map.get(label));
            } else {
              listOfBackgroundColorTraumapercentage.push(
                'rgba(255, 99, 132, 0.2)'
              );
              listOfBorderColorTraumapercentage.push('rgba(255, 99, 132, 1)');
            }
          }
          this.traumapercentageDisplayData$.next({
            labels: response.labels,
            datasets: [
              {
                data: response.data,
                backgroundColor: listOfBackgroundColorTraumapercentage,
                borderColor: listOfBorderColorTraumapercentage,
              },
            ],
          });
          this.traumapercentageBarChartOptions$.next({
            maintainAspectRatio: false,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Number of Traumas',
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Trauma Percentage',
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
              const point =
                this.traumapercentageChart.getElementsAtEventForMode(
                  click,
                  'nearest',
                  { intersect: true },
                  true
                );

              if (point.length) {
                this.firstPointTraumapercentage = point[0];
                var label =
                  this.traumapercentageChart.data.labels[
                    this.firstPointTraumapercentage.index
                  ];
                var randomColorGenerated = this.color;
                this.traumapercentageChart.data.datasets[0].backgroundColor[
                  this.firstPointTraumapercentage.index
                ] = randomColorGenerated;
                this.map.set(label, randomColorGenerated);
                this.generateTraumapercentageChart();
              }
            },
          });
          this.generateTraumapercentageChart();
        });
    });
  }
  generateToptraumaChart() {
    if (!this.firstToptrauma) {
      this.toptraumaChart.destroy();
    }
    this.toptraumaChart = new Chart('toptraumaChart', {
      type: 'bar',
      data: this.toptraumaDisplayData$.value,
      options: this.toptraumaBarChartOptions$.value,
    });
    this.firstToptrauma = false;
  }
  generateTraumapercentageChart() {
    if (!this.firstTraumapercentage) {
      this.traumapercentageChart.destroy();
    }
    this.traumapercentageChart = new Chart('traumapercentageChart', {
      type: 'bar',
      data: this.traumapercentageDisplayData$.value,
      options: this.traumapercentageBarChartOptions$.value,
    });
    this.firstTraumapercentage = false;
  }
  logColor(color: string) {
    this.color = color;
  }
}
