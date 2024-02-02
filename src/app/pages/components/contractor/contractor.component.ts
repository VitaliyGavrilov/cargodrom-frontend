import { ContractorFilter } from './../../../api/custom_models/contractor-filter';
import { ContractorService } from './../../../api/services/contractor.service';
import { Component } from '@angular/core';
import { Contractor, SearchFilterSchema } from '../../../api/custom_models';
import { LoadParams, Table } from '../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.scss'],
  providers: [FilterService]
})

export class ContractorComponent extends Table<Contractor, 'trade_rating', ContractorFilter> {
  sortField = 'name' as const;
  
  trackById = (_index: number, contractor: Contractor) => contractor.id!;

  constructor(
    private contractorService: ContractorService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
    filter: FilterService,
  ) {
    super(route, router, dialog, snackBar, filter);
    this.registerAlias('trade_rating', ['trade_count', 'trade_success_count', 'trade_fail_count']);
  }

  load<Contractor>(params: LoadParams<Contractor, ContractorFilter>): Observable<{ total: number; items: Contractor[]; }> {
    return this.contractorService.contractorList(params as any) as unknown as Observable<{ total: number; items: Contractor[]; }>;
  }

  protected override loadFilterSchema(): Observable<SearchFilterSchema> {
    return this.contractorService.contractorListSearch().pipe(map(val => val as SearchFilterSchema));
  }
  
  protected override exportData(): Observable<any> {
    return this.contractorService.contractorExport().pipe(tap(data => console.log(`data`, data)));
  }
  
  protected override importData(payload: any): Observable<any> {
    return of({});
  }

}
