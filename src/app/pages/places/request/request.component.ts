import { SearchFilterSchema } from '../../../api/custom_models';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LoadParams, Table } from '../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
import { RequestService } from 'src/app/api/services';
import { Request, RequestFilter } from 'src/app/api/custom_models/request';
import { TablePage } from 'src/app/classes/table-page';
import { DynamicTableComponent } from '../../tables/dynamic-table/dynamic-table.component';

interface FileConfig {
  name:string;
  data: string;
}

@Component({
  selector: 'page-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FilterService]
})

export class RequestPage{
  // sortField = 'id' as const;

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 5000 };

  readonly xlsxMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  requestList:any;
  requestListParam:any;

  protected _destroy$ = new Subject<void>();

  getRowsData:any;
  getTableConfig:any;
  getXLSXTable:any;
  getXLSXTemplate:any;
  importMetods:any;


  // params:any;

  // trackById = (_index: number, request: Request) => request.id!;

  @ViewChild(DynamicTableComponent) DynamicTableComponent!: DynamicTableComponent;

  constructor(
    private requestService: RequestService,
    private filterService: FilterService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    this.getRowsData = this.requestService.requestList.bind(this.requestService);
    this.getTableConfig = this.requestService.requestListParam.bind(this.requestService);
    this.getXLSXTable = this.requestService.requestExport.bind(this.requestService);
    this.getXLSXTemplate = this.requestService.requestImportTemplate.bind(this.requestService);
    this.importMetods = {
      import: this.requestService.requestImport.bind(this.requestService),
      import_res: this.requestService.requestImportResult.bind(this.requestService),
      import_con: this.requestService.requestImportConfirm.bind(this.requestService)
    }
  }

  ngOnInit() {
    this.getTable();
  }

  getRows(param:any) {
    this.getRowsData(param)
    .pipe(
      tap((requestList) => {
        this.requestList=requestList;
        console.log('Получаем данные для заполнения таблицы:',requestList);
      }),
      takeUntil(this._destroy$),
    )
    .subscribe();
  }

  getTable() {
    this.getTableConfig()
    .pipe(
      tap((requestListParam) => {
        this.requestListParam=requestListParam;
        console.log('Получаем данные для построения таблицы:',requestListParam);
      }),
      takeUntil(this._destroy$),
    ).subscribe();
  }


  downloadFile(file:any){
    const dataUri = `data:${this.xlsxMimeType};base64,${file.data}`;
    const a = document.createElement('a');
    a.href = dataUri;
    a.download = file.name;
    a.click();
  }

  getExportFile(){
    this.getXLSXTable(this.DynamicTableComponent.returnTableParams())
    .pipe(
      tap((file:any)=>{
      }),
      takeUntil(this._destroy$)
    )
    .subscribe({
      next: (file:any) => {
        this.downloadFile(file);
      },
      error: (err:any) => this.snackBar.open(`Не удалось экспортировать данные таблицы: ` + err.error?.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  getTempalteFile(){
    this.getXLSXTemplate()
    .pipe(
      tap((file:any)=>{
      }),
      takeUntil(this._destroy$)
    )
    .subscribe({
      next: (file:any) => {
        this.downloadFile(file);
      },
      error: (err:any) => this.snackBar.open(`Не удалось экспортировать шаблон для импорта: ` + err.error?.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  // private doImport(file: File): void {
  //   if (!this.importDialogRef) {
  //     return;
  //   }
  //   const fileName = file.name;
  //   const reader = new FileReader();
  //   reader.addEventListener('load', (event) => {
  //     if (typeof event.target?.result === 'string') {
  //       const base64URL = event.target?.result;
  //       const suffix = `;base64,`;
  //       const index = base64URL.indexOf(suffix);
  //       const data = base64URL.substring(index + suffix.length);
  //       const payload = { data, name: fileName };
  //       this.importData(payload).subscribe({
  //         // next: ({ import_key, text }) => {
  //         next: (e) => {
  //           const text =e.text;
  //           const res =e.result;
  //           const import_key=e.import_key;
  //           this.dialog.open(this.importDialogRef!, { data: {...payload, text, res} }).afterClosed().subscribe(res => {
  //             if (res===2) {
  //               this.importResult({ import_key }).subscribe({
  //                 next: ({name, data}) => {
  //                   const dataUri = `data:${this.xlsxMimeType};base64,${data}`;
  //                   const a = document.createElement('a');
  //                   a.href = dataUri;
  //                   a.download = name;
  //                   a.click();
  //                   this.snackBar.open('Данные импортированы успешно', undefined, this.snackBarWithShortDuration);
  //                   // this.onStartChange(0);
  //                   // this.resetPage();
  //                 },
  //                 error: (err) => this.snackBar.open(`Не удалось скачать файл с результатами обработки: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
  //               });
  //             }
  //             if (res===1) {
  //               this.importDataConfirm({ import_key }).subscribe({
  //                 next: () => {
  //                   this.snackBar.open('Данные импортированы успешно', undefined, this.snackBarWithShortDuration);
  //                   // this.onStartChange(0);
  //                   this.resetPage();
  //                 },
  //                 error: (err) => this.snackBar.open(`Не удалось импортировать данные: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
  //               });
  //             }
  //           });
  //         },
  //         error: (err) => this.snackBar.open(`Не удалось импортировать данные: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
  //       });
  //     }
  //   }, false);
  //   reader.addEventListener('error', () => this.snackBar.open(`Ошибка чтения файла ${fileName} `, undefined, this.snackBarWithShortDuration), false);
  //   reader.readAsDataURL(file);
  // }

  // getRows(param:any) {
  //   this.requestService.requestList(param)
  //     .pipe(
  //       tap((requestList) => {
  //         this.requestList=requestList;
  //         console.log('Получаем данные для заполнения таблицы:',requestList);
  //         console.log('DynamicTableComponent',);

  //       }
  //       ),
  //     ).subscribe();
  // }

  // getTable() {
  //   this.requestService.requestListParam()
  //     .pipe(
  //       tap((requestListParam) => {
  //         this.requestListParam=requestListParam;
  //         console.log('Получаем данные для построения таблицы:',requestListParam);
  //       }
  //       ),
  //     ).subscribe();
  // }

  // getExportFile(){
  //   this.requestService
  //   .requestExport(this.DynamicTableComponent.returnTableParams())
  //   .pipe(
  //     tap((file:any)=>{
  //     }),
  //     takeUntil(this._destroy$)
  //   )
  //   .subscribe({
  //     next: ({name, data}) => {
  //       const dataUri = `data:${this.xlsxMimeType};base64,${data}`;
  //       const a = document.createElement('a');
  //       a.href = dataUri;
  //       a.download = name;
  //       a.click();
  //     },
  //     error: err => this.snackBar.open(`Не удалось экспортировать данные таблицы: ` + err.error?.error_message, undefined, this.snackBarWithShortDuration)
  //   });
  // }

  // getTempalteFile(){
  //   this.requestService
  //   .requestImportTemplate()
  //   .pipe(
  //     tap((file:any)=>{
  //     }),
  //     takeUntil(this._destroy$)
  //   )
  //   .subscribe({
  //     next: ({name, data}) => {
  //       const dataUri = `data:${this.xlsxMimeType};base64,${data}`;
  //       const a = document.createElement('a');
  //       a.href = dataUri;
  //       a.download = name;
  //       a.click();
  //     },
  //     error: err => this.snackBar.open(`Не удалось экспортировать шаблон для импорта: ` + err.error?.error_message, undefined, this.snackBarWithShortDuration)
  //   });
  // }

  // private doImport(file: File): void {
  //   if (!this.importDialogRef) {
  //     return;
  //   }
  //   const fileName = file.name;
  //   const reader = new FileReader();
  //   reader.addEventListener('load', (event) => {
  //     if (typeof event.target?.result === 'string') {
  //       const base64URL = event.target?.result;
  //       const suffix = `;base64,`;
  //       const index = base64URL.indexOf(suffix);
  //       const data = base64URL.substring(index + suffix.length);
  //       const payload = { data, name: fileName };
  //       this.importData(payload).subscribe({
  //         // next: ({ import_key, text }) => {
  //         next: (e) => {
  //           const text =e.text;
  //           const res =e.result;
  //           const import_key=e.import_key;
  //           this.dialog.open(this.importDialogRef!, { data: {...payload, text, res} }).afterClosed().subscribe(res => {
  //             if (res===2) {
  //               this.importResult({ import_key }).subscribe({
  //                 next: ({name, data}) => {
  //                   const dataUri = `data:${this.xlsxMimeType};base64,${data}`;
  //                   const a = document.createElement('a');
  //                   a.href = dataUri;
  //                   a.download = name;
  //                   a.click();
  //                   this.snackBar.open('Данные импортированы успешно', undefined, this.snackBarWithShortDuration);
  //                   // this.onStartChange(0);
  //                   // this.resetPage();
  //                 },
  //                 error: (err) => this.snackBar.open(`Не удалось скачать файл с результатами обработки: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
  //               });
  //             }
  //             if (res===1) {
  //               this.importDataConfirm({ import_key }).subscribe({
  //                 next: () => {
  //                   this.snackBar.open('Данные импортированы успешно', undefined, this.snackBarWithShortDuration);
  //                   // this.onStartChange(0);
  //                   this.resetPage();
  //                 },
  //                 error: (err) => this.snackBar.open(`Не удалось импортировать данные: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
  //               });
  //             }
  //           });
  //         },
  //         error: (err) => this.snackBar.open(`Не удалось импортировать данные: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
  //       });
  //     }
  //   }, false);
  //   reader.addEventListener('error', () => this.snackBar.open(`Ошибка чтения файла ${fileName} `, undefined, this.snackBarWithShortDuration), false);
  //   reader.readAsDataURL(file);
  // }






  // ngOnInit() {
  //   forkJoin([
  //     this.directionService.directionFlight(),
  //     this.countryService.getCountries(),
  //   ])
  //   .pipe(
  //     tap((data) =>{
  //       console.log(data)
  //     }),
  //     takeUntil(this._destroy$))
  //   .subscribe({
  //     next: ([directionFlights, countries]) => {
  //       console.log('Направления:', directionFlights);
  //       console.log('Страны:', countries);
  //       this.isLoading = false;
  //     },
  //     error: (error) => {
  //       console.error('Ошибка при загрузке данных:', error);
  //       this.isLoading = false;
  //     }
  //   });
  // }



  // private getDirectionFlight() {
  //   this.directionService.directionFlight()
  //     .pipe(
  //       tap((countrys) => console.log(countrys)
  //       ),
  //       takeUntil(this._destroy$)
  //     ).subscribe();
  // }

  // private getCountries() {
  //   this.countryService.getCountries()
  //     .pipe(
  //       tap((countrys) => {console.log(countrys);
  //       }
  //       ),
  //       takeUntil(this._destroy$)
  //     ).subscribe();
  // }

}
