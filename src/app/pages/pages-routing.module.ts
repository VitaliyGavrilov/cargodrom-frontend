import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../auth/auth.guard';
import { UserGuard } from '../auth/user.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'bit',
        loadChildren: () => import('./modules/bit/bit.module').then(m => m.BitModule),
      },
      {
        path: 'tariff',
        loadChildren: () => import('./modules/tariff/tariff.module').then(m => m.TariffModule),
      },
      {
        path: 'report',
        loadChildren: () => import('./modules/report/report.module').then(m => m.ReportModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'message',
        loadChildren: () => import('./modules/message/message.module').then(m => m.MessageModule),
      },
      {
        path: 'guide',
        loadChildren: () => import('./modules/guide/guide.module').then(m => m.GuideModule),
      },
      {
        path: 'order',
        loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule),
      },
      {
        path: 'customer',
        loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule),
      },
      {
        path: 'request',
        loadChildren: () => import('./modules/request/request.module').then(m => m.RequestModule),
      },
      {
        path: 'contractor',
        loadChildren: () => import('./modules/contractor/contractor.module').then(m => m.ContractorModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full', },
    ]
  },
  {
    path: '',
    // canActivate: [UserGuard],
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule),
  },
  {
    path: '',
    // canActivate: [UserGuard],
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
  },
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full', },
  { path: 'rate', redirectTo: 'request-rates/5191ebbc0ba015a608f285b78b524449' },
  { path: 'rate_request:uid', redirectTo: 'request-rates/:uid' },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
