import { ActivatedRoute } from '@angular/router';
import { CompanyService } from './../../../../api/services/company.service';
import { FormControl, FormGroup } from "@angular/forms";
import { MatSnackBarConfig } from "@angular/material/snack-bar";
import { Company, Currency, Department, Employee, Position, TaxSystem } from "src/app/api/custom_models";
import { Location } from '@angular/common';
import { phoneMask } from 'src/app/constants';

export class SettingsEditor {
  form!: FormGroup;
  isEditMode = false;
  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 5000 };
  title = '';
  employees: Employee[] = [];
  taxSystems: TaxSystem[] = [];
  currencies: Currency[] = [];
  companies: Company[] = [];
  departments: Department[] = [];
  positions: Position[] = [];
  isFormSubmitted = false;
  phoneMask = phoneMask;

  constructor(
    protected location: Location,
    protected companyService: CompanyService,
    protected route: ActivatedRoute,
    ) { }

  goBack(): void {
    this.location.back();
  }

  loadEmployees(): void {
    this.companyService.companyEmployeeList().subscribe(employees => {
      this.employees = employees ? employees as Employee[] : [];
    });
  }

  getTaxSystems(): void {
    this.companyService.companyTaxSystem().subscribe(
      taxSystems => this.taxSystems = taxSystems ? taxSystems as TaxSystem[] : []
    );
  }

  getCurrencies(): void {
    this.companyService.companyCurrency().subscribe(
      currencies => this.currencies = currencies ? currencies as Currency[] : []
    );
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

  hasError(name: string): boolean {
    const control = this.form.get(name) as FormControl;
    return control.invalid;
  }

  getError(name: string): string {
    const control = this.form.get(name) as FormControl;
    if (control.errors?.['required']) {
      return 'Поле обязательно';
    }
    if (control.errors?.['email']) {
      return 'Невалидный email';
    }
    if (control.errors?.['inn']) {
      return 'Неверный формат ИНН';
    }
    if (control.errors?.['mask']) {
      return 'Неверный формат';
    }
    return '';
  }
  
  detectEditMode(): void {
    const segments = this.route.snapshot.url.map(s => s.path);
    this.isEditMode = segments[1] === 'edit';
  }
  
  getIdParam(): number {
    return Number(this.route.snapshot.paramMap.get('id'));
  }
}
