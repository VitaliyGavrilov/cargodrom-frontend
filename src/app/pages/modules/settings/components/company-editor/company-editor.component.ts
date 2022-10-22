import { SettingsEditor } from './../../classes/settings-editor';
import { emailValidator, innValidator } from './../../../../../validators';
import { CompanyService } from './../../../../../api/services/company.service';
import { Company } from './../../../../../api/custom_models/company';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-company-editor',
  templateUrl: './company-editor.component.html',
  styleUrls: ['./company-editor.component.scss']
})
export class CompanyEditorComponent extends SettingsEditor<Company> implements OnInit {

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

  override ngOnInit(): void {
    super.ngOnInit();
    this.getTaxSystems();
    this.getCurrencies();
    this.loadEmployees();
    this.title = this.isEditMode ? 'Редактирование организации' : 'Добавление организации';
  }
  
  protected create(params: {body: Omit<Company, 'id'>}) {
   return this.companyService.companyCreate(params as any) as unknown as Observable<Company>; 
  }
  
  protected read(params: { id: number; }): Observable<Company> {
    return this.companyService.companyInfo(params) as Observable<Company>;
  }
  
  protected update(params: { body: Partial<Company>; }): Observable<void> {
    return this.companyService.companyUpdate(params as any) as unknown as Observable<void>;
  }
  
  protected delete(params: {body: { id: number; }}): Observable<void> {
    return this.companyService.companyDelete(params) as unknown as Observable<void>;
  }

}
