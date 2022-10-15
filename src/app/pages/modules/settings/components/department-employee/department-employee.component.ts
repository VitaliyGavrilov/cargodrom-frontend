import { MatDialog } from '@angular/material/dialog';
import { Position } from './../../../../../api/custom_models/position';
import { Employee } from './../../../../../api/custom_models/employee';
import { CompanyService } from 'src/app/api/services/company.service';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-department-employee',
  templateUrl: './department-employee.component.html',
  styleUrls: [
    './department-employee.component.scss',
    '../../main-table.scss'
  ]
})
export class DepartmentEmployeeComponent implements OnInit {
  @Input() departmentId?: number;
  employees: Employee[] = [];
  positions: Position[] = [];
  @ViewChild('removeDialogRef') removeDialogRef!: TemplateRef<Employee>;


  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    if (typeof this.departmentId === 'number') {
      this.loadEmployeesForDepartment(this.departmentId);
    }
    this.loadPositions();
  }
  
  loadEmployeesForDepartment(departmentId: number): void {
    const params = { department_id: departmentId };
    this.companyService.companyEmployeeList(params)
      .subscribe(employees => {
        this.employees = employees ? employees as Employee[] : []; 
      })
  }

  loadPositions(): void {
    this.companyService.companyPositionList()
      .subscribe(positions => {
        this.positions = positions ? positions as Position[] : []; 
      })
  }
  
  getPositionById(id: number): string | undefined {
    return this.positions.find(position => position.id === id)?.name;
  }
  
  
  save(departmentId?: number): void {
    
  }
  
  onDepartmentLeaderChange(employee: Employee, isLeader: boolean): void {
    employee.department_leader = isLeader ? 1 : 0;
  }
  
  confirmRemove(employee: Employee): void {
    this.dialog.open(this.removeDialogRef, { data: employee }).afterClosed().subscribe(res => {
      if (res) {
        this.removeEmployeeFromDepartment(employee);
      }
    });
  }

  removeEmployeeFromDepartment(employee: Employee): void {

  }

}
