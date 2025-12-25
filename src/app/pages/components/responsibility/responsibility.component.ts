import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {  MatCheckboxChange } from '@angular/material/checkbox';
import { Country, AreaOfResponsibility } from 'src/app/api/custom_models';
import { TransportSubKind, TransportSubKinds } from 'src/app/api/custom_models/transport';
import { transportSubKindTable, unknownCountry } from 'src/app/shared/constants';
import { TransportService } from 'src/app/api/services/transport.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


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
  @Input() requiredDirection: boolean=false;
  onChange = (value: any) => { };
  onTouched = () => { };
  private _destroy$ = new Subject();

  country?: Country;
  filteredCountries: Country[] = [];
  // kinds = transportSubKindTable;
  kinds:any
  transportSubKindsLength:number=0;
  allTransportSubKinds:any;
  directions: AreaOfResponsibility[]=[];

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 3000 };

  constructor(
    private transportService: TransportService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getTransportSubKind()
  }

  ngOnChanges(changes: SimpleChanges): void {


  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
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

  setClassIcon(kind:any){
    let classIcon='';
    if(kind.kind_id===1) classIcon='air';
    if(kind.kind_id===2) classIcon='road';
    if(kind.kind_id===3) classIcon='rail';
    if(kind.kind_id===4) classIcon='sea';
    return classIcon;
  }

  // setClassTh(){

  // }

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
    // return this.directions.length > 0 && countChecked === this.directions.length * TransportSubKinds.length;
    return this.directions.length > 0 && countChecked === this.directions.length * this.transportSubKindsLength;
  }

  allComplete(): boolean {
    const countChecked = this.getCountChecked();
    // return countChecked === 0 || countChecked === this.directions.length * TransportSubKinds.length;
    return countChecked === 0 || countChecked === this.directions.length * this.transportSubKindsLength;
  }

  private getCountChecked(): number {
    return this.directions.map((e) => e.direction_items!.length).reduce((sum, count) => sum + count, 0);
  }

  allChange({ checked }: any): void {
    // this.directions.forEach(( e) => e.direction_items = checked ? [...TransportSubKinds] : []);
    this.directions.forEach(( e) => e.direction_items = checked ? this.allTransportSubKinds : []);
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
    // return kinds?.length === TransportSubKinds.length;
    return this.transportSubKindsLength === kinds?.length  ;
  }

  allCompleteForCountry(i: number): boolean {
    const kinds = this.directions[i].direction_items;
    // return kinds?.length === TransportSubKinds.length || kinds?.length === 0;
    return kinds?.length === this.transportSubKindsLength || kinds?.length === 0;
  }

  allChangeForCountry(i: number , { checked }: MatCheckboxChange): void {
    if (checked) {
      // this.directions[i].direction_items = [...TransportSubKinds];
      this.directions[i].direction_items = this.allTransportSubKinds;



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
    console.log(123123123);

  }

  // Приватные методы
  // получаем перевозчиков(airline and airline iata)
  private getTransportSubKind():void{
    this.transportService.transportSubKind()
      .pipe(
        tap((transportCarrier:any) => {
          console.log(transportCarrier);

          if (!transportCarrier) {
            throw ({ error: { error_message: `Перевозчиков не существует` } });
          }
        }),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (transportCarrier) => {
          const sorted = transportCarrier.sort((user1:any, user2:any) => user1['kind_id'] > user2['kind_id'] ? 1 : -1);
          this.kinds=sorted;
          this.transportSubKindsLength=this.kinds.length;
          let test:any=[];
          sorted.forEach((i:any)=>{
            test.push(i.id)
          })
          this.allTransportSubKinds=test
          console.log(this.allTransportSubKinds);

        },
        error: (err: any) => {
          this.snackBar.open(`Ошибка запроса перевозчиков: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }
}

