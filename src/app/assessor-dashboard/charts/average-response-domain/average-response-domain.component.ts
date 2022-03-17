import { Component, OnInit } from '@angular/core';
import { AverageResponseDomainServiceService } from './average-response-domain-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { DashboardPresentationService } from '../dashboard-presentation.service';

@Component({
  selector: 'app-average-response-domain',
  templateUrl: './average-response-domain.component.html',
  styleUrls: ['./average-response-domain.component.sass'],
})
export class AverageResponseDomainComponent implements OnInit {
  public averageResponseDomainFormGroup: FormGroup;
  lineChartOptions = {
    responsive: true,
    barValueSpacing: 0,
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
          },
        },
      ],
    },
  };
  messages: Message[] = [];
  color: string = '';

  constructor(
    public averageResponseDomainService: AverageResponseDomainServiceService,
    public dashboardPresentationService: DashboardPresentationService,
    private formBuilder: FormBuilder
  ) {
    var startDate = new Date();
    startDate.setFullYear(2020);
    var endDate = new Date();
    this.averageResponseDomainFormGroup = this.formBuilder.group({
      startDate: [startDate, [Validators.required]],
      endDate: [endDate, [Validators.required]],
      startAge: [
        averageResponseDomainService.startAge$.value[0].individualRangeCode,
        [Validators.required],
      ],
      endAge: [
        averageResponseDomainService.endAge$.value[0].individualRangeCode,
        [Validators.required],
      ],
    });
  }

  ngOnInit(): void {
    this.messages = new Array();
    this.averageResponseDomainService.averageResponseDomainChartParams$.next(
      this.averageResponseDomainFormGroup.getRawValue()
    );
    this.messages = [];
  }

  updateInformationSelection() {
    const start_date =
      this.averageResponseDomainFormGroup.get('startDate')?.value;

    const end_date = this.averageResponseDomainFormGroup.get('endDate')?.value;
    const start_age =
      this.averageResponseDomainFormGroup.get('startAge')?.value;
    const end_age = this.averageResponseDomainFormGroup.get('endAge')?.value;
    const age_group = start_age + '-' + end_age;
    this.averageResponseDomainService.ageValidator(end_age);

    this.averageResponseDomainService.averageResponseDomainChartParams$.next({
      start_date,
      end_date,
      age_group,
    });
    this.averageResponseDomainService.getDisplayData();
  }

  sendColorToService() {
    this.averageResponseDomainService.logColor(this.color);
  }
}
