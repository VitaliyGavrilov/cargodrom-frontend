import { ContractorFilter } from './../../../api/custom_models/contractor-filter';
import { ContractorService } from './../../../api/services/contractor.service';
import { Component } from '@angular/core';
import { Contractor, FilterCheckboxControl, FilterSelectControl, SearchFilterSchema } from '../../../api/custom_models';
import { LoadParams, Table } from '../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, delay, of, map } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';
@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.scss'],
  providers: [FilterService]
})

export class ContractorComponent extends Table<Contractor, 'trade_rating', ContractorFilter> {
  sortField = 'name' as const;


  trackById = (_index: number, contractor: Contractor) => contractor.id!;

  constructor(
    private contractorService: ContractorService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
    filter: FilterService,
  ) {
    super(route, router, dialog, snackBar, filter);
    this.registerAlias('trade_rating', ['trade_count', 'trade_success_count', 'trade_fail_count']);
  }

  load<Contractor>(params: LoadParams<Contractor, ContractorFilter>): Observable<{ total: number; items: Contractor[]; }> {
    return this.contractorService.contractorList(params as any) as unknown as Observable<{ total: number; items: Contractor[]; }>;
  }

  protected override loadFilterSchema<T>(): Observable<SearchFilterSchema> {
    const searchFilter = <SearchFilterSchema>{
      "header": [
        {
          "field": "name",
          "name": "Поиск подрядчика по названию...",
          "form": "autocomplete"
        }
      ],
      "main": [
        {
          "field": "bla",
          "name": "Специализация",
          "form": "checkbox",
          array: [
            { id: "avia", name: 'Авиа' },
            { id: "avto", name: 'Авто' },
            { id: "sea", name: 'Море' },
            { id: "rail", name: 'Ж/д' },
          ]
        } as FilterCheckboxControl,
        {
          "field": "rating",
          "name": "Рейтинг",
          "form": "select",
          array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => ({ id: i, name: `${i}/10 NPS` }))
        } as FilterSelectControl,
        {
          "field": "allow_trade",
          "name": "Доступ к торгам",
          "form": "select",
          array: [
            { id: true, name: 'Да' },
            { id: false, name: 'Нет' },
            { id: '', name: 'Не важно' },
          ]
        } as FilterSelectControl,
        {
          "field": "country_departure",
          "name": "Направление откуда",
          "form": "select",
          array: [
            { id: 1, name: 'Россия' },
            { id: 2, name: 'Китай' },
          ]
        } as FilterSelectControl,
        {
          "field": "country_arrival",
          "name": "Направление куда",
          "form": "select",
          array: [
            { id: 1, name: 'Россия' },
            { id: 2, name: 'Китай' },
          ]
        } as FilterSelectControl,
      ],
      "additional": [
      ]
    };
    return this.contractorService.contractorListSearch().pipe(map(val => val as any));
  }

}
