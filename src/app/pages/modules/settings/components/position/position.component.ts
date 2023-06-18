import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Position } from './../../../../../api/custom_models/position';
import { CompanyService } from './../../../../../api/services/company.service';
import { Component } from '@angular/core';
import { Table } from '../../../../../classes';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SortColumn } from 'src/app/api/custom_models/sort-column';
import { FilterService } from 'src/app/filter/services/filter.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: [
    './position.component.scss',
    '../../main-table.scss'
  ],
  providers: [FilterService]
})
export class PositionComponent extends Table<Position> {
  
  override removedMessage = `Должность удалена`;
  sortField = 'name' as keyof Position;

  constructor(
    private companyService: CompanyService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
    filter: FilterService,

  ) {
    super(route, router, dialog, snackBar, filter);
  }

  load<Position>(params: { start?: number; count?: number; sort?: SortColumn<Position>[]; }): Observable<{ total: number; items: Position[]; }> {
    return this.companyService.companyPositionList(params as any) as unknown as Observable<{ total: number; items: Position[]; }>;
  }

  override delete(params: { body: { id: number; } }): Observable<void> {
    return this.companyService.companyPositionDelete(params) as unknown as Observable<void>;
  }

}


