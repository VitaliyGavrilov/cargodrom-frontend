import { emailValidator, innValidator } from './../../../validators/pattern-validator';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, find, map, pipe, takeUntil, tap, retry, debounce, debounceTime, distinctUntilChanged, startWith, merge, forkJoin , catchError, throwError, count } from 'rxjs';
import { ContractorService } from './../../../api/services/contractor.service';
import { City, Client, ClientGroup, Contractor, ContractorRequestFormat, Country, Currency, Customer, DirectionCity, Employee, FileDocument, TaxSystem, RequestFile } from 'src/app/api/custom_models';
import { CargoService, CompanyService, CustomerService, DirectionService, RequestService, SystemService, TransportService } from 'src/app/api/services';
import { Editor } from 'src/app/shared/classes/editor';
import { Location, formatDate, getLocaleMonthNames } from '@angular/common';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { FileListComponent } from '../file-list/file-list.component';
import { TransportKind, TransportSubKind, TransportType } from 'src/app/api/custom_models/transport';
import { Incoterms, Request, RequestFormat, RequestServices } from 'src/app/api/custom_models/request';
import { CargoPackage, CargoType } from 'src/app/api/custom_models/cargo';
import { DirectionFlight, DirectionPoint,  } from 'src/app/api/custom_models/direction';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { environment } from './../../../../environments/environment';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { RequestManagerService } from '../../services/request-manager.service';
import { LoaderService } from '../../services/loader.service';


@Component({
  selector: 'app-request-editor',
  templateUrl: './request-editor.component.html',
  styleUrls: ['./request-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class RequestEditorComponent implements OnInit, OnDestroy {
  //ПЕРЕМЕННЫЕ
  id: number=0;//id нужен будет для документов, при создании будет получать его в ответе, при редактировании будет сразу с остальными данными
  //
  title = '';
  nameForHeader?: string;
  request: Partial<Request> = {};
  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 3000 };
  //состояния
  isEditMode: boolean = false;
  isNavigateAfterSave: boolean = true;

  //форма
  requestForm: FormGroup;
  //даннеы для формы
  requestFormats: RequestFormat[] = [];
  transportationFormats: TransportKind[] = [];

  customers: Customer[] = []; filteredCustomers: Customer[] = [];
  transportFormats: TransportType[] = []; filteredTransportFormats: TransportType[] = []
  cargoPackages: CargoPackage[]=[]; filteredCargoPackage: CargoPackage[]=[];
  cargoTypes: CargoType[]=[]; filteredCargoType: CargoType[]=[];
  countrys: Country[]=[]; filteredDepartureCountrys: Country[]=[]; filteredArrivalCountrys: Country[]=[];
  filteredArrivalCitys:DirectionCity[]=[]; filteredDepartureCitys:DirectionCity[]=[]; citys:DirectionCity[]=[];

  currencys: Currency[]=[];
  departureCitys: DirectionCity[]=[];
  filteredDeparturePoint: DirectionPoint[] = []; departurePoint: DirectionPoint[] = [];
  arrivalPoint: DirectionPoint[] = []; filteredArrivalPoint:DirectionPoint[] = [];
  directionFlights: DirectionFlight[]=[];
  incoterms: Incoterms[]=[];
  ports: DirectionCity[]=[];
  services: RequestServices[]=[];
  servicesAdditionals: RequestServices[]=[];

  documentsDanger: FileDocument[] = [];
  documents: FileDocument[] = [];

  currentPlacesDensity: number = 0 ;
  currentDepartureCountryName:string='';
  currentArrivalCountryName:string='';
  transport_kind_id?:number|string;
  //снек бар

  //отписки
  private _destroy$ = new Subject();
  //переменные окружения
  production = environment.production;

  @ViewChild('fileList', { static: false }) fileList!: FileListComponent;
  @ViewChild('fileListDanger', { static: false }) fileListDanger!: FileListComponent;
  isLoading$ = this.loaderService.isLoading$;

  // @ViewChild('inputElementCustomerName', { static: true }) inputElementCustomerName!: ElementRef;
  // @ViewChild('inputElementTransportTypeName', { static: true }) inputElementTransportTypeName!: ElementRef;
  // @ViewChild('inputElementCargoPackageName', { static: true }) inputElementCargoPackageName!: ElementRef;
  // @ViewChild('inputElementCargoTypeName', { static: true }) inputElementCargoTypeName!: ElementRef;

  //КОНСТРУКТОР
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private transportService: TransportService,
    private requestService: RequestService,
    private cargoService: CargoService,
    private directionService: DirectionService,
    private countryService: CountryService,
    private cityService: CityService,
    private systemService: SystemService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private requestManager: RequestManagerService,
    private loaderService: LoaderService,
  ) {
    this.requestForm = this.fb.group({
      // + -это значит что в обькте который мы будем отправлять для создания или изменения запроса, есть такое жк поле, а минус будет означть что поле нашей формы не нужно или должно дыть преобразованно в другое поле
      //ОСНОВА
      customer_id: [ , [Validators.required]],// + (customer это клиент,должен быть контрактор)
      customer_name: ['',[Validators.required]],
      request_type_name: ['',[]],
      request_type_id: [1, [Validators.required]],// +
      transport_type_name: ['',[]],
      transport_kind_id: [, [Validators.required]],// +
      transport_type_id: ['', [Validators.required]],// +
      //ОПИСАНИЕ ГРУЗА
      cargo_description: ['', [Validators.required,Validators.minLength(2)]],// +
      cargo_package_id: [, []],// +
      cargo_package_name:['',[]],
      cargo_type_id: [, []],// +
      cargo_type_name: ['',[]],
      //наличе файла безопасности
      cargo_danger: [false,[]],// +
      //температура
      cargo_temperature: this.fb.group({
        cargo_temperature_control: [false,[]],
        cargo_temperature_min: ['', []],
        cargo_temperature_max: ['', []],
      }),
      //режим раздельных мест,для создания не нужен, чисто для меня пока что оставлю
      cargo_separately: [false,[]],// -
      //общие габариты
      cargo_places_count: ['', []],// + итого мест
      cargo_places_weight: ['', []],// + итого вес
      cargo_places_volume: ['', []],// + итого обьем
      cargo_places_paid_weight: ['', []],// + оплач.вес
      cargo_places_density: ['', []],// + плонтность
      cargo_cost: ['', []],// + стоимость
      cargo_currency_id: ['', []],// + id валюты

      cargo_places_stacking: [true, []],// сейчас его в апи нету, но должен быть

      cargo_readiness: ['', []],
      //массив мест груза
      cargo_places: fb.array([], []),//+
      //НАПРАЛЕНИЕ
      //откуда
      departure_city_id: ['', [Validators.required]],//+
      departure_city_name: ['', []],
      departure_country_id: [ , [Validators.required]],//+
      departure_country_name: ['',[]],
      departure_point_id: ['', []],//+
      departure_address: ['', []],//+
      //куда
      arrival_city_id: ['', [Validators.required]],//+
      arrival_city_name: ['', []],
      arrival_country_id: ['', [Validators.required]],//+
      arrival_country_name: ['',[]],
      arrival_point_id: ['', []],//+
      arrival_address: ['', []],//+
      //рейсы
      departure_flight: ['', []],//+
      //УСЛУГИ
      incoterms_id: ['', []],//+
      incoterms_city_name:[,[]],
      incoterms_city_id:[,[]],
      services: [[], []],//+
      services_optional: [[], []],//+
      comment: ['', []],//+
      send_to: ['contractor',[]]
      //РАССЫЛКИ
      //эти данные не нужны для создания и редактирования, но понадобятся потом
    });

  }

  linkRate(){
    this.router.navigate(['rate_request', '638d85d28962c195e5ff113ad5e01e43']);
  }

  //МЕТОДЫ ЖЦ
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
  ngOnInit(): void {
    this.initialization_isFormMode();
    this.initialization_getDatas();
    this.initialization_subscribeForm();
  }

  initialization_isFormMode(){
    const segments = this.route.snapshot.url.map(s => s.path);
    this.isEditMode = segments[1] !== 'add';
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.title = this.isEditMode ? `Редактирование запроса № ${this.id}` : 'Добавление запроса';

  }

  initialization_getDatas() {
    const queue1 = [
      this.getCustomers(),
      this.getСargoTypes(),
      this.getCities(),
      this.getTransportFormats(),
      this.getCountries(),
      this.getСargoPackages(),
      this.getRequestFormats(),
      this.getTransportationFormats(),
      this.getDirectionFlight(),
      this.getCurrencys(),
    ];
    const queue2 = [
      this.getRequest(),
    ];
    this.requestManager.executeQueues([
      queue1,
      this.isEditMode?queue2:[],
    ]);
  }
  initialization_subscribeForm(){
    this.subscribeControl_CustomerId();
    this.subscribeControl_TransportTypeId();
    this.subscribeControl_CargoPackageId();
    this.subscribeControl_CargoTypeId();
    this.subscribeControl_DepartureCityId();
    this.subscribeControl_DepartureCountryId();
    this.subscribeControl_ArrivalCityId();
    this.subscribeControl_ArrivalCountryId();
    this.subscribeControl_ArrivalPointId();
    this.subscribeControl_DeparturePointId();
  }
  subscribeControl_CustomerId(){
    this.requestForm.get('customer_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredCustomers = this.customers.filter((item: any) => {
          return item.name && item.name.toLowerCase().includes(value.toLowerCase());
        });
        if(this.filteredCustomers.length==1){
          if(this.filteredCustomers[0].name?.toLowerCase()===value.toLowerCase()){
            this.requestForm.patchValue({
              customer_id: this.filteredCustomers[0].id,
            });
          };
        };
      }
    });
  }
  subscribeControl_TransportTypeId(){
    this.requestForm.get('transport_type_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredTransportFormats = this.transportFormats.filter((item: any) => {
          return item.name && item.name.toLowerCase().includes(value.toLowerCase());
        });
        if(this.filteredTransportFormats.length==1){
          if(this.filteredTransportFormats[0].name?.toLowerCase()===value.toLowerCase()){
            this.requestForm.patchValue({
              transport_type_id: this.filteredTransportFormats[0].id,
            });
          };
        };
      }
    });
  }
  subscribeControl_CargoPackageId(){
    this.requestForm.get('cargo_package_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredCargoPackage = this.cargoPackages.filter((item: any) => {
          return item.name && item.name.toLowerCase().includes(value.toLowerCase());
        });
        if(this.filteredCargoPackage.length==1){
          if(this.filteredCargoPackage[0].name?.toLowerCase()===value.toLowerCase()){
            this.requestForm.patchValue({
              cargo_package_id: this.filteredCargoPackage[0].id,
            });
          };
        };
      }
    });
  }
  subscribeControl_CargoTypeId(){
    this.requestForm.get('cargo_type_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredCargoType = this.cargoTypes.filter((item: any) => {
          return item.name && item.name.toLowerCase().includes(value.toLowerCase());
        });
        if(this.filteredCargoType.length==1){
          if(this.filteredCargoType[0].name?.toLowerCase()===value.toLowerCase()){
            this.requestForm.patchValue({
              cargo_type_id: this.filteredCargoType[0].id,
            });
          };
        };
      }
    });
  }
  subscribeControl_DepartureCityId(){
    this.requestForm.get('departure_city_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredDepartureCitys = this.citys.filter((item: any) => {
          return item.name && item.name.toLowerCase().includes(value.toLowerCase());
          // return item.name && item.name.toLowerCase().includes(value.toLowerCase())
          // && this.requestForm.value.departure_country_id==item.country_id;
        });
        if(this.filteredDepartureCitys.length==1){
          if(this.filteredDepartureCitys[0].name?.toLowerCase()===value.toLowerCase()){
            this.changeForm_DepartureCity(this.filteredDepartureCitys[0]);
            this.requestForm.patchValue({
              departure_city_id: this.filteredDepartureCitys[0].id,
            });
          };
        };
      };
    });
  }
  subscribeControl_DepartureCountryId(){
    this.requestForm.get('departure_country_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredDepartureCountrys = this.countrys.filter((item: any) => {
          return item.name && item.name.toLowerCase().includes(value.toLowerCase());
          // return item.name && item.name.toLowerCase().includes(value.toLowerCase())
          // && this.requestForm.value.departure_country_id==item.country_id;
        });
        if(this.filteredDepartureCountrys.length==1){
          if(this.filteredDepartureCountrys[0].name?.toLowerCase()===value.toLowerCase()){
            this.changeForm_DepartureCountry(this.filteredDepartureCountrys[0]);
            this.requestForm.patchValue({
              departure_country_id: this.filteredDepartureCountrys[0].id,
            });
          };
        };
      };
    });
  }
  subscribeControl_ArrivalCityId(){
    this.requestForm.get('arrival_city_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredArrivalCitys = this.citys.filter((item: any) => {
          return item.name && item.name.toLowerCase().includes(value.toLowerCase());
          // return item.name && item.name.toLowerCase().includes(value.toLowerCase())
          // && this.requestForm.value.departure_country_id==item.country_id;
        });
        if(this.filteredArrivalCitys.length==1){
          if(this.filteredArrivalCitys[0].name?.toLowerCase()===value.toLowerCase()){
            this.changeForm_ArrivalCity(this.filteredArrivalCitys[0]);
            this.requestForm.patchValue({
              arrival_city_id: this.filteredArrivalCitys[0].id,
            })
          };
        };
      };
    });
  }
  subscribeControl_ArrivalCountryId(){
    this.requestForm.get('arrival_country_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredArrivalCountrys = this.citys.filter((item: any) => {
          return item.name && item.name.toLowerCase().includes(value.toLowerCase());
          // return item.name && item.name.toLowerCase().includes(value.toLowerCase())
          // && this.requestForm.value.departure_country_id==item.country_id;
        });
        if(this.filteredArrivalCountrys.length==1){
          if(this.filteredArrivalCountrys[0].name?.toLowerCase()===value.toLowerCase()){
            this.changeForm_ArrivalCity(this.filteredArrivalCountrys[0]);
            this.requestForm.patchValue({
              arrival_country_id: this.filteredArrivalCountrys[0].id,
            })
          };
        };
      };
    });
  }
  subscribeControl_ArrivalPointId(){
    this.requestForm.get('arrival_point_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredArrivalPoint = this.arrivalPoint.filter((item: any) => {
          return item.name && item.name.toLowerCase().includes(value.toLowerCase());
          // return item.name && item.name.toLowerCase().includes(value.toLowerCase())
          // && this.requestForm.value.departure_country_id==item.country_id;
        });
        if(this.filteredArrivalPoint.length==1){
          if(this.filteredArrivalPoint[0].name?.toLowerCase()===value.toLowerCase()){

          };
        };
      };
    });
  }
  subscribeControl_DeparturePointId(){
    this.requestForm.get('departure_point_id')?.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this._destroy$),
    )
    .subscribe((value: any) => {
      if(typeof value==='string'){
        this.filteredDeparturePoint = this.departurePoint.filter((item: any) => {
          return item.name && item.name.toLowerCase().includes(value.toLowerCase());
        });
        if(this.filteredDeparturePoint.length==1){
          if(this.filteredDeparturePoint[0].name?.toLowerCase()===value.toLowerCase()){

          };
        };
      };
    });
  }

  changeForm_ArrivalCity(option:any){
    this.requestForm.patchValue({
      arrival_country_id: option.country_id,
    });
    if(this.requestForm.value.transport_kind_id==1){
      this.getArrivalPoint(option.country_id,this.requestForm.value.transport_kind_id);
    };
    this.requestForm.controls['arrival_point_id'].reset();
  }
  changeForm_ArrivalCountry(option:any){
    this.requestForm.controls['arrival_city_id'].reset();
    this.requestForm.controls['arrival_point_id'].reset();
    if(this.requestForm.value.transport_kind_id==1){
      this.getArrivalPoint(option.id,this.requestForm.value.transport_kind_id);
    };
    this.filteredArrivalCitys = this.citys.filter((item: any) => {
      return option.id==item.country_id;
    });
  }

  changeForm_DepartureCity(option:any){
    this.requestForm.patchValue({
      departure_country_id: option.country_id,
    });
    if(this.requestForm.value.transport_kind_id==1){
      this.getDeparturePoint(option.country_id,this.requestForm.value.transport_kind_id);
    };
    this.requestForm.controls['departure_point_id'].reset();
  }
  changeForm_DepartureCountry(option:any){
    this.requestForm.controls['departure_city_id'].reset();
    this.requestForm.controls['departure_point_id'].reset();
    if(this.requestForm.value.transport_kind_id==1){
      this.getDeparturePoint(option.id,this.requestForm.value.transport_kind_id);
    };
    this.filteredDepartureCitys = this.citys.filter((item: any) => {
      return option.id==item.country_id;
    });
  }

  displayFn_DeparturePointId(id: any): string {
    if (!this.departurePoint) return '';
    const obj = this.departurePoint.find(obj => obj.id === id);
    return obj?.name || '';
  }
  displayFn_ArrivalPointId(id: any): string {
    if (!this.arrivalPoint) return '';
    const obj = this.arrivalPoint.find(obj => obj.id === id);
    return obj?.name || '';
  }
  displayFn_ArrivalCountryId(id: any): string {
    if (!this.countrys) return '';
    const obj = this.countrys.find(obj => obj.id === id);
    return obj?.name || '';
  }
  displayFn_ArrivalCityId(id: any): string {
    if (!this.citys) return '';
    const obj = this.citys.find(obj => obj.id === id);
    return obj?.name || '';
  }
  displayFn_DepartureCountryId(id: any): string {
    if (!this.countrys) return '';
    const obj = this.countrys.find(obj => obj.id === id);
    return obj?.name || '';
  }
  displayFn_DepartureCityId(id: any): string {
    if (!this.citys) return '';
    const obj = this.citys.find(obj => obj.id === id);
    return obj?.name || '';
  }
  displayFn_CargoTypeId(id: any): string {
    if (!this.cargoTypes) return '';
    const obj = this.cargoTypes.find(obj => obj.id === id);
    return obj?.name || '';
  }
  displayFn_CargoPackageId(id: any): string {
    if (!this.cargoPackages) return '';
    const obj = this.cargoPackages.find(obj => obj.id === id);
    return obj?.name || '';
  }
  displayFn_TransportTypeId(id: any): string {
    if (!this.transportFormats) return '';
    const obj = this.transportFormats.find(obj => obj.id === id);
    return obj?.name || '';
  }
  displayFn_CustomerId(id: any): string {
    if (!this.customers) return '';
    const obj = this.customers.find(obj => obj.id === id);
    return obj?.name || '';
  }



  //датапикер
  onValidChange(event:any){
    this.requestForm.patchValue({
      cargo_readiness: formatDate(this.requestForm.value.cargo_readiness,'yyyy-MM-dd','en-US')
    })
  }
  validReset(){
    this.requestForm.controls['cargo_readiness'].reset();
  }
  returnValid():string{
    return this.requestForm.value.cargo_readiness
    ? formatDate(this.requestForm.value.cargo_readiness,'dd.MM.yyyy','ru-US')
    : '';
  }

  // Публичные методы:
  //СОХРАНЕНИЕ,УДАЛЕНИЕ,ОТМЕНА,НАЗАД
  save(): void {
    const body = this.requestForm.value;
    // this.isFormSubmitted=true;
    // console.log(body);

    // if (!this.requestForm.valid ) {
    //   this.snackBar.open('Не все поля заполнены', undefined, this.snackBarWithLongDuration);
    //   return;
    // }

    if(body.request_type_id===1 && body.cargo_separately == false) {
      console.log('План А вызван');
      this.planA(body);
    }
    if(body.request_type_id===1 && body.cargo_separately == true) {
      console.log('План B вызван');
      this.planB(body);
    }
    if(body.request_type_id===2 && body.cargo_separately == false) {
      console.log('План C вызван');
      this.planC(body);
    }
    if(body.request_type_id===2 && body.cargo_separately == true) {
      console.log('План D вызван');
      this.planD(body);
    }
  }
  remove():void {
    console.log('Нажата кнопка отмена');
  }
  goBack(): void {
    this.location.back();
  }
  calc():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.router.navigate(['pages/request/edit/translate', id]);
  }

  //РЕДАКТИРОВАНИЕ ДАННЫХ ПЕРЕД ОТПРАВКОЙ
  planA(body:any){
    const data = {
      id: this.id,
      customer_id: body.customer_id,
      request_type_id: body.request_type_id,
      transport_kind_id: body.transport_kind_id,
      transport_type_id: body.transport_type_id,

      cargo_description: body.cargo_description,
      cargo_package_id: body.cargo_package_id,

      cargo_separately: body.cargo_separately,

      cargo_places: body.cargo_places,

      cargo_places_count: body.cargo_places_count,
      cargo_places_weight: body.cargo_places_weight,
      cargo_places_volume: body.cargo_places_volume,
      cargo_places_density: body.cargo_places_density,
      cargo_cost: body.cargo_cost,
      cargo_currency_id: body.cargo_currency_id,

      departure_city_id: body.departure_city_id,
      departure_country_id: body.departure_country_id,
      departure_address: body.departure_address,
      arrival_city_id: body.arrival_city_id,
      arrival_country_id: body.arrival_country_id,
      arrival_address: body.arrival_address,
      departure_flight: body.departure_flight,

      send_to: body.send_to,

      //дополнительные поля:
      cargo_places_paid_weight: body.cargo_places_paid_weight,

      departure_point_id : body.departure_point_id,
      arrival_point_id : body.arrival_point_id,

      incoterms_id: body.incoterms_id,
      incoterms_city_id: body.incoterms_city_id,
      services: body.services,
      services_optional: body.services_optional,
    }
    //удаляем доп поля
    if(body.transport_kind_id !== 1) {
      delete data.departure_point_id;
      delete data.arrival_point_id;
      delete data.cargo_places_paid_weight;
    }
    if(body.transport_kind_id === 2){
      delete data.incoterms_city_id;
      delete data.incoterms_id;
      delete data.services;
      delete data.services_optional;
    }
    console.log(data);
    if(this.isEditMode){
      this.updateRequest(data);
    } else {
      this.createRequest(data);
    }
  }
  planB(body:any){
    const data = {
      id: this.id,
      customer_id: body.customer_id,
      request_type_id: body.request_type_id,
      transport_kind_id: body.transport_kind_id,
      transport_type_id: body.transport_type_id,

      cargo_description: body.cargo_description,
      cargo_package_id: body.cargo_package_id,

      cargo_separately: body.cargo_separately,

      cargo_places: body.cargo_places,

      cargo_places_count: body.cargo_places.length,
      cargo_places_weight: body.cargo_places_weight,
      cargo_places_volume: body.cargo_places_volume,

      cargo_places_density: body.cargo_places_density,
      cargo_cost: body.cargo_cost,
      cargo_currency_id: body.cargo_currency_id,

      departure_city_id: body.departure_city_id,
      departure_country_id: body.departure_country_id,
      departure_address: body.departure_address,
      arrival_city_id: body.arrival_city_id,
      arrival_country_id: body.arrival_country_id,
      arrival_address: body.arrival_address,
      departure_flight: body.departure_flight,
      //дополнительные поля:
      cargo_places_paid_weight: body.cargo_places_paid_weight,

      departure_point_id : body.departure_point_id,
      arrival_point_id : body.arrival_point_id,

      incoterms_id: body.incoterms_id,
      incoterms_city_id: body.incoterms_city_id,
      services: body.services,
      services_optional: body.services_optional,

      send_to: body.send_to,
    }
    //удаляем доп поля
    if(body.transport_kind_id !== 1) {
      delete data.departure_point_id;
      delete data.arrival_point_id;
      delete data.cargo_places_paid_weight;
    }
    if(body.transport_kind_id === 2){
      delete data.incoterms_city_id;
      delete data.incoterms_id;
      delete data.services;
      delete data.services_optional;
    }
    //удалем ненужные поля из массива мест
    data.cargo_places.forEach((i:any) => {
      delete i.cargo_package_id;
      delete i.stacking;
    })
    console.log(data);
    if(this.isEditMode){
      this.updateRequest(data);
    } else {
      this.createRequest(data);
    }
  }
  planC(body:any){
    const data = {
      id: this.id,
      customer_id: body.customer_id,
      request_type_id: body.request_type_id,
      transport_kind_id: body.transport_kind_id,
      transport_type_id: body.transport_type_id,

      cargo_description: body.cargo_description,
      cargo_type_id: body.cargo_type_id,

      cargo_danger: body.cargo_danger,

      cargo_separately: body.cargo_separately,

      cargo_places: body.cargo_places,

      cargo_places_count: body.cargo_places.length,
      cargo_places_weight: body.cargo_places_weight,
      cargo_places_volume: body.cargo_places_volume,
      cargo_places_density: body.cargo_places_density,
      cargo_cost: body.cargo_cost,
      cargo_currency_id: body.cargo_currency_id,
      cargo_readiness: body.cargo_readiness,
      cargo_package_id: body.cargo_package_id,
      cargo_places_stacking: body.cargo_places_stacking,

      departure_city_id: body.departure_city_id,
      departure_country_id: body.departure_country_id,
      departure_address: body.departure_address,
      arrival_city_id: body.arrival_city_id,
      arrival_country_id: body.arrival_country_id,
      arrival_address: body.arrival_address,
      departure_flight: body.departure_flight,
      //дополнительные поля:
      cargo_temperature: body.cargo_temperature,

      cargo_places_paid_weight: body.cargo_places_paid_weight,

      departure_point_id : body.departure_point_id,
      arrival_point_id : body.arrival_point_id,

      incoterms_id: body.incoterms_id,
      incoterms_city_id: body.incoterms_city_id,
      services: body.services,
      services_optional: body.services_optional,
      comment: body.comment,

      send_to: body.send_to,
    }
    //удаляем доп поля
    if(!body.cargo_temperature.cargo_temperature_control) {
      delete data.cargo_temperature;
    }
    if(body.transport_kind_id !== 1) {
      delete data.departure_point_id;
      delete data.arrival_point_id;
      delete data.cargo_places_paid_weight;
    }
    if(body.transport_kind_id === 2){
      delete data.incoterms_city_id;
      delete data.incoterms_id;
      delete data.services;
      delete data.services_optional;
      delete data.comment;
    }
    console.log(data);
    if(this.isEditMode){
      this.updateRequest(data);
    } else {
      this.createRequest(data);
    }
  }
  planD(body:any){
    const data = {
      id: this.id,
      customer_id: body.customer_id,
      request_type_id: body.request_type_id,
      transport_kind_id: body.transport_kind_id,
      transport_type_id: body.transport_type_id,

      cargo_description: body.cargo_description,
      cargo_type_id: body.cargo_type_id,

      cargo_danger: body.cargo_danger,

      cargo_separately: body.cargo_separately,

      cargo_places: body.cargo_places,

      cargo_places_count: body.cargo_places.length,
      cargo_places_weight: body.cargo_places_weight,
      cargo_places_volume: body.cargo_places_volume,
      cargo_places_density: body.cargo_places_density,
      cargo_cost: body.cargo_cost,
      cargo_currency_id: body.cargo_currency_id,
      cargo_readiness: body.cargo_readiness,

      departure_city_id: body.departure_city_id,
      departure_country_id: body.departure_country_id,
      departure_address: body.departure_address,
      arrival_city_id: body.arrival_city_id,
      arrival_country_id: body.arrival_country_id,
      arrival_address: body.arrival_address,
      departure_flight: body.departure_flight,
      //дополнительные поля:
      cargo_temperature: body.cargo_temperature,

      cargo_places_paid_weight: body.cargo_places_paid_weight,

      departure_point_id : body.departure_point_id,
      arrival_point_id : body.arrival_point_id,

      incoterms_id: body.incoterms_id,
      incoterms_city_id: body.incoterms_city_id,
      services: body.services,
      services_optional: body.services_optional,
      comment: body.comment,

      send_to: body.send_to,
    }
    //удаляем доп поля
    if(!body.cargo_temperature.cargo_temperature_control) {
      delete data.cargo_temperature;
    }
    if(body.transport_kind_id !== 1) {
      delete data.departure_point_id;
      delete data.arrival_point_id;
      delete data.cargo_places_paid_weight;
    }
    if(body.transport_kind_id === 2){
      delete data.incoterms_city_id;
      delete data.incoterms_id;
      delete data.services;
      delete data.services_optional;
      delete data.comment;
    }
    console.log(data);
    if(this.isEditMode){
      this.updateRequest(data);
    } else {
      this.createRequest(data);
    }
  }
  //ВЛОЖЕННАЯ ФОРМА РЕДАКТИРОВАНИ МЕСТ
  removePlace(i: number): void {
    this.places.removeAt(i);
    this.requestForm.markAsTouched();
    this.onPlaceEditorChange();
  }
  addPlace() {
    this.places.push(this.fb.control({
      request_id: this.request.id
    }));
    this.requestForm.markAsTouched();
  }
  get places() {
    return <FormArray>this.requestForm.get('cargo_places');
  }
  //
  //
  placeCargoPackageChange(i:number){
    console.log(123);
    this.places.controls.forEach((item:any,index:number)=>{
      if(i<index && !item.value.cargo_package_id){
        console.log(item,index,this.requestForm.value.cargo_places[i].cargo_package_id);
        item.patchValue({
          cargo_package_id:this.requestForm.value.cargo_places[i].cargo_package_id
        })
      }
    })
  }



  //РАСЧЕТЫ
  //итоговый подсчет при раздельных местах
  onPlaceEditorChange(){
    let volume = 0;
    let weight = 0;
    // let count = this.requestForm.value.cargo_places.length;
    let count = 0;
    let paidWeight = 0;
    let density = 0;
    //итого вес и обьем
    this.requestForm.value.cargo_places.forEach((i:any)=>{
      if(i) {
        if(i.volume>0){
          volume += i.volume;
        }
        if(i.total_weight>0){
          weight += i.total_weight;
        }
      }
    })
    //плотность
    density = weight/volume>0 ? weight/volume : 0;
    //оплачиваемый вес
    let b1 = weight;
    let b2= volume * 167;
    if(b1>=b2){
      paidWeight=b1;
    } else {
      paidWeight=b2;
    }
    this.requestForm.value.cargo_places.forEach((i:any)=>{
      count= i.count+count
    })


    //патчим форму
    this.requestForm.patchValue({
      cargo_places_volume: volume.toFixed(2),
      cargo_places_weight: weight.toFixed(2),
      cargo_places_count: count,
      cargo_places_paid_weight: paidWeight.toFixed(2),
      cargo_places_density: density.toFixed(2),
    });
  }
  //расчет плотности и оплач.веса при совместных местах
  weightAndVolumeChange() {
    //плотность
    const calkDensity = this.requestForm.value.cargo_places_weight/this.requestForm.value.cargo_places_volume;
    let density = calkDensity > 0 && calkDensity < Infinity ? calkDensity: 0;
    //оплач.вес
    let paidWeight;
    let b1 = this.requestForm.value.cargo_places_weight;
    let b2= this.requestForm.value.cargo_places_volume * 167;
    if(b1>=b2){
      paidWeight=b1;
    } else {
      paidWeight=b2;
    }
    //патчим форму
    this.requestForm.patchValue({
      cargo_places_density: density.toFixed(2),
      cargo_places_paid_weight: paidWeight.toFixed(2),
    });
  }
  //ИЗМЕНЕНИЯ ПОЛЕЙ
  changeForm_Customer(contractor:any){
    this.requestForm.patchValue({
      customer_id: contractor.id,
      customer_name: contractor.name,
    });
  }
  changeForm_TransportType(option:any){
    this.requestForm.patchValue({
      transport_type_id: option.id,
      transport_type_name: option.name,
    });
  }
  changeForm_CargoPackage(option:any){
    this.requestForm.patchValue({
      cargo_package_id: option.id,
      cargo_package_name: option.name,
    });
  }
  changeForm_CargoType(option:any) {
    this.requestForm.patchValue({
      cargo_type_id: option.id,
      cargo_type_name: option.name,
    });
    if(option.param !=='temperature'){
      this.requestForm.controls['cargo_temperature'].reset();
    }
  }

  // changeForm_ArrivalCountry(option:any){
  //   console.log(option)
  //   if(option.id!==this.requestForm.value.arrival_country_id){
  //     this.requestForm.controls['arrival_city_id'].reset();
  //     this.requestForm.controls['arrival_city_name'].reset();
  //     this.requestForm.controls['arrival_point_id'].reset();
  //   }
  //   this.requestForm.patchValue({
  //     arrival_country_id: option.id,
  //     arrival_country_name: option.name
  //   });
  //   // this.getArrivalCitiesByCountryId(option.id);
  //   if(this.requestForm.value.transport_kind_id==1){
  //     this.getArrivalPoint(option.id,this.requestForm.value.transport_kind_id);
  //   };

  // }
  changeForm_DepartureSity(option:any){
    // if(this.requestForm.value.departure_country_id!==option.country_id){
    //   this.requestForm.controls['departure_country_id'].reset();
    //   this.requestForm.controls['departure_country_name'].reset();
    // };
    this.getCountries();
    this.requestForm.patchValue({
      departure_city_id: option.id,
      departure_country_id: option.country_id,
      departure_country_name: option.country_name,
    });
    if(this.requestForm.value.transport_kind_id==1){
      this.getDeparturePoint(option.country_id,this.requestForm.value.transport_kind_id);
    };
  }

  // displayFn(id: any): string {
  //   if (!this.countrys) {
  //     return ''; // или верни какое-то значение по умолчанию
  //   }
  //   const obj = this.countrys.find(obj => obj.id === id);
  //   return obj?.name || ''; // Используем optional chaining для безопасного доступа к свойству
  // }

  //изменение инкотермс
  onIncotermsChange(incotem:any){
    this.requestForm.controls['services'].reset();
    this.requestForm.controls['services_optional'].reset();
    // console.log('incotem xhange',this.incoterms);
    // console.log(this.services);
    let ser=[];
    let opt=[];
    ser = incotem.services_id.filter((number:any) =>
      this.services.some(obj => obj.id === number)
    );
    opt = incotem.services_id.filter((number:any) =>
      this.servicesAdditionals.some(obj => obj.id === number)
    );
    this.requestForm.patchValue({
      services: ser,
      services_optional: opt,
      // services: incotem.services_id,
      // services_optional: incotem.services_id,
    });
    // console.log(
    //   this.requestForm.controls['services'].value,
    //   this.requestForm.controls['services_optional'].value
    // );
  }
  //изменение поля режима отдельных мест
  onPlaceModeChange(){
    while (this.requestForm.value.cargo_places.length>2) {
      this.removePlace(0);
    }
    while (this.requestForm.value.cargo_places.length<2) {
      this.addPlace();
    }
    this.requestForm.controls['cargo_places'].reset([{},{}]);

    this.requestForm.controls['cargo_places_count'].reset();
    this.requestForm.controls['cargo_places_weight'].reset();
    this.requestForm.controls['cargo_places_volume'].reset();
    this.requestForm.controls['cargo_places_paid_weight'].reset();
    this.requestForm.controls['cargo_places_density'].reset();
    this.requestForm.controls['cargo_cost'].reset();
    this.requestForm.controls['cargo_currency_id'].reset();
  }
  //изменение поля режима температурного контроля
  onTempModeChange(){
    if(!this.requestForm.value.cargo_temperature.cargo_temperature_control){
      this.requestForm.controls['cargo_temperature'].reset();
    }
  }
  //изменение поля вида запроса
  onRequestFormatsChange(id:number){
    this.requestForm.controls['cargo_package_id'].reset();
    this.requestForm.controls['cargo_type_id'].reset();
    this.requestForm.controls['cargo_places_count'].reset();
    this.requestForm.controls['cargo_places_weight'].reset();
    this.requestForm.controls['cargo_places_volume'].reset();
    this.requestForm.controls['cargo_places_paid_weight'].reset();
    this.requestForm.controls['cargo_places_density'].reset();
    this.requestForm.controls['cargo_cost'].reset();
    this.requestForm.controls['cargo_currency_id'].reset();
    // this.requestForm.controls['request_one'].reset();
    // this.requestForm.controls['request_two'].reset();
    this.requestForm.controls['comment'].reset();
  }
  //изменение поля вида перевозки
  onTransportationFormatsChange(e:any) {
    this.requestForm.controls['transport_type_id'].reset();
    this.requestForm.controls['transport_type_name'].reset();
    this.requestForm.controls['incoterms_id'].reset();
    this.requestForm.controls['departure_point_id'].reset();
    this.requestForm.controls['services'].reset();
    this.requestForm.controls['services_optional'].reset();
    this.transport_kind_id=e;

    this.getTransportFormatsById(this.requestForm.value.transport_kind_id);
    this.getIncoterms(this.requestForm.value.transport_kind_id);
    this.getRequestServices(this.requestForm.value.transport_kind_id);
    this.getRequestServicesAdditional(this.requestForm.value.transport_kind_id);
    // this.filteredTransportFormats=[];
  }
  //изменение поля тип груза

  //изменение поля города отправления


  //изменение поля города прибытия
  onArrivalCityChange(city: DirectionCity): void {
    this.requestForm.controls['arrival_country_id'].reset();
    this.requestForm.patchValue({
      arrival_city_id: city.id,
      arrival_country_id: city.country_id,
      arrival_country_name: city.country_name
    });
    this.getArrivalPoint(city.country_id,this.requestForm.value.transport_kind_id);
  }
  //изменение поля страны прибытия
  // onArrivalCountryChange(e:any):void{
  //   console.log(e)
  //   if(e!==this.requestForm.value.arrival_country_id){
  //     this.requestForm.controls['arrival_city_id'].reset();
  //     this.requestForm.controls['arrival_city_name'].reset();
  //   }
  //   this.getArrivalCitiesByCountryId(e);
  // }
  //
  onPortChange(port:any){
    this.requestForm.patchValue({
      incoterms_city_id:port.id
    })
  }
  //ПОИСК
  //поиск котнтрактора

  //
  onRequestTypeChange(request_type:any){
    this.requestForm.patchValue({
      request_type_id: request_type.id,
    });
  }
  // searchRequestType(e:any){
  //   // this.getCustomersByName(e.target.value);
  //   this.requestForm.controls['customer_id'].reset();
  // }
  // returnFilteredRequestType(e:any):any{
  //   this.requestFormats.filter(option => option.name.toLowerCase().includes( e.target.value.toLowerCase()));
  // }
  //поиск города оиправления
  // searchDepartureCity(e:any){
  //   this.getDepartureCities(e.target.value);
  //   this.requestForm.controls['departure_city_id'].reset();
  // }
  //поиск города прибытия
  // searchArrivalCity(e:any){
  //   this.getArrivalCities(e.target.value);
  //   this.requestForm.controls['arrival_city_id'].reset();
  // }
  //поиск город/порт для инкотермс
  searchPort(e:any){
    this.getPorts(e.target.value)
  }
  // Приватные методы для полученния данных полей формы:
  //НАЧАЛО ФОРМЫ
  private getCustomers() {
    return this.customerService.customerList()
      .pipe(
        tap((customer) =>{
          this.customers = customer.items as unknown as Customer[];
          this.filteredCustomers = customer.items as unknown as Customer[]
        } ),
        takeUntil(this._destroy$)
      );
  }
  private getCustomersByName(string: string) {
    this.customerService.customerList({filter:{name:string}})
      .pipe(
        tap((customer) => this.customers = customer.items as unknown as Customer[]),
        takeUntil(this._destroy$),
      ).subscribe();
  }
  private getRequestFormats() {
    return this.requestService.requestType()
      .pipe(
        tap((requestFormats) => this.requestFormats = requestFormats as RequestFormat[]),
        takeUntil(this._destroy$)
      );
  }
  private getTransportationFormats() {
    return this.transportService.transportKind()
      .pipe(
        tap((transportationFormats) => this.transportationFormats = transportationFormats as TransportKind[]),
        takeUntil(this._destroy$)
      );
  }
  private getTransportFormatsById(id:number) {
    this.transportService.transportType({kind_id:id})
      .pipe(
        tap((transportFormats) => {
          console.log('transportFormats',transportFormats);
          this.transportFormats = transportFormats as TransportType[];
          this.filteredTransportFormats = transportFormats as TransportType[];
        }),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getTransportFormats() {
    return this.transportService.transportType()
      .pipe(
        tap((transportFormats) => {
          this.transportFormats = transportFormats as TransportType[];
          this.filteredTransportFormats = transportFormats as TransportType[];
        }),
        takeUntil(this._destroy$)
      );
  }
  //ОПИСАНИЕ ГРУЗА
  private getСargoPackages() {
    return this.cargoService.cargoPackage()
      .pipe(
        tap((cargoPackages)=> {
          this.cargoPackages = cargoPackages as CargoPackage[];
          this.filteredCargoPackage = cargoPackages as CargoPackage[];
        }),
        takeUntil(this._destroy$)
      );
  }
  private getСargoTypes() {
    return this.cargoService.cargoType()
      .pipe(
        tap((cargoType)=>{
          this.filteredCargoType = cargoType as CargoType[];
          this.cargoTypes = cargoType as CargoType[];
        } ),
        takeUntil(this._destroy$)
      );
  }
  private getCurrencys() {
    return this.systemService.systemCurrency()
      .pipe(
        tap((currencys)=> this.currencys = currencys.current as Currency[]),
        takeUntil(this._destroy$)
      );
  }
  //НАПРАВЛЕНИЯ
  private getCountries() {
    return this.countryService.getCountries()
      .pipe(
        tap((countrys) => {
          this.filteredDepartureCountrys = countrys;
          this.filteredArrivalCountrys = countrys;
          this.countrys = countrys;
        }),
        takeUntil(this._destroy$)
      );
  }
  private getCities() {
    return this.directionService.directionCity()
      .pipe(
        tap((citys) => {
          this.filteredArrivalCitys = citys as DirectionCity[];
          this.filteredDepartureCitys = citys as DirectionCity[];
          this.citys = citys as DirectionCity[];

        } ),
        takeUntil(this._destroy$)
      );
  }
  // private getArrivalCitiesByCountryId(country_id: number) {
  //   this.directionService.directionCity({country_id})
  //     .pipe(
  //       tap((arrivalCitys) => this.arrivalCitys = arrivalCitys as DirectionCity[]),
  //       takeUntil(this._destroy$)
  //     ).subscribe();
  // }
  // private getDepartureCities(search: string) {
  //   this.directionService.directionCity({search})
  //     .pipe(
  //       tap((departureCitys) => this.departureCitys = departureCitys as DirectionCity[]),
  //       takeUntil(this._destroy$)
  //     ).subscribe();
  // }
  // private getDepartureCitiesByCountryId(country_id: number) {
  //   this.directionService.directionCity({country_id})
  //     .pipe(
  //       tap((departureCitys) => this.departureCitys = departureCitys as DirectionCity[]),
  //       takeUntil(this._destroy$)
  //     ).subscribe();
  // }

  private getDeparturePoint(country_id: any, transport_kind_id: any) {
    this.directionService.directionPoint({country_id:country_id, transport_kind_id:transport_kind_id})
      .pipe(
        tap((departurePoint) =>{
          this.departurePoint=departurePoint?departurePoint as DirectionPoint[]:[];
          this.filteredDeparturePoint=departurePoint?departurePoint as DirectionPoint[]:[];
          this.requestForm.patchValue({
            departure_point_id:this.requestForm.value.departure_point_id
          });
        } ),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getArrivalPoint(country_id: any, transport_kind_id: any) {
    this.directionService.directionPoint({country_id:country_id, transport_kind_id:transport_kind_id})
      .pipe(
        tap(arrivalPoint => {
          this.arrivalPoint=arrivalPoint?arrivalPoint as DirectionPoint[]:[];
          this.filteredArrivalPoint=arrivalPoint?arrivalPoint as DirectionPoint[]:[];
          this.requestForm.patchValue({
            arrival_point_id:this.requestForm.value.arrival_point_id
          });
        } ),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getDirectionFlight() {
    return this.directionService.directionFlight()
      .pipe(
        tap((directionFlights)=>this.directionFlights=directionFlights as DirectionFlight[]),
        takeUntil(this._destroy$)
      );
  }
  //ТРЕБУЕМЫЕ УСЛИГИ
  private getPorts(search:string){
    this.directionService.directionCity({search})
      .pipe(
        tap((ports)=>this.ports=ports as DirectionCity[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getIncoterms(kind_id: number) {
    this.requestService.requestIncoterms({kind_id})
      .pipe(
        tap((incoterms)=>{this.incoterms=incoterms as Incoterms[];
  }),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getRequestServices(kind_id:number) {
    this.requestService.requestServices({kind_id})
      .pipe(
        tap((services)=>this.services=services as RequestServices[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getRequestServicesAdditional(kind_id:number) {
    this.requestService.requestServicesAdditional({kind_id})
      .pipe(
        tap((servicesAdditionals)=>this.servicesAdditionals=servicesAdditionals as RequestServices[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  //ФАЙЛЫ
  private getFile(item_id:number) {
    this.requestService.requestFiles({item_id:item_id, var:'documents_file'})
      .pipe(
        tap((file)=>this.documents=file as unknown as FileDocument[] || []  ),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getDangerFile(item_id:number) {
    this.requestService.requestFiles({item_id:item_id, var:'cargo_file'})
      .pipe(
        tap((file)=>this.documentsDanger=file as unknown as FileDocument[] || []),
        takeUntil(this._destroy$)
      ).subscribe();
  }

  // Приватные методы для создания или редактирования запроса
  //Редактирование запроса
  private updateRequest(body:any){
    this.requestService.requestUpdate({body}).pipe().subscribe({
      next: () => {
        this.fileListDanger?.update().subscribe();
        this.fileList?.update().subscribe();
        if(this.isNavigateAfterSave){
          this.goBack();
        }
        this.snackBar.open(`Запрос изменён`, undefined, this.snackBarWithShortDuration)
      },
      error: (err) => this.snackBar.open(err.error.error_message + `: ` + err.error.error_message_description, undefined, this.snackBarWithShortDuration)
    });
  }
  //Получаем данные запроса для редактирования
  // private getRequest(){
  //   return this.requestService.requestInfo({id:this.id})
  //     .pipe(
  //       tap(request => {
  //         console.log('получили данные запроса',request);
  //         if (!request) {
  //           throw ({ error: { error_message: `Запрос не существует` } });
  //         } else {
  //           request.cargo_places?.forEach(element => {
  //             this.addPlace();
  //           });
  //           this.requestForm.patchValue(request);
  //         }
  //         this.transport_kind_id=request.transport_kind_id;
  //       }),
  //       takeUntil(this._destroy$),
  //     )
  //     .subscribe({
  //       next: request => {
  //         this.title = this.isEditMode ? `Редактирование запроса № ${this.id}` : 'Добавление запроса';
  //         this.getArrivalPoint(this.requestForm.value.arrival_country_id, this.requestForm.value.transport_kind_id);
  //         this.getDeparturePoint(this.requestForm.value.departure_country_id, this.requestForm.value.transport_kind_id);

  //         this.getFile(request.id);
  //         this.getDangerFile(request.id);
  //         this.getTransportFormatsById(request.transport_kind_id!);
  //         this.getIncoterms(this.requestForm.value.transport_kind_id);
  //         this.getRequestServices(this.requestForm.value.transport_kind_id);
  //         this.getRequestServicesAdditional(this.requestForm.value.transport_kind_id);
  //       },
  //       error: (err: any) => {
  //         this.snackBar.open(`Запрос не найден: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
  //         this.goBack();
  //       },
  //     });
  // }
  private getRequest() {
    return this.requestService.requestInfo({ id: this.id }).pipe(
      tap((request) => {
        if(request.arrival_country_id && request.transport_kind_id){
          this.getArrivalPoint(request.arrival_country_id, request.transport_kind_id);
        }
        if(request.departure_country_id && request.transport_kind_id){
          this.getDeparturePoint(request.departure_country_id, request.transport_kind_id);
        }
        console.log('получили данные запроса', request);
      }),
      tap((request) => {
        if (!request) {
          throw { error: { error_message: `Запрос не существует` } };
        } else {
          request.cargo_places?.forEach(() => {
            this.addPlace();
          });
          this.requestForm.patchValue(request);
        }
        this.transport_kind_id = request.transport_kind_id;
        // this.getArrivalPoint(this.requestForm.value.arrival_country_id, this.requestForm.value.transport_kind_id);
        // this.getDeparturePoint(this.requestForm.value.departure_country_id, this.requestForm.value.transport_kind_id);
        this.getFile(request.id);
        this.getDangerFile(request.id);
        this.getTransportFormatsById(this.requestForm.value.transport_kind_id);
        this.getIncoterms(this.requestForm.value.transport_kind_id);
        this.getRequestServices(this.requestForm.value.transport_kind_id);
        this.getRequestServicesAdditional(this.requestForm.value.transport_kind_id);
      }),
      catchError((err) => {
        this.snackBar.open(`Запрос не найден: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        this.goBack();
        return throwError(() => err); // Пробрасываем ошибку дальше
      }),
      takeUntil(this._destroy$)
    );
  }
  //Создание запроса
  private createRequest(body:any){
    //при успешном создании запроса, в ответ получаем id, используем его для добавления документов
    this.requestService.requestCreate({body}).pipe().subscribe({
      next: (test) => {
        console.log(test);
        this.fileListDanger?.create(test.id).subscribe();
        this.fileList?.create(test.id).subscribe();
        if(this.isNavigateAfterSave){
          this.goBack();
        } else {
          this.router.navigate(['pages/request/edit', test.id]);
        }
        this.snackBar.open(`Запрос создан`, undefined, this.snackBarWithShortDuration);
      },
      error: (err) => this.snackBar.open(err.error.error_message + `: ` + err.error.error_message_description, undefined, this.snackBarWithShortDuration)
    });
  }
}

// subscribeInput_DepartureCountryName(){
//   const keyup$ = fromEvent(this.inputElementDepartureCountryName.nativeElement, 'keyup');
//   const paste$ = fromEvent(this.inputElementDepartureCountryName.nativeElement, 'paste');
//   merge(keyup$, paste$)
//   .pipe(
//     debounceTime(1000),
//     distinctUntilChanged(),
//     takeUntil(this._destroy$),
//   )
//   .subscribe((event: any) => {
//     this.requestForm.controls['departure_country_id'].reset();
//     const value = event.target.value;
//     this.filteredDepartureCountrys=this.countrys.filter((item:Country) =>{
//       return item.name && item.name.toLowerCase().includes(value.toLowerCase());
//     })
//     if(this.filteredDepartureCountrys.length==1){
//       if(this.filteredDepartureCountrys[0].name?.toLowerCase()===value.toLowerCase()){
//         this.changeForm_DepartureCountry(this.filteredDepartureCountrys[0])
//       }
//     }
//   });
// }
// subscribeInput_ArrivalCountryName(){
//   const keyup$ = fromEvent(this.inputElementArrivalCountryName.nativeElement, 'keyup');
//   const paste$ = fromEvent(this.inputElementArrivalCountryName.nativeElement, 'paste');
//   merge(keyup$, paste$)
//   .pipe(
//     debounceTime(1000),
//     distinctUntilChanged(),
//     takeUntil(this._destroy$),
//   )
//   .subscribe((event: any) => {
//     this.requestForm.controls['arrival_country_id'].reset();
//     const value = event.target.value;
//     this.filteredArrivalCountrys=this.countrys.filter((item:Country) =>{
//       return item.name && item.name.toLowerCase().includes(value.toLowerCase());
//     })
//     if(this.filteredArrivalCountrys.length==1){
//       if(this.filteredArrivalCountrys[0].name?.toLowerCase()===value.toLowerCase()){
//         this.changeForm_ArrivalCountry(this.filteredArrivalCountrys[0])
//       }
//     }
//   });
// }
  //подписки на форму
  // subscribeControl_СargoСost(){
  //   this.requestForm.get('cargo_cost')?.valueChanges
  //   .pipe(
  //     debounceTime(1500),
  //     distinctUntilChanged(),
  //     takeUntil(this._destroy$),
  //   )
  //   .subscribe((value:any) => {
  //     const formattedValue = value?.toFixed(2); // Округляем до двух знаков
  //     this.requestForm.get('cargo_cost')?.setValue(formattedValue, { emitEvent: false });
  //   });
  // }
  // //подписки на инпуты
  // subscribeInput_CustomerName(){
  //   const keyup$ = fromEvent(this.inputElementCustomerName.nativeElement, 'keyup');
  //   const paste$ = fromEvent(this.inputElementCustomerName.nativeElement, 'paste');
  //   merge(keyup$, paste$)
  //   .pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     takeUntil(this._destroy$),
  //   )
  //   .subscribe((event: any) => {
  //     this.requestForm.controls['customer_id'].reset();
  //     const value = event.target.value;
  //     this.filteredCustomers = this.customers.filter((item: Customer) => {
  //       return item.name && item.name.toLowerCase().includes(value.toLowerCase());
  //     });
  //     if(this.filteredCustomers.length==1){
  //       if(this.filteredCustomers[0].name?.toLowerCase()===value.toLowerCase()){
  //         this.changeForm_Customer(this.filteredCustomers[0]);
  //       };
  //     };
  //   });
  // }
  // subscribeInput_TransportTypeName(){
  //   const keyup$ = fromEvent(this.inputElementTransportTypeName.nativeElement, 'keyup');
  //   const paste$ = fromEvent(this.inputElementTransportTypeName.nativeElement, 'paste');
  //   merge(keyup$, paste$)
  //   .pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     takeUntil(this._destroy$),
  //   )
  //   .subscribe((event: any) => {
  //     this.requestForm.controls['transport_type_id'].reset();
  //     const value = event.target.value;
  //     this.filteredTransportFormats=this.transportFormats.filter((item:TransportType) =>{
  //       return item.name && item.name.toLowerCase().includes(value.toLowerCase());
  //     });
  //     if(this.filteredTransportFormats.length==1){
  //       if(this.filteredTransportFormats[0].name?.toLowerCase()===value.toLowerCase()){
  //         this.changeForm_TransportType(this.filteredTransportFormats[0]);
  //       };
  //     };
  //   });
  // }
  // subscribeInput_CargoPackageName(){
  //   const keyup$ = fromEvent(this.inputElementCargoPackageName.nativeElement, 'keyup');
  //   const paste$ = fromEvent(this.inputElementCargoPackageName.nativeElement, 'paste');
  //   merge(keyup$, paste$)
  //   .pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     takeUntil(this._destroy$),
  //   )
  //   .subscribe((event: any) => {
  //     this.requestForm.controls['cargo_package_id'].reset();
  //     const value = event.target.value;
  //     this.filteredCargoPackage=this.cargoPackages.filter((item:CargoPackage) =>{
  //       return item.name && item.name.toLowerCase().includes(value.toLowerCase());
  //     })
  //     if(this.filteredCargoPackage.length==1){
  //       if(this.filteredCargoPackage[0].name?.toLowerCase()===value.toLowerCase()){
  //         this.changeForm_CargoPackage(this.filteredCargoPackage[0])
  //       };
  //     };
  //   });
  // }
  // subscribeInput_CargoTypeName(){
  //   const keyup$ = fromEvent(this.inputElementCargoTypeName.nativeElement, 'keyup');
  //   const paste$ = fromEvent(this.inputElementCargoTypeName.nativeElement, 'paste');
  //   merge(keyup$, paste$)
  //   .pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     takeUntil(this._destroy$),
  //   )
  //   .subscribe((event: any) => {
  //     this.requestForm.controls['cargo_type_id'].reset();
  //     const value = event.target.value;
  //     this.filteredCargoType=this.cargoTypes.filter((item:CargoType) =>{
  //       return item.name && item.name.toLowerCase().includes(value.toLowerCase());
  //     })
  //     if(this.filteredCargoType.length==1){
  //       if(this.filteredCargoType[0].name?.toLowerCase()===value.toLowerCase()){
  //         this.changeForm_CargoType(this.filteredCargoType[0])
  //       }
  //     }
  //   });
  // }
  // subscribeInput_DepartureCountryName(){
  //   const keyup$ = fromEvent(this.inputElementDepartureCountryName.nativeElement, 'keyup');
  //   const paste$ = fromEvent(this.inputElementDepartureCountryName.nativeElement, 'paste');
  //   merge(keyup$, paste$)
  //   .pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     takeUntil(this._destroy$),
  //   )
  //   .subscribe((event: any) => {
  //     this.requestForm.controls['departure_country_id'].reset();
  //     const value = event.target.value;
  //     this.filteredDepartureCountrys=this.countrys.filter((item:Country) =>{
  //       return item.name && item.name.toLowerCase().includes(value.toLowerCase());
  //     })
  //     if(this.filteredDepartureCountrys.length==1){
  //       if(this.filteredDepartureCountrys[0].name?.toLowerCase()===value.toLowerCase()){
  //         this.changeForm_DepartureCountry(this.filteredDepartureCountrys[0])
  //       }
  //     }
  //   });
  // }
  // subscribeInput_ArrivalCountryName(){
  //   const keyup$ = fromEvent(this.inputElementArrivalCountryName.nativeElement, 'keyup');
  //   const paste$ = fromEvent(this.inputElementArrivalCountryName.nativeElement, 'paste');
  //   merge(keyup$, paste$)
  //   .pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     takeUntil(this._destroy$),
  //   )
  //   .subscribe((event: any) => {
  //     this.requestForm.controls['arrival_country_id'].reset();
  //     const value = event.target.value;
  //     this.filteredArrivalCountrys=this.countrys.filter((item:Country) =>{
  //       return item.name && item.name.toLowerCase().includes(value.toLowerCase());
  //     })
  //     if(this.filteredArrivalCountrys.length==1){
  //       if(this.filteredArrivalCountrys[0].name?.toLowerCase()===value.toLowerCase()){
  //         this.changeForm_ArrivalCountry(this.filteredArrivalCountrys[0])
  //       }
  //     }
  //   });
  // }
