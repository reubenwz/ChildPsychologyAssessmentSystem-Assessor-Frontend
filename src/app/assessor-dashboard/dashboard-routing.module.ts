import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { CreateAssessmentComponent } from './create-assessment/create-assessment.component';
import { AssessmentFormComponent } from './create-assessment/assessment-form/assessment-form.component';
import { CreateCaretakerAssessmentComponent } from './create-caretaker-assessment/create-caretaker-assessment.component';
import { CaretakerAssessmentFormComponent } from './create-caretaker-assessment/caretaker-assessment-form/caretaker-assessment-form.component';
import { ChartsComponent } from './charts/charts.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { CertificationComponent } from './certification/certification.component';
import { ValidationComponent } from './validation/validation.component';
import { ApproveAssessmentComponent } from './approve-assessment/approve-assessment.component';
import { ViewSpecificClientDialogComponent } from './client-management-module-dashboard/view-specific-client-dialog/view-specific-client-dialog.component';
const routes: Routes = [
  {
    path: '',
    component: MainDashboardComponent,
  },
  {
    path: 'charts',
    component: ChartsComponent,
  },
  {
    path: 'certification',
    component: CertificationComponent,
  },
  {
    path: 'validation',
    component: ValidationComponent,
  },
  {
    path: 'approve-assessment/:id/:assessorName/:clientName/:reason',
    component: ApproveAssessmentComponent,
  },
  {
    path: 'profile-settings',
    component: ProfileSettingsComponent,
  },
  {
    path: 'assessment/:id/:kidId/:kidName/:kidAge',
    component: AssessmentComponent,
  },
  {
    path: 'organisations',
    loadChildren: () =>
      import(
        './organisation-management-module-dashboard/organisation-management.module'
      ).then((m) => m.OrganisationManagementModule),
  },
  {
    path: 'assessors',
    loadChildren: () =>
      import('./assessor-management-module/assessor-management.module').then(
        (m) => m.AssessorManagementModule
      ),
  },
  {
    path: 'clientsAll',
    loadChildren: () =>
      import(
        './client-management-module-dashboard/client-management.module'
      ).then((m) => m.ClientManagementModule),
  },
  {
    path: 'clientsDialog/:id',
    component: ViewSpecificClientDialogComponent,
  },
  {
    path: 'start-assessment/:kidId/:kidName/:kidAge/:assId', //pseudo wrapper
    component: CreateAssessmentComponent,
    children: [
      {
        outlet: 'assForm',
        path: 'assessment-form/:domainName/:kidAge',
        component: AssessmentFormComponent,
      },
      {
        outlet: 'assForm',
        path: 'assessment-form/:domainName/:kidAge/:assId',
        component: AssessmentFormComponent,
      },
    ],
  },
  {
    path: 'start-caretaker-assessment/:currentClientId/:caretakerId/:caretakerAssId/:currentClientName/:currentClientAge/:currentAssessmentUniqueId/:currentCaretakerName', //pseudo wrapper
    component: CreateCaretakerAssessmentComponent,
    children: [
      {
        outlet: 'caretakerAssessmentForm',
        path: 'caretaker-assessment-form/:domainName',
        component: CaretakerAssessmentFormComponent,
      },
      {
        outlet: 'caretakerAssessmentForm',
        path: 'caretaker-assessment-form/:domainName/:caretakerAssId',
        component: CaretakerAssessmentFormComponent,
      },
    ],
  },
  {
    path: 'resume-caretaker-assessment/:currentClientId/:caretakerAssessmentId',
    component: CreateCaretakerAssessmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
