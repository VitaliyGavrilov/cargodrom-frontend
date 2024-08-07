import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableFilterComponent implements OnInit {

  showMore = false;

  asd=false;

  @Input() isBiddingMode?: boolean;
  @Input() isRateDetailsMode?: boolean;

  @Input() quantityContractors?: number;

  @Output() saveBidding = new EventEmitter<any>();

  constructor(
    public filterService: FilterService,
  ) { }

  ngOnInit(): void {
  }

  toggleMore(): void {
    this.showMore = !this.showMore;
  }

  saveBiddingBtn(): void {
    this.saveBidding.emit();
  }

}
