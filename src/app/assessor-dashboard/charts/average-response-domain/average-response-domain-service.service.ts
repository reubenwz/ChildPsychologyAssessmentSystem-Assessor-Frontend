import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AverageResponseDomainChartResponse } from './average-response-domain-chart-response';
import { ApiService } from '../../../services/api.service';
import { AverageResponseDomainChartParams } from './average-response-domain-chart-params';
import { filter } from 'rxjs/operators';
import { Chart, ChartEvent, registerables } from 'node_modules/chart.js';

@Injectable({
  providedIn: 'root',
})
export class AverageResponseDomainServiceService {
  public averageResponseDomainResponse$: BehaviorSubject<AverageResponseDomainChartResponse | null> =
    new BehaviorSubject<AverageResponseDomainChartResponse | null>(null);
  public averageResponseDomainDisplayData$: BehaviorSubject<any> =
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
  public averageResponseDomainChartParams$: BehaviorSubject<AverageResponseDomainChartParams> =
    new BehaviorSubject<AverageResponseDomainChartParams>({
      start_date: String(new Date()),
      end_date: String(new Date()),
      age_group: '',
    });
  public averageResponseDomainBarChartOptions$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);

  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  averageResponseDomainChart: any;
  first: boolean = true;
  firstPoint: any;
  listOfBackgroundColor: string[] = [];
  listOfBorderColor: string[] = [];
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

  getDisplayData(): void {
    this.averageResponseDomainChartParams$
      .pipe(filter((params) => !!(params.start_date && params.end_date)))
      .subscribe((params) => {
        if (params.start_date) {
          params.start_date = new Date(params.start_date).toISOString();
        }
        if (params.end_date) {
          params.end_date = new Date(params.end_date).toISOString();
        }
        this.apiService
          .authenticatedGet<AverageResponseDomainChartResponse>(
            '/cans-backend-rws/Resources/AssessorVisualisation/domain-barchart',
            JSON.parse(JSON.stringify(params))
          )
          .subscribe((response) => {
            this.averageResponseDomainResponse$.next(response);

            for (let i = 0; i < response.data.length; i++) {
              this.listOfBackgroundColor.push('rgba(255, 99, 132, 0.2)');
              this.listOfBorderColor.push('rgba(255, 99, 132, 1)');
            }
            this.averageResponseDomainDisplayData$.next({
              labels: response.labels,
              datasets: [
                {
                  data: response.data,
                  backgroundColor: this.listOfBackgroundColor,
                  borderColor: this.listOfBorderColor,
                },
              ],
            });
            this.averageResponseDomainBarChartOptions$.next({
              maintainAspectRatio: false,
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Domain',
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Average Response',
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
                  this.averageResponseDomainChart.getElementsAtEventForMode(
                    click,
                    'nearest',
                    { intersect: true },
                    true
                  );

                if (point.length) {
                  this.firstPoint = point[0];
                  var label =
                    this.averageResponseDomainChart.data.labels[
                      this.firstPoint.index
                    ];
                  this.averageResponseDomainChart.data.datasets[0].backgroundColor[
                    this.firstPoint.index
                  ] = this.color;
                  this.generateChart();
                }
              },
            });
            this.generateChart();
          });
      });
  }

  generateChart() {
    if (!this.first) {
      this.averageResponseDomainChart.destroy();
    }
    this.averageResponseDomainChart = new Chart('averageResponseDomainChart', {
      type: 'bar',
      data: this.averageResponseDomainDisplayData$.value,
      options: this.averageResponseDomainBarChartOptions$.value,
    });
    this.first = false;
  }
  logColor(color: string) {
    this.color = color;
  }
}
