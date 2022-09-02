import { Country } from './../../../api/custom_models/country';
import { environment } from './../../../../environments/environment';
import { Contact } from './../../../api/custom_models/contact';
import { FormBuilder, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class ContactEditorComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  @Input() countries: Country[] = [];
  @Input() homeCountryId?: number;
  contactForm: FormGroup;
  showResponsibilities = false;
  production = environment.production;

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
      name_f: ['', [Validators.required]],
      name_i: ['', [Validators.required]],
      name_o: ['', [Validators.required]],
      position: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      mobile_phone: ['', []],
      email: ['', [Validators.required]],
      skype: ['', []],
      whatsapp: ['', []],
      telegram: ['', []],
      wechat: ['', []],
      responsible_direction: [{}],
      responsible_param: [{}],
      place: [''],
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

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value && this.contactForm.valid ? null : { contact: true };
  }
}
