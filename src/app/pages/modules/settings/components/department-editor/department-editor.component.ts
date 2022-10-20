import { SettingsEditor } from './../../classes/settings-editor';
import { CompanyService } from './../../../../../api/services/company.service';
import { Department } from './../../../../../api/custom_models/department';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
    private snackBar: MatSnackBar,
    route: ActivatedRoute,
    companyService: CompanyService,
    location: Location,
  ) {
    super(location, companyService, route);
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
    this.companyService.companyDepartmentInfo({id})
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
        error: (err: any) => {
          this.snackBar.open(`Подразделение не найдено: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
          this.goBack();
        }
      });
  }

  save(): void {
    this.isFormSubmitted = true;
    if (!this.form.valid) {
      this.snackBar.open('Не все поля заполнены корректно', undefined, this.snackBarWithLongDuration);
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
      next: ({ id }) => {
        this.goBack();
        this.snackBar.open(`Подразделение создано`, undefined, this.snackBarWithShortDuration)
      },
      error: (err) => this.snackBar.open(`Ошибка создания подразделения: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  updateDepartment(body: any) {
    this.companyService.companyDepartmentUpdate({ body }).pipe().subscribe({
      next: () => {
        this.snackBar.open(`Подразделение сохранено`, undefined, this.snackBarWithShortDuration);
        this.goBack();
      },
      error: (err) => this.snackBar.open(`Ошибка сохранения подразделения: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }
  
  remove(): void {
    const body = { id: this.department.id! };
    this.companyService.companyDepartmentDelete({ body })
      .subscribe({
        next: () => {
          this.snackBar.open(`Подразделение ${this.department.name} удалено`, undefined, {duration: 1000});
          this.goBack();
        },
        error: (err) => this.snackBar.open(`Ошибка удаления подразделения: ` + err.error.error_message, undefined, {duration: 1000})
      });
  }

}
