import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportComponent } from '../../components/report/report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    title: 'Отчеты',
  },
];

@NgModule({
  declarations: [
    ReportComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class ReportModule { }
