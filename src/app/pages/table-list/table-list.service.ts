import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { 
  ContractorService, 
  CustomerService, 
  RequestService 
} from 'src/app/api/services';
import { Location } from '@angular/common';

type TableConfig = {
  rows: (...args: any[]) => Observable<any>;
  param: (...args: any[]) => Observable<any>;
};

type TablesMap = {
  request: TableConfig;
  contractor: TableConfig;
  customer: TableConfig;
};

@Injectable({
  providedIn: 'root'
})
export class TableListService implements OnDestroy {

  private readonly destroy$ = new Subject<void>();
  private readonly tables:any = {
    request: {
      rows: (params?: any) => this.requestService.requestList(params),
      param: (params?: any) => this.requestService.requestListParam(params)
    },
    contractor: {
      rows: (params?: any) => this.contractorService.contractorList(params),
      param: (params?: any) => this.contractorService.contractorListParam(params)
    },
    customer: {
      rows: (params?: any) => this.customerService.customerList(params),
      param: (params?: any) => this.customerService.customerListParam(params)
    },
  };

  constructor(
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly contractorService: ContractorService,
    private readonly requestService: RequestService,
    private readonly customerService: CustomerService,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getRows(name:string,params?: any): Observable<any> {
    return this.tables[name].rows(params).pipe(
      takeUntil(this.destroy$)
    );
  }
  // getParam(params?: any): Observable<any> {
  //   return this.getTableMethod('param', params).pipe(
  //     takeUntil(this.destroy$)
  //   );
  // }


}