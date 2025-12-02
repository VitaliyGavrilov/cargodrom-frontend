import { CountryService } from './../../services/country.service';
import { environment } from './../../../../environments/environment';
import { catchError, debounceTime, distinctUntilChanged, forkJoin, fromEvent, lastValueFrom, merge, Subject, takeUntil, tap, throwError } from 'rxjs';
import { City } from './../../../api/custom_models/city';
import { Association } from './../../../api/custom_models/association';
import { Country } from './../../../api/custom_models/country';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contractor, ContractorRequestFormat, ContractorType } from './../../../api/custom_models/contractor';
import { ContractorService } from './../../../api/services/contractor.service';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CityService } from '../../services/city.service';
import { Location } from '@angular/common';
import { TaxSystem } from 'src/app/api/custom_models';
import { DirectionService, SystemService, TransportService } from 'src/app/api/services';
import { Counterparty } from 'src/app/api/custom_models/counterparty';


@Component({
  selector: 'app-contractor-editor',
  templateUrl: './contractor-editor.component.html',
  styleUrls: ['./contractor-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContractorEditorComponent implements OnInit {
  carrierFilterCtrl = new FormControl();
  isNavigateAfterSave:boolean=true;

  contractor: Partial<Contractor> = {};
  isEditMode: boolean = false;
  contractorForm: FormGroup;
  associations: Association[] = [];

  contractorTypes: ContractorType[] = []; filteredContractorTypes: ContractorType[] = [];
  transportCarrier:any[]=[]; filteredTransportCarrier:any[]=[];
  countries: Country[] = []; filteredCountries: Country[] = [];
  cities: any[] = []; filteredCitys: any[] = [];

  counterpartys:Counterparty[]=[]; filteredCounterpartys:Counterparty[]=[];
  currencyList:any;

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 3000 };
  requestFormats: ContractorRequestFormat[] = [];
  production = environment.production;
  title = '';
  taxSystems: TaxSystem[] = []; filteredTaxs: TaxSystem[] = [];
  nameForHeader?: string;
  // counterpartys:Counterparty[]=[];
  formParams:any;

  private _destroy$ = new Subject();


  // change$ = new Subject<string|undefined>();



  constructor(
    private route: ActivatedRoute,
    private contractorService: ContractorService,
    private countryService: CountryService,
    private cityService: CityService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
    private systemService: SystemService,
    private transportService: TransportService,
    private directionService: DirectionService,
  ) {
    this.contractorForm = this.fb.group({
      id: [''],
      address: [''],
      name: [''],
      ind: [''],
      phone: [''],
      web: [''],
      rating_nps: [{ value: 0, disabled: true }],
      user_rating_nps: [{ value: 0, disabled: true }],
      contacts: fb.array([], []),
      association_id: [[]],
      tax_id: [undefined],
      // type_id: [undefined, [Validators.required]],
      type_id: [],
      language_id: [undefined],
      country_id: [],
      city_id: [],
      request_format_id: [''],
      // exclude_from_trade: [false]
      allow_trade:[false],
      counterparty_id: [],
      // carrier_name:[,[]],
      carrier_id:[[],[]],
      currency:[,[]]
    });

    // this.change$
    // .pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged(),
    // )
    // .subscribe((e) => {
    //   this.getTransportCarrier(e)
    // });
  }
  test(i:any,c:any){
    console.log(i,c);

  }

  isRequiredField(field: string): boolean {
    const control = this.contractorForm.get(field);
    return control?.hasValidator(Validators.required) ?? false;
  }

  onSearchChange(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredTransportCarrier = this.transportCarrier.filter(carrier =>
      carrier.full_name.toLowerCase().includes(searchText)
    );
  }
  displayName(item: any): string {
    return item ? item.full_name : '';
  }

  ngOnInit(): void {
    this.initialization_chooseModeForm();
    this.initialization_getDatas();
    // this.initialization_subscribeForm();
    this.getFormParam();


  }

  initialization_chooseModeForm(){
    const segments = this.route.snapshot.url.map(s => s.path);
    this.isEditMode = segments[0] !== 'add';
    this.title = this.isEditMode ? 'Информация о подрядчике' : 'Добавление подрядчика';
  }
  async initialization_getDatas() {
    try {
      await lastValueFrom(forkJoin([
        this.getContractorTypes(),
        this.getTransportCarrier(),
        this.getCountries(),
        this.getCities(),
        this.getCounterparty(),
        this.getTaxSystems(),
        this.getAssociations(),
        this.getRequestFormats(),
        this.getCurrency(),
      ]));
      // После завершения всех запросов проверяем режим редактирования
      if (this.isEditMode) {
        await lastValueFrom(this.getContractor()); // Преобразуем Observable в Promise
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }

  }


  displayFn_TaxId(id: any): string {
    if (!this.taxSystems) {
      return '';
    }
    const obj = this.taxSystems.find(obj => obj.id === id);
    return obj?.name || '';
  }
  displayFn_CounterpartyId(id: any): string {
    if (!this.counterpartys) {
      return '';
    }
    const obj = this.counterpartys.find(obj => obj.id === id);
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
  displayFn_CarrierId(id: any): string {
    if (!this.transportCarrier) {
      return '';
    }
    const obj = this.transportCarrier.find(obj => obj.id === id);
    return obj?.full_name || '';
  }
  displayFn_TypeId(id: any): string {
    if (!this.contractorTypes) {
      return '';
    }
    const obj = this.contractorTypes.find(obj => obj.id === id);
    return obj?.name || '';
  }



  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  // onChange(query: string|undefined) {
  //   this.change$.next(query);
  // }

  goBack(): void {
    this.location.back();
  }

  goToContractor(id: number): void {
    this.router.navigate(['..', id]);
  }

  removeContact(i: number): void {
    this.contacts.removeAt(i);
    this.contractorForm.markAsTouched();
  }

  addContact() {
    this.contacts.push(this.fb.control({
      contractor_id: this.contractor.id
    }));
    this.contractorForm.markAsTouched();
  }

  get contacts() {
    return <FormArray>this.contractorForm.get('contacts');
  }

  save(): void {
    console.log(this.contractorForm.value);

    if (!this.contractorForm.valid) {
      this.snackBar.open('Не все поля заполнены корректно', undefined, this.snackBarWithLongDuration);
      return;
    }
    const body = this.contractorForm.value;
    if (typeof this.contractor.id === 'number') {
      this.updateContractor(body);
    } else {
      this.createContractor(body);
    }
  }

  remove(): void {
    this.snackBar.open("Удаление подрядчика...", "Отменить", this.snackBarWithLongDuration)
      .afterDismissed().subscribe(res => {
        if (!res.dismissedByAction) {
          this.removeContractor();
        }
      });
  }

  get assocAsText(): string {
    const ids: string[] = this.contractorForm.controls['association_id'].value || [];
    return ids.map(id => this.associations.find(a => a.id === id)?.name).join(', ');
  }

  onContractorTypeChange(e:any){
    console.log(e);

    if(e?.contact_required){
      this.contractorForm.get('type_id')!.setValidators([Validators.required]);
    } else {
      this.contractorForm.get('type_id')!.setValidators([]);
      // this.contractorForm.get('type_id')!.clearValidators;
    }
  }

  onCountryChange(country:any) {
    if(country)console.log('onCountryChange',country);
    this.contractorForm.controls['city_id'].reset();
    this.updateFilteredCityList();
  }
  onCityChange(city:any) {
    if(city?.country_id!=this.contractorForm.value.country_id){
      this.patchCountryControl(city?.country_id)
    }
  }

  updateFilteredCityList(){
    const countryId = this.contractorForm.value.country_id;
    this.filteredCitys = countryId
    ? this.cities.filter(item => item.country_id == countryId)
    : this.cities
  }

  patchCountryControl(country_id:any){
    this.contractorForm.patchValue({
      country_id: country_id
    });
  }

  canSave(): boolean {
    return this.contractorForm.valid;
  }

  private updateContractor(body: any) {
    console.log(body);

    this.contractorService.contractorUpdate({ body }).pipe().subscribe({
      next: () => {
        if(this.isNavigateAfterSave){
          this.goBack();
        }
        this.snackBar.open(`Подрядчик сохранен`, undefined, this.snackBarWithShortDuration);
      },
      error: (err) => this.snackBar.open(`Ошибка сохранения подрядчика: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  private createContractor(body: any) {
    console.log(body);
    this.contractorService.contractorCreate({ body }).pipe().subscribe({
      next: ({ id }) => {
        if(this.isNavigateAfterSave){
          this.goBack();
        } else {
          this.goToContractor(id);
        }
        this.snackBar.open(`Подрядчик создан`, undefined, this.snackBarWithShortDuration)
      },
      error: (err) => this.snackBar.open(`Ошибка создания подрядчика: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  private removeContractor() {
    const body = { id: this.contractor.id! };
    this.contractorService.contractorDelete({ body }).subscribe({
      next: () => {
        this.snackBar.open('Подрядчик удален', undefined, this.snackBarWithShortDuration);
        this.goBack();
      },
      error: (err) => this.snackBar.open(`Ошибка сохранения подрядчика: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }


  // onTransportCarrierChange(i:any){
  //   this.contractorForm.patchValue({
  //     carrier_id:i.id
  //   })
  // }

  private getTransportCarrier() {
    return this.transportService.transportCarrier()
      .pipe(
        tap((transportCarrier) =>{
          this.transportCarrier = transportCarrier;
          this.filteredTransportCarrier = transportCarrier;
        }),
        takeUntil(this._destroy$)
      );
  }
  private getCounterparty() {
    return this.systemService.systemCounterparty()
      .pipe(
        tap((counterpartys) =>{
          this.filteredCounterpartys = counterpartys as Counterparty[];
          this.counterpartys = counterpartys as Counterparty[];
        }),
        takeUntil(this._destroy$)
      );
  }
  private getAssociations() {
    return this.systemService.systemAssociation()
      .pipe(
        tap((associations) =>{
          this.associations = associations as Association[]
        }),
        takeUntil(this._destroy$)
      );
  }

  private getContractorTypes() {
    return  this.contractorService.contractorType()
      .pipe(
        tap((contractorTypes) =>{
          this.contractorTypes = contractorTypes as unknown as ContractorType[];
          this.filteredContractorTypes = contractorTypes as unknown as ContractorType[];
        } ),
        takeUntil(this._destroy$)
      );
  }
  private getTaxSystems() {
    return  this.systemService.systemTaxSystem()
      .pipe(
        tap((taxSystems) =>{
          this.filteredTaxs = taxSystems ? taxSystems as TaxSystem[] : [];
          this.taxSystems = taxSystems ? taxSystems as TaxSystem[] : [];
        } ),
        takeUntil(this._destroy$)
      );
  }

  private getCountries() {
    return this.countryService.getCountries()
      .pipe(
        tap((countries) =>{
          this.filteredCountries = countries;
          this.countries = countries;
        }),
        takeUntil(this._destroy$)
      );
  }
  private getCities() {
    return this.directionService.directionCity()
      .pipe(
        tap((cities) =>{
          this.cities = cities;
          this.filteredCitys = cities;
        }),
        takeUntil(this._destroy$)
      );
  }
  private getRequestFormats() {
    return this.contractorService.contractorRequestFormat()
      .pipe(
        tap((formats) =>{
          this.requestFormats = formats as unknown as ContractorRequestFormat[];
        }),
        takeUntil(this._destroy$)
      );
  }

  // private getCities(countryId: number) {
  //   this.cityService.getCities(countryId)
  //     .subscribe(cities => {
  //       this.filteredCitys = cities;
  //       this.cities = cities;
  //     } );
  // }

  private getContractor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.contractorService.contractorInfo({ id }).pipe(
      tap((contractor) => {
        console.log('инициализация едитора', contractor);
        if (!contractor) {
          throw { error: { error_message: `Подрядчик не существует` } };
        }
      }),
      tap((contractor) => {
        this.contractor = contractor as unknown as Contractor;
        const contactsControls = this.contacts;

        // Обновляем contractor_id для каждого контакта
        this.contractor.contacts?.forEach((contact) => {
          contact.contractor_id = contractor.id;
          contactsControls.push(this.fb.control(contact));
        });

        // Патчим форму значениями подрядчика
        this.contractorForm.patchValue(this.contractor);

        // Если указан country_id, загружаем города
        // if (typeof contractor.country_id === 'number') {
        //   this.getCities(contractor.country_id);
        // }
        if(contractor.country_id)this.updateFilteredCityList();


        // Устанавливаем имя для заголовка
        this.nameForHeader = contractor.name;
      }),
      catchError((err) => {
        this.snackBar.open(`Подрядчик не найден: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        this.goBack();
        return throwError(() => err); // Пробрасываем ошибку дальше
      })
    );
  }

  getCurrency(){
    return this.systemService.systemCurrency()
      .pipe(
        tap((currencyList) =>{
          this.currencyList=currencyList.current;
        }),
        takeUntil(this._destroy$)
      );
  }
  getFormParam(body?:any){
    this.contractorService.contractorParam({body:body})
      .pipe(
        tap((formParams) =>{
          this.formParams=formParams;
          console.log('getFormParam body',body);
          console.log('getFormParam formParams',formParams.required);

        }),
        takeUntil(this._destroy$)
      ).subscribe({
      next: () => {
        this.applyRequiredValidators();
        if(!body)this.subscribeDependentFields();


      },
      error: (err) => this.snackBar.open(`Ошибка сохранения подрядчика: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)});
  }
  applyRequiredValidators() {
    this.formParams.required?.forEach((required_item:any) => {
      const control = this.contractorForm.get(required_item.field);
      if (control) {
        control.setValidators(Validators.required);
        control.updateValueAndValidity();
      }
    });
  }

  subscribeDependentFields(){
    this.formParams.dependent_fields?.forEach((dependent_field:string) => {
      this.contractorForm.get(dependent_field)?.valueChanges
      .pipe(
        debounceTime(1500),
        distinctUntilChanged(),
        takeUntil(this._destroy$),)
      .subscribe((value: any) => {
        const body = { dependent_fields: this.formParams.dependent_fields?.map((dependent_field:any) => ({field: dependent_field, value: this.contractorForm.value[dependent_field]}))}
        // const body = this.formParams.dependent_fields?.map((dependent_field:any) => ({dependent_fields: [{field: dependent_field, value: this.contractorForm.value[dependent_field]}]}));
        this.getFormParam(body);


      })
    })
  }


  // private getContractor() {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   return this.contractorService.contractorInfo({ id })
  //     .pipe(
  //       tap(contractor => {
  //       console.log('инициализация едитора',contractor);
  //       if (!contractor) {
  //         throw ({ error: { error_message: `подрядчик не существует` } });
  //       }
  //     }))
  //     .subscribe({
  //       next: contractor => {
  //         this.contractor = contractor as unknown as Contractor;
  //         const contactsControls = this.contacts;
  //         this.contractor.contacts?.forEach(contact => contact.contractor_id = contractor.id);
  //         this.contractor.contacts?.forEach(contact => contactsControls.push(this.fb.control(contact)));
  //         this.contractorForm.patchValue(this.contractor);
  //         if (typeof contractor.country_id === 'number') {
  //           this.getCities(contractor.country_id);
  //         }
  //         this.nameForHeader = contractor.name;
  //       },
  //       error: (err: any) => {
  //         this.snackBar.open(`Подрядчик не найден: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
  //         this.goBack();
  //       }
  //     });
  // }





}

// initialization_subscribeForm(){
  //   // this.subscribeControl_ContractorType();
  //   this.subscribeControl_CarrierId();
  //   this.subscribeControl_CountryId();
  //   this.subscribeControl_CityId();
  //   this.subscribeControl_CounterpartyId();
  //   this.subscribeControl_TaxId();
  // }

  // subscribeControl_ContractorType(){
  //   this.contractorForm.get('type_id')?.valueChanges
  //   .pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     takeUntil(this._destroy$),
  //   )
  //   .subscribe((value: any) => {
  //     if(typeof value==='string'){
  //       this.filteredContractorTypes = this.contractorTypes.filter((item: any) => {
  //         return item.name && item.name.toLowerCase().includes(value.toLowerCase());
  //       });
  //       if(this.filteredContractorTypes.length==1){
  //         if(this.filteredContractorTypes[0].name?.toLowerCase()===value.toLowerCase()){
  //           this.contractorForm.patchValue({
  //             type_id:this.filteredContractorTypes[0].id,
  //           });
  //         };
  //       };
  //     }
  //   });
  // }
  // subscribeControl_CarrierId(){
  //   this.contractorForm.get('carrier_id')?.valueChanges
  //   .pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     takeUntil(this._destroy$),
  //   )
  //   .subscribe((value: any) => {
  //     if(typeof value==='string'){
  //       this.filteredTransportCarrier = this.transportCarrier.filter((item: any) => {
  //         return item.full_name && item.full_name.toLowerCase().includes(value.toLowerCase());
  //       });
  //       if(this.filteredTransportCarrier.length==1){
  //         if(this.filteredTransportCarrier[0].full_name?.toLowerCase()===value.toLowerCase()){
  //           this.contractorForm.patchValue({
  //             carrier_id: this.filteredTransportCarrier[0].id,
  //           });
  //         };
  //       };
  //     }
  //   });
  // }
  // subscribeControl_CountryId(){
  //   this.contractorForm.get('country_id')?.valueChanges
  //   .pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     takeUntil(this._destroy$),
  //   )
  //   .subscribe((value: any) => {
  //     if(typeof value==='string'){
  //       this.filteredCountries = this.countries.filter((item: any) => {
  //         return item.name && item.name.toLowerCase().includes(value.toLowerCase());
  //       });
  //       if(this.filteredCountries.length==1){
  //         if(this.filteredCountries[0].name?.toLowerCase()===value.toLowerCase()){
  //           this.contractorForm.patchValue({
  //             country_id: this.filteredCountries[0].id,
  //           });
  //           this.onCountryChange(this.filteredCountries[0].id);
  //         };
  //       };
  //     }
  //   });
  // }
  // subscribeControl_CityId(){
  //   this.contractorForm.get('city_id')?.valueChanges
  //   .pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     takeUntil(this._destroy$),
  //   )
  //   .subscribe((value: any) => {
  //     if(typeof value==='string'){
  //       this.filteredCitys = this.cities.filter((item: any) => {
  //         return item.name && item.name.toLowerCase().includes(value.toLowerCase());
  //       });
  //       if(this.filteredCitys.length==1){
  //         if(this.filteredCitys[0].name?.toLowerCase()===value.toLowerCase()){
  //           this.contractorForm.patchValue({
  //             city_id: this.filteredCitys[0].id,
  //           });
  //         };
  //       };
  //     }
  //   });
  // }
  // subscribeControl_CounterpartyId(){
  //   this.contractorForm.get('counterparty_id')?.valueChanges
  //   .pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     takeUntil(this._destroy$),
  //   )
  //   .subscribe((value: any) => {
  //     if(typeof value==='string'){
  //       this.filteredCounterpartys = this.counterpartys.filter((item: any) => {
  //         return item.name && item.name.toLowerCase().includes(value.toLowerCase());
  //       });
  //       if(this.filteredCounterpartys.length==1){
  //         if(this.filteredCounterpartys[0].name?.toLowerCase()===value.toLowerCase()){
  //           this.contractorForm.patchValue({
  //             counterparty_id: this.filteredCounterpartys[0].id,
  //           });
  //         };
  //       };
  //     }
  //   });
  // }
  // subscribeControl_TaxId(){
  //   this.contractorForm.get('tax_id')?.valueChanges
  //   .pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     takeUntil(this._destroy$),
  //   )
  //   .subscribe((value: any) => {
  //     if(typeof value==='string'){
  //       this.filteredTaxs = this.taxSystems.filter((item: any) => {
  //         return item.name && item.name.toLowerCase().includes(value.toLowerCase());
  //       });
  //       if(this.filteredTaxs.length==1){
  //         if(this.filteredTaxs[0].name?.toLowerCase()===value.toLowerCase()){
  //           this.contractorForm.patchValue({
  //             tax_id: this.filteredTaxs[0].id,
  //           });
  //         };
  //       };
  //     }
  //   });
  // }
