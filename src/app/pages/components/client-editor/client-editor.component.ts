import { innValidator } from './../../../validators/pattern-validator';
import { Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { City, Client, Country } from 'src/app/api/custom_models';
import { CustomerService, SystemService } from 'src/app/api/services';
import { Editor } from 'src/app/classes/editor';
import { Location } from '@angular/common';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-client-editor',
  templateUrl: './client-editor.component.html',
  styleUrls: ['./client-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClientEditorComponent extends Editor<Client> implements OnInit{
  private entity = 'Клиент';
  editTitle = 'Информация о клиенте';
  newTitle = 'Добавление клиента';
  savedMessage = `${this.entity} сохранен`;
  removedMessage = `${this.entity} удален`;
  createdMessage = `${this.entity} создан`;
  notFoundMessage = `${this.entity} не найден`;

  countries: Country[] = [];
  cities: City[] = [];

  constructor(
    private fb: FormBuilder,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    systemService: SystemService,
    location: Location,
    router: Router,
    private customerService: CustomerService,
    private cityService: CityService,
    private countryService: CountryService,
  ) {
    super(location, systemService, route, snackBar, router);
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      name_full: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      inn: ['', [innValidator]],
      kpp: ['', []],
      ogrn: ['', []],
      okpo: ['', []],
    });
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
    this.getCountries();
  }

  protected override create(params: { body: Omit<Client, 'id'>; }): Observable<{ id: number; }> {
    return this.customerService.customerCreate(params as any);
  }

  protected override read(params: { id: number; }): Observable<Client> {
    return this.customerService.customerInfo(params).pipe(tap(({country_id}) => this.getCities(country_id!))) as Observable<Client>
  }

  protected override update(params: { body: Partial<Client>; }): Observable<void> {
    return this.customerService.customerUpdate(params as any) as unknown as Observable<void>;
  }

  protected override delete(params: { body: { id: number; }; }): Observable<void> {
    return this.customerService.customerDelete(params as any) as unknown as Observable<void>;
  }

  protected override getNameForHeader(body: Client): string {
    return `${body.name}`;
  }
  
  private getCountries() {
    this.countryService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  private getCities(countryId: number) {
    this.cityService.getCities(countryId)
      .subscribe(cities => this.cities = cities);
  }

  onCountryChange(countryId: number): void {
    this.form.controls['city_id'].reset(undefined);
    this.getCities(countryId);
  }
}
