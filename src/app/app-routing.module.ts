import { AuthGuard } from './auth/auth.guard';
import { UserGuard } from './auth/user.guard';
import { LogoutComponent } from './auth/components/logout/logout.component';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import {ConfirmComponent} from "./auth/components/confirm/confirm.component";
import { RequestRateComponent } from './pages/components/request-rate/request-rate.component';
import { EmployeeRegisterComponent } from './pages/components/employee-register/employee-register.component';
import { PasswordRecoveryComponent } from './auth/components/password-recovery/password-recovery.component';
import { PagesModule } from './pages/pages.module';
import { FeaturesModule } from './features/features.module';

const config: ExtraOptions = {
  useHash: true,
  scrollPositionRestoration: 'enabled', // Восстанавливает позицию прокрутки
  anchorScrolling: 'enabled', // Позволяет прокрутку до якоря
  onSameUrlNavigation: 'reload' // Позволяет перезагружать страницу при переходе на тот же URL
};

const routes: Routes = [
  // { // Основные фичи(FeaturesModule)
  //   path: '',
  //   loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule),
  //   // canActivate: [AuthGuard]
  // },

  // // // { // Публичные фичи(FeaturesPublicModule)
  // // //   path: '',
  // // //   loadChildren: () => import('./features-public/features-public.module').then(m => m.FeaturesPublicModule),
  // // //   canActivate: [UserGuard]
  // // // },
  // // // { // Аутентификация(AuthModule)
  // // //   path: 'auth',
  // // //   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  // // //   canActivate: [UserGuard]
  // // // },





  // старая схема
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    // canActivate: [AuthGuard]
  },
  // Публичные роуты(Public)
  { path: 'password_recovery', component: PasswordRecoveryComponent, canActivate: [UserGuard], title: 'Востановление пароля' },
  { path: 'rate_request/:uid', component: RequestRateComponent, title: 'Rates' },
  { path: 'employee_register/:uid', component: EmployeeRegisterComponent, title: 'Employee Register' },
  { path: 'login', component: LoginComponent, canActivate: [UserGuard], title: 'Вход в систему' },
  { path: 'logout', component: LogoutComponent, title: 'Выход из системы'},
  { path: 'register', component: RegisterComponent, canActivate: [UserGuard], title: 'Регистрация в системе'},
  { path: 'confirm', component: ConfirmComponent, canActivate: [UserGuard], title: 'Код подтверждения'},
  { path: 'confirm/:uid', component: ConfirmComponent, canActivate: [UserGuard], title: 'Код подтверждения' },
  // Редиректы(redirect)
  { path: 'rate', redirectTo: 'rate_request/5191ebbc0ba015a608f285b78b524449' },
  
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
