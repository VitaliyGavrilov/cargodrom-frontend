import { Country } from './../../../api/custom_models/country';
import { Contact, responsibilityDirections } from './../../../api/custom_models';
import { FormBuilder, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { unknownCountry } from 'src/app/constants';
import { CargoPackage } from 'src/app/api/custom_models/cargo';
import { CargoService } from 'src/app/api/services';

@Component({
  selector: 'app-place-editor',
  templateUrl: './place-editor.component.html',
  styleUrls: ['./place-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PlaceEditorComponent
    },
    {
      provide: NG_VALIDATORS,
      useExisting: PlaceEditorComponent,
      multi: true,
    },
  ]
})
export class PlaceEditorComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor, Validator {

  placeForm: FormGroup;
  @Output() removePlace = new EventEmitter<void>();

  @Input() currentRequestFormat!:number;
  @Input() isFormSubmitted!:boolean;
  @Input() num!:number;


  onChange = (value: Partial<Contact>) => { };
  onTouched = () => { };
  private _destroy$ = new Subject();

  private touched = false;
  cargoPackages:CargoPackage[]=[];

  currentTotalVolume: number = 0;
  currentTotalWeight: number = 0;

  //статичные данные
  stakingArr =[
    {
      value: true,
      text: 'стакинг'
      // url: типо путь до картинки будет тут, для селектора, должно сработать
    },
    {
      value: false,
      text: ' не стакинг'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private cargoService:CargoService,
  ) {
    this.placeForm = this.fb.group({
      cargo_package_id: [, []],
      stacking: [true,[]],
      length: [, []],
      width: [, []],
      height: [, []],
      weight: [, []],
      count: [, []],
      volume: [, []],
      total_weight: [, []],
    });
  }
  onCalkTotalVolumeAndWeight(){
    const volume = this.placeForm.value.length * this.placeForm.value.width * this.placeForm.value.height * this.placeForm.value.count / 100 ;
    const weight = this.placeForm.value.weight * this.placeForm.value.count ;

    this.currentTotalWeight = typeof weight === 'number' && weight > 0 && weight < Infinity ? weight : 0;
    this.currentTotalVolume = typeof volume === 'number' && volume > 0 && volume < Infinity ? volume : 0;

    this.placeForm.patchValue({volume: this.currentTotalVolume,total_weight: this.currentTotalWeight})
  }

  onDeletePlace(): void {
    this.removePlace.emit();
  }

  writeValue(contact: Partial<Contact>): void {
    this.placeForm.patchValue(contact);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.onCalkTotalVolumeAndWeight()

  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;

  }

  ngOnInit(): void {
    this.getСargoPackages()
    this.placeForm.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(value => {
        this.onChange(value);

      });


    this.placeForm.statusChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        if (!this.touched) {
          this.onTouched();
          this.touched = true;
        }
      });

  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onCalkTotalVolumeAndWeight()
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value && this.placeForm.valid ? null : { contact: true };
  }

  private getСargoPackages() {
    this.cargoService.cargoPackage()
      .pipe(
        tap((cargoPackages)=> this.cargoPackages = cargoPackages as CargoPackage[]),
        takeUntil(this._destroy$)
      ).subscribe();
  }

}
