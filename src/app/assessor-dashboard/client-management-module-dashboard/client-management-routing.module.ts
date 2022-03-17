import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientManagementModuleDashboardComponent } from './client-management-module-dashboard.component';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: ClientManagementModuleDashboardComponent,
  },
  {
    path: ':id',
    component: ClientManagementModuleDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientManagementRoutingModule {}
