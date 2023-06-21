/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
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
    context?: HttpContext
  }
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

    const rb = new RequestBuilder(this.rootUrl, DirectionService.DirectionTypePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
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
    context?: HttpContext
  }
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
   * Path part for operation directionCountry
   */
  static readonly DirectionCountryPath = '/direction_country';

  /**
   * Список стран.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `directionCountry()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionCountry$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Наименование, откуда
 */
'name_from'?: string;

/**
 * Наименование, куда
 */
'name_to'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, DirectionService.DirectionCountryPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
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
         * Наименование, откуда
         */
        'name_from'?: string;
        
        /**
         * Наименование, куда
         */
        'name_to'?: string;
        
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
   * To access the full response (for headers, for example), `directionCountry$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionCountry(params?: {
    context?: HttpContext
  }
): Observable<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Наименование, откуда
 */
'name_from'?: string;

/**
 * Наименование, куда
 */
'name_to'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>> {

    return this.directionCountry$Response(params).pipe(
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
 * Наименование, откуда
 */
'name_from'?: string;

/**
 * Наименование, куда
 */
'name_to'?: string;

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
 * Наименование, откуда
 */
'name_from'?: string;

/**
 * Наименование, куда
 */
'name_to'?: string;

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
   * Path part for operation directionCity
   */
  static readonly DirectionCityPath = '/direction_city';

  /**
   * Список городов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `directionCity()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionCity$Response(params: {

    /**
     * ID страны (ID берем из запроса - direction_country)
     */
    country_id: number;

    /**
     * Поисковая строка
     */
    search?: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<{

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

    const rb = new RequestBuilder(this.rootUrl, DirectionService.DirectionCityPath, 'get');
    if (params) {
      rb.query('country_id', params.country_id, {});
      rb.query('search', params.search, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
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
   * To access the full response (for headers, for example), `directionCity$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionCity(params: {

    /**
     * ID страны (ID берем из запроса - direction_country)
     */
    country_id: number;

    /**
     * Поисковая строка
     */
    search?: string;
    context?: HttpContext
  }
): Observable<Array<{

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

    return this.directionCity$Response(params).pipe(
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
   * Path part for operation directionPoint
   */
  static readonly DirectionPointPath = '/direction_point';

  /**
   * Список точек (аэропорт/порт/станция).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `directionPoint()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionPoint$Response(params: {

    /**
     * ID города (ID берем из запроса - direction_city)
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
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<{

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

    const rb = new RequestBuilder(this.rootUrl, DirectionService.DirectionPointPath, 'get');
    if (params) {
      rb.query('city_id', params.city_id, {});
      rb.query('transport_kind_id', params.transport_kind_id, {});
      rb.query('search', params.search, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
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
   * To access the full response (for headers, for example), `directionPoint$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionPoint(params: {

    /**
     * ID города (ID берем из запроса - direction_city)
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
    context?: HttpContext
  }
): Observable<Array<{

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

    return this.directionPoint$Response(params).pipe(
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
   * Path part for operation directionBorder
   */
  static readonly DirectionBorderPath = '/direction_border';

  /**
   * Список границ.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `directionBorder()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionBorder$Response(params: {

    /**
     * ID страны (ID берем из запроса - direction_country)
     */
    country_id: number;

    /**
     * Поисковая строка
     */
    search?: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, DirectionService.DirectionBorderPath, 'get');
    if (params) {
      rb.query('country_id', params.country_id, {});
      rb.query('search', params.search, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
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
   * To access the full response (for headers, for example), `directionBorder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  directionBorder(params: {

    /**
     * ID страны (ID берем из запроса - direction_country)
     */
    country_id: number;

    /**
     * Поисковая строка
     */
    search?: string;
    context?: HttpContext
  }
): Observable<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;
}>> {

    return this.directionBorder$Response(params).pipe(
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
