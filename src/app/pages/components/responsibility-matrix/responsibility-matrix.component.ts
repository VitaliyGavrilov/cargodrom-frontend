import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Country, Responsibilities } from 'src/app/api/custom_models';
import { TransportSubKind, TransportSubKinds } from 'src/app/api/custom_models/transport';

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
export class ResponsibilityMatrixComponent implements OnInit, ControlValueAccessor {
  @Input() countries: Country[] = [];
  @Input() homeCountry!: Country;
  @Input() type: 'import' | 'export' = 'export';
  onChange = (value: any) => { };
  onTouched = () => { };

  // New country
  country?: Country;
  filteredCountries: Country[] = [];

  kinds: {
    kind: TransportSubKind,
    type: 'air' | 'road' | 'sea' | 'rail',
    classes: string[];
    name: string;
  }[] = [
      { kind: 'avia_lcl', type: 'air', classes: ['s'], name: 'LCL' },
      { kind: 'avia_fcl', type: 'air', classes: ['e'], name: 'FCL' },
      { kind: 'road_lcl', type: 'road', classes: ['s'], name: 'LCL' },
      { kind: 'road_fcl', type: 'road', classes: ['bg', 's'], name: 'FCL' },
      { kind: 'road_adr', type: 'road', classes: ['bg'], name: 'ADR' },
      { kind: 'road_ref', type: 'road', classes: ['bg'], name: 'REF' },
      { kind: 'sea_teus', type: 'sea', classes: ['bg', 'e'], name: 'TEUS' },
      { kind: 'sea_lcl', type: 'sea', classes: ['s'], name: 'LCL' },
      { kind: 'sea_sp', type: 'sea', classes: ['e'], name: 'СП' },
      { kind: 'rw_teus', type: 'rail', classes: ['bg', 's'], name: 'TEUS' },
      { kind: 'rw_lcl', type: 'rail', classes: ['bg'], name: 'LCL' },
      { kind: 'rw_sp', type: 'rail', classes: ['bg', 'e'], name: 'СП' },
    ];
  responsibilities: Responsibilities = {};

  destCountries: Country[] = [];
  disabled: boolean = false;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const homeCountryChange = changes['homeCountry'];
    if (homeCountryChange) {
      if (homeCountryChange.previousValue) {
        delete this.responsibilities[homeCountryChange.previousValue.id];
      }
      if (homeCountryChange.currentValue) {
        const homeCountryId = this.homeCountry.id;
        delete this.responsibilities[homeCountryChange.currentValue.id];
        this.destCountries = this.destCountries.filter(({ id }) => id !== homeCountryId);
      }
    }
  }

  writeValue(responsibilityParam: Responsibilities): void {
    this.responsibilities = responsibilityParam || {};
    this.destCountries = Object.keys(this.responsibilities)
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

  ngOnInit(): void {

  }

  doFilter(country: Country | string): void {
    this.filteredCountries = this.countries.filter(c => {
      const value = typeof country === 'string' ? country : country.name!
      return c.name!.toLowerCase().includes(value.toLowerCase()) && !(c.id in this.responsibilities);
    });
  }

  displayFn(country: Country): string {
    return country && country.name ? country.name : '';
  }

  addCountry(): void {
    this.destCountries.push(this.country!);
    this.destCountries.sort(byName);
    this.responsibilities[this.country!.id] = [];
    this.country = undefined;
    this.valueChanged();
  }

  getCountryById(id: string | number): Country | undefined {
    return this.countries.find(country => country.id === Number(id));
  }

  removeCountry(countryId: number | string): void {
    const index = this.destCountries.findIndex(({ id }) => id === Number(countryId))
    if (index >= 0) {
      this.destCountries.splice(index, 1);
    }
    delete this.responsibilities[countryId];
    this.valueChanged();
  }


  allChecked(): boolean {
    const countChecked = this.getCountChecked();
    return this.destCountries.length > 0 && countChecked === this.destCountries.length * TransportSubKinds.length;
  }

  allComplete(): boolean {
    const countChecked = this.getCountChecked();
    return countChecked === 0 || countChecked === this.destCountries.length * TransportSubKinds.length;
  }

  private getCountChecked(): number {
    return this.destCountries.map(({ id }) => this.responsibilities[id].length).reduce((sum, count) => sum + count, 0);
  }

  allChange({ checked }: MatCheckboxChange): void {
    this.destCountries.forEach(({ id }) => this.responsibilities[id] = checked ? [...TransportSubKinds] : []);
    this.valueChanged();
  }

  allCheckedForKind(kind: TransportSubKind): boolean {
    return this.destCountries.length > 0 && this.getCheckedForKind(kind) === this.destCountries.length;
  }

  allCompleteForKind(kind: TransportSubKind): boolean {
    const checked = this.getCheckedForKind(kind);
    return checked === 0 || checked === this.destCountries.length;
  }

  private getCheckedForKind(kind: TransportSubKind): number {
    return this.destCountries.map(({ id }) => this.responsibilities[id].includes(kind)).reduce((sum, checked) => checked ? sum + 1 : sum, 0)
  }

  allChangeForKind(kind: TransportSubKind, { checked }: MatCheckboxChange): void {
    this.destCountries.forEach(({ id }) => {
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
    if (this.homeCountry) {
      const value = { ...this.responsibilities };
      delete value[this.homeCountry.id];
      this.onChange(value);
      this.onTouched();
    }
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}

const byName = (a: Country, b: Country) => a.name!.localeCompare(b.name!);
