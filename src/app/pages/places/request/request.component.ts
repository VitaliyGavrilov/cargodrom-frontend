// import { SearchFilterSchema } from '../../../api/custom_models';
// import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
// import { LoadParams, Table } from '../../../classes';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
// import { FilterService } from 'src/app/filter/services/filter.service';
// import { RequestService } from 'src/app/api/services';
// import { Request, RequestFilter } from 'src/app/api/custom_models/request';
// import { TablePage } from 'src/app/classes/table-page';
// import { DynamicTableComponent } from '../../tables/dynamic-table/dynamic-table.component';

// interface FileConfig {
//   name:string;
//   data: string;
// }

// @Component({
//   selector: 'page-request',
//   templateUrl: './request.component.html',
//   styleUrls: ['./request.component.scss'],
//   encapsulation: ViewEncapsulation.None,
//   providers: [FilterService]
// })

// export class RequestPage{
//   // sortField = 'id' as const;

//   snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
//   snackBarWithLongDuration: MatSnackBarConfig = { duration: 5000 };

//   readonly xlsxMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

//   requestList:any;
//   requestListParam:any;

//   protected _destroy$ = new Subject<void>();

//   getRowsData:any;
//   getTableConfig:any;
//   getXLSXTable:any;
//   getXLSXTemplate:any;
//   importMetods:any;


//   // params:any;

//   // trackById = (_index: number, request: Request) => request.id!;

//   @ViewChild(DynamicTableComponent) DynamicTableComponent!: DynamicTableComponent;

//   constructor(
//     private requestService: RequestService,
//     private filterService: FilterService,
//     private dialog: MatDialog,
//     private snackBar: MatSnackBar,
//     private route: ActivatedRoute,
//     private router: Router,

//   ) {
//     this.getRowsData = this.requestService.requestList.bind(this.requestService);
//     this.getTableConfig = this.requestService.requestListParam.bind(this.requestService);
//     this.getXLSXTable = this.requestService.requestExport.bind(this.requestService);
//     this.getXLSXTemplate = this.requestService.requestImportTemplate.bind(this.requestService);
//     this.importMetods = {
//       import: this.requestService.requestImport.bind(this.requestService),
//       import_res: this.requestService.requestImportResult.bind(this.requestService),
//       import_con: this.requestService.requestImportConfirm.bind(this.requestService)
//     }
//   }

//   ngOnInit() {
//     this.getTable();
//   }

//   getRows(param:any) {
//     this.getRowsData(param)
//     .pipe(
//       tap((requestList) => {
//         this.requestList=requestList;
//         console.log('Получаем данные для заполнения таблицы:',requestList);
//       }),
//       takeUntil(this._destroy$),
//     )
//     .subscribe();
//   }

//   getTable() {
//     this.getTableConfig()
//     .pipe(
//       tap((requestListParam) => {
//         this.requestListParam=requestListParam;
//         console.log('Получаем данные для построения таблицы:',requestListParam);
//       }),
//       takeUntil(this._destroy$),
//     ).subscribe();
//   }


//   downloadFile(file:any){
//     const dataUri = `data:${this.xlsxMimeType};base64,${file.data}`;
//     const a = document.createElement('a');
//     a.href = dataUri;
//     a.download = file.name;
//     a.click();
//   }

//   getExportFile(){
//     this.getXLSXTable(this.DynamicTableComponent.returnTableParams())
//     .pipe(
//       tap((file:any)=>{
//       }),
//       takeUntil(this._destroy$)
//     )
//     .subscribe({
//       next: (file:any) => {
//         this.downloadFile(file);
//       },
//       error: (err:any) => this.snackBar.open(`Не удалось экспортировать данные таблицы: ` + err.error?.error_message, undefined, this.snackBarWithShortDuration)
//     });
//   }

//   getTempalteFile(){
//     this.getXLSXTemplate()
//     .pipe(
//       tap((file:any)=>{
//       }),
//       takeUntil(this._destroy$)
//     )
//     .subscribe({
//       next: (file:any) => {
//         this.downloadFile(file);
//       },
//       error: (err:any) => this.snackBar.open(`Не удалось экспортировать шаблон для импорта: ` + err.error?.error_message, undefined, this.snackBarWithShortDuration)
//     });
//   }



// }
