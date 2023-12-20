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


  onChange = (value: Partial<Contact>) => { };
  onTouched = () => { };
  private _destroy$ = new Subject();

  private touched = false;
  cargoPackages:CargoPackage[]=[];

  currentTotalVolume: number = 0;
  currentTotalWeight: number = 0;

  constructor(
    private fb: FormBuilder,
    private cargoService:CargoService,
  ) {
    this.placeForm = this.fb.group({
      cargo_package_id: ['', []],
      stacking: [false,[]],
      length: ['', [Validators.required]],
      width: ['', [Validators.required]],
      height: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      count: ['', [Validators.required]],
      volume: ['', [Validators.required]],
      total_weight: ['', [Validators.required]],
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
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.getСargoPackages()
    this.placeForm.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(value => this.onChange(value));

    this.placeForm.statusChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        if (!this.touched) {
          this.onTouched();
          this.touched = true;
        }
      });

      this.onCalkTotalVolumeAndWeight()

  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {

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
