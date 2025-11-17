import { emailValidator, innValidator } from './../../../validators/pattern-validator';
import { Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { City, Client, ClientGroup, Country, Employee, FileDocument } from 'src/app/api/custom_models';
import { CompanyService, CustomerService, SystemService } from 'src/app/api/services';
import { Editor } from 'src/app/shared/classes/editor';
import { Location } from '@angular/common';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { byField } from 'src/app/shared/constants';
import { FileListComponent } from '../file-list/file-list.component';

@Component({
  selector: 'app-client-editor',
  templateUrl: './client-editor.component.html',
  styleUrls: ['./client-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClientEditorComponent extends Editor<Client> implements OnInit {
  private entity = 'Клиент';
  editTitle = 'Информация о клиенте';
  newTitle = 'Добавление клиента';
  savedMessage = `${this.entity} сохранен`;
  removedMessage = `${this.entity} удален`;
  createdMessage = `${this.entity} создан`;
  notFoundMessage = `${this.entity} не найден`;

  countries: Country[] = []; filteredCountries: Country[] = [];
  cities: City[] = []; filteredCitys: City[] = [];
  clientGroups: ClientGroup[] = []; filteredClientGroups: ClientGroup[] = [];

  employees: Employee[] = []; filteredEmployeesForClient: Employee[] = []; filteredEmployeesForSale: Employee[] = [];
  documents: FileDocument[] = [];

  @ViewChild('fileList', { static: true }) fileList!: FileListComponent;

  constructor(
    private fb: FormBuilder,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    systemService: SystemService,
    location: Location,
    router: Router,
    private customerService: CustomerService,
    private companyService: CompanyService,
    private cityService: CityService,
    private countryService: CountryService,
  ) {
    super(location, systemService, route, snackBar, router);
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      name_full: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      inn: ['', [innValidator]],
      kpp: ['', []],
      ogrn: ['', []],
      okpo: ['', []],
      head_name: ['', []],
      head_position_id: ['', []],
      signature_fio: ['', []],
      signature_position: ['', []],
      signature_basis: ['', []],
      address_legal: ['', []],
      address_post: ['', []],
      contact_fio: ['', [Validators.required]],
      phone: ['', []],
      email: ['', [emailValidator]],
      web: ['', []],

      group_id: ['', []],
      business_id: ['', []],
      interaction_id: ['', []],
      source_id: ['', []],
      status_id: ['', []],
      counterparty_id: ['', []],

      service_ids: [[], []],

      document_address: ['', []],
      document_path: ['', []],
      documents_path: ['', []],
      document_contact_fio: ['', []],
      document_contact_phone: ['', []],

      bank_name: ['', []],
      bank_bik: ['', []],
      bank_kpp: ['', []],
      bank_payment_account: ['', []],
      bank_correspondent_account: ['', []],
      // currency: ['', []],
      bank_currency_id: ['', []],

      accountant_fio: ['', []],
      accountant_phone: ['', []],

      delivery_address: ['', []],
      delivery_contact_fio: ['', []],
      delivery_contact_phone: ['', []],

      note: ['', []],
      warehouse_schedule: ['', []],
      manager_id: ['', []],
      manager_sale_id: ['', []],
    });
  }

  override ngOnInit(): void {

    this.getCountries();
    this.loadHeadPositions();
    this.loadClientGroups();
    this.loadBusinessKinds();
    this.loadInteractionKinds();
    this.loadContactSources();
    this.loadClientStatuses();
    this.loadClientKinds();
    this.loadServiceKinds();
    this.loadEmployees();
    this.loadCurrencies();

    this.subscribeControl_CountryId();
    this.subscribeControl_CityId();
    this.subscribeControl_ClientGroupId();
    // this.subscribeControl_ClientStatusId();
    this.subscribeControl_ClientKindId();
    this.subscribeControl_BusinessKindId();
    this.subscribeControl_ContactSourceId();
    this.subscribeControl_EmployeeForClientId();
    this.subscribeControl_EmployeeForSaleId();

    setTimeout(() => super.ngOnInit(), 1500);

  }

  subscribeControl_CountryId(){
    this.form.get('country_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      // takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredCountries = this.countries.filter((item: any) => {
          return item.name && item.name.toLowerCase().includes(value.toLowerCase());
        });
        if(this.filteredCountries.length==1){
          if(this.filteredCountries[0].name?.toLowerCase()===value.toLowerCase()){
            this.form.patchValue({
              country_id: this.filteredCountries[0].id,
            });
            this.onCountryChange(this.filteredCountries[0].id);
          };
        };
      }
    });
  }
  subscribeControl_CityId(){
    this.form.get('city_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      // takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredCitys = this.cities.filter((item: any) => {
          return item.name && item.name.toLowerCase().includes(value.toLowerCase());
        });
        if(this.filteredCitys.length==1){
          if(this.filteredCitys[0].name?.toLowerCase()===value.toLowerCase()){
            this.form.patchValue({
              city_id: this.filteredCitys[0].id,
            });
          };
        };
      }
    });
  }
  subscribeControl_ClientGroupId(){
    this.form.get('group_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      // takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredClientGroups = this.clientGroups.filter((item: any) => {
          return item.name && item.name.toLowerCase().includes(value.toLowerCase());
        });
        if(this.filteredClientGroups.length==1){
          if(this.filteredClientGroups[0].name?.toLowerCase()===value.toLowerCase()){
            this.form.patchValue({
              group_id: this.filteredClientGroups[0].id,
            });
          };
        };
      }
    });
  }
  // subscribeControl_ClientStatusId(){
  //   this.form.get('status_id')?.valueChanges
  //   .pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     // takeUntil(this._destroy$),
  //   )
  //   .subscribe((value: any) => {
  //     if(typeof value==='string'){
  //       this.filteredClientStatuses = this.clientStatuses.filter((item: any) => {
  //         return item.name && item.name.toLowerCase().includes(value.toLowerCase());
  //       });
  //       if(this.filteredClientStatuses.length==1){
  //         if(this.filteredClientStatuses[0].name?.toLowerCase()===value.toLowerCase()){
  //           this.form.patchValue({
  //             status_id: this.filteredClientStatuses[0].id,
  //           });
  //         };
  //       };
  //     }
  //   });
  // }
  subscribeControl_ClientKindId(){
    this.form.get('counterparty_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      // takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredClientKinds = this.clientKinds.filter((item: any) => {
          return item.name && item.name.toLowerCase().includes(value.toLowerCase());
        });
        if(this.filteredClientKinds.length==1){
          if(this.filteredClientKinds[0].name?.toLowerCase()===value.toLowerCase()){
            this.form.patchValue({
              counterparty_id: this.filteredClientKinds[0].id,
            });
          };
        };
      }
    });
  }
  subscribeControl_BusinessKindId(){
    this.form.get('business_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      // takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredBusinessKinds = this.businessKinds.filter((item: any) => {
          return item.name && item.name.toLowerCase().includes(value.toLowerCase());
        });
        if(this.filteredBusinessKinds.length==1){
          if(this.filteredBusinessKinds[0].name?.toLowerCase()===value.toLowerCase()){
            this.form.patchValue({
              business_id: this.filteredBusinessKinds[0].id,
            });
          };
        };
      }
    });
  }
  subscribeControl_ContactSourceId(){
    this.form.get('source_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      // takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredContactSources = this.contactSources.filter((item: any) => {
          return item.name && item.name.toLowerCase().includes(value.toLowerCase());
        });
        if(this.filteredContactSources.length==1){
          if(this.filteredContactSources[0].name?.toLowerCase()===value.toLowerCase()){
            this.form.patchValue({
              source_id: this.filteredContactSources[0].id,
            });
          };
        };
      }
    });
  }
  subscribeControl_EmployeeForClientId(){
    this.form.get('manager_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      // takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredEmployeesForClient = this.employees.filter((item: any) => {
          return item.name_i && item.name_i.toLowerCase().includes(value.toLowerCase());
        });
        if(this.filteredEmployeesForClient.length==1){
          if(this.filteredEmployeesForClient[0].name_i?.toLowerCase()===value.toLowerCase()){
            this.form.patchValue({
              manager_id: this.filteredEmployeesForClient[0].id,
            });
          };
        };
      }
    });
  }
  subscribeControl_EmployeeForSaleId(){
    this.form.get('manager_sale_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      // takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredEmployeesForSale = this.employees.filter((item: any) => {
          return item.name_i && item.name_i.toLowerCase().includes(value.toLowerCase());
        });
        if(this.filteredEmployeesForSale.length==1){
          if(this.filteredEmployeesForSale[0].name_i?.toLowerCase()===value.toLowerCase()){
            this.form.patchValue({
              manager_sale_id: this.filteredEmployeesForSale[0].id,
            });
          };
        };
      }
    });
  }


  displayFn_EmployeeForSaleId(id: any): string {
    if (!this.employees) {
      return '';
    }
    const obj = this.employees.find(obj => obj.id === id);
    return obj?.name_i || '';
  }
  displayFn_EmployeeForClientId(id: any): string {
    if (!this.employees) {
      return '';
    }
    const obj = this.employees.find(obj => obj.id === id);
    return obj?.name_i || '';
  }
  displayFn_ContactSourceId(id: any): string {
    if (!this.contactSources) {
      return '';
    }
    const obj = this.contactSources.find(obj => obj.id === id);
    return obj?.name || '';
  }
  displayFn_BusinessKindId(id: any): string {
    if (!this.businessKinds) {
      return '';
    }
    const obj = this.businessKinds.find(obj => obj.id === id);
    return obj?.name || '';
  }
  displayFn_ClientKindId(id: any): string {
    if (!this.clientKinds) {
      return '';
    }
    const obj = this.clientKinds.find(obj => obj.id === id);
    return obj?.name || '';
  }
  displayFn_ClientStatusesId(id: any): string {
    if (!this.clientStatuses) {
      return '';
    }
    const obj = this.clientStatuses.find(obj => obj.id === id);
    return obj?.name || '';
  }
  displayFn_ClientGroupId(id: any): string {
    if (!this.clientGroups) {
      return '';
    }
    const obj = this.clientGroups.find(obj => obj.id === id);
    return obj?.name || '';
  }
  displayFn_CityId(id: any): string {
    if (!this.cities) {
      return '';
    }
    const obj = this.cities.find(obj => obj.id === id);
    return obj?.name || '';
  }
  displayFn_CountryId(id: any): string {
    if (!this.countries) {
      return '';
    }
    const obj = this.countries.find(obj => obj.id === id);
    return obj?.name || '';
  }


  private afterRead(client: Client): void {
    this.getCities(client.country_id!);
    this.documents = client.documents_file || [];
  }

  protected override create(params: { body: Omit<Client, 'id'>; }): Observable<{ id: number; }> {
    return this.customerService.customerCreate(params as any);
  }

  protected override afterCreate(body: { id: number; }): Observable<{ id: number; }> {
    return this.fileList.create(body.id).pipe(map(() => ({id: body.id})));
  }

  protected override read(params: { id: number; }): Observable<Client> {
    return this.customerService.customerInfo(params).pipe(tap((client: any) => this.afterRead(client))) as Observable<Client>
  }

  protected override update(params: { body: Partial<Client>; }): Observable<void> {
    return this.customerService.customerUpdate(params as any) as unknown as Observable<void>;
  }

  protected override afterUpdate(): Observable<void> {
    return this.fileList.update();
  }

  protected override delete(params: { body: { id: number; }; }): Observable<void> {
    return this.customerService.customerDelete(params as any) as unknown as Observable<void>;
  }

  protected override afterDelete(): Observable<void> {
    return this.fileList.delete();
  }

  protected override getNameForHeader(body: Client): string {
    return `${body.name}`;
  }

  private getCountries() {
    this.countryService.getCountries()
      .subscribe(countries => {
        this.filteredCountries = countries;
        this.countries = countries;
      } );
  }

  private getCities(countryId: number) {
    this.cityService.getCities(countryId)
      .subscribe(cities => {
        this.filteredCitys = cities;
        this.cities = cities;
      } );
  }

  loadEmployees(): void {
    this.companyService.companyEmployeeList().subscribe(employees => {
      this.employees = employees ? employees.items as Employee[] : [];
      this.filteredEmployeesForClient = employees ? employees.items as Employee[] : [];
      this.filteredEmployeesForSale = employees ? employees.items as Employee[] : [];
    });
  }

  onCountryChange(countryId: number): void {
    this.form.controls['city_id'].reset(undefined);
    this.getCities(countryId);
  }

  loadClientGroups(): void {
    this.customerService.customerGroupList().subscribe(
      groups => {
        this.filteredClientGroups = groups.items ? (groups.items as ClientGroup[]).sort(byField('name', 'asc', 'case-insensitive')) : [];
        this.clientGroups = groups.items ? (groups.items as ClientGroup[]).sort(byField('name', 'asc', 'case-insensitive')) : [];
      }
    );
  }

  onDocumentsPathChange(newPath: string): void {
    this.form.patchValue({documents_path: newPath} as Partial<Client>);
  }

}
