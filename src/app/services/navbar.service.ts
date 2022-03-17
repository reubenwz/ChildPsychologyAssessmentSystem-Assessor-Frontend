import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavbarItem } from './navbar-item';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  public visible: boolean = true;
  private assessorItems$: BehaviorSubject<NavbarItem[]> = new BehaviorSubject<
    NavbarItem[]
  >([
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: '/dashboard',
    },
    // {
    //   label: 'Charts',
    //   icon: 'pi pi-fw pi-chart-bar',
    //   routerLink: '/dashboard/charts',
    // },
    // {
    //   label: 'Clients',
    //   icon: 'pi pi-fw pi-users',
    //   routerLink: '/dashboard/clients',
    // },
    {
      label: 'Certification',
      icon: 'pi pi-fw pi-book',
      routerLink: '/dashboard/certification',
    },
    {
      label: 'Validation',
      icon: 'pi pi-fw pi-check',
      routerLink: '/dashboard/validation',
    },
    // {
    //   label: 'Download Data',
    //   icon: 'pi pi-fw pi-download',
    //   routerLink: '/dashboard/data-download',
    // },
    // {
    //   label: 'Generate Report',
    //   icon: 'pi pi-fw pi-file',
    //   routerLink: '/dashboard',
    // },
    // {
    //   label: 'Assessments',
    //   icon: 'pi pi-fw pi-pencil',
    //   routerLink: '/dashboard',
    // },
    // {
    //   label: 'Notifications',
    //   icon: 'pi pi-fw pi-bell',
    //   routerLink: '/dashboard',
    // },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      routerLink: '/dashboard/profile-settings',
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-sign-out',
      routerLink: '/auth/logout',
    },
  ]);

  private rootItems$: BehaviorSubject<NavbarItem[]> = new BehaviorSubject<
    NavbarItem[]
  >([
    // {
    //   label: 'Home',
    //   icon: 'pi pi-fw pi-home',
    //   routerLink: '/dashboard',
    // },
    {
      label: 'Charts',
      icon: 'pi pi-fw pi-chart-bar',
      routerLink: '/dashboard/charts',
    },
    {
      label: 'Clients',
      icon: 'pi pi-fw pi-users',
      routerLink: '/dashboard/clientsAll',
    },
    {
      label: 'Certification',
      icon: 'pi pi-fw pi-book',
      routerLink: '/dashboard/certification',
    },
    {
      label: 'Validation',
      icon: 'pi pi-fw pi-check',
      routerLink: '/dashboard/validation',
    },
    {
      label: 'Employee Management',
      icon: 'pi pi-fw pi-users',
      routerLink: '/dashboard/organisations',
    },
    // {
    //   label: 'Generate Report',
    //   icon: 'pi pi-fw pi-file',
    //   routerLink: '/dashboard',
    // },
    // {
    //   label: 'Assessments',
    //   icon: 'pi pi-fw pi-pencil',
    //   routerLink: '/dashboard',
    // },
    // {
    //   label: 'Notifications',
    //   icon: 'pi pi-fw pi-bell',
    //   routerLink: '/dashboard',
    // },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      routerLink: '/dashboard/profile-settings',
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-sign-out',
      routerLink: '/auth/logout',
    },
  ]);

  public items$: BehaviorSubject<NavbarItem[]> = new BehaviorSubject<
    NavbarItem[]
  >([]);

  constructor(private storageService: StorageService) {
    this.hideMenu();
  }

  determineNavBarItems() {
    const currAss = this.storageService.retrieveJsonData('currentAssessor');
    const currUserRole = currAss.role;
    if (currUserRole === 'assessor') {
      this.items$ = this.assessorItems$;
    } else if (currUserRole === 'root') {
      this.items$ = this.rootItems$;
    }
  }

  public toggleMenu(): void {
    if (this.visible) {
      this.hideMenu();
    } else {
      this.showMenu();
    }
  }

  public showMenu(): void {
    this.visible = true;
  }

  public hideMenu(): void {
    this.visible = false;
  }
}
