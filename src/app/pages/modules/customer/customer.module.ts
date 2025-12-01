import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientEditorComponent } from '../../components/client-editor/client-editor.component';
import { ClientComponent } from '../../components/client/client.component';
import { ServicesComponent } from '../../components/services/services.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    title: 'Клиенты',
  },
  {
    path: 'add',
    component: ClientEditorComponent,
    title: 'Добавление клиента',
  },
  {
    path: 'edit/:id',
    component: ClientEditorComponent,
    title: 'Редактирование клиента',
  },
];

@NgModule({
  declarations: [
    ClientComponent,
    ClientEditorComponent,
    ServicesComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class CustomerModule { }
