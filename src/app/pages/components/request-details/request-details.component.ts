import { ContractorFilter } from '../../../api/custom_models/contractor-filter';
import { ContractorService } from '../../../api/services/contractor.service';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { LoadParams, Table } from '../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of, takeUntil, tap } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
import { RequestService } from 'src/app/api/services';
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
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
  providers: [FilterService],
})

export class RequestDetails extends Table<any, 'trade_rating', ContractorFilter> {
  sortField = 'contractor_id' as const;
  expandedElement: any | null;
  expandedElementInfo: any | null;
  arrDetailsCheckedCheck:number[]=[];
  testswi=true
  params:any;
  trackById = (_index: number, contractor: LoadRows) => contractor.id!;

  @ViewChild('rateAddPointDialogRef') rateAddPointDialogRef?: TemplateRef<void>;
  @ViewChild('rateAddTransporterDialogRef') rateAddTransporterDialogRef?: TemplateRef<void>;

  constructor(
    private contractorService: ContractorService,
    private requestService: RequestService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
    filter: FilterService,
    private matDialog: MatDialog,

  ) {
    super(route, router, dialog, snackBar, filter);
  }

  //методы для таблицы
  load<LoadRows>(params: LoadParams<any, any>): Observable<{ total: number; items: LoadRows[]; }> {
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


  // onRateInfoChange(request_id:number,rate_id:number){
  //   if(this.detailsMethod==='final') {
  //     this.getRequestFinalInfo(request_id,rate_id)
  //   } else if (this.detailsMethod==='customs') {
  //     this.getRequestCustomsInfo(request_id,rate_id)
  //   } else if (this.detailsMethod==='point') {
  //     this.getRequestPointInfo(request_id,rate_id)
  //   } else {
  //     this.getRequestTransporterInfo(request_id,rate_id)
  //   }
  // }
  // getRequestFinalInfo(request_id:number,rate_id:number){
  //   this.requestService.requestRateFinalInfo({id:rate_id, request_id:request_id})
  //     .pipe(tap((info)=>{}),takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (info) =>{
  //         this.expandedElementInfo=info;

  //         console.log(info);
  //       },
  //       error:(err)=>{

  //       }
  //     })
  // }
  // getRequestCustomsInfo(request_id:number,rate_id:number){
  //   this.requestService.requestRateCustomsInfo({id:rate_id, request_id:request_id})
  //     .pipe(tap((info)=>{}),takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (info) =>{
  //         this.expandedElementInfo=info;

  //         console.log('requestRateCustomsInfo',info);
  //       },
  //       error:(err)=>{

  //       }
  //     })
  // }
  // getRequestPointInfo(request_id:number,rate_id:number){
  //   this.requestService.requestRatePointInfo({id:rate_id, request_id:request_id})
  //     .pipe(tap((info)=>{}),takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (info) =>{
  //         this.expandedElementInfo=info;

  //         console.log(info);
  //       },
  //       error:(err)=>{
  //       }
  //     })
  // }
  // getRequestTransporterInfo(request_id:number,rate_id:number){
  //   this.requestService.requestRateTransporterInfo({id:rate_id, request_id:request_id})
  //     .pipe(tap((info)=>{}),takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (info) =>{
  //         this.expandedElementInfo=info;

  //         console.log(info);
  //       },
  //       error:(err)=>{
  //       }
  //     })
  // }


  getSpecializationClass(n:number){
    let classSpec='';
    if(n===1)classSpec='avia';
    if(n===2)classSpec='road';
    if(n===3)classSpec='rw';
    if(n===4)classSpec='sea';
    return classSpec;
  }

  onSwitcherChange(e:any){
    const body:any={id:e.id, selected:e.selected};
    if (this.detailsMethod==='customs') {
      this.rateСustomsSelectedChange(body)
    } else if (this.detailsMethod==='point') {
      this.ratePointSelectedChange(body)
    } else {
      this.rateTransporterSelectedChange(body)
      // this.prikol(this.requestService.requestRateTransporterSave({body:body}))
    }
  }

  // prikol(i:any){
  //   i.pipe(
  //     takeUntil(this.destroy$),
  //   )
  //   .subscribe();
  // }

  rateСustomsSelectedChange(body:any){
    this.requestService.requestRateCustomsSave({body:body})
      .pipe(
        tap(contractor => {
          console.log(contractor);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (contractor) => {
        },
        error: (err) => {
          this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }

  rateTransporterSelectedChange(body:any){
    this.requestService.requestRateTransporterSave({body:body})
      .pipe(
        tap(contractor => {
          console.log(contractor);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (contractor) => {
        },
        error: (err) => {
          this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }
  ratePointSelectedChange(body:any){
    this.requestService.requestRatePointSave({body:body})
      .pipe(
        tap(contractor => {
          console.log(contractor);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (contractor) => {
        },
        error: (err) => {
          this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
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
    return arrIdRows.length>arrIdRowsCheck.length && arrIdRowsCheck.length > 0;
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

  openAddRateDialog(){
    if (this.detailsMethod==='point') {
      this.openDialogRateAddPoint();
    } else if(this.detailsMethod==='transporter') {
      this.openDialogRateAddTransporter();
    }
  }

  openDialogRateAddPoint(): void {
    if (!this.rateAddPointDialogRef) { return }
    this.matDialog.open(this.rateAddPointDialogRef)
      .afterClosed()
      .subscribe(res => {
        if (res) { console.log('matdialog', res);
        }
    });
  }
  openDialogRateAddTransporter(): void {
    if (!this.rateAddTransporterDialogRef) { return }
    this.matDialog.open(this.rateAddTransporterDialogRef)
      .afterClosed()
      .subscribe(res => {
        if (res) { console.log('matdialog', res);
        }
    });
  }

  openEditRateDialog(){
    if (this.detailsMethod==='point') {
      this.openDialogRateEditPoint();
    } else if (this.detailsMethod==='transporter') {
      this.openDialogRateEditTransporter();
    }
  }

  openDialogRateEditTransporter(): void {
    if (!this.rateAddTransporterDialogRef) { return }
    this.matDialog.open(this.rateAddTransporterDialogRef,{data: this.expandedElement})
      .afterClosed()
      .subscribe(res => {
        if (res) { console.log('matdialog', res);
        }
    });
  }

  openDialogRateEditPoint(): void {
    if (!this.rateAddPointDialogRef) { return }
    this.matDialog.open(this.rateAddPointDialogRef,{data: this.expandedElement})
      .afterClosed()
      .subscribe(res => {
        console.log('matdialog', res);
      });
  }

  testDialogClose(){
    this.matDialog.closeAll()
  }
}
