import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAssessorDialogComponent } from './create-assessor-dialog/create-assessor-dialog.component';
import { DeleteAssessorDialogComponent } from './delete-assessor-dialog/delete-assessor-dialog.component';
import { UpdateSpecificAssessorComponent } from './view-specific-assessor/update-specific-assessor/update-specific-assessor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AssessorManagementRoutingModule } from './assessor-management-routing.module';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';
import { AssessorManagementModuleComponent } from './assessor-management-module.component';
import { ViewSpecificAssessorComponent } from './view-specific-assessor/view-specific-assessor.component';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleAssessorActiveDialogComponent } from './toggle-assessor-active-dialog/toggle-assessor-active-dialog.component';
import { Card, CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    CreateAssessorDialogComponent,
    DeleteAssessorDialogComponent,
    UpdateSpecificAssessorComponent,
    ViewSpecificAssessorComponent,
    AssessorManagementModuleComponent,
    ToggleAssessorActiveDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AssessorManagementRoutingModule,
    SharedComponentsModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    TableModule,
    ConfirmPopupModule,
    MessagesModule,
    AutoCompleteModule,
    InputTextModule,
    CardModule
  ],
  exports: [AssessorManagementModuleComponent],
})
export class AssessorManagementModule {}
