import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard/dashboard.page';
// import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: '', 
    component: DashboardPage,
    title: 'Дашборд'
  }
];

@NgModule({
  // declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }