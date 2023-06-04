import { CustomerService } from './../../../api/services/customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientFilter } from './../../../api/custom_models/client-filter';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ClientGroup, Country } from 'src/app/api/custom_models';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-client-filter',
  templateUrl: './client-filter.component.html',
  styleUrls: ['./client-filter.component.scss']
})
export class ClientFilterComponent implements OnInit, OnChanges {
  @Output() filterChange = new EventEmitter<Omit<ClientFilter, 'start' | 'count' | 'sort'>>();
  @Input() filter?: ClientFilter;
  filterForm: FormGroup;
  countries: Country[] = [];
  clientGroups: ClientGroup[] = [];
  showMore = false;

  constructor(
    private countryService: CountryService,
    private customerService: CustomerService,
    fb: FormBuilder,
  ) {
    this.filterForm = fb.group<ClientFilter>({
      country_id: 0,
      group_id: 0,
      inn: '',
      contact_id: 0,
    });
  }

  ngOnInit(): void {
    this.getCountries();
    this.getClientGroups();
  }

  apply(): void {
    if (this.filterForm.dirty) {
      const filter = this.getFilter();
      this.filterChange.emit(filter);
    }
  }

  reset(): void {
    this.filterForm.reset();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']) {
      this.filterForm.reset(this.filter);
    }
  }
  
  toggleMore(): void {
    this.showMore = !this.showMore;
  }

  private getCountries() {
    this.countryService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  private getClientGroups() {
    this.customerService
      .customerGroupList()
      .subscribe(clientGroups => this.clientGroups = (clientGroups.items as ClientGroup[]));
  }

  private getFilter(): ClientFilter {
    const value = this.filterForm.value as ClientFilter;
    return value;
  }

}
