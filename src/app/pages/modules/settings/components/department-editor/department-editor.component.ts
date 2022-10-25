import { SettingsEditor } from './../../classes/settings-editor';
import { CompanyService } from './../../../../../api/services/company.service';
import { Department } from './../../../../../api/custom_models/department';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'app-department-editor',
  templateUrl: './department-editor.component.html',
  styleUrls: [
    './department-editor.component.scss',
    '../../main-table.scss'
  ]
})
export class DepartmentEditorComponent extends SettingsEditor<Department> implements OnInit {
  departmentId?: number;
  private entity = 'Подразделение';
  editTitle = 'Редактирование подразделения';
  newTitle = 'Добавление подразделения';
  savedMessage = `${this.entity} сохранено`;
  removedMessage = `${this.entity} удалено`;
  createdMessage = `${this.entity} создано`;
  notFoundMessage = `${this.entity} не найдено`;

  constructor(
    private fb: FormBuilder,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    companyService: CompanyService,
    location: Location,
    router: Router,
  ) {
    super(location, companyService, route, snackBar, router);
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if (this.isEditMode) {
      this.departmentId = Number(this.route.snapshot.paramMap.get('id'));
    }
  }

  protected create(params: { body: Omit<Department, 'id'> }) {
    return this.companyService.companyDepartmentCreate(params as any);
  }

  protected read(params: { id: number; }): Observable<Department> {
    return this.companyService.companyDepartmentInfo(params) as Observable<Department>;
  }

  protected update(params: { body: Partial<Department>; }): Observable<void> {
    return this.companyService.companyDepartmentUpdate(params as any) as unknown as Observable<void>;
  }

  protected delete(params: { body: { id: number; } }): Observable<void> {
    return this.companyService.companyDepartmentDelete(params) as unknown as Observable<void>;
  }

}
