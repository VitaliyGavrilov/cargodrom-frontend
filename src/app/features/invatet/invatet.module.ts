import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RatesByUidPage } from './pages/rate-by-uid/rate-by-uid.page';
import { RatesEditorComponent } from './components/rates-editor/rates-editor.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'request/:uid',
    component: RatesByUidPage,
    title: 'rate page'
  },

];

@NgModule({
  declarations: [
    RatesByUidPage,
    RatesEditorComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class InvatetModule { }
