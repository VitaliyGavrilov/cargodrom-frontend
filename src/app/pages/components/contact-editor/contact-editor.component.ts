import { Contact } from './../../../api/custom_models/contact';
import { FormBuilder, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
    }
  ]
})
export class ContactEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {

  contactForm: FormGroup;
  showResponsibilities = false;

  onChange = (value: Partial<Contact>) => { };
  onTouched = () => { };
  destroy$ = new Subject<void>();

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
      responsible_direction: [{}]
    });
  }

  writeValue(contact: Partial<Contact>): void {
    console.log(`writeValue`, contact);
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
