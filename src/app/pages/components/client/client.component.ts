import { CustomerService } from './../../../api/services/customer.service';
import { Client, ClientFilter } from './../../../api/custom_models';
import { Component, ViewEncapsulation } from '@angular/core';
import { LoadParams, Table } from '../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClientComponent extends Table<Client, 'name', ClientFilter> {
  sortField = 'name' as const;
  
  
  trackById = (_index: number, client: Client) => client.id!;
  search$: Observable<any>;

  constructor(
    private customerService: CustomerService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
  ) {
    super(route, router, dialog, snackBar);
    this.search$ = this.customerService.customerListSearch();
  }
  
  load<Client>(params: LoadParams<Client, ClientFilter>): Observable<{ total: number; items: Client[]; }> {
    return this.customerService.customerList(params as any) as unknown as Observable<{ total: number; items: Client[]; column: string[], sort: string[] }>;
  }

}
