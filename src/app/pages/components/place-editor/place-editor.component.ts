import { Country } from './../../../api/custom_models/country';
import { Contact, responsibilityDirections } from './../../../api/custom_models';
import { FormBuilder, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { unknownCountry } from 'src/app/constants';

@Component({
  selector: 'app-place-editor',
  templateUrl: './place-editor.component.html',
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


  onChange = (value: Partial<Contact>) => { };
  onTouched = () => { };
  destroy$ = new Subject<void>();

  private touched = false;

  constructor(
    private fb: FormBuilder,
  ) {
    this.placeForm = this.fb.group({
      request_id:[''],
      num: ['', [Validators.required]],
      cargo_package_id: ['', [Validators.required]],
      stacking: [false],
      length: ['', [Validators.required]],
      width: ['', [Validators.required]],
      height: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      count: ['', [Validators.required]],
    });
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
    this.placeForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.onChange(value));

    this.placeForm.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.touched) {
          this.onTouched();
          this.touched = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value && this.placeForm.valid ? null : { contact: true };
  }


}
