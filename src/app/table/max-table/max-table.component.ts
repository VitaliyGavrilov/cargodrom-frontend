import { SearchFilterSchema } from '../../api/custom_models';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { LoadParams, Table } from '../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
import { RequestService } from 'src/app/api/services';
import { Request, RequestFilter } from 'src/app/api/custom_models/request';
import { TableConstructor } from './table-constructor';

@Component({
  selector: 'app-max-table',
  templateUrl: './max-table.component.html',
  styleUrls: ['./max-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FilterService]
})

export class MaxTable extends TableConstructor <any, 'id', any> {

  @Input() rowsData?:any;
  @Input() schemaData?:any;


  sortField = 'id' as const;

  constructor(
    filterService: FilterService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
  ) {
    super(route, router, dialog, snackBar, filterService);
  }

  getTableRows(params?: LoadParams<any, any>): Observable<{ total: number; items: any[];sort_new:any; }> {
    return this.rowsData
  }

  getTableConfig(): Observable<any>  {
    return this.schemaData;
  }



}
