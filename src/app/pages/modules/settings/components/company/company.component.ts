import { CompanyService } from './../../../../../api/services/company.service';
import { Company } from './../../../../../api/custom_models/company';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { byName } from 'src/app/constants';

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

  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.companyList().subscribe(companies => {
      const allCompanies = companies ? companies as unknown as Company[] : [];
      allCompanies.sort(byName('asc'));
      this.total = allCompanies.length;
      this.companies = allCompanies.slice(this.start, this.start + this.count);
    });
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
      next: () => company.general = general ? 1 : 0,
      error: (err) => this.snackBar.open(`Ошибка: ` + err.error.error_message, undefined, { duration: 1000 })
    });
  }

}
