import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  // { 
  //   path: 'rate/:uid', 
  //   component: RatesPage,
  //   title: 'rate page'
  // },
];

@NgModule({
  // declarations: [DashboardComponent],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }