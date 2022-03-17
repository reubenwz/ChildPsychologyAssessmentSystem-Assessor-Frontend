import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecertifiedBarchartResponse } from './recertified-barchart-response';
import { ApiService } from '../../../services/api.service';
import { filter } from 'rxjs/operators';
import { Chart, ChartEvent, registerables } from 'node_modules/chart.js';

@Injectable({
  providedIn: 'root',
})
export class RecertifiedBarchartServiceService {
  public recertifiedBarchartResponse$: BehaviorSubject<RecertifiedBarchartResponse | null> =
    new BehaviorSubject<RecertifiedBarchartResponse | null>(null);
  public recertifiedBarchartDisplayData$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  public recertifiedBarchartBarChartOptions$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);

  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  recertifiedBarchartChart: any;
  first: boolean = true;
  firstPoint: any;
  listOfBackgroundColor: string[] = [];
  listOfBorderColor: string[] = [];
  color: string = '';
  // eslint-disable-next-line prettier/prettier
  constructor(private apiService: ApiService) {}

  getDisplayData(): void {
    this.apiService
      .authenticatedGet<RecertifiedBarchartResponse>(
        '/cans-backend-rws/Resources/AssessorVisualisation/Recertified-barchart',
        {}
      )
      .subscribe((response) => {
        this.recertifiedBarchartResponse$.next(response);

        for (let i = 0; i < response.data.length; i++) {
          this.listOfBackgroundColor.push('rgba(39, 239, 245, 0.8)');
          this.listOfBorderColor.push('rgba(50, 99, 132, 1)');
        }
        this.recertifiedBarchartDisplayData$.next({
          labels: response.labels,
          datasets: [
            {
              data: response.data,
              backgroundColor: this.listOfBackgroundColor,
              borderColor: this.listOfBorderColor,
            },
          ],
        });
        this.recertifiedBarchartBarChartOptions$.next({
          maintainAspectRatio: false,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Assessor',
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'No. of times recertified',
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
              this.recertifiedBarchartChart.getElementsAtEventForMode(
                click,
                'nearest',
                { intersect: true },
                true
              );

            if (point.length) {
              this.firstPoint = point[0];
              var label =
                this.recertifiedBarchartChart.data.labels[
                  this.firstPoint.index
                ];
              this.recertifiedBarchartChart.data.datasets[0].backgroundColor[
                this.firstPoint.index
              ] = this.color;
              this.generateChart();
            }
          },
        });
        this.generateChart();
      });
  }

  generateChart() {
    if (!this.first) {
      this.recertifiedBarchartChart.destroy();
    }
    this.recertifiedBarchartChart = new Chart('recertifiedBarchartChart', {
      type: 'bar',
      data: this.recertifiedBarchartDisplayData$.value,
      options: this.recertifiedBarchartBarChartOptions$.value,
    });
    this.first = false;
  }
  logColor(color: string) {
    this.color = color;
  }
}
