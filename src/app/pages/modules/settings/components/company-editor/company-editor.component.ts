import { SettingsEditor } from './../../classes/settings-editor';
import { emailValidator, innValidator } from './../../../../../validators';
import { CompanyService } from './../../../../../api/services/company.service';
import { Company } from './../../../../../api/custom_models/company';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-company-editor',
  templateUrl: './company-editor.component.html',
  styleUrls: ['./company-editor.component.scss']
})
export class CompanyEditorComponent extends SettingsEditor implements OnInit {

  company: Partial<Company> = {};

  constructor(
    private fb: FormBuilder,
    snackBar: MatSnackBar,
    companyService: CompanyService,
    route: ActivatedRoute,
    location: Location,
  ) {
    super(location, companyService, route, snackBar);
    this.form = this.fb.group({
      id: ['', []],
      tax_system: ['', []],
      name: ['', [Validators.required]],
      name_short: ['', []],
      jur_address: ['', []],
      post_address: ['', []],
      inn: ['', [innValidator]],
      kpp: ['', []],
      ogrn: ['', []],
      okpo: ['', []],
      email: ['', [emailValidator]],
      phone: ['', []],
      website: ['', []],
      skype: ['', []],
      responsible_person_id: ['', []],
      responsible_person_position: ['', []],
      responsible_person_base: ['', []],
      responsible_person_fio: ['', []],
      chief_accountant_id: ['', []],
      bank_name: ['', []],
      bank_rs: ['', []],
      bank_ks: ['', []],
      bank_bik: ['', []],
      bank_kpp: ['', []],
      bank_currency: ['', []],
      noresident_name: ['', []],
      noresident_address: ['', []],
      noresident_phone: ['', []],
      noresident_email: ['', [emailValidator]],
      noresident_skype: ['', []],
      noresident_website: ['', []],
      noresident_signatory_id: ['', []],
      noresident_signatory_position: ['', []],
      noresident_signatory_fio: ['', []],
      noresident_bank_name: ['', []],
      noresident_bank_address: ['', []],
      noresident_bank_currency: ['', []],
      noresident_bank_rs: ['', []],
      noresident_bank_rs_name: ['', []],
      noresident_bank_swift: ['', []],
      noresident_bank_im: ['', []],
      base_currency: [''],
    });
  }

  ngOnInit(): void {
    this.detectEditMode();
    this.getTaxSystems();
    this.getCurrencies();
    if (this.isEditMode) {
      this.getCompany();
    }
    this.loadEmployees();
    this.title = this.isEditMode ? 'Редактирование организации' : 'Добавление организации';
  }

  getCompany(): void {
    const id = this.getIdParam();
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
        error: (err: any) => this.showErrorMessageAndGoBack(err, `Организация не найдена`)
      });
  }

  save(): void {
    this.isFormSubmitted = true;
    if (!this.form.valid) {
      this.showSimpleErrorMessage('Не все поля заполнены корректно');
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
      next: () => this.showSuccessMessageAndGoBack(`Организация создана`),
      error: (err) => this.showErrorMessage(err, `Ошибка создания организации`)
    });
  }

  updateCompany(body: any) {
    this.companyService.companyUpdate({ body }).pipe().subscribe({
      next: () => this.showSuccessMessageAndGoBack(`Организация сохранена`),
      error: (err) => this.showErrorMessage(err, `Ошибка сохранения организации`)
    });
  }

  remove(): void {
    const body = { id: this.company.id! };
    this.companyService.companyDelete({ body })
      .subscribe({
        next: () => this.showSuccessMessageAndGoBack(`Организация ${this.company.name} удалена`),
        error: (err) => this.showErrorMessage(err, 'Ошибка удаления организации')
      });
  }

}
