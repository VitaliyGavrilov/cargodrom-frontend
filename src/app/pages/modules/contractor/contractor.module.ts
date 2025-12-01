import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContractorComponent } from '../../components/contractor/contractor.component';
import { ContractorEditorComponent } from '../../components/contractor-editor/contractor-editor.component';
import { ContactEditorComponent } from '../../components/contact-editor/contact-editor.component';
import { RatingComponent } from '../../components/rating/rating.component';
import { TradeDirectionComponent } from '../../components/trade-direction/trade-direction.component';
import { ResponsibilityComponent } from '../../components/responsibility/responsibility.component';
import { ResponsibilityMatrixComponent } from '../../components/responsibility-matrix/responsibility-matrix.component';
import { ResponsibilityRowComponent } from '../../components/responsibility-row/responsibility-row.component';


const routes: Routes = [
  {
    path: '',
    component: ContractorComponent,
    title: 'Подрядчики'
  },
  {
    path: 'add',
    component: ContractorEditorComponent,
    title: 'Добавление подрядчика'
  },
  {
    path: 'edit/:id',
    component: ContractorEditorComponent,
    title: 'Редактирование подрядчика'
  },
];

@NgModule({
  declarations: [
    ContractorComponent,
    ContractorEditorComponent,
    RatingComponent,
    ContactEditorComponent,
    TradeDirectionComponent,
    ResponsibilityMatrixComponent,
    ResponsibilityRowComponent,
    ResponsibilityComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
  // exports: [
  //   ContractorComponent,
  // ]
})
export class ContractorModule { }
