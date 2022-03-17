/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { LocService } from './loc-service.service';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { DashboardPresentationService } from '../dashboard-presentation.service';
@Component({
  selector: 'app-loc',
  templateUrl: './loc.component.html',
  styleUrls: ['./loc.component.sass'],
})
export class LocComponent implements OnInit {
  public locDistFormGroup: FormGroup;
  selectedAssessmentTypes: string[] = [];
  finalString = '?';
  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    barValueSpacing: 0,
    scales: {
      y: {
        ticks: {
          min: 0,
        },
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
        text: 'LOC Distribution',
      },
    },
  };
  messages: Message[] = [];
  // eslint-disable-next-line prettier/prettier
  constructor(
    public locService: LocService,
    private formBuilder: FormBuilder,
    public dashboardPresentationService: DashboardPresentationService
  ) {
    var startDate = new Date();
    startDate.setFullYear(2020);
    var endDate = new Date();
    this.locDistFormGroup = this.formBuilder.group({
      startDate: [null, [Validators.required]],
      endDate: [endDate, [Validators.required]],
      startAge: [
        locService.startAge$.value[0].individualRangeCode,
        [Validators.required],
      ],
      endAge: [
        locService.endAge$.value[0].individualRangeCode,
        [Validators.required],
      ],
    });
    this.locService.getAssessmentTypes();
    this.updateInformationSelection();
  }

  ngOnInit(): void {
    this.selectedAssessmentTypes = new Array();
    this.messages = new Array();
    this.locService.locChartParams$.next(this.locDistFormGroup.getRawValue());
    this.messages = [];
  }

  logSelectedOrgs(): void {
    this.selectedAssessmentTypes.length <= 0
      ? (this.messages = [
          { severity: 'info', summary: 'Please Select Assessment Type(s)' },
        ])
      : (this.messages = []);
    if (this.selectedAssessmentTypes.length > 0) {
      this.messages = [];
      this.locService.getDisplayData(
        this.covertToServiceStringAssType(this.selectedAssessmentTypes)
      );
    }
  }

  covertToServiceStringAssType(theList: string[]): string {
    this.finalString = '&';
    for (let i = 0; i < theList.length; ++i) {
      this.finalString += `assessment_reasons=` + theList[i] + '&';
    }
    return this.finalString.substring(0, this.finalString.length - 1);
  }

  updateInformationSelection() {
    const start_date = this.locDistFormGroup.get('startDate')?.value;
    const end_date = this.locDistFormGroup.get('endDate')?.value;
    const start_age = this.locDistFormGroup.get('startAge')?.value;
    const end_age = this.locDistFormGroup.get('endAge')?.value;
    const age_group = start_age + '-' + end_age;
    this.locService.ageValidator(end_age);

    this.locService.locChartParams$.next({
      start_date,
      end_date,
      age_group,
    });
  }
}
