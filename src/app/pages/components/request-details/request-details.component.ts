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
import { RateAddCustoms } from './rate-add-customs/rate-add-customs.component';
import { LogoutComponent } from 'src/app/auth/components/logout/logout.component';

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
  // expandedElementInfo: any | null;
  arrDetailsCheckedCheck:number[]=[];
  // testswi=true
  // params:any;
  // trackById = (_index: number, contractor: LoadRows) => contractor.id!;

  offerList:any;
  isOfferListShow:boolean=false;

  isExpandedRequestInfo:boolean=false;
  expandedRequestInfoItems:any=[
    {
      field: 'Дата',
      data: 'arrival_city_name'
    },
    {
      field: 'Дата',
      data: 'arrival_city_name'
    },
    {
      field: 'Дата',
      data: 'arrival_city_name'
    },
    {
      field: 'Дата',
      data: 'arrival_city_name'
    },
    {
      field: 'Дата',
      data: 'arrival_city_name'
    },
  ]

  @ViewChild('ratePointDialogRef') ratePointDialogRef?: TemplateRef<void>;
  @ViewChild('rateTransporterDialogRef') rateTransporterDialogRef?: TemplateRef<void>;
  @ViewChild('rateСustomsDialogRef') rateСustomsDialogRef?: TemplateRef<void>;
  @ViewChild('dialogRef') dialogRef!: TemplateRef<void>;
  // @ViewChild(RateAddCustoms) RateAddCustoms!: RateAddCustoms;

  constructor(
    private contractorService: ContractorService,
    private requestService: RequestService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
    filter: FilterService,
    private matDialog: MatDialog,
  ) { super(route, router, dialog, snackBar, filter) }

  override loadRows(): void {
    super.loadRows();
    this.getOfferList();
  }

  //методы для таблицы
  load<LoadRows>(params: LoadParams<any, any>): Observable<{ total: number; items: LoadRows[] }> {
    const methodMap: { [key: string]: Function } = {
      final: this.requestService.requestRateFinalList.bind(this.requestService),
      customs: this.requestService.requestRateCustomsList.bind(this.requestService),
      point: this.requestService.requestRatePointList.bind(this.requestService),
      transporter: this.requestService.requestRateTransporterList.bind(this.requestService),
    };
    const loadMethod = methodMap[this.detailsMethod];
    return loadMethod(params) as Observable<{ total: number; items: LoadRows[] }>;
  }
  protected override loadFilterSchemaTest(par:any): Observable<any>  {
    return this.requestService.requestRateListParam(par).pipe(map(val => val as any));
  }
  protected override requestInfo(id: number) {
    return this.requestService.requestInfo({id:id});
  }
  //
  getRatesPercent(rateCost:number,finalRateCost:number):number{
    return (rateCost / finalRateCost) * 100;
  }
  //
  getVal(obj: any, path: string): any {
    if (!path.includes('/')) {
        return obj[path] !== undefined ? obj[path] : null;
    }
    const keys = path.split('/');
    for (const key of keys) {
      if (obj && obj.hasOwnProperty(key)) {
          obj = obj[key];
      } else {
          return null; // Если ключ не найден, возвращаем null
      }
    }
    return obj !== undefined ? obj : null; // Проверка на undefined
  }
  // REQUEST HANDLERS
  onDetailsRequestBtnClick(){
    this.isExpandedRequestInfo=!this.isExpandedRequestInfo;
  }
  onEditRequestBtnClick(){
    this.navToRequestEditor();
  }
  onDubRequestBtnClick(){
    this.createRequest(this.currentRequest)
  }
  onDeleteRequestBtnClick(){
    this.openDeleteRequestDialog('Вы уверенны, что хотите удалить запрос?', 'Удаление запроса')
  }
  // KP TABLE HANDLERS
  onSendKpBtnClick(){

  }
  onEditKpBtnClick(){

  }
  onDubKpBtnClick(){

  }
  onCopyKpBtnClick(){

  }
  onPdfKpBtnClick(){

  }
  onTxtKpBtnClick(){

  }
  onDelKpBtnClick(id:number){
    this.deleteKp([id]);
  }
  // RATE METODS CHANGE
  onTableMethodChange(method:any){
    this.router.navigate(['pages/request/details', method, this.requestId])
  }
  // HANDLING CHECKBOX ACTIONS
  onAddKpBtnClick(){
    this.openAddKpDialog('Вы уверенны, что хотите создать коммерческое предложение из выбранных  '+ this.arrDetailsCheckedCheck.length + ' ставок', this.arrDetailsCheckedCheck, 'Создание коммерческого предложения');
  }
  onAddRateBtnClick(mode:string){
    this.openRateEditor(mode);
  }
  onDubSelectRateBtnClick(){
    this.duplicateRate(this.arrDetailsCheckedCheck);
    this.arrDetailsCheckedCheck=[];
    // const body: any = { id: i.id, selected: !i.selected };
    // this.saveRate(body);
  }
  onBidSelectRateBtnClick(){
    this.navToBidTable();
    // this.snackBar.open(`Торги в данный момент не доступны, количество выбранных элементов: `+this.arrDetailsCheckedCheck.length, undefined, this.snackBarWithShortDuration);
    // this.arrDetailsCheckedCheck=[];
  }
  onDelSelectRateBtnClick(){
    this.openDeleteRateDialog('Вы уверенны, что хотите удалить '+ this.arrDetailsCheckedCheck.length + ' ставок', this.arrDetailsCheckedCheck, 'Удаление ставок');
    this.arrDetailsCheckedCheck=[];
  }
  // SWITCHER CHANGE(Online checkbox,checked col, ios-Swither)
  onCommercialOfferChange(i:any){
    const body: any = { id: i.id, selected: !i.selected };
    this.saveRate(body);
  }
  // CHECKBOX CHANGE IN TABLE
  onCheckboxHeaderTableChange({ checked }: MatCheckboxChange) {
    if (checked) {
      this.arrDetailsCheckedCheck = [...new Set([...this.arrDetailsCheckedCheck, ...this.rows.map(i => i.id)])];
    } else {
      const rowIds = new Set(this.rows.map(i => i.id));
      this.arrDetailsCheckedCheck = this.arrDetailsCheckedCheck.filter(id => !rowIds.has(id));
    }
  }
  onCheckboxBodyTableChange(contractor_id: number, { checked }: MatCheckboxChange) {
    if (checked) {
      if (!this.arrDetailsCheckedCheck.includes(contractor_id)) {
        this.arrDetailsCheckedCheck.push(contractor_id);
      }
    } else {
      this.arrDetailsCheckedCheck = this.arrDetailsCheckedCheck.filter(id => id !== contractor_id);
    }
  }
  // CHECKBOX states
  isCheckboxBodyTableChecked(contractor_id: number): boolean {
    return this.arrDetailsCheckedCheck.includes(contractor_id);
  }
  isCheckboxHeaderTableChecked(): boolean {
    const arrIdRows = new Set(this.rows.map((i: any) => i.id));
    const arrIdRowsCheck = new Set(this.arrDetailsCheckedCheck.filter(id => arrIdRows.has(id)));
    return arrIdRows.size > 0 && arrIdRows.size === arrIdRowsCheck.size;
  }
  isCheckboxHeaderTableIndeterminate(): boolean {
    const arrIdRows = new Set(this.rows.map((i: any) => i.id));
    const arrIdRowsCheck = this.arrDetailsCheckedCheck.filter(id => arrIdRows.has(id));
    return arrIdRows.size > arrIdRowsCheck.length && arrIdRowsCheck.length > 0;
  }
  // TOGGLE EXPANDED ROW
  onOpenDetailsRateBtnClick(item:any){
    // this.expandedElement=item
    this.expandedElement = this.expandedElement === item ? {} : item;
  }
  // EXPANDED ROW HANDLERS
  onEditRateBtnClick(mode:string,data:any ){
    this.openRateEditor(mode, data);
  }
  onDubSingleRateBtnClick(data:any){
    this.duplicateRate([data.id]);
  }
  onDelSingleRateBtnClick(){
    this.openDeleteRateDialog('Вы уверенны, что хотите удалить ставку №'+ this.expandedElement.id, [this.expandedElement.id], 'Удаление ставки')
  }
  // Link to request editor page
  navToRequestEditor(){
    this.router.navigate(['pages/request/edit', this.requestId])
  }
  // Link to requests table page
  navToRequestsTable(){
    this.router.navigate(['pages/request'])
  }
  // Link to rate table
  navToRateTable(){
    this.router.navigate(['pages/request'])
  }
  navToBidTable(){
    this.router.navigate(['pages/request/bidding', this.requestId])
  }
  // OPEN EDITOR
  openRateEditor(mode:string, data?: any) {
    const rateEditors: { [key: string]: { ref: any; config?: any } } = {
      point:       { ref: this.ratePointDialogRef },
      transporter: { ref: this.rateTransporterDialogRef },
      customs:     { ref: this.rateСustomsDialogRef, config: { height: '85vh' } },
    };
    // const editor = rateEditors[this.detailsMethod];
    const editor = rateEditors[mode];
    if (editor) {
      this.matDialog.open(editor.ref, { data: data, ...editor.config });
    }
  }
  // OPEN DIALOG
  closeAllDialogs(){
    this.matDialog.closeAll();
    this.loadRows();
  }
  openDeleteRateDialog(message:string, data:any, title:string){
    this.matDialog.open(this.dialogRef,{ data: {message:message, title:title}}).afterClosed().subscribe(res => {
      if (res) {
        this.deleteRate(data);
      }
    });
  }
  openDeleteRequestDialog(message:string, title:string){
    this.matDialog.open(this.dialogRef,{ data: {message:message, title:title}}).afterClosed().subscribe(res => {
      if (res) { this.deleteRequest(this.requestId)}
    });
  }
  openAddKpDialog(message:string, data:any, title:string){
    this.matDialog.open(this.dialogRef,{ data: {message:message, title:title}}).afterClosed().subscribe(res => {
      if (res) { this.createOffer(data)}
    });
  }
  // REQUESTS TO BACKEND
  createOffer(body:any){//create kp
    this.requestService.requestOfferMake({body:{id:body}})
      .pipe(
        tap((e)=>{
          console.log(e);
        }),
        takeUntil(this.destroy$)
      ).subscribe({
        next: (contractor) => {
          this.loadRows();
          this.snackBar.open(`кп успех`, undefined, this.snackBarWithShortDuration);
          this.arrDetailsCheckedCheck=[];
        },
        error: (err) => {
          this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }
  createRequest(body:any){//dub request
    this.requestService.requestCreate({body:body})
      .pipe(
        tap((e)=>{
          console.log(e);
        }),
        takeUntil(this.destroy$)
      ).subscribe({
        next: (contractor) => {
          this.loadRows();
          this.snackBar.open(`кп успех`, undefined, this.snackBarWithShortDuration);
          this.arrDetailsCheckedCheck=[];
        },
        error: (err) => {
          this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }
  saveRate(body: any) {
    const methodMap: { [key: string]: (body: any) => Observable<any> } = {
      customs: () => this.requestService.requestRateCustomsSave({ body }),
      point: () => this.requestService.requestRatePointSave({ body }),
      transporter: () => this.requestService.requestRateTransporterSave({ body })
    };
    const requestMethod = methodMap[this.detailsMethod];
    requestMethod({body:body})
      .pipe(
        tap(contractor => {
          console.log(contractor);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (contractor) => {
          this.snackBar.open(`кп успех`, undefined, this.snackBarWithShortDuration);
        },
        error: (err) => {
          this.snackBar.open(`Ошибка запроса маршрутов: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }
  duplicateRate(body:any){
    this.requestService.requestRateDouble({ body: { id: body } })
    .pipe(
      tap(contractor => {
        console.log(contractor);
      }),
      takeUntil(this.destroy$),
    )
    .subscribe({
      next: (contractor) => {
        this.snackBar.open(`Количество дублированных ставок: `+ body.length, undefined, this.snackBarWithShortDuration);
        this.loadRows();
      },
      error: (err) => {
        this.snackBar.open(`Ошибка дублирования: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }
  deleteRate(body:any){
    const deleteRate: Observable<any> = this.detailsMethod === 'final'
    ? this.requestService.requestRateFinaleDelete({ body: { id: body } })
    : this.requestService.requestRateDelete({ body: { id: body } });

    deleteRate.pipe(
      tap(contractor => {
        console.log(contractor);
      }),
      takeUntil(this.destroy$),
    )
    .subscribe({
      next: (contractor) => {
        this.snackBar.open(`Ставка удалена`, undefined, this.snackBarWithShortDuration);
        this.loadRows();
      },
      error: (err) => {
        this.snackBar.open(`Ошибка удаления ставки: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }
  deleteRequest(id:number){
    this.requestService.requestDelete({body:{id:id}})
      .pipe(
        tap(contractor => {
          console.log(contractor);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (contractor) => {
          this.snackBar.open(`Запрос удален`, undefined, this.snackBarWithShortDuration);
          this.navToRequestsTable();
        },
        error: (err) => {
          this.snackBar.open(`Ошибка удаления запроса: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }
  deleteKp(body:number[]){
    this.requestService.requestOfferDelete({ body: { id: body } })
      .pipe(
        tap(contractor => {
          console.log(contractor);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (contractor) => {
          this.snackBar.open(`Кп удален`, undefined, this.snackBarWithShortDuration);
          this.loadRows();
        },
        error: (err) => {
          this.snackBar.open(`Ошибка удаления кп: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }
  getOfferList(){
    this.requestService.requestOfferList({request_id:this.requestId})
      .pipe(
        tap(offers => {
          console.log('OfferList',offers);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (offers) => {
          this.isOfferListShow=offers.total==0?false:true;
          this.offerList=offers;
          this.offerList.colList=[];
          this.offerList.columns.forEach((i:any) => {
            this.offerList.colList.push(i.column);
          })
        },
        error: (err) => {
          this.snackBar.open(`Ошибка получения кп: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
        }
      });
  }

}
