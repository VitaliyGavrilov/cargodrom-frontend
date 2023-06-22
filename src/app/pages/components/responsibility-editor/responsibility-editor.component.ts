import { TransportSubKinds, TransportSubKind } from './../../../api/custom_models/transport';
import { AllResponsibilities, Responsibilities } from './../../../api/custom_models/contact';
import { Country } from './../../../api/custom_models/country';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-responsibility-editor',
  templateUrl: './responsibility-editor.component.html',
  styleUrls: ['./responsibility-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ResponsibilityEditorComponent
    }
  ]
})
export class ResponsibilityEditorComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() countries: Country[] = [];
  @Input() homeCountryId?: number;
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
  local: TransportSubKind[] = [];

  destCountries: Country[] = [];
  homeCountry?: Country;

  constructor(
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const homeCountryChange = changes['homeCountryId'];
    if (homeCountryChange) {
      if (homeCountryChange.previousValue) {
        delete this.responsibilities[homeCountryChange.previousValue];
      }
      if (homeCountryChange.currentValue) {
        this.homeCountry = this.getCountryById(homeCountryChange.currentValue);
        if (this.homeCountry) {
          const homeCountryId = this.homeCountry.id;
          this.responsibilities[homeCountryId] = [];
          this.destCountries = this.destCountries.filter(({ id }) => id !== homeCountryId);
        }
      }
    }
  }

  writeValue(responsibilityParam: AllResponsibilities): void {
    this.responsibilities = responsibilityParam.import || [];
    this.destCountries = Object.keys(this.responsibilities)
      .filter(countryId => Number(countryId) !== this.homeCountryId)
      .map(countryId => this.getCountryById(countryId)!)
      .sort(byName);
    this.local = responsibilityParam.local || [];
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

  allCheckedForCountry(countryId?: number | string): boolean {
    const kinds = countryId ? this.responsibilities[countryId] : this.local ;
    return kinds.length === TransportSubKinds.length;
  }
  
  allCompleteForCountry(countryId?: number | string): boolean {
    const kinds = countryId ? this.responsibilities[countryId] : this.local ;
    return kinds.length === TransportSubKinds.length || kinds.length === 0;
  }

  allChangeForCountry(countryId: number | string | undefined, { checked }: MatCheckboxChange): void {
    if (checked) {
      if (countryId) {
        this.responsibilities[countryId] = [...TransportSubKinds];
      } else {
        this.local = [...TransportSubKinds];
      }
    } else {
      if (countryId) {
        this.responsibilities[countryId] = [];
      } else {
        this.local = [];
      }
    }
    this.valueChanged();
  }

  checkedForCountryAndKind(countryId: number | string | undefined, kind: TransportSubKind): boolean {
    const kinds = countryId ? this.responsibilities[countryId] : this.local;
    return kinds.includes(kind);
  }

  changeForCountryAndKind(countryId: number | string | undefined, kind: TransportSubKind, { checked }: MatCheckboxChange): void {
    const kinds = countryId ? this.responsibilities[countryId] : this.local;
    if (checked) {
      kinds.push(kind);
    } else {
      if (countryId) {
        this.responsibilities[countryId] = kinds.filter(aKind => kind !== aKind);
      } else {
        this.local = kinds.filter(aKind => kind !== aKind);
      }
    }
    this.valueChanged();
  }
  
  valueChanged(): void {
    if (this.homeCountryId) {
      const rLocal = this.local;
      const rImport = {...this.responsibilities};
      delete rImport[this.homeCountryId]; 
      this.onChange({import: rImport, export: [], local: rLocal});
      this.onTouched();
    }
  }

}

const byName = (a: Country, b: Country) => a.name!.localeCompare(b.name!);

