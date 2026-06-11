import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {  MatCheckboxChange } from '@angular/material/checkbox';
import { Country, AreaOfResponsibility } from 'src/app/api/custom_models';
import { TransportSubKind, TransportSubKinds } from 'src/app/api/custom_models/transport';
import { transportSubKindTable, unknownCountry } from 'src/app/shared/constants';
import { TransportService } from 'src/app/api/services/transport.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/shared/classes/base-component';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/shared/services/navigation.service';


@Component({
  selector: 'page-request-delivery-rates',
  templateUrl: './request-delivery-rates.page.html',
  styleUrls: ['./request-delivery-rates.page.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class RequestDeliveryRatesPage extends BaseComponent implements OnInit {

  uid:string='';

  charges:any;
  transportationTypes:any;
  transportTypes:any;

  request:any;
  contarctor:any;

  constructor(
    private navigate: NavigationService,
  ) {
    super();
  }

  ngOnInit(): void {
    const uid=this.navigate.getUidFromRoute();
    if(uid!=null) this.uid=uid;

  }

  private getRates(){

  }
  private updateRates(){

  }
}
