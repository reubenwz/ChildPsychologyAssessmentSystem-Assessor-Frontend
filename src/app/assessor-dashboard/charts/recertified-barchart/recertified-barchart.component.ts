import { Component, OnInit } from '@angular/core';
import { RecertifiedBarchartServiceService } from './recertified-barchart-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { DashboardPresentationService } from '../dashboard-presentation.service';

@Component({
  selector: 'app-recertified-barchart',
  templateUrl: './recertified-barchart.component.html',
  styleUrls: ['./recertified-barchart.component.sass'],
})
export class RecertifiedBarchartComponent implements OnInit {
  messages: Message[] = [];
  color: string = '';

  constructor(
    public recertifiedBarchartService: RecertifiedBarchartServiceService,
    public dashboardPresentationService: DashboardPresentationService
  ) {
    var startDate = new Date();
    startDate.setFullYear(2020);
    var endDate = new Date();
  }

  ngOnInit(): void {
    this.messages = new Array();
    this.messages = [];
    this.recertifiedBarchartService.getDisplayData();
  }

  sendColorToService() {
    this.recertifiedBarchartService.logColor(this.color);
  }
}
