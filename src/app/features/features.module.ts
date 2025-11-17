import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FeaturesComponent } from './features.component';
import { HeaderFeaturesComponent } from './header/header.component';
import { AuthGuard } from '../auth/auth.guard';
import { UserGuard } from '../auth/user.guard';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    canActivate: [AuthGuard],
    children: [// фичи основные
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'requests',
        loadChildren: () => import('./requests/requests.module').then(m => m.RequestsModule),
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
      },
      {
        path: 'contractors',
        loadChildren: () => import('./contractors/contractors.module').then(m => m.ContractorsModule),
      },
      {
        path: 'customers',
        loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
      },
      {
        path: 'messages',
        loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
      },
      // редиректы основных фич
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  {// модуль публичных фич
    path: '',
    // canActivate: [UserGuard],
    loadChildren: () => import('./invatet/invatet.module').then(m => m.InvatetModule),
  },
  {// авторизация
    path: 'auth',
    canActivate: [UserGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  // Редиректы для тестов и быстрых переходов
  { path: 'rate', redirectTo: 'request/5191ebbc0ba015a608f285b78b524449'},
  { path: 'rate/:uid', redirectTo: 'request/:uid', },
  // Редиректы(redirect)
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  declarations:[
    FeaturesComponent,
    HeaderFeaturesComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
  // exports: [RouterModule]
})
export class FeaturesModule { }
