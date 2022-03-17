import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-expired-caseworker-table',
  templateUrl: './expired-caseworker-table.component.html',
  styleUrls: ['./expired-caseworker-table.component.sass'],
})
export class ExpiredCaseworkerTableComponent implements OnInit {
  expiredCaseworkers: any[] = [];
  expiredAssessorsName$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  title: string = '';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.apiService
      .authenticatedGet<any>(
        '/cans-backend-rws/Resources/AssessorVisualisation/expiredCaseworkerTable',
        {}
      )
      .subscribe((response) => {
        this.title = response.title;
        const datas: any[] = response.data;
        const labels: [] = response.labels;
        const count = datas.length;
        for (let i = 0; i < count; i++) {
          if (datas[i] != null) {
            const data = {
              dateOfCert: datas[i].dateOfCert.substring(0, 10),
              certificateId: datas[i].certificationId,
              name: labels[i],
            };
            this.expiredCaseworkers.push(data);
          } else {
            const data = {
              dateOfCert: 'Not Taken',
              certificateId: 'null',
              name: labels[i],
            };
            this.expiredCaseworkers.push(data);
          }
          if (i == count - 1) {
            this.expiredAssessorsName$.next(this.expiredCaseworkers);
          }
        }
        console.log('sdfs');
        console.log(response.data);
      });
  }
}
