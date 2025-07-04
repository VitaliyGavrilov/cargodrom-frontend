import { Injectable, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { 
  ContractorService, 
  CustomerService, 
  OrderService, 
  RequestService 
} from 'src/app/api/services';

type TableMethod<T = any> = (params?: any) => Observable<T>;

type TableConfig = {
  path: string; // Просто строка для поиска в URL
  rows: TableMethod;
  param: TableMethod;
};

type TablesMap = {
  [key: string]: TableConfig;
};

@Injectable({
  providedIn: 'root'
})
export class TableListService implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly tables: TablesMap = {
    rate_final: {
      path: 'pages/request/details/final',
      rows: (params) => this.requestService.requestRateFinalList(params),
      param: (params) => this.requestService.requestRateListParam(params)
    },
    rate_transporter: {
      path: 'pages/request/details/transporter',
      rows: (params) => this.requestService.requestRateTransporterList(params),
      param: (params) => this.requestService.requestRateListParam(params)
    },
    rate_custom: {
      path: 'pages/request/details/custom',
      rows: (params) => this.requestService.requestRateCustomsList(params),
      param: (params) => this.requestService.requestRateListParam(params)
    },
    rate_point: {
      path: 'pages/request/details/point',
      rows: (params) => this.requestService.requestRatePointList(params),
      param: (params) => this.requestService.requestRateListParam(params)
    },
    rate_other: {
      path: 'pages/request/details/other',
      rows: (params) => this.requestService.requestRateOtherList(params),
      param: (params) => this.requestService.requestRateListParam(params)
    },
    test: {
      path: 'pages/test',
      rows: (params) => this.requestService.requestList(params),
      param: (params) => this.requestService.requestListParam(params)
    },
    request: {
      path: 'pages/request',
      rows: (params) => this.requestService.requestList(params),
      param: (params) => this.requestService.requestListParam(params)
    },
    contractor: {
      path: 'pages/contractor',
      rows: (params) => this.contractorService.contractorList(params),
      param: (params) => this.contractorService.contractorListParam(params)
    },
    customer: {
      path: 'pages/customer',
      rows: (params) => this.customerService.customerList(params),
      param: (params) => this.customerService.customerListParam(params)
    },
    order: {
      path: 'pages/order/transportation',
      rows: (params) => this.orderService.orderList(params),
      param: (params) => this.orderService.orderListParam(params)
    },
    
  };

  constructor(
    private readonly location: Location,
    private readonly contractorService: ContractorService,
    private readonly requestService: RequestService,
    private readonly customerService: CustomerService,
    private readonly orderService: OrderService,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getCurrentTableKey(): string | null {
    const currentPath = this.location.path();
    
    // Ищем первую таблицу, чей path содержится в текущем URL
    const found = Object.entries(this.tables).find(([_, config]) => 
      currentPath.includes(config.path)
    );
    
    return found?.[0] ?? null;
  }

  private getTableMethod<T>(method: 'rows' | 'param', params?: any): Observable<T> {
    const tableKey = this.getCurrentTableKey() ?? 'request';
    const table = this.tables[tableKey];
    
    if (!table) {
      throw new Error(`Table configuration not found for key: ${tableKey}`);
    }
    
    const methodFn = table[method];
    if (typeof methodFn !== 'function') {
      throw new Error(`Method ${method} is not a function in table: ${tableKey}`);
    }
    
    return methodFn(params);
  }

  getRows<T = any>(params?: any): Observable<T> {
    return this.getTableMethod<T>('rows', params).pipe(
      takeUntil(this.destroy$)
    );
  }

  getParam<T = any>(params?: any): Observable<T> {
    return this.getTableMethod<T>('param', params).pipe(
      takeUntil(this.destroy$)
    );
  }
}