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
 * Транспорт
 */
@Injectable({ providedIn: 'root' })
export class TransportService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `transportKind()` */
  static readonly TransportKindPath = '/transport_kind';

  /**
   * Вид перевозки.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `transportKind()` instead.
   *
   * This method doesn't expect any request body.
   */
  transportKind$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>>> {
    const rb = new RequestBuilder(this.rootUrl, TransportService.TransportKindPath, 'get');
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
        'id'?: string;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>>;
      })
    );
  }

  /**
   * Вид перевозки.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `transportKind$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  transportKind(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>> {
    return this.transportKind$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>>): Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}> => r.body)
    );
  }

  /** Path part for operation `transportSubKind()` */
  static readonly TransportSubKindPath = '/transport_sub_kind';

  /**
   * Подвиды перевозки.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `transportSubKind()` instead.
   *
   * This method doesn't expect any request body.
   */
  transportSubKind$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Вид перевозки
 */
'kind_id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>>> {
    const rb = new RequestBuilder(this.rootUrl, TransportService.TransportSubKindPath, 'get');
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
        'id'?: string;
        
        /**
         * Вид перевозки
         */
        'kind_id'?: string;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>>;
      })
    );
  }

  /**
   * Подвиды перевозки.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `transportSubKind$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  transportSubKind(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Вид перевозки
 */
'kind_id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>> {
    return this.transportSubKind$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Вид перевозки
 */
'kind_id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>>): Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Вид перевозки
 */
'kind_id'?: string;

/**
 * Наименование
 */
'name'?: string;
}> => r.body)
    );
  }

  /** Path part for operation `transportType()` */
  static readonly TransportTypePath = '/transport_type';

  /**
   * Тип транспорта.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `transportType()` instead.
   *
   * This method doesn't expect any request body.
   */
  transportType$Response(
    params: {

    /**
     * Вид перевозки
     */
      kind_id: string;
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
    const rb = new RequestBuilder(this.rootUrl, TransportService.TransportTypePath, 'get');
    if (params) {
      rb.query('kind_id', params.kind_id, {});
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
   * Тип транспорта.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `transportType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  transportType(
    params: {

    /**
     * Вид перевозки
     */
      kind_id: string;
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
    return this.transportType$Response(params, context).pipe(
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

  /** Path part for operation `transportLoading()` */
  static readonly TransportLoadingPath = '/transport_loading';

  /**
   * Способы загрузки.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `transportLoading()` instead.
   *
   * This method doesn't expect any request body.
   */
  transportLoading$Response(
    params: {

    /**
     * Вид перевозки
     */
      kind_id: string;
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
    const rb = new RequestBuilder(this.rootUrl, TransportService.TransportLoadingPath, 'get');
    if (params) {
      rb.query('kind_id', params.kind_id, {});
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
   * Способы загрузки.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `transportLoading$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  transportLoading(
    params: {

    /**
     * Вид перевозки
     */
      kind_id: string;
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
    return this.transportLoading$Response(params, context).pipe(
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

  /** Path part for operation `transportBody()` */
  static readonly TransportBodyPath = '/transport_body';

  /**
   * Типы кузовов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `transportBody()` instead.
   *
   * This method doesn't expect any request body.
   */
  transportBody$Response(
    params: {

    /**
     * Вид перевозки
     */
      kind_id: string;
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
    const rb = new RequestBuilder(this.rootUrl, TransportService.TransportBodyPath, 'get');
    if (params) {
      rb.query('kind_id', params.kind_id, {});
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
   * Типы кузовов.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `transportBody$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  transportBody(
    params: {

    /**
     * Вид перевозки
     */
      kind_id: string;
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
    return this.transportBody$Response(params, context).pipe(
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

}
