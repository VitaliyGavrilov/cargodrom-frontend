import { CustomerService } from './../../../api/services/customer.service';
import { Client, ClientFilter, FilterSelectControl, SearchFilterSchema } from './../../../api/custom_models';
import { Component, ViewEncapsulation } from '@angular/core';
import { LoadParams, Table } from '../../../classes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, delay, of } from 'rxjs';
import { FilterService } from 'src/app/filter/services/filter.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FilterService],
})
export class ClientComponent extends Table<Client, 'name', ClientFilter> {
  sortField = 'name' as const;
  
  
  trackById = (_index: number, client: Client) => client.id!;

  constructor(
    private customerService: CustomerService,
    filterService: FilterService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    router: Router,
  ) {
    super(route, router, dialog, snackBar, filterService);
  }

  load<Client>(params: LoadParams<Client, ClientFilter>): Observable<{ total: number; items: Client[]; }> {
    return this.customerService.customerList(params as any) as unknown as Observable<{ total: number; items: Client[]; column: string[], sort: string[] }>;
  }
  
  protected override loadFilterSchema<T>(): Observable<SearchFilterSchema> {
    const searchFilter = <SearchFilterSchema> {
      "header": [
        {
          "field": "name",
          "name": "Поиск клиента по названию...",
          "form": "autocomplete"
        }
      ],
      "main": [
        {
          "field": "country_id",
          "name": "Страна",
          "form": "select",
          array: [
            { id: 1, name: 'Россия' }
          ]
        } as FilterSelectControl,
        {
          "field": "group_id",
          "name": "Группа",
          "form": "select",
          array: [
            { id: 1, name: 'ГРуппа' }
          ]
        } as FilterSelectControl
      ],
      "additional": [
        {
          "field": "inn",
          "name": "ИНН",
          "form": "text"
        },
        {
          "field": "contact_fio",
          "name": "Контактное лицо",
          "form": "text"
        }
      ]
    };
    return of(searchFilter).pipe(delay(400));
  }

}
