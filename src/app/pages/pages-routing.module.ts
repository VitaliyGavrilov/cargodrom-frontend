import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitComponent } from './components/bit/bit.component';
import { ClientComponent } from './components/client/client.component';
import { ContractorEditorComponent } from './components/contractor-editor/contractor-editor.component';
import { ContractorComponent } from './components/contractor/contractor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GuideComponent } from './components/guide/guide.component';
import { OrderComponent } from './components/order/order.component';
import { ReportComponent } from './components/report/report.component';
import { RequestComponent } from './components/request/request.component';
import { TariffComponent } from './components/tariff/tariff.component';
import { PagesComponent } from './pages.component';


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
        path: 'contractor/:id',
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
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
