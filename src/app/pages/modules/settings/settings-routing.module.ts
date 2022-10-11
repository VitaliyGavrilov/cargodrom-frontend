import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentEditorComponent } from './components/department-editor/department-editor.component';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeComponent } from './components/employee/employee.component';
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
        redirectTo: 'department',
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
      }
    ]
  },
  {
    path: 'position/add',
    component: PositionEditorComponent,
    pathMatch: 'full',
  },
  {
    path: 'position/edit/:id',
    component: PositionEditorComponent,
    pathMatch: 'full',
  },
  {
    path: 'department/add',
    component: DepartmentEditorComponent,
    pathMatch: 'full',
  },
  {
    path: 'department/edit/:id',
    component: DepartmentEditorComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
