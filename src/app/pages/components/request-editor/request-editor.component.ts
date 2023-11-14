import { emailValidator, innValidator } from './../../../validators/pattern-validator';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { ContractorService } from './../../../api/services/contractor.service';
import { City, Client, ClientGroup, Contractor, ContractorRequestFormat, Country, Employee, FileDocument, TaxSystem } from 'src/app/api/custom_models';
import { CompanyService, CustomerService, RequestService, SystemService, TransportService } from 'src/app/api/services';
import { Editor } from 'src/app/classes/editor';
import { Location } from '@angular/common';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { byField } from 'src/app/constants';
import { FileListComponent } from '../file-list/file-list.component';
import { TransportSubKind } from 'src/app/api/custom_models/transport';
import { VitRequestService } from 'src/app/api/services/tests-vit/request-test.service';
import { RequestFormat } from 'src/app/api/custom_models/request';

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
  transportationFormats: TaxSystem[] = []
  transportFormats: TaxSystem[] = []
  //конструктор
  constructor(
    private fb: FormBuilder,
    private contractorService: ContractorService,
    private transportService: TransportService,
    private requestService: RequestService,

  ) {
    this.requestForm = this.fb.group({
      contractor_id: ['', [Validators.required]],
      request_format_id: ['', [Validators.required]],
      transportation_format_id: ['', [Validators.required]],
      transport_format_id: ['', [Validators.required]],

    });
  }
  //инициализация компонента
  ngOnInit(): void {
    this.title = this.isEditMode ? 'Информация о запросе' : 'Добавление запроса';
    this.getContractors()
    this.getRequestFormats()
    this.getTransportationFormats()

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
    this.getTransportFormats(id);
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

}
