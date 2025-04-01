import { CustomerService } from './../../../api/services/customer.service';
import { Client, ClientFilter, SearchFilterSchema } from './../../../api/custom_models';
import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { LoadParams, Table } from '../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, takeUntil, tap } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
import { UserService } from 'src/app/api/services';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FilterService],
})
export class ClientComponent extends Table<Client, 'name', ClientFilter> {
  sortField = 'name' as const;

  importMetods:any;

  params:any;

  trackById = (_index: number, client: Client) => client.id!;

  isResizing = false;
  resizingColumn: any = null;
  startX: number = 0;
  startWidth: number = 0;

  constructor(
    private customerService: CustomerService,
    filterService: FilterService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
    private userService: UserService,
  ) {
    super(route, router, dialog, snackBar, filterService);
    this.importMetods = {
      import: this.customerService.customerImport.bind(this.customerService),
      import_res: this.customerService.customerImportResult.bind(this.customerService),
      import_con: this.customerService.customerImportConfirm.bind(this.customerService),
    }
  }

  load<Client>(params: LoadParams<Client, ClientFilter>): Observable<{ total: number; items: Client[]; }> {
    this.params=params;
    return this.customerService.customerList(params as any) as unknown as Observable<{ total: number; items: Client[]; column: string[], sort: string[] }>;
  }

  protected override loadFilterSchemaTest(): Observable<any>  {
    return this.customerService.customerListParam().pipe(map(val => val as any));
  }

  protected override loadFilterSchema<T>(): Observable<SearchFilterSchema> {
    return this.customerService.customerList().pipe(map(val => val as SearchFilterSchema));
  }

  protected override exportData(): Observable<{data: string; name: string}> {
    return this.customerService.customerExport(this.params as any) as Observable<{data: string; name: string}>;
  }

  protected override importData(body: {data: string; name: string}) {
    return this.customerService.customerImport({body}) as any;
  }

  protected override importDataConfirm(body: {import_key: string}) {
    return this.customerService.customerImportConfirm({import_key: body.import_key});
  }

  protected override importResult(body: {import_key: string}) {
    return this.customerService.customerImportResult({import_key: body.import_key})
  }

  protected override importTemplate(): Observable<{data: string; name: string}> {
    return this.customerService.customerImportTemplate(this.filter as any) as Observable<{data: string; name: string}>;
  }

  getVal(obj: any, path: string): any {
    if (!path?.includes('/')) {
        return obj[path] !== undefined ? obj[path] : null;
    }
    const keys = path?.split('/');
    for (const key of keys) {
      if (obj && obj.hasOwnProperty(key)) {
          obj = obj[key];
      } else {
          return null; // Если ключ не найден, возвращаем null
      }
    }
    return obj !== undefined ? obj : null; // Проверка на undefined
  }

  override ngOnInit() {
    super.ngOnInit();
    // this.loadColumnSizes();
  }

  startResize(event: MouseEvent, column: any) {
    this.isResizing = true;
    this.resizingColumn = column;
    this.startX = event.pageX;
    this.startWidth = column.width ? parseInt(column.width, 10) : 100; // Начальная ширина
    // const clickedElement = event.target as HTMLElement;
    // Явно указываем тип HTMLElement при поиске
    // const columnElement = clickedElement.closest('.column') as HTMLElement | null;
    // if (!columnElement) {
    //   console.warn('Не найден элемент с классом .column');
    //   return;
    // }
    // this.startWidth=columnElement.offsetWidth;
    event.preventDefault(); // Предотвращаем выделение текста
  }


  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing || !this.resizingColumn) return;
    const width = this.startWidth + (event.pageX - this.startX);
    this.resizingColumn.width = `${width}px`;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.isResizing) {
      this.isResizing = false;
      // this.saveColumnSizes(); // Сохраняем размеры после завершения изменения
      this.sendColumnSizesToBackend(); // Отправляем размеры на бэкенд
    }
    this.resizingColumn = null;
  }

  // Загрузка сохраненных размеров колонок
  // loadColumnSizes() {
  //   const savedSizes = localStorage.getItem('columnSizes');
  //   if (savedSizes) {
  //     const sizes = JSON.parse(savedSizes);
  //     this.columnsData.forEach((col:any) => {
  //       const savedCol = sizes.find((s: any) => s.column === col.column);
  //       if (savedCol) {
  //         col.width = savedCol.width;
  //         col.items.forEach((item: any) => {
  //           const savedItem = savedCol.items.find((i: any) => i.field === item.field);
  //           if (savedItem) item.width = savedItem.width;
  //         });
  //       }
  //     });
  //   }
  // }

  // Сохранение размеров колонок в localStorage
  // saveColumnSizes() {
  //   const sizes = this.columnsData.map((col:any) => ({
  //     column: col.column,
  //     width: col.width,
  //     items: col.items.map((item:any) => ({
  //       field: item.field,
  //       width: item.width
  //     }))
  //   }));
  //   console.log('saveColumnSizes',sizes);

  //   localStorage.setItem('columnSizes', JSON.stringify(sizes));
  // }

  // Отправка размеров колонок на бэкенд
  sendColumnSizesToBackend() {
    const sizes = this.columnsData.map((col:any) => ({
      column: col.column,
      width: col.width,
      items: col.items.map((item:any) => ({
        field: item.field,
        width: item.width
      }))
    }));

    console.log('columnsData',this.columnsData);
    console.log('sizes',sizes);


  }
  onSaveColumnWidth(){
    this.userService.userSaveTableParam({body: {method:'customer_list',param:this.columnsData}})
      .pipe(
        tap(()=>{}),
        takeUntil(this.destroy$),
      )
    .subscribe(()=>{
      this.isResizeColumnMode=false;
    });
  }
  onCancelColumnWidth(){
    location.reload();
  }


}


  // handleResizeClick(event: MouseEvent, colIndex: any, miniColIndex:any) {
  //   console.log('handleResizeClick');

  //   event.stopPropagation();
  //   const clickedElement = event.target as HTMLElement;
  //   // Явно указываем тип HTMLElement при поиске
  //   const columnElement = clickedElement.closest('.column') as HTMLElement | null;
  //   if (!columnElement) {
  //     console.warn('Не найден элемент с классом .column');
  //     return;
  //   }
  //   const thElement = columnElement.closest('th') as HTMLElement | null;
  //   if (!thElement) {
  //     console.warn('Не найден родительский <th>');
  //     return;
  //   }
  //   // Теперь TypeScript знает, что это HTMLElement и offsetWidth доступен
  //   const columnWidth = columnElement.offsetWidth+10;
  //   const thWidth = thElement.offsetWidth;

  //   this.columnsData[colIndex].items[miniColIndex].width=`${columnWidth}px`;
  //   if(this.columnsData[colIndex].items[miniColIndex+1]) {
  //     this.columnsData[colIndex].items[miniColIndex+1].width=this.columnsData[colIndex].items[miniColIndex+1].width-10
  //   } else {

  //   }


  //   console.log('Ширина <th>:', thWidth, 'px');
  //   console.log('Ширина .column:', columnWidth, 'px');
  // }
