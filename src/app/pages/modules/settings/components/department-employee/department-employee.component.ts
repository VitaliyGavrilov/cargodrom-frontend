import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from './../../../../../api/custom_models/employee';
import { CompanyService } from 'src/app/api/services/company.service';
import { Component, Input } from '@angular/core';
import { Table } from '../../../../../classes';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SortColumn } from 'src/app/api/custom_models/sort-column';
import { FilterService } from 'src/app/filter/services/filter.service';
import { UserService } from 'src/app/api/services';

@Component({
  selector: 'app-department-employee',
  templateUrl: './department-employee.component.html',
  styleUrls: [
    './department-employee.component.scss',
    '../../main-table.scss'
  ],
  providers: [FilterService]
})
export class DepartmentEmployeeComponent extends Table<Employee, 'fio'> {
  @Input() departmentId!: number;
  override removedMessage = `Сотрудник удален`;
  sortField = 'fio' as const;
  override nameField = 'fio' as const;

  constructor(
    private companyService: CompanyService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
    filter: FilterService,
    userService: UserService
  ) {
    super(route, router, dialog, snackBar, filter, userService);
    this.registerAlias('fio', ['name_f', 'name_i', 'name_o']);
  }

  load<Employee>(params: { start?: number; count?: number; sort?: SortColumn<Employee>[]; }): Observable<{ total: number; items: Employee[]; }> {
    const queryParams = { ...params, department_id: this.departmentId }

    return this.companyService.companyEmployeeList(queryParams as any) as unknown as Observable<{ total: number; items: Employee[]; }>;
  }

  override delete(params: { body: { id: number; } }): Observable<void> {
    return this.companyService.companyEmployeeDelete(params) as unknown as Observable<void>;
  }

  onDepartmentLeaderChange(employee: Employee, isLeader: boolean): void {
    const body = {...employee, department_leader: isLeader ? 1: 0} as any;
    this.companyService.companyEmployeeUpdate({body}).subscribe(() => this.loadRows());
  }

 }
