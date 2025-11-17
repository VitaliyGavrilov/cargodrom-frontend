import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { CustomerService } from './../../../api/services/customer.service';
import { Client, ClientFilter, SearchFilterSchema } from './../../../api/custom_models';
import {  ViewEncapsulation } from '@angular/core';
import { LoadParams, Table } from 'src/app/shared/classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
import { OrderService, UserService } from 'src/app/api/services';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FilterService],
})
export class OrderComponent extends Table<Client, 'name', ClientFilter> {
  sortField = 'name' as const;
  importMetods:any;
  params:any;
  trackById = (_index: number, client: Client) => client.id!;

  @ViewChild('analyticsPopap') analyticsPopap!: TemplateRef<void>;

  constructor(
    private orderService: OrderService,
    private matDialog: MatDialog,
    filterService: FilterService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
    userService:UserService,
  ) {
    super(route, router, dialog, snackBar, filterService,userService);
    this.resizeMetod='order_list';
  }

  load<Client>(params: LoadParams<Client, ClientFilter>): Observable<{ total: number; items: Client[]; }> {
    this.params=params;
    return this.orderService.orderList(params as any) as unknown as Observable<{ total: number; items: Client[]; column: string[], sort: string[] }>;
  }

  protected override loadFilterSchemaTest(): Observable<any>  {
    return this.orderService.orderListParam().pipe(map(val => val as any));
  }

  openAnalytics(){
    this.matDialog.open(this.analyticsPopap, { panelClass: 'popap-analytics' }).afterClosed().subscribe(res => {
    });

  }

}
