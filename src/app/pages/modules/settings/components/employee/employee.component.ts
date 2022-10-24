import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concat, map, Observable, zip } from 'rxjs';
import { Company, Department, Employee, Position } from './../../../../../api/custom_models';
import { CompanyService } from './../../../../../api/services/company.service';
import { byField } from './../../../../../constants/sort-predicate';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: [
    './employee.component.scss',
    '../../main-table.scss'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  total = 0;
  start = 0;
  limits = [10, 25, 50, 100];
  count = this.limits[0];
  @ViewChild('removeDialogRef') removeDialogRef!: TemplateRef<Employee>;
  departmentById: { [id: string]: Department } = {};
  positionById: { [id: string]: Position } = {};
  companyById: { [id: string]: Company } = {};
  trackById = (_index: number, employee: Employee) => employee.id;

  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    concat(
      zip(this.loadPositions(), this.loadDepartments(), this.loadCompanies()),
      this.loadEmployees(),
    ).subscribe();
  }

  loadEmployees(): Observable<void> {
    return this.companyService.companyEmployeeList().pipe(map(employees => {
      const allEmployees = employees ? (employees.items! as Employee[]).sort(byField('name_f', 'asc', 'case-insensitive')) : [];
      this.total = allEmployees.length;
      this.employees = allEmployees.slice(this.start, this.start + this.count);
    }));
  }

  reloadEmployees(): void {
    this.loadEmployees().subscribe();
  }

  loadDepartments(): Observable<void> {
    return this.companyService.companyDepartmentList().pipe(map(departments => {
      const allDepartments = departments ? departments.items as Department[] : [];
      allDepartments.forEach(department => this.departmentById[department.id] = department);
    }));
  }

  loadPositions(): Observable<void> {
    return this.companyService.companyPositionList().pipe(map(positions => {
      const allPositions = positions ? positions.items as Position[] : [];
      allPositions.forEach(position => this.positionById[position.id] = position);
    }));
  }

  loadCompanies(): Observable<void> {
    return this.companyService.companyList().pipe(map(companies => {
      const allCompanies = companies ? companies.items as Company[] : [];
      allCompanies.forEach(company => this.companyById[company.id] = company);
    }));
  }

  onStartChange(newStart: number): void {
    this.start = newStart;
    this.reloadEmployees();
  }

  onCountChange(newCount: number): void {
    this.start = 0;
    this.count = newCount;
    this.reloadEmployees();
  }

  confirmRemove(employee: Employee): void {
    this.dialog.open(this.removeDialogRef, { data: employee }).afterClosed().subscribe(res => {
      if (res) {
        this.removeEmployee(employee);
      }
    });
  }

  removeEmployee(employee: Employee): void {
    const body = { id: employee.id };
    this.companyService.companyEmployeeDelete({ body })
      .subscribe({
        next: () => {
          this.snackBar.open(`Сотрудник ${employee.name_f} удален`, undefined, { duration: 1000 });
          this.reloadEmployees();
        },
        error: (err) => this.snackBar.open(`Ошибка удаления сотрудника: ` + err.error.error_message, undefined, { duration: 1000 })
      });
  }

}
