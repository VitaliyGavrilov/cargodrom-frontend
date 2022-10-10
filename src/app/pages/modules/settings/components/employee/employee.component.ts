import { Department, Employee, Position } from './../../../../../api/custom_models';
import { CompanyService } from './../../../../../api/services/company.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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
  limits = [25, 50, 100];
  count = this.limits[0];

  constructor(
    private companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadPositions();
    this.loadDepartments();
    this.loadCompanies();
  }

  loadEmployees(): void {
    this.companyService.companyEmployeeList().subscribe(employees => {
      this.employees = employees ? employees as Employee[] : [];
      this.total = this.employees.length;
      console.table(this.employees);
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
    this.loadEmployees();
  }

  onCountChange(newCount: number): void {
    this.loadEmployees();
  }

}
