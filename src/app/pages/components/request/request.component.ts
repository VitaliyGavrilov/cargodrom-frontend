import { CustomerService } from './../../../api/services/customer.service';
import { Client, ClientFilter, SearchFilterSchema } from './../../../api/custom_models';
import { Component, ViewEncapsulation } from '@angular/core';
import { LoadParams, Table } from '../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
import { RequestService } from 'src/app/api/services';
import { Request, RequestFilter } from 'src/app/api/custom_models/request';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  providers: [FilterService]
})
export class RequestComponent extends Table<Request, 'id', RequestFilter> {
  sortField = 'id' as const;


  trackById = (_index: number, request: Request) => request.id!;

  constructor(
    private requestService: RequestService,

    filterService: FilterService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
  ) {
    super(route, router, dialog, snackBar, filterService);
  }

  load<Request>(params: LoadParams<Request, RequestFilter>): Observable<{ total: number; items: Request[]; }> {
    return this.requestService.requestList(params as any) as unknown as Observable<{ total: number; items: Request[]; column: string[], sort: string[] }>;
  }

  protected override loadFilterSchema<T>(): Observable<SearchFilterSchema> {
    return this.requestService.requestListSearch().pipe(map(val => val as SearchFilterSchema));
  }

}
