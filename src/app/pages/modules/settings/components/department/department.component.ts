import { SortColumn } from './../../../../../api/custom_models/sort-column';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { byField, SortOrder, SortType } from './../../../../../constants/sort-predicate';
import { Department } from './../../../../../api/custom_models/department';
import { CompanyService } from './../../../../../api/services/company.service';
import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/api/custom_models';

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
export class DepartmentComponent implements OnInit {
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
  sortCol =  this.columns[0];
  employees: Employee[] = [];


  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    const sortCol: SortColumn<Department> = {
      dir: this.sortCol.dir,
      field: this.sortCol.field,
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
    this.start = newStart;
    this.loadDepartments();
  }
  
  onCountChange(newCount: number): void {
    this.start = 0;
    this.count = newCount;
    this.loadDepartments();
  }
  
  sort(col: Column<Department>): void {
    this.start = 0;
    if (this.sortCol === col) {
      this.sortCol.dir = col.dir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortCol.dir = 'asc';
      this.sortCol = col;
      this.sortCol.dir = 'asc';
    }
    this.loadDepartments();
  }
  
  findColumnByName(name: keyof Department) {
    return this.columns.find(column => column.field === name);
  }

  getColTitle(col: Column<Department>): string {
    if (col === this.sortCol) {
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
  
}
