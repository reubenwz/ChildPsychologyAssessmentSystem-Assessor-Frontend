import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManagementModuleDashboardComponent } from './client-management-module-dashboard.component';

describe('ClientManagementModuleDashboardComponent', () => {
  let component: ClientManagementModuleDashboardComponent;
  let fixture: ComponentFixture<ClientManagementModuleDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientManagementModuleDashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientManagementModuleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
