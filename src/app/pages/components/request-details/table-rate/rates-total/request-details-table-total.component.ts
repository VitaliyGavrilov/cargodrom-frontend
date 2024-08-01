import { ContractorFilter } from '../../../../../api/custom_models/contractor-filter';
import { ContractorService } from '../../../../../api/services/contractor.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Contractor, SearchFilterSchema } from '../../../../../api/custom_models';
import { LoadParams, Table } from '../../../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of, takeUntil, tap } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
import { RequestService } from 'src/app/api/services';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatCheckboxChange } from '@angular/material/checkbox';

interface LoadRows{
  id?:number| undefined;
  carrier_iata?: string;
  carrier_id?: number;
  carrier_text?: string;
  contractor_id?: number;
  contractor_text?: string;
  departure_schedule?: [number];
  departure_schedule_text?: [string];
  kind_key?: string;
  nearest_flight?: [string];
  offer?: boolean;
  route_id?: number;
  route_text?: string;
  select?: boolean;
  total_cost?: string;
  transit_time?: string;
  time_answer?:string;
  time_request?:string;
}
@Component({
  selector: 'app-request-details-table-total',
  templateUrl: './request-details-table-total.component.html',
  styleUrls: ['./request-details-table-total.component.scss'],
  providers: [FilterService],
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed,void', style({height: '0px', minHeight: '0', })),
  //     state('expanded', style({height: '*',})),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ]),
  // ],
})

export class RequestDetailsTableTotalComponent extends Table<any, 'trade_rating', ContractorFilter> {
  sortField = 'contractor_id' as const;

  expandedElement: any | null;
  expandedElementInfo: any | null;

  arrDetailsCheckedCheck:number[]=[];

  testswi=true

  params:any;

  trackById = (_index: number, contractor: LoadRows) => contractor.id!;

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
  }


  //методы для таблицы
  load<LoadRows>(params: LoadParams<any, any>): Observable<{ total: number; items: LoadRows[]; }> {
    // this.params=params;
    // console.log(params);

    if(this.detailsMethod==='final') {
      return this.requestService.requestRateFinalList(params as any) as unknown as Observable<{ total: number; items: LoadRows[]; }>;
    } else if (this.detailsMethod==='customs') {
      return this.requestService.requestRateCustomsList(params as any) as unknown as Observable<{ total: number; items: LoadRows[]; }>
    } else if (this.detailsMethod==='point') {
      return this.requestService.requestRatePointList(params as any) as unknown as Observable<{ total: number; items: LoadRows[]; }>
    } else {
      return this.requestService.requestRateTransporterList(params as any) as unknown as Observable<{ total: number; items: LoadRows[]; }>
    }
  }
  protected override loadFilterSchemaTest(par:any): Observable<any>  {
    return this.requestService.requestRateListParam(par).pipe(map(val => val as any));
  }
  // protected override loadFilterSchema(): Observable<SearchFilterSchema> {
  //   return this.contractorService.contractorList().pipe(map(val => val as SearchFilterSchema));
  // }
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

  onRateInfoChange(request_id:number,rate_id:number){
    if(this.detailsMethod==='final') {
      this.getRequestFinalInfo(request_id,rate_id)
    } else if (this.detailsMethod==='customs') {
      this.getRequestCustomsInfo(request_id,rate_id)
    } else if (this.detailsMethod==='point') {
      this.getRequestPointInfo(request_id,rate_id)
    } else {
      this.getRequestTransporterInfo(request_id,rate_id)
    }
  }

  getRequestFinalInfo(request_id:number,rate_id:number){
    this.requestService.requestRateFinalInfo({id:rate_id, request_id:request_id})
      .pipe(tap((info)=>{}),takeUntil(this.destroy$))
      .subscribe({
        next: (info) =>{
          this.expandedElementInfo=info;

          console.log(info);
        },
        error:(err)=>{

        }
      })
  }

  getRequestCustomsInfo(request_id:number,rate_id:number){
    this.requestService.requestRateCustomsInfo({id:rate_id, request_id:request_id})
      .pipe(tap((info)=>{}),takeUntil(this.destroy$))
      .subscribe({
        next: (info) =>{
          this.expandedElementInfo=info;

          console.log('requestRateCustomsInfo',info);
        },
        error:(err)=>{

        }
      })
  }

  getRequestPointInfo(request_id:number,rate_id:number){
    this.requestService.requestRatePointInfo({id:rate_id, request_id:request_id})
      .pipe(tap((info)=>{}),takeUntil(this.destroy$))
      .subscribe({
        next: (info) =>{
          this.expandedElementInfo=info;

          console.log(info);
        },
        error:(err)=>{
        }
      })
  }

  getRequestTransporterInfo(request_id:number,rate_id:number){
    this.requestService.requestRateTransporterInfo({id:rate_id, request_id:request_id})
      .pipe(tap((info)=>{}),takeUntil(this.destroy$))
      .subscribe({
        next: (info) =>{
          this.expandedElementInfo=info;

          console.log(info);
        },
        error:(err)=>{
        }
      })
  }

  getSpecializationClass(n:number){
    let classSpec='';
    if(n===1)classSpec='avia';
    if(n===2)classSpec='road';
    if(n===3)classSpec='rw';
    if(n===4)classSpec='sea';
    return classSpec;
  }

  onSwitcherChange(e:any){
    console.log(e);
  }

  editRequestNav(){
    this.router.navigate(['pages/request/edit', this.requestId])
  }

  dubCurRequest(){
    console.log(this.currentRequest);

    this.requestService.requestCreate({body:this.currentRequest})
      .pipe(
        tap((e)=>{
          console.log(e);


        }),
        takeUntil(this.destroy$)
      ).subscribe();
  }



  onTableMethodChange(method:any){
    this.router.navigate(['pages/request/details', method, this.requestId])
  }

  isDetailsCheckedCheck(contractor_id:number){
    let isCheck
    this.arrDetailsCheckedCheck.forEach((i:any)=>{
      if(i===contractor_id){
        isCheck=true;
      }
    })
    return isCheck;
  }
  updateArrDetailsCheckedCheck(contractor_id:number,{ checked }: MatCheckboxChange){
    if(checked){
      this.arrDetailsCheckedCheck.push(contractor_id)

    } else {
      this.arrDetailsCheckedCheck=this.arrDetailsCheckedCheck.filter((number) => number !== contractor_id)

    }
  }
  isAllDetailsCheckedCheck(){
    let arrIdRows:number[]=[];
    let arrIdRowsCheck:number[]=[];

    this.rows.forEach((i:any)=>{
      arrIdRows.push(i.id);
    });
    this.arrDetailsCheckedCheck.forEach((i:any)=>{
      this.rows.forEach((ir:any)=>{
        if(i===ir.id){
          arrIdRowsCheck.push(i);
        }
      });
    });
    return this.arrDetailsCheckedCheck.length > 0 && arrIdRows.sort().toString()===arrIdRowsCheck.sort().toString();
  }

  isIndeterminateDetailsCheckedCheck(){
    let arrIdRows:number[]=[];
    let arrIdRowsCheck:number[]=[];

    this.rows.forEach((i:any)=>{
      arrIdRows.push(i.id);
    });
    this.arrDetailsCheckedCheck.forEach((i:any)=>{
      this.rows.forEach((ir:any)=>{
        if(i===ir.id){
          arrIdRowsCheck.push(i);
        }
      });
    });
    return arrIdRows.length>arrIdRowsCheck.length && arrIdRowsCheck.length>0;
  }

  updateAllArrDetailsCheckedCheck({ checked }: MatCheckboxChange){
    if(checked){
      this.rows.forEach((i:any)=>{
        this.arrDetailsCheckedCheck.push(i.id);
      })
      this.arrDetailsCheckedCheck=[...new Set(this.arrDetailsCheckedCheck)];
    } else {
      this.arrDetailsCheckedCheck.forEach((i:any)=>{
        this.rows.forEach((ir:any)=>{
          if(i===ir.id){
            this.arrDetailsCheckedCheck=this.arrDetailsCheckedCheck.filter((number) => number !== i)
          }
        });
      });
    }
  }

}
//  Бек:
//  -Добавить ед.измерения(табл-В ставку включено / не включено)
// ================================================
//  Фронт:
//  -Фильтра таблиц(кнопки +ставка,дубль,торги,удалить)
//  -Таблица ставки(ширина стобцов и так далее)
//  -Добавить поле transportCarrier подрядчикам
