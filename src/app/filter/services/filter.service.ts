import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { FilterControl, SearchFilterSchema } from 'src/app/api/custom_models';

@Injectable()
export class FilterService implements OnDestroy {
  value: {
    [field: string]: any
  } = {

    };

  searchFilterSchema?: SearchFilterSchema;

  private search$ = new Subject<void>();

  constructor(

  ) { }

  setSearchFilterSchema(filter: SearchFilterSchema) {
    this.searchFilterSchema = filter;
    this.softReset();
  }

  private softReset(overwrite = false): void {
    if (this.searchFilterSchema) {
      const allControls = [...this.searchFilterSchema.header, ...this.searchFilterSchema.main, ...this.searchFilterSchema.additional];
      allControls.forEach(control => {
        if (control.field in this.value) {
          if (overwrite) {
            this.value[control.field] = this.getDefault(control);
          }
        } else {
          this.value[control.field] = this.getDefault(control);
        }
      });
    }
  }
  
  private getDefault(control: FilterControl): any {
    if (control.form === 'checkbox' || control.form === 'checkbox_reset') {
      return [];
    }
    return '';
  }

  reset(): void {
    if (this.searchFilterSchema) {
      const allControls = [...this.searchFilterSchema.header, ...this.searchFilterSchema.main, ...this.searchFilterSchema.additional];
      allControls.forEach(control => {
        this.value[control.field] = this.getDefault(control);
      });
    }
  }

  onApply(): Observable<{ [field: string]: any }> {
    return this.search$.pipe(map(() => this.value));
  }

  apply(): void {
    this.search$.next();
  }

  setValue(value: { [field: string]: any }): void {
    if (this.searchFilterSchema) {
      const allControls = [...this.searchFilterSchema.header, ...this.searchFilterSchema.main, ...this.searchFilterSchema.additional];
      allControls.forEach(control => {
        if (control.field in value) {
          this.value[control.field] = value[control.field];
        } else {
          this.value[control.field] = this.getDefault(control);
        }
      });
    }
  }
  
  ngOnDestroy(): void {
    this.search$.complete();
  }
}
