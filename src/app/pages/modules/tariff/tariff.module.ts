import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TariffComponent } from '../../components/tariff/tariff.component';

const routes: Routes = [
  {
    path: '',
    component: TariffComponent,
    title: 'Тарифы',
  },
];

@NgModule({
  declarations: [
    TariffComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class TariffModule { }
