import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: '', 
    // component: DashboardComponent,
    title: 'Клиенты'
  },
  { 
    path: 'add', 
    // component: DashboardComponent,
    title: 'Добавление клиента'
  },
  { 
    path: 'edit/:id', 
    // component: DashboardComponent,
    title: 'Редактирование клиента'
  },
];

@NgModule({
  // declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomersModule { }