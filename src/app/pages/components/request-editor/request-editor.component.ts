import { emailValidator, innValidator } from './../../../validators/pattern-validator';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, find, map, pipe, takeUntil, tap } from 'rxjs';
import { ContractorService } from './../../../api/services/contractor.service';
import { City, Client, ClientGroup, Contractor, ContractorRequestFormat, Country, Currency, Employee, FileDocument, TaxSystem } from 'src/app/api/custom_models';
import { CargoService, CompanyService, CustomerService, DirectionService, RequestService, SystemService, TransportService } from 'src/app/api/services';
import { Editor } from 'src/app/classes/editor';
import { Location } from '@angular/common';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { byField } from 'src/app/constants';
import { FileListComponent } from '../file-list/file-list.component';
import { TransportKind, TransportSubKind, TransportType } from 'src/app/api/custom_models/transport';
import { Incoterms, Request, RequestFormat, RequestServices } from 'src/app/api/custom_models/request';
import { CargoPackage, CargoType } from 'src/app/api/custom_models/cargo';
import { DirectionFlight, DirectionPoint } from 'src/app/api/custom_models/direction';
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
  //
  title = ''
  nameForHeader?: string;
  request: Partial<Request> = {};
  //состояния
  isEditMode: boolean = false;
  //форма
  requestForm: FormGroup;

  contractors: Contractor[] = [];
  requestFormats: RequestFormat[] = [];
  currentRequestFormat:number = 1; //переменная для зранения текущего типа запроса
  transportationFormats: TransportKind[] = [];
  currentTransportationFormat:string=''; //переменная для хранения текущего вида перевозки
  transportFormats: TransportType[] = [];

  cargoPackages: CargoPackage[]=[];
  cargoTypes: CargoType[]=[];

  currencys: Currency[]=[];

  countrys: Country[]=[];
  departureCitys: City[]=[];
  departurePoint: DirectionPoint[] = [];
  arrivalCitys: City[]=[];
  arrivalPoint:DirectionPoint[] = [];
  directionFlights: DirectionFlight[]=[];

  incoterms: Incoterms[]=[]

  services: RequestServices[]=[]
  servicesAdditionals: RequestServices[]=[]

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 3000 };
  //отписки
  private _destroy$ = new Subject()
  //
  production = environment.production;

  //КОНСТРУКТОР
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private contractorService: ContractorService,
    private transportService: TransportService,
    private requestService: RequestService,
    private cargoService: CargoService,
    private directionService: DirectionService,
    private countryService: CountryService,
    private cityService: CityService,
    private systemService: SystemService,
    private snackBar: MatSnackBar,
    private location: Location,


  ) {
    this.requestForm = this.fb.group({
      //ОСНОВА
      contractor_id: ['', [Validators.required]],
      request_format_id: ['', [Validators.required]],
      transportation_format_id: ['avia', [Validators.required]],
      transport_format_id: ['', [Validators.required]],
      //ОПИСАНИЕ ГРУЗА
      // cargo_description: ['', [Validators.required]],
      // cargo_package_id: ['', [Validators.required]],

      // cargo_places_count: ['', [Validators.required]],//итого мест
      // cargo_places_weight: ['', [Validators.required]],//итого вес
      // cargo_places_volume: ['', [Validators.required]],//итого обьем
      // cargo_places_paid_weight: ['', [Validators.required]],//оплач.вес
      // cargo_places_density: ['', [Validators.required]],//плонтность
      // cargo_cost: ['', [Validators.required]],//стоимость
      // cargo_currency_id: ['', [Validators.required]],//id валюты

      cargos_places: fb.array([], [Validators.required]),//массив мест груза
      //НАПРАЛЕНИЕ
      //откуда
      departure_city_id: ['', [Validators.required]],
      departure_country_id: ['', [Validators.required]],
      departure_point_id: ['', [Validators.required]],
      departure_address: ['', [Validators.required]],
      //куда
      arrival_city_id: ['', [Validators.required]],
      arrival_country_id: ['', [Validators.required]],
      arrival_point_id: ['', [Validators.required]],
      arrival_address: ['', [Validators.required]],
      //рейсы
      direction_flight: ['', [Validators.required]],
      //УСЛУГИ
      incoterms_id: ['', [Validators.required]],

      request_services_id: [[], []],
      request_services_additional_id: [[], []],
      test: [[], []],

    });
  }

  get places() {
    return <FormArray>this.requestForm.get('cargos_places');
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
    }
    // this.getContractors()
    this.getRequestFormats()
    this.getTransportationFormats()
    this.getСargoPackages()
    this.getDirectionFlight()
    this.getCountries()
    this.getCurrencys()

  }
  // Публичные методы:
  //СОХРАНЕНИЕ,УДАЛЕНИЕ,ОТМЕНА,НАЗАД
  save(): void {
    console.log('Нажата кнопка сохранить')
    const body = this.requestForm.value;
    console.log(body)
  }
  remove():void {
    console.log('Нажата кнопка отмена')
  }
  goBack(): void {
    this.location.back();
  }
  //ОТОБРАЖЕНИЕ ПОЛЕЙ
  displayFnContractor = (id:number): string => {
    const name = this.contractors?.find(contractor=>contractor.id === id)?.name;
    return name as string;
  }
  //ИЗМЕНЕНИЯ ПОЛЕЙ
  //
  onContracorChange(e:any){
    this.getContractorsByName(e.target.value);
  }
  //изменение поля вида запроса
  onRequestFormatsChange(id:number){
    this.currentRequestFormat = id;
  }
  //изменение поля вида перевозки
  onTransportationFormatsChange() {
    this.requestForm.controls['transport_format_id'].reset();
    this.requestForm.controls['incoterms_id'].reset();
    this.requestForm.controls['departure_point_id'].reset();
    this.requestForm.controls['request_services_id'].reset();
    this.requestForm.controls['request_services_additional_id'].reset();
    this.currentTransportationFormat=this.requestForm.value.transportation_format_id//запоминаем текущий вид перевозки
    this.getTransportFormats(this.currentTransportationFormat);
    this.getIncoterms(this.currentTransportationFormat);
    this.getRequestServices(this.currentTransportationFormat);
  }
  //изменение поля страны прибытия
  onArrivalCountryChange(countryId: number): void {
    this.requestForm.controls['arrival_city_id'].reset();
    this.requestForm.controls['arrival_point_id'].reset();
    this.getArrivalCities(countryId);
  }
  //изменение поля страны отправления
  onDepartureCountryChange(countryId: number): void {
    this.requestForm.controls['departure_city_id'].reset();
    this.requestForm.controls['departure_point_id'].reset();
    this.getDepartureCities(countryId);
  }
  //изменение поля города отправления
  onDepartureCityChange(cityId: number): void {
    this.requestForm.controls['departure_point_id'].reset();
    this.getDeparturePoint(cityId,this.currentTransportationFormat);
  }
  //изменение поля города прибытия
  onArrivalCityChange(cityId: number): void {
    this.requestForm.controls['arrival_point_id'].reset();
    this.getArrivalPoint(cityId,this.currentTransportationFormat);
  }
  // Приватные методы:
  //НАЧАЛО ФОРМЫ
  private getContractorsByName(string: string) {
    this.contractorService.contractorList({name:string})
      .pipe(
        tap((contractors) => this.contractors = contractors.items as unknown as Contractor[]),
        takeUntil(this._destroy$)
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
  private getTransportFormats(id:string) {
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
  private getArrivalCities(countryId: number) {
    this.cityService.getCities(countryId)
      .pipe(
        tap((arrivalCitys) => this.arrivalCitys = arrivalCitys),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  private getDepartureCities(countryId: number) {
    this.cityService.getCities(countryId)
      .pipe(
        tap((departureCitys) => this.departureCitys = departureCitys),
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
    this.requestService.requestServicesAdditional({kind_id})
      .pipe(
        tap((servicesAdditionals)=>this.servicesAdditionals=servicesAdditionals as RequestServices[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }
  //Редактирование запроса
  private getRequest():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.requestService.requestInfo({id})
      .pipe(tap(request => {
        // currently, when contactor doesn't exist the service returns HTTP 200 with empty response body instead of HTTP 404
        // therefore we have to handle that case manually
        if (!request) {
          throw ({ error: { error_message: `подрядчик не существует` } });
        }
      }))
      .subscribe({
        next: request => {
          this.request = request as unknown as Request;
          const cargoPlacesControl = this.places;
          // this.request.cargo_places?.forEach(place => place.request_id = request.id);
          this.request.cargo_places?.forEach(place => cargoPlacesControl.push(this.fb.control(place)));
          this.requestForm.patchValue(this.request);

          this.nameForHeader = request.transport_kind_id;
        },
        error: (err: any) => {
          this.snackBar.open(`Подрядчик не найден: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
          this.goBack();
        }
      });
  }

}
