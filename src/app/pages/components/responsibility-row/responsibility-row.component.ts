import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Country, Responsibilities, AllResponsibilities } from 'src/app/api/custom_models';
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
export class ResponsibilityRowComponent implements OnInit {

  @Input() homeCountry!: Country;
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
  local: TransportSubKind[] = [];

  constructor(
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {

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

  ngOnInit(): void {

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

}

const byName = (a: Country, b: Country) => a.name!.localeCompare(b.name!);


