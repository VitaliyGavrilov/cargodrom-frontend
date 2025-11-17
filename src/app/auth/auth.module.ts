import { MaterialModule } from './../material/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { EmployeeRegisterComponent } from '../pages/components/employee-register/employee-register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ConfirmComponent,
    PasswordRecoveryComponent,
    // EmployeeRegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
  ],

})
export class AuthModule { }
