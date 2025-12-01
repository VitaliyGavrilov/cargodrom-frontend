import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { GuideComponent } from '../../components/guide/guide.component';

const routes: Routes = [
  {
    path: '',
    component: GuideComponent,
    title: 'Справочник',
  },
];

@NgModule({
  declarations: [
    GuideComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class GuideModule { }
