import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SortColumn } from '../../../../../api/custom_models/sort-column';
import { SettingsTable } from '../../classes/settings-table';
import { Employee } from './../../../../../api/custom_models';
import { CompanyService } from './../../../../../api/services/company.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: [
    './employee.component.scss',
    '../../main-table.scss'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeComponent extends SettingsTable<Employee> {
  trackById = (_index: number, employee: Employee) => employee.id;

  removedMessage = `Сотрудник удален`;
  sortCol = 'name_f' as keyof Employee;

  constructor(
    private companyService: CompanyService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
  ) {
    super(route, router, dialog, snackBar);
  }

  load<Employee>(params: { start?: number; count?: number; sort?: SortColumn<Employee>[]; }): Observable<{ total: number; items: Employee[]; }> {
    return this.companyService.companyEmployeeList(params as any) as unknown as Observable<{ total: number; items: Employee[]; }>;
  }

  delete(params: { body: { id: number; } }): Observable<void> {
    return this.companyService.companyEmployeeDelete(params) as unknown as Observable<void>;
  }

}
