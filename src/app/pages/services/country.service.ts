import { Observable, startWith, tap } from 'rxjs';
import { DirectionService } from './../../api/services/direction.service';
import { Injectable } from '@angular/core';
import { Country } from './../../api/custom_models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  static readonly countriesKey = 'com.cargodrom.countries';

  constructor(
    private directionService: DirectionService,
  ) {

  }

  getCountries(): Observable<Country[]> {
    return this.directionService.directionCountry().pipe(
      startWith(this.loadCountriesFromLocalStorage()),
      tap(countries => this.saveCountriesToLocalStorage(countries))
    )
  }
  
  private saveCountriesToLocalStorage(countries: Country[]): void {
    window.localStorage.setItem(CountryService.countriesKey, JSON.stringify(countries));
  }
  
  private loadCountriesFromLocalStorage(): Country[] {
    const text = window.localStorage.getItem(CountryService.countriesKey);
    let countries: Country[] = []; 
    if (!text) {
      return [];
    }
    try {
      countries = JSON.parse(text);
    } catch(e) {
      countries = []
    }
    return countries;
  }
}
