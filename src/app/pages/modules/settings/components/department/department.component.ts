import { ActivatedRoute } from '@angular/router';
import { byField, SortOrder, SortType } from './../../../../../constants/sort-predicate';
import { Department } from './../../../../../api/custom_models/department';
import { CompanyService } from './../../../../../api/services/company.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

interface Column<T> {
  name: keyof T;
  title: string;
  sortType: SortType;
  sortOrder: SortOrder,
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
  columns: Column<Department>[] = [
    { name: 'name', sortType: 'case-insensitive', title: 'Название подразделения', sortOrder: 'asc' },
    { name: 'count_position', sortType: 'numeric', title: 'Должностей', sortOrder: 'asc' },
    { name: 'count_user', sortType: 'numeric', title: 'Сотрудников', sortOrder: 'asc' },
    { name: 'name', sortType: 'case-insensitive', title: 'Руководитель подразделения', sortOrder: 'asc' }, // TODO: Where to get this column
  ];
  sortCol: Column<Department>= this.columns[0];


  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.companyService.companyDepartmentList().subscribe(departments => {
      const allDepartments = departments = departments ? departments as Department[] : [];
      allDepartments.sort(this.getSortPredicate());
      this.total = allDepartments.length;
      this.departments = allDepartments.slice(this.start, this.start + this.count);
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
  
  getSortPredicate() {
    return byField<Department>(this.sortCol.name, this.sortCol.sortOrder, this.sortCol.sortType);
  }
  
  sort(col: Column<Department>): void {
    this.start = 0;
    if (this.sortCol === col) {
      this.sortCol.sortOrder = col.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortCol.sortOrder = 'asc';
      this.sortCol = col;
      this.sortCol.sortOrder = 'asc';
    }
    this.loadDepartments();
  }
  
  findColumnByName(name: keyof Department) {
    return this.columns.find(column => column.name === name);
  }

  getColTitle(col: Column<Department>): string {
    if (col === this.sortCol) {
      return col.sortOrder === 'asc' ? 'сортировать по убыванию' : 'сортировать по возрастанию'
    }
    return 'сортировать по возрастанию';
  }

}
