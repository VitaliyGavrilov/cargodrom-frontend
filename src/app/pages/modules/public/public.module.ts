import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportComponent } from '../../components/report/report.component';
import { RateEditorComponent } from '../../components/rate-editor/rate-editor.component';
import { RequestRateComponent } from '../../components/request-rate/request-rate.component';
import { RequestDeliveryRatesPage } from './pages/request-delivery-rates/request-delivery-rates.page';

const routes: Routes = [
  {
    path: 'request-rates/:uid',//TODO: измнить адрем на request-custom-rates,обсудить с димой
    component: RequestRateComponent,
    title: 'Custom rates',
  },
  {
    path: 'request-delivery-rates/:uid',
    component: RequestDeliveryRatesPage,
    title: 'Delivery rates',
  },
];

@NgModule({
  declarations: [
    //public custom rates editor
    RequestRateComponent,//TODO: Сами компоненты в других папках
    RateEditorComponent,
    //public delivery rates editor
    RequestDeliveryRatesPage,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class PublicModule { }
