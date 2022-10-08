import { Department } from './../../../../../api/custom_models/department';
import { CompanyService } from './../../../../../api/services/company.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  // departments: Department[] = [];
  departments: Department[] = [];

  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.companyService.companyDepartmentList().subscribe(departments => {
      this.departments = Object.values(departments) as unknown as Department[];
      console.log(JSON.stringify(departments, null, 2));
      console.log(JSON.stringify(this.departments, null, 2));
    });
  }

}
