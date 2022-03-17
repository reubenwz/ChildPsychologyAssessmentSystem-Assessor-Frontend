import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationManagementModuleDashboardComponent } from './organisation-management-module-dashboard.component';

describe('OrganisationManagementModuleDashboardComponent', () => {
  let component: OrganisationManagementModuleDashboardComponent;
  let fixture: ComponentFixture<OrganisationManagementModuleDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationManagementModuleDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationManagementModuleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
