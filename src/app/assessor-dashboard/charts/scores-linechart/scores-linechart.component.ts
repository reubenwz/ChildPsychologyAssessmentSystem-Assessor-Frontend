import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { ScoresLinechartResponse } from './scores-linechart-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardPresentationService } from '../dashboard-presentation.service';
import { Assessor } from 'src/app/models/assessor';

@Component({
  selector: 'app-scores-linechart',
  templateUrl: './scores-linechart.component.html',
  styleUrls: ['./scores-linechart.component.sass'],
})
export class ScoresLinechartComponent implements OnInit {
  public scoresLinechartFormGroup: FormGroup;
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

  scoresLineChart: any;
  firstInitialisation: boolean = true;
  selectedId: any;

  selectedAssessorId$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    { individualRange: '1', individualRangeCode: '1' },
    { individualRange: '2', individualRangeCode: '2' },
    { individualRange: '3sc', individualRangeCode: '3' },
  ]);

  assessors: any[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    public dashboardPresentationService: DashboardPresentationService
  ) {
    this.scoresLinechartFormGroup = this.formBuilder.group({
      selectedAssessorId: [
        this.selectedAssessorId$.value[0].individualRangeCode,
        [Validators.required],
      ],
    });
  }

  ngOnInit(): void {
    Chart.register(...registerables);
    const data = this.scoresLinechartFormGroup.value;

    this.firstInitialisation = false;

    this.apiService
      .authenticatedGet<ScoresLinechartResponse>(
        '/cans-backend-rws/Resources/AssessorVisualisation/scores-linechart',
        data
      )
      .subscribe(
        (response) => {
          this.title = response.title;
          this.data = response.labels;
          this.labels = response.data;

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
          let chartStatus = Chart.getChart('scoresLineChart'); // <canvas> id
          if (chartStatus != undefined) {
            chartStatus.destroy();
          }

          this.scoresLineChart = new Chart('scoresLineChart', {
            type: 'line',
            data: this.displaydata,
            options: {
              scales: {
                // y: {
                //   beginAtZero: true
                // }
              },
              plugins: {
                legend: {
                  display: false,
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
    this.apiService
      .authenticatedGet<any>(
        '/cans-backend-rws/Resources/AssessorManagement-AssessorSystem/assessors',
        {}
      )
      .subscribe((response) => {
        const data: any[] = [];
        response.forEach((x: any) =>
          this.assessors.push({
            individualRange: x.name,
            individualRangeCode: x.assessorId,
          })
        );
      });
  }

  updateInformationSelection() {
    // JS - Destroy exiting Chart Instance to reuse <canvas> element
    let chartStatus = Chart.getChart('scoresLineChart'); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    //-- End of chart destroy

    const assessor_id =
      this.scoresLinechartFormGroup.get('selectedAssessorId')?.value;
    this.apiService
      .authenticatedGet<ScoresLinechartResponse>(
        '/cans-backend-rws/Resources/AssessorVisualisation/scores-linechart',
        {
          assessor_id: assessor_id,
        }
      )
      .subscribe(
        (response) => {
          this.title = response.title;
          this.data = response.labels;
          this.labels = response.data;

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

          this.scoresLineChart = new Chart('scoresLineChart', {
            type: 'line',
            data: this.displaydata,
            options: {
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Recertification Number',
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Score',
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: this.title,
                },
              },
              responsive: true,
              maintainAspectRatio: false,
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
