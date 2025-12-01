import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderEditorComponent } from '../../components/order-editor/order-editor.component';
import { OrderComponent } from '../../components/order/order.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'transportation', pathMatch: 'full',
  },
  {
    path: 'transportation',
    component: OrderComponent,
    title: 'Заказы',
  },
  {
    path: 'docs',
    component: OrderComponent,
    title: 'Заказы',
  },
  {
    path: 'add',
    component: OrderEditorComponent,
    title: 'Новый заказ',
  },
  {
    path: 'edit/:id',
    component: OrderEditorComponent,
    title: 'Редактирование заказа',
  },
];

@NgModule({
  declarations: [
    OrderComponent,
    OrderEditorComponent,

  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class OrderModule { }
