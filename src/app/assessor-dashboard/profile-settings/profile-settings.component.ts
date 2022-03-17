import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.sass'],
})
export class ProfileSettingsComponent implements OnInit {
  constructor(public navbarService: NavbarService) {}

  ngOnInit(): void {}
}
