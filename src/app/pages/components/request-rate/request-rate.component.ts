import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { CargoService, CustomerService, DirectionService, FileService, RequestService, SystemService, TransportService } from 'src/app/api/services';
import { CommonModule, Location } from '@angular/common';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';
import { RateEditorComponent } from '../rate-editor/rate-editor.component';

@Component({
  selector: 'app-request-rate',
  templateUrl: './request-rate.component.html',
  styleUrls: ['./request-rate.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class RequestRateComponent implements OnInit, OnDestroy {
  //ПЕРЕМЕННЫЕ
  id: number=0;
  //снек бар
  snackBarWithShortDuration: MatSnackBarConfig = { duration: 4000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 8000 };
  //отписки
  private _destroy$ = new Subject();
  //переменные окружения
  production = environment.production;
  requestForm: FormGroup;
  request: any;
  files:any
  currentRateNumber:number=0;
  chargeModel:any=[];
  transportCarrier:any=[];
  currencyList:any;
  readonly xlsxMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  //КОНСТРУКТОР
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private requestService: RequestService,
    private snackBar: MatSnackBar,
    private fileSevice: FileService,
    private systemService: SystemService
  ) {
    this.requestForm = this.fb.group({
      uid: [,[]],
      rates: fb.array([], []),
    });
  }
  // Методы ЖЦ:
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('uid');
    this.requestForm.patchValue({
      uid:uid
    })
    this.getRequestRates(uid);
    this.getCurrency()
  }

  //ВЛОЖЕННАЯ ФОРМА РЕДАКТИРОВАНИ РЕЙТОВ
  removeRate(i: number): void {
    this.rates.removeAt(i);
    this.requestForm.markAsTouched();
    this.currentRateNumber=this.rates.length-1;
    if(this.rates.length<1){
      this.addRate()
    }
  }
  addRate() {
    if(this.rates.length<8){
      this.rates.push(this.fb.control({
        currency: this.requestForm.value.rates[this.currentRateNumber]?.currency,
        valid_time: this.requestForm.value.rates[this.currentRateNumber]?.valid_time,
      }));
      this.currentRateNumber=this.rates.length-1;
      this.requestForm.markAsTouched();
    }
  }
  duplicateRate(){
    this.rates.push(this.fb.control(this.requestForm.value.rates[this.currentRateNumber]));
    this.requestForm.markAsTouched();
  }
  get rates() {
    return <FormArray>this.requestForm.get('rates');
  }

  // Публичные методы:
  indexRateChange(e:any){
    this.currentRateNumber=e;
  }
  copyDispatchText(){
    window.navigator.clipboard.writeText(`${this.request.departure_country_name}, ${this.request.departure_city_name}, ${this.request.departure_address}, ${this.request.departure_point_name}`)
    this.snackBar.open(`Address copied: ` + `${this.request.departure_country_name}, ${this.request.departure_city_name}, ${this.request.departure_address}, ${this.request.departure_point_name}` , undefined, this.snackBarWithLongDuration);
  }
  copyDestinationText(){
    window.navigator.clipboard.writeText(`${this.request.arrival_country_name}, ${this.request.arrival_city_name}, ${this.request.arrival_address}, ${this.request.arrival_point_name}`)
    this.snackBar.open(`Address copied: ` + `${this.request.arrival_country_name}, ${this.request.arrival_city_name}, ${this.request.arrival_address}, ${this.request.arrival_point_name}`, undefined, this.snackBarWithLongDuration);
  }

  getCurrency(){
    this.systemService.systemCurrency().pipe(
      tap((currencyList) => {
      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: (currencyList) => {
        console.log('currencyList',currencyList);
        this.currencyList=currencyList.current;
      },
      error: (err) => {
        console.log('ошибка получения валют в хеадере');
      }
    });
  }

  // Приватные методы:
  getFile(id:number):void{
    this.fileSevice.fileDownload({id: id})
      .pipe(
        tap((file)=> {
          // if (!file) {
          //   throw ({ error: { error_message: `Запрос не существует` } });
          // }
        }), takeUntil(this._destroy$))
      .subscribe({
        next: ({name, data}) => {
          const dataUri = `data:${this.xlsxMimeType};base64,${data}`;
          const a = document.createElement('a');
          a.href = dataUri;
          a.download = name!;
          a.click();
        },
        error: (err) => {
          this.snackBar.open(`Ошибка получения документа: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)}
      });
  }

  //получаем данные запроса и рейтов
  private getRequestRates(uid:any){
    this.requestService.requestRates({uid:uid})
      .pipe(
        tap((rates)=> {
          console.log('getRequestRates', rates);
          if (!rates) throw ({ error: { error_message: `Запрос не существует` } });
          if(!rates.rates)this.rates.push(this.fb.control({}));
          rates.rates?.forEach((e:any) => {
            this.addRate();
            this.requestForm.patchValue(rates);

          });
        }),
        takeUntil(this._destroy$))
      .subscribe({
        next: (rates:any) => {
          this.chargeModel=rates.charges;
          this.request=rates;
        },
        error: (err) => {
          this.snackBar.open(`${err.error?.error_message}: ` + err.error?.error_message_description, undefined, this.snackBarWithShortDuration);
        }
      });
  }
  //сохраняем рейты
  saveRequestRates(){
    console.log(this.requestForm.value);
    this.requestService.requestRatesSave({body:this.requestForm.value})
      .pipe(
        tap((res)=> {
          console.log(res);
          if (!res) {
            throw ({ error: { error_message: `Ошибка сохранения` } });
          }
        }),
        takeUntil(this._destroy$))
      .subscribe({
        next: (res:any) => {
          this.snackBar.open(
            this.requestForm.value.rates.length>1
            ?`Ваши предложения в количестве ${this.requestForm.value.rates.length}-х ставок были отправлены`
            :`Ставка была отправлена`,
            undefined,
            {
              duration: 2000,
              verticalPosition: 'top', // Позиционирование по вертикали
              horizontalPosition: 'center', // Позиционирование по горизонтали
              panelClass: ['centered-snackbar'] // Кастомный класс для стилизации
            }
          );
          // this.snackBar.open(`Данные сохранены`, undefined, this.snackBarWithLongDuration);
        },
        error: (err) => {
          this.snackBar.open(`${err.error.error_message}: ` + err.error.error_message_description, undefined, this.snackBarWithShortDuration);
        }
      });
  }
}
