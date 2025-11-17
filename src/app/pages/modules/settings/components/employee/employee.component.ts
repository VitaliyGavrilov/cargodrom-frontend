import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SortColumn } from '../../../../../api/custom_models/sort-column';
import { Table } from 'src/app/shared/classes';
import { Employee } from './../../../../../api/custom_models';
import { CompanyService } from './../../../../../api/services/company.service';
import { FilterService } from 'src/app/filter/services/filter.service';
import { UserService } from 'src/app/api/services';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: [
    './employee.component.scss',
    '../../main-table.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [FilterService]
})
export class EmployeeComponent extends Table<Employee, 'fio'> {
  trackById = (_index: number, employee: Employee) => employee.id;

  override removedMessage = `Сотрудник удален`;
  sortField = 'fio' as const;
  // override nameField = 'fio' as const;

  constructor(
    private companyService: CompanyService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
    filter: FilterService,
    userService:UserService,
  ) {
    super(route, router, dialog, snackBar, filter, userService);
    this.registerAlias('fio', ['name_f', 'name_i', 'name_o']);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadRows()
  }

  load<Employee>(params: { start?: number; count?: number; sort?: SortColumn<Employee>[]; }): Observable<{ total: number; items: Employee[]; }> {
    console.log(1234);

    return this.companyService.companyEmployeeList(params as any) as unknown as Observable<{ total: number; items: Employee[]; }>;
  }

  override delete(params: { body: { id: number; } }): Observable<void> {
    return this.companyService.companyEmployeeDelete(params) as unknown as Observable<void>;
  }

}
