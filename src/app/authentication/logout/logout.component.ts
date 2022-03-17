import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { first, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass'],
})
export class LogoutComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router, private storageService: StorageService) {}

  ngOnInit(): void {
    this.apiService
      .getToken()
      .pipe(
        first(),
        switchMap((token) =>
          this.apiService.authenticatedDelete<any>(
            '/cans-backend-rws/Resources/Assessor/token/' + token
          )
        )
      )
      .subscribe(
        (response) => {
          // Successful, token deleted from server
          this.apiService.clearToken();
          this.router.navigate(['/']);
          this.storageService.removeData('currentAssessor');
          this.storageService.removeData('mostRecentCert');
        },
        (err: HttpErrorResponse) => {
          // Not successful, token might have already expired, clear it from client storage
          this.apiService.clearToken();
          this.router.navigate(['/']);
          this.storageService.removeData('currentAssessor');
          this.storageService.removeData('mostRecentCert');
        }
      );
  }
}
