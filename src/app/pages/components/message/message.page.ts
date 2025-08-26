import { SearchFilterSchema } from './../../../api/custom_models';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LoadParams, Table } from '../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { Observable, filter, map, take, takeUntil, tap } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
import { MessageService, RequestService, UserService } from 'src/app/api/services';
import { Request, RequestFilter } from 'src/app/api/custom_models/request';
import { NgScrollbar } from 'ngx-scrollbar';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MessageEditorComponent } from '../message-editor/message-editor.component';

@Component({
  selector: 'message-page',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FilterService]
})

export class MessagePage extends Table<Request, 'id', RequestFilter> {
  sortField = 'id' as const;


  // params:any;

  trackById = (_index: number, request: Request) => request.id!;

  importMetods:any;

  // @ViewChild(NgScrollbar) scrollbar!: NgScrollbar;



  constructor(
    private sanitizer: DomSanitizer,
    private requestService: RequestService,
    filterService: FilterService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
    userService:UserService,
    private messageService: MessageService,
  ) {
    super(route, router, dialog, snackBar, filterService, userService);
    // this.importMetods = {
    //   import: this.requestService.requestImport.bind(this.requestService),
    //   import_res: this.requestService.requestImportResult.bind(this.requestService),
    //   import_con: this.requestService.requestImportConfirm.bind(this.requestService),
    // }
  }

  // updateContent() {

  //     this.scrollbar.update();

  // }

  override ngOnInit() {
    super.ngOnInit();
    this.resizeMetod='message_list';
    // const currentUrl = this.router.url;
    // const segments = currentUrl.split('/').filter((segment) => segment !== '');
    // console.log('segments',segments);
    // if(segments[2]=='add'){
    //   this.openMessage(); 
    // } else if(segments[2]=='edit') {
    //   this.openEditor(segments[3])
    // }
    // this.subscribeRouterEvent();    
  }

  // openEditor(mes_id: number | string): void {
  //   this.rows$
  //   .pipe(
  //     filter(rows => rows && rows.length > 0),
  //     take(1)
  //   )
  //   .subscribe(rows => {
  //     const foundElement = rows.find(row => row.id == mes_id);
  //     this.openMessage(foundElement);
  //   });
  // }

  openMessage(message?:any) {
    // Открываем диалоговое окно (AddPopupComponent) и передаем в него данные
    const dialogRef = this.dialog.open(MessageEditorComponent, message?{data: {message }}:undefined);
    // Подписываемся на событие закрытия диалога
    dialogRef.afterClosed()
    .pipe(
      takeUntil(this.destroy$),
      take(1)
    )
    .subscribe(result => {
      // this.router.navigate(['pages/message'])
      if(result.reload_table)this.loadRows();
    });
  }
  // private subscribeRouterEvent() {
  //   this.router.events
  //   .pipe(
  //     filter(event => event instanceof NavigationEnd),
  //     takeUntil(this.destroy$)
  //   )
  //   .subscribe(() => {
  //     let isChildRouteActive = this.router.url.includes('/message/edit/') || this.router.url.includes('/message/add');
  //     if(isChildRouteActive) this.openMessage();               
  //   });
  // }

  load<Request>(params?: LoadParams<Request, RequestFilter>): Observable<{ total: number; items: Request[];sort_new:any; }> {
    // this.params=params;
    return this.messageService.messageList(params as any) as unknown as Observable<{ total: number; items: Request[]; column: string[], sort?: string[],sort_new:any }>;
  }

  protected override loadFilterSchemaTest(): Observable<any>  {
    return this.messageService.messageListParam().pipe(map(val => val as any));
  }

  // protected override loadFilterSchema<T>(): Observable<SearchFilterSchema> {
  //   return this.requestService.requestListSearch().pipe(map(val => val as SearchFilterSchema));
  // }

  protected override exportData(param:any): Observable<{data: string; name: string}> {
    return this.requestService.requestExport(param) as Observable<{data: string; name: string}>;
  }

  protected override importData(body: {data: string; name: string}) {
    return this.requestService.requestImport({body}) as any;
  }

  protected override importDataConfirm(body: {import_key: string}) {
    return this.requestService.requestImportConfirm({import_key: body.import_key});
  }

  protected override importResult(body: {import_key: string}) {
    return this.requestService.requestImportResult({import_key: body.import_key})
  }

  protected override importTemplate(): Observable<{data: string; name: string}> {
    return this.requestService.requestImportTemplate(this.filter as any) as Observable<{data: string; name: string}>;
  }

  // getVal(obj: any, path: string): any {
  //   if (!path?.includes('/')) {
  //     const value = obj[path] !== undefined ? obj[path] : null;
  //     return this.transformClientValue(value,obj);
  //   };
    
  //   const keys = path?.split('/');
  //   for (const key of keys) {
  //     if (obj && obj.hasOwnProperty(key)) {
  //         obj = obj[key];
  //     } else {
  //       return null;
  //     }
  //   }
    
  //   const result = obj !== undefined ? obj : null;
  //   return this.transformClientValue(result,obj);
  // }

  // private transformClientValue(value: any, obj:any): SafeHtml {
  //   if (typeof value === 'string') {
  //     return value.replace(
  //       /\[urlclient\](.*?)\[\/urlclient\]/ig, 
  //       `<a class="link" target="_blank" href="/#/pages/customer/edit/${obj.customer_id}">$1</a>`
  //     );
  //   }
  //   return value;
  // }

  // getVal(obj: any, path: string): any {
  //   if (!path?.includes('/')) {
  //     return obj[path] !== undefined ? obj[path] : null;
  //   };
  //   const keys = path?.split('/');
  //   for (const key of keys) {
  //     if (obj && obj.hasOwnProperty(key)) {
  //         obj = obj[key];
  //     } else {
  //       return null; // Если ключ не найден, возвращаем null
  //     }
  //   }
  //   return obj !== undefined ? obj : null; // Проверка на undefined
  // }

  navigateOnDetails(requestId:any, tab:string){
    console.log(tab);
    if(tab){
      let link;
      if(tab=='custom'){
        link='customs';
      } else if(tab=='svh') {
        link='point'
      } else {
        link=tab;
      }
      this.router.navigate(['pages/request/details',link, requestId])
    } else {
      this.snackBar.open(
        `Ошибка, рейты недоступны`,
        undefined,
        this.snackBarWithShortDuration
      );
    }

  }
  navigateOnClient(clientId:any){
    this.router.navigate(['pages/customer/edit', clientId])
  }

  updateRequest(request:any){
    const body ={
      status_crm_id: request.status_crm_id,
      id: request.id
    };
    this.requestService.requestUpdate({body}).pipe().subscribe({
      next: () => {
        this.snackBar.open(
          `Статус CRM успешно изменён`,
          undefined,
          this.snackBarWithShortDuration
        );
      },
      error: (err) => {
        this.snackBar.open(
          `Ошибка редактирования CRM статуса запроса: ` + err.error.error_message,
          undefined,
          this.snackBarWithShortDuration
        );
      }
    });
  }

  tableRequest_returnColorCrmStatus(value:any){
    if (!this.requestCrmStatuses) return '';
    const obj = this.requestCrmStatuses.find(obj => obj.id === value);
    return obj?.color || '';
  }

  getTypeClass(kind_id:number){
    let classSpec='';
    if(kind_id===1)classSpec='type avia';
    if(kind_id===2)classSpec='type road';
    if(kind_id===3)classSpec='type rw';
    if(kind_id===4)classSpec='type sea';
    return classSpec;
  }

}

// constructor(
//   private requestService: RequestService,
//   private filterService: FilterService,
//   private dialog: MatDialog,
//   private snackBar: MatSnackBar,
//   private route: ActivatedRoute,
//   private router: Router,

// ) {
//   this.getRowsData = this.requestService.requestList.bind(this.requestService);
//   this.getTableConfig = this.requestService.requestListParam.bind(this.requestService);
//   this.getXLSXTable = this.requestService.requestExport.bind(this.requestService);
//   this.getXLSXTemplate = this.requestService.requestImportTemplate.bind(this.requestService);
//   this.importMetods = {
//     import: this.requestService.requestImport.bind(this.requestService),
//     import_res: this.requestService.requestImportResult.bind(this.requestService),
//     import_con: this.requestService.requestImportConfirm.bind(this.requestService)
//   }
// }
