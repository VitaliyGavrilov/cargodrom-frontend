import { Country } from './../../../api/custom_models/country';
import { Contact, responsibilityDirections } from './../../../api/custom_models';
import { FormBuilder, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { unknownCountry } from 'src/app/constants';

@Component({
  selector: 'app-contact-editor',
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ContactEditorComponent
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ContactEditorComponent,
      multi: true,
    },
  ]
})
export class ContactEditorComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor, Validator {

  @Input() countries: Country[] = [];
  @Input() homeCountryId?: number;
  readonly unknownCountry = unknownCountry;
  homeCountry: Country = unknownCountry;
  contactForm: FormGroup;
  showResponsibilities = false;

  onChange = (value: Partial<Contact>) => { };
  onTouched = () => { };
  destroy$ = new Subject<void>();

  private touched = false;

  constructor(
    private fb: FormBuilder,
  ) {
    this.contactForm = this.fb.group({
      id: [],
      contractor_id: [],
      name: ['', [Validators.required]],
      // name_f: ['', [Validators.required]],
      // name_i: ['', [Validators.required]],
      // name_o: ['', [Validators.required]],
      position: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      mobile_phone: ['', []],
      email: ['', [Validators.required]],
      skype: ['', []],
      whatsapp: ['', []],
      telegram: ['', []],
      wechat: ['', []],
      // responsible_direction: [{}],
      place: [''],
      // responsible_param: fb.group({
      //   import: [{}, []],
      //   export: [{}, []],
      //   local: [[], []],
      //   responsible_param1:[[],[]]

      // }),

      direction:[[],[]]

    });
  }

  writeValue(contact: Partial<Contact>): void {
    this.contactForm.patchValue(contact);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.contactForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.onChange(value));

    this.contactForm.statusChanges
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
    if (changes['homeCountryId']) {
      if (typeof this.homeCountryId === 'number') {
        this.homeCountry = this.countries.find(country => country.id === this.homeCountryId) || unknownCountry;
      }
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value && this.contactForm.valid ? null : { contact: true };
  }


}
