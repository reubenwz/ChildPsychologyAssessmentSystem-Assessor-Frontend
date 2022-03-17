import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { AgePiechartResponse } from './age-piechart-response';
@Component({
  selector: 'app-age-piechart',
  templateUrl: './age-piechart.component.html',
  styleUrls: ['./age-piechart.component.sass'],
})
export class AgePiechartComponent implements OnInit {
  public processing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public errorMessage$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  title: any;
  data: any;
  labels: any;

  displaydata: any;

  agePieChart: any;

  background: string[] = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(50, 205, 50, 0.2)',
  ];

  dataArr: any[] = [];
  totalClient: number = 0;
  selectedAgeGroup: any;
  percentage: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    Chart.register(...registerables);
    const data = {};

    this.apiService
      .authenticatedGet<AgePiechartResponse>(
        '/cans-backend-rws/Resources/AssessorVisualisation/age-piechart',
        data
      )
      .subscribe(
        (response) => {
          this.title = response.title;
          this.data = response.data;
          this.labels = response.labels;

          this.displaydata = {
            labels: this.labels,
            datasets: [
              {
                label: '',
                data: this.data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(50, 205, 50, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
              },
            ],
          };

          // const ctx = <HTMLCanvasElement>document.getElementById('agePieChart');
          this.agePieChart = new Chart('agePieChart', {
            type: 'pie',
            data: this.displaydata,
            options: {
              plugins: {
                legend: {
                  position: 'bottom',
                },
                title: {
                  display: true,
                  text: this.title,
                },
              },
              onClick: (click) => {
                this.dataArr = this.agePieChart.data.datasets[0].data;
                this.totalClient = 0;
                for (let i = 0; i < this.dataArr.length; i++) {
                  this.totalClient += this.dataArr[i];
                }
                const point = this.agePieChart.getElementsAtEventForMode(
                  click,
                  'nearest',
                  { intersect: true },
                  true
                );
                var firstPoint: any;
                if (point.length) {
                  firstPoint = point[0];
                  this.selectedAgeGroup =
                    this.agePieChart.data.labels[firstPoint.index];
                  this.percentage =
                    (this.agePieChart.data.datasets[0].data[firstPoint.index] /
                      this.totalClient) *
                    100;
                }
              },
            },
          });
          this.processing$.next(false);
          this.router.navigate(['/charts']);
        },
        (err) => {
          this.processing$.next(false);
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.errorMessage$.next(errorMessageInJson.error);
          } else {
            this.errorMessage$.next(err.message);
          }
        }
      );
  }
}
