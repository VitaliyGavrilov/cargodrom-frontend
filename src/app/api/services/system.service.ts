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
 * Системный справочник данных
 */
@Injectable({
  providedIn: 'root',
})
export class SystemService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation systemTaxSystem
   */
  static readonly SystemTaxSystemPath = '/system_tax_system';

  /**
   * Система налогооблажения.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `systemTaxSystem()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemTaxSystem$Response(params?: {
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

    const rb = new RequestBuilder(this.rootUrl, SystemService.SystemTaxSystemPath, 'get');
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
   * Система налогооблажения.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `systemTaxSystem$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemTaxSystem(params?: {
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

    return this.systemTaxSystem$Response(params).pipe(
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
   * Path part for operation systemCurrency
   */
  static readonly SystemCurrencyPath = '/system_currency';

  /**
   * Валюта.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `systemCurrency()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemCurrency$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Код
 */
'code'?: string;

/**
 * Наименование
 */
'name'?: string;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, SystemService.SystemCurrencyPath, 'get');
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
         * Код
         */
        'code'?: string;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>>;
      })
    );
  }

  /**
   * Валюта.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `systemCurrency$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemCurrency(params?: {
    context?: HttpContext
  }
): Observable<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Код
 */
'code'?: string;

/**
 * Наименование
 */
'name'?: string;
}>> {

    return this.systemCurrency$Response(params).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Код
 */
'code'?: string;

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
 * Код
 */
'code'?: string;

/**
 * Наименование
 */
'name'?: string;
}>)
    );
  }

  /**
   * Path part for operation systemHeadPosition
   */
  static readonly SystemHeadPositionPath = '/system_head_position';

  /**
   * Должности руководителей.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `systemHeadPosition()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemHeadPosition$Response(params?: {
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

    const rb = new RequestBuilder(this.rootUrl, SystemService.SystemHeadPositionPath, 'get');
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
   * Должности руководителей.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `systemHeadPosition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemHeadPosition(params?: {
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

    return this.systemHeadPosition$Response(params).pipe(
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
   * Path part for operation systemServices
   */
  static readonly SystemServicesPath = '/system_services';

  /**
   * Виды услуг.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `systemServices()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemServices$Response(params?: {
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

    const rb = new RequestBuilder(this.rootUrl, SystemService.SystemServicesPath, 'get');
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
   * Виды услуг.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `systemServices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemServices(params?: {
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

    return this.systemServices$Response(params).pipe(
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
   * Path part for operation systemBusiness
   */
  static readonly SystemBusinessPath = '/system_business';

  /**
   * Отрасль деятельности.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `systemBusiness()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemBusiness$Response(params?: {
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

/**
 * Порядок (меньше - выше)
 */
'num'?: number;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, SystemService.SystemBusinessPath, 'get');
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
        
        /**
         * Порядок (меньше - выше)
         */
        'num'?: number;
        }>>;
      })
    );
  }

  /**
   * Отрасль деятельности.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `systemBusiness$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemBusiness(params?: {
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

/**
 * Порядок (меньше - выше)
 */
'num'?: number;
}>> {

    return this.systemBusiness$Response(params).pipe(
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
 * Порядок (меньше - выше)
 */
'num'?: number;
}>>) => r.body as Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;
}>)
    );
  }

  /**
   * Path part for operation systemCounterparty
   */
  static readonly SystemCounterpartyPath = '/system_counterparty';

  /**
   * Тип контрагента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `systemCounterparty()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemCounterparty$Response(params?: {
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

/**
 * Порядок (меньше - выше)
 */
'num'?: number;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, SystemService.SystemCounterpartyPath, 'get');
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
        
        /**
         * Порядок (меньше - выше)
         */
        'num'?: number;
        }>>;
      })
    );
  }

  /**
   * Тип контрагента.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `systemCounterparty$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemCounterparty(params?: {
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

/**
 * Порядок (меньше - выше)
 */
'num'?: number;
}>> {

    return this.systemCounterparty$Response(params).pipe(
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
 * Порядок (меньше - выше)
 */
'num'?: number;
}>>) => r.body as Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;
}>)
    );
  }

  /**
   * Path part for operation systemPrivilege
   */
  static readonly SystemPrivilegePath = '/system_privilege';

  /**
   * Привилегии.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `systemPrivilege()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemPrivilege$Response(params?: {
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

/**
 * Порядок (меньше - выше)
 */
'num'?: number;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, SystemService.SystemPrivilegePath, 'get');
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
        
        /**
         * Порядок (меньше - выше)
         */
        'num'?: number;
        }>>;
      })
    );
  }

  /**
   * Привилегии.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `systemPrivilege$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemPrivilege(params?: {
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

/**
 * Порядок (меньше - выше)
 */
'num'?: number;
}>> {

    return this.systemPrivilege$Response(params).pipe(
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
 * Порядок (меньше - выше)
 */
'num'?: number;
}>>) => r.body as Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;
}>)
    );
  }

  /**
   * Path part for operation systemContactSource
   */
  static readonly SystemContactSourcePath = '/system_contact_source';

  /**
   * Источник контакта.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `systemContactSource()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemContactSource$Response(params?: {
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

    const rb = new RequestBuilder(this.rootUrl, SystemService.SystemContactSourcePath, 'get');
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
   * Источник контакта.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `systemContactSource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemContactSource(params?: {
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

    return this.systemContactSource$Response(params).pipe(
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
   * Path part for operation systemCustomerStatus
   */
  static readonly SystemCustomerStatusPath = '/system_customer_status';

  /**
   * Статус клиента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `systemCustomerStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemCustomerStatus$Response(params?: {
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

    const rb = new RequestBuilder(this.rootUrl, SystemService.SystemCustomerStatusPath, 'get');
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
   * Статус клиента.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `systemCustomerStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemCustomerStatus(params?: {
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

    return this.systemCustomerStatus$Response(params).pipe(
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
   * Path part for operation systemAssociation
   */
  static readonly SystemAssociationPath = '/system_association';

  /**
   * Ассоциации подрядчиков.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `systemAssociation()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemAssociation$Response(params?: {
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

    const rb = new RequestBuilder(this.rootUrl, SystemService.SystemAssociationPath, 'get');
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
   * Ассоциации подрядчиков.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `systemAssociation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  systemAssociation(params?: {
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

    return this.systemAssociation$Response(params).pipe(
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

}
