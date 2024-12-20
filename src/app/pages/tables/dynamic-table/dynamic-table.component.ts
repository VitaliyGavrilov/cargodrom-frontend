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

// export interface LoadParams<T, F> {
//   id?:number;
//   start?: number;
//   count?: number;
//   sort?: SortColumn<T>[];
//   filter?: F
// }

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})

export class DynamicTableComponent implements OnInit, OnDestroy  {
  @Output() getRows=new EventEmitter<number>();

  @Input() rows!: any;
  @Input() tableConfig: any;

  sortField!: string;
  sortDir: 'asc' | 'desc' = 'asc';

  column?: string[]=[];
  sortableColumns?: string[]=[];
  columnsData:any=[];


  total = 0;
  start = 0;
  limits = [10, 25, 50, 100];
  count = this.limits[0];

  filter?: any;

  protected _destroy$ = new Subject<void>();

  private aliases = new Map<any, any[]>();

  readonly nameField?: keyof any | any;

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 5000 };


  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,

    private filterService: FilterService,
    private route: ActivatedRoute,
  ) {}

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


  ngOnInit(): void {
    this.filterService.onApply().subscribe(filter => {
      this.onFilterChange(filter);
    });
    this.setTableConfig();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onStartChange(newStart: number): void {
    this.router.navigate(['.'], {
      queryParams: { start: newStart },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }

  onCountChange(newCount: number): void {
    this.router.navigate(['.'], {
      queryParams: { count: newCount, start: 0 },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }

  loadRows(){
    const sortCol = this.getSort();
    this.getRows.emit({start: this.start, count: this.count, sort: JSON.stringify(sortCol), ...this.filter  })

  }

  returnTableParams(){
    return {start: this.start, count: this.count, sort: JSON.stringify(this.getSort()), ...this.filter  }
  }

  private onFilterChange(filter: any): void {
    const filterWithNonEmptyValue: any = {};
    for (const key in filter) {
      const value = filter[key];
      if (value != null && (value as any) !== '') {
        if (!Array.isArray(value) || value.length > 0) {
          filterWithNonEmptyValue[key] = value;
        }
      }
    }
    const hasKeys = Object.keys(filterWithNonEmptyValue).length > 0;
    this.router.navigate(['.'], {
      queryParams: { start: 0, filter: hasKeys ? JSON.stringify(filterWithNonEmptyValue) : null },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }

  private setTableConfig(){
    this.sortField = this.tableConfig?.sort[0].field;
    this.sortDir = this.tableConfig?.sort[0].dir;



    this.filterService.setSearchFilterSchema(this.tableConfig?.search);

    this.tableConfig?.table.forEach((col:any)=>{
      this.column?.push(col.column);
    })
    this.tableConfig?.sort.forEach((sor:any)=>{
      this.sortableColumns?.push(sor.field);
    })

    this.columnsData=this.tableConfig.table;

    this.subscribeRouteQueryParamMap();
  }


  private subscribeRouteQueryParamMap(){
    this.route.queryParamMap
      .pipe(
        tap((queryParamMap)=>{
          this.start = this.getIntParamSafely(queryParamMap, 'start', this.start);
          this.count = this.getIntEnumParamSafely(queryParamMap, 'count', this.limits, this.count);
          this.sortField = this.getStringParamSafely(queryParamMap, 'sortCol', this.sortField as string);
          this.sortDir = this.getEnumParamSafely(queryParamMap, 'sortDir', ['asc', 'desc'], this.sortDir) as 'asc' | 'desc';
          this.filter = this.getJsonParamSafely(queryParamMap, 'filter', {});
          this.filterService.setValue(this.filter as any);
          this.loadRows();
        }),
        takeUntil(this._destroy$)
      ).subscribe();
  }

  private getIntParamSafely(queryParamMap: ParamMap, name: string, fallback: number): number {
    const value = queryParamMap.get(name);
    if (value != null) {
      const intValue = parseInt(value, 10);
      return intValue;
    }
    return fallback;
  }

  private getIntEnumParamSafely(queryParamMap: ParamMap, name: string, values: number[], fallback: number): number {
    const value = queryParamMap.get(name);
    if (value != null) {
      const intValue = parseInt(value, 10);
      return values.includes(intValue) ? intValue : fallback;
    }
    return fallback;
  }

  private getEnumParamSafely(queryParamMap: ParamMap, name: string, values: string[], fallback: string): string {
    const value = queryParamMap.get(name);
    if (value != null && values.includes(value)) {
      return value;
    }
    return fallback;
  }

  private getStringParamSafely(queryParamMap: ParamMap, name: string, fallback: string): string {
    const value = queryParamMap.get(name);
    if (value != null) {
      return value;
    }
    return fallback;
  }

  private getJsonParamSafely(queryParamMap: ParamMap, name: string, fallback: any): unknown {
    const value = queryParamMap.get(name);
    if (value != null) {
      try {
        const json = JSON.parse(value);
        return json;
      } catch (e) {
        return fallback;
      }
    }
    return fallback;
  }

  private getSort(): any {
    const sortCol: any[] = [];
    const sortField = this.sortField;
    if (this.aliases.has(sortField)) {
      const fields = this.aliases.get(sortField)!;
      sortCol.push(...fields.map(field => ({ field, dir: this.sortDir })));
    } else {
      sortCol.push({ field: this.sortField as keyof any, dir: this.sortDir });
    }
    if (this.nameField && this.nameField !== this.sortField) {
      const name = this.nameField;
      if (this.aliases.has(name)) {
        const fields = this.aliases.get(name)!;
        sortCol.push(...fields.map(field => ({ field, dir: 'asc' as const })));
      } else {
        sortCol.push({ field: this.nameField as keyof any, dir: 'asc' });
      }
    }
    return sortCol;
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

  sort(field: any): void {
    if (Array.isArray(this.sortableColumns) && !this.sortableColumns.includes(field as string)) {
      return;
    }
    this.start = 0;
    if (this.sortField === field) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortDir = 'asc';
      this.sortField = field;
    }
    this.router.navigate(['.'], {
      queryParams: { sortCol: this.sortField, sortDir: this.sortDir, start: this.start },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
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
}

