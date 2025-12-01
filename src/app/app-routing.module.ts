import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const config: ExtraOptions = {
  useHash: true,
  scrollPositionRestoration: 'enabled', // Восстанавливает позицию прокрутки
  anchorScrolling: 'enabled', // Позволяет прокрутку до якоря
  onSameUrlNavigation: 'reload' // Позволяет перезагружать страницу при переходе на тот же URL
};

const routes: Routes = [
  {
    path: '',//TODO: убрать pages
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  // },
  // Публичные роуты(Public)
  // { path: 'password_recovery', component: PasswordRecoveryComponent, canActivate: [UserGuard], title: 'Востановление пароля' },
  // // { path: 'rate_request/:uid', component: RequestRateComponent, title: 'Rates' },
  // { path: 'employee_register/:uid', component: EmployeeRegisterComponent, title: 'Employee Register' },
  // { path: 'login', component: LoginComponent, canActivate: [UserGuard], title: 'Вход в систему' },
  // { path: 'logout', component: LogoutComponent, title: 'Выход из системы'},
  // { path: 'register', component: RegisterComponent, canActivate: [UserGuard], title: 'Регистрация в системе'},
  // { path: 'confirm', component: ConfirmComponent, canActivate: [UserGuard], title: 'Код подтверждения'},
  // { path: 'confirm/:uid', component: ConfirmComponent, canActivate: [UserGuard], title: 'Код подтверждения' },
  // Редиректы(redirect)
  // { path: 'rate', redirectTo: 'request-rates/5191ebbc0ba015a608f285b78b524449' },
  // { path: 'rate_request:uid', redirectTo: 'request-rates/:uid' },

  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: '**', redirectTo: 'dashboard' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
