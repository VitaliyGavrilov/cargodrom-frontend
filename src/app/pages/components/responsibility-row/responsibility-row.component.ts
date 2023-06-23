import { transportSubKindTable } from './../../../constants';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Country } from 'src/app/api/custom_models';
import { TransportSubKind, TransportSubKinds } from 'src/app/api/custom_models/transport';

@Component({
  selector: 'app-responsibility-row',
  templateUrl: './responsibility-row.component.html',
  styleUrls: ['./responsibility-row.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ResponsibilityRowComponent
    }
  ]
})
export class ResponsibilityRowComponent implements ControlValueAccessor {

  @Input() homeCountry!: Country;
  onChange = (value: any) => { };
  onTouched = () => { };

  // New country
  country?: Country;
  filteredCountries: Country[] = [];

  kinds = transportSubKindTable;
  local: TransportSubKind[] = [];
  disabled: boolean = false;

  constructor(
  ) {
  }

  writeValue(local?: TransportSubKind[]): void {
    this.local = local || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  allCheckedForCountry(): boolean {
    return this.local.length === TransportSubKinds.length;
  }

  allCompleteForCountry(): boolean {
    const kinds = this.local;
    return kinds.length === TransportSubKinds.length || kinds.length === 0;
  }

  allChangeForCountry({ checked }: MatCheckboxChange): void {
    if (checked) {
      this.local = [...TransportSubKinds];
    } else {
      this.local = [];
    }
    this.valueChanged();
  }

  checkedForCountryAndKind(kind: TransportSubKind): boolean {
    const kinds = this.local;
    return kinds.includes(kind);
  }

  changeForCountryAndKind(kind: TransportSubKind, { checked }: MatCheckboxChange): void {
    const kinds = this.local;
    if (checked) {
      kinds.push(kind);
    } else {
      this.local = kinds.filter(aKind => kind !== aKind);
    }
    this.valueChanged();
  }

  valueChanged(): void {
    this.onChange(this.local);
    this.onTouched();
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}


