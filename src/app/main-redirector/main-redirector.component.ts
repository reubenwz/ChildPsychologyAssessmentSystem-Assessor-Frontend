import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-redirector',
  templateUrl: './main-redirector.component.html',
  styleUrls: ['./main-redirector.component.sass'],
})
export class MainRedirectorComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  /**
   * Redirect the user based on their token status
   * Logged in user -> go to dashboard
   * Not logged in user -> go to login
   */
  ngOnInit(): void {
    this.apiService.hasToken().subscribe((result) => {
      if (result) {
        this.router.navigateByUrl('/dashboard', { replaceUrl: true });
      } else {
        this.router.navigateByUrl('/auth/login', { replaceUrl: true });
      }
    });
  }
}
