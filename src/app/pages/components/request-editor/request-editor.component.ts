import { emailValidator, innValidator } from './../../../validators/pattern-validator';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { ContractorService } from './../../../api/services/contractor.service';
import { City, Client, ClientGroup, Contractor, ContractorRequestFormat, Country, Currency, Employee, FileDocument, TaxSystem } from 'src/app/api/custom_models';
import { CargoService, CompanyService, CustomerService, DirectionService, RequestService, SystemService, TransportService } from 'src/app/api/services';
import { Editor } from 'src/app/classes/editor';
import { Location } from '@angular/common';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { byField } from 'src/app/constants';
import { FileListComponent } from '../file-list/file-list.component';
import { TransportSubKind } from 'src/app/api/custom_models/transport';
import { Incoterms, RequestFormat, RequestServices } from 'src/app/api/custom_models/request';
import { CargoPackage, CargoType } from 'src/app/api/custom_models/cargo';
import { DirectionFlight, DirectionPoint } from 'src/app/api/custom_models/direction';

@Component({
  selector: 'app-request-editor',
  templateUrl: './request-editor.component.html',
  styleUrls: ['./request-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class RequestEditorComponent implements OnInit, OnDestroy {
  //грубо говоря это стейт переменные
  title = ''
  isEditMode: boolean = false;
  requestForm: FormGroup;
  contractors: Contractor[] = [];
  requestFormats: RequestFormat[] = [];
  transportationFormats: TaxSystem[] = [];
  currentTransportationFormat:string=''; //переменная для хранения текущего вида перевозки
  currentRequestFormat:number = 1; //переменная для зранения текущего типа запроса
  transportFormats: TaxSystem[] = [];
  cargoPackages: CargoPackage[]=[];
  cargoTypes: CargoType[]=[];

  currencys: Currency[]=[]

  departureCountrys: Country[]=[];
  departureCitys: City[]=[];
  departurePoint: DirectionPoint[] = [];
  directionFlights: DirectionFlight[]=[];

  incoterms: Incoterms[]=[]

  services: RequestServices[]=[]
  servicesAdditionals: RequestServices[]=[]

  private _destroy$ = new Subject()

  //конструктор
  constructor(
    private fb: FormBuilder,
    private contractorService: ContractorService,
    private transportService: TransportService,
    private requestService: RequestService,
    private cargoService: CargoService,
    private directionService: DirectionService,
    private countryService: CountryService,
    private cityService: CityService,
    private systemService: SystemService,


  ) {
    this.requestForm = this.fb.group({
      //ОСНОВА
      contractor_id: ['', [Validators.required]],
      request_format_id: ['', [Validators.required]],
      transportation_format_id: ['', [Validators.required]],
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

      // cargos_places: fb.array([], [Validators.required]),//массив мест груза
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

    });
  }
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
  //инициализация компонента
  ngOnInit(): void {
    this.title = this.isEditMode ? 'Информация о запросе' : 'Добавление запроса';
    // this.getContractors()
    this.getRequestFormats()
    this.getTransportationFormats()
    this.getСargoPackages()
    this.getDirectionFlight()
    this.getCountries()
    this.getCurrencys()

  }
  displayFn(user: Contractor): string {
    return user && user.name ? user.name : '';

  }

  // Публичные методы:
  //сохранение данных
  save(): void {
    console.log('Нажата кнопка сохранить')

    //ВАРИАНТ 1
    //Планирую разделить старницу на 3-4 компонента, в каждом формы, в основном компоненте собираю данные с форм и обрабатываю, например обьединив обьекты методом Object.assign()
    //Компоненты: Описание груза, Направления и требуемые услуги и одна форма в основного компоненте
    //В Компоненте описание груза будет свой дочерний компонент Управление местами, его реализую с помощью ControlValueAccessor.
    //Надо уточнить как в таком варианте реализовать удобную валидацию.

    const body = this.requestForm.value;
    body.contractor_id = body.contractor_id.id;

    console.log(body)
  }
  //отмена данных
  remove():void {
    console.log('Нажата кнопка отмена')
  }
  onRequestFormatsChange(id:number){
    this.currentRequestFormat = id;
    console.log(id)
  }
  //защита инпута видов транспорта, доступ только после заполнения инпута видов перевозки
  onTransportationFormatsChange(id: string) {
    this.requestForm.controls['transport_format_id'].reset(undefined);
    this.requestForm.controls['departure_point_id'].reset(undefined);
    this.getTransportFormats(id);
    this.currentTransportationFormat=id//запоминаем текущий вид перевозки
    this.getIncoterms(this.currentTransportationFormat)
    this.getRequestServices(this.currentTransportationFormat)
  }
  //защита инпута городов,доступ только после выбора страны
  onCountryChange(countryId: number): void {
    this.requestForm.controls['departure_city_id'].reset(undefined);
    this.getCities(countryId);
  }
  //защита инпута точки,доступ толшько после выбора вида транспорта и города
  onCityChange(cityId: number): void {
    this.requestForm.controls['departure_point_id'].reset(undefined);
    this.getDeparturePoint(cityId,this.currentTransportationFormat);
  }
  // Приватные методы:
  // Получаем списки
  //котрагентов (подрядчиков)
  private getContractors() {
    this.contractorService.contractorList()
      .pipe(
        tap((contractors: any) => this.contractors = contractors.items as unknown as Contractor[]),
        takeUntil(this._destroy$)
      ).subscribe()
  }
  getContractorsByName(e:any) {
    this.contractorService.contractorList({name:e.target.value})
      .subscribe(contractors => this.contractors = contractors.items as unknown as Contractor[])
  }
  //видов запросов
  private getRequestFormats() {
    this.requestService.requestType()
      .subscribe(requestFormats => this.requestFormats = requestFormats as unknown as RequestFormat[])
  }
  //видов перевозки
  private getTransportationFormats() {
    this.transportService.transportKind()
      .subscribe(transportationFormats => this.transportationFormats = transportationFormats as unknown as TaxSystem[])
  }
  //видов транспорта, зависят от видов перевозки
  private getTransportFormats(id:string) {
    this.transportService.transportType({kind_id:id,})
      .subscribe(transportFormats => this.transportFormats = transportFormats as unknown as TaxSystem[])
  }
  //ОПИСАНИЕ ГРУЗА
  //видов упаковки
  private getСargoPackages() {
    this.cargoService.cargoPackage()
      .subscribe(cargoPackages => this.cargoPackages = cargoPackages as CargoPackage[])
  }

  private getCurrencys() {
    this.systemService.systemCurrency()
      .subscribe(currencys=> this.currencys = currencys as Currency[])
  }
  //НАПРАВЛЕНИЕ
  //стран
  private getCountries() {
    this.countryService.getCountries()
      .subscribe(departureСountrys => this.departureCountrys = departureСountrys);
  }
  //городов
  private getCities(countryId: number) {
    this.cityService.getCities(countryId)
      .subscribe(departureCitys => this.departureCitys = departureCitys);
  }
  //точек
  private getDeparturePoint(city_id: number, transport_kind_id: string) {
    this.directionService.directionPoint({city_id,transport_kind_id})
      .subscribe(departurePoint => this.departurePoint=departurePoint as unknown as DirectionPoint[])
  }
  //рейсов
  private getDirectionFlight() {
    this.directionService.directionFlight()
      .subscribe(directionFlights=>this.directionFlights=directionFlights as unknown as DirectionFlight[])
  }
  //ТРЕБУЕМЫЕ УСЛИГИ
  private getIncoterms(kind_id: string) {
    this.requestService.requestIncoterms({kind_id})
      .subscribe(incoterms=>this.incoterms=incoterms as unknown as Incoterms[])
  }

  private getRequestServices(kind_id:string) {
    this.requestService.requestServices({kind_id})
      .subscribe(services=>this.services=services as unknown as RequestServices[]);
    this.requestService.requestServicesAdditional({kind_id})
    .subscribe(servicesAdditionals=>this.servicesAdditionals=servicesAdditionals as unknown as RequestServices[]);

  }

}
