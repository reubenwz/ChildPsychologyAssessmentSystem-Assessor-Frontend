/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { TopstrengthTopneedsServiceService } from './topstrength-topneeds-service.service';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { DashboardPresentationService } from '../dashboard-presentation.service';

@Component({
  selector: 'app-topstrength-topneeds',
  templateUrl: './topstrength-topneeds.component.html',
  styleUrls: ['./topstrength-topneeds.component.sass'],
})
export class TopstrengthTopneedsComponent implements OnInit {
  public topstrengthTopneedsFormGroup: FormGroup;
  selectedOrgs: any[] = []; //every OrgType and OrgName will be a node
  selectedRaces: any[] = [];
  selectedGenders: any[] = [];
  onlyLeafNodes: string[] = []; //here we only pass in the leaf nodes, i.e. OrgNames
  selectedAssessmentTypes: string[] = [];
  finalString = '?';
  // Initialise to return all race and gender first
  raceString = 'race=Chinese&race=Malay&race=Indian&race=Others';
  genderString = 'gender=Male&gender=Female';
  messages: Message[] = [];
  color: string = '';
  // eslint-disable-next-line prettier/prettier
  constructor(
    public topstrengthTopneedsServiceService: TopstrengthTopneedsServiceService,
    private formBuilder: FormBuilder,
    public dashboardPresentationService: DashboardPresentationService
  ) {
    var startDate = new Date();
    startDate.setFullYear(2020);
    var endDate = new Date();
    this.topstrengthTopneedsFormGroup = this.formBuilder.group({
      startDate: [startDate, [Validators.required]],
      endDate: [endDate, [Validators.required]],
      startAge: [
        topstrengthTopneedsServiceService.startAge$.value[0]
          .individualRangeCode,
        [Validators.required],
      ],
      endAge: [
        topstrengthTopneedsServiceService.endAge$.value[0].individualRangeCode,
        [Validators.required],
      ],
    });
  }

  ngOnInit(): void {
    this.selectedOrgs = new Array();
    this.selectedAssessmentTypes = new Array();
    this.messages = new Array();
    this.topstrengthTopneedsServiceService.topstrengthTopneedsChartParams$.next(
      this.topstrengthTopneedsFormGroup.getRawValue()
    );
    this.messages = [];
    this.topstrengthTopneedsServiceService.getGender();
    this.topstrengthTopneedsServiceService.getRace();
  }

  logSelectedRaces(): void {
    //this.raceString = '';
    if (this.selectedRaces.length > 0) {
      for (let i = 0; i < this.selectedRaces.length; ++i) {
        this.raceString += `race=` + this.selectedRaces[i] + '&';
      }
    }
    this.raceString = this.raceString.substring(0, this.raceString.length - 1);
    this.topstrengthTopneedsServiceService.getTopstrengthDisplayData(
      this.createFinalString(this.raceString, this.genderString)
    );
    this.topstrengthTopneedsServiceService.getTopneedsDisplayData(
      this.createFinalString(this.raceString, this.genderString)
    );
  }

  logSelectedGenders(): void {
    this.genderString = '';
    if (this.selectedGenders.length > 0) {
      for (let i = 0; i < this.selectedGenders.length; ++i) {
        this.genderString += `gender=` + this.selectedGenders[i] + '&';
      }
    }
    this.genderString = this.genderString.substring(
      0,
      this.genderString.length - 1
    );
    this.topstrengthTopneedsServiceService.getTopstrengthDisplayData(
      this.createFinalString(this.raceString, this.genderString)
    );
    this.topstrengthTopneedsServiceService.getTopneedsDisplayData(
      this.createFinalString(this.raceString, this.genderString)
    );
  }

  createFinalString(raceString: string, genderString: string): string {
    return '?' + raceString + '&' + genderString;
  }

  updateInformationSelection() {
    const start_date =
      this.topstrengthTopneedsFormGroup.get('startDate')?.value;
    const end_date = this.topstrengthTopneedsFormGroup.get('endDate')?.value;
    const start_age = this.topstrengthTopneedsFormGroup.get('startAge')?.value;
    const end_age = this.topstrengthTopneedsFormGroup.get('endAge')?.value;
    const age_group = start_age + '-' + end_age;
    this.topstrengthTopneedsServiceService.ageValidator(end_age);

    this.topstrengthTopneedsServiceService.topstrengthTopneedsChartParams$.next(
      {
        start_date,
        end_date,
        age_group,
      }
    );
  }
  sendColorToService() {
    this.topstrengthTopneedsServiceService.logColor(this.color);
  }
}
