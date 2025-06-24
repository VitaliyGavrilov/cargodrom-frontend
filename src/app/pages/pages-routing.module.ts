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
import { AuthGuard } from '../auth/auth.guard';
import { RequestEditorTranslateComponent } from './components/request-editor-translate/request-editor-translate.component';
import { RequestRateComponent } from './components/request-rate/request-rate.component';
import { RequestDetails } from './components/request-details/request-details.component';
import { OfferEditorComponent } from './components/offer-editor/offer-editor.component';
import { OrderEditorComponent } from './components/order-editor/order-editor.component';
import { TestPage } from './components/test-page/test-page.component';
// import { RequestPage } from './places/request/request.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'test',
        component: TestPage,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
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
        // canActivate: [AuthGuard],
      },
      {
        path: 'offer/:id',
        component: OfferEditorComponent,
        pathMatch: 'full',
        title: 'Добавление кп',
        canActivate: [AuthGuard],
      },
      {
        path: 'request',
        component: RequestComponent,
        pathMatch: 'full',
        title: 'Запросы',
        canActivate: [AuthGuard],

      },
      // {
      //   path: 'new-request',
      //   component: RequestPage,
      //   pathMatch: 'full',
      //   title: 'Запросы',
      //   canActivate: [AuthGuard],

      // },
      {
        path: 'request/edit/:id',
        component: RequestEditorComponent,
        pathMatch: 'full',
        title: 'Редактирование запроса',
        canActivate: [AuthGuard],

      },
      {
        path: 'request/add',
        component: RequestEditorComponent,
        pathMatch: 'full',
        title: 'Добавление запроса',
        canActivate: [AuthGuard],
      },
      {
        path: 'request/edit/translate/:id',
        component: RequestEditorTranslateComponent,
        pathMatch: 'full',
        title: 'Проверка перевода запроса',
        canActivate: [AuthGuard],
      },
      {
        path: 'request/rate/:uid',
        component: RequestRateComponent,
        pathMatch: 'full',
        title: 'Rate',
        // canActivate: [AuthGuard],
      },
      {
        path: 'request/details/final/:id',
        component: RequestDetails,
        pathMatch: 'full',
        title: 'Request Details',
        canActivate: [AuthGuard],
      },
      {
        path: 'request/details/customs/:id',
        component: RequestDetails,
        pathMatch: 'full',
        title: 'Request Details',
        canActivate: [AuthGuard],
      },
      {
        path: 'request/details/point/:id',
        component: RequestDetails,
        pathMatch: 'full',
        title: 'Request Details',
        canActivate: [AuthGuard],
      },
      {
        path: 'request/details/transporter/:id',
        component: RequestDetails,
        pathMatch: 'full',
        title: 'Request Details',
        canActivate: [AuthGuard],
      },
      {
        path: 'request/details/other/:id',
        component: RequestDetails,
        pathMatch: 'full',
        title: 'Request Details',
        canActivate: [AuthGuard],
      },
      {
        path: 'request/bidding/:id',
        component: ContractorComponent,
        pathMatch: 'full',
        title: 'Торги запроса',
        canActivate: [AuthGuard],
      },
      {
        path: 'bit',
        component: BitComponent,
        pathMatch: 'full',
        title: 'Ставки',
        canActivate: [AuthGuard],
      },
      {
        path: 'order/transportation',
        component: OrderComponent,
        title: 'Заказы',
        canActivate: [AuthGuard],
      },
      {
        path: 'order/docs',
        component: OrderComponent,
        title: 'Заказы',
        canActivate: [AuthGuard],
      },
      {
        path: 'order/add',
        component: OrderEditorComponent,
        title: 'Новый заказ',
        canActivate: [AuthGuard],
      },
      {
        path: 'order/edit/:id',
        component: OrderEditorComponent,
        title: 'Редактирование заказа',
        canActivate: [AuthGuard],
      },
      {
        path: 'tariff',
        component: TariffComponent,
        pathMatch: 'full',
        title: 'Тарифы',
        canActivate: [AuthGuard],
      },
      {
        path: 'contractor',
        component: ContractorComponent,
        pathMatch: 'full',
        title: 'Подрядчики',
        canActivate: [AuthGuard],
      },
      {
        path: 'contractor/add',
        component: ContractorEditorComponent,
        pathMatch: 'full',
        title: 'Добавление подрядчика',
        canActivate: [AuthGuard],
      },
      {
        path: 'contractor/edit/:id',
        component: ContractorEditorComponent,
        pathMatch: 'full',
        title: 'Редактирование подрядчика',
        canActivate: [AuthGuard],
      },
      {
        path: 'report',
        component: ReportComponent,
        pathMatch: 'full',
        title: 'Отчеты',
        canActivate: [AuthGuard],
      },
      {
        path: 'customer',
        component: ClientComponent,
        pathMatch: 'full',
        title: 'Клиенты',
        canActivate: [AuthGuard],
      },
      {
        path: 'customer/add',
        component: ClientEditorComponent,
        pathMatch: 'full',
        title: 'Добавление клиента',
        canActivate: [AuthGuard],
      },
      {
        path: 'customer/edit/:id',
        component: ClientEditorComponent,
        pathMatch: 'full',
        title: 'Редактирование клиента',
        canActivate: [AuthGuard],
      },
      {
        path: 'guide',
        component: GuideComponent,
        pathMatch: 'full',
        title: 'Справочник',
        canActivate: [AuthGuard],
      },
      {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
