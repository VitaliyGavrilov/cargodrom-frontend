import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FilterPeriodControl } from 'src/app/api/custom_models';
import { FilterService } from '../../services/filter.service';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, skip, takeUntil } from 'rxjs';

@Component({
  selector: 'app-period-filter',
  templateUrl: './period-filter.component.html',
  styleUrls: ['./period-filter.component.scss']
})
export class PeriodFilterComponent implements OnInit, OnDestroy {
  @Input() filterControl!: FilterPeriodControl;

  day ='day';
  week = 'week';
  month ='month';

  startDate='';
  endDate='';

  dataBorder=false;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  unsubscribe$=new Subject<void>();

  constructor(
    public filter: FilterService,
    public chenge: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.filter.clearEmiter$
      .pipe(skip(1), takeUntil(this.unsubscribe$))
      .subscribe(()=> {
        this.range.reset();
        this.dataBorder=false;
      } )

    const date=this.filter.value[this.filterControl.field];

    if(date){
      this.dataBorder=true;
      const [start, end] = date.split('-');

      const startDateParts = start.split(".");
      const endDateParts = end.split(".");

      this.range.patchValue({
        start: new Date(+startDateParts[2], startDateParts[1] - 1, +startDateParts[0]),
        end: new Date(+endDateParts[2], endDateParts[1] - 1, +endDateParts[0])
      })
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  startDateChange(e:any){
    this.startDate=formatDate(e.value,'dd.MM.yyyy','ru-RU');
    this.fullDateChange();
  }

  endDateChange(e:any){
    this.endDate=formatDate(e.value,'dd.MM.yyyy','ru-RU');
    this.fullDateChange();
  }

  fullDateChange(){
    this.dataBorder=true;
    this.filter.value[this.filterControl.field]=`${this.startDate}-${this.endDate}`
  }

  change(id: string): void {
    this.range.reset();
    this.dataBorder=false;
    if(id===this.filter.value[this.filterControl.field]){
      this.filter.value[this.filterControl.field]="";
    }
  }
}
