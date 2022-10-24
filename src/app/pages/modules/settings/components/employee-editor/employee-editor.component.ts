import { emailValidator } from './../../../../../validators';
import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from './../../../../../api/custom_models/employee';
import { CompanyService } from './../../../../../api/services/company.service';
import { SettingsEditor } from '../../classes/settings-editor';

@Component({
  selector: 'app-employee-editor',
  templateUrl: './employee-editor.component.html',
  styleUrls: ['./employee-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeEditorComponent extends SettingsEditor<Employee> implements OnInit {
  private entity = 'Сотрудник';
  editTitle = 'Редактирование сотрудника';
  newTitle = 'Добавление сотрудника';
  savedMessage = `${this.entity} сохранен`;
  removedMessage = `${this.entity} удален`;
  createdMessage = `${this.entity} создан`;
  notFoundMessage = `${this.entity} не найден`;
  
  constructor(
    private fb: FormBuilder,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    companyService: CompanyService,
    location: Location,
  ) {
    super(location, companyService, route, snackBar);
    this.form = this.fb.group({
      id: [''],
      name_f: ['', [Validators.required]],
      name_i: ['', [Validators.required]],
      name_o: ['', [Validators.required]],
      birth_date: [''],
      company_id: ['', [Validators.required]],
      department_id: ['', [Validators.required]],
      position_id: ['', [Validators.required]],
      employment_date: [''],
      dismissal_date: [''],
      email: ['', [Validators.required, emailValidator]],
      phone: [''],
      skype: [''],
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if (!this.isEditMode) {
      const departmentId = this.route.snapshot.queryParamMap.get('department_id');
      if (departmentId) {
        this.form.patchValue({ department_id: Number(departmentId) });
      }
    }
    this.loadCompanies();
    this.loadDepartments();
    this.loadPositions();
  }

  protected create(params: { body: Omit<Employee, 'id'> }) {
    return this.companyService.companyEmployeeCreate(params as any) as unknown as Observable<Employee>;
  }

  protected read(params: { id: number; }): Observable<Employee> {
    return this.companyService.companyEmployeeInfo(params) as Observable<Employee>;
  }

  protected update(params: { body: Partial<Employee>; }): Observable<void> {
    return this.companyService.companyEmployeeUpdate(params as any) as unknown as Observable<void>;
  }

  protected delete(params: { body: { id: number; } }): Observable<void> {
    return this.companyService.companyEmployeeDelete(params) as unknown as Observable<void>;
  }
}
