import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject, takeUntil, tap } from 'rxjs';
import { Contractor } from 'src/app/api/custom_models';
import { formatDate } from '@angular/common';
import { ContractorService, DirectionService, RequestService, TransportService } from 'src/app/api/services';
import { TransportCarrier, TransportRoute } from 'src/app/api/custom_models/transport';

@Component({
  selector: 'app-rate-add-customs',
  templateUrl: './rate-add-customs.component.html',
  styleUrls: ['./rate-add-customs.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class RateAddCustoms implements OnInit, OnDestroy {
  @Input() chargesShema?:any;
  @Input() weight?:number;
  @Input() requestId?:number;
  @Input() transportKindId?:number;
  @Input() cityId?:number;
  @Input() rate?:any;


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
  ) {
    this.rateForm = this.fb.group({
      request_id:[this.requestId,[]],
      contractor_id: [,[]],
      carrier_id: [,[]],
      comment: [,[]],
      departure_schedule: [,[]],
      id: [,[]],
      nearest_flight: [[],[]],
      profit_include: [false,[]],
      rate_type: ['detail',[]],
      route_id: [,[]],
      total_cost: [0,[]],
      transit_time: this.fb.group({
        from: [, []],
        to: [, []],
      }),
      values: fb.array([], []),
    });
  }

  // Методы ЖЦ
  ngOnInit(): void {
    this.getTransportCarrier();
    this.getTransportRoute();
    this.getContractor();
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
    this.rateForm.patchValue({request_id: this.requestId});
  }
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
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
  returnAirlineName(id: number): string | undefined {
    const carrier = this.transportCarrier.find((i: TransportCarrier) => id === i.id);
    return carrier ? carrier.name : '';
  }
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
    this.transportService.transportRoute({kind_id:this.transportKindId})
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
        },
        error: (err) => {
          this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }
}
