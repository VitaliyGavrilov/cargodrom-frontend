import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BitComponent } from '../../components/bit/bit.component';

const routes: Routes = [
  {
    path: '',
    component: BitComponent,
    title: 'Ставки',
  },
];

@NgModule({
  declarations: [
    BitComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class BitModule { }
