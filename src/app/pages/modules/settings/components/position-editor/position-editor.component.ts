import { SettingsEditor } from './../../classes/settings-editor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Position } from './../../../../../api/custom_models/position';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../../../api/services/company.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-position-editor',
  templateUrl: './position-editor.component.html',
  styleUrls: ['./position-editor.component.scss']
})
export class PositionEditorComponent extends SettingsEditor<Position> implements OnInit {

  constructor(
    private fb: FormBuilder,
    snackBar: MatSnackBar,
    companyService: CompanyService,
    route: ActivatedRoute,
    location: Location,
  ) {
    super(location, companyService, route, snackBar);
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.title = this.isEditMode ? 'Редактирование должности' : 'Добавление должности';
  }
  
  protected create(params: {body: Omit<Position, 'id'>}) {
    return this.companyService.companyPositionCreate(params as any) as unknown as Observable<Position>; 
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

}
