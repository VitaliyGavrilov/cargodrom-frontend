import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { from, Subject, takeUntil, tap } from 'rxjs';
import { Contractor } from 'src/app/api/custom_models';
import { ContractorService, DirectionService, RequestService, TransportService } from 'src/app/api/services';

@Component({
  selector: 'app-rate-add-transporter',
  templateUrl: './rate-add-transporter.component.html',
  styleUrls: ['./rate-add-transporter.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class RateAddTransporter implements OnInit, OnDestroy {
  @Input() weight?:number;
  @Input() requestId!:number;
  @Input() transportKindId?:number;
  @Input() cityId?:number;
  @Input() rate?:any;
  @Output() closeDialog = new EventEmitter<void>();

  chargesShema:any;
  currencyShema:any;


  rateForm: FormGroup;
  private _destroy$ = new Subject();
  contractorList:any=[];
  pointList:any=[];
  pointActionList:any=[];
  transportKinds:any=[];
  directionCitys:any=[];

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 3000 };

  @ViewChild(MatTable) table?: MatTable<any>;

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
      id:[,[]],
      cost:[,[]],
      request_id: [this.requestId,[]],
      contractor_id: [,[]],
      point_id: [,[]],
      point_action_id: [,[]],
      comment: [,[]],
      values: fb.array([], []),
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
    this.getTransportKind();
    this.getContractor();
    this.getArrivalPoinst();
    this.getPointAction();
    this.getDirectionCity();
    console.log('this.requestId',this.requestId);
    if(this.rate){
      console.log('this edit mode', this.rate);
      this.rate.values.forEach((i:any)=>{
        this.addCharge()
      });
      this.rateForm.patchValue(this.rate);

    } else{
      this.addCharge();
      this.rateForm.patchValue({request_id: this.requestId});
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  // Charges
  addCharge() {
    this.charges.push(this.fb.group({
      kind_id: [,[]],
      departure_city_id: [,[]],
      arrival_city_id: [,[]],
      days_min: [,[]],
      days_max: [,[]],
      amount: [,[]],
      comment: [,[]],
    }));
    // this.table?.renderRows();
    // this.calckRateCost();
  }

  renderRows(){
    this.table?.renderRows();
  }

  removeCharge(i: number): void {
    if(this.charges.length>1){
      this.charges.removeAt(i);
      this.table?.renderRows();
      // this.requestForm.markAsTouched();
      // this.calckRateCost();
    }
  }
  get charges() {
    return <FormArray>this.rateForm.get('values');
  }

  // calckRateCost(){
  //   let cost:number=0;
  //   this.rateForm.value.values.forEach((v:any)=>{
  //     cost=cost + v.amount
  //   });
  //   this.rateForm.patchValue({ cost:cost });
  // }
  calckRateCost(){
    let cost:number=0;
    this.rateForm.value.values.forEach((v:any)=>{
      cost=cost + v.amount
    });
    return cost
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

  private getTransportKind():void{
    this.transportService.transportKind()
      .pipe(
        tap(kinds => {
          if (!kinds) {
            throw ({ error: { error_message: `Маршрутов не существует`} });
          }
        }),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (kinds) => {
          this.transportKinds=kinds

        },
        error: (err) => {
          this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }

  private getDirectionCity():void{
    this.directionService.directionCity()
      .pipe(
        tap(citys => {
          if (!citys) {
            throw ({ error: { error_message: `Маршрутов не существует`} });
          }
        }),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (citys) => {
          this.directionCitys=citys

        },
        error: (err) => {
          this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }

  rateSave():void{
    console.log(this.rateForm.value);

    this.requestService.requestRateTransporterSave({body:this.rateForm.value})
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
    this.requestService.requestRateFormParam({request_id:this.requestId, method:'transporter'})
      .pipe(
        tap(schema => {
          console.log(schema);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (schema) => {
          this.currencyShema=schema.currency;
        },
        error: (err) => {
          this.snackBar.open('Ошибка получения схемы:' + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }
}
