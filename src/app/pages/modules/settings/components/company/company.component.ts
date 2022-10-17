import { Employee } from 'src/app/api/custom_models';
import { CompanyService } from './../../../../../api/services/company.service';
import { Company } from './../../../../../api/custom_models/company';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { byField } from 'src/app/constants';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss', '../../main-table.scss']
})
export class CompanyComponent implements OnInit {
  companies: Company[] = [];
  total = 0;
  start = 0;
  limits = [10, 25, 50, 100];
  count = this.limits[0];
  @ViewChild('removeDialogRef') removeDialogRef!: TemplateRef<Company>;
  employees: Employee[] = [];

  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadCompanies();
    this.loadEmployees();
  }

  loadCompanies(): void {
    this.companyService.companyList().subscribe(companies => {
      const allCompanies = companies ? companies as unknown as Company[] : [];
      allCompanies.sort(byField('name', 'asc', 'case-insensitive'));
      this.total = allCompanies.length;
      this.companies = allCompanies.slice(this.start, this.start + this.count);
    });
  }

  loadEmployees(): void {
    this.companyService.companyEmployeeList().subscribe(
      employees => this.employees = employees ? employees as Employee[] : []
    );
  }
  
  findEmployeeById(id: number) {
    return this.employees.find(employee => employee.id === id);
  }


  onStartChange(newStart: number): void {
    this.start = newStart;
    this.loadCompanies();
  }

  onCountChange(newCount: number): void {
    this.start = 0;
    this.count = newCount;
    this.loadCompanies();
  }

  confirmRemove(company: Company): void {
    this.dialog.open(this.removeDialogRef, { data: company }).afterClosed().subscribe(res => {
      if (res) {
        this.removeCompany(company);
      }
    });
  }

  removeCompany(company: Company): void {
    const body = { id: company.id };
    this.companyService.companyDelete({ body })
      .subscribe({
        next: () => {
          this.snackBar.open(`Организация ${company.name} удалена`, undefined, { duration: 1000 });
          this.loadCompanies();
        },
        error: (err) => this.snackBar.open(`Ошибка удаления организации: ` + err.error.error_message, undefined, { duration: 1000 })
      });
  }

  onGeneralChange(general: boolean | 0 | 1, company: Company): void {
    const body = { ...company, general: general ? 1 : 0 } as any;
    this.companyService.companyUpdate({ body }).subscribe({
      next: () => this.loadCompanies(),
      error: (err) => this.snackBar.open(`Ошибка: ` + err.error.error_message, undefined, { duration: 1000 })
    });
  }

}
