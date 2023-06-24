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
import { ClientGroupComponent } from './components/client-group/client-group.component';
import { ClientGroupEditorComponent } from './components/client-group-editor/client-group-editor.component';

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
        title: 'Подразделения',
      },
      {
        path: 'position',
        component: PositionComponent,
        pathMatch: 'full',
        title: 'Должности',
      },
      {
        path: 'employee',
        component: EmployeeComponent,
        pathMatch: 'full',
        title: 'Сотрудники',
      },
      {
        path: 'company',
        component: CompanyComponent,
        pathMatch: 'full',
        title: 'Компании',
      },
      {
        path: 'personal',
        component: PersonalSettingsComponent,
        pathMatch: 'full',
        title: 'Личные настройки',
      },
      {
        path: 'client-group',
        component: ClientGroupComponent,
        pathMatch: 'full',
        title: 'Группы клиентов'
      },
    ]
  },
  {
    path: 'position/add',
    component: PositionEditorComponent,
    pathMatch: 'full',
    title: 'Добавление должности',
  },
  {
    path: 'position/:id',
    component: PositionEditorComponent,
    pathMatch: 'full',
    title: 'Редактирование должности',
  },
  {
    path: 'department/add',
    component: DepartmentEditorComponent,
    pathMatch: 'full',
    title: 'Добавление подразделения',
  },
  {
    path: 'department/:id',
    component: DepartmentEditorComponent,
    pathMatch: 'full',
    title: 'Редактирование подразделения',
  },
  {
    path: 'employee/add',
    component: EmployeeEditorComponent,
    pathMatch: 'full',
    title: 'Добавление сотрудника',
  },
  {
    path: 'employee/:id',
    component: EmployeeEditorComponent,
    pathMatch: 'full',
    title: 'Редактирование сотрудника',
  },
  {
    path: 'company/add',
    component: CompanyEditorComponent,
    pathMatch: 'full',
    title: 'Добавление компании',
  },
  {
    path: 'company/:id',
    component: CompanyEditorComponent,
    pathMatch: 'full',
    title: 'Редактирование компании',
  },
  {
    path: 'client-group/add',
    component: ClientGroupEditorComponent,
    pathMatch: 'full',
    title: 'Добавление группы клиентов',
  },
  {
    path: 'client-group/:id',
    component: ClientGroupEditorComponent,
    pathMatch: 'full',
    title: 'Редактирование группы клиентов',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
