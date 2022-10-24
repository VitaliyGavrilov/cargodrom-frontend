import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() total = 0;
  @Input() count = 0;
  @Input() start = 0;
  @Input() limits: number[] = [10, 50, 100];

  @Output() startChange = new EventEmitter<number>();
  @Output() countChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  get first(): number {
    return this.start + 1;
  }

  get last(): number {
    return Math.min(this.start + this.count, this.total);
  }

  get currentPage(): number {
    return Math.ceil(this.start / this.count);
  }

  get prevPage(): number {
    return this.currentPage - 1;
  }

  get nextPage(): number {
    return this.currentPage + 1;
  }

  get nextNextPage(): number {
    return this.currentPage + 2;
  }

  get prevPrevPage(): number {
    return this.currentPage - 2;
  }

  get lastPage(): number {
    return Math.ceil(this.total / this.count) - 1;
  }

  goToPage(page: number): void {
    this.startChange.emit(page * this.count);
  }

  newCountSelected(count: number | string): void {
    this.countChange.emit(+count);
  }
  
  userPage(page: number ): number {
    return page + 1;
  }

}
