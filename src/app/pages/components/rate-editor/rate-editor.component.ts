import { Country } from '../../../api/custom_models/country';
import { Contact, responsibilityDirections } from '../../../api/custom_models';
import { FormBuilder, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, ValidationErrors, Validator, NG_VALIDATORS, FormArray, FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { unknownCountry } from 'src/app/constants';
import { CargoPackage } from 'src/app/api/custom_models/cargo';
import { CargoService, ContractorService, DirectionService, TransportService } from 'src/app/api/services';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TransportCarrier, TransportRoute } from 'src/app/api/custom_models/transport';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-rate-editor',
  templateUrl: './rate-editor.component.html',
  // styleUrls: ['./rate-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RateEditorComponent
    },
    {
      provide: NG_VALIDATORS,
      useExisting: RateEditorComponent,
      multi: true,
    },
  ]
})
export class RateEditorComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor, Validator {
  @Input() requestKindId!:number;
  @Input() rates?:any;
  @Input() currentRateNumber?:number;
  @Input() chargeModel?:any;
  @Input() weight?:number;
  @Input() request?:any;

  @Output() removeRate = new EventEmitter<void>();
  @Output() addRate = new EventEmitter<void>();
  @Output() indexRateChange = new EventEmitter<Number>();
  @Output() duplicateRate = new EventEmitter<void>();

  onChange = (value: Partial<any>) => { };
  onTouched = () => { };
  private touched = false;

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 4000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 8000 };

  private _destroy$ = new Subject();
  rateForm: FormGroup;
  transportCarrier: TransportCarrier[]=[];
  transportRoute: any[]=[];
  contractorList:any[]=[];

  daysOfTheWeek=[
    { day:'Monday', id:1, date_id:1 },
    { day:'Tuesday', id:2, date_id:2 },
    { day:'Wednesday', id:3, date_id:3 },
    { day:'Thursday', id:4, date_id:4 },
    { day:'Friday', id:5, date_id:5 },
    { day:'Saturday', id:6, date_id:6 },
    { day:'Sunday', id:7, date_id:0 },
  ]

  @ViewChild('deleteRateDialogRef') deleteRateDialogRef?: TemplateRef<void>;

  constructor(
    private fb: FormBuilder,
    private transportService: TransportService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private contractorService: ContractorService,
    private directionService: DirectionService,
  ) {
    this.rateForm = this.fb.group({
      carrier_id: [,[]],
      comment: [,[]],
      departure_schedule: [[],[]],
      id: [,[]],
      nearest_flight: [[],[]],
      num: [,[]],
      profit_include: [true,[]],
      rate_type: ['nodetail',[]],
      // route_id: [,[]],
      route_name: ['',[]],
      total_cost: [,[]],
      transit_time: this.fb.group({
        transit_time_from: [, []],
        transit_time_to: [, []],
      }),
      values: fb.array([
        // this.fb.group({
        //   comment: [,[]],
        //   cost: [,[]],
        //   field: [,[]],
        //   fix: [,[]],
        //   min: [,[]],
        //   price: [,[]],
        //   select: [,[]],
        //   value: [,[]],
        // })
      ], []),
    });
  }

  // Методы ЖЦ
  ngOnInit(): void {
    this.getTransportCarrier();
    this.getTransportRoute();

    this.chargeModel.forEach((i:any)=>{
      this.charges.push(this.fb.group({
        comment: [,[]],
        cost: [,[]],
        field: [i.field_name,[]],
        fix: [,[]],
        min: [,[]],
        price: [,[]],
        select: [i.status,[]],
        value: [i.unit==='kg'?this.weight:0,[]],
      }));
      this.rateForm.markAsTouched();
    });

    this.rateForm.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      this.onChange(value)
    });
    this.rateForm.statusChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      if (!this.touched) {
        this.onTouched();
        this.touched = true;
      }
    });
    this.rateForm.markAsTouched();
  }
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.rateForm.value.rate_type==='detail') this.calckTotalCost();
  }

  // ControlValueAccessor
  writeValue(contact: any): void {
    this.rateForm.patchValue(contact);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  validate(control: AbstractControl): ValidationErrors | null {
    return control.value && this.rateForm.valid ? null : { contact: true };
  }

  // Rates
  onDeleteRate(): void {
    if (!this.deleteRateDialogRef) { return }
    this.dialog.open(this.deleteRateDialogRef)
      .afterClosed()
      .subscribe(res => {
        if (res) { this.removeRate.emit() }
    });
  }
  onAddRate(): void {
    this.addRate.emit();
  }
  onChangeRate(i:number): void {
    this.indexRateChange.emit(i);
  }
  onDuplicateRate(): void {
    this.duplicateRate.emit();
  }

  // Charges
  addCharge() {
    this.charges.push(this.fb.group({
      comment: [,[]],
      cost: [,[]],
      field: [,[]],
      fix: [,[]],
      min: [,[]],
      price: [,[]],
      select: [false,[]],
      value: [,[]],
    }));
    this.rateForm.markAsTouched();
  }
  get charges() {
    return <FormArray>this.rateForm.get('values');
  }

  // Публичные методы


  onRouteChange(route:any){
    this.rateForm.patchValue({
      // route_id: route.id,
      // route_name: route.name,
      transit_time: {
        transit_time_from: route.days_min,
        transit_time_to: route.days_max,
      },
    });
  }
  filterRote(){
    const filterRoute=this.transportRoute?.filter((option:any) => option.name.toLowerCase().replaceAll(' ', '').includes(this.rateForm.value.route_name.toLowerCase().replaceAll(' ', '')));
    return filterRoute.length==0
    ? []
    : filterRoute
  }


  returnAirlineName(id:number):string{
    let name:any='';
    this.transportCarrier.forEach((i:TransportCarrier)=>{
      if(id==i.id){ name=i.name };
    });
    return name;
  }
  returnAirlineIata(id:number):string{
    let name:any='';
    this.transportCarrier.forEach((i:TransportCarrier)=>{
      if(id==i.id){ name=i.iata };
    });
    return id===undefined?' ? ':name
  }
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
  //Calck
  calck(control:any){
    if(control.value.min){
      control.patchValue({
        cost: control.value.min<control.value.price * control.value.value?control.value.price * control.value.value:control.value.min
      });
    } else if(control.value.fix) {
      control.patchValue({cost: (control.value.price * control.value.value)+control.value.fix});
    } else {
      control.patchValue({cost: control.value.price * control.value.value});
    }
  }
  calckCost(control:any){
    control.patchValue({
      value: control.value.cost,
      price: 1,
    });
  }
  calckTotalCost(){
    let cost=0;
    this.rateForm.value.values.forEach((v:any)=>{
      if(v.select)cost=cost+v.cost
    });
    this.rateForm.patchValue({ total_cost:cost });
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
    // const dayOfWeek = new Date(event).getDay(); // 0 - воскресенье, 1 - понедельник, 2 - вторник, и т.д.
    // if (dayOfWeek === 2) { // 2 - вторник
    //   return "disabled-date"; // Класс для недоступных дат
    // }

    const date=formatDate(event,'yyyy-MM-dd','en-US');
    return this.rateForm.value.nearest_flight?.find((x:any) => x == date) ? "selected" : '';
  }
  selectDate(event: any, calendar: any) {
    console.log(event,calendar);
    const date=formatDate(event,'yyyy-MM-dd','en-US');
    if(this.rateForm.value.nearest_flight===null) this.rateForm.value.nearest_flight=[];
    const index = this.rateForm.value.nearest_flight.findIndex((x:any) => x == date);
    if (index < 0) {
      this.rateForm.value.nearest_flight.push(date);
      const dayOfWeek=new Date(event).getDay();
      // const istestDate=!this.rateForm.value.departure_schedule?.find((x:any) => x == dayOfWeek)
      const istestDate=this.rateForm.value.departure_schedule?.find((x:any) =>{
        if(dayOfWeek==0&&x==7){
          x=0;
          return x == dayOfWeek;
        } else {
          return x == dayOfWeek;
        }
      })
      // const istestDate=dayOfWeek!=0
      //   ?this.rateForm.value.departure_schedule?.find((x:any) => x == dayOfWeek)
      //   :this.rateForm.value.departure_schedule?.find((x:any) => 0 == dayOfWeek)
      if(!istestDate){
        this.snackBar.open(
          `Выбранная дата не соответсвтвует дням недели`,
          undefined,
          {
            duration: 2000,
            verticalPosition: 'top', // Позиционирование по вертикали
            horizontalPosition: 'center', // Позиционирование по горизонтали
            panelClass: ['centered-snackbar'] // Кастомный класс для стилизации
          }
        );
      }
    } else {
      this.rateForm.value.nearest_flight.splice(index, 1);
    }
    calendar.updateTodaysDate();
  }

  // Приватные методы
  // получаем перевозчиков(airline and airline iata controls)
  private getTransportCarrier():void{
    this.transportService.transportCarrier({kind_id:this.requestKindId})
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
          this.snackBar.open(`${err.error.error_message}: ` + err.error.error_message_description, undefined, this.snackBarWithShortDuration);
        }
      });
  }
  // получаем маршруты(route)
  private getTransportRoute():void{
      this.directionService.directionRoute({kind_id: this.requestKindId, arrival_city_id:this.request.arrival_city_id,departure_country_id:this.request.departure_country_id })
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
            this.snackBar.open(`${err.error.error_message}: ` + err.error.error_message_description, undefined, this.snackBarWithShortDuration);
          }
        });
    }
  // private getTransportRoute():void{
  //   this.transportService.transportRoute({kind_id:this.requestKindId})
  //     .pipe(
  //       tap(transportRoute => {
  //         if (!transportRoute) {
  //           throw ({ error: { error_message: `Маршрутов не существует`} });
  //         }
  //       }),
  //       takeUntil(this._destroy$),
  //     )
  //     .subscribe({
  //       next: (transportRoute) => {
  //         this.transportRoute=transportRoute;
  //       },
  //       error: (err) => {
  //         this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
  //       }
  //     });
  // }

  //получаем контракторов
    // private getContractor():void{
    //   this.contractorService.contractorList()
    //     .pipe(
    //       tap(contractor => {
    //         console.log(contractor);

    //         if (!contractor) {
    //           throw ({ error: { error_message: `Маршрутов не существует`} });
    //         }
    //       }),
    //       takeUntil(this._destroy$),
    //     )
    //     .subscribe({
    //       next: (contractor) => {
    //         this.contractorList=contractor.items;
    //         if(this.rate){
    //           this.setContractorName(this.rate.contractor_id);
    //         }

    //       },
    //       error: (err) => {
    //         this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
    //       }
    //     });
    // }
}
