/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';



/**
 * Груз
 */
@Injectable({ providedIn: 'root' })
export class CargoService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `cargoPackage()` */
  static readonly CargoPackagePath = '/cargo_package';

  /**
   * Вид упаковки.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cargoPackage()` instead.
   *
   * This method doesn't expect any request body.
   */
  cargoPackage$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>>> {
    const rb = new RequestBuilder(this.rootUrl, CargoService.CargoPackagePath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<{
        
        /**
         * ID
         */
        'id'?: number;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>>;
      })
    );
  }

  /**
   * Вид упаковки.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cargoPackage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cargoPackage(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>> {
    return this.cargoPackage$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>>): Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}> => r.body)
    );
  }

  /** Path part for operation `cargoType()` */
  static readonly CargoTypePath = '/cargo_type';

  /**
   * Вид груза.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cargoType()` instead.
   *
   * This method doesn't expect any request body.
   */
  cargoType$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Параметры
 */
'param'?: string;
}>>> {
    const rb = new RequestBuilder(this.rootUrl, CargoService.CargoTypePath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<{
        
        /**
         * ID
         */
        'id'?: number;
        
        /**
         * Наименование
         */
        'name'?: string;
        
        /**
         * Параметры
         */
        'param'?: string;
        }>>;
      })
    );
  }

  /**
   * Вид груза.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cargoType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cargoType(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Параметры
 */
'param'?: string;
}>> {
    return this.cargoType$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Параметры
 */
'param'?: string;
}>>): Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Параметры
 */
'param'?: string;
}> => r.body)
    );
  }

}
