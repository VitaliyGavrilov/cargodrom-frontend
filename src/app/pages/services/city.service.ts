import { City } from './../../api/custom_models/city';
import { Injectable } from '@angular/core';
import { map, Observable, startWith, tap } from 'rxjs';
import { DirectionService } from '../../api/services/direction.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  static readonly citiesKey = 'com.cargodrom.cities';

  constructor(
    private directionService: DirectionService,
  ) {

  }

  getCities(countryId: number): Observable<City[]> {
    return this.directionService.directionCity({ country_id: countryId }).pipe(
      startWith(this.loadCitiesFromLocalStorage(countryId)),
      map(cities => cities ? cities as City[] : []),
      tap(cities => this.saveCitiesToLocalStorage(countryId, cities))
    )
  }
  
  private saveCitiesToLocalStorage(countryId: number, cities: City[]): void {
    const key = this.makeLocalStorageKey(countryId);
    window.localStorage.setItem(key, JSON.stringify(cities));
  }
  
  private loadCitiesFromLocalStorage(countryId: number): City[] {
    const key = this.makeLocalStorageKey(countryId);
    const text = window.localStorage.getItem(key);
    let cities: City[] = []; 
    if (!text) {
      return [];
    }
    try {
      cities = JSON.parse(text);
    } catch(e) {
      cities = []
    }
    return cities;
  }
  
  makeLocalStorageKey(countryId: number): string {
    return `${CityService.citiesKey}.${countryId}`;
  }
}
