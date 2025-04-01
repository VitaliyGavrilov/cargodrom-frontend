import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SortColumn } from '../api/custom_models/sort-column';
import { Directive, OnInit, OnDestroy, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { NEVER, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FilterService } from '../filter/services/filter.service';
import { SearchFilterSchema } from '../api/custom_models';
import { MatCheckboxChange } from '@angular/material/checkbox';

export interface LoadParams<T, F> {
  id?:number;
  start?: number;
  count?: number;
  sort?: SortColumn<T>[];
  filter?: F
}

@Directive()
export abstract class Table<T extends { id: number }, A = never, F = never> implements OnInit, OnDestroy {
  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 5000 };
  filter?: F;
  column?: string[]=[];
  sortableColumns?: string[]=[];

  isBiddingMode=false;
  isRateDetailsMode=false;
  isResizeColumnMode:boolean=false;

  detailsMethod:string='';

  arrRowsId:number[]=[];
  quantityContractors:number=0;
  currentQuantityContractors:number=0
  currentRequest:any={};
  contractorsSelectedForRequest:any=[];



  requestId:number=0;

  // schemaTest:any
  schemaCharges:any
  columnsData:any=[];

  isRowsLoad=false;

  requestCrmStatuses:any[]=[];

  readonly xlsxMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  protected abstract load<T>(params?: LoadParams<T, F>): Observable<{ total: number, items: T[], column?: string[], sort?: string[],sort_new?:any }>;

  protected removedMessage: string = 'Запись удалена';

  protected destroy$ = new Subject<void>();
  rows: T[] = [];
  total = 0;
  start = 0;
  limits = [10, 25, 50, 100];
  count = this.limits[0];
  abstract sortField: keyof T | A;
  readonly nameField?: keyof T | A;
  sortDir: 'asc' | 'desc' = 'asc';
  @ViewChild('removeDialogRef') removeDialogRef!: TemplateRef<T>;
  @ViewChild('exportDialogRef') exportDialogRef?: TemplateRef<void>;
  @ViewChild('importDialogRef') importDialogRef?: TemplateRef<{file: File, text: string}>;
  @ViewChild('saveBiddingRef') saveBiddingRef?: TemplateRef<void>;
  @ViewChild('translateRef') translateRef?: TemplateRef<void>;
  private aliases = new Map<A, (keyof T)[]>();

  @ViewChild('file', { static: true }) file?: ElementRef;

  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    private dialog: MatDialog,
    protected snackBar: MatSnackBar,
    protected filterService: FilterService,
  ) {}

  ngOnInit(): void {
    const segments = this.route.snapshot.url.map(s => s.path);
    this.isBiddingMode = segments[1] === 'bidding';
    this.isRateDetailsMode = segments[1] === 'details';

    if(this.isRateDetailsMode || this.isBiddingMode){
      if(this.isRateDetailsMode) this.detailsMethod=segments[2];
      this.requestId = Number(this.route.snapshot.paramMap.get('id'));
      this.getRequestInfo(this.requestId);
    }

    this.filterService.onApply().subscribe(filter => {
      this.onFilterChange(filter as F);
    });
    this.getListParam();

    // if(this.isBiddingMode){
    //   this.route.queryParams.subscribe(params => {
    //     console.log('Received queryParams:', params);
    //   });
    // }




    // this.subscribeRouteQueryParamMap();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected loadRows(): void {
    const sortCol = this.getSort();
    let params: any = { start: this.start, count: this.count, ...this.filter };
    if (this.isRateDetailsMode) {
      params = { ...params, request_id: this.requestId, method: this.detailsMethod };
    } else if (this.isBiddingMode) {
      params = { ...params, bidding_request_id: this.requestId };
    } else {
      params = { ...params, sort: JSON.stringify(sortCol) };
    }
    console.log(params);

    // let params:any;
    // if(this.isRateDetailsMode){
    //   params= { request_id:this.requestId, method: this.detailsMethod, start: this.start, count: this.count, ...this.filter };
    // } else if(this.isBiddingMode)  {
    //   params= { request_id:this.requestId, start: this.start, count: this.count, ...this.filter };
    // } else {
    //   params= { start: this.start, count: this.count, sort: JSON.stringify(sortCol) as unknown as SortColumn<T>[], ...this.filter  };
    // }

    // let params = this.isRateDetailsMode
    //   ? { request_id:this.requestId, method: this.detailsMethod, start: this.start, count: this.count, ...this.filter }
    //   : { start: this.start, count: this.count, sort: JSON.stringify(sortCol) as unknown as SortColumn<T>[], ...this.filter  };

    this.load(params)
      .subscribe(rows => {
        console.log('rows', rows);
        this.rows = rows ? rows.items as T[] : [];
        this.total = rows.total;

        if(this.isBiddingMode){
          this.arrRowsId=[];
          rows.items.forEach((element:any) => {
            this.arrRowsId.push(element.id);
          });
          this.getContractorsSelectRequest();
        }
        this.isRowsLoad=true
      });
  }

  protected delete(params: { body: { id: number } }): Observable<void> {
    return of();
  }


  protected loadFilterSchema(): Observable<SearchFilterSchema> {
    return of({ header: [], main: [], additional: [] });
  }

  getIntParamSafely(queryParamMap: ParamMap, name: string, fallback: number): number {
    const value = queryParamMap.get(name);
    if (value != null) {
      const intValue = parseInt(value, 10);
      return intValue;
    }
    return fallback;
  }

  getIntEnumParamSafely(queryParamMap: ParamMap, name: string, values: number[], fallback: number): number {
    const value = queryParamMap.get(name);
    if (value != null) {
      const intValue = parseInt(value, 10);
      return values.includes(intValue) ? intValue : fallback;
    }
    return fallback;
  }

  getEnumParamSafely(queryParamMap: ParamMap, name: string, values: string[], fallback: string): string {
    const value = queryParamMap.get(name);
    if (value != null && values.includes(value)) {
      return value;
    }
    return fallback;
  }

  getStringParamSafely(queryParamMap: ParamMap, name: string, fallback: string): string {
    const value = queryParamMap.get(name);
    if (value != null) {
      return value;
    }
    return fallback;
  }

  getJsonParamSafely(queryParamMap: ParamMap, name: string, fallback: any): unknown {
    const value = queryParamMap.get(name);
    if (value != null) {
      try {
        const json = JSON.parse(value);
        return json;
      } catch (e) {
        return fallback;
      }
    }
    return fallback;
  }

  onStartChange(newStart: number): void {
    this.router.navigate(['.'], {
      queryParams: { start: newStart },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }

  onCountChange(newCount: number): void {
    this.router.navigate(['.'], {
      queryParams: { count: newCount, start: 0 },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }

  private onFilterChange(filter: F): void {
    const filterWithNonEmptyValue: any = {};
    for (const key in filter) {
      const value = filter[key];
      if (value != null && (value as any) !== '') {
        if (!Array.isArray(value) || value.length > 0) {
          filterWithNonEmptyValue[key] = value;
        }
      }
    }
    const hasKeys = Object.keys(filterWithNonEmptyValue).length > 0;
    this.router.navigate(['.'], {
      queryParams: { start: 0, filter: hasKeys ? JSON.stringify(filterWithNonEmptyValue) : null },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }

  sort(field: keyof T | A): void {
    if(!this.isResizeColumnMode){
      if (Array.isArray(this.sortableColumns) && !this.sortableColumns.includes(field as string)) {
        return;
      }
      this.start = 0;
      if (this.sortField === field) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDir = 'asc';
        this.sortField = field;
      }
      this.router.navigate(['.'], {
        queryParams: { sortCol: this.sortField, sortDir: this.sortDir, start: this.start },
        queryParamsHandling: 'merge',
        relativeTo: this.route,
      });
    }
  }

  getSortClass(field: keyof T | A): string {
    if(!this.isResizeColumnMode){
      if (this.sortField === field) {
        return this.sortDir === 'asc' ? 'column-sortable sort-dir-asc' : 'column-sortable sort-dir-desc';
      } else if (this.isSortable(field)) {
        return 'column-sortable';
      }

    }
    return '';
  }

  isSortable(name: keyof T | A): boolean {
    return Array.isArray(this.sortableColumns) && this.sortableColumns.includes(name as any);
  }



  confirmRemove(row: T): void {
    this.dialog.open(this.removeDialogRef, { data: row }).afterClosed().subscribe(res => {
      if (res) {
        this.remove(row);
      }
    });
  }

  remove(row: T): void {
    const body = { id: row.id };
    this.delete({ body })
      .subscribe({
        next: () => {
          this.snackBar.open(this.removedMessage, undefined, this.snackBarWithShortDuration);
          this.loadRows();
        },
        error: (err) => this.snackBar.open(`Ошибка удаления: ` + err?.error?.error_message, undefined, { duration: 1000 })
      });
  }

  getColTitle(field: keyof T | A): string {
    if (Array.isArray(this.sortableColumns) && !this.sortableColumns.includes(field as string)) {
      return '';
    }
    if (field === this.sortField) {
      return this.sortDir === 'asc' ? 'сортировать по убыванию' : 'сортировать по возрастанию'
    }
    return 'сортировать по возрастанию';
  }

  private getSort(): SortColumn<T>[] {
    const sortCol: SortColumn<T>[] = [];
    const sortField = this.sortField as unknown as A;
    if (this.aliases.has(sortField)) {
      const fields = this.aliases.get(sortField)!;
      sortCol.push(...fields.map(field => ({ field, dir: this.sortDir })));
    } else {
      sortCol.push({ field: this.sortField as keyof T, dir: this.sortDir });
    }
    if (this.nameField && this.nameField !== this.sortField) {
      const name = this.nameField as unknown as A;
      if (this.aliases.has(name)) {
        const fields = this.aliases.get(name)!;
        sortCol.push(...fields.map(field => ({ field, dir: 'asc' as const })));
      } else {
        sortCol.push({ field: this.nameField as keyof T, dir: 'asc' });
      }
    }
    return sortCol;
  }

  registerAlias(alias: A, fields: (keyof T)[]): void {
    this.aliases.set(alias, fields);
  }

  protected exportData(param:any): Observable<{data: string; name: string}> {
    return NEVER;
  }

  protected importData(body: {data: string; name: string}): Observable<{result: any;import_key: string; text: string}> {
    return NEVER;
  }

  protected importDataConfirm(body: {import_key: string}): Observable<any> {
    return NEVER;
  }

  protected importResult(body: {import_key: string}): Observable<any> {
    return NEVER;
  }

  protected importTemplate(): Observable<{data: string; name: string}> {
    return NEVER;
  }

  protected requestContractorSelectGet(id:number): Observable<any> {
    return NEVER;
  }

  protected requestContractorSelectUpdate(body: {id: number; contractor_id: number[],checked:boolean}): Observable<any> {
    return NEVER;
  }
  protected requestSaveBidding(body: {id: number, confirm:boolean}): Observable<any> {
    return NEVER;
  }

  protected requestInfo(id:number): Observable<any> {
    return NEVER;
  }

  protected loadFilterSchemaTest(par:any): Observable<any> {
    return NEVER;
  }

  confirmExport(): void {
    if (!this.exportDialogRef) {
      return;
    }
    this.dialog.open(this.exportDialogRef).afterClosed().subscribe(res => {
      if (res) { this.exportFile()}
    });
  }

  private doImport(file: any): void {
    if (!this.importDialogRef) {
      return;
    }
    const fileName = file.name;
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      if (typeof event.target?.result === 'string') {
        const base64URL = event.target?.result;
        const suffix = `;base64,`;
        const index = base64URL.indexOf(suffix);
        const data = base64URL.substring(index + suffix.length);
        const payload = { data, name: fileName };
        this.importData(payload).subscribe({
          // next: ({ import_key, text }) => {
          next: (e) => {
            const text =e.text;
            const res =e.result;
            const import_key=e.import_key;
            this.dialog.open(this.importDialogRef!, { data: {...payload, text, res} }).afterClosed().subscribe(res => {
              if (res===2) {
                this.importResult({ import_key }).subscribe({
                  next: ({name, data}) => {
                    const dataUri = `data:${this.xlsxMimeType};base64,${data}`;
                    const a = document.createElement('a');
                    a.href = dataUri;
                    a.download = name;
                    a.click();
                    this.snackBar.open('Файл с результатами обработки успешно скачен', undefined, this.snackBarWithShortDuration);
                    // this.onStartChange(0);
                    // this.resetPage();
                  },
                  error: (err) => this.snackBar.open(`Не удалось скачать файл с результатами обработки: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
                });
              }
              if (res===1) {
                this.importDataConfirm({ import_key }).subscribe({
                  next: () => {
                    this.snackBar.open('Данные импортированы успешно', undefined, this.snackBarWithShortDuration);
                    // this.onStartChange(0);
                    this.resetPage();
                  },
                  error: (err) => this.snackBar.open(`Не удалось импортировать данные: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
                });
              }
            });
          },
          error: (err) => this.snackBar.open(`Не удалось импортировать данные: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
        });
      }
    }, false);
    reader.addEventListener('error', () => this.snackBar.open(`Ошибка чтения файла ${fileName} `, undefined, this.snackBarWithShortDuration), false);
    reader.readAsDataURL(file);
  }

  exportFile(): void {
    this.exportData({ start: this.start, count: this.count, sort: JSON.stringify(this.getSort()) as unknown as SortColumn<T>[], ...this.filter  }).subscribe({
      next: ({name, data}) => {
        const dataUri = `data:${this.xlsxMimeType};base64,${data}`;
        const a = document.createElement('a');
        a.href = dataUri;
        a.download = name;
        a.click();
      },
      error: err => this.snackBar.open(`Не удалось экспортировать данные: ` + err.error?.error_message, undefined, this.snackBarWithShortDuration)
    })
  }

  exportFileTemplate(): void {
    this.importTemplate().subscribe({
      next: ({name, data}) => {
        const dataUri = `data:${this.xlsxMimeType};base64,${data}`;
        const a = document.createElement('a');
        a.href = dataUri;
        a.download = name;
        a.click();
      },
      error: err => this.snackBar.open(`Не удалось экспортировать данные: ` + err.error?.error_message, undefined, this.snackBarWithShortDuration)
    })
  }

  importFile(): void {
    const input = this.file?.nativeElement as HTMLInputElement | undefined;
    if (input) {
      input.value = '';
      input.click();
    }
  }

  selectFileForImport(): void {
    const files = this.file?.nativeElement.files as File[] | undefined;
    const file = files?.[0];
    if (file?.name.endsWith('.xls')) {
      this.snackBar.open('Требуется Excel файл в формате .xlsx', undefined, this.snackBarWithShortDuration);
      return;
    }
    if (file?.size && file.size > 2 * 1024 * 1024) {
      this.snackBar.open('Слишком большой файл', undefined, this.snackBarWithShortDuration);
      return;
    }
    this.doImport(file);
  }

  resetPage(){
    this.router.navigate([])
  }

  getContractorsSelectRequest(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.requestContractorSelectGet(id).subscribe({
      next: (contractors) => {
        if(contractors){
          this.quantityContractors=contractors.length;
          this.contractorsSelectedForRequest=[];
          this.rows.forEach((row)=>{
            contractors.forEach((contractor:any)=>{
              if(row.id===contractor.contractor_id){
                this.contractorsSelectedForRequest.push(contractor.contractor_id);
              }
            })
          })
        } else {
          this.quantityContractors=0;
        }
      },
      complete:()=>  this.currentQuantityContractors=this.contractorsSelectedForRequest.length,
      error: (err) => this.snackBar.open(`Не получилось ID контрагентов выбранных для отправки запроса ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  updateContractorSelectRequest(contractorId: number,{ checked }: MatCheckboxChange){
    const requestId = Number(this.route.snapshot.paramMap.get('id'));
    const check= checked? true:false;
    this.requestContractorSelectUpdate({id:requestId, contractor_id:[contractorId], checked: check}).subscribe({
      next: (e) => {
        this.getContractorsSelectRequest();
      },
      error: (err) => this.snackBar.open(`Не получилось изменить список контракторов выбравших запрос ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  updateAllContractorSelectRequest({ checked }: MatCheckboxChange){
    const requestId = Number(this.route.snapshot.paramMap.get('id'));
    const check= checked? true:false;
    this.requestContractorSelectUpdate({id:requestId, contractor_id: this.arrRowsId, checked: check}).subscribe({
      next: (e) => {
        if(!check){
          this.contractorsSelectedForRequest=[];
        }
        this.getContractorsSelectRequest();
      },
      error: (err) => this.snackBar.open(`Не получилось изменить список контракторов выбравших запрос ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  saveTrueContractorSelectRequest(){
    const requestId = Number(this.route.snapshot.paramMap.get('id'));
    this.requestSaveBidding({id:requestId, confirm: true})
      .pipe(
        tap((res)=>{}),
        takeUntil(this.destroy$))
      .subscribe({
        next:(answer)=>{
          this.snackBar.open(`Торги для выбранных подрядчиков успешно начаты `, undefined, this.snackBarWithLongDuration)
        },
        error:(err)=>{
          this.snackBar.open(`Ошибка добавления подрядчиков в торги ` + err.error.error_message, undefined, this.snackBarWithLongDuration)
        }
      })

  }

  saveContractorSelectRequest() {
    const requestId = Number(this.route.snapshot.paramMap.get('id'));
    this.requestSaveBidding({id:requestId,confirm: false})
      .pipe(
        tap(()=>{}),
        takeUntil(this.destroy$))
      .subscribe({
        next:(answer)=>{
          if(answer.need_translate){
            this.dialog.open(this.translateRef!).afterClosed().subscribe(res => {
              if(res) this.router.navigate(['/pages/request/edit/translate', this.requestId]);
            })
          } else {
            this.saveTrueContractorSelectRequest();
          }
        },
        error:(err)=>{
          this.dialog.open(this.saveBiddingRef!, { data: {err} }).afterClosed()
            .subscribe(res => {
              if(res){
                this.saveTrueContractorSelectRequest();
              } else {
                this.router.navigate([], {
                  queryParams: {},
                });
              }
            })
        }
      })
  }

  isCheck(id: number): boolean {
    return this.contractorsSelectedForRequest.includes(id);
  }
  isAllCheck(){
    const filteredArray = this.rows.filter((item:any) => item.bidding_send === false);
    const count = filteredArray.length;
    return this.rows.length > 0 && this.currentQuantityContractors === count;
  }
  isIndeterminate(){
    const filteredArray = this.rows.filter((item:any) => item.bidding_send === false);
    const count = filteredArray.length;
    return this.rows.length > 0 && this.currentQuantityContractors < count && this.currentQuantityContractors > 0;
  }

  getRequestInfo(id:number){
    this.requestInfo(id).subscribe({
      next: (request) => {
        console.log('request',request);
        this.currentRequest=request;
        if(this.isBiddingMode){
          this.filterService.value["country_departure_id"]=this.currentRequest.departure_country_id;
          this.filterService.value["country_arrival_id"]=this.currentRequest.arrival_country_id;
          this.filterService.value["specialization"]=[this.currentRequest.transport_kind_id];
          this.filterService.value["allow_trade"]=1;
          this.filterService.apply();
        }
      },
      error: (err) => this.snackBar.open(`Ошибка получения данных запроса ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  getListParam(){
    const param=this.isRateDetailsMode?{request_id:this.requestId ,method:this.detailsMethod }:null;
    this.loadFilterSchemaTest(param)
      .pipe(
        tap((schema)=>{
          this.sortField = schema.sort[0].field;
          this.sortDir = schema.sort[0].dir;

          if (this.isBiddingMode) {
            schema.table.pop();
            schema.table.unshift({column:'checkbox'});
          }

        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (schema) => {
          // if(this.isRateDetailsMode){
          //   this.schemaCharges=schema.forms.charges
          // }

          console.log('schema',schema);
          this.filterService.setSearchFilterSchema(schema.search);
          schema.table.forEach((col:any)=>{
            this.column?.push(col.column);
          });
          schema.sort.forEach((sor:any)=>{
            this.sortableColumns?.push(sor.field);
          });
          this.columnsData=schema.table;
          if(schema.status){
            this.requestCrmStatuses=schema.status;
          }


          // if(this.isRateDetailsMode){
          //   this.columnsData=schema.table;
          //   this.schemaCharges=schema.forms.charges;
          // }

          // this.router.navigate(['.'], {
          //   queryParams: { sortCol: schema.sort[0].field, sortDir: schema.sort[0].dir },
          //   queryParamsHandling: 'merge',
          //   relativeTo: this.route,
          // });
        },
        error: (err) => this.snackBar.open(`Ошибка получения параметров вывода таблицы ` + err.error.error_message, undefined, this.snackBarWithShortDuration),
        complete:()=> {
          this.subscribeRouteQueryParamMap();
        }
      });
  }

  subscribeRouteQueryParamMap(){
    this.route.queryParamMap
      .pipe(
        tap((queryParamMap:any)=>{
          // console.log(queryParamMap.params.translate);
          if(queryParamMap.params.translate){
            this.saveContractorSelectRequest();
          }
          this.start = this.getIntParamSafely(queryParamMap, 'start', this.start);
          this.count = this.getIntEnumParamSafely(queryParamMap, 'count', this.limits, this.count);
          this.sortField = this.getStringParamSafely(queryParamMap, 'sortCol', this.sortField as string) as keyof T;
          this.sortDir = this.getEnumParamSafely(queryParamMap, 'sortDir', ['asc', 'desc'], this.sortDir) as 'asc' | 'desc';
          this.filter = this.getJsonParamSafely(queryParamMap, 'filter', {}) as F;
          this.filterService.setValue(this.filter as any);
          this.loadRows();
        }),
        takeUntil(this.destroy$)
      ).subscribe();
  }


}
