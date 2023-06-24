import { Component, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Country, Responsibilities } from 'src/app/api/custom_models';
import { TransportSubKind, TransportSubKinds } from 'src/app/api/custom_models/transport';
import { transportSubKindTable, unknownCountry } from '../../../constants';

@Component({
  selector: 'app-responsibility-matrix',
  templateUrl: './responsibility-matrix.component.html',
  styleUrls: ['./responsibility-matrix.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ResponsibilityMatrixComponent
    }
  ]
})
export class ResponsibilityMatrixComponent implements ControlValueAccessor {
  @Input() countries: Country[] = [];
  @Input() homeCountry: Country = unknownCountry;
  @Input() type: 'import' | 'export' = 'export';
  onChange = (value: any) => { };
  onTouched = () => { };

  // New country
  country?: Country;
  filteredCountries: Country[] = [];

  kinds = transportSubKindTable;
  responsibilities: Responsibilities = {};

  targetCountries: Country[] = [];
  disabled: boolean = false;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const homeCountryChange = changes['homeCountry'];
    if (homeCountryChange) {
      if (this.homeCountry) {
        const homeCountryId = this.homeCountry.id;
        delete this.responsibilities[homeCountryId];
        this.targetCountries = this.targetCountries.filter(({ id }) => id !== homeCountryId);
      }
    }
  }

  writeValue(responsibilityParam: Responsibilities): void {
    this.responsibilities = responsibilityParam || {};
    this.targetCountries = Object.keys(this.responsibilities)
      .filter(countryId => Number(countryId) !== this.homeCountry.id)
      .map(countryId => this.getCountryById(countryId)!)
      .sort(byName);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  doFilter(country: Country | string): void {
    this.filteredCountries = this.countries.filter(c => {
      const value = typeof country === 'string' ? country : country.name!;
      return c.name!.toLowerCase().includes(value.toLowerCase()) && !(c.id in this.responsibilities && c.id === this.homeCountry.id);
    });
  }

  displayFn(country: Country): string {
    return country && country.name ? country.name : '';
  }

  addCountry(): void {
    this.targetCountries.push(this.country!);
    this.targetCountries.sort(byName);
    this.responsibilities[this.country!.id] = [];
    this.country = undefined;
    this.valueChanged();
  }

  getCountryById(id: string | number): Country | undefined {
    return this.countries.find(country => country.id === Number(id));
  }

  removeCountry(countryId: number | string): void {
    const index = this.targetCountries.findIndex(({ id }) => id === Number(countryId))
    if (index >= 0) {
      this.targetCountries.splice(index, 1);
    }
    delete this.responsibilities[countryId];
    this.valueChanged();
  }


  allChecked(): boolean {
    const countChecked = this.getCountChecked();
    return this.targetCountries.length > 0 && countChecked === this.targetCountries.length * TransportSubKinds.length;
  }

  allComplete(): boolean {
    const countChecked = this.getCountChecked();
    return countChecked === 0 || countChecked === this.targetCountries.length * TransportSubKinds.length;
  }

  private getCountChecked(): number {
    return this.targetCountries.map(({ id }) => this.responsibilities[id].length).reduce((sum, count) => sum + count, 0);
  }

  allChange({ checked }: MatCheckboxChange): void {
    this.targetCountries.forEach(({ id }) => this.responsibilities[id] = checked ? [...TransportSubKinds] : []);
    this.valueChanged();
  }

  allCheckedForKind(kind: TransportSubKind): boolean {
    return this.targetCountries.length > 0 && this.getCheckedForKind(kind) === this.targetCountries.length;
  }

  allCompleteForKind(kind: TransportSubKind): boolean {
    const checked = this.getCheckedForKind(kind);
    return checked === 0 || checked === this.targetCountries.length;
  }

  private getCheckedForKind(kind: TransportSubKind): number {
    return this.targetCountries.map(({ id }) => this.responsibilities[id].includes(kind)).reduce((sum, checked) => checked ? sum + 1 : sum, 0)
  }

  allChangeForKind(kind: TransportSubKind, { checked }: MatCheckboxChange): void {
    this.targetCountries.forEach(({ id }) => {
      const kinds = this.responsibilities[id];
      if (checked) {
        if (!kinds.includes(kind)) {
          kinds.push(kind);
        }
      } else {
        this.responsibilities[id] = kinds.filter(aKind => aKind !== kind);
      }
    });
    this.valueChanged();
  }

  allCheckedForCountry(countryId: number | string): boolean {
    const kinds = this.responsibilities[countryId];
    return kinds.length === TransportSubKinds.length;
  }

  allCompleteForCountry(countryId: number | string): boolean {
    const kinds = this.responsibilities[countryId];
    return kinds.length === TransportSubKinds.length || kinds.length === 0;
  }

  allChangeForCountry(countryId: number | string, { checked }: MatCheckboxChange): void {
    if (checked) {
      this.responsibilities[countryId] = [...TransportSubKinds];
    } else {
      this.responsibilities[countryId] = [];
    }
    this.valueChanged();
  }

  checkedForCountryAndKind(countryId: number | string, kind: TransportSubKind): boolean {
    const kinds = this.responsibilities[countryId];
    return kinds.includes(kind);
  }

  changeForCountryAndKind(countryId: number | string, kind: TransportSubKind, { checked }: MatCheckboxChange): void {
    const kinds = this.responsibilities[countryId];
    if (checked) {
      kinds.push(kind);
    } else {
      this.responsibilities[countryId] = kinds.filter(aKind => kind !== aKind);
    }
    this.valueChanged();
  }

  valueChanged(): void {
    const value = { ...this.responsibilities };
    delete value[this.homeCountry.id];
    this.onChange(value);
    this.onTouched();
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}

const byName = (a: Country, b: Country) => a.name!.localeCompare(b.name!);
