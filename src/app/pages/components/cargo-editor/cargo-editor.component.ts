import { Country } from './../../../api/custom_models/country';
import { Contact, Currency, responsibilityDirections } from './../../../api/custom_models';
import { FormBuilder, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { unknownCountry } from 'src/app/constants';
import { CargoPackage, CargoType } from 'src/app/api/custom_models/cargo';
import { CargoService, SystemService } from 'src/app/api/services';

@Component({
  selector: 'app-cargo-editor',
  templateUrl: './cargo-editor.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CargoEditorComponent
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CargoEditorComponent,
      multi: true,
    },
  ]
})

export class CargoEditorComponent implements OnInit, OnDestroy {
  //переменные
  private _destroy$ = new Subject();

  @Input()currentRequestFormat!: number;

  cargoForm: FormGroup;

  cargoPackages: CargoPackage[]=[];
  cargoTypes: CargoType[]=[];
  currencys: Currency[]=[];

  //конструктор
  constructor(
    private fb: FormBuilder,
    private cargoService: CargoService,
    private systemService: SystemService,
  ) {
    this.cargoForm = this.fb.group({
      //форма ОПИСАНИЕ ГРУЗА
      //1 строка
      cargo_description:['', [Validators.required]],
      cargo_package_id:['', [Validators.required]],
      cargo_type_id:['', [Validators.required]],
      //2 строка
      cargo_places_count: ['', [Validators.required]],//итого мест
      cargo_places_weight: ['', [Validators.required]],//итого вес
      cargo_places_volume: ['', [Validators.required]],//итого обьем
      cargo_places_paid_weight: ['', [Validators.required]],//оплач.вес
      cargo_places_density: ['', [Validators.required]],//плонтность
      cargo_cost: ['', [Validators.required]],//стоимость
      cargo_currency_id: ['', [Validators.required]],//id валюты
      //3 строка
    })
  }
  //методы
  //методы ЖИЗЕНЕННОГО ЦИКЛА
  ngOnInit(): void {
    this._getСargoPackages();
    this._getCargoTypes();
    this._getCurrencys()
  }
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
  //методы ПУБЛИЧНЫЕ

  //методы ПРИВАТНЫЕ
  //запрос массива видов упаковки
  private _getСargoPackages() {
    this.cargoService.cargoPackage()
      .pipe(
        tap((cargoPackages)=> this.cargoPackages = cargoPackages as CargoPackage[]),
        takeUntil(this._destroy$)
      ).subscribe()
  }
  //запрос массива типов груза
  private _getCargoTypes(){
    this.cargoService.cargoType()
    .pipe(
      tap((cargoTypes)=> this.cargoTypes = cargoTypes as CargoType[]),
      takeUntil(this._destroy$)
    ).subscribe()
  }
  //запрос массива валют
  private _getCurrencys() {
    this.systemService.systemCurrency()
    .pipe(
      tap((currencys)=> this.currencys = currencys as Currency[]),
      takeUntil(this._destroy$)
    ).subscribe()
  }

}
