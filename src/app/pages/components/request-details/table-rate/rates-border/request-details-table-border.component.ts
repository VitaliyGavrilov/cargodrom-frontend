import { ContractorFilter } from './../../../../../api/custom_models/contractor-filter';
import { ContractorService } from './../../../../../api/services/contractor.service';
import { Component } from '@angular/core';
import { Contractor, SearchFilterSchema } from '../../../../../api/custom_models';
import { LoadParams, Table } from '../../../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
import { RequestService } from 'src/app/api/services';
import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-request-details-table-border',
  templateUrl: './request-details-table-border.component.html',
  styleUrls: ['./request-details-table-border.component.scss'],
  providers: [FilterService],
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed,void', style({height: '0px', minHeight: '0', })),
  //     state('expanded', style({height: '*',})),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ]),
  // ],
})

export class RequestDetailsTableBorderComponent extends Table<Contractor, 'trade_rating', ContractorFilter> {
  sortField = 'name' as const;

  expandedElement: any | null;

  params:any;

  trackById = (_index: number, contractor: Contractor) => contractor.id!;

  constructor(
    private contractorService: ContractorService,
    private requestService: RequestService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
    filter: FilterService,
  ) {
    super(route, router, dialog, snackBar, filter);
    this.registerAlias('trade_rating', ['trade_count', 'trade_success_count', 'trade_fail_count']);
  }
  //методы для таблицы
  load<Contractor>(params: LoadParams<Contractor, ContractorFilter>): Observable<{ total: number; items: Contractor[]; }> {
    this.params=params;
    return this.contractorService.contractorList(params as any) as unknown as Observable<{ total: number; items: Contractor[]; }>;


  }
  protected override loadFilterSchemaTest(): Observable<any>  {
    return this.contractorService.contractorListParam().pipe(map(val => val as any));
  }
  protected override loadFilterSchema(): Observable<SearchFilterSchema> {
    return this.contractorService.contractorList().pipe(map(val => val as SearchFilterSchema));
  }
  //методы для импорта экспорта
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
    return this.contractorService.contractorImportResult({import_key: body.import_key});
  }
  protected override importTemplate(): Observable<{data: string; name: string}> {
    return this.contractorService.contractorImportTemplate(this.filter as any) as Observable<{data: string; name: string}>;
  }
  //методы для торгов
  protected override requestContractorSelectGet(id:number): Observable<any> {
    return this.requestService.requestContractorSelectGet({id:id});
  }
  protected override requestContractorSelectUpdate(body: {id: number; contractor_id: number[],checked:boolean}) {
    return this.requestService.requestContractorSelectUpdate({body});
  }
  protected override requestInfo(id: number) {
    return this.requestService.requestInfo({id:id});
  }
  protected override requestSaveBidding(body:{id:number,confirm: boolean}){
    return this.requestService.requestSaveBidding({body})
  }

  getSpecializationClass(n:number){
    let classSpec='';
    if(n===1)classSpec='avia';
    if(n===2)classSpec='road';
    if(n===3)classSpec='rw';
    if(n===4)classSpec='sea';
    return classSpec;
  }

  test(e:any){
    console.log(e);
    console.log(this.column);
    console.log(this.rows);



  }
}
