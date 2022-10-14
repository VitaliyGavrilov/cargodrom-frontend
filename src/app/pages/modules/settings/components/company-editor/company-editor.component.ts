import { CompanyService } from './../../../../../api/services/company.service';
import { Company } from './../../../../../api/custom_models/company';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-company-editor',
  templateUrl: './company-editor.component.html',
  styleUrls: ['./company-editor.component.scss']
})
export class CompanyEditorComponent implements OnInit {

  form: FormGroup;
  isEditMode = false;
  company: Partial<Company> = {};
  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 5000 };
  title = '';

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const segments = this.route.snapshot.url.map(s => s.path);
    this.isEditMode = segments[1] === 'edit';
    if (this.isEditMode) {
      this.getCompany();
    }
    this.title = this.isEditMode ? 'Редактирование организации' : 'Добавление организации';
  }

  getCompany(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.companyService.companyInfo({ id })
      .pipe(tap(company => {
        // currently, when company doesn't exist the service returns HTTP 200 with empty response body instead of HTTP 404
        // therefore we have to handle that case manually
        if (!company) {
          throw ({ error: { error_message: `организация не существует` } });
        }
      }))
      .subscribe({
        next: company => {
          this.company = company as Company;
          this.form.patchValue(this.company);
        },
        error: (err: any) => {
          this.snackBar.open(`Организация не найдена: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
          this.goToCompanies();
        }
      });
  }

  goToCompanies(): void {
    this.router.navigate(['/pages/settings/company']);
  }
  save(): void {
    if (!this.form.valid) {
      this.snackBar.open('Не все поля заполнены корректно', undefined, this.snackBarWithLongDuration);
      return;
    }
    const body = this.form.value;
    if (typeof this.company.id === 'number') {
      this.updateCompany(body);
    } else {
      this.createCompany(body);
    }
  }

  private createCompany(body: any) {
    this.companyService.companyCreate({ body }).pipe().subscribe({
      next: ({ id }) => {
        this.goToCompanies();
        this.snackBar.open(`Организация создана`, undefined, this.snackBarWithShortDuration)
      },
      error: (err) => this.snackBar.open(`Ошибка создания организации: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  updateCompany(body: any) {
    this.companyService.companyUpdate({ body }).pipe().subscribe({
      next: () => {
        this.snackBar.open(`Организация сохранена`, undefined, this.snackBarWithShortDuration);
        this.goToCompanies();
      },
      error: (err) => this.snackBar.open(`Ошибка сохранения организации: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }
  
  remove(): void {
    const body = { id: this.company.id! };
    this.companyService.companyDelete({ body })
      .subscribe({
        next: () => {
          this.snackBar.open(`Организация ${this.company.name} удалена`, undefined, {duration: 1000});
          this.goToCompanies();
        },
        error: (err) => this.snackBar.open(`Ошибка удаления организации: ` + err.error.error_message, undefined, {duration: 1000})
      });
  }

}
