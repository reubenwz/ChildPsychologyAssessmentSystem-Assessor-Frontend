import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { GenderPiechartResponse } from './gender-piechart-response';

@Component({
  selector: 'app-gender-piechart',
  templateUrl: './gender-piechart.component.html',
  styleUrls: ['./gender-piechart.component.sass'],
})
export class GenderPiechartComponent implements OnInit {
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

  genderPieChart: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    Chart.register(...registerables);
    const data = {};

    this.apiService
      .authenticatedGet<GenderPiechartResponse>(
        '/cans-backend-rws/Resources/AssessorVisualisation/gender-piechart',
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
          let chartStatus = Chart.getChart('genderPieChart'); // <canvas> id
          if (chartStatus != undefined) {
            chartStatus.destroy();
          }

          this.genderPieChart = new Chart('genderPieChart', {
            type: 'pie',
            data: this.displaydata,
            options: {
              scales: {
                // y: {
                //   beginAtZero: true
                // }
              },
              plugins: {
                legend: {
                  position: 'bottom',
                },
                title: {
                  display: true,
                  text: this.title,
                },
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
