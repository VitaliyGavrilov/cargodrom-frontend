import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cargodrom/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { PositionComponent } from './components/position/position.component';
import { DepartmentComponent } from './components/department/department.component';
import { PositionEditorComponent } from './components/position-editor/position-editor.component';
import { DepartmentEditorComponent } from './components/department-editor/department-editor.component';
import { EmployeeEditorComponent } from './components/employee-editor/employee-editor.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyEditorComponent } from './components/company-editor/company-editor.component';
import { DepartmentEmployeeComponent } from './components/department-employee/department-employee.component';
import { PersonalSettingsComponent } from './components/personal-settings/personal-settings.component';
import { ClientGroupComponent } from './components/client-group/client-group.component';
import { ClientGroupEditorComponent } from './components/client-group-editor/client-group-editor.component';
import { GridTableComponent } from '../../table/components/simple-table/grid-table.component';
import { FilterListComponent } from './components/filter-list/filter-list.component';
import { AddPopupComponent } from './components/popap-table_filter-editor/popap-table_filter-editor.component';
import { PagesModule } from '../../pages.module';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { BrandingComponent } from './components/branding/branding.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SettingsComponent,
    EmployeeComponent,
    PositionComponent,
    DepartmentComponent,
    PositionEditorComponent,
    DepartmentEditorComponent,
    EmployeeEditorComponent,
    CompanyComponent,
    CompanyEditorComponent,
    DepartmentEmployeeComponent,
    PersonalSettingsComponent,
    ClientGroupComponent,
    ClientGroupEditorComponent,
    FilterListComponent,
    GridTableComponent,
    AddPopupComponent,
    GeneralSettingsComponent,
    NotificationsComponent,
    BrandingComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    // PagesModule,
    SharedModule,
]
})
export class SettingsModule { }
