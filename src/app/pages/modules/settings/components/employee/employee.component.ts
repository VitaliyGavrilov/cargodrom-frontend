import { byField } from './../../../../../constants/sort-predicate';
import { Department, Employee, Position } from './../../../../../api/custom_models';
import { CompanyService } from './../../../../../api/services/company.service';
import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  departments: Department[] = [];
  positions: Position[] = [];
  companies: any[] = [];
  total = 0;
  start = 0;
  limits = [10, 25, 50, 100];
  count = this.limits[0];
  @ViewChild('removeDialogRef') removeDialogRef!: TemplateRef<Employee>;

  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadPositions();
    this.loadDepartments();
    this.loadCompanies();
  }

  loadEmployees(): void {
    this.companyService.companyEmployeeList().subscribe(employees => {
      const allEmployees = employees ? employees as Employee[] : [];
      allEmployees.sort(byField('name_f', 'asc', 'case-insensitive'));
      this.total = allEmployees.length;
      this.employees = allEmployees.slice(this.start, this.start + this.count);
    });
  }
  
  loadDepartments(): void {
    this.companyService.companyDepartmentList().subscribe(departments => {
      this.departments = departments ? departments as Department[] : [];
    });
  }
  
  loadPositions(): void {
    this.companyService.companyPositionList().subscribe(positions => {
      this.positions = positions ? positions as Position[] : [];
    });
  }

  loadCompanies(): void {
    this.companyService.companyList().subscribe(companies => {
      this.companies = companies ? companies as any[] : [];
    });
  }
  
  getPositionById(id: number): string | undefined {
    return this.positions.find(position => position.id === id)?.name;
  }
  
  getDepartmentById(id: number): string | undefined {
    return this.departments.find(department => department.id === id)?.name;
  }
  
  getCompanyById(id: number): string | undefined {
    return this.companies.find(company => company.id === id)?.name;
  }
  
  onStartChange(newStart: number): void {
    this.start = newStart;
    this.loadEmployees();
  }
  
  onCountChange(newCount: number): void {
    this.start = 0;
    this.count = newCount;
    this.loadEmployees();
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
          this.loadEmployees();
        },
        error: (err) => this.snackBar.open(`Ошибка удаления сотрудника: ` + err.error.error_message, undefined, { duration: 1000 })
      });
  }
  
}
