import { Position } from './../../../../../api/custom_models/position';
import { Department } from './../../../../../api/custom_models/department';
import { CompanyService } from './../../../../../api/services/company.service';
import { Company } from './../../../../../api/custom_models/company';
import { Employee } from './../../../../../api/custom_models/employee';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-editor',
  templateUrl: './employee-editor.component.html',
  styleUrls: ['./employee-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeEditorComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  employee: Partial<Employee> = {};
  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 5000 };
  title = '';
  companies: Company[] = [];
  departments: Department[] = [];
  positions: Position[] = [];

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
  ) {
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
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      skype: [''],
    });
  }

  ngOnInit(): void {
    const segments = this.route.snapshot.url.map(s => s.path);
    this.isEditMode = segments[1] === 'edit';
    if (this.isEditMode) {
      this.getEmployee();
    } else {
      const departmentId = this.route.snapshot.queryParamMap.get('department_id');
      if (departmentId) {
        this.form.patchValue({department_id: Number(departmentId)});
        this.form.controls['department_id'].disable();
      }
    }
    this.getCompanies();
    this.getDepartments();
    this.getPositions();
    this.title = this.isEditMode ? 'Редактирование сотрудника' : 'Добавление сотрудника';
  }

  getEmployee(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.companyService.companyEmployeeInfo({ id })
      .pipe(tap((employee) => {
        // currently, when employee doesn't exist the service returns HTTP 200 with empty response body instead of HTTP 404
        // therefore we have to handle that case manually
        if (!employee) {
          throw ({ error: { error_message: `сотрудник не существует` } });
        }
      }))
      .subscribe({
        next: (employee) => {
          this.employee = employee as Employee;
          this.form.patchValue(this.employee);
        },
        error: (err: any) => {
          this.snackBar.open(`Сотрудник не найден: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
          this.goBack();
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (!this.form.valid) {
      this.snackBar.open('Не все поля заполнены корректно', undefined, this.snackBarWithLongDuration);
      return;
    }
    const body = this.form.value;
    if (typeof this.employee.id === 'number') {
      this.updateEmployee(body);
    } else {
      this.createEmployee(body);
    }
  }

  private createEmployee(body: any) {
    this.companyService.companyEmployeeCreate({ body }).pipe().subscribe({
      next: ({ id }) => {
        this.goBack();
        this.snackBar.open(`Сотрудник создан`, undefined, this.snackBarWithShortDuration)
      },
      error: (err) => this.snackBar.open(`Ошибка создания сотрудника: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  updateEmployee(body: any) {
    this.companyService.companyEmployeeUpdate({ body }).pipe().subscribe({
      next: () => {
        this.goBack();
        this.snackBar.open(`Сотрудник сохранен`, undefined, this.snackBarWithShortDuration);
      },
      error: (err) => this.snackBar.open(`Ошибка сохранения сотрудника: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  remove(): void {
    const body = { id: this.employee.id! };
    this.companyService.companyEmployeeDelete({ body })
      .subscribe({
        next: () => {
          this.snackBar.open(`Сотрудник ${this.employee.name_f} удален`, undefined, { duration: 1000 });
          this.goBack();
        },
        error: (err) => this.snackBar.open(`Ошибка удаления сотрудника: ` + err.error.error_message, undefined, { duration: 1000 })
      });
  }

  getCompanies(): void {
    this.companyService.companyList().subscribe(companies => this.companies = companies as Company[]);
  }

  getDepartments(): void {
    this.companyService.companyDepartmentList().subscribe(departments => this.departments = departments as Department[]);
  }

  getPositions(): void {
    this.companyService.companyPositionList().subscribe(positions => this.positions = positions as Position[]);
  }
}
