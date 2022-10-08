import { PositionComponent } from './components/position/position.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentComponent } from './components/department/department.component';
import { ContractorComponent } from './components/contractor/contractor.component';
import { RequestComponent } from './components/request/request.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { BitComponent } from './components/bit/bit.component';
import { TariffComponent } from './components/tariff/tariff.component';
import { ReportComponent } from './components/report/report.component';
import { ClientComponent } from './components/client/client.component';
import { GuideComponent } from './components/guide/guide.component';
import { ContractorEditorComponent } from './components/contractor-editor/contractor-editor.component';
import { SettingsComponent } from './components/settings/settings.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
      },
      {
        path: 'request',
        component: RequestComponent,
        pathMatch: 'full',
      },
      {
        path: 'bit',
        component: BitComponent,
        pathMatch: 'full',
      },
      {
        path: 'order',
        component: OrderComponent,
        pathMatch: 'full',
      },
      {
        path: 'tariff',
        component: TariffComponent,
        pathMatch: 'full',
      },
      {
        path: 'contractor',
        component: ContractorComponent,
        pathMatch: 'full',
      },
      {
        path: 'contractor/edit/:id',
        component: ContractorEditorComponent,
        pathMatch: 'full',
      },
      {
        path: 'contractor/add',
        component: ContractorEditorComponent,
        pathMatch: 'full',
      },
      {
        path: 'report',
        component: ReportComponent,
        pathMatch: 'full',
      },
      {
        path: 'client',
        component: ClientComponent,
        pathMatch: 'full',
      },
      {
        path: 'guide',
        component: GuideComponent,
        pathMatch: 'full',
      },
      {
        path: 'settings',
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
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
