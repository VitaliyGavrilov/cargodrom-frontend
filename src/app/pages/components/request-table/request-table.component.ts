import { SearchFilterSchema } from '../../../api/custom_models';
import { Component, ViewEncapsulation } from '@angular/core';
import { LoadParams, Table } from 'src/app/shared/classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
import { RequestService } from 'src/app/api/services';
import { Request, RequestFilter } from 'src/app/api/custom_models/request';
import { TablePage } from 'src/app/shared/classes/table-page';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FilterService]
})

export class RequestTableComponent extends TablePage<Request, 'id', RequestFilter> {
  sortField = 'id' as const;

  params:any;

  // trackById = (_index: number, request: Request) => request.id!;

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


  load<Request>(params?: LoadParams<Request, RequestFilter>): Observable<{ total: number; items: Request[];sort_new:any; }> {
    this.params=params;
    return this.requestService.requestList(params as any) as unknown as Observable<{ total: number; items: Request[]; column: string[], sort?: string[],sort_new:any }>;
  }

  protected override loadFilterSchemaTest(): Observable<any>  {
    return this.requestService.requestListParam().pipe(map(val => val as any));
  }

  // protected override loadFilterSchema<T>(): Observable<SearchFilterSchema> {
  //   return this.requestService.requestListSearch().pipe(map(val => val as SearchFilterSchema));
  // }

  protected override exportData(): Observable<{data: string; name: string}> {
    return this.requestService.requestExport(this.params as any) as Observable<{data: string; name: string}>;
  }

  protected override importData(body: {data: string; name: string}) {
    return this.requestService.requestImport({body}) as any;
  }

  protected override importDataConfirm(body: {import_key: string}) {
    return this.requestService.requestImportConfirm({import_key: body.import_key});
  }

  protected override importResult(body: {import_key: string}) {
    return this.requestService.requestImportResult({import_key: body.import_key})
  }

  protected override importTemplate(): Observable<{data: string; name: string}> {
    return this.requestService.requestImportTemplate(this.filter as any) as Observable<{data: string; name: string}>;
  }

  navigateOnDetails(requestId:any){
    this.router.navigate(['request/details/customs', requestId])
  }
}
