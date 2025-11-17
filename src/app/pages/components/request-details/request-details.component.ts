import { ContractorFilter } from '../../../api/custom_models/contractor-filter';
import { ContractorService } from '../../../api/services/contractor.service';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { LoadParams, Table } from 'src/app/shared/classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of, takeUntil, tap } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
import { FileService, RequestService, UserService } from 'src/app/api/services';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { RateAddCustoms } from './rate-add-customs/rate-add-customs.component';
import { LogoutComponent } from 'src/app/auth/components/logout/logout.component';
import { NavigationHistoryService } from '../../services/navigation-history.service';

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

  kpStatusArr:any;

  arrDetailsCheckedCheck:number[]=[];

  arrCheckedKp:number[]=[];


  offerList:any;
  isOfferListShow:boolean=false;

  isExpandedRequestInfo:boolean=false;


  @ViewChild('rateOtherDialogRef') rateOtherDialogRef!: TemplateRef<void>;
  @ViewChild('ratePointDialogRef') ratePointDialogRef?: TemplateRef<void>;
  @ViewChild('rateTransporterDialogRef') rateTransporterDialogRef?: TemplateRef<void>;
  @ViewChild('rateСustomsDialogRef') rateСustomsDialogRef?: TemplateRef<void>;
  @ViewChild('dialogRef') dialogRef!: TemplateRef<void>;
  @ViewChild('fullRouteDetailForm') fullRouteDetailForm!: TemplateRef<void>;
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
    userService: UserService,
    private navigationHistoryService:NavigationHistoryService,
  ) {
    super(route, router, dialog, snackBar, filter,userService)
  }

  // override loadRows(): void {
  //   super.loadRows();
  //   // this.getOfferList();
  // }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getOfferList();
    this.getKpStatus();
    // this.resizeMetod='_list'
    this.definitionResizeMethodInDetailPage();
  }

  toConsole(i:any){
    console.log(i);
  }

  // openOtherForm(data:any){
  //   const ref = this.rateOtherDialogRef;
  //   const config = {
  //     height: '85vh',
  //     minWidth: '85vw',
  //     maxWidth: '95vw'
  //   };
  //   this.matDialog.open(ref,{data:data, ...config});
  // }

  definitionResizeMethodInDetailPage(){
    const methodMap: { [key: string]: string } = {
      final: 'request_rate_final_list',
      customs: 'request_rate_customs_list',
      point: 'request_rate_point_list',
      transporter: 'request_rate_transporter_list',
      other: 'request_rate_other_list',
    };
    this.resizeMetod=methodMap[this.detailsMethod];
  }

  //методы для таблицы
  load<LoadRows>(params: LoadParams<any, any>): Observable<{ total: number; items: LoadRows[] }> {
    const methodMap: { [key: string]: Function } = {
      final: this.requestService.requestRateFinalList.bind(this.requestService),
      customs: this.requestService.requestRateCustomsList.bind(this.requestService),
      point: this.requestService.requestRatePointList.bind(this.requestService),
      transporter: this.requestService.requestRateTransporterList.bind(this.requestService),
      other: this.requestService.requestRateOtherList.bind(this.requestService),
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
    this.sendOffers(this.arrCheckedKp);
  }
  returnVisibilitySendKpBtn():boolean{
    if(this.arrCheckedKp.length>0){
      return true;
    } else {
      return false;
    }
  }
  onEditKpBtnClick(offer_id:number, offer_status:any){
    if(offer_status==0){
      this.navToOfferEditor(offer_id);
    } else {
      this.snackBar.open(`Редактирвоание кп недоступно`, undefined, this.snackBarWithShortDuration);
    }

  }
  onDubKpBtnClick(offer_id:number){
    this.dubOffer(offer_id);
    this.getOfferList();
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
    const arrIdRows = new Set(this.offerList.items.filter((i: any) => i.status == 0).map((i: any) => i.id));
    const arrIdRowsCheck = new Set(this.arrCheckedKp.filter(id => arrIdRows.has(id)));
    return arrIdRows.size > 0 && arrIdRows.size === arrIdRowsCheck.size;
  }
  onKpCheckboxHeaderTableChange({ checked }: MatCheckboxChange) {
    const validItems = this.offerList.items.filter((i: any) => i.status == 0);
    if (checked) {
      this.arrCheckedKp = [...new Set([...this.arrCheckedKp, ...validItems.map((i: any) => i.id)])];
    } else {
      const rowIds = new Set(validItems.map((i: any) => i.id));
      this.arrCheckedKp = this.arrCheckedKp.filter(id => !rowIds.has(id));
    }
  }
  isKpCheckboxHeaderTableIndeterminate(): boolean {
    const arrIdRows = new Set(this.offerList.items.filter((i: any) => i.status == 0).map((i: any) => i.id));
    const arrIdRowsCheck = this.arrCheckedKp.filter(id => arrIdRows.has(id));
    return arrIdRows.size > arrIdRowsCheck.length && arrIdRowsCheck.length > 0;
  }
  isKpCheckboxBodyTableChecked(kp_id: number): boolean {
    return this.arrCheckedKp.includes(kp_id) && this.offerList.items.some((item:any) => item.id === kp_id && item.status == 0);
  }
  onKpCheckboxBodyTableChange(kp_id: number, { checked }: MatCheckboxChange) {
    const validItem = this.offerList.items.find((item:any) => item.id === kp_id && item.status == 0);
    if (validItem) {
      if (checked) {
        if (!this.arrCheckedKp.includes(kp_id)) {
          this.arrCheckedKp.push(kp_id);
        }
      } else {
        this.arrCheckedKp = this.arrCheckedKp.filter(id => id !== kp_id);
      }
      console.log(this.arrCheckedKp);
    }
  }
  // isKpCheckboxHeaderTableChecked(): boolean {
  //   const arrIdRows = new Set(this.offerList.items.map((i: any) => i.id));
  //   const arrIdRowsCheck = new Set(this.arrCheckedKp.filter(id => arrIdRows.has(id)));
  //   return arrIdRows.size > 0 && arrIdRows.size === arrIdRowsCheck.size;
  // }
  // onKpCheckboxHeaderTableChange({ checked }: MatCheckboxChange) {
  //   if (checked) {
  //     this.arrCheckedKp = [...new Set([...this.arrCheckedKp, ...this.offerList.items.map((i:any) => i.id)])];
  //   } else {
  //     const rowIds = new Set(this.offerList.items.map((i:any)  => i.id));
  //     this.arrCheckedKp = this.arrCheckedKp.filter(id => !rowIds.has(id));
  //   }
  // }
  // isKpCheckboxHeaderTableIndeterminate(): boolean {
  //   const arrIdRows = new Set(this.offerList.items.map((i: any) => i.id));
  //   const arrIdRowsCheck = this.arrCheckedKp.filter(id => arrIdRows.has(id));
  //   return arrIdRows.size > arrIdRowsCheck.length && arrIdRowsCheck.length > 0;
  // }
  // isKpCheckboxBodyTableChecked(kp_id: number): boolean {
  //   return this.arrCheckedKp.includes(kp_id);
  // }
  // onKpCheckboxBodyTableChange(kp_id: number, { checked }: MatCheckboxChange) {
  //   if (checked) {
  //     if (!this.arrCheckedKp.includes(kp_id)) {
  //       this.arrCheckedKp.push(kp_id);
  //     }
  //   } else {
  //     this.arrCheckedKp = this.arrCheckedKp.filter(id => id !== kp_id);
  //   }
  //   console.log(this.arrCheckedKp );
  // }
  // RATE METODS CHANGE
  onTableMethodChange(method:any){
    this.router.navigate(['pages/request/details', method, this.requestId])
  }
  // HANDLING CHECKBOX ACTIONS
  onAddKpBtnClick(){
    if(this.arrDetailsCheckedCheck.length==0){
      this.snackBar.open(`Выбранные ставки отсутствуют `, undefined, this.snackBarWithShortDuration);
    } else {
      this.openAddKpDialog('Вы уверенны, что хотите создать коммерческое предложение из выбранных '+ this.arrDetailsCheckedCheck.length + ' ставок', this.arrDetailsCheckedCheck, 'Создание коммерческого предложения');
    }
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
  onOpenFullRouteDetailForm(){
    this.matDialog.open(this.fullRouteDetailForm).afterClosed().subscribe(res => {
    });
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
  // Link to contractor editor page
  navToContractorEditor(contractor_id:number){
    this.router.navigate(['pages/contractor/edit', contractor_id])
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
    // this.router.navigate(['pages/request/bidding', this.requestId])
    this.router.navigate(['/pages/request/edit/translate', this.requestId]);
  }
  // OPEN EDITOR popap
  openRateEditor(mode:string, data?: any) {
    const rateEditors: { [key: string]: { ref: any; config?: any } } = {
      transporter: { ref: this.rateTransporterDialogRef, config: { height: 'fit-content', maxHeight:'95vh', maxWidth: '95vw' } },
      customs:     { ref: this.rateСustomsDialogRef, config: { height: 'fit-content', maxHeight:'95vh', maxWidth: '95vw' } },
      point:       { ref: this.ratePointDialogRef, config: { height: 'fit-content', maxHeight:'95vh', maxWidth: '95vw' } },
      other:       { ref: this.rateOtherDialogRef, config: { height: 'fit-content', maxHeight:'95vh', maxWidth: '95vw' } },
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
    let rateType: "other" | "final" | "custom" | "svh" | "delivery" | undefined;

    if (this.detailsMethod) {
      rateType = this.detailsMethod === 'point' ? 'svh' :
                (this.detailsMethod === 'other' ||
                 this.detailsMethod === 'final' ||
                 this.detailsMethod === 'custom' ||
                 this.detailsMethod === 'delivery') ? this.detailsMethod : undefined;
    } else {
      rateType = undefined;
    }

    this.requestService.requestOfferMake({body:{id:body,type:rateType}})
      .pipe(
        tap((e)=>{
          console.log(e);
        }),
        takeUntil(this.destroy$)
      ).subscribe({
        next: (contractor) => {
          this.loadRows();
          this.getOfferList();
          this.snackBar.open(`кп успех`, undefined, this.snackBarWithShortDuration);
          this.arrDetailsCheckedCheck=[];
        },
        error: (err) => {
          this.snackBar.open(`Ошибка создания кп: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
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
          this.getOfferList();
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
      next: ({name, data, text}) => {
        if (text) {
          // Открываем новую вкладку
          const newWindow = window.open();
          if (newWindow) {
            // Записываем текст в новый документ
            newWindow.document.open();
            newWindow.document.write(`<pre>${text}</pre>`);  // Добавляем текст с тегом <pre> для сохранения форматирования
            newWindow.document.close();  // Закрываем документ для рендеринга
          }
        }

        // const dataUri = `data:${this.xlsxMimeType};base64,${data}`;
        // const a = document.createElement('a');
        // console.log(dataUri);
        // a.href = dataUri;
        // a.download = name!;
        // a.click();
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
        this.getOfferList();
        this.snackBar.open(`Кп успешно дублирован`, undefined, this.snackBarWithShortDuration);
      },
      error: (err) => {
        this.snackBar.open(`Ошибка дублирования кп: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  sendOffers(offer_ids: any){
    this.requestService.requestOfferSend({body:{ids:offer_ids}}).pipe(
      tap((currencyList) => {
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: ({}) => {
        this.snackBar.open(
          this.arrCheckedKp.length>1
          ?`Ваши предложения в количестве ${this.arrCheckedKp.length}-х ставок были отправлены`
          :`Ставка была отправлена`,
          undefined,
          {
            duration: 2000,
            verticalPosition: 'top', // Позиционирование по вертикали
            horizontalPosition: 'center', // Позиционирование по горизонтали
            panelClass: ['centered-snackbar'] // Кастомный класс для стилизации
          }
        );
      },
      error: (err) => {
        this.snackBar.open(
          err.error.error_message +': '+ err.error.error_message_description,
          undefined,
          this.snackBarWithShortDuration
        );
      }
    });
  }

  getKpStatus(){
    this.requestService.requestOfferStatuses().pipe(
      tap((kpStatusArr) => {
        // this.kpStatusArr = kpStatusArr.filter(status => status.id !== 0);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (kpStatusArr) => {
        this.kpStatusArr=kpStatusArr;
        // this.kpStatusArr = this.kpStatusArr.filter((status:any) => status.id !== 0);
        console.log('kpStatusArr',this.kpStatusArr);
      },
      error: (err) => {
        this.snackBar.open(`Ошибка получения статусов кп: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  patchKpStatus(kp_id:number, status_id:number){
    this.requestService.requestOfferSetStatus({id:kp_id, status_id:status_id}).pipe(
      tap((currencyList) => {
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: ({}) => {
        this.snackBar.open(`Статус кп успешно изменен`, undefined, this.snackBarWithShortDuration);
      },
      error: (err) => {
        this.snackBar.open(`Ошибка изменения статуса кп: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  goBack(): void {
    this.navigationHistoryService.back(`/pages/request`);
  }
}
