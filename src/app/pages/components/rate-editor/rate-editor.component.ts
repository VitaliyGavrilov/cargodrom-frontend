import { FormBuilder, FormGroup, FormArray, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TransportCarrier } from 'src/app/api/custom_models/transport';
import { CalculationsService } from '../../services/calculations.service';
import { TransportService } from 'src/app/api/services';
import { DirectionService } from 'src/app/api/services';
import { formatDate } from '@angular/common';

interface ChargeModel {
  field_name: string;
  name: string;
  title: string;
  unit?: string;
  field_min: boolean;
  field_fix: boolean;
  field_comment: boolean;
  status: boolean;
  requare: boolean;
  note?: string;
}

interface ChargeValue {
  field: string;
  select: boolean;
  price?: number;
  min?: number;
  fix?: number;
  value?: number;
  cost?: number;
  comment?: string;
}

@Component({
  selector: 'app-rate-editor',
  // templateUrl: './rate-editor.component.html',
  templateUrl: './rate-editor-test.comp.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RateEditorComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: RateEditorComponent,
      multi: true,
    },
  ]
})
export class RateEditorComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor, Validator {
  @Input() requestKindId!: number;
  @Input() rates?: any[];
  @Input() currentRateNumber?: number;
  @Input() chargeModel: ChargeModel[] = [];
  @Input() weight?: number;
  @Input() request?: any;
  @Input() currency?: any[];

  @Output() removeRate = new EventEmitter<void>();
  @Output() addRate = new EventEmitter<void>();
  @Output() indexRateChange = new EventEmitter<number>();
  @Output() duplicateRate = new EventEmitter<void>();

  rateForm: FormGroup;
  transportCarrier: TransportCarrier[] = [];
  transportRoute: any[] = [];

  daysOfTheWeek = [
    { day: 'Monday', id: 1, date_id: 1 },
    { day: 'Tuesday', id: 2, date_id: 2 },
    { day: 'Wednesday', id: 3, date_id: 3 },
    { day: 'Thursday', id: 4, date_id: 4 },
    { day: 'Friday', id: 5, date_id: 5 },
    { day: 'Saturday', id: 6, date_id: 6 },
    { day: 'Sunday', id: 7, date_id: 0 },
  ];

  private _destroy$ = new Subject<void>();
  private touched = false;

  @ViewChild('deleteRateDialogRef') deleteRateDialogRef?: TemplateRef<void>;

  constructor(
    private fb: FormBuilder,
    private calculationsService: CalculationsService,
    private transportService: TransportService,
    private directionService: DirectionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.rateForm = this.createForm();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadTransportData();
    this.setupFormSubscriptions();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weight'] && this.weight) {
      this.updateWeightDependentCharges();
    }
    if (this.rateForm.value.rate_type === 'detail') {
      this.calculateTotalCost();
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value) {
      this.rateForm.patchValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.rateForm.valid ? null : { rateForm: true };
  }

  // Public properties
  get charges(): FormArray {
    return this.rateForm.get('values') as FormArray;
  }

  get rateChar(): string {
    const currency = this.currency?.find(c => c.id === this.rateForm.value.currency);
    return currency?.char || '?';
  }

  get rateCode(): string {
    const currency = this.currency?.find(c => c.id === this.rateForm.value.currency);
    return currency?.code || '?';
  }

  // Public methods
  onDeleteRate(): void {
    if (!this.deleteRateDialogRef) return;

    this.dialog.open(this.deleteRateDialogRef)
      .afterClosed()
      .subscribe(res => {
        if (res) this.removeRate.emit();
      });
  }

  onAddRate(): void {
    this.addRate.emit();
  }

  onChangeRate(index: number): void {
    this.indexRateChange.emit(index);
  }

  onDuplicateRate(): void {
    this.duplicateRate.emit();
  }

  onRateTypeChange(): void {
    this.resetChargeValues();
  }

  onRouteChange(route: any): void {
    this.rateForm.patchValue({
      transit_time: {
        transit_time_from: route.days_min,
        transit_time_to: route.days_max,
      },
    });
  }

  calculateCharge(control: any): void {
  const value = control.value;

  // Если есть min или fix, рассчитываем cost даже при нулевом price
  let costValue = 0;

  if (value.min !== null && value.min !== undefined && value.min > 0) {
    // Расчет с минимальной стоимостью
    const calculatedCost = (value.price || 0) * (value.value || 0);
    costValue = Math.max(value.min, calculatedCost);
  } else if (value.fix !== null && value.fix !== undefined && value.fix > 0) {
    // Расчет с фиксированной надбавкой
    costValue = (value.price || 0) * (value.value || 0) + value.fix;
  } else if (value.price !== null && value.price !== undefined && value.price > 0) {
    // Стандартный расчет
    costValue = value.price * (value.value || 0);
  } else {
    // Если только cost введен напрямую
    costValue = value.cost || 0;
  }

  // Округляем до 2 знаков
  costValue = parseFloat(costValue.toFixed(2));

  control.patchValue({ cost: costValue }, { emitEvent: false });
  this.calculateTotalCost();
}

  // calculateCharge(control: any): void {
  //   const costValue = this.calculationsService.calculateRate(
  //     control.value.price,
  //     control.value.value,
  //     { min: control.value.min, fix: control.value.fix }
  //   );
  //   control.patchValue({ cost: costValue }, { emitEvent: false });
  //   this.calculateTotalCost();
  // }

  calculateCostDirectly(control: any): void {
    control.patchValue({
      value: control.value.cost,
      price: 1,
    }, { emitEvent: false });
  }

  filterIata(): any[] {
  const searchTerm = this.rateForm.value.carrier_name?.toLowerCase().replace(/\s/g, '') || '';
  return this.transportCarrier?.filter(option =>
    option.iata?.toLowerCase().replace(/\s/g, '').includes(searchTerm)
  ) || [];
}

filterRoutes(): any[] {
  const searchTerm = this.rateForm.value.route_name?.toLowerCase().replace(/\s/g, '') || '';
  return this.transportRoute?.filter(option =>
    option.name.toLowerCase().replace(/\s/g, '').includes(searchTerm)
  ) || [];
}

  getAirlineName(iata: string): string {
    const carrier = this.transportCarrier.find(c =>
      c.iata?.toLowerCase() === iata?.toLowerCase()
    );
    return iata==''?'':carrier?.name || '';
  }

  // Private methods
  private createForm(): FormGroup {
    return this.fb.group({
      carrier_desc: [''],
      carrier_name: [''],
      comment: [''],
      departure_schedule: [[]],
      id: [null],
      nearest_flight: [[]],
      num: [null],
      profit_include: [true],
      rate_type: ['nodetail'],
      route_name: [''],
      total_cost: [0],
      transit_time: this.fb.group({
        transit_time_from: [null],
        transit_time_to: [null],
      }),
      currency: [null],
      values: this.fb.array([]),
      valid_time: [''],
    });
  }

  private initializeForm(): void {
    this.initializeCharges();

    if (this.request?.currency) {
      this.rateForm.patchValue({
        currency: this.request.currency
      });
    }
  }
  private initializeCharges(): void {
  this.charges.clear();

  // Получаем существующие значения из данных (если есть)
  const existingValues = this.rateForm.value.values || [];

  this.chargeModel.forEach(charge => {

    // Ищем существующее значение для этого поля
    const existingValue = existingValues.find((v: any) => v.field === charge.field_name);

    const selectValue = existingValue?.select ?? (charge.requare || charge.status);
    const initialValue = charge.unit === 'kg' ? this.weight : (existingValue?.value ?? 1);

    const chargeGroup = this.fb.group({
      field: [charge.field_name],
      select: [selectValue],
      price: [existingValue?.price || null],
      min: [existingValue?.min || null],
      fix: [existingValue?.fix || null],
      value: [initialValue],
      cost: [existingValue?.cost || null],
      comment: [existingValue?.comment || null],
    });

    // Подписываемся на изменения для пересчета
    chargeGroup.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      if (this.rateForm.value.rate_type === 'detail') {
        this.calculateTotalCost();
      }
    });

    this.charges.push(chargeGroup);
  });
}

  // private initializeCharges(): void {
  //   this.charges.clear();

  //   this.chargeModel.forEach(charge => {
  //     const selectValue = charge.requare || charge.status;
  //     const initialValue = charge.unit === 'kg' ? this.weight : 1;

  //     const chargeGroup = this.fb.group({
  //       field: [charge.field_name],
  //       select: [selectValue],
  //       price: [null],
  //       min: [null],
  //       fix: [null],
  //       value: [initialValue],
  //       cost: [null],
  //       comment: [null],
  //     });

  //     // Подписываемся на изменения для пересчета
  //     chargeGroup.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
  //       if (this.rateForm.value.rate_type === 'detail') {
  //         this.calculateTotalCost();
  //       }
  //     });

  //     this.charges.push(chargeGroup);
  //   });
  // }

  private setupFormSubscriptions(): void {
    this.rateForm.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      this.onChange(value);

      if (!this.touched) {
        this.onTouched();
        this.touched = true;
      }
    });
  }

  private loadTransportData(): void {
    this.getTransportCarrier();
    this.getTransportRoute();
  }

  private updateWeightDependentCharges(): void {
    this.charges.controls.forEach((control, index) => {
      const chargeModel = this.chargeModel[index];
      if (chargeModel?.unit === 'kg' && this.weight) {
        control.patchValue({ value: this.weight }, { emitEvent: false });
      }
    });
  }

  private calculateTotalCost(): void {
  const total = this.charges.controls
    .filter(control => control.value.select && control.value.cost)
    .reduce((sum, control) => sum + (control.value.cost || 0), 0);

  // Округляем до 2 знаков после запятой
  const roundedTotal = parseFloat(total.toFixed(2));

  this.rateForm.patchValue({ total_cost: roundedTotal }, { emitEvent: false });
}

  // private calculateTotalCost(): void {
  //   const total = this.charges.controls
  //     .filter(control => control.value.select && control.value.cost)
  //     .reduce((sum, control) => sum + (control.value.cost || 0), 0);

  //   this.rateForm.patchValue({ total_cost: total }, { emitEvent: false });
  // }

  private resetChargeValues(): void {
    this.charges.controls.forEach(control => {
      control.patchValue({
        comment: null,
        cost: null,
        fix: null,
        min: null,
        price: null,
      }, { emitEvent: false });
    });
    this.rateForm.patchValue({ total_cost: 0 }, { emitEvent: false });
  }

  private getTransportCarrier(): void {
    this.transportService.transportCarrier({ kind_id: this.requestKindId })
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (carriers) => {
          this.transportCarrier = carriers || [];
        },
        error: (err) => {
          this.showError('Ошибка загрузки перевозчиков', err);
        }
      });
  }

  private getTransportRoute(): void {
    this.directionService.directionRoute({
      kind_id: this.requestKindId,
      arrival_city_id: this.request?.arrival_city_id,
      departure_country_id: this.request?.departure_country_id
    })
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (routes) => {
          this.transportRoute = routes || [];
        },
        error: (err) => {
          this.showError('Ошибка загрузки маршрутов', err);
        }
      });
  }

  private showError(message: string, err: any): void {
    const errorMsg = err?.error?.error_message_description || err?.error?.error_message || 'Неизвестная ошибка';
    this.snackBar.open(`${message}: ${errorMsg}`, 'Закрыть', { duration: 5000 });
  }

  // Эти методы должны быть объявлены для ControlValueAccessor
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  // Добавьте эти методы в класс RateEditorComponent

getChargeTitle(fieldName: string): string {
  const charge = this.chargeModel.find(item => item.field_name === fieldName);
  return charge?.name || fieldName;
}

getChargeUnit(fieldName: string): string {
  const charge = this.chargeModel.find(item => item.field_name === fieldName);
  return charge?.unit || '';
}

hasMin(fieldName: string): boolean {
  const charge = this.chargeModel.find(item => item.field_name === fieldName);
  return charge?.field_min || false;
}

hasFix(fieldName: string): boolean {
  const charge = this.chargeModel.find(item => item.field_name === fieldName);
  return charge?.field_fix || false;
}

hasComment(fieldName: string): boolean {
  const charge = this.chargeModel.find(item => item.field_name === fieldName);
  return charge?.field_comment || false;
}

getSelectedDateText(): string {
  const dates = this.rateForm.value.nearest_flight || [];
  if (dates.length === 0) return '';

  const formattedDates = dates.map((date: string) => {
    const dateObj = new Date(date);
    return {
      day: dateObj.getDate(),
      month: dateObj.toLocaleString('en-US', { month: 'short' }),
      date: date
    };
  }).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let result = '';
  formattedDates.forEach((date: any, index: number) => {
    const nextDate = formattedDates[index + 1];
    if (nextDate && nextDate.month === date.month) {
      result += date.day + ',';
    } else {
      result += date.day + ' ' + date.month + (index === formattedDates.length - 1 ? '' : ', ');
    }
  });

  return result;
}

onDateSelect(event: any, calendar: any): void {
  const date = event.toISOString().split('T')[0];
  const currentDates = this.rateForm.value.nearest_flight || [];

  const index = currentDates.findIndex((d: string) => d === date);
  if (index >= 0) {
    currentDates.splice(index, 1);
  } else {
    currentDates.push(date);

    // Проверка соответствия выбранной даты дням недели из departure_schedule
    const selectedDate = new Date(date);
    let dayOfWeek = selectedDate.getDay()==0?1:selectedDate.getDay()+1; // 0 - воскресенье, 1 - понедельник, etc.

    console.log('dayOfWeek',dayOfWeek);
    // Конвертируем воскресенье (0) в 7 для соответствия с нашим форматом
    // if (dayOfWeek === 0) {
    //   dayOfWeek = 7;
    // }

    console.log('dayOfWeek',dayOfWeek);

    const departureSchedule = this.rateForm.value.departure_schedule || [];
    const isDateInSchedule = departureSchedule.includes(dayOfWeek);

    if (!isDateInSchedule && departureSchedule.length > 0) {
      this.snackBar.open(
        `Выбранная дата не соответствует дням недели расписания`,
        undefined,
        {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['centered-snackbar']
        }
      );
    }
  }

  this.rateForm.patchValue({ nearest_flight: currentDates });
  calendar.updateTodaysDate();
}

dateClass = (event: any) => {
  const date = event.toISOString().split('T')[0];
  const dates = this.rateForm.value.nearest_flight || [];
  return dates.find((d: string) => d === date) ? "selected" : "";
}
onValidChange(){
    this.rateForm.patchValue({
      valid_time: formatDate(this.rateForm.value.valid_time,'yyyy-MM-dd','en-US')
    })
  }
}
// import { Country } from '../../../api/custom_models/country';
// import { Contact, responsibilityDirections } from '../../../api/custom_models';
// import { FormBuilder, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, ValidationErrors, Validator, NG_VALIDATORS, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
// import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
// import { Subject } from 'rxjs';
// import { takeUntil, tap } from 'rxjs/operators';
// import { unknownCountry } from 'src/app/shared/constants';
// import { CargoPackage } from 'src/app/api/custom_models/cargo';
// import { CargoService, ContractorService, DirectionService, TransportService } from 'src/app/api/services';
// import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
// import { TransportCarrier, TransportRoute } from 'src/app/api/custom_models/transport';
// import { CommonModule, formatDate } from '@angular/common';
// import { MatDialog } from '@angular/material/dialog';
// import { CalculationsService } from '../../services/calculations.service';
// import { RequestRateComponent } from '../request-rate/request-rate.component';
// import { MaterialModule } from '@cargodrom/material/material.module';

// @Component({
//   selector: 'app-rate-editor',
//   templateUrl: './rate-editor.component.html',
//   // styleUrls: ['./rate-editor.component.scss'],
//   encapsulation: ViewEncapsulation.None,
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       multi: true,
//       useExisting: RateEditorComponent,
//     },
//     {
//       provide: NG_VALIDATORS,
//       useExisting: RateEditorComponent,
//       multi: true,
//     },
//   ]
// })
// export class RateEditorComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor, Validator {
//   @Input() requestKindId!:number;
//   @Input() rates?:any;
//   @Input() currentRateNumber?:number;
//   @Input() chargeModel?:any;
//   @Input() weight?:number;
//   @Input() request?:any;
//   @Input() currency?:any;

//   @Output() removeRate = new EventEmitter<void>();
//   @Output() addRate = new EventEmitter<void>();
//   @Output() indexRateChange = new EventEmitter<Number>();
//   @Output() duplicateRate = new EventEmitter<void>();

//   onChange = (value: Partial<any>) => { };
//   onTouched = () => { };
//   private touched = false;

//   snackBarWithShortDuration: MatSnackBarConfig = { duration: 4000 };
//   snackBarWithLongDuration: MatSnackBarConfig = { duration: 8000 };

//   private _destroy$ = new Subject();
//   rateForm: FormGroup;
//   transportCarrier: TransportCarrier[]=[];
//   transportRoute: any[]=[];
//   contractorList:any[]=[];

//   daysOfTheWeek=[
//     { day:'Monday', id:1, date_id:1 },
//     { day:'Tuesday', id:2, date_id:2 },
//     { day:'Wednesday', id:3, date_id:3 },
//     { day:'Thursday', id:4, date_id:4 },
//     { day:'Friday', id:5, date_id:5 },
//     { day:'Saturday', id:6, date_id:6 },
//     { day:'Sunday', id:7, date_id:0 },
//   ]

//   @ViewChild('deleteRateDialogRef') deleteRateDialogRef?: TemplateRef<void>;

//   constructor(
//     private calculationsService: CalculationsService,
//     private fb: FormBuilder,
//     private transportService: TransportService,
//     private snackBar: MatSnackBar,
//     private dialog: MatDialog,
//     private contractorService: ContractorService,
//     private directionService: DirectionService,
//   ) {
//     this.rateForm = this.fb.group({
//       carrier_desc: [,[]],
//       carrier_name: [,[]],
//       comment: [,[]],
//       departure_schedule: [[],[]],
//       id: [,[]],
//       nearest_flight: [[],[]],
//       num: [,[]],
//       profit_include: [true,[]],
//       rate_type: ['nodetail',[]],
//       // route_id: [,[]],
//       route_name: ['',[]],
//       total_cost: [,[]],
//       transit_time: this.fb.group({
//         transit_time_from: [, []],
//         transit_time_to: [, []],
//       }),
//       currency: [,[]],
//       values: fb.array([
//         // this.fb.group({
//         //   comment: [,[]],
//         //   cost: [,[]],
//         //   field: [,[]],
//         //   fix: [,[]],
//         //   min: [,[]],
//         //   price: [,[]],
//         //   select: [,[]],
//         //   value: [,[]],
//         // })
//       ], []),
//     });
//   }

//   // Методы ЖЦ
//   ngOnInit(): void {
//     this.getTransportCarrier();
//     this.getTransportRoute();

//     this.chargeModel.forEach((i:any)=>{
//       console.log(i);

//       const selectValue = i.requare == true ? true : i.status;
//       this.charges.push(this.fb.group({
//         comment: [,[]],
//         cost: [,[]],
//         field: [i.field_name,[]],
//         fix: [,[]],
//         min: [,[]],
//         price: [,[]],
//         select: [selectValue,[]],
//         // select: [i.status,[]],
//         value: [i.unit=='kg'?this.weight:1,[]],
//       }));
//       this.rateForm.markAsTouched();
//     });

//     this.rateForm.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
//       this.onChange(value)
//     });
//     this.rateForm.statusChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
//       if (!this.touched) {
//         this.onTouched();
//         this.touched = true;
//       }
//     });

//     if(this.rateForm.value.currency==null){
//       this.rateForm.patchValue({
//         currency: this.request.currency
//       })
//     }
//     this.rateForm.markAsTouched();
//       console.log('Charge Model from backend:', this.chargeModel);
//   console.log('FormArray values after initialization:', this.charges.value);
//   }
//   ngOnDestroy(): void {
//     this._destroy$.next(null);
//     this._destroy$.complete();
//   }

//   get rateChar(){
//     const i = this.currency?.find((r:any) => r.id === this.rateForm.value.currency);
//     return i?.char?i.char:'?';
//   }
//   get rateCode(){
//     const i = this.currency?.find((r:any) => r.id === this.rateForm.value.currency);
//     return i?.code?i.code:'?';
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if(this.rateForm.value.rate_type==='detail') this.calckTotalCost();
//   }

//   // ControlValueAccessor
//   writeValue(contact: any): void {
//     this.rateForm.patchValue(contact);
//   }
//   registerOnChange(fn: any): void {
//     this.onChange = fn;
//   }
//   registerOnTouched(fn: any): void {
//     this.onTouched = fn;
//   }
//   validate(control: AbstractControl): ValidationErrors | null {
//     return control.value && this.rateForm.valid ? null : { contact: true };
//   }

//   // Rates
//   onDeleteRate(): void {
//     if (!this.deleteRateDialogRef) { return }
//     this.dialog.open(this.deleteRateDialogRef)
//       .afterClosed()
//       .subscribe(res => {
//         if (res) { this.removeRate.emit() }
//     });
//   }
//   onAddRate(): void {
//     this.addRate.emit();
//   }
//   onChangeRate(i:number): void {
//     this.indexRateChange.emit(i);
//   }
//   onDuplicateRate(): void {
//     this.duplicateRate.emit();
//   }

//   // Charges
//   addCharge() {
//     this.charges.push(this.fb.group({
//       comment: [,[]],
//       cost: [,[]],
//       field: [,[]],
//       fix: [,[]],
//       min: [,[]],
//       price: [,[]],
//       select: [false,[]],
//       value: [,[]],
//     }));
//     this.rateForm.markAsTouched();
//   }
//   get charges() {
//     return <FormArray>this.rateForm.get('values');
//   }

//   // Публичные методы


//   onRouteChange(route:any){
//     this.rateForm.patchValue({
//       // route_id: route.id,
//       // route_name: route.name,
//       transit_time: {
//         transit_time_from: route.days_min,
//         transit_time_to: route.days_max,
//       },
//     });
//   }

//   filterRote(){
//     const filterRoute=this.transportRoute?.filter((option:any) => option.name.toLowerCase().replaceAll(' ', '').includes(this.rateForm.value.route_name?.toLowerCase().replaceAll(' ', '')));
//     return filterRoute.length==0
//     ? []
//     : filterRoute
//   }
//   filterIata(){
//     const filterIata=this.transportCarrier?.filter((option:any) => option.iata.toLowerCase().replaceAll(' ', '').includes(this.rateForm.value.carrier_name?.toLowerCase().replaceAll(' ', '')));
//     return filterIata.length==0
//     ? []
//     : filterIata
//   }

//   returnAirlineName(iata:string):string{
//     let name:any='';
//     this.transportCarrier.forEach((i:TransportCarrier)=>{
//       if(iata?.toLowerCase()==i.iata?.toLowerCase()){ name=i.name };
//     });
//     return name;
//   }
//   returnAirlineIata(id:number):string{
//     let name:any='';
//     this.transportCarrier.forEach((i:TransportCarrier)=>{
//       if(id==i.id){ name=i.iata };
//     });
//     return id===undefined?' ? ':name
//   }

//   onRateTypeChange(){
//     this.charges.controls.forEach((e:any)=>{
//       e.controls['comment'].reset();
//       e.controls['cost'].reset();
//       e.controls['fix'].reset();
//       e.controls['min'].reset();
//       e.controls['price'].reset();
//     })
//     this.rateForm.controls['total_cost'].reset();
//   }
//   //Calck
//   calck(control: any) {
//     const costValue = this.calculationsService.calculateRate(
//       control.value.price,
//       control.value.value,
//       { min: control.value.min, fix: control.value.fix}
//     );
//     control.patchValue({ cost: costValue });
//   }
//   // calck(control: any) {
//   //   let costValue: number;

//   //   if (control.value.min) {
//   //     costValue = control.value.min < control.value.price * control.value.value
//   //     ? control.value.price * control.value.value
//   //     : control.value.min;
//   //   } else if (control.value.fix) {
//   //     costValue = (control.value.price * control.value.value) + control.value.fix;
//   //   } else {
//   //     costValue = control.value.price * control.value.value;
//   //   }

//   //   // Округляем до двух знаков после запятой
//   //   const roundedCost = parseFloat(costValue.toFixed(2));

//   //   control.patchValue({ cost: roundedCost });
//   // }
//   // calck(control:any){
//   //   if(control.value.min){
//   //     control.patchValue({
//   //       cost: control.value.min<control.value.price * control.value.value?control.value.price * control.value.value:control.value.min
//   //     });
//   //   } else if(control.value.fix) {
//   //     control.patchValue({cost: (control.value.price * control.value.value)+control.value.fix});
//   //   } else {
//   //     control.patchValue({cost: control.value.price * control.value.value});
//   //   }
//   // }

//   calckCost(control:any){
//     control.patchValue({
//       value: control.value.cost,
//       price: 1,
//     });
//   }
//   calckTotalCost(){
//     // let cost=0;
//     let cost:any[]=[];
//     // this.rateForm.value.values.forEach((v:any)=>{
//     //   if(v.select)cost=cost+v.cost
//     // });
//     this.rateForm.value.values.forEach((v:any)=>{
//       if(v.select){
//         cost.push(v.cost)
//       }
//     });
//     let sum = this.calculationsService.calculateSum(cost);
//     this.rateForm.patchValue({ total_cost:sum });
//   }
//   // Datepicker multy
//   returnSelectDateText(){
//     let text='';
//     let dateOnj:any=[];
//     this.rateForm.value.nearest_flight?.forEach((e:any)=>{
//       const date = new Date(e);
//       const dateTest ={
//         day: date.toLocaleString('en-US', { day: 'numeric' }),
//         mount: date.toLocaleString('en-US', { month: 'short' }),
//         date: e,
//       }
//       dateOnj?.push(dateTest);
//     })
//     const sortedArray=dateOnj.sort((a:any, b:any) => new Date(a.date) > new Date(b.date)? 1 : -1);
//     sortedArray?.forEach((i:any,index:number)=>{
//       let ind=index+1;
//       if(sortedArray[ind]?.mount===i.mount){
//         text= text + i.day + ',';
//       } else {
//         text= text + i.day + ' ' + i.mount + (sortedArray.length==ind?'':', ');
//       }
//     });
//     return text;
//   }
//   isSelectedDate = (event: any) => {
//     // const dayOfWeek = new Date(event).getDay(); // 0 - воскресенье, 1 - понедельник, 2 - вторник, и т.д.
//     // if (dayOfWeek === 2) { // 2 - вторник
//     //   return "disabled-date"; // Класс для недоступных дат
//     // }

//     const date=formatDate(event,'yyyy-MM-dd','en-US');
//     return this.rateForm.value.nearest_flight?.find((x:any) => x == date) ? "selected" : '';
//   }
//   selectDate(event: any, calendar: any) {
//     console.log(event,calendar);
//     const date=formatDate(event,'yyyy-MM-dd','en-US');
//     if(this.rateForm.value.nearest_flight===null) this.rateForm.value.nearest_flight=[];
//     const index = this.rateForm.value.nearest_flight.findIndex((x:any) => x == date);
//     if (index < 0) {
//       this.rateForm.value.nearest_flight.push(date);
//       const dayOfWeek=new Date(event).getDay();
//       // const istestDate=!this.rateForm.value.departure_schedule?.find((x:any) => x == dayOfWeek)
//       const istestDate=this.rateForm.value.departure_schedule?.find((x:any) =>{
//         if(dayOfWeek==0&&x==7){
//           x=0;
//           return x == dayOfWeek;
//         } else {
//           return x == dayOfWeek;
//         }
//       })
//       // const istestDate=dayOfWeek!=0
//       //   ?this.rateForm.value.departure_schedule?.find((x:any) => x == dayOfWeek)
//       //   :this.rateForm.value.departure_schedule?.find((x:any) => 0 == dayOfWeek)
//       if(!istestDate){
//         this.snackBar.open(
//           `Выбранная дата не соответсвтвует дням недели`,
//           undefined,
//           {
//             duration: 2000,
//             verticalPosition: 'top', // Позиционирование по вертикали
//             horizontalPosition: 'center', // Позиционирование по горизонтали
//             panelClass: ['centered-snackbar'] // Кастомный класс для стилизации
//           }
//         );
//       }
//     } else {
//       this.rateForm.value.nearest_flight.splice(index, 1);
//     }
//     calendar.updateTodaysDate();
//   }

//   // Приватные методы
//   // получаем перевозчиков(airline and airline iata controls)
//   private getTransportCarrier():void{
//     this.transportService.transportCarrier({kind_id:this.requestKindId})
//       .pipe(
//         tap(transportCarrier => {


//           if (!transportCarrier) {
//             throw ({ error: { error_message: `Перевозчиков не существует`} });
//           }
//         }),
//         takeUntil(this._destroy$),
//       )
//       .subscribe({
//         next: (transportCarrier) => {
//           this.transportCarrier=transportCarrier;
//         },
//         error: (err) => {
//           this.snackBar.open(`${err.error.error_message}: ` + err.error.error_message_description, undefined, this.snackBarWithShortDuration);
//         }
//       });
//   }
//   // получаем маршруты(route)
//   private getTransportRoute():void{
//       this.directionService.directionRoute({kind_id: this.requestKindId, arrival_city_id:this.request.arrival_city_id,departure_country_id:this.request.departure_country_id })
//         .pipe(
//           tap(transportRoute => {
//             if (!transportRoute) {
//               throw ({ error: { error_message: `Маршрутов не существует`} });
//             }
//           }),
//           takeUntil(this._destroy$),
//         )
//         .subscribe({
//           next: (transportRoute) => {
//             this.transportRoute=transportRoute;
//           },
//           error: (err) => {
//             this.snackBar.open(`${err.error.error_message}: ` + err.error.error_message_description, undefined, this.snackBarWithShortDuration);
//           }
//         });
//     }
//   // private getTransportRoute():void{
//   //   this.transportService.transportRoute({kind_id:this.requestKindId})
//   //     .pipe(
//   //       tap(transportRoute => {
//   //         if (!transportRoute) {
//   //           throw ({ error: { error_message: `Маршрутов не существует`} });
//   //         }
//   //       }),
//   //       takeUntil(this._destroy$),
//   //     )
//   //     .subscribe({
//   //       next: (transportRoute) => {
//   //         this.transportRoute=transportRoute;
//   //       },
//   //       error: (err) => {
//   //         this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
//   //       }
//   //     });
//   // }

//   //получаем контракторов
//     // private getContractor():void{
//     //   this.contractorService.contractorList()
//     //     .pipe(
//     //       tap(contractor => {
//     //         console.log(contractor);

//     //         if (!contractor) {
//     //           throw ({ error: { error_message: `Маршрутов не существует`} });
//     //         }
//     //       }),
//     //       takeUntil(this._destroy$),
//     //     )
//     //     .subscribe({
//     //       next: (contractor) => {
//     //         this.contractorList=contractor.items;
//     //         if(this.rate){
//     //           this.setContractorName(this.rate.contractor_id);
//     //         }

//     //       },
//     //       error: (err) => {
//     //         this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
//     //       }
//     //     });
//     // }
// }
