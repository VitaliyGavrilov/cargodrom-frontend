import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SortColumn } from '../api/custom_models/sort-column';
import { Directive, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

export interface LoadParams<T, F> {
  start?: number;
  count?: number;
  sort?: SortColumn<T>[];
  filter?: F
}

@Directive()
export abstract class Table<T extends { id: number }, A = never, F = never> implements OnInit, OnDestroy {
  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 5000 };
  protected abstract load<T>(params: LoadParams<T, F>): Observable<{ total: number, items: T[] }>;

  protected removedMessage: string = 'Запись удалена';

  protected destroy$ = new Subject<void>();
  rows: T[] = [];
  total = 0;
  start = 0;
  limits = [10, 25, 50, 100];
  count = this.limits[0];
  abstract sortField: keyof T | A;
  readonly nameField?: keyof T | A;
  sortDir: 'asc' | 'desc' = 'asc';
  @ViewChild('removeDialogRef') removeDialogRef!: TemplateRef<T>;
  private aliases = new Map<A, (keyof T)[]>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    protected snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(queryParamMap => {
        this.start = this.getIntParamSafely(queryParamMap, 'start', this.start);
        this.count = this.getIntEnumParamSafely(queryParamMap, 'count', this.limits, this.count);
        this.sortField = this.getStringParamSafely(queryParamMap, 'sortCol', this.sortField as string) as keyof T;
        this.sortDir = this.getEnumParamSafely(queryParamMap, 'sortDir', ['asc', 'desc'], this.sortDir) as 'asc' | 'desc';
        this.loadRows();
      });
  }

  protected loadRows(filter?: F): void {
    const sortCol = this.getSort();
    this.load({ start: this.start, count: this.count, sort: JSON.stringify(sortCol) as unknown as SortColumn<T>[], ...filter }).subscribe(rows => {
      this.rows = rows ? rows.items as T[] : [];
      this.total = rows.total;
    });
  }
  
  protected delete(params: { body: { id: number } }): Observable<void> {
    return of();
  }


  getIntParamSafely(queryParamMap: ParamMap, name: string, fallback: number): number {
    const value = queryParamMap.get(name);
    if (value != null) {
      const intValue = parseInt(value, 10);
      return intValue;
    }
    return fallback;
  }

  getIntEnumParamSafely(queryParamMap: ParamMap, name: string, values: number[], fallback: number): number {
    const value = queryParamMap.get(name);
    if (value != null) {
      const intValue = parseInt(value, 10);
      return values.includes(intValue) ? intValue : fallback;
    }
    return fallback;
  }

  getEnumParamSafely(queryParamMap: ParamMap, name: string, values: string[], fallback: string): string {
    const value = queryParamMap.get(name);
    if (value != null && values.includes(value)) {
      return value;
    }
    return fallback;
  }

  getStringParamSafely(queryParamMap: ParamMap, name: string, fallback: string): string {
    const value = queryParamMap.get(name);
    if (value != null) {
      return value;
    }
    return fallback;
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

  sort(field: keyof T | A): void {
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

  confirmRemove(row: T): void {
    this.dialog.open(this.removeDialogRef, { data: row }).afterClosed().subscribe(res => {
      if (res) {
        this.remove(row);
      }
    });
  }

  remove(row: T): void {
    const body = { id: row.id };
    this.delete({ body })
      .subscribe({
        next: () => {
          this.snackBar.open(this.removedMessage, undefined, this.snackBarWithShortDuration);
          this.loadRows();
        },
        error: (err) => this.snackBar.open(`Ошибка удаления: ` + err?.error?.error_message, undefined, { duration: 1000 })
      });
  }

  getColTitle(field: keyof T | A): string {
    if (field === this.sortField) {
      return this.sortDir === 'asc' ? 'сортировать по убыванию' : 'сортировать по возрастанию'
    }
    return 'сортировать по возрастанию';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getSort(): SortColumn<T>[] {
    const sortCol: SortColumn<T>[] = [];
    const sortField = this.sortField as unknown as A;
    if (this.aliases.has(sortField)) {
      const fields = this.aliases.get(sortField)!;
      sortCol.push(...fields.map(field => ({ field, dir: this.sortDir })));
    } else {
      sortCol.push({ field: this.sortField as keyof T, dir: this.sortDir });
    }
    if (this.nameField && this.nameField !== this.sortField) {
      const name = this.nameField as unknown as A;
      if (this.aliases.has(name)) {
        const fields = this.aliases.get(name)!;
        sortCol.push(...fields.map(field => ({ field, dir: 'asc' as const })));
      } else {
        sortCol.push({ field: this.nameField as keyof T, dir: 'asc' });
      }
    }
    return sortCol;
  }

  registerAlias(alias: A, fields: (keyof T)[]): void {
    this.aliases.set(alias, fields);
  }

}
