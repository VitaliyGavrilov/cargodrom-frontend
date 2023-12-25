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
import { RequestEditorComponent } from './components/request-editor/request-editor.component';
import { TariffComponent } from './components/tariff/tariff.component';
import { PagesComponent } from './pages.component';
import { ClientEditorComponent } from './components/client-editor/client-editor.component';


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
        title: 'Дашбоард',
      },
      {
        path: 'request',
        component: RequestComponent,
        pathMatch: 'full',
        title: 'Запросы',

      },
      {
        path: 'request/:id',
        component: RequestEditorComponent,
        pathMatch: 'full',
        title: 'Добавление запроса',

      },
      {
        path: 'request/add',
        component: RequestEditorComponent,
        pathMatch: 'full',
        title: 'Добавление запроса',
      },
      {
        path: 'bit',
        component: BitComponent,
        pathMatch: 'full',
        title: 'Ставки',
      },
      {
        path: 'order',
        component: OrderComponent,
        title: 'Заказы',
      },
      {
        path: 'tariff',
        component: TariffComponent,
        pathMatch: 'full',
        title: 'Тарифы',
      },
      {
        path: 'contractor',
        component: ContractorComponent,
        pathMatch: 'full',
        title: 'Подрядчики',
      },
      {
        path: 'contractor/add',
        component: ContractorEditorComponent,
        pathMatch: 'full',
        title: 'Добавление подрядчика',
      },
      {
        path: 'contractor/:id',
        component: ContractorEditorComponent,
        pathMatch: 'full',
        title: 'Редактирование подрядчика',
      },
      {
        path: 'report',
        component: ReportComponent,
        pathMatch: 'full',
        title: 'Отчеты',
      },
      {
        path: 'client',
        component: ClientComponent,
        pathMatch: 'full',
        title: 'Клиенты',
      },
      {
        path: 'client/add',
        component: ClientEditorComponent,
        pathMatch: 'full',
        title: 'Добавление клиента',
      },
      {
        path: 'client/:id',
        component: ClientEditorComponent,
        pathMatch: 'full',
        title: 'Редактирование клиента',
      },
      {
        path: 'guide',
        component: GuideComponent,
        pathMatch: 'full',
        title: 'Справочник',
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
