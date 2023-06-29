import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableFilterComponent implements OnInit {

  showMore = false;

  constructor(
    public filterService: FilterService,
  ) { }

  ngOnInit(): void {
  }
  
  toggleMore(): void {
    this.showMore = !this.showMore;
  }

}