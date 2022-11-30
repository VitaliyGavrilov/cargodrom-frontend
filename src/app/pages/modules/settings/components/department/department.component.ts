import { takeUntil } from 'rxjs/operators';
import { SortColumn } from './../../../../../api/custom_models/sort-column';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Department } from './../../../../../api/custom_models/department';
import { CompanyService } from './../../../../../api/services/company.service';
import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/api/custom_models';
import { Subject } from 'rxjs';

interface Column<T> extends SortColumn<T> {
  title: string;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: [
    './department.component.scss',
    '../../main-table.scss'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DepartmentComponent implements OnInit, OnDestroy {
  departments: Department[] = [];
  total = 0;
  start = 0;
  limits = [10, 25, 50, 100];
  count = this.limits[0];
  @ViewChild('removeDialogRef') removeDialogRef!: TemplateRef<Department>;
  columns: Column<Department>[] = [
    { field: 'name', title: 'Название подразделения', dir: 'asc' },
    { field: 'count_position', title: 'Должностей', dir: 'asc' },
    { field: 'count_user', title: 'Сотрудников', dir: 'asc' },
    { field: 'leader_user', title: 'Руководитель подразделения', dir: 'asc' },
  ];
  sortCol: keyof Department =  this.columns[0].field;
  sortDir = this.columns[0].dir;
  employees: Employee[] = [];
  destroy$ = new Subject<void>();


  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap
    .pipe(takeUntil(this.destroy$))
    .subscribe(queryParamMap => {
      this.start = this.getIntParamSafely(queryParamMap, 'start', this.start);
      this.count = this.getIntEnumParamSafely(queryParamMap, 'count', this.limits, this.count);
      this.sortCol = this.getEnumParamSafely(queryParamMap, 'sortCol', this.columns.map(col => col.field), this.sortCol) as keyof Department;
      this.sortDir = this.getEnumParamSafely(queryParamMap, 'sortDir', ['asc', 'desc'], this.sortDir) as 'asc' | 'desc';
      this.loadDepartments();
    });
  }
  
  getIntParamSafely(queryParamMap: ParamMap, name: string, fallback: number): number {
    const value = queryParamMap.get(name);
    if (value != null) {
      const intValue = parseInt(value, 10);
      return intValue;
    }
    return fallback;
  }

  getIntEnumParamSafely(queryParamMap: ParamMap, name: string, values: number[], fallback: number): number {
    const value = queryParamMap.get(name);
    if (value != null) {
      const intValue = parseInt(value, 10);
      return values.includes(intValue) ? intValue : fallback;
    }
    return fallback;
  }

  getEnumParamSafely(queryParamMap: ParamMap, name: string, values: string[], fallback: string): string {
    const value = queryParamMap.get(name);
    if (value != null && values.includes(value)) {
      return value;
    }
    return fallback;
  }
  
  loadDepartments(): void {
    const sortCol: SortColumn<Department> = {
      field: this.sortCol,
      dir: this.sortDir,
    };
    const sortByName: SortColumn<Department> = {
      dir: 'asc',
      field: 'name',
    };
    const sort = sortCol.field !== sortByName.field ? [sortCol, sortByName] : [sortCol];
    this.companyService.companyDepartmentList({start: this.start, count: this.count, sort: JSON.stringify(sort) as unknown as SortColumn<Department>[] }).subscribe(departments => {
      this.departments = departments ? departments.items as Department[] : [];
      this.total = departments.total!;
    });
  }

  onStartChange(newStart: number): void {
    this.router.navigate(['.'], {
      queryParams: { start: newStart },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }

  onCountChange(newCount: number): void {
    this.router.navigate(['.'], {
      queryParams: { count: newCount, start: 0 },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }
  
  sort(col: Column<Department>): void {
    this.start = 0;
    if (this.sortCol === col.field) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortDir = 'asc';
      this.sortCol = col.field;
    }
    this.router.navigate(['.'], {
      queryParams: { sortCol: this.sortCol, sortDir: this.sortDir, start: this.start },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }
  
  findColumnByName(name: keyof Department) {
    return this.columns.find(column => column.field === name);
  }

  getColTitle(col: Column<Department>): string {
    if (col.field === this.sortCol) {
      return col.dir === 'asc' ? 'сортировать по убыванию' : 'сортировать по возрастанию'
    }
    return 'сортировать по возрастанию';
  }
  
  confirmRemove(department: Department): void {
    this.dialog.open(this.removeDialogRef, { data: department }).afterClosed().subscribe(res => {
      if (res) {
        this.removeDepartment(department);
      }
    });
  }

  removeDepartment(department: Department): void {
    const body = { id: department.id };
    this.companyService.companyDepartmentDelete({ body })
      .subscribe({
        next: () => {
          this.snackBar.open(`Подразделение ${department.name} удалено`, undefined, { duration: 1000 });
          this.loadDepartments();
        },
        error: (err) => this.snackBar.open(`Ошибка удаления подразделения: ` + err.error.error_message, undefined, { duration: 1000 })
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}
