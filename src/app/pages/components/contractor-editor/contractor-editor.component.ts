import { CountryService } from './../../services/country.service';
import { environment } from './../../../../environments/environment';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';
import { City } from './../../../api/custom_models/city';
import { Association } from './../../../api/custom_models/association';
import { Country } from './../../../api/custom_models/country';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contractor, ContractorRequestFormat, ContractorType } from './../../../api/custom_models/contractor';
import { ContractorService } from './../../../api/services/contractor.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CityService } from '../../services/city.service';
import { Location } from '@angular/common';
import { TaxSystem } from 'src/app/api/custom_models';
import { SystemService, TransportService } from 'src/app/api/services';
import { Counterparty } from 'src/app/api/custom_models/counterparty';


// 1. "Исключить Подрядчика из торгов" переделываем в "Участник торгов" Инверсия
// Переменная allow_trade

// 2. рядом добавляем Селект "Вид подрядчика"
// метод /contractor_type будет новый список: "Индикатив", "Актуальный", "Архив"
// Если "Актуальный", то "Контактное лицо" является обязательным, "Индикатив" и "Архив" не обязательно
// Переменная type_id


// 3. Существующий "Вид подрядчика" меняем на "Тип контрагента"
// Метод /system_counterparty
// counterparty_id

@Component({
  selector: 'app-contractor-editor',
  templateUrl: './contractor-editor.component.html',
  styleUrls: ['./contractor-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContractorEditorComponent implements OnInit {

  contractor: Partial<Contractor> = {};
  isEditMode: boolean = false;
  contractorForm: FormGroup;
  associations: Association[] = [];
  contractorTypes: ContractorType[] = [];
  countries: Country[] = [];
  cities: Partial<City>[] = [];
  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 3000 };
  requestFormats: ContractorRequestFormat[] = [];
  production = environment.production;
  title = '';
  taxSystems: TaxSystem[] = [];
  nameForHeader?: string;
  // counterpartys:Counterparty[]=[];
  counterpartys:any[]=[];
  // private _destroy$ = new Subject();
  transportCarrier:any[]=[];

  change$ = new Subject<string|undefined>();

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
    private transportService: TransportService
  ) {
    this.contractorForm = this.fb.group({
      id: [''],
      address: ['', []],
      name: ['', [Validators.required]],
      ind: ['', []],
      phone: ['', []],
      web: ['', []],
      rating_nps: [{ value: 0, disabled: true }, []],
      user_rating_nps: [{ value: 0, disabled: true }, []],
      contacts: fb.array([], []),
      association_id: [[]],
      tax_id: [undefined, [Validators.required]],
      // type_id: [undefined, [Validators.required]],
      type_id: ['', [Validators.required]],
      language_id: [undefined, [Validators.required]],
      country_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      request_format_id: ['', [Validators.required]],
      // exclude_from_trade: [false]
      allow_trade:[false],
      counterparty_id: ['', [Validators.required]],
      transportCarrier_name:[,[]],
      carrier_id:[,[]]
    });

    this.change$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      // rxjsFilter(val => val === '' || val.length > 1),
    )
      .subscribe((e) => {
        this.getTransportCarrier(e)

        console.log(e);

      });
  }

  ngOnInit(): void {
    const segments = this.route.snapshot.url.map(s => s.path);
    this.isEditMode = segments[1] !== 'add';
    if (this.isEditMode) {
      this.getContractor();
    }
    this.title = this.isEditMode ? 'Информация о подрядчике' : 'Добавление подрядчика';
    this.getContractorTypes();
    this.getAssociations();
    this.getCountries();
    this.getRequestFormats();
    this.getTaxSystems();
    this.getCounterparty();


  }

  ngOnDestroy(): void {
    // this._destroy$.next(null);
    // this._destroy$.complete();
  }

  onChange(query: string|undefined) {
    this.change$.next(query);
  }

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
    if(e.contact_required){
      this.contractorForm.get('type_id')!.setValidators([Validators.required]);
    } else {
      this.contractorForm.get('type_id')!.setValidators([]);
      // this.contractorForm.get('type_id')!.clearValidators;
    }
  }

  onCountryChange(countryId: number): void {
    this.contractorForm.controls['city_id'].reset(undefined);
    this.getCities(countryId);
  }

  canSave(): boolean {
    return this.contractorForm.valid;
  }

  private updateContractor(body: any) {
    console.log(body);

    this.contractorService.contractorUpdate({ body }).pipe().subscribe({
      next: () => this.snackBar.open(`Подрядчик сохранен`, undefined, this.snackBarWithShortDuration),
      error: (err) => this.snackBar.open(`Ошибка сохранения подрядчика: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  private createContractor(body: any) {
    console.log(body);
    this.contractorService.contractorCreate({ body }).pipe().subscribe({
      next: ({ id }) => {
        this.goToContractor(id);
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

  // private getCounterparty() {
  //   this.systemService.systemCounterparty()
  //     .pipe(
  //       tap((counterpartys) => this.counterpartys = counterpartys as any),
  //       takeUntil(this._destroy$)
  //     ).subscribe();
  // }


  onTransportCarrierChange(i:any){
    console.log(i);

  }

  getTransportCarrier(e:any){
    this.transportService.transportCarrier({name:e})
      .subscribe(transportCarrier => this.transportCarrier = transportCarrier);
  }

  private getCounterparty(){
    this.systemService.systemCounterparty()
      .subscribe(counterpartys => this.counterpartys = counterpartys as Counterparty[]);
  }

  private getAssociations() {
    this.systemService.systemAssociation()
      .subscribe(associations => this.associations = associations as Association[]);
  }

  private getContractorTypes() {
    this.contractorService.contractorType()
      .subscribe(contractorTypes => this.contractorTypes = contractorTypes as unknown as ContractorType[]);
  }

  private getCountries() {
    this.countryService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  private getRequestFormats(): void {
    this.contractorService.contractorRequestFormat()
      .subscribe(formats => this.requestFormats = formats as unknown as ContractorRequestFormat[]);
  }

  private getCities(countryId: number) {
    this.cityService.getCities(countryId)
      .subscribe(cities => this.cities = cities);
  }

  private getContractor(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contractorService.contractorInfo({ id })
      .pipe(tap(contractor => {
        console.log('инициализация едитора',contractor);
        // currently, when contactor doesn't exist the service returns HTTP 200 with empty response body instead of HTTP 404
        // therefore we have to handle that case manually
        if (!contractor) {
          throw ({ error: { error_message: `подрядчик не существует` } });
        }
      }))
      .subscribe({
        next: contractor => {
          this.contractor = contractor as unknown as Contractor;
          const contactsControls = this.contacts;
          this.contractor.contacts?.forEach(contact => contact.contractor_id = contractor.id);
          this.contractor.contacts?.forEach(contact => contactsControls.push(this.fb.control(contact)));
          this.contractorForm.patchValue(this.contractor);
          if (typeof contractor.country_id === 'number') {
            this.getCities(contractor.country_id);
          }
          this.nameForHeader = contractor.name;
        },
        error: (err: any) => {
          this.snackBar.open(`Подрядчик не найден: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
          this.goBack();
        }
      });
  }

  getTaxSystems(): void {
    this.systemService.systemTaxSystem().subscribe(
      taxSystems => this.taxSystems = taxSystems ? taxSystems as TaxSystem[] : []
    );
  }

}


