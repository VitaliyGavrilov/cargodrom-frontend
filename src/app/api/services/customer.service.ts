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
 * Работа с клиентами
 */
@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation customerList
   */
  static readonly CustomerListPath = '/customer_list';

  /**
   * Список клиентов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerList()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerList$Response(params?: {

    /**
     * Начальная позиция
     */
    start?: number;

    /**
     * Лимит позиций на страницу
     */
    count?: number;

    /**
     * Сортировка
     */
    sort?: Array<{

/**
 * Поле
 */
'field': string;

/**
 * Направление сортировки
 */
'dir': 'asc' | 'desc';
}>;
  }): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Имя
 */
'name_o'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerListPath, 'get');
    if (params) {
      rb.query('start', params.start, {});
      rb.query('count', params.count, {});
      rb.query('sort', params.sort, {"style":"form","explode":false});
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
         * Наименование компании
         */
        'company_name'?: string;
        
        /**
         * Фамилия
         */
        'name_f'?: string;
        
        /**
         * Имя
         */
        'name_i'?: string;
        
        /**
         * Имя
         */
        'name_o'?: string;
        
        /**
         * Email
         */
        'email'?: string;
        
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
   * Список клиентов.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerList(params?: {

    /**
     * Начальная позиция
     */
    start?: number;

    /**
     * Лимит позиций на страницу
     */
    count?: number;

    /**
     * Сортировка
     */
    sort?: Array<{

/**
 * Поле
 */
'field': string;

/**
 * Направление сортировки
 */
'dir': 'asc' | 'desc';
}>;
  }): Observable<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Имя
 */
'name_o'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>> {

    return this.customerList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Имя
 */
'name_o'?: string;

/**
 * Email
 */
'email'?: string;

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
 * Наименование компании
 */
'company_name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Имя
 */
'name_o'?: string;

/**
 * Email
 */
'email'?: string;

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
   * Path part for operation customerInfo
   */
  static readonly CustomerInfoPath = '/customer_info';

  /**
   * Данные клиента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerInfo$Response(params: {

    /**
     * ID клиента
     */
    id: number;
  }): Observable<StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Имя
 */
'name_o'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerInfoPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * ID
         */
        'id': number;
        
        /**
         * Наименование компании
         */
        'company_name'?: string;
        
        /**
         * Фамилия
         */
        'name_f'?: string;
        
        /**
         * Имя
         */
        'name_i'?: string;
        
        /**
         * Имя
         */
        'name_o'?: string;
        
        /**
         * Email
         */
        'email'?: string;
        
        /**
         * Время создания
         */
        'time_add'?: string;
        
        /**
         * Время изменения
         */
        'time_edit'?: string;
        }>;
      })
    );
  }

  /**
   * Данные клиента.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerInfo(params: {

    /**
     * ID клиента
     */
    id: number;
  }): Observable<{

/**
 * ID
 */
'id': number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Имя
 */
'name_o'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}> {

    return this.customerInfo$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Имя
 */
'name_o'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>) => r.body as {

/**
 * ID
 */
'id': number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Имя
 */
'name_o'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
})
    );
  }

  /**
   * Path part for operation customerCreate
   */
  static readonly CustomerCreatePath = '/customer_create';

  /**
   * Добавление клиента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerCreate$Response(params?: {
    body?: {

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * Фамилия
 */
'name_f': string;

/**
 * Имя
 */
'name_i': string;

/**
 * Имя
 */
'name_o': string;

/**
 * Email
 */
'email': string;
}
  }): Observable<StrictHttpResponse<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'success';
}>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerCreatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * ID созданной записи
         */
        'id': number;
        
        /**
         * Статус выполнения
         */
        'result': 'success';
        }>;
      })
    );
  }

  /**
   * Добавление клиента.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerCreate(params?: {
    body?: {

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * Фамилия
 */
'name_f': string;

/**
 * Имя
 */
'name_i': string;

/**
 * Имя
 */
'name_o': string;

/**
 * Email
 */
'email': string;
}
  }): Observable<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'success';
}> {

    return this.customerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'success';
}>) => r.body as {

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'success';
})
    );
  }

  /**
   * Path part for operation customerUpdate
   */
  static readonly CustomerUpdatePath = '/customer_update';

  /**
   * Обновление клиента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerUpdate$Response(params?: {
    body?: {

/**
 * ID
 */
'id': number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Имя
 */
'name_o'?: string;

/**
 * Email
 */
'email'?: string;
}
  }): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'success';
}>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerUpdatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Статус выполнения
         */
        'result': 'success';
        }>;
      })
    );
  }

  /**
   * Обновление клиента.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerUpdate(params?: {
    body?: {

/**
 * ID
 */
'id': number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Имя
 */
'name_o'?: string;

/**
 * Email
 */
'email'?: string;
}
  }): Observable<{

/**
 * Статус выполнения
 */
'result': 'success';
}> {

    return this.customerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'success';
}>) => r.body as {

/**
 * Статус выполнения
 */
'result': 'success';
})
    );
  }

  /**
   * Path part for operation customerDelete
   */
  static readonly CustomerDeletePath = '/customer_delete';

  /**
   * Удаление клиента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerDelete$Response(params?: {
    body?: {

/**
 * ID удаляемого клиента
 */
'id': number;
}
  }): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'success';
}>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerDeletePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Статус выполнения
         */
        'result': 'success';
        }>;
      })
    );
  }

  /**
   * Удаление клиента.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerDelete(params?: {
    body?: {

/**
 * ID удаляемого клиента
 */
'id': number;
}
  }): Observable<{

/**
 * Статус выполнения
 */
'result': 'success';
}> {

    return this.customerDelete$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'success';
}>) => r.body as {

/**
 * Статус выполнения
 */
'result': 'success';
})
    );
  }

}
