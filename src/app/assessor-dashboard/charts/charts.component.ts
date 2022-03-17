import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { DashboardPresentationService } from './dashboard-presentation.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {
  constructor(
    public dashboardPresentationService: DashboardPresentationService,
    public navbarService: NavbarService
  ) {}

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.dashboardPresentationService.goPrevious();
    }

    if (event.key === 'ArrowRight') {
      this.dashboardPresentationService.goNext();
    }

    if (event.key === 'Escape') {
      this.dashboardPresentationService.exitPresent();
    }
  }
}
