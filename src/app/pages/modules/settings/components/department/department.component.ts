import { SortColumn } from './../../../../../api/custom_models/sort-column';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from './../../../../../api/custom_models/department';
import { CompanyService } from './../../../../../api/services/company.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Column, SettingsTable } from '../../classes/settings-table';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: [
    './department.component.scss',
    '../../main-table.scss'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DepartmentComponent extends SettingsTable<Department> {
  columns: Column<Department>[] = [
    { field: 'name', title: 'Название подразделения', dir: 'asc' },
    { field: 'count_position', title: 'Должностей', dir: 'asc' },
    { field: 'count_user', title: 'Сотрудников', dir: 'asc' },
    { field: 'leader_user', title: 'Руководитель подразделения', dir: 'asc' },
  ];
  sortCol = this.columns[0].field;
  sortByName: SortColumn<Department> = {
    dir: 'asc',
    field: 'name',
  };
  removedMessage = `Подразделение удалено`;

  constructor(
    private companyService: CompanyService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
  ) {
    super(route, router, dialog, snackBar);
  }
  
  load<Department>(params: { start?: number; count?: number; sort?: SortColumn<Department>[]; }): Observable<{ total: number; items: Department[]; }> {
    return this.companyService.companyDepartmentList(params as any) as Observable<{ total: number; items: Department[]; }>;
  }
  
  delete(params: { body: { id: number; } }): Observable<void> {
    return this.companyService.companyDepartmentDelete(params) as unknown as Observable<void>;
  }

}
