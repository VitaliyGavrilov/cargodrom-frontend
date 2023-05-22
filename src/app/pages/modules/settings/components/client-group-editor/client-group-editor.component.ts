import { ClientGroup } from './../../../../../api/custom_models/client-group';
import { Component} from '@angular/core';
import { SettingsEditor } from '../../classes/settings-editor';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyService, SystemService } from 'src/app/api/services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-client-group-editor',
  templateUrl: './client-group-editor.component.html',
  styleUrls: ['./client-group-editor.component.scss']
})
export class ClientGroupEditorComponent extends SettingsEditor<ClientGroup> {
  private entity = 'Группа клиентов';
  editTitle = 'Информация о группе клиентов';
  newTitle = 'Добавление группы клиентов';
  savedMessage = `${this.entity} сохранена`;
  removedMessage = `${this.entity} удалена`;
  createdMessage = `${this.entity} создана`;
  notFoundMessage = `${this.entity} не найдена`;

  constructor(
    private fb: FormBuilder,
    snackBar: MatSnackBar,
    companyService: CompanyService,
    systemService: SystemService,
    route: ActivatedRoute,
    location: Location,
    router: Router,
  ) {
    super(location, companyService, systemService, route, snackBar, router);
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
    });
  }

  protected create(params: {body: Omit<ClientGroup, 'id'>}) {
    return this.companyService.companyPositionCreate(params as any); 
   }
   
   protected read(params: { id: number; }): Observable<ClientGroup> {
     return this.companyService.companyPositionInfo(params) as Observable<ClientGroup>;
   }
   
   protected update(params: { body: Partial<ClientGroup>; }): Observable<void> {
     return this.companyService.companyPositionUpdate(params as any) as unknown as Observable<void>;
   }
   
   protected delete(params: {body: { id: number; }}): Observable<void> {
     return this.companyService.companyPositionDelete(params) as unknown as Observable<void>;
   }
   
   protected getNameForHeader(body: ClientGroup): string {
    return body.name;
  }

}
