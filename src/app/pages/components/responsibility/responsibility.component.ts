import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Country, AreaOfResponsibility } from 'src/app/api/custom_models';
import { TransportSubKind, TransportSubKinds } from 'src/app/api/custom_models/transport';
import { transportSubKindTable, unknownCountry } from '../../../constants';


@Component({
  selector: 'app-responsibility',
  templateUrl: './responsibility.component.html',
  styleUrls: ['./responsibility.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ResponsibilityComponent
    }
  ]
})
export class ResponsibilityComponent implements ControlValueAccessor, OnInit {
  @Input() countries: Country[] = [];
  @Input() homeCountry: Country = unknownCountry;
  @Input() type: 'import' | 'export' = 'export';
  onChange = (value: any) => { };
  onTouched = () => { };

  country?: Country;
  filteredCountries: Country[] = [];
  kinds = transportSubKindTable;
  directions: AreaOfResponsibility[]=[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  writeValue(responsibilityParam: AreaOfResponsibility[]): void {
    console.log('writeValue',responsibilityParam);
    this.directions.push(...responsibilityParam);
    if(this.directions.length===0){
      this.addDirection();
    }

  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  addDirection(){
    this.directions.push({
      direction_departure: undefined,
      direction_arrival: undefined,
      direction_items:[]
    });

    console.log(this.directions);
    this.valueChanged();
  }

  removeDirection(countryId: number ): void {
    this.directions.splice(countryId, 1);
    this.valueChanged();
  }

  allChecked(): boolean {
    const countChecked = this.getCountChecked();
    return this.directions.length > 0 && countChecked === this.directions.length * TransportSubKinds.length;
  }

  allComplete(): boolean {
    const countChecked = this.getCountChecked();
    return countChecked === 0 || countChecked === this.directions.length * TransportSubKinds.length;
  }

  private getCountChecked(): number {
    return this.directions.map((e) => e.direction_items!.length).reduce((sum, count) => sum + count, 0);
  }

  allChange({ checked }: any): void {
    this.directions.forEach(( e) => e.direction_items = checked ? [...TransportSubKinds] : []);
    this.valueChanged();
  }

  allCheckedForKind(kind: TransportSubKind): boolean {
    return this.directions.length > 0 && this.getCheckedForKind(kind) === this.directions.length;
  }

  allCompleteForKind(kind: TransportSubKind): boolean {
    const checked = this.getCheckedForKind(kind);
    return checked === 0 || checked === this.directions.length;
  }

  private getCheckedForKind(kind: TransportSubKind): number {
    return this.directions.map(( e ) => e.direction_items?.includes(kind)).reduce((sum, checked) => checked ? sum + 1 : sum, 0)
  }

  allChangeForKind(kind: TransportSubKind, { checked }: MatCheckboxChange): void {
    this.directions.forEach((e) => {
      const kinds = e.direction_items;
      if (checked) {
        if (!kinds?.includes(kind)) {
          kinds?.push(kind);
        }
      } else {
        e.direction_items = kinds?.filter(aKind => aKind !== kind);
      }
    });
    this.valueChanged();
  }

  allCheckedForCountry(i: number ): boolean {
    const kinds = this.directions[i].direction_items;
    return kinds?.length === TransportSubKinds.length;
  }

  allCompleteForCountry(i: number): boolean {
    const kinds = this.directions[i].direction_items;
    return kinds?.length === TransportSubKinds.length || kinds?.length === 0;
  }

  allChangeForCountry(i: number , { checked }: MatCheckboxChange): void {
    if (checked) {
      this.directions[i].direction_items = [...TransportSubKinds];
    } else {
      this.directions[i].direction_items = [];
    }
    this.valueChanged();
  }

  checkedForCountryAndKind(i: number, kind: TransportSubKind): boolean {
    const kinds = this.directions[i].direction_items;
    return kinds? kinds.includes(kind) : false;
  }

  changeForCountryAndKind(i: number, kind: TransportSubKind, { checked }: MatCheckboxChange): void {
    const kinds = this.directions[i].direction_items;
    if (checked) {
      kinds?.push(kind);
    } else {
      this.directions[i].direction_items = kinds?.filter(aKind => kind !== aKind);
    }
    this.valueChanged();
  }

  valueChanged(): void {
    const value = [ ...this.directions ];
    this.onChange(value);
    this.onTouched();
  }
}

