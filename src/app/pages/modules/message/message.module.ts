import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessagePage } from '../../components/message/message.page';
import { MessageEditorComponent } from '../../components/message-editor/message-editor.component';

const routes: Routes = [
  {
    path: '',
    component: MessagePage,
    title: 'Сообщения',
  },
];

@NgModule({
  declarations: [
    MessagePage,
    MessageEditorComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class MessageModule { }
