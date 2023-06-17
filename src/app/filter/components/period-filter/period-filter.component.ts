import { Component, Input, OnInit } from '@angular/core';
import { FilterPeriodControl } from 'src/app/api/custom_models';

@Component({
  selector: 'app-period-filter',
  templateUrl: './period-filter.component.html',
  styleUrls: ['./period-filter.component.scss']
})
export class PeriodFilterComponent implements OnInit {
  @Input() filterControl!: FilterPeriodControl;

  constructor() { }

  ngOnInit(): void {
  }

}
