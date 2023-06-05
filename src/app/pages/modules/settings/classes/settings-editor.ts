import { byField } from './../../../../constants/sort-predicate';
import { Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from './../../../../api/services/company.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Company, Department, Employee, Position } from "src/app/api/custom_models";
import { Location } from '@angular/common';
import { SystemService } from 'src/app/api/services';
import { Editor } from 'src/app/classes/editor';

@Directive()
export abstract class SettingsEditor<T> extends Editor<T> {
  employees: Employee[] = [];
  companies: Company[] = [];
  departments: Department[] = [];
  positions: Position[] = [];

  constructor(
    location: Location,
    protected companyService: CompanyService,
    systemService: SystemService,
    route: ActivatedRoute,
    snackBar: MatSnackBar,
    router: Router,
  ) {
    super(location, systemService, route, snackBar, router);
   }

  loadEmployees(): void {
    this.companyService.companyEmployeeList().subscribe(employees => {
      this.employees = employees ? employees.items as Employee[] : [];
    });
  }

  loadCompanies(): void {
    this.companyService.companyList().subscribe(
      companies => this.companies = companies ? (companies.items as Company[]).sort(byField('name', 'asc', 'case-insensitive')) : []
    );
  }

  loadDepartments(): void {
    this.companyService.companyDepartmentList().subscribe(
      departments => this.departments = departments ? (departments.items as Department[]).sort(byField('name', 'asc', 'case-insensitive')) : []
    );
  }

  loadPositions(): void {
    this.companyService.companyPositionList().subscribe(
      positions => this.positions = positions ? (positions.items as Position[]).sort(byField('name', 'asc', 'case-insensitive')) : []
    );
  }

}
