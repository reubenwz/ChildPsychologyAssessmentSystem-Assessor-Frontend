import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationManagementModuleDashboardComponent } from './organisation-management-module-dashboard.component';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: OrganisationManagementModuleDashboardComponent,
  },
  {
    path: ':id',
    component: OrganisationManagementModuleDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganisationManagementRoutingModule {}
