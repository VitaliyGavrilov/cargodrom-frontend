/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';



/**
 * Работа с направлениями
 */
@Injectable({
  providedIn: 'root',
})
export class DirectionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation directionType
   */
  static readonly DirectionTypePath = '/direction_type';

  /**
   * Направления перевозок.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `directionType()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionType$Response(params?: {
  }): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, DirectionService.DirectionTypePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
   * Направления перевозок.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `directionType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionType(params?: {
  }): Observable<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>> {

    return this.directionType$Response(params).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>>) => r.body as Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>)
    );
  }

  /**
   * Path part for operation directionCountryList
   */
  static readonly DirectionCountryListPath = '/direction_country_list';

  /**
   * Список стран.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `directionCountryList()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionCountryList$Response(params?: {
  }): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, DirectionService.DirectionCountryListPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<{
        
        /**
         * ID
         */
        'id': number;
        
        /**
         * Наименование
         */
        'name'?: string;
        
        /**
         * Время создания
         */
        'time_add'?: string;
        
        /**
         * Время изменения
         */
        'time_edit'?: string;
        }>>;
      })
    );
  }

  /**
   * Список стран.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `directionCountryList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionCountryList(params?: {
  }): Observable<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>> {

    return this.directionCountryList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>>) => r.body as Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>)
    );
  }

  /**
   * Path part for operation directionCityList
   */
  static readonly DirectionCityListPath = '/direction_city_list';

  /**
   * Список городов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `directionCityList()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionCityList$Response(params: {

    /**
     * ID страны (ID берем из запроса - direction_country_list)
     */
    country_id: number;

    /**
     * Поисковая строка
     */
    search?: string;
  }): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, DirectionService.DirectionCityListPath, 'get');
    if (params) {
      rb.query('country_id', params.country_id, {});
      rb.query('search', params.search, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<{
        
        /**
         * ID
         */
        'id': number;
        
        /**
         * Наименование
         */
        'name'?: string;
        
        /**
         * Время создания
         */
        'time_add'?: string;
        
        /**
         * Время изменения
         */
        'time_edit'?: string;
        }>>;
      })
    );
  }

  /**
   * Список городов.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `directionCityList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionCityList(params: {

    /**
     * ID страны (ID берем из запроса - direction_country_list)
     */
    country_id: number;

    /**
     * Поисковая строка
     */
    search?: string;
  }): Observable<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>> {

    return this.directionCityList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>>) => r.body as Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>)
    );
  }

  /**
   * Path part for operation directionPointList
   */
  static readonly DirectionPointListPath = '/direction_point_list';

  /**
   * Список точек (аэропорт/порт/станция).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `directionPointList()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionPointList$Response(params: {

    /**
     * ID города (ID берем из запроса - direction_city_list)
     */
    city_id: number;

    /**
     * ID способа доставки (ID берем из запроса - transport_kind_id)
     */
    transport_kind_id: string;

    /**
     * Поисковая строка
     */
    search?: string;
  }): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * ID города
 */
'city_id'?: number;

/**
 * ID страны
 */
'country_id'?: number;

/**
 * ID типа точки
 */
'type_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, DirectionService.DirectionPointListPath, 'get');
    if (params) {
      rb.query('city_id', params.city_id, {});
      rb.query('transport_kind_id', params.transport_kind_id, {});
      rb.query('search', params.search, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<{
        
        /**
         * ID
         */
        'id': number;
        
        /**
         * Наименование
         */
        'name'?: string;
        
        /**
         * ID города
         */
        'city_id'?: number;
        
        /**
         * ID страны
         */
        'country_id'?: number;
        
        /**
         * ID типа точки
         */
        'type_id'?: number;
        
        /**
         * Время создания
         */
        'time_add'?: string;
        
        /**
         * Время изменения
         */
        'time_edit'?: string;
        }>>;
      })
    );
  }

  /**
   * Список точек (аэропорт/порт/станция).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `directionPointList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionPointList(params: {

    /**
     * ID города (ID берем из запроса - direction_city_list)
     */
    city_id: number;

    /**
     * ID способа доставки (ID берем из запроса - transport_kind_id)
     */
    transport_kind_id: string;

    /**
     * Поисковая строка
     */
    search?: string;
  }): Observable<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * ID города
 */
'city_id'?: number;

/**
 * ID страны
 */
'country_id'?: number;

/**
 * ID типа точки
 */
'type_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>> {

    return this.directionPointList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * ID города
 */
'city_id'?: number;

/**
 * ID страны
 */
'country_id'?: number;

/**
 * ID типа точки
 */
'type_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>>) => r.body as Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * ID города
 */
'city_id'?: number;

/**
 * ID страны
 */
'country_id'?: number;

/**
 * ID типа точки
 */
'type_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>)
    );
  }

  /**
   * Path part for operation directionBorderList
   */
  static readonly DirectionBorderListPath = '/direction_border_list';

  /**
   * Список границ.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `directionBorderList()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionBorderList$Response(params: {

    /**
     * ID страны (ID берем из запроса - direction_country_list)
     */
    country_id: number;

    /**
     * Поисковая строка
     */
    search?: string;
  }): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, DirectionService.DirectionBorderListPath, 'get');
    if (params) {
      rb.query('country_id', params.country_id, {});
      rb.query('search', params.search, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<{
        
        /**
         * ID
         */
        'id': number;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>>;
      })
    );
  }

  /**
   * Список границ.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `directionBorderList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionBorderList(params: {

    /**
     * ID страны (ID берем из запроса - direction_country_list)
     */
    country_id: number;

    /**
     * Поисковая строка
     */
    search?: string;
  }): Observable<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;
}>> {

    return this.directionBorderList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;
}>>) => r.body as Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;
}>)
    );
  }

}
