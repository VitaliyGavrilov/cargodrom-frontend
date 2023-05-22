import { ActivatedRoute, Router } from '@angular/router';
import { Table } from '../../../../../classes';
import { ClientGroup } from './../../../../../api/custom_models/client-group';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SortColumn } from 'src/app/api/custom_models/sort-column';
import { CompanyService } from 'src/app/api/services';

@Component({
  selector: 'app-client-group',
  templateUrl: './client-group.component.html',
  styleUrls: [
    './client-group.component.scss',
    '../../main-table.scss'
  ]
})
export class ClientGroupComponent extends Table<ClientGroup> {

  override removedMessage = `Группа клиентов удалена`;
  sortField = 'name' as keyof ClientGroup;

  constructor(
    private companyService: CompanyService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
  ) {
    super(route, router, dialog, snackBar);
  }

  load<ClientGroup>(params: { start?: number; count?: number; sort?: SortColumn<ClientGroup>[]; }): Observable<{ total: number; items: ClientGroup[]; }> {
    // TODO: Update with correct service name
    return this.companyService.companyPositionList(params as any) as unknown as Observable<{ total: number; items: ClientGroup[]; }>;
  }

  override delete(params: { body: { id: number; } }): Observable<void> {
    return this.companyService.companyPositionDelete(params) as unknown as Observable<void>;
  }

}
