import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { PositionComponent } from './components/position/position.component';
import { DepartmentComponent } from './components/department/department.component';


@NgModule({
  declarations: [
    SettingsComponent,
    EmployeeComponent,
    PositionComponent,
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
