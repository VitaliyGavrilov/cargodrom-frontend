import { ContractorFilter } from './../../../api/custom_models/contractor-filter';
import { ContractorService } from './../../../api/services/contractor.service';
import { Component } from '@angular/core';
import { Contractor, SearchFilterSchema } from '../../../api/custom_models';
import { LoadParams, Table } from '../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.scss'],
  providers: [FilterService]
})

export class ContractorComponent extends Table<Contractor, 'trade_rating', ContractorFilter> {
  sortField = 'name' as const;

  params:any;

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
    this.params=params;
    return this.contractorService.contractorList(params as any) as unknown as Observable<{ total: number; items: Contractor[]; }>;
  }

  protected override loadFilterSchema(): Observable<SearchFilterSchema> {
    return this.contractorService.contractorListSearch().pipe(map(val => val as SearchFilterSchema));
  }

  protected override exportData(): Observable<{data: string; name: string}> {
    return this.contractorService.contractorExport(this.params as any) as Observable<{data: string; name: string}>;
  }

  protected override importData(body: {data: string; name: string}) {
    return this.contractorService.contractorImport({body}) as any;
  }

  protected override importDataConfirm(body: {import_key: string}) {
    return this.contractorService.contractorImportConfirm({import_key: body.import_key});
  }

  protected override importResult(body: {import_key: string}) {
    return this.contractorService.contractorImportResult({import_key: body.import_key})
  }

  protected override importTemplate(): Observable<{data: string; name: string}> {
    return this.contractorService.contractorImportTemplate(this.filter as any) as Observable<{data: string; name: string}>;
  }

}
