import { ActivatedRoute, Router } from '@angular/router';
import { Table } from '../../../../../classes';
import { ClientGroup } from './../../../../../api/custom_models/client-group';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SortColumn } from 'src/app/api/custom_models/sort-column';
import { CustomerService } from 'src/app/api/services';
import { FilterService } from 'src/app/filter/services/filter.service';

@Component({
  selector: 'app-client-group',
  templateUrl: './client-group.component.html',
  styleUrls: [
    './client-group.component.scss',
    '../../main-table.scss'
  ],
  providers: [FilterService]
})
export class ClientGroupComponent extends Table<ClientGroup> {

  override removedMessage = `Группа клиентов удалена`;
  sortField = 'name' as keyof ClientGroup;

  constructor(
    private customerService: CustomerService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
    filter: FilterService,
  ) {
    super(route, router, dialog, snackBar, filter);
  }

  load<ClientGroup>(params: { start?: number; count?: number; sort?: SortColumn<ClientGroup>[]; }): Observable<{ total: number; items: ClientGroup[]; }> {
    
    return this.customerService.customerGroupList(params as any) as unknown as Observable<{ total: number; items: ClientGroup[]; }>;
  }

  override delete(params: { body: { id: number; } }): Observable<void> {
    return this.customerService.customerGroupDelete(params) as unknown as Observable<void>;
  }

}
