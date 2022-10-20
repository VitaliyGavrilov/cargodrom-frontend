import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyEditorComponent } from './components/company-editor/company-editor.component';
import { CompanyComponent } from './components/company/company.component';
import { DepartmentEditorComponent } from './components/department-editor/department-editor.component';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeEditorComponent } from './components/employee-editor/employee-editor.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { PersonalSettingsComponent } from './components/personal-settings/personal-settings.component';
import { PositionEditorComponent } from './components/position-editor/position-editor.component';
import { PositionComponent } from './components/position/position.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        redirectTo: 'company',
        pathMatch: 'full',
      },
      {
        path: 'department',
        component: DepartmentComponent,
        pathMatch: 'full',
      },
      {
        path: 'position',
        component: PositionComponent,
        pathMatch: 'full',
      },
      {
        path: 'employee',
        component: EmployeeComponent,
        pathMatch: 'full',
      },
      {
        path: 'company',
        component: CompanyComponent,
        pathMatch: 'full',
      },
      {
        path: 'personal',
        component: PersonalSettingsComponent,
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'position/add',
    component: PositionEditorComponent,
    pathMatch: 'full',
  },
  {
    path: 'position/:id',
    component: PositionEditorComponent,
    pathMatch: 'full',
  },
  {
    path: 'department/add',
    component: DepartmentEditorComponent,
    pathMatch: 'full',
  },
  {
    path: 'department/:id',
    component: DepartmentEditorComponent,
    pathMatch: 'full',
  },
  {
    path: 'employee/add',
    component: EmployeeEditorComponent,
    pathMatch: 'full',
  },
  {
    path: 'employee/:id',
    component: EmployeeEditorComponent,
    pathMatch: 'full',
  },
  {
    path: 'company/add',
    component: CompanyEditorComponent,
    pathMatch: 'full',
  },
  {
    path: 'company/:id',
    component: CompanyEditorComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
