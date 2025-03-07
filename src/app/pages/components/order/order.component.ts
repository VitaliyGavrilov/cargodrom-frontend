import { Component, OnInit } from '@angular/core';

import { CustomerService } from './../../../api/services/customer.service';
import { Client, ClientFilter, SearchFilterSchema } from './../../../api/custom_models';
import {  ViewEncapsulation } from '@angular/core';
import { LoadParams, Table } from '../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
import { OrderService } from 'src/app/api/services';

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

  constructor(
    private orderService: OrderService,
    filterService: FilterService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
  ) {
    super(route, router, dialog, snackBar, filterService);
  }

  load<Client>(params: LoadParams<Client, ClientFilter>): Observable<{ total: number; items: Client[]; }> {
    this.params=params;
    return this.orderService.orderList(params as any) as unknown as Observable<{ total: number; items: Client[]; column: string[], sort: string[] }>;
  }

  protected override loadFilterSchemaTest(): Observable<any>  {
    return this.orderService.orderListParam().pipe(map(val => val as any));
  }

  // protected override exportData(): Observable<{data: string; name: string}> {
  //   return this.customerService.customerExport(this.params as any) as Observable<{data: string; name: string}>;
  // }

  // protected override importData(body: {data: string; name: string}) {
  //   return this.customerService.customerImport({body}) as any;
  // }

  // protected override importDataConfirm(body: {import_key: string}) {
  //   return this.customerService.customerImportConfirm({import_key: body.import_key});
  // }

  // protected override importResult(body: {import_key: string}) {
  //   return this.customerService.customerImportResult({import_key: body.import_key})
  // }

  // protected override importTemplate(): Observable<{data: string; name: string}> {
  //   return this.customerService.customerImportTemplate(this.filter as any) as Observable<{data: string; name: string}>;
  // }

  getVal(obj: any, path: string): any {
    if (!path?.includes('/')) {
        return obj[path] !== undefined ? obj[path] : null;
    }
    const keys = path?.split('/');
    for (const key of keys) {
      if (obj && obj.hasOwnProperty(key)) {
          obj = obj[key];
      } else {
          return null; // Если ключ не найден, возвращаем null
      }
    }
    return obj !== undefined ? obj : null; // Проверка на undefined
  }
}
