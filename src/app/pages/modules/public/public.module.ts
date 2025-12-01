import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportComponent } from '../../components/report/report.component';
import { RateEditorComponent } from '../../components/rate-editor/rate-editor.component';
import { RequestRateComponent } from '../../components/request-rate/request-rate.component';

const routes: Routes = [
  {
    path: 'request-rates/:uid',
    component: RequestRateComponent,
    title: 'Rates',
  },
];

@NgModule({
  declarations: [
    RequestRateComponent,
    RateEditorComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class PublicModule { }
