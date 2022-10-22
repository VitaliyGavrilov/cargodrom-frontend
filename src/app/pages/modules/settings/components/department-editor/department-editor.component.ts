import { SettingsEditor } from './../../classes/settings-editor';
import { CompanyService } from './../../../../../api/services/company.service';
import { Department } from './../../../../../api/custom_models/department';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'app-department-editor',
  templateUrl: './department-editor.component.html',
  styleUrls: [
    './department-editor.component.scss',
    '../../main-table.scss'
  ]
})
export class DepartmentEditorComponent extends SettingsEditor implements OnInit {
  departmentId?: number;
  department: Partial<Department> = {};

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
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.detectEditMode();
    if (this.isEditMode) {
      this.departmentId = Number(this.route.snapshot.paramMap.get('id'));
      this.getDepartment();
    }
    this.title = this.isEditMode ? 'Редактирование подразделения' : 'Добавление подразделения';
  }

  getDepartment(): void {
    const id = this.getIdParam();
    this.companyService.companyDepartmentInfo({ id })
      .pipe(tap((department) => {
        // currently, when position doesn't exist the service returns HTTP 200 with empty response body instead of HTTP 404
        // therefore we have to handle that case manually
        if (!department) {
          throw ({ error: { error_message: `подразделение не существует` } });
        }
      }))
      .subscribe({
        next: (department) => {
          this.department = department as Department;
          this.form.patchValue(this.department);
        },
        error: (err: any) => this.showErrorAndGoBack(err, `Подразделение не найдено`)
      });
  }

  save(): void {
    this.isFormSubmitted = true;
    if (!this.form.valid) {
      this.showError('Не все поля заполнены корректно');
      return;
    }
    const body = this.form.value;
    if (typeof this.department.id === 'number') {
      this.updateDepartment(body);
    } else {
      this.createDepartment(body);
    }
  }

  private createDepartment(body: any) {
    this.companyService.companyDepartmentCreate({ body }).pipe().subscribe({
      next: () => this.showMessageAndGoBack(`Подразделение создано`),
      error: (err) => this.showError(`Ошибка создания подразделения`, err)
    });
  }

  updateDepartment(body: any) {
    this.companyService.companyDepartmentUpdate({ body }).pipe().subscribe({
      next: () => this.showMessageAndGoBack(`Подразделение сохранено`),
      error: (err) => this.showError(`Ошибка сохранения подразделения`, err)
    });
  }

  remove(): void {
    const body = { id: this.department.id! };
    this.companyService.companyDepartmentDelete({ body })
      .subscribe({
        next: () => this.showMessageAndGoBack(`Подразделение ${this.department.name} удалено`),
        error: (err) => this.showError(`Ошибка удаления подразделения`, err)
      });
  }

}
