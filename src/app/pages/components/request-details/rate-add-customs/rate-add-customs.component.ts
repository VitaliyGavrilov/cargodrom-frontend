import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { Subject, takeUntil, tap, debounceTime, distinctUntilChanged } from 'rxjs';
import { Contractor } from 'src/app/api/custom_models';
import { formatDate } from '@angular/common';
import { ContractorService, DirectionService, RequestService, SystemService, TransportService } from 'src/app/api/services';
import { TransportCarrier, TransportRoute } from 'src/app/api/custom_models/transport';

@Component({
  selector: 'app-rate-add-customs',
  templateUrl: './rate-add-customs.component.html',
  styleUrls: ['./rate-add-customs.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class RateAddCustoms implements OnInit, OnDestroy {
  // @Input() chargesShema?:any;
  @Input() weight?:number;
  @Input() requestId!:number;
  @Input() transportKindId:number=0;
  @Input() cityId?:number;
  @Input() cityIdDep?:number;
  @Input() rate?:any;
  @Output() closeDialog = new EventEmitter<void>();

  currencyList:any=[];


  chargesShema:any;
  currencyShema:any;

  rateForm: FormGroup;
  private _destroy$ = new Subject();
  contractorList:any=[];
  // pointList:any=[];
  // pointActionList:any=[];

  transportCarrier: TransportCarrier[]=[];
  transportRoute: TransportRoute[]=[];

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 3000 };

  weekDayList=[
    { day:'Monday', id:1 },
    { day:'Tuesday', id:2 },
    { day:'Wednesday', id:3 },
    { day:'Thursday', id:4 },
    { day:'Friday', id:5 },
    { day:'Saturday', id:6 },
    { day:'Sunday', id:7 },
  ]

  rateTypeOptions = [
    { value: 'detail', label: 'With Details' },
    { value: 'nodetail', label: 'With single Amount' }
  ];


  constructor(
    private fb: FormBuilder,
    private transportService: TransportService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private contractorService: ContractorService,
    private requestService: RequestService,
    private directionService: DirectionService,
    private systemService: SystemService,
  ) {
    this.rateForm = this.fb.group({
      request_id:[this.requestId,[]],
      contractor_id: [,[]],
      contractor_name: ['',[]],
      // carrier_id: [,[]],
      carrier_name: [,[]],
      carrier_desc: [,[]],
      comment: [,[]],
      departure_schedule: [,[]],
      id: [,[]],
      nearest_flight: [[],[]],
      profit_include: [false,[]],
      rate_type: ['detail',[]],
      // route_id: [,[]],
      route_name:['',[]],
      total_cost: [0,[]],
      transit_time: this.fb.group({
        from: [, []],
        to: [, []],
      }),
      currency: [0,[]],
      values: fb.array([], []),
    });
  }

  get requestChar(){
    const i = this.currencyList.find((r:any) => r.id === this.rateForm.value.currency);
    return i?.char?i.char:'?';
  }
  
  setContractorName(contractor_id:number) {
    const contractor = this.contractorList.find((r:any) => r.id === contractor_id);
    this.rateForm.patchValue({
      contractor_name: contractor ? contractor.name : '',
    });
  }

  onContratorChange(contractor:any){
    this.rateForm.patchValue({
      contractor_id: contractor.id,
      currency: contractor.currency
      // contractor_name: contractor.name,
    });
  }

  onRouteChange(route:any){
    this.rateForm.patchValue({
      // route_id: route.id,
      // route_name: route.name,
      transit_time: {
        from: route.days_min,
        to: route.days_max,
      },
    });
  }

  onCancelBtnClick(){
    this.closeForm()
  }
  closeForm(){
    this.closeDialog.emit();
  }

  // Методы ЖЦ
  ngOnInit(): void {
    this.getChargesShema();
    this.getTransportCarrier();
    this.getTransportRoute();
    this.getContractor();
    this.getCurrency();
    // this.chargesShema.forEach((i:any)=>{
    //   this.charges.push(this.fb.group({
    //     comment: [,[]],
    //     cost: [,[]],
    //     field: [i.field_name,[]],
    //     fix: [,[]],
    //     min: [,[]],
    //     price: [,[]],
    //     select: [i.checked,[]],
    //     // select:[i.checked,{disabled: i.checked},[]],
    //     value: [i.unit==='kg'?Math.ceil(this.weight!):1,[]],
    //   }));
    //   this.rateForm.markAsTouched();
    // });
    // if(this.rate){
    //   console.log('this edit mode', this.rate);
    //   this.rateForm.patchValue(this.rate);
    // }
    this.rateForm.patchValue({request_id: this.requestId});

    // this.rateForm.controls['route_name'].valueChanges
    //   .pipe(
    //     debounceTime(1500),
    //     distinctUntilChanged(),
    //     takeUntil(this._destroy$),
    //   )
    //   .subscribe((e:any) => {
    //     console.log('sub route name');

    //   })
    // ;
  }
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  filterRote(){
    const filterRoute=this.transportRoute.filter((option:any) => option.name.toLowerCase().replaceAll(' ', '').includes(this.rateForm.value.route_name.toLowerCase().replaceAll(' ', '')));
    return filterRoute.length==0
    ? []
    : filterRoute
  }
  filterContractor(){
    const filterContractor=this.contractorList.filter((option:any) => option.name.toLowerCase().replaceAll(' ', '').includes(this.rateForm.value.contractor_name.toLowerCase().replaceAll(' ', '')));
    return filterContractor;
  }
  filterIata(){
    const filterIata=this.transportCarrier?.filter((option:any) => option.iata.toLowerCase().replaceAll(' ', '').includes(this.rateForm.value.carrier_name?.toLowerCase().replaceAll(' ', '')));
    return filterIata.length==0
    ? []
    : filterIata
  }

  // Charges
  get charges() {
    return <FormArray>this.rateForm.get('values');
  }

  //caclk
  calckChargeCost(control:any){
    if(control.value.min){
      control.patchValue({
        cost:
          control.value.min<control.value.price * control.value.value?
          control.value.price * control.value.value : control.value.min});
    } else {
      control.patchValue({cost: control.value.price * control.value.value});
    }
    this.calckRateCost();
  }
  calckRateCost(){
    let cost:number=0;
    this.rateForm.value.values.forEach((v:any)=>{
      if(v.select)cost=cost + v.cost
    });
    this.rateForm.patchValue({ total_cost:cost });
  }
  calckCommentChargePrice(control:any){
    control.patchValue({price: control.value.cost/1});
    this.calckRateCost();
  }
  //rate type
  onRateTypeChange(){
    this.charges.controls.forEach((e:any)=>{
      e.controls['comment'].reset();
      e.controls['cost'].reset();
      e.controls['fix'].reset();
      e.controls['min'].reset();
      e.controls['price'].reset();
    })
    this.rateForm.controls['total_cost'].reset();
  }
  // Datepicker multy
  returnSelectDateText(){
    let text='';
    let dateOnj:any=[];
    this.rateForm.value.nearest_flight?.forEach((e:any)=>{
      const date = new Date(e);
      const dateTest ={
        day: date.toLocaleString('en-US', { day: 'numeric' }),
        mount: date.toLocaleString('en-US', { month: 'short' }),
        date: e,
      }
      dateOnj?.push(dateTest);
    })
    const sortedArray=dateOnj.sort((a:any, b:any) => new Date(a.date) > new Date(b.date)? 1 : -1);
    sortedArray?.forEach((i:any,index:number)=>{
      let ind=index+1;
      if(sortedArray[ind]?.mount===i.mount){
        text= text + i.day + ',';
      } else {
        text= text + i.day + ' ' + i.mount + (sortedArray.length==ind?'':', ');
      }
    });
    return text;
  }
  isSelectedDate = (event: any) => {
    const date=formatDate(event,'yyyy-MM-dd','en-US');
    return this.rateForm.value.nearest_flight?.find((x:any) => x == date) ? "selected" : '';
  }
  selectDate(event: any, calendar: any) {
    const date=formatDate(event,'yyyy-MM-dd','en-US');
    if(this.rateForm.value.nearest_flight===null) this.rateForm.value.nearest_flight=[];
    const index = this.rateForm.value.nearest_flight.findIndex((x:any) => x == date);
    if (index < 0) {
      this.rateForm.value.nearest_flight.push(date);
    } else {
      this.rateForm.value.nearest_flight.splice(index, 1);
    }
    calendar.updateTodaysDate();
  }
  //airline
  returnAirlineName(iata:string):string{
    let name:any='';
    this.transportCarrier.forEach((i:TransportCarrier)=>{
      if(iata?.toLowerCase()==i.iata?.toLowerCase()){ name=i.name };
    });
    return name;
  }
  // returnAirlineName(id: number): string | undefined {
  //   const carrier = this.transportCarrier.find((i: TransportCarrier) => id === i.id);
  //   return carrier ? carrier.name : '';
  // }
  // returnAirlineName(id:number):string{
  //   let name:any='';
  //   this.transportCarrier.forEach((i:TransportCarrier)=>{
  //     if(id==i.id){ name=i.name };
  //   });
  //   return name;
  // }
  // Приватные методы
  // получаем перевозчиков(airline and airline iata controls)
  private getTransportCarrier():void{
    this.transportService.transportCarrier({kind_id:this.transportKindId})
      .pipe(
        tap(transportCarrier => {
          if (!transportCarrier) {
            throw ({ error: { error_message: `Перевозчиков не существует`} });
          }
        }),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (transportCarrier) => {
          this.transportCarrier=transportCarrier;
        },
        error: (err) => {
          this.snackBar.open(`Ошибка запроса перевозчиков: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }
  // получаем маршруты(route)
  private getTransportRoute():void{
    this.directionService.directionRoute({kind_id:this.transportKindId, arrival_city_id:this.cityId, departure_country_id:this.cityIdDep})
      .pipe(
        tap(transportRoute => {
          if (!transportRoute) {
            throw ({ error: { error_message: `Маршрутов не существует`} });
          }
        }),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (transportRoute) => {
          this.transportRoute=transportRoute;
        },
        error: (err) => {
          this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }
  //получаем контракторов
  private getContractor():void{
    this.contractorService.contractorList()
      .pipe(
        tap(contractor => {
          console.log(contractor);

          if (!contractor) {
            throw ({ error: { error_message: `Маршрутов не существует`} });
          }
        }),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (contractor) => {
          this.contractorList=contractor.items;
          if(this.rate){
            this.setContractorName(this.rate.contractor_id);
          }

        },
        error: (err) => {
          this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }
  //сохраняем ставку
  rateSave():void{
    console.log(this.rateForm.value);
    this.requestService.requestRateCustomsSave({body:this.rateForm.value})
      .pipe(
        tap(contractor => {
          console.log(contractor);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (contractor) => {
          this.closeForm();
          this.snackBar.open(!this.rate?'Ставка успешно создана':'Ставка успешно изменена', undefined, this.snackBarWithShortDuration);
        },
        error: (err) => {
          this.snackBar.open(!this.rate?'Ошибка создания ставки:':'Ошибка изменения ставки:' + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }
  //
  getChargesShema():void{
    this.requestService.requestRateFormParam({request_id:this.requestId,method:'customs'})
      .pipe(
        tap(schema => {
          console.log(schema);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (schema) => {
          this.chargesShema=schema.charges;
          this.currencyShema=schema.currency;
          this.chargesShema.forEach((i:any)=>{
            this.charges.push(this.fb.group({
              comment: [,[]],
              cost: [,[]],
              field: [i.field_name,[]],
              fix: [,[]],
              min: [,[]],
              price: [,[]],
              select: [i.checked,[]],
              // select:[i.checked,{disabled: i.checked},[]],
              value: [i.unit==='kg'?Math.ceil(this.weight!):1,[]],
            }));
            this.rateForm.markAsTouched();
          });
          if(this.rate){
            console.log('this edit mode', this.rate);
            this.rateForm.patchValue(this.rate);

          }
        },
        error: (err) => {
          this.snackBar.open('Ошибка получения схемы:' + err.error.error_message, undefined, this.snackBarWithShortDuration);
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
        this.currencyList=currencyList.current;
      },
      error: (err) => {
        this.snackBar.open(`Ошибка получения валют: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }
}


