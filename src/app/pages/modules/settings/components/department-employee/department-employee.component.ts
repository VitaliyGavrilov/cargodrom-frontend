import { TmplAstVariable } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department-employee',
  templateUrl: './department-employee.component.html',
  styleUrls: [
    './department-employee.component.scss',
    '../../main-table.scss'
  ]
})
export class DepartmentEmployeeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
