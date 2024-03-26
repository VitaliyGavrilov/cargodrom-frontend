import { emailValidator, innValidator } from './../../../validators/pattern-validator';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, find, map, pipe, takeUntil, tap, retry, debounce, debounceTime, distinctUntilChanged } from 'rxjs';
import { ContractorService } from './../../../api/services/contractor.service';
import { City, Client, ClientGroup, Contractor, ContractorRequestFormat, Country, Currency, Customer, DirectionCity, Employee, FileDocument, TaxSystem, RequestFile } from 'src/app/api/custom_models';
import { CargoService, CompanyService, CustomerService, DirectionService, RequestService, SystemService, TransportService } from 'src/app/api/services';
import { Editor } from 'src/app/classes/editor';
import { Location, getLocaleMonthNames } from '@angular/common';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { byField } from 'src/app/constants';
import { FileListComponent } from '../file-list/file-list.component';
import { TransportKind, TransportSubKind, TransportType } from 'src/app/api/custom_models/transport';
import { Incoterms, Request, RequestFormat, RequestServices } from 'src/app/api/custom_models/request';
import { CargoPackage, CargoType } from 'src/app/api/custom_models/cargo';
import { DirectionFlight, DirectionPoint,  } from 'src/app/api/custom_models/direction';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { environment } from './../../../../environments/environment';

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
  //состояния
  isEditMode: boolean = false;
  isFormSubmitted = false;
  //форма
  requestForm: FormGroup;
  //массивы для приходящих данных полей формы
  customers: Customer[] = [];
  requestFormats: RequestFormat[] = [];
  transportationFormats: TransportKind[] = [];
  transportFormats: TransportType[] = [];
  cargoPackages: CargoPackage[]=[];
  cargoTypes: CargoType[]=[];
  currencys: Currency[]=[];
  countrys: Country[]=[];
  departureCitys: DirectionCity[]=[];
  // departureCountrys: Country[]=[];
  departurePoint: DirectionPoint[] = [];
  arrivalCitys: DirectionCity[]=[];
  arrivalPoint:DirectionPoint[] = [];
  directionFlights: DirectionFlight[]=[];
  incoterms: Incoterms[]=[];
  ports: DirectionCity[]=[];
  services: RequestServices[]=[];
  servicesAdditionals: RequestServices[]=[];
  documentsDanger: FileDocument[] = [];
  documents: FileDocument[] = [];
  //текущие данные
  // currentRequestFormat:number=1; //переменная для зранения текущего типа запроса
  // currentTransportationFormat:string=''; //переменная для хранения текущего вида перевозки
  currentPlacesDensity: number = 0 ;
  currentDepartureCountryName:string='';
  currentArrivalCountryName:string='';
  //снек бар
  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 3000 };
  //отписки
  private _destroy$ = new Subject();
  //переменные окружения
  production = environment.production;
  //статичные данные
  // selectedStacking="staking__true"
  // selected = "option2";

  // stakingArr =[
  //   {
  //     value: true,
  //     text: 'стакинг'
  //     // url: типо путь до картинки будет тут, для селектора, должно сработать
  //   },
  //   {
  //     value: false,
  //     text: ' не стакинг'
  //   }
  // ];
  @ViewChild('fileList', { static: false }) fileList!: FileListComponent;
  @ViewChild('fileListDanger', { static: false }) fileListDanger!: FileListComponent;
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
  ) {
    this.requestForm = this.fb.group({
      // + -это значит что в обькте который мы будем отправлять для создания или изменения запроса, есть такое жк поле, а минус будет означть что поле нашей формы не нужно или должно дыть преобразованно в другое поле
      //ОСНОВА
      customer_id: [ , [Validators.required]],// + (customer это клиент,должен быть контрактор)
      customer_name: ['',[Validators.required]],
      request_type_id: [1, [Validators.required]],// +
      transport_kind_id: ['', [Validators.required]],// +
      transport_type_id: ['', [Validators.required]],// +
      //ОПИСАНИЕ ГРУЗА
      cargo_description: ['', [Validators.required,Validators.minLength(2)]],// +
      cargo_package_id: [, []],// +
      cargo_type_id: [, []],// +
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
      //РАССЫЛКИ
      //эти данные не нужны для создания и редактирования, но понадобятся потом
    });
  }
  //МЕТОДЫ ЖЦ
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
  ngOnInit(): void {
    const segments = this.route.snapshot.url.map(s => s.path);
    this.isEditMode = segments[1] !== 'add';
    this.title = this.isEditMode ? 'Информация о запросе' : 'Добавление запроса';
    if (this.isEditMode) {
      this.getRequest();
    };
    // this.getCustomers();
    this.getRequestFormats();
    this.getTransportationFormats();
    this.getСargoPackages();
    this.getDirectionFlight();
    this.getCountries();
    this.getCurrencys();
    this.getСargoTypes();
    //что бы сразу два экзамляра формы было, как в макете =)
    // if(this.places.length === 0 && !this.isEditMode){
    //   this.addPlace();
    //   this.addPlace();
    // };
    this.subForm();
    // this.requestForm.get('cargo_readiness')?.clearValidators();
  }
  // Публичные методы:
  //СОХРАНЕНИЕ,УДАЛЕНИЕ,ОТМЕНА,НАЗАД
  save(): void {
    const body = this.requestForm.value;
    this.isFormSubmitted=true;
    console.log(body);

    if (!this.requestForm.valid ) {
      this.snackBar.open('Не все поля заполнены', undefined, this.snackBarWithLongDuration);
      return;
    }

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
    }
    //удаляем доп поля
    if(body.transport_kind_id !== 'avia') {
      delete data.departure_point_id;
      delete data.arrival_point_id;
      delete data.cargo_places_paid_weight;
    }
    if(body.transport_kind_id === 'road'){
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
    }
    //удаляем доп поля
    if(body.transport_kind_id !== 'avia') {
      delete data.departure_point_id;
      delete data.arrival_point_id;
      delete data.cargo_places_paid_weight;
    }
    if(body.transport_kind_id === 'road'){
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
    }
    //удаляем доп поля
    if(!body.cargo_temperature.cargo_temperature_control) {
      delete data.cargo_temperature;
    }
    if(body.transport_kind_id !== 'avia') {
      delete data.departure_point_id;
      delete data.arrival_point_id;
      delete data.cargo_places_paid_weight;
    }
    if(body.transport_kind_id === 'road'){
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
    }
    //удаляем доп поля
    if(!body.cargo_temperature.cargo_temperature_control) {
      delete data.cargo_temperature;
    }
    if(body.transport_kind_id !== 'avia') {
      delete data.departure_point_id;
      delete data.arrival_point_id;
      delete data.cargo_places_paid_weight;
    }
    if(body.transport_kind_id === 'road'){
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
  //РАСЧЕТЫ
  //итоговый подсчет при раздельных местах
  onPlaceEditorChange(){
    let volume = 0;
    let weight = 0;
    let count = this.requestForm.value.cargo_places.length;
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
    //патчим форму
    this.requestForm.patchValue({
      cargo_places_volume: volume,
      cargo_places_weight: weight,
      cargo_places_count: count,
      cargo_places_paid_weight: paidWeight,
      cargo_places_density: density,
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
      cargo_places_density: density,
      cargo_places_paid_weight: paidWeight,
    });
  }
  //ИЗМЕНЕНИЯ ПОЛЕЙ
  //
  onCustomerChange(contractor:any){
    this.requestForm.patchValue({
      customer_id: contractor.id,
    });
  }
  //изменение инкотермс
  onIncotermsChange(incotem:any){
    this.requestForm.patchValue({
      services: incotem.services_id,
    });
  }
  //изменение поля режима отдельных мест
  onPlaceModeChange(){
    // this.requestForm.value.cargo_places.length=2
    // this.requestForm.value.cargo_places=[{},{}]


    // this.requestForm.patchValue({
    //   cargo_places: [{},{}],
    // });

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
    this.requestForm.controls['request_one'].reset();
    this.requestForm.controls['request_two'].reset();
    this.requestForm.controls['comment'].reset();

  }
  //изменение поля вида перевозки
  onTransportationFormatsChange() {
    this.requestForm.controls['transport_type_id'].reset();
    this.requestForm.controls['incoterms_id'].reset();
    this.requestForm.controls['departure_point_id'].reset();
    this.requestForm.controls['services'].reset();
    this.requestForm.controls['services_optional'].reset();

    //запоминаем и используем текущий вид перевозки
    // this.currentTransportationFormat = this.requestForm.value.transport_kind_id;
    console.log(this.requestForm.value.transport_kind_id)
    this.getTransportFormatsById(this.requestForm.value.transport_kind_id);
    this.getIncoterms(this.requestForm.value.transport_kind_id);
    this.getRequestServices(this.requestForm.value.transport_kind_id);
    this.getRequestServicesAdditional(this.requestForm.value.transport_kind_id);
  }
  //изменение поля города отправления
  onDepartureCityChange(city: DirectionCity): void {
    this.requestForm.controls['departure_country_id'].reset();
    this.requestForm.patchValue({
      departure_city_id: city.id,
      departure_country_id: city.country_id,
      // departure_country_name: city.country_name,
    });
    this.getDeparturePoint(city.id,this.requestForm.value.transport_kind_id);
  }
  //изменение поля страны отправления
  onDepartureCountryChange(e:any):void{
    console.log(e)
    if(e!==this.requestForm.value.departure_country_id){
      this.requestForm.controls['departure_city_id'].reset();
      this.requestForm.controls['departure_city_name'].reset();
    }
    this.getDepartureCitiesByCountryId(e)
  }
  //изменение поля города прибытия
  onArrivalCityChange(city: DirectionCity): void {
    this.requestForm.controls['arrival_country_id'].reset();
    this.requestForm.patchValue({
      arrival_city_id: city.id,
      arrival_country_id: city.country_id,
      arrival_country_name: city.country_name
    });
    this.getArrivalPoint(city.id,this.requestForm.value.transport_kind_id);
  }
  //изменение поля страны прибытия
  onArrivalCountryChange(e:any):void{
    console.log(e)
    if(e!==this.requestForm.value.arrival_country_id){
      this.requestForm.controls['arrival_city_id'].reset();
      this.requestForm.controls['arrival_city_name'].reset();
    }
    this.getArrivalCitiesByCountryId(e);
  }
  //
  onPortChange(port:any){
    this.requestForm.patchValue({
      incoterms_city_id:port.id
    })
  }
  //ПОИСК
  //так то можно напрямую evt передавать в методы запросы
  //поиск котнтрактора
  searchCustomer(e:any){
    this.getCustomersByName(e.target.value);
    this.requestForm.controls['customer_id'].reset();

  }
  //поиск города оиправления
  searchDepartureCity(e:any){
    this.getDepartureCities(e.target.value);
    this.requestForm.controls['departure_city_id'].reset();
  }
  //поиск города прибытия
  searchArrivalCity(e:any){
    this.getArrivalCities(e.target.value);
    this.requestForm.controls['arrival_city_id'].reset();
  }
  //поиск город/порт для инкотермс
  searchPort(e:any){
    this.getPorts(e.target.value)
  }
  // Приватные методы для полученния данных полей формы:
  //НАЧАЛО ФОРМЫ
  private getCustomers() {
    this.customerService.customerList()
      .pipe(
        tap((customer) => this.customers = customer.items as unknown as Customer[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getCustomersByName(string: string) {
    this.customerService.customerList({name:string})
      .pipe(
        tap((customer) => this.customers = customer.items as unknown as Customer[]),
        takeUntil(this._destroy$),
      ).subscribe();
  }
  private getRequestFormats() {
    this.requestService.requestType()
      .pipe(
        tap((requestFormats) => this.requestFormats = requestFormats as RequestFormat[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getTransportationFormats() {
    this.transportService.transportKind()
      .pipe(
        tap((transportationFormats) => this.transportationFormats = transportationFormats as TransportKind[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getTransportFormatsById(id:string) {
    this.transportService.transportType({kind_id:id})
      .pipe(
        tap((transportFormats) => this.transportFormats = transportFormats as TransportType[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  //ОПИСАНИЕ ГРУЗА
  private getСargoPackages() {
    this.cargoService.cargoPackage()
      .pipe(
        tap((cargoPackages)=> this.cargoPackages = cargoPackages as CargoPackage[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getСargoTypes() {
    this.cargoService.cargoType()
      .pipe(
        tap((cargoType)=> this.cargoTypes = cargoType as CargoType[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getCurrencys() {
    this.systemService.systemCurrency()
      .pipe(
        tap((currencys)=> this.currencys = currencys as Currency[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  //НАПРАВЛЕНИЯ
  private getCountries() {
    this.countryService.getCountries()
      .pipe(
        tap((countrys) => this.countrys = countrys),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getArrivalCities(search: string) {
    this.directionService.directionCity({search})
      .pipe(
        tap((arrivalCitys) => this.arrivalCitys = arrivalCitys as DirectionCity[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getArrivalCitiesByCountryId(country_id: number) {
    this.directionService.directionCity({country_id})
      .pipe(
        tap((arrivalCitys) => this.arrivalCitys = arrivalCitys as DirectionCity[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getDepartureCities(search: string) {
    this.directionService.directionCity({search})
      .pipe(
        tap((departureCitys) => this.departureCitys = departureCitys as DirectionCity[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getDepartureCitiesByCountryId(country_id: number) {
    this.directionService.directionCity({country_id})
      .pipe(
        tap((departureCitys) => this.departureCitys = departureCitys as DirectionCity[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getDeparturePoint(city_id: number, transport_kind_id: string) {
    this.directionService.directionPoint({city_id, transport_kind_id})
      .pipe(
        tap((departurePoint) => this.departurePoint=departurePoint as DirectionPoint[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getArrivalPoint(city_id: number, transport_kind_id: string) {
    this.directionService.directionPoint({city_id, transport_kind_id})
      .pipe(
        tap(arrivalPoint => this.arrivalPoint=arrivalPoint as DirectionPoint[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getDirectionFlight() {
    this.directionService.directionFlight()
      .pipe(
        tap((directionFlights)=>this.directionFlights=directionFlights as DirectionFlight[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  //ТРЕБУЕМЫЕ УСЛИГИ
  private getPorts(search:string){
    this.directionService.directionCity({search})
      .pipe(
        tap((ports)=>this.ports=ports as DirectionCity[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getIncoterms(kind_id: string) {
    this.requestService.requestIncoterms({kind_id})
      .pipe(
        tap((incoterms)=>this.incoterms=incoterms as Incoterms[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getRequestServices(kind_id:string) {
    this.requestService.requestServices({kind_id})
      .pipe(
        tap((services)=>this.services=services as RequestServices[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getRequestServicesAdditional(kind_id:string) {
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
        this.snackBar.open(`Запрос изменён`, undefined, this.snackBarWithShortDuration)
      },
      error: (err) => this.snackBar.open(`Ошибка редактирования запроса: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }
  //Получаем данные запроса для редактирования
  private getRequest():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;
    this.requestService.requestInfo({id})
      .pipe(tap(request => {
        if (!request) {
          throw ({ error: { error_message: `Запрос не существует` } });
        }
      }))
      .subscribe({
        next: request => {
          this.getFile(id);
          this.getDangerFile(id);
          console.log('получили данные запроса',request);


          request.cargo_places?.forEach(element => {
            this.addPlace()
          });

          this.requestForm.patchValue(request);
          //тут нужны будут еще проверки
          this.getTransportFormatsById(this.requestForm.value.transport_kind_id);
          this.getIncoterms(this.requestForm.value.transport_kind_id);
          this.getRequestServices(this.requestForm.value.transport_kind_id);
          this.getRequestServicesAdditional(this.requestForm.value.transport_kind_id);
          this.getArrivalPoint(this.requestForm.value.arrival_city_id, this.requestForm.value.transport_kind_id);
          this.getDeparturePoint(this.requestForm.value.departure_city_id, this.requestForm.value.transport_kind_id);
        },
        error: (err: any) => {
          this.snackBar.open(`Запрос не найден: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
          this.goBack();
        }
      });
  }
  //Создание запроса
  private createRequest(body:any){
    //при успешном создании запроса, в ответ получаем id, используем его для добавления документов
    this.requestService.requestCreate({body}).pipe().subscribe({
      next: (test) => {
        console.log(test);
        this.fileListDanger?.create(test.id).subscribe();
        this.fileList?.create(test.id).subscribe();
        this.router.navigate(['pages/request/edit', test.id]);
        this.snackBar.open(`Запрос создан`, undefined, this.snackBarWithShortDuration);
      },
      error: (err) => this.snackBar.open(`Ошибка создания запроса: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }
  //ВАЛИДАЦИЯ
  setValid(){
    if(this.requestForm.value.request_type_id===1){
      this.validateA();
      return;
    }
    if(this.requestForm.value.request_type_id===2 && !this.requestForm.value.cargo_separately){
      this.validateB();
      return;
    }
    if(this.requestForm.value.request_type_id===2 && this.requestForm.value.cargo_separately){
      this.validateC();
      return;
    }
  }
  //при индиактиве
  validateA(){
    //обяз
    this.requestForm.get('cargo_package_id')?.setValidators([Validators.required]);
    //не обяз
    this.requestForm.get('cargo_type_id')?.clearValidators();

    if(this.requestForm.value.transport_kind_id==='road'){
      this.requestForm.get('incoterms_id')?.clearValidators();
    } else {
      this.requestForm.get('incoterms_id')?.setValidators([Validators.required]);
    }
  }
  //при индиактиве, не раздельно
  validateB(){
    //обяз
    this.requestForm.get('cargo_package_id')?.setValidators([Validators.required]);
    //не обяз
    this.requestForm.get('cargo_type_id')?.setValidators([Validators.required]);

    if(this.requestForm.value.transport_kind_id==='road'){
      this.requestForm.get('incoterms_id')?.clearValidators();
    } else {
      this.requestForm.get('incoterms_id')?.setValidators([Validators.required]);
    }
  }
  //при индиактиве, не раздельно
  validateC(){
    //обяз
    this.requestForm.get('cargo_package_id')?.clearValidators();
    //не обяз
    this.requestForm.get('cargo_type_id')?.setValidators([Validators.required]);

    if(this.requestForm.value.transport_kind_id==='road'){
      this.requestForm.get('incoterms_id')?.clearValidators();
    } else {
      this.requestForm.get('incoterms_id')?.setValidators([Validators.required]);
    }
  }
  subForm(){
    this.requestForm.valueChanges.subscribe((v) => {
     this.setValid();
    });
  }

}



// Обязательные поля для создания запроса()
//это типо скелет нашей формы,в будущем форма в таком виде не будет отправляться

// ОСНОВНЫЕ
//контрагент = customer_id: число
//вид запроса = request_type_id: число
//вид перевозки = transport_kind_id: строка
//тип транспорта = transport_type_id: число

//ОПИСАНИЕ ГРУЗА
//наименнование груза = cargo_description: строка

//НАПРАВЛЕНИЕ
//город отправления = departure_city_id: число
//страна отправления = departure_country_id: число
//город назначения = arrival_city_id: число
//страна назначения = arrival_country_id: число
//рейсы = departure_flight: строка


//дальше пойдет описане какждого режима формы и его полей


//Режим №1 БАЗОВЫЙ(planA)-------------------------------------------------------------------------------------
//Признаки:
//1. Вид запроса = индикатив
// request_type_id: 1
//2.Габариты и места = не раздельно(данного поля не будут на беке)
// cargo_separately: false

//Вариативность данного режима
//1.Если выбрать видом перевозки авто(road), то будет не доступен весь блок Требуемых Услуг(так как бек ничего не возвращает для селкторов блока).
//2.Если выбрать видом перевозки самолет(avia), то в блоке Направления появятся селекторы АЭРОПОРТ ВЫЛЕТА и АЭРОПОРТ ПРИБЫТИЯ.
//3.Если выбрать видом перевозки самолет(avia), то в блоке Описание Груза появится ОПЛАЧИВАЕМЫЙ ВЕС.

//  Основные поля базового режима:

//контрагент = customer_id: число
//вид запроса = request_type_id: число
//вид перевозки = transport_kind_id: строка
//тип транспорта = transport_type_id: число

//наименнование груза = cargo_description: строка
//вид упаковки = cargo_package_id: число

//итого мест = cargo_places_count: число
//итого вес = cargo_places_weight: число
//итого обьем = cargo_places_volume: число
//плотность = cargo_places_density: число
//стоимость = cargo_cost: число
//вид валюты = cargo_currency_id: число по моему, но в документации(создание запроса) написанно строка, надо уточнить

//город отправления = departure_city_id: число
//страна отправления = departure_country_id: число

//город назначения = arrival_city_id: число
//страна назначения = arrival_country_id: число
//адресс назначения = arrival_address: строка

//рейсы = departure_flight: строка

//  Дополнительные поля базового режима:

//Если выбрать видом перевозки самолет(avia),то
//-оплачиваемый вес = cargo_places_paid_weight: число
//-аэропорт вылета
//-аэропорт приземления

//Если выбрать видом перевозки(transport_kind_id) не авто(road), а самолет(avia), жд(rw) или море , то
//-условия поставки = incoterms_id: число
//-город/порт
//-в ставку должно быть включенно = services: массив из числе по моему, но в документация из строк
//-дополнительные услуги = services_optional: массив из числе по моему, но в документация из строк


//Режим №2 БАЗОВЫЙ+(planB)-------------------------------------------------------------------------------------
//Признаки:
//1. Вид запроса = индикатив
// request_type_id: 1
//2.Габариты и места = раздельно
// cargo_separately: true (данного поля не будет на беке)

//Вариативность данного режима такая же как и в planA:
//1.Если выбрать видом перевозки авто(road), то будет не доступен весь блок Требуемых Услуг(так как бек ничего не возвращает для селкторов блока).
//2.Если выбрать видом перевозки самолет(avia), то в блоке Направления появятся селекторы АЭРОПОРТ ВЫЛЕТА и АЭРОПОРТ ПРИБЫТИЯ.
//3.Если выбрать видом перевозки самолет(avia), то в блоке Описание Груза появится ОПЛАЧИВАЕМЫЙ ВЕС.

//  Основные поля базового+ режима:

//контрагент = customer_id: число
//вид запроса = request_type_id: число
//вид перевозки = transport_kind_id: строка
//тип транспорта = transport_type_id: число

//наименнование груза = cargo_description: строка
//вид упаковки = cargo_package_id: число

//места = cargo_places: массив мест[{
// length: длина
// width: ширина
// height: высота
// weight: вес
// count: количество
// volume: итого обьем места
// total_weight: итого вес места
// },]

//итого мест = cargo_places_count: число
//итого вес = cargo_places_weight: число
//итого обьем = cargo_places_volume: число
//плотность = cargo_places_density: число
//стоимость = cargo_cost: число
//вид валюты = cargo_currency_id: число по моему, но в документации(создание запроса) написанно строка, надо уточнить

//город отправления = departure_city_id: число
//страна отправления = departure_country_id: число
//город назначения = arrival_city_id: число
//страна назначения = arrival_country_id: число
//адресс назначения = arrival_address: строка
//рейсы = departure_flight: строка

//  Дополнительные поля базового+ режима:

//Если выбрать видом перевозки самолет(avia),то
//-оплачиваемый вес = cargo_places_paid_weight: число
//-аэропорт вылета
//-аэропорт приземления

//Если выбрать видом перевозки(transport_kind_id) не авто(road), а самолет(avia), жд(rw) или море , то
//-условия поставки = incoterms_id: число
//-в ставку должно быть включенно = services: массив из числе по моему, но в документация из строк
//-дополнительные услуги = services_optional: массив из числе по моему, но в документация из строк


//----------------------------------------------------------------------------------------------------------------
///////////////////////////////////// Режим №3 РАСШИРЕННЫЙ(planC) ////////////////////////////////////////////////
//----------------------------------------------------------------------------------------------------------------
//Признаки:
//1. Вид запроса = индикатив
// request_type_id: 2
//2.Габариты и места = не раздельно
// cargo_separately: false (данного поля не будет на беке)

//Вариативность:
//1.Если выбрать видом перевозки авто(road), то будет не доступен весь блок Требуемых Услуг(так как бек ничего не возвращает для селкторов блока).
//2.Если выбрать видом перевозки самолет(avia), то в блоке Направления появятся селекторы АЭРОПОРТ ВЫЛЕТА и АЭРОПОРТ ПРИБЫТИЯ.
//3.Если выбрать видом перевозки самолет(avia), то в блоке Описание Груза появится ОПЛАЧИВАЕМЫЙ ВЕС.
//4.Если выбрать, что нужен температурный режим(true), то в блоке Описание Груза появятся поля минимальная,максимальная температура и наличие температурного режима

//  Основные поля расширенного режима:

//контрагент = customer_id: число
//вид запроса = request_type_id: число
//вид перевозки = transport_kind_id: строка
//тип транспорта = transport_type_id: число

//наименнование груза = cargo_description: строка
//тип груза = cargo_type_id: число

//файл безрпастности наличие

//итого мест = cargo_places_count: число
//итого вес = cargo_places_weight: число
//итого обьем = cargo_places_volume: число
//плотность = cargo_places_density: число
//стоимость = cargo_cost: число
//вид валюты = cargo_currency_id: число по моему, но в документации(создание запроса) написанно строка, надо уточнить
//готовность
//вид упаковки = cargo_package_id: число
//стакинг


//город отправления = departure_city_id: число
//страна отправления = departure_country_id: число
//адрес забора груза

//город назначения = arrival_city_id: число
//страна назначения = arrival_country_id: число
//адресс доставки груза = arrival_address: строка

//рейсы = departure_flight: строка

//дополнительная информация=

//  Дополнительные поля расширенного режима:

//Если подтвердить наличие температурного режима(true), то:
//-температура {
//   температурный режим
//   температура мин
//   температура макс
// }

//Если выбрать видом перевозки самолет(avia),то
//-аэропорт вылета
//-аэропорт приземления
//-оплачиваемый вес = cargo_places_paid_weight: число

//Если выбрать видом перевозки(transport_kind_id) не авто(road), а самолет(avia), жд(rw) или море , то
//-порт
//-условия поставки = incoterms_id: число
//-в ставку должно быть включенно = services: массив из числе по моему, но в документация из строк
//-дополнительные услуги = services_optional: массив из числе по моему, но в документация из строк


//----------------------------------------------------------------------------------------------------------------
///////////////////////////////////// Режим №4 РАСШИРЕННЫЙ+(planD) ///////////////////////////////////////////////
//----------------------------------------------------------------------------------------------------------------
//Признаки:
//1. Вид запроса = индикатив
// request_type_id: 2
//2.Габариты и места = раздельно
// cargo_separately: true (данного поля не будет на беке)

//Вариативность:
//1.Если выбрать видом перевозки авто(road), то будет не доступен весь блок Требуемых Услуг(так как бек ничего не возвращает для селкторов блока).
//2.Если выбрать видом перевозки самолет(avia), то в блоке Направления появятся селекторы АЭРОПОРТ ВЫЛЕТА и АЭРОПОРТ ПРИБЫТИЯ.
//3.Если выбрать видом перевозки самолет(avia), то в блоке Описание Груза появится ОПЛАЧИВАЕМЫЙ ВЕС.
//4.Если выбрать, что нужен температурный режим(true), то в блоке Описание Груза появятся поля минимальная,максимальная температура и наличие температурного режима

//  Основные поля расширенного режима:

//контрагент = customer_id: число
//вид запроса = request_type_id: число
//вид перевозки = transport_kind_id: строка
//тип транспорта = transport_type_id: число

//наименнование груза = cargo_description: строка
//тип груза = cargo_type_id: число

//файл безрпастности наличие

//места = cargo_places: массив мест[{
// cargo_package_id: укаповка
// stacking: стакинг
// length: длина
// width: ширина
// height: высота
// weight: вес
// count: количество
// volume: итого обьем места
// total_weight: итого вес места
// },]

//итого мест = cargo_places_count: число
//итого вес = cargo_places_weight: число
//итого обьем = cargo_places_volume: число
//плотность = cargo_places_density: число
//стоимость = cargo_cost: число
//вид валюты = cargo_currency_id: число по моему, но в документации(создание запроса) написанно строка, надо уточнить
//готовность

//город отправления = departure_city_id: число
//страна отправления = departure_country_id: число
//адрес забора груза

//город назначения = arrival_city_id: число
//страна назначения = arrival_country_id: число
//адресс доставки груза = arrival_address: строка

//рейсы = departure_flight: строка

//дополнительная информация=

//  Дополнительные поля расширенного режима:

//Если подтвердить наличие температурного режима(true), то:
//-температура {
//   температурный режим
//   температура мин
//   температура макс
// }

//Если выбрать видом перевозки самолет(avia),то
//-аэропорт вылета
//-аэропорт приземления
//-оплачиваемый вес = cargo_places_paid_weight: число

//Если выбрать видом перевозки(transport_kind_id) не авто(road), а самолет(avia), жд(rw) или море , то
//-порт
//-условия поставки = incoterms_id: число
//-в ставку должно быть включенно = services: массив из числе по моему, но в документация из строк
//-дополнительные услуги = services_optional: массив из числе по моему, но в документация из строк


//-ВАЛИДАЦИЯ-ВАЛИДАЦИЯ-ВАЛИДАЦИЯ-ВАЛИДАЦИЯ-ВАЛИДАЦИЯ-ВАЛИДАЦИЯ-ВАЛИДАЦИЯ-ВАЛИДАЦИЯ

//Поля влияющие на валидацию:
//-вид запроса
//-вид перевозки
//-места

//Поля с валидцией:

//котрагнет
//вид запроса
//вид перевозки
//тип транспорта

//наименнование груза
//вид упаковки
//тип груза

//вид упаковки(в местах)

//город
//страна

//условия поставки
