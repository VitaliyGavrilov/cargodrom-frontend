import { ContractorFilter } from '../../../api/custom_models/contractor-filter';
import { ContractorService } from '../../../api/services/contractor.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contractor, SearchFilterSchema } from '../../../api/custom_models';
import { LoadParams, Table } from '../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, filter, map, of } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
import { RequestService } from 'src/app/api/services';
@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
  providers: [FilterService],
})
export class RequestDetailsComponent implements OnInit, OnDestroy {
  detailsMode:string|null='total';
  id:number=0;

  constructor(
    private contractorService: ContractorService,
    private requestService: RequestService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private filter: FilterService,
  ) {

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const mode = this.route.snapshot.paramMap.get('mode');
    this.detailsMode=mode
    this.id=id;
    console.log(id,mode);
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  test(add:any){
   this.router.navigate(['pages/request/details', this.id, add])
   this.ngOnInit()
  }



}
