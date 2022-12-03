import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Position } from './../../../../../api/custom_models/position';
import { CompanyService } from './../../../../../api/services/company.service';
import { Component } from '@angular/core';
import { SettingsTable } from '../../classes/settings-table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SortColumn } from 'src/app/api/custom_models/sort-column';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: [
    './position.component.scss',
    '../../main-table.scss'
  ]
})
export class PositionComponent extends SettingsTable<Position> {
  
  removedMessage = `Должность удалена`;
  sortField = 'name' as keyof Position;

  constructor(
    private companyService: CompanyService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
  ) {
    super(route, router, dialog, snackBar);
  }

  load<Position>(params: { start?: number; count?: number; sort?: SortColumn<Position>[]; }): Observable<{ total: number; items: Position[]; }> {
    return this.companyService.companyPositionList(params as any) as unknown as Observable<{ total: number; items: Position[]; }>;
  }

  delete(params: { body: { id: number; } }): Observable<void> {
    return this.companyService.companyPositionDelete(params) as unknown as Observable<void>;
  }

}


