import { emailValidator, innValidator } from './../../../validators/pattern-validator';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
  selector: 'app-offer-editor',
  templateUrl: './offer-editor.component.html',
  styleUrls: ['./offer-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class OfferEditorComponent implements OnInit, OnDestroy {
  //ПЕРЕМЕННЫЕ
  kpForm!: FormGroup;
  offer!:any;
  offerId!: number;

  customExpansionRow:any={};
  deliveryExpansionRow:any={};
  storageExpansionRow:any={};

  currencyList:any=[];

  customTableRowConfig=[
    {
      title:'',
      width:'100px',
      index:'',
      expansion: this.onExpansionRowClick,
    },
    {
      title:'Air',
      width:'100px',
      index:'carrier_iata',
    },
    {
      title:'Авиалиния',
      width:'100px',
      index:'carrier_name',
    },
    {
      title:'Маршрут',
      width:'100px',
      index:'route_name',
    },
    {
      title:'Расписание',
      width:'100px',
      index:'schedule',
    },
    {
      title:'Есть место',
      width:'100px',
      index:'nearest_flight',
    },
    {
      title:'Срок, дн.',
      width:'100px',
      index:'transit_time',
    },
    {
      title:'Вход',
      width:'100px',
      control:'income_total_cost',
    },
    {
      title:'Профит',
      width:'150px',
      control:'profit_amount',
    },
    {
      title:'%',
      width:'150px',
      control:'profit_percent',
    },
    {
      title:'Ставка',
      width:'150px',
      control:'total_cost',
    },
    {
      title:'',
      width:'100px',
      index:'',
      del: this.onDelRowChange,
    },
  ];

  deliveryTableRowConfig=[
    {
      title:'',
      width:'100px',
      index:'',
      expansion: this.onExpansionRowClick,
    },
    {
      title:'Air',
      width:'100px',
      index:'period',
    },
    {
      title:'Наименование Аэропорта',
      width:'100px',
      index:'point',
    },
    {
      title:'Вид прайса',
      width:'100px',
      index:'point_action',
    },
    {
      title:'Наименование статей затрат',
      width:'100px',
      index:'service_items',
    },
    {
      title:'Вход',
      width:'100px',
      control:'income_total_cost',
    },
    {
      title:'Профит',
      width:'150px',
      control:'profit_amount',
    },
    {
      title:'%',
      width:'150px',
      control:'profit_percent',
    },
    {
      title:'Ставка',
      width:'150px',
      control:'total_cost',
    },
    {
      title:'',
      width:'100px',
      index:'',
      del: this.onDelRowChange,
    },
  ];

  storageTableRowConfig=[
    {
      title:'',
      width:'100px',
      index:'',
      expansion: this.onExpansionRowClick,
    },
    {
      title:'Тип ТС',
      width:'100px',
      index:'carrier_iata',
    },
    {
      title:'Маршрут',
      width:'100px',
      index:'point',
    },
    {
      title:'Срок, дн.',
      width:'100px',
      index:'point_action',
    },
    {
      title:'Вход',
      width:'100px',
      control:'income_total_cost',
    },
    {
      title:'Профит',
      width:'150px',
      control:'profit_amount',
    },
    {
      title:'%',
      width:'150px',
      control:'profit_percent',
    },
    {
      title:'Ставка',
      width:'150px',
      control:'total_cost',
    },
    {
      title:'',
      width:'100px',
      index:'',
      del: this.onDelRowChange,
    },
  ];

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 3000 };

  private _destroy$ = new Subject();

  calckStatus:boolean=false;

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
    private cdr: ChangeDetectorRef
  ) {

  }
  // проблема в рассчетах
  // удаление строк

  ngOnInit(): void {
    const segments = this.route.snapshot.url.map(s => s.path);
    this.offerId = segments[1] as unknown as number ;

    this.kpForm = this.fb.group({
      uid: ['', Validators.required],
      param: this.fb.group({
        custom: this.createParamGroup(),
        storage: this.createParamGroup(),
        delivery: this.createParamGroup()
      }),
      valid: ['', Validators.required],
      status: [0, Validators.required],
      comment: ['']
    });
    this.getOffer();
    this.getCurrency();

    this.kpForm.valueChanges
      .pipe(
        debounceTime(1500),
        distinctUntilChanged(),
        takeUntil(this._destroy$),
      )
      .subscribe((e:any) => {
        if(this.calckStatus) {
          console.log('lalala',e);
          this.getCalckOffer(e)
        } else {
          console.log('no lalala');

        }

      })
    ;
  }
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  setChange(row?:any, bol?: boolean){
    this.calckStatus=true;
    //1 патчу текущую строку
    if(row && bol){
      row.patchValue({
        profit_changed: bol,
      })
    }

    if(row){
      //2 длеаю фолс во всех дугих строках во всех таблицах
      this.customRows.controls.forEach((value, index, array) => {
        if(value!==row) value.patchValue({ profit_changed: false })
      })
      this.storageRows.controls.forEach((value, index, array) => {
        if(value!==row) value.patchValue({ profit_changed: false })
      })
      this.deliveryRows.controls.forEach((value, index, array) => {
        if(value!==row) value.patchValue({ profit_changed: false })
      })
    }

  }
  resetAmount(table:any){
    table.controls['one_profit_amount'].reset();
  }
  resetPercent(table:any){
    table.controls['one_profit_percent'].reset();
  }

  onExpansionRowClick(){

  }
  onDelRowChange(){

  }


  // Form
  createParamGroup(): FormGroup {
    return this.fb.group({
      one_profit: [true],
      one_profit_amount: [0],
      one_profit_amount_currency: [0],
      one_profit_percent: [0],
      detail_items: [true],
      rows: this.fb.array([this.createRow()])
    });
  }
  createRow(): FormGroup {
    return this.fb.group({
      id: [0],
      income_total_cost: [0],
      profit_amount: [0],
      profit_percent: [0],
      total_cost: [0],
      profit_changed: [false],
      services: this.fb.array([this.createService()])
    });
  }
  createService(): FormGroup {
    return this.fb.group({
      cost:[0],
      field: [''],
      profit_amount: [0],
      profit_percent: [0],
      total_cost: [0],
      select: [true]
    });
  }

  //Rows
  get customRows(): FormArray {
    return (this.kpForm.get('param.custom.rows') as FormArray);
  }
  get storageRows(): FormArray {
    return (this.kpForm.get('param.storage.rows') as FormArray);
  }
  get deliveryRows(): FormArray {
    return (this.kpForm.get('param.delivery.rows') as FormArray);
  }
  //Serv
  returnServiceControls(row:any): any {
    return (row.get('services').controls as FormArray);
  }

  //Add row
  // Добавление новой строки в 'rows' для custom
  addCustomRow(): void {
    const newRow = this.createRow();
    this.customRows.push(newRow);
  }
  // Добавление новой строки в 'rows' для storage
  addStorageRow(): void {
    const newRow = this.createRow();
    this.storageRows.push(newRow);
  }
  // Добавление новой строки в 'rows' для delivery
  addDeliveryRow(): void {
    const newRow = this.createRow();
    this.deliveryRows.push(newRow);
  }

  //Add serv
  // Добавление нового сервиса в 'services' внутри строки custom
  addServiceCustom(rowIndex: number): void {
    const row = this.customRows.at(rowIndex); // Получаем нужную строку
    const services = row.get('services') as FormArray;
    const newService = this.createService(); // Создаем новый элемент
    services.push(newService); // Добавляем новый элемент в 'services'
  }
  // Добавление нового сервиса в 'services' внутри строки storage
  addServiceStorage(rowIndex: number): void {
    const row = this.storageRows.at(rowIndex); // Получаем нужную строку
    const services = row.get('services') as FormArray;
    const newService = this.createService(); // Создаем новый элемент
    services.push(newService); // Добавляем новый элемент в 'services'
  }
  // Добавление нового сервиса в 'services' внутри строки delivery
  addServiceDelivery(rowIndex: number): void {
    const row = this.deliveryRows.at(rowIndex); // Получаем нужную строку
    const services = row.get('services') as FormArray;
    const newService = this.createService(); // Создаем новый элемент
    services.push(newService); // Добавляем новый элемент в 'services'
  }

  //REQEUSTS
  onSubmit(): void {
    this.saveOffer();
    if (this.kpForm.valid) {
      console.log(this.kpForm.value);
    } else {
      console.log('Form is invalid',this.kpForm.value);
    }
  }

  saveOffer(){
    this.requestService.requestOfferSave({body:this.kpForm.value}).pipe(
      tap((offer) => {
        console.log(offer);
      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: (offer) => {
        this.snackBar.open(`Кп уцспешно отредактированно`, undefined, this.snackBarWithShortDuration);
      },
      error: (err) => {
        this.snackBar.open(`Ошибка редактирования кп: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  getOffer() {
    this.requestService.requestOfferInfo({id: this.offerId}).pipe(
      tap((offer) => {
        console.log(offer);
        this.calckStatus=false;
        this.fillFormWithData(offer);  // Метод для заполнения формы данными
      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: (offer) => {
        console.log('Data loaded successfully');
        this.offer=offer;
      },
      error: (err) => {
        this.snackBar.open(`Ошибка редактирования запроса: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  getCalckOffer(offer:any) {
    this.requestService.requestOfferCalc({body:offer}).pipe(
      tap((offer) => {
        console.log(offer);
        this.calckStatus=false;
        this.fillFormWithData(offer);  // Метод для заполнения формы данными
      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: (offer) => {
        console.log('Data loaded successfully');

      },
      error: (err) => {
        this.snackBar.open(`Ошибка редактирования запроса: ` + err.error?.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  getCurrency(){
    this.systemService.systemCurrency().pipe(
      tap((currencyList) => {
      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: (currencyList) => {
        this.currencyList=currencyList;
      },
      error: (err) => {
        this.snackBar.open(`Ошибка получения валют: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  fillFormWithData(offer: any): void {
    // Используем patchValue для заполнения формы
    this.kpForm.patchValue({
      uid: offer.uid,
      valid: offer.valid,
      status: offer.status,
      comment: offer.comment
    });
    // Заполняем вложенные объекты в param
    this.kpForm.get('param')?.patchValue({
      custom: offer.param.custom,
      storage: offer.param.storage,
      delivery: offer.param.delivery
    });
    // Заполняем строки в каждом разделе
    this.loadRowsData(this.customRows, offer.param.custom.rows);
    this.loadRowsData(this.storageRows, offer.param.storage.rows);
    this.loadRowsData(this.deliveryRows, offer.param.delivery.rows);
  }

  loadRowsData(rowsArray: FormArray, rowsData: any[]): void {
    // Очищаем текущие строки
    while (rowsArray.length) {
      rowsArray.removeAt(0);
    }
    // Добавляем новые строки на основе данных
    rowsData.forEach((row) => {
      const rowGroup = this.fb.group({
        id: [row.id],
        income_total_cost:[row.income_total_cost],
        profit_percent: [row.profit_percent],
        profit_amount: [row.profit_amount],
        total_cost: [row.total_cost],
        profit_changed: [false],
        services: this.fb.array(row.services.map((service:any) => this.fb.group({
          field: [service.field],
          profit_amount: [service.profit_amount],
          profit_percent: [service.profit_percent],
          select: [service.select],
          cost: [service.cost],
          total_cost: [service.total_cost],
        })))
      });
      rowsArray.push(rowGroup);
    });
  }
}
//АКТУАЛЬНОЕ
  // CHANGERS
  //table
  // onOneProfitCheckboxChecked(table:any){
  //   if(table.value.one_profit){
  //     if(table.value.one_profit_amount){
  //       this.onOneProfitAmountInputChange(table);
  //     } else {
  //       this.onOneProfitPercentInputChange(table);
  //     }
  //   }
  // }
  // onOneProfitAmountInputChange(table:any){
  //   table.controls['one_profit_percent'].reset();
  //   let onePAmount=table.value.one_profit_amount;
  //   console.log(onePAmount);

  //   if(table.value.one_profit){
  //     table.get('rows').controls.forEach((row:any, index:any, array:any) => {
  //       let perc=(onePAmount/row.value.income_total_cost ) * 100;
  //       console.log(perc);
  //       row.patchValue({
  //         profit_percent: perc,
  //         profit_amount: onePAmount,
  //       })
  //       console.log(onePAmount);
  //       row.get('services').controls.forEach((value:any, index:any, array:any) => {
  //         let amount=(value.value.cost/ 100) * perc;
  //         value.patchValue({
  //           profit_percent: perc,
  //           profit_amount: amount,
  //         })
  //       })
  //     })
  //   }
  // }
  // onOneProfitCurrencySelectChange(){

  // }
  // onOneProfitPercentInputChange(table:any){
  //   table.controls['one_profit_amount'].reset();
  //   let onePerc=table.value.one_profit_percent;
  //   if(table.value.one_profit){
  //     table.get('rows').controls.forEach((row:any, index:any, array:any) => {
  //       let onePAmount=(row.value.income_total_cost/ 100) * onePerc;
  //       row.patchValue({
  //         profit_percent: onePerc,
  //         profit_amount: onePAmount,
  //       })
  //       row.get('services').controls.forEach((value:any, index:any, array:any) => {
  //         let amount=(value.value.cost/ 100) * onePerc;
  //         value.patchValue({
  //           profit_percent: onePerc,
  //           profit_amount: amount,
  //         })
  //       })
  //     })
  //   }
  // }
  // //row
  // onExpansionRowClick(i:any){
  //   console.log(i);
  // }
  // onDelRowChange(i:any){
  //   console.log(i);
  // }

  // onProfitRowInputChange(row:any,e?:any){
  //   let perc=(row.value.profit_amount / row.value.income_total_cost) * 100;
  //   row.patchValue({
  //     profit_percent: perc,
  //   })
  //   row.get('services').controls.forEach((value:any, index:any, array:any) => {
  //     let amount=(value.value.cost/ 100) * perc;
  //     value.patchValue({
  //       profit_percent: perc,
  //       profit_amount: amount,
  //     })
  //   })

  // }
  // onPercentRowInputChange(row:any,e?:any){
  //   let perc=row.value.profit_percent;
  //   let amount=(row.value.income_total_cost/ 100) * perc;
  //   row.patchValue({
  //     profit_amount: amount,
  //   })
  //   row.get('services').controls.forEach((value:any, index:any, array:any) => {
  //     let amount=(value.value.cost/ 100) * perc;
  //     value.patchValue({
  //       profit_percent: perc,
  //       profit_amount: amount,
  //     })
  //   })
  // }
  // //services(изменение сервиса должно пересчитать строку)
  // onProfitServicesInputChange(row:any, service:any){
  //   this.calculateServiceUsingProfit(service);
  //   this.updateRow(row);
  // }
  // onPercentServicesInputChange(row:any, service:any){
  //   this.calculateServiceUsingProcent(service);
  //   this.updateRow(row);
  // }
  // onSelectServicesCheckboxChecked(row:any,table:any){
  //   this.updateRow(row);
  // }
  // // CALCULATIOS
  // //calck services
  // calculateServiceUsingProfit(service:any){
  //   let perc:number=this.returnPercent(service.value.profit_amount, service.value.cost);
  //   service.patchValue({
  //     profit_percent: perc,
  //   })
  // }
  // calculateServiceUsingProcent(service:any,rowProcent?:number){
  //   //надо добавить возможность передовать процент строки, что ыб потом весь массив сервисов расчитывать при изменении амоунт или процента в строке
  //   let amount:number=this.returnAmount(service.value.cost, service.value.profit_percent);
  //   service.patchValue({
  //     profit_amount: amount,
  //   })
  // }
  // //update
  // updateRow(row:any){

  // }

  // //calck row
  // calculateRowUsingProfit(){

  // }
  // calculateRowUsingProcent(){

  // }

  // //calck sum, amount and procent
  // returnSum(a:number,b:number):number {
  //   return (Math.round(a*10) + Math.round(b*10)) / 10;
  // }
  // returnPercent(a:number,b:number):number {
  //   return  Number((( a / b) * 100).toFixed(3));
  // }
  // returnAmount(enter:number,procent:number):number {
  //   return  Number((( enter / 100) * procent).toFixed(3));
  // }

//СТАРОЕ
  //return row calck
  // returnEnterRow(row:any){
  //   let enter=0;
  //   row.value.services.forEach((value:any, index:any, array:any) => {
  //     if(value.select){
  //       enter=enter+value.cost;
  //       row.patchValue({
  //         income_total_cost: enter,
  //       })
  //     }
  //   })
  //   // return Math.round(enter);
  //   // return enter.toFixed(2);
  //   return enter;
  // }
  // returnProfitRow(row:any){
  //   let profit=0;
  //   row.value.services.forEach((value:any, index:any, array:any) => {
  //     if(value.select){
  //       profit=profit+value.profit_amount;
  //       row.patchValue({
  //         profit_amount: profit,
  //       })
  //     }
  //   })
  //   // return profit.toFixed(2);
  //   // console.log(1);

  //   // return Math.round(profit);
  //   return profit
  // }
  // returnPercentRow(row:any){
  //   let perc=0;
  //   let enter=0;
  //   let profit=0;
  //   row.value.services.forEach((value:any, index:any, array:any) => {
  //     if(value.select){
  //       profit=profit+value.profit_amount;
  //       enter=enter+value.cost;
  //       perc=(profit / enter) * 100;
  //       // row.patchValue({
  //       //   profit_percent: perc,
  //       // })
  //     }
  //   })
  //   // return perc.toFixed(2);
  //   return perc;
  // }
  // returnRateRow(row:any){
  //   let rate=0;
  //   row.value.services.forEach((value:any, index:any, array:any) => {
  //     if(value.select){
  //       rate=rate+value.profit_amount+value.cost;
  //     }
  //   })
  //   // return rate.toFixed(2);
  //   return rate;
  // }

  //calck
  // calcRowFieldsNotOneProfit(row:any){
  //   let incomeTotalCost=0;
  //   let profitAmount=0;
  //   let profitPercent=0;
  //   row.value.services.forEach((value:any, index:any, array:any) => {
  //     if(value.select){
  //       incomeTotalCost=incomeTotalCost + value.cost;
  //       profitAmount=profitAmount + value.profit_amount;
  //       profitPercent=this.returnPercent(incomeTotalCost,profitAmount);
  //       row.patchValue({
  //         income_total_cost: incomeTotalCost,
  //         profit_amount: profitAmount,
  //         profit_percent: profitPercent,
  //       })
  //     }
  //   })
  // }
  // calcRowFieldsYesOneProfit(row:any,table:any){
  //   let incomeTotalCost=0;
  //   let profitAmount=table.value.one_profit_amount;
  //   let profitPercent=0;
  //   row.value.services.forEach((value:any, index:any, array:any) => {
  //     if(value.select){
  //       incomeTotalCost=incomeTotalCost + value.cost;
  //       profitPercent=this.returnPercent(incomeTotalCost,profitAmount);
  //       row.patchValue({
  //         income_total_cost: incomeTotalCost,
  //         profit_amount: profitAmount,
  //         profit_percent: profitPercent,
  //       })
  //     }
  //   })
  // }

  //return calck


  // returnRowTotalCost(a:any,b:any){
  //   return a+b
  // }
  // returnRowProfitPercent(a:any,b:any){
  //   let cost=a+b
  //   return (b / cost) * 100;
  // }


  // TABLE form fields
  // onOneProfitChange(i:any){
  //   console.log(i.value);
  //   if(i.value.one_profit){
  //     if(i.value.one_profit_amount){
  //       this.onOneProfitAmountTableChange(i);
  //     } else {
  //       this.onOneProfitPercentTableChange(i);
  //     }
  //   }
  // }

  // onOneProfitAmountTableChange(table:any){
  //   console.log(table);

  //   table.controls['one_profit_percent'].reset();
  //   if(table.value.one_profit){
  //     table.get('rows').controls.forEach((value:any, index:any) => {
  //       value.patchValue({
  //         profit_amount: table.value.one_profit_amount,
  //       })
  //       this.onProfitAmountRowChange(value,this.offer?.param.custom.rows[index].income_total_cost)
  //     })
  //   }
  // }

  // onOneProfitAmountCurrencyChange(){
  //   console.log('onOneProfitAmountCurrencyChange');
  // }

  // onOneProfitPercentTableChange(table:any){
  //   console.log(table);
  //   table.controls['one_profit_amount'].reset();
  //   if(table.value.one_profit){
  //     table.get('rows').controls.forEach((value:any, index:any) => {
  //       value.patchValue({
  //         profit_percent: table.value.one_profit_percent,
  //       })
  //       this.onProfitPercentRowChange(value,this.offer?.param.custom.rows[index].income_total_cost)
  //     })
  //   }
  // }
  // ROW form fields
  // onProfitAmountRowChange(control:any, count:number){
  //   let per = (control.value.profit_amount / count) * 100;
  //   control.patchValue({
  //     profit_percent: per,

  //   })

  //   control.get('services').controls.forEach((serv:any) => {
  //     if(serv.value.select){
  //       let serAmo = (serv.value.cost/100) * per
  //       serv.patchValue({
  //         profit_percent: per,
  //         profit_amount: serAmo,
  //       })
  //     }
  //   })

  // }
  // onProfitPercentRowChange(control:any, count:number){
  //   let amount= (count/100) * control.value.profit_percent;
  //   control.patchValue({
  //     profit_amount: amount,

  //   })
  //   let per=control.value.profit_percent

  //   control.get('services').controls.forEach((serv:any) => {
  //     if(serv.value.select){
  //       let serAmo = (serv.value.cost/100) * per
  //       serv.patchValue({
  //         profit_percent: per,
  //         profit_amount: serAmo,
  //       })
  //     }
  //   })

  // }
  // SERVICE form fields
  // onProfitAmountServicesChange(control:any, row:any,count:number){
  //   let per = (control.value.profit_amount / control.value.cost) * 100;
  //   control.patchValue({
  //     profit_percent: per,
  //   })
  //   let sum=0;
  //   row.get('services').controls.forEach((serv:any) => {
  //     if(serv.value.select){
  //       sum=sum+serv.value.profit_amount;
  //       let perRow = (sum / count) * 100;
  //       row.patchValue({
  //         profit_percent: perRow,
  //         profit_amount: sum,
  //       })
  //     }
  //   })
  // }

  // onProfitPercentServicesChange(control:any, row:any, count:number){
  //   let amount= (control.value.cost/100) * control.value.profit_percent;
  //   control.patchValue({
  //     profit_amount: amount,
  //   })
  //   let sum=0;
  //   row.get('services').controls.forEach((serv:any) => {
  //     if(serv.value.select){
  //       sum=sum+serv.value.profit_amount;
  //       let perRow = (sum/ count) * 100;
  //       row.patchValue({
  //         profit_percent: perRow,
  //         profit_amount: sum,
  //       })
  //     }
  //   })
  // }


// customTableConfig:any={
  //   colList:['det','data','form'],
  //   columns:[{
  //     colName: 'det',
  //     data:[
  //       {field: 'carrier_iata', title: '№', width: 20}
  //     ]
  //   },
  //   {
  //     colName: 'data',
  //     data:[
  //       {field: 'carrier_iata', title: 'Air', width: 20},
  //       {field: 'carrier_name', title: 'Авиалиния', width: 20},
  //       {field: 'route_name', title: 'Маршрут', width: 20},
  //       {field: 'schedule', title: 'Расписание', width: 20},
  //       {field: 'nearest_flight', title: 'Есть место', width: 20},
  //       {field: 'transit_time', title: 'Срок, дн.', width: 20},
  //     ]
  //   },
  //   {
  //     colName: 'form',
  //     data:[
  //       {field: 'total_cost', title: 'Вход', width: 20},
  //       {field: 'id', title: 'Профит', width: 20},
  //       {field: 'id', title: '%', width: 20},
  //       {field: 'income_total_cost', title: 'Ставка', width: 20},
  //     ]
  //   },]
  // }
