import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from './../../../../../api/custom_models/employee';
import { CompanyService } from 'src/app/api/services/company.service';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Position } from 'src/app/api/custom_models';

@Component({
  selector: 'app-department-employee',
  templateUrl: './department-employee.component.html',
  styleUrls: [
    './department-employee.component.scss',
    '../../main-table.scss'
  ]
})
export class DepartmentEmployeeComponent implements OnInit {
  @Input() departmentId!: number;
  employees: Employee[] = [];
  positions: Position[] = [];
  @ViewChild('removeDialogRef') removeDialogRef!: TemplateRef<Employee>;


  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {

  }

  ngOnInit(): void {
    this.loadEmployeesForDepartment(this.departmentId);
    this.loadPositions();
  }

  loadEmployeesForDepartment(departmentId: number): void {
    const params = { department_id: departmentId };
    this.companyService.companyEmployeeList(params)
      .subscribe(employees => {
        this.employees = employees ? employees.items as Employee[] : [];
      })
  }

  loadPositions(): void {
    this.companyService.companyPositionList()
      .subscribe(positions => {
        this.positions = positions ? positions.items as Position[] : [];
      })
  }

  getPositionById(id: number): string | undefined {
    return this.positions.find(position => position.id === id)?.name;
  }

  onDepartmentLeaderChange(employee: Employee, isLeader: boolean): void {
    const body = {...employee, department_leader: isLeader ? 1: 0} as any;
    this.companyService.companyEmployeeUpdate({body}).subscribe(() => this.loadEmployeesForDepartment(this.departmentId));
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
          this.snackBar.open(`Сотрудник ${employee.name_f} удалена`, undefined, {duration: 1000});
          this.loadEmployeesForDepartment(this.departmentId);
        },
        error: (err) => this.snackBar.open(`Ошибка удаления сотрудника: ` + err.error.error_message, undefined, {duration: 1000})
      });
  }

}
