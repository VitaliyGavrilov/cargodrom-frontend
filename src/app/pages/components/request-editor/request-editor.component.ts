import { emailValidator, innValidator } from './../../../validators/pattern-validator';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { ContractorService } from './../../../api/services/contractor.service';
import { City, Client, ClientGroup, Contractor, ContractorRequestFormat, Country, Employee, FileDocument, TaxSystem } from 'src/app/api/custom_models';
import { CargoService, CompanyService, CustomerService, DirectionService, RequestService, SystemService, TransportService } from 'src/app/api/services';
import { Editor } from 'src/app/classes/editor';
import { Location } from '@angular/common';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { byField } from 'src/app/constants';
import { FileListComponent } from '../file-list/file-list.component';
import { TransportSubKind } from 'src/app/api/custom_models/transport';
import { RequestFormat } from 'src/app/api/custom_models/request';
import { CargoPackage, CargoType } from 'src/app/api/custom_models/cargo';
import { DirectionFlight, DirectionPoint } from 'src/app/api/custom_models/direction';

@Component({
  selector: 'app-request-editor',
  templateUrl: './request-editor.component.html',
  styleUrls: ['./request-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class RequestEditorComponent implements OnInit {
  //грубо говоря это стейт переменные
  title = ''
  isEditMode: boolean = false;
  requestForm: FormGroup;
  contractors: Contractor[] = [];
  requestFormats: RequestFormat[] = [];
  transportationFormats: TaxSystem[] = [];
  currentTransportationFormat:string=''; //переменная для хранения вида перевозки
  transportFormats: TaxSystem[] = [];
  cargoPackages: CargoPackage[]=[];
  cargoTypes: CargoType[]=[];
  departureCountrys: Country[]=[];
  departureCitys: City[]=[];
  departurePoint: DirectionPoint[] = [];
  directionFlights: DirectionFlight[]=[];
  //конструктор
  constructor(
    private fb: FormBuilder,
    private contractorService: ContractorService,
    private transportService: TransportService,
    private requestService: RequestService,
    private cargoService: CargoService,
    private directionService: DirectionService,
    private countryService: CountryService,
    private cityService: CityService

  ) {
    this.requestForm = this.fb.group({
      //ОСНОВА
      contractor_id: ['', [Validators.required]],
      request_format_id: ['', [Validators.required]],
      transportation_format_id: ['', [Validators.required]],
      transport_format_id: ['', [Validators.required]],
      //ОПИСАНИЕ ГРУЗА
      cargo_description: ['', [Validators.required]],
      cargo_package_id: ['', [Validators.required]],
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

    });
  }
  //инициализация компонента
  ngOnInit(): void {
    this.title = this.isEditMode ? 'Информация о запросе' : 'Добавление запроса';
    this.getContractors()
    this.getRequestFormats()
    this.getTransportationFormats()
    this.getСargoPackages()
    this.getDirectionFlight()
    this.getCountries()

  }
  // Публичные методы:
  //сохранение данных
  save(): void {
    console.log('Нажата кнопка сохранить')
  }
  //отмена данных
  remove():void {
    console.log('Нажата кнопка отмена')
  }
  //защита инпута видов транспорта, доступ только после заполнения инпута видов перевозки
  onTransportationFormatsChange(id: string) {
    this.requestForm.controls['transport_format_id'].reset(undefined);
    this.requestForm.controls['departure_point_id'].reset(undefined);
    this.getTransportFormats(id);
    this.currentTransportationFormat=id//запоминаем текущий вид перевозки
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
      .subscribe(cargoPackages => this.cargoPackages = cargoPackages as unknown as CargoPackage[])
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

}
