import { ControlValueAccessor,  NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { RequestServices } from 'src/app/api/custom_models/request';

@Component({
  selector: 'app-services-ediotor',
  templateUrl: './request-services-editor.component.html',
  styleUrls: ['./request-services-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RequestServicesComponent
    }
  ]
})
export class RequestServicesComponent implements OnInit, ControlValueAccessor {

  @Input() services: RequestServices[] = [];

  kinds = new Set<number>();
  isDisabled = false;
  private touched = false;

  onChange = (value: number[]) => { };
  onTouched = () => { };

  constructor() { }

  ngOnInit(): void {
  }

  writeValue(kinds: number[]): void {
    this.kinds = new Set(kinds);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  isChecked(n: number): boolean {
    return this.kinds.has(n);
  }

  toggle(n: number): void {
    if (this.kinds.has(n)) {
      this.kinds.delete(n);
    } else {
      this.kinds.add(n);
    }
    const value = Array.from(this.kinds.values());
    this.onChange(value);
  }

}


