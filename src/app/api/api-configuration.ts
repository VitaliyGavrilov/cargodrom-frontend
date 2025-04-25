/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
// export class ApiConfiguration {
//   rootUrl: string = 'https://dev.cargodrom.com/api/1.0';
// }

export class ApiConfiguration {
  rootUrl: string = environment.apiUrl;
}

/**
 * Parameters for `ApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
