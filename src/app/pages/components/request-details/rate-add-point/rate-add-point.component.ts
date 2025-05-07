import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject, takeUntil, tap } from 'rxjs';
import { Contractor } from 'src/app/api/custom_models';
import { ContractorService, DirectionService, RequestService, SystemService, TransportService } from 'src/app/api/services';

@Component({
  selector: 'app-rate-add-point',
  templateUrl: './rate-add-point.component.html',
  styleUrls: ['./rate-add-point.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class RateAddPoint implements OnInit, OnDestroy {

  @Input() weight?:number;
  @Input() requestId!:number;
  @Input() transportKindId?:number;
  @Input() cityId?:number;
  @Input() rate?:any;
  @Output() closeDialog = new EventEmitter<void>();

  currencyList:any=[];

  chargesShema:any;
  currencyShema:any;

  rateForm: FormGroup;
  private _destroy$ = new Subject();
  contractorList:any=[];
  pointList:any=[];
  pointActionList:any=[];

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
      cost:[,[]],
      request_id: [,[]],
      contractor_id: [,[]],
      contractor_name:['',[]],
      point_id: [,[]],
      point_action_id: [,[]],
      comment: [,[]],
      currency: [0,[]],
      values: fb.array([], []),
    });
  }

  // Методы ЖЦ
  ngOnInit(): void {
    this.getChargesShema();
    this.getContractor();
    this.getArrivalPoinst();
    this.getPointAction();
    this.getCurrency();
    // this.chargesShema.forEach((i:any)=>{
    //   this.charges.push(this.fb.group({
    //     comment: [,[]],
    //     cost: [,[]],
    //     field: [i.field_name,[]],
    //     fix: [,[]],
    //     min: [,[]],
    //     price: [,[]],
    //     select: [i.status,[]],
    //     value: [i.unit==='kg'?Math.ceil(this.weight!):1,[]],
    //   }));
    //   this.rateForm.markAsTouched();
    // });
    // if(this.rate){
    //   console.log('this edit mode', this.rate);
    //   this.rateForm.patchValue(this.rate);
    // }
    this.rateForm.patchValue({request_id: this.requestId});
  }
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
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
    this.calckRateCost();
  }
  calckRateCost(){
    let cost:number=0;
    this.rateForm.value.values.forEach((v:any)=>{
      if(v.select)cost=cost + v.cost
    });
    this.rateForm.patchValue({ cost:cost });
  }
  calckCommentChargePrice(control:any){
    control.patchValue({price: control.value.cost/1});
    this.calckRateCost();
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

  private getArrivalPoinst():void{
    this.directionService.directionPoint({ city_id:this.cityId, transport_kind_id:this.transportKindId! })
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
    this.requestService.requestRatePointSave({body:this.rateForm.value})
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
    this.requestService.requestRateFormParam({request_id:this.requestId,method:'point'})
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
