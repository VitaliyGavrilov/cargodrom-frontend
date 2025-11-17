import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: '', 
    // component: DashboardComponent,
    title: 'Подрядчики'
  },
  { 
    path: 'add', 
    // component: DashboardComponent,
    title: 'Добавление подрядчика'
  },
  { 
    path: 'edit/:id', 
    // component: DashboardComponent,
    title: 'Редактирование подрядчика'
  },
];

@NgModule({
  // declarations: [DashboardComponent],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ContractorsModule { }