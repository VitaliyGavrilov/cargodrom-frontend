import { Department } from './../../../../../api/custom_models/department';
import { CompanyService } from './../../../../../api/services/company.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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
  limits = [25, 50, 100];
  count = this.limits[0];

  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.companyService.companyDepartmentList().subscribe(departments => {
      this.departments = departments ? departments as Department[] : [];
      this.total = this.departments.length;
    });
  }

  onStartChange(newStart: number): void {
    this.loadDepartments();
  }

  onCountChange(newCount: number): void {
    this.loadDepartments();
  }

}
