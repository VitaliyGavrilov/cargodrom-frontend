import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContractorService, CustomerService, RequestService } from 'src/app/api/services';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private contractorService: ContractorService,
    private requestService: RequestService,
    private customerService: CustomerService,
  ) {}

  tables:any = {
    request: {
      rows: this.requestService.requestList(),
      param: this.requestService.requestListParam()
    },
    contractor: {
      rows: this.contractorService.contractorList(),
      param: this.contractorService.contractorListParam()
    },
    customer: {
      rows: this.customerService.customerList(),
      param: this.customerService.customerListParam()
    },
    

  }

  getRows(table_name:string){
    const table = this.tables[table_name];

  }
  getParam(table:string){

  }

}
