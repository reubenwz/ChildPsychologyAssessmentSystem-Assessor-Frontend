import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSpecificAssessorComponent } from './view-specific-assessor/view-specific-assessor.component';

const routes: Routes = [
  {
    path: ':id',
    component: ViewSpecificAssessorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessorManagementRoutingModule {}
