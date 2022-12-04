import { CountryService } from './../../services/country.service';
import { environment } from './../../../../environments/environment';
import { Country } from './../../../api/custom_models/country';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContractorFilter } from './../../../api/custom_models/contractor-filter';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-contractor-filter',
  templateUrl: './contractor-filter.component.html',
  styleUrls: ['./contractor-filter.component.scss']
})
export class ContractorFilterComponent implements OnInit, OnChanges {
  @Output() filterChange = new EventEmitter<Omit<ContractorFilter, 'start' | 'count'>>();
  @Input() filter?: ContractorFilter;
  filterForm: FormGroup;
  countries: Country[] = [];
  ratings = new Array(11);
  production = environment.production;

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
  ) {
    this.filterForm = fb.group({
      allow_trade: [undefined],
      country_departure: [undefined],
      country_arrival: [undefined],
      rating: [0],
      specialization: fb.group({
        avia: [false],
        avto: [false],
        sea: [false],
        rail: [false],
      })
    });
  }

  ngOnInit(): void {
    this.getCountries();
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

  private getCountries() {
    this.countryService.getCountries()
      .subscribe(countries => this.countries = countries);
  }
  
  private getFilter(): ContractorFilter {
    const value = this.filterForm.value;
    const specialization = value.specialization;
    const specArray: string[] = Object.keys(specialization).filter(key => specialization[key]);
    return {
      ...value,
      specialization: specArray
    };
  }

}


