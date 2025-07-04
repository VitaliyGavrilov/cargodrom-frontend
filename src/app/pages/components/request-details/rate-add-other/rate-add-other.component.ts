import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { count, forkJoin, Subject, takeUntil, tap } from 'rxjs';
import { Contractor } from 'src/app/api/custom_models';
import { ContractorService, DirectionService, RequestService, SystemService, TransportService } from 'src/app/api/services';

@Component({
  selector: 'app-rate-add-other',
  templateUrl: './rate-add-other.component.html',
  styleUrls: ['./rate-add-other.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class RateAddOther implements OnInit, OnDestroy {

  @Input() currentRequest?:any;
  @Input() rate?:any;
  @Output() closeDialog = new EventEmitter<void>();

  fields:string[] = [
    'Наименнование услуги',
    'Подрядчик',
    'Город',
    'Вид прайса',
    'Стоимость',
    'Валюта',
    'Ед.Изм.',
    'Итого'
  ];
  weight:any;

  rateForm: FormGroup;
  chargesShema:any;

  contractorList:any=[];
  pointList:any=[];
  pointActionList:any=[];
  currencyList:any=[];

  private _destroy$ = new Subject();

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 3000 };

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
      id:[,[]],
      request_id: [,[]],
      comment: [,[]],
      values: fb.array([], []),
    });
  }
  // Методы ЖЦ
  ngOnInit(): void {
    this.weight=this.currentRequest.cargo_places_paid_weight;
    this.initialization_getAllData();
    // this.getChargesShema();
    // this.getContractor();
    // this.getArrivalPoinst();
    // this.getPointAction();
    // this.getCurrency();
  }
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  initialization_getAllData(): void {
    forkJoin({
      charges: this.requestService.requestRateFormParam({request_id:this.currentRequest.id, method:'other'}),
      contractors: this.contractorService.contractorList(),
      poinst: this.directionService.directionCity({ country_id:this.currentRequest.arrival_country_id }),
      prices: this.transportService.transportPointAction({direction:'arrival'}),
      currencys: this.systemService.systemCurrency(),
    }).pipe(
      tap(schema => {
        console.log(schema);
      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: (datas) => {
      // next: ({ charges, contractors, poinst, prices, currencys }) => {
        this.processData(datas);
      },
      error: (err) => {
        this.snackBar.open(`Ошибка загрузки данных: ${err.message}`, 'Закрыть');
      }
    });
  }

  processData(datas:any){
    this.contractorList = datas.contractors.items;
    this.pointList = datas.poinst;
    this.pointActionList = datas.prices;
    this.currencyList = datas.currencys.current;
    this.processData_charges(datas.charges);
  }
  processData_charges(charges:any){
    this.chargesShema=charges.charges;
    this.chargesShema.forEach((i:any)=>{
      this.charges.push(this.fb.group({
        field: [i.field_name,[]],
        price: [,[]],
        count: [
          i.multiplier==='percent_of_cargo_cost'
            ? Math.ceil(this.currentRequest.cargo_cost)
            : 1
        ,[]],
        comment: [,[]],
        select: [i.checked,[]],
        contractor_id: [,[]],
        point_action_id: [,[]],
        city_id: [,[]],
        currency: [,[]],

        title: [i.title,[]],
        cost: [,[]],
        multiplier:i.multiplier==='percent_of_cargo_cost'?true:false,
        multiplier_name:i.multiplier_name,
      }));
      // this.rateForm.markAsTouched();
    });
    this.rateForm.patchValue({request_id: this.currentRequest.id});
    if(this.rate){
      console.log('this edit mode', this.rate);
      this.rateForm.patchValue(this.rate);
    }
  }

  filteredContractors(form:any){
    let arr;
    if(typeof form.value.contractor_id==='string' && form.value.contractor_id!=''){
      arr = this.contractorList.filter((item: any) => {
        return item.name && item.name.toLowerCase().includes(form.value.contractor_id.toLowerCase());
      });
    }
    return arr;
  }
  filteredCitys(form:any){
    let arr;
    if(typeof form.value.city_id==='string' && form.value.city_id!=''){
      arr = this.pointList.filter((item: any) => {
        return item.name && item.name.toLowerCase().includes(form.value.city_id.toLowerCase());
      });
    }
    return arr;
  }

  get requestChar(){
    const i = this.currencyList.find((r:any) => r.id === this.currentRequest.cargo_currency_id);
    return i?.char;
  }
  returnRateChar(form:any){
    if(!form.value.currency){
      return'?'
    }
    const i = this.currencyList.find((r:any) => r.id === form.value.currency);
    return i?.char;
  }

  displayFn_contractor(id: any): string {
    if (!this.contractorList) return '';
    const obj = this.contractorList.find((obj:any) => obj.id === id);
    return obj?.name || '';
  }
  displayFn_city(id: any): string {
    if (!this.pointList) return '';
    const obj = this.pointList.find((obj:any) => obj.id === id);
    return obj?.name || '';
  }

  returnRateCost(){
    let cost:number=0;
    this.rateForm.value.values.forEach((v:any)=>{
      if(v.select)cost=cost + v.cost
    });
    return cost;
  }
  calck_procent(chargeValue:any){
    let cost;
    cost=Math.ceil(this.currentRequest.cargo_cost)/100;
    cost=cost*chargeValue.value.price;
    chargeValue.patchValue({
      cost: cost,
    });
  }
  calck_multiplication(chargeValue:any){
    let cost;
    cost=chargeValue.value.price*chargeValue.value.count;
    chargeValue.patchValue({
      cost: cost,
    });
  }

  
  setContractorName(contractor_id:number) {
    const contractor = this.contractorList.find((r:any) => r.id === contractor_id);
    this.rateForm.patchValue({
      contractor_name: contractor ? contractor.name : '',
    });
  }

  onContratorChange(contractor:any,control:any){
    control.patchValue({
      currency: contractor.currency
      

      // contractor_id: contractor.id,
      // contractor_name: contractor.name,
    });
  }

  filterContractor(){
    const filterContractor=this.contractorList.filter((option:any) => option.name.toLowerCase().replaceAll(' ', '').includes(this.rateForm.value.contractor_name.toLowerCase().replaceAll(' ', '')));
    return filterContractor;
  }

  onCancelBtnClick(){
    this.closeForm()
  }
  closeForm(){
    this.closeDialog.emit();
  }

  // Charges
  get charges() {
    return <FormArray>this.rateForm.get('values');
  }
  calckChargeCost(control:any){
    control.patchValue({cost: control.value.price * control.value.value});
    // this.calckRateCost();
  }
  // calckRateCost(){
  //   let cost:number=0;
  //   this.rateForm.value.values.forEach((v:any)=>{
  //     if(v.select)cost=cost + v.cost
  //   });
  //   this.rateForm.patchValue({ cost:cost });
  // }
  calckCommentChargePrice(control:any){
    control.patchValue({price: control.value.cost/1});
    // this.calckRateCost();
  }

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



  getArrivalPoinst():void{
    this.directionService.directionCity({ country_id:this.currentRequest.arrival_country_id })
      .pipe(
        tap(contractor => {
          console.log('getArrivalPoinst',contractor);

          if (!contractor) {
            throw ({ error: { error_message: `Маршрутов не существует`} });
          }
        }),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (poinst) => {
          this.pointList=poinst

        },
        error: (err) => {
          this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }

  private getPointAction():void{
    this.transportService.transportPointAction({direction:'arrival'})
      .pipe(
        tap(contractor => {
          console.log('getArrivalPoinst',contractor);

          if (!contractor) {
            throw ({ error: { error_message: `Маршрутов не существует`} });
          }
        }),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (poinst) => {
          this.pointActionList=poinst

        },
        error: (err) => {
          this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }

  rateSave():void{
    console.log(this.rateForm.value);
    this.requestService.requestRateOtherSave({body:this.rateForm.value})
      .pipe(
        tap(contractor => {
          console.log(contractor);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (contractor) => {
          this.closeForm();
          this.snackBar.open(
            !this.rate
            ?'Ставка успешно создана'
            :'Ставка успешно изменена',
            undefined, this.snackBarWithShortDuration
          );
        },
        error: (err) => {
          this.snackBar.open(
            !this.rate
            ?'Ошибка создания ставки:'
            :'Ошибка изменения ставки:' + err.error.error_message,
            undefined, this.snackBarWithShortDuration
          );
        }
      });
  }
  //
  getChargesShema():void{
    this.requestService.requestRateFormParam({request_id:this.currentRequest.id, method:'other'})
      .pipe(
        tap(schema => {
          console.log(schema);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (schema) => {
          this.chargesShema=schema.charges;
          // this.currencyShema=schema.currency;
          this.chargesShema.forEach((i:any)=>{
            this.charges.push(this.fb.group({
              field: [i.field_name,[]],
              price: [,[]],
              count: [i.multiplier==='percent_of_cargo_cost'?Math.ceil(this.currentRequest.cargo_cost):1,[]],
              comment: [,[]],
              select: [i.checked,[]],
              contractor_id: [,[]],
              point_action_id: [,[]],
              city_id: [,[]],
              currency: [,[]],

              title: [i.title,[]],
              cost: [,[]],
              multiplier:i.multiplier==='percent_of_cargo_cost'?true:false,
              multiplier_name:i.multiplier_name,
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
        console.log(currencyList);

        this.currencyList=currencyList.current;
      },
      error: (err) => {
        this.snackBar.open(`Ошибка получения валют: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }
}

// checked
// :
// false

// field_comment
// :
// false

// field_fix
// :
// false

// field_min
// :
// false

// field_name
// :
// "terminal_handling"

// id
// :
// 13

// title
// :
// "Терминальная обработка груза"

// unit
// :
// "kg"
