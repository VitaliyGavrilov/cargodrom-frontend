import { SettingsEditor } from './../../classes/settings-editor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Position } from './../../../../../api/custom_models/position';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../../../api/services/company.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { SystemService } from '../../../../../api/services';

@Component({
  selector: 'app-position-editor',
  templateUrl: './position-editor.component.html',
  styleUrls: ['./position-editor.component.scss']
})
export class PositionEditorComponent extends SettingsEditor<Position> implements OnInit {
  private entity = 'Должность';
  editTitle = 'Информация о должности';
  newTitle = 'Добавление должности';
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

  protected create(params: {body: Omit<Position, 'id'>}) {
    return this.companyService.companyPositionCreate(params as any); 
   }
   
   protected read(params: { id: number; }): Observable<Position> {
     return this.companyService.companyPositionInfo(params) as Observable<Position>;
   }
   
   protected update(params: { body: Partial<Position>; }): Observable<void> {
     return this.companyService.companyPositionUpdate(params as any) as unknown as Observable<void>;
   }
   
   protected delete(params: {body: { id: number; }}): Observable<void> {
     return this.companyService.companyPositionDelete(params) as unknown as Observable<void>;
   }
   
   protected getNameForHeader(body: Position): string {
    return body.name;
  }

}
