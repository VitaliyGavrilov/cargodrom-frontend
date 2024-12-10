import { SearchFilterSchema } from './../../../api/custom_models';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { LoadParams, Table } from '../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
import { RequestService } from 'src/app/api/services';
import { Request, RequestFilter } from 'src/app/api/custom_models/request';

@Component({
  selector: 'app-page-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FilterService]
})

export class RequestPageComponent implements OnInit, OnDestroy {






  constructor(
    private requestService: RequestService,

  ) { }


  ngOnInit(){

  }
  ngOnDestroy(){

  }

  loadRows<Request>(params?: LoadParams<Request, RequestFilter>): Observable<{ total: number; items: Request[];sort_new:any; }> {
    return this.requestService.requestList(params as any) as unknown as Observable<{ total: number; items: Request[]; column: string[], sort?: string[],sort_new:any }>;
  }

  loadFilterSchema(): Observable<any>  {
    return this.requestService.requestListParam();
  }


}
