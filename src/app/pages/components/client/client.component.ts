import { CustomerService } from './../../../api/services/customer.service';
import { Client, ClientFilter, SearchFilterSchema } from './../../../api/custom_models';
import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { LoadParams, Table } from '../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, takeUntil, tap } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
import { UserService } from 'src/app/api/services';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FilterService],
})
export class ClientComponent extends Table<Client, 'name', ClientFilter> {
  sortField = 'name' as const;
  importMetods:any;
  params:any;
  trackById = (_index: number, client: Client) => client.id!;

  constructor(
    private customerService: CustomerService,
    filterService: FilterService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
    userService:UserService,
  ) {
    super(route, router, dialog, snackBar, filterService, userService);
    this.importMetods = {
      import: this.customerService.customerImport.bind(this.customerService),
      import_res: this.customerService.customerImportResult.bind(this.customerService),
      import_con: this.customerService.customerImportConfirm.bind(this.customerService),
    }
  }

  load<Client>(params: LoadParams<Client, ClientFilter>): Observable<{ total: number; items: Client[]; }> {
    this.params=params;
    console.log(params);
    
    return this.customerService.customerList(params as any) as unknown as Observable<{ total: number; items: Client[]; column: string[], sort: string[] }>;
  }

  protected override loadFilterSchemaTest(): Observable<any>  {
    return this.customerService.customerListParam().pipe(map(val => val as any));
  }

  protected override loadFilterSchema<T>(): Observable<SearchFilterSchema> {
    return this.customerService.customerList().pipe(map(val => val as SearchFilterSchema));
  }

  protected override exportData(): Observable<{data: string; name: string}> {
    return this.customerService.customerExport(this.params as any) as Observable<{data: string; name: string}>;
  }

  protected override importData(body: {data: string; name: string}) {
    return this.customerService.customerImport({body}) as any;
  }

  protected override importDataConfirm(body: {import_key: string}) {
    return this.customerService.customerImportConfirm({import_key: body.import_key});
  }

  protected override importResult(body: {import_key: string}) {
    return this.customerService.customerImportResult({import_key: body.import_key})
  }

  protected override importTemplate(): Observable<{data: string; name: string}> {
    return this.customerService.customerImportTemplate(this.filter as any) as Observable<{data: string; name: string}>;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.resizeMetod='customer_list';
  }

}

