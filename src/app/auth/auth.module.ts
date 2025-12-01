import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { EmployeeRegisterComponent } from '../pages/components/employee-register/employee-register.component';
import { SharedModule } from '../shared/shared.module';
import { UserGuard } from './user.guard';

const routes: Routes = [
  { path: 'password_recovery', component: PasswordRecoveryComponent, canActivate: [UserGuard], title: 'Востановление пароля' },
  // { path: 'rate_request/:uid', component: RequestRateComponent, title: 'Rates' },
  { path: 'employee_register/:uid', component: EmployeeRegisterComponent, title: 'Employee Register' },
  { path: 'login', component: LoginComponent, canActivate: [UserGuard], title: 'Вход в систему' },
  { path: 'logout', component: LogoutComponent, title: 'Выход из системы'},
  { path: 'register', component: RegisterComponent, canActivate: [UserGuard], title: 'Регистрация в системе'},
  { path: 'confirm', component: ConfirmComponent, canActivate: [UserGuard], title: 'Код подтверждения'},
  { path: 'confirm/:uid', component: ConfirmComponent, canActivate: [UserGuard], title: 'Код подтверждения' },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ConfirmComponent,
    PasswordRecoveryComponent,
    EmployeeRegisterComponent,//TODO: решить переносить этот компонент в публик модуль или нет или обьединить авторизацию и публик модуль 
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class AuthModule { }
