import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CardModule } from 'primeng/card';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AssessmentComponent } from './assessment/assessment.component';
import { CreateAssessmentComponent } from './create-assessment/create-assessment.component';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PaginatorModule } from 'primeng/paginator';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { AssessmentFormComponent } from './create-assessment/assessment-form/assessment-form.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CreateCaretakerAssessmentComponent } from './create-caretaker-assessment/create-caretaker-assessment.component';
import { CaretakerAssessmentFormComponent } from './create-caretaker-assessment/caretaker-assessment-form/caretaker-assessment-form.component';
import { ChartsComponent } from './charts/charts.component';
import { TopstrengthTopneedsComponent } from './charts/topstrength-topneeds/topstrength-topneeds.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeSelectModule } from 'primeng/treeselect';
import { CalendarModule } from 'primeng/calendar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TabViewModule } from 'primeng/tabview';
import { ReactiveFormsModule } from '@angular/forms';
import { AgePiechartComponent } from './charts/age-piechart/age-piechart.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToolbarModule } from 'primeng/toolbar';
import { GenderPiechartComponent } from './charts/gender-piechart/gender-piechart.component';
import { RacePiechartComponent } from './charts/race-piechart/race-piechart.component';
import { ToptraumaTraumapercentageComponent } from './charts/toptrauma-traumapercentage/toptrauma-traumapercentage.component';
import { AverageResponseDomainComponent } from './charts/average-response-domain/average-response-domain.component';
import { LocComponent } from './charts/loc/loc.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { UpdatePasswordFormComponent } from './profile-settings/update-password-form/update-password-form.component';
import { UpdateProfileFormComponent } from './profile-settings/update-profile-form/update-profile-form.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { CertificationComponent } from './certification/certification.component';
import { ViewSpecificCertificationDialogComponent } from './certification/view-specific-certification-dialog/view-specific-certification-dialog.component';
import { CreateCertificationDialogComponent } from './certification/create-certification-dialog/create-certification-dialog.component';
import { UpdateSpecificCertificationComponent } from './certification/view-specific-certification-dialog/update-specific-certification/update-specific-certification.component';
import { ValidationComponent } from './validation/validation.component';
import { ApproveAssessmentComponent } from './approve-assessment/approve-assessment.component';
import { CreateClientDialogComponent } from './client-management-module-dashboard/create-client-dialog/create-client-dialog.component';
import { DeleteSpecificClientDialogComponent } from './client-management-module-dashboard/delete-specific-client-dialog/delete-specific-client-dialog.component';
import { RolesPiechartComponent } from './charts/roles-piechart/roles-piechart.component';
import { RecertifiedBarchartComponent } from './charts/recertified-barchart/recertified-barchart.component';
import { ScoresLinechartComponent } from './charts/scores-linechart/scores-linechart.component';
import { ExpiredCaseworkerTableComponent } from './charts/expired-caseworker-table/expired-caseworker-table.component';
import { ExpiredSoonCaseworkerTableComponent } from './charts/expired-soon-caseworker-table/expired-soon-caseworker-table.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitterModule } from 'primeng/splitter';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";

@NgModule({
  declarations: [
    MainDashboardComponent,
    AssessmentComponent,
    CreateAssessmentComponent,
    AssessmentFormComponent,
    CreateCaretakerAssessmentComponent,
    CaretakerAssessmentFormComponent,
    ChartsComponent,
    TopstrengthTopneedsComponent,
    AgePiechartComponent,
    GenderPiechartComponent,
    RacePiechartComponent,
    ToptraumaTraumapercentageComponent,
    AverageResponseDomainComponent,
    LocComponent,
    ProfileSettingsComponent,
    UpdatePasswordFormComponent,
    UpdateProfileFormComponent,
    CertificationComponent,
    ViewSpecificCertificationDialogComponent,
    CreateCertificationDialogComponent,
    UpdateSpecificCertificationComponent,
    ValidationComponent,
    ApproveAssessmentComponent,
    CreateClientDialogComponent,
    DeleteSpecificClientDialogComponent,
    CreateAssessmentComponent,
    RolesPiechartComponent,
    RecertifiedBarchartComponent,
    ScoresLinechartComponent,
    ExpiredCaseworkerTableComponent,
    ExpiredSoonCaseworkerTableComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CardModule,
    SharedComponentsModule,
    TableModule,
    ButtonModule,
    OverlayPanelModule,
    DropdownModule,
    SelectButtonModule,
    PaginatorModule,
    StepsModule,
    ToastModule,
    InputTextareaModule,
    MultiSelectModule,
    TreeSelectModule,
    CalendarModule,
    MessageModule,
    MessagesModule,
    ReactiveFormsModule,
    ColorPickerModule,
    ToolbarModule,
    TabViewModule,
    ConfirmDialogModule,
    DialogModule,
    ProgressSpinnerModule,
    SplitterModule,
    ProgressBarModule,
    TableModule,
    TagModule,
    AccordionModule,
    ToggleButtonModule,
    InputTextModule,
    RippleModule,
  ],
})
export class DashboardModule { }
