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
 * Работа со страницами
 */
@Injectable({
  providedIn: 'root',
})
export class PageService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation pageList
   */
  static readonly PageListPath = '/page_list';

  /**
   * Список файлов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pageList()` instead.
   *
   * This method doesn't expect any request body.
   */
  pageList$Response(params?: {

    /**
     * Начальная позиция
     */
    start?: number;

    /**
     * Лимит позиций на страницу
     */
    count?: number;

    /**
     * ID элемента
     */
    item_id?: number;

    /**
     * Компонент элемента
     */
    component?: string;

    /**
     * Переменная формы
     */
    var?: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{

/**
 * Позиции
 */
'items'?: Array<{

/**
 * ID
 */
'id': number;

/**
 * ID элемента
 */
'item_id': number;

/**
 * Компонент элемента
 */
'component': string;

/**
 * Переменная формы
 */
'var': string;

/**
 * Ссылка на файл
 */
'path'?: string;

/**
 * Информация по файлу
 */
'file_info'?: Array<string>;

/**
 * Время загрузки файла
 */
'file_time'?: string;

/**
 * Наименование файла
 */
'file_name'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>;

/**
 * Всего позиций
 */
'total'?: number;
}>> {

    const rb = new RequestBuilder(this.rootUrl, PageService.PageListPath, 'get');
    if (params) {
      rb.query('start', params.start, {});
      rb.query('count', params.count, {});
      rb.query('item_id', params.item_id, {});
      rb.query('component', params.component, {});
      rb.query('var', params.var, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Позиции
         */
        'items'?: Array<{
        
        /**
         * ID
         */
        'id': number;
        
        /**
         * ID элемента
         */
        'item_id': number;
        
        /**
         * Компонент элемента
         */
        'component': string;
        
        /**
         * Переменная формы
         */
        'var': string;
        
        /**
         * Ссылка на файл
         */
        'path'?: string;
        
        /**
         * Информация по файлу
         */
        'file_info'?: Array<string>;
        
        /**
         * Время загрузки файла
         */
        'file_time'?: string;
        
        /**
         * Наименование файла
         */
        'file_name'?: string;
        
        /**
         * Время создания
         */
        'time_add'?: string;
        
        /**
         * Время изменения
         */
        'time_edit'?: string;
        }>;
        
        /**
         * Всего позиций
         */
        'total'?: number;
        }>;
      })
    );
  }

  /**
   * Список файлов.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `pageList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pageList(params?: {

    /**
     * Начальная позиция
     */
    start?: number;

    /**
     * Лимит позиций на страницу
     */
    count?: number;

    /**
     * ID элемента
     */
    item_id?: number;

    /**
     * Компонент элемента
     */
    component?: string;

    /**
     * Переменная формы
     */
    var?: string;
    context?: HttpContext
  }
): Observable<{

/**
 * Позиции
 */
'items'?: Array<{

/**
 * ID
 */
'id': number;

/**
 * ID элемента
 */
'item_id': number;

/**
 * Компонент элемента
 */
'component': string;

/**
 * Переменная формы
 */
'var': string;

/**
 * Ссылка на файл
 */
'path'?: string;

/**
 * Информация по файлу
 */
'file_info'?: Array<string>;

/**
 * Время загрузки файла
 */
'file_time'?: string;

/**
 * Наименование файла
 */
'file_name'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>;

/**
 * Всего позиций
 */
'total'?: number;
}> {

    return this.pageList$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * Позиции
 */
'items'?: Array<{

/**
 * ID
 */
'id': number;

/**
 * ID элемента
 */
'item_id': number;

/**
 * Компонент элемента
 */
'component': string;

/**
 * Переменная формы
 */
'var': string;

/**
 * Ссылка на файл
 */
'path'?: string;

/**
 * Информация по файлу
 */
'file_info'?: Array<string>;

/**
 * Время загрузки файла
 */
'file_time'?: string;

/**
 * Наименование файла
 */
'file_name'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>;

/**
 * Всего позиций
 */
'total'?: number;
}>) => r.body as {

/**
 * Позиции
 */
'items'?: Array<{

/**
 * ID
 */
'id': number;

/**
 * ID элемента
 */
'item_id': number;

/**
 * Компонент элемента
 */
'component': string;

/**
 * Переменная формы
 */
'var': string;

/**
 * Ссылка на файл
 */
'path'?: string;

/**
 * Информация по файлу
 */
'file_info'?: Array<string>;

/**
 * Время загрузки файла
 */
'file_time'?: string;

/**
 * Наименование файла
 */
'file_name'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>;

/**
 * Всего позиций
 */
'total'?: number;
})
    );
  }

  /**
   * Path part for operation pageInfo
   */
  static readonly PageInfoPath = '/page_info';

  /**
   * Файл: данные.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pageInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  pageInfo$Response(params?: {

    /**
     * ID файла
     */
    id?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * ID элемента
 */
'item_id': number;

/**
 * Компонент элемента
 */
'component': string;

/**
 * Переменная формы
 */
'var': string;

/**
 * Ссылка на файл
 */
'path'?: string;

/**
 * Информация по файлу
 */
'file_info'?: Array<string>;

/**
 * Время загрузки файла
 */
'file_time'?: string;

/**
 * Наименование файла
 */
'file_name'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, PageService.PageInfoPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * ID
         */
        'id': number;
        
        /**
         * ID элемента
         */
        'item_id': number;
        
        /**
         * Компонент элемента
         */
        'component': string;
        
        /**
         * Переменная формы
         */
        'var': string;
        
        /**
         * Ссылка на файл
         */
        'path'?: string;
        
        /**
         * Информация по файлу
         */
        'file_info'?: Array<string>;
        
        /**
         * Время загрузки файла
         */
        'file_time'?: string;
        
        /**
         * Наименование файла
         */
        'file_name'?: string;
        
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
   * Файл: данные.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `pageInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pageInfo(params?: {

    /**
     * ID файла
     */
    id?: number;
    context?: HttpContext
  }
): Observable<{

/**
 * ID
 */
'id': number;

/**
 * ID элемента
 */
'item_id': number;

/**
 * Компонент элемента
 */
'component': string;

/**
 * Переменная формы
 */
'var': string;

/**
 * Ссылка на файл
 */
'path'?: string;

/**
 * Информация по файлу
 */
'file_info'?: Array<string>;

/**
 * Время загрузки файла
 */
'file_time'?: string;

/**
 * Наименование файла
 */
'file_name'?: string;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}> {

    return this.pageInfo$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * ID элемента
 */
'item_id': number;

/**
 * Компонент элемента
 */
'component': string;

/**
 * Переменная формы
 */
'var': string;

/**
 * Ссылка на файл
 */
'path'?: string;

/**
 * Информация по файлу
 */
'file_info'?: Array<string>;

/**
 * Время загрузки файла
 */
'file_time'?: string;

/**
 * Наименование файла
 */
'file_name'?: string;

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
 * ID элемента
 */
'item_id': number;

/**
 * Компонент элемента
 */
'component': string;

/**
 * Переменная формы
 */
'var': string;

/**
 * Ссылка на файл
 */
'path'?: string;

/**
 * Информация по файлу
 */
'file_info'?: Array<string>;

/**
 * Время загрузки файла
 */
'file_time'?: string;

/**
 * Наименование файла
 */
'file_name'?: string;

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
   * Path part for operation pageCreate
   */
  static readonly PageCreatePath = '/page_create';

  /**
   * Файлы: добавление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pageCreate()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  pageCreate$Response(params?: {
    context?: HttpContext
    body?: {

/**
 * ID элемента
 */
'item_id': number;

/**
 * Компонент элемента
 */
'component': string;

/**
 * Переменная формы
 */
'var': string;

/**
 * Файл
 */
'file': file;
}
  }
): Observable<StrictHttpResponse<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {

    const rb = new RequestBuilder(this.rootUrl, PageService.PageCreatePath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
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
        'result': 'OK';
        }>;
      })
    );
  }

  /**
   * Файлы: добавление.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `pageCreate$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  pageCreate(params?: {
    context?: HttpContext
    body?: {

/**
 * ID элемента
 */
'item_id': number;

/**
 * Компонент элемента
 */
'component': string;

/**
 * Переменная формы
 */
'var': string;

/**
 * Файл
 */
'file': file;
}
  }
): Observable<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
}> {

    return this.pageCreate$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
}>) => r.body as {

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
})
    );
  }

  /**
   * Path part for operation pageUpdate
   */
  static readonly PageUpdatePath = '/page_update';

  /**
   * Файлы: обновление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pageUpdate()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  pageUpdate$Response(params?: {
    context?: HttpContext
    body?: {

/**
 * ID
 */
'id': number;

/**
 * ID элемента
 */
'item_id': number;

/**
 * Компонент элемента
 */
'component': string;

/**
 * Переменная формы
 */
'var': string;

/**
 * Файл
 */
'file': file;
}
  }
): Observable<StrictHttpResponse<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {

    const rb = new RequestBuilder(this.rootUrl, PageService.PageUpdatePath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
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
        'result': 'OK';
        }>;
      })
    );
  }

  /**
   * Файлы: обновление.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `pageUpdate$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  pageUpdate(params?: {
    context?: HttpContext
    body?: {

/**
 * ID
 */
'id': number;

/**
 * ID элемента
 */
'item_id': number;

/**
 * Компонент элемента
 */
'component': string;

/**
 * Переменная формы
 */
'var': string;

/**
 * Файл
 */
'file': file;
}
  }
): Observable<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
}> {

    return this.pageUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
}>) => r.body as {

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
})
    );
  }

  /**
   * Path part for operation pageDelete
   */
  static readonly PageDeletePath = '/page_delete';

  /**
   * Файлы: удаление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pageDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pageDelete$Response(params?: {
    context?: HttpContext
    body?: {

/**
 * ID удаляемой записи
 */
'id': number;

/**
 * ID элемента
 */
'item_id': number;

/**
 * Компонент элемента
 */
'component': string;

/**
 * Переменная формы
 */
'var': string;
}
  }
): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {

    const rb = new RequestBuilder(this.rootUrl, PageService.PageDeletePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Статус выполнения
         */
        'result': 'OK';
        }>;
      })
    );
  }

  /**
   * Файлы: удаление.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `pageDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pageDelete(params?: {
    context?: HttpContext
    body?: {

/**
 * ID удаляемой записи
 */
'id': number;

/**
 * ID элемента
 */
'item_id': number;

/**
 * Компонент элемента
 */
'component': string;

/**
 * Переменная формы
 */
'var': string;
}
  }
): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {

    return this.pageDelete$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>) => r.body as {

/**
 * Статус выполнения
 */
'result': 'OK';
})
    );
  }

  /**
   * Path part for operation pageDownload
   */
  static readonly PageDownloadPath = '/page_download';

  /**
   * Файл: получить.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pageDownload()` instead.
   *
   * This method doesn't expect any request body.
   */
  pageDownload$Response(params?: {

    /**
     * ID файла
     */
    id?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {

    const rb = new RequestBuilder(this.rootUrl, PageService.PageDownloadPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Статус выполнения
         */
        'result': 'OK';
        }>;
      })
    );
  }

  /**
   * Файл: получить.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `pageDownload$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pageDownload(params?: {

    /**
     * ID файла
     */
    id?: number;
    context?: HttpContext
  }
): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {

    return this.pageDownload$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>) => r.body as {

/**
 * Статус выполнения
 */
'result': 'OK';
})
    );
  }

}
