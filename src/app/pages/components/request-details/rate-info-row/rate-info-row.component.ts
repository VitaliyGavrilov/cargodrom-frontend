import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-rate-info-row',
  templateUrl: './rate-info-row.component.html',
  styleUrls: ['./rate-info-row.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class RateInfoRow {
  @Input() rate?: any;
  @Input() detailsMethod?: string;
  @Input() costClass?: string;
  @Input() percent?:number

  constructor(
    private sanitizer: DomSanitizer
  ) {}

  // yandexMapUrl(address:any):any {
  //   console.log(address);
  //   const adr='?????? 142015, Московская область, г. Домодедово, территория "Аэропорт "Домодедово", строение 7/1'
  //   return this.sanitizeUrl(`https://yandex.ru/maps/-/${address}`);
  // }


  // sanitizeUrl(url: string): any {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  // }
  // sort(arr:any):any{
  //   return arr?.sort((a:any, b:any) => b.select > a.select ? 1 : -1);
  // }
}
