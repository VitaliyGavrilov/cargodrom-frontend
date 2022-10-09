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
  employees: any;
  total = 0;
  start = 0;
  limits = [25, 50, 100];
  count = this.limits[0];

  constructor(
    private companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.companyService.companyEmployeeList().subscribe(employees => {
      console.log(employees);
      this.employees = employees ? Object.values(employees) : [];
      this.total = this.employees.length;
      console.log(JSON.stringify(employees, null, 2));
      console.log(JSON.stringify(this.employees, null, 2));
    });
  }

  onStartChange(newStart: number): void {
    this.loadEmployees();
  }

  onCountChange(newCount: number): void {
    this.loadEmployees();
  }

}
