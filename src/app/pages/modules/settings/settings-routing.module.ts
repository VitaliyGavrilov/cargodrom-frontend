import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeComponent } from './components/employee/employee.component';
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
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
