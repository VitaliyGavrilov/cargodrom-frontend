import { ContractorFilter } from './../../../api/custom_models/contractor-filter';
import { ContractorService } from './../../../api/services/contractor.service';
import { Component } from '@angular/core';
import { Contractor } from '../../../api/custom_models';
import { LoadParams, Table } from '../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.scss']
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
  ) {
    super(route, router, dialog, snackBar);
    this.registerAlias('trade_rating', ['trade_count', 'trade_success_count', 'trade_fail_count']);
  }
  
  load<Contractor>(params: LoadParams<Contractor, ContractorFilter>): Observable<{ total: number; items: Contractor[]; }> {
    return this.contractorService.contractorList(params as any) as unknown as Observable<{ total: number; items: Contractor[]; }>;
  }

}
