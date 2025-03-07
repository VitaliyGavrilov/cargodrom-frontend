import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SortColumn } from '../../../api/custom_models/sort-column';
import { Directive, OnInit, OnDestroy, ViewChild, TemplateRef, ElementRef, Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NEVER, Observable, of, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FilterService } from '../../../filter/services/filter.service';
import { SearchFilterSchema } from '../../../api/custom_models';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})

export class DynamicTableComponent implements OnInit, OnDestroy  {

  @Input() rows?: any[];
  @Input() columnsData: any;
  @Input() sortableColumns: any;
  @Input() sortField: any;
  @Input() sortDir: any;
  @Input() column: any;

  @Output() sortTable = new EventEmitter<any>()

  protected _destroy$ = new Subject<void>();

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 5000 };

  constructor(
    private router: Router,
    private filterService: FilterService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if(this.rows){console.log('rows tru', this.rows)};


  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  getColTitle(field: any): string {
    if (Array.isArray(this.sortableColumns) && !this.sortableColumns.includes(field as string)) {
      return '';
    }
    if (field === this.sortField) {
      return this.sortDir === 'asc' ? 'сортировать по убыванию' : 'сортировать по возрастанию'
    }
    return 'сортировать по возрастанию';
  }

  getSortClass(field: any): string {
    if (this.sortField === field) {
      return this.sortDir === 'asc' ? 'column-sortable sort-dir-asc' : 'column-sortable sort-dir-desc';
    } else if (this.isSortable(field)) {
      return 'column-sortable';
    }
    return '';
  }

  isSortable(name: any): boolean {
    return Array.isArray(this.sortableColumns) && this.sortableColumns.includes(name as any);
  }

  sort(param:any){
    this.sortTable.emit(param);
  }

  getVal(obj: any, path: string): any {
    if (!path?.includes('/')) {
        return obj[path] !== undefined ? obj[path] : null;
    }
    const keys = path?.split('/');
    for (const key of keys) {
      if (obj && obj.hasOwnProperty(key)) {
          obj = obj[key];
      } else {
          return null; // Если ключ не найден, возвращаем null
      }
    }
    return obj !== undefined ? obj : null; // Проверка на undefined
  }

  navigateOnDetails(requestId:any){
    this.router.navigate(['pages/request/details/final', requestId])
  }
  navigateOnClient(clientId:any){
    this.router.navigate(['pages/customer/edit', clientId])
  }
}

