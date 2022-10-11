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


@NgModule({
  declarations: [
    SettingsComponent,
    EmployeeComponent,
    PositionComponent,
    DepartmentComponent,
    PositionEditorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
