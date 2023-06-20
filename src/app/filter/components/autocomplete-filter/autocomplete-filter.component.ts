import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FilterAutocompleteControl } from 'src/app/api/custom_models';
import { FilterService } from '../../services/filter.service';
import { Subject, debounceTime, distinctUntilChanged, filter as rxjsFilter } from 'rxjs';

@Component({
  selector: 'app-autocomplete-filter',
  templateUrl: './autocomplete-filter.component.html',
  styleUrls: ['./autocomplete-filter.component.scss']
})
export class AutocompleteFilterComponent implements OnInit, OnDestroy {
  @Input() filterControl!: FilterAutocompleteControl;
  change$ = new Subject<string>();
  constructor(
    public filter: FilterService
  ) {
    this.change$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      rxjsFilter(val => val === '' || val.length > 1),
    )
      .subscribe(() => this.filter.apply());
  }

  ngOnInit(): void {
  }

  onChange(query: string) {
    this.change$.next(query);
  }

  ngOnDestroy(): void {
    this.change$.complete();
  }

}
