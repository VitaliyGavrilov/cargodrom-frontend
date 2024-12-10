import { ContractorFilter } from '../../../api/custom_models/contractor-filter';
import { ContractorService } from '../../../api/services/contractor.service';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { LoadParams, Table } from '../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of, takeUntil, tap } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
import { FileService, RequestService } from 'src/app/api/services';
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

  arrDetailsCheckedCheck:number[]=[];

  arrCheckedKp:number[]=[];


  offerList:any;
  isOfferListShow:boolean=false;

  isExpandedRequestInfo:boolean=false;


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
    private fileSrvice: FileService,
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
  //-btns
  onSendKpBtnClick(){

  }
  onEditKpBtnClick(offer_id:number){
    this.navToOfferEditor(offer_id);
  }
  onDubKpBtnClick(offer_id:number){
    this.dubOffer(offer_id);
    this.loadRows();
  }
  onCopyKpBtnClick(offer_id:number){
    this.getOfferTxtCopy(offer_id);
  }
  onPdfKpBtnClick(offer_id:number){
    this.getOfferPdf(offer_id);
  }
  onTxtKpBtnClick(offer_id:number){
    this.getOfferTxt(offer_id);
  }
  onDelKpBtnClick(offer_id:number){
    this.openDeleteKpDialog('Вы уверенны, что хотите удалить кп №'+ offer_id, [offer_id], 'Удаление кп')
    // this.deleteKp([id]);
  }
  //-checkboxs
  isKpCheckboxHeaderTableChecked(): boolean {
    const arrIdRows = new Set(this.offerList.items.map((i: any) => i.id));
    const arrIdRowsCheck = new Set(this.arrCheckedKp.filter(id => arrIdRows.has(id)));
    return arrIdRows.size > 0 && arrIdRows.size === arrIdRowsCheck.size;
  }
  onKpCheckboxHeaderTableChange({ checked }: MatCheckboxChange) {
    if (checked) {
      this.arrCheckedKp = [...new Set([...this.arrCheckedKp, ...this.offerList.items.map((i:any) => i.id)])];
    } else {
      const rowIds = new Set(this.offerList.items.map((i:any)  => i.id));
      this.arrCheckedKp = this.arrCheckedKp.filter(id => !rowIds.has(id));
    }
  }
  isKpCheckboxHeaderTableIndeterminate(): boolean {
    const arrIdRows = new Set(this.offerList.items.map((i: any) => i.id));
    const arrIdRowsCheck = this.arrCheckedKp.filter(id => arrIdRows.has(id));
    return arrIdRows.size > arrIdRowsCheck.length && arrIdRowsCheck.length > 0;
  }
  isKpCheckboxBodyTableChecked(kp_id: number): boolean {
    return this.arrCheckedKp.includes(kp_id);
  }
  onKpCheckboxBodyTableChange(kp_id: number, { checked }: MatCheckboxChange) {
    if (checked) {
      if (!this.arrCheckedKp.includes(kp_id)) {
        this.arrCheckedKp.push(kp_id);
      }
    } else {
      this.arrCheckedKp = this.arrCheckedKp.filter(id => id !== kp_id);
    }
    console.log(this.arrCheckedKp );
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
  // Link to offer editor page
  navToOfferEditor(offer_id:number){
    this.router.navigate(['pages/offer', offer_id])
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
  openDeleteKpDialog(message:string, data:any, title:string){
    this.matDialog.open(this.dialogRef,{ data: {message:message, title:title}}).afterClosed().subscribe(res => {
      if (res) {
        this.deleteKp(data);
      }
    });
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
  getOfferTxt(offer_id: number){
    this.requestService.requestOfferTxt({body:{id: offer_id}}).pipe(
      tap((currencyList) => {
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: ({name, data}) => {
        const dataUri = `data:${this.xlsxMimeType};base64,${data}`;
        const a = document.createElement('a');
        console.log(dataUri);
        a.href = dataUri;
        a.download = name!;
        a.click();
      },
      error: (err) => {
        this.snackBar.open(`Ошибка получения txt файла: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }
  getOfferTxtCopy(offer_id: number){
    this.requestService.requestOfferTxt({body:{id: offer_id}}).pipe(
      tap((currencyList) => {
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: ({text}) => {
        if (text) {
          navigator.clipboard.writeText(text).then(() => {
          // Уведомление или действие после успешного копирования
          this.snackBar.open('Текст успешно скопирован в буфер обмена!', undefined, this.snackBarWithShortDuration);
        }).catch(err => {
          // Обработка ошибки, если что-то пошло не так
          this.snackBar.open(`Ошибка копирования в буфер обмена: ${err}`, undefined, this.snackBarWithShortDuration);
        });
        }
      },
      error: (err) => {
        this.snackBar.open(`Ошибка получения txt файла: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  getOfferPdf(offer_id: number){
    this.requestService.requestOfferPdf({body:{id: offer_id}}).pipe(
      tap((currencyList) => {
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: ({name, data}) => {
        const dataUri = `data:${this.xlsxMimeType};base64,${data}`;
        const a = document.createElement('a');
        a.href = dataUri;
        a.download = name!;
        a.click();
      },
      error: (err) => {
        this.snackBar.open(`Ошибка получения pdf файла: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  getRequestFile(file_id: number){
    this.fileSrvice.fileDownload({id: file_id}).pipe(
      tap((file) => {
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: ({name, data}) => {
        const dataUri = `data:${this.xlsxMimeType};base64,${data}`;
        const a = document.createElement('a');
        a.href = dataUri;
        a.download = name!;
        a.click();
      },
      error: (err) => {
        this.snackBar.open(`Ошибка получения файла запроса: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  dubOffer(offer_id: number){
    this.requestService.requestOfferCopy({id: offer_id}).pipe(
      tap((currencyList) => {
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: ({}) => {
        this.snackBar.open(`Кп успешно дублирован`, undefined, this.snackBarWithShortDuration);
      },
      error: (err) => {
        this.snackBar.open(`Ошибка дублирования кп: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

}
