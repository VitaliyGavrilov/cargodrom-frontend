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
 * Работа с заказами
 */
@Injectable({ providedIn: 'root' })
export class OrderService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `orderListParam()` */
  static readonly OrderListParamPath = '/order_list_param';

  /**
   * Параметры вывода запросов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderListParam()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderListParam$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Параметры поиска
 */
'search'?: Array<{

/**
 * Поиск в заголовке
 */
'header'?: Array<{

/**
 * Переменная
 */
'field'?: string;

/**
 * Элемент формы
 */
'form'?: 'autocomplete' | 'period' | 'select' | 'text' | 'checkbox' | 'checkbox_reset';

/**
 * Наименование
 */
'name'?: string;

/**
 * Источник
 */
'source'?: string;

/**
 * Массив данных
 */
'array'?: Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;
}>;

/**
 * Поиск основной
 */
'main'?: Array<{

/**
 * Переменная
 */
'field'?: string;

/**
 * Элемент формы
 */
'form'?: 'autocomplete' | 'period' | 'select' | 'text' | 'checkbox' | 'checkbox_reset';

/**
 * Наименование
 */
'name'?: string;

/**
 * Источник
 */
'source'?: string;

/**
 * Массив данных
 */
'array'?: Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;
}>;

/**
 * Поиск расширенный
 */
'additional'?: Array<{

/**
 * Переменная
 */
'field'?: string;

/**
 * Элемент формы
 */
'form'?: 'autocomplete' | 'period' | 'select' | 'text' | 'checkbox' | 'checkbox_reset';

/**
 * Наименование
 */
'name'?: string;

/**
 * Источник
 */
'source'?: string;

/**
 * Массив данных
 */
'array'?: Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;
}>;
}>;

/**
 * Параметры таблицы
 */
'table'?: Array<{

/**
 * Блок колонок
 */
'column'?: string;

/**
 * Данные колонок
 */
'items'?: Array<{

/**
 * Поле
 */
'field'?: string;

/**
 * Заголовок поля
 */
'title'?: string;

/**
 * Ширина поля
 */
'width'?: number;
}>;
}>;

/**
 * Параметры сортировки
 */
'order'?: Array<{

/**
 * Поле
 */
'field'?: string;

/**
 * Сортировка по умолчанию
 */
'dir'?: string;
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, OrderService.OrderListParamPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Параметры поиска
         */
        'search'?: Array<{
        
        /**
         * Поиск в заголовке
         */
        'header'?: Array<{
        
        /**
         * Переменная
         */
        'field'?: string;
        
        /**
         * Элемент формы
         */
        'form'?: 'autocomplete' | 'period' | 'select' | 'text' | 'checkbox' | 'checkbox_reset';
        
        /**
         * Наименование
         */
        'name'?: string;
        
        /**
         * Источник
         */
        'source'?: string;
        
        /**
         * Массив данных
         */
        'array'?: Array<{
        
        /**
         * ID
         */
        'id'?: string;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>;
        }>;
        
        /**
         * Поиск основной
         */
        'main'?: Array<{
        
        /**
         * Переменная
         */
        'field'?: string;
        
        /**
         * Элемент формы
         */
        'form'?: 'autocomplete' | 'period' | 'select' | 'text' | 'checkbox' | 'checkbox_reset';
        
        /**
         * Наименование
         */
        'name'?: string;
        
        /**
         * Источник
         */
        'source'?: string;
        
        /**
         * Массив данных
         */
        'array'?: Array<{
        
        /**
         * ID
         */
        'id'?: string;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>;
        }>;
        
        /**
         * Поиск расширенный
         */
        'additional'?: Array<{
        
        /**
         * Переменная
         */
        'field'?: string;
        
        /**
         * Элемент формы
         */
        'form'?: 'autocomplete' | 'period' | 'select' | 'text' | 'checkbox' | 'checkbox_reset';
        
        /**
         * Наименование
         */
        'name'?: string;
        
        /**
         * Источник
         */
        'source'?: string;
        
        /**
         * Массив данных
         */
        'array'?: Array<{
        
        /**
         * ID
         */
        'id'?: string;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>;
        }>;
        }>;
        
        /**
         * Параметры таблицы
         */
        'table'?: Array<{
        
        /**
         * Блок колонок
         */
        'column'?: string;
        
        /**
         * Данные колонок
         */
        'items'?: Array<{
        
        /**
         * Поле
         */
        'field'?: string;
        
        /**
         * Заголовок поля
         */
        'title'?: string;
        
        /**
         * Ширина поля
         */
        'width'?: number;
        }>;
        }>;
        
        /**
         * Параметры сортировки
         */
        'order'?: Array<{
        
        /**
         * Поле
         */
        'field'?: string;
        
        /**
         * Сортировка по умолчанию
         */
        'dir'?: string;
        }>;
        }>;
      })
    );
  }

  /**
   * Параметры вывода запросов.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderListParam$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderListParam(
    params?: {
    },
    context?: HttpContext
  ): Observable<{

/**
 * Параметры поиска
 */
'search'?: Array<{

/**
 * Поиск в заголовке
 */
'header'?: Array<{

/**
 * Переменная
 */
'field'?: string;

/**
 * Элемент формы
 */
'form'?: 'autocomplete' | 'period' | 'select' | 'text' | 'checkbox' | 'checkbox_reset';

/**
 * Наименование
 */
'name'?: string;

/**
 * Источник
 */
'source'?: string;

/**
 * Массив данных
 */
'array'?: Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;
}>;

/**
 * Поиск основной
 */
'main'?: Array<{

/**
 * Переменная
 */
'field'?: string;

/**
 * Элемент формы
 */
'form'?: 'autocomplete' | 'period' | 'select' | 'text' | 'checkbox' | 'checkbox_reset';

/**
 * Наименование
 */
'name'?: string;

/**
 * Источник
 */
'source'?: string;

/**
 * Массив данных
 */
'array'?: Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;
}>;

/**
 * Поиск расширенный
 */
'additional'?: Array<{

/**
 * Переменная
 */
'field'?: string;

/**
 * Элемент формы
 */
'form'?: 'autocomplete' | 'period' | 'select' | 'text' | 'checkbox' | 'checkbox_reset';

/**
 * Наименование
 */
'name'?: string;

/**
 * Источник
 */
'source'?: string;

/**
 * Массив данных
 */
'array'?: Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;
}>;
}>;

/**
 * Параметры таблицы
 */
'table'?: Array<{

/**
 * Блок колонок
 */
'column'?: string;

/**
 * Данные колонок
 */
'items'?: Array<{

/**
 * Поле
 */
'field'?: string;

/**
 * Заголовок поля
 */
'title'?: string;

/**
 * Ширина поля
 */
'width'?: number;
}>;
}>;

/**
 * Параметры сортировки
 */
'order'?: Array<{

/**
 * Поле
 */
'field'?: string;

/**
 * Сортировка по умолчанию
 */
'dir'?: string;
}>;
}> {
    return this.orderListParam$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Параметры поиска
 */
'search'?: Array<{

/**
 * Поиск в заголовке
 */
'header'?: Array<{

/**
 * Переменная
 */
'field'?: string;

/**
 * Элемент формы
 */
'form'?: 'autocomplete' | 'period' | 'select' | 'text' | 'checkbox' | 'checkbox_reset';

/**
 * Наименование
 */
'name'?: string;

/**
 * Источник
 */
'source'?: string;

/**
 * Массив данных
 */
'array'?: Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;
}>;

/**
 * Поиск основной
 */
'main'?: Array<{

/**
 * Переменная
 */
'field'?: string;

/**
 * Элемент формы
 */
'form'?: 'autocomplete' | 'period' | 'select' | 'text' | 'checkbox' | 'checkbox_reset';

/**
 * Наименование
 */
'name'?: string;

/**
 * Источник
 */
'source'?: string;

/**
 * Массив данных
 */
'array'?: Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;
}>;

/**
 * Поиск расширенный
 */
'additional'?: Array<{

/**
 * Переменная
 */
'field'?: string;

/**
 * Элемент формы
 */
'form'?: 'autocomplete' | 'period' | 'select' | 'text' | 'checkbox' | 'checkbox_reset';

/**
 * Наименование
 */
'name'?: string;

/**
 * Источник
 */
'source'?: string;

/**
 * Массив данных
 */
'array'?: Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;
}>;
}>;

/**
 * Параметры таблицы
 */
'table'?: Array<{

/**
 * Блок колонок
 */
'column'?: string;

/**
 * Данные колонок
 */
'items'?: Array<{

/**
 * Поле
 */
'field'?: string;

/**
 * Заголовок поля
 */
'title'?: string;

/**
 * Ширина поля
 */
'width'?: number;
}>;
}>;

/**
 * Параметры сортировки
 */
'order'?: Array<{

/**
 * Поле
 */
'field'?: string;

/**
 * Сортировка по умолчанию
 */
'dir'?: string;
}>;
}>): {

/**
 * Параметры поиска
 */
'search'?: Array<{

/**
 * Поиск в заголовке
 */
'header'?: Array<{

/**
 * Переменная
 */
'field'?: string;

/**
 * Элемент формы
 */
'form'?: 'autocomplete' | 'period' | 'select' | 'text' | 'checkbox' | 'checkbox_reset';

/**
 * Наименование
 */
'name'?: string;

/**
 * Источник
 */
'source'?: string;

/**
 * Массив данных
 */
'array'?: Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;
}>;

/**
 * Поиск основной
 */
'main'?: Array<{

/**
 * Переменная
 */
'field'?: string;

/**
 * Элемент формы
 */
'form'?: 'autocomplete' | 'period' | 'select' | 'text' | 'checkbox' | 'checkbox_reset';

/**
 * Наименование
 */
'name'?: string;

/**
 * Источник
 */
'source'?: string;

/**
 * Массив данных
 */
'array'?: Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;
}>;

/**
 * Поиск расширенный
 */
'additional'?: Array<{

/**
 * Переменная
 */
'field'?: string;

/**
 * Элемент формы
 */
'form'?: 'autocomplete' | 'period' | 'select' | 'text' | 'checkbox' | 'checkbox_reset';

/**
 * Наименование
 */
'name'?: string;

/**
 * Источник
 */
'source'?: string;

/**
 * Массив данных
 */
'array'?: Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;
}>;
}>;

/**
 * Параметры таблицы
 */
'table'?: Array<{

/**
 * Блок колонок
 */
'column'?: string;

/**
 * Данные колонок
 */
'items'?: Array<{

/**
 * Поле
 */
'field'?: string;

/**
 * Заголовок поля
 */
'title'?: string;

/**
 * Ширина поля
 */
'width'?: number;
}>;
}>;

/**
 * Параметры сортировки
 */
'order'?: Array<{

/**
 * Поле
 */
'field'?: string;

/**
 * Сортировка по умолчанию
 */
'dir'?: string;
}>;
} => r.body)
    );
  }

  /** Path part for operation `orderFormParam()` */
  static readonly OrderFormParamPath = '/order_form_param';

  /**
   * Параметры для форм.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderFormParam()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderFormParam$Response(
    params: {

    /**
     * Тип перевозки
     */
      kind_id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Виды перевозки
 */
'kinds': Array<{
}>;

/**
 * Статусы
 */
'statuses': Array<{
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, OrderService.OrderFormParamPath, 'get');
    if (params) {
      rb.query('kind_id', params.kind_id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Виды перевозки
         */
        'kinds': Array<{
        }>;
        
        /**
         * Статусы
         */
        'statuses': Array<{
        }>;
        }>;
      })
    );
  }

  /**
   * Параметры для форм.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderFormParam$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderFormParam(
    params: {

    /**
     * Тип перевозки
     */
      kind_id: number;
    },
    context?: HttpContext
  ): Observable<{

/**
 * Виды перевозки
 */
'kinds': Array<{
}>;

/**
 * Статусы
 */
'statuses': Array<{
}>;
}> {
    return this.orderFormParam$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Виды перевозки
 */
'kinds': Array<{
}>;

/**
 * Статусы
 */
'statuses': Array<{
}>;
}>): {

/**
 * Виды перевозки
 */
'kinds': Array<{
}>;

/**
 * Статусы
 */
'statuses': Array<{
}>;
} => r.body)
    );
  }

  /** Path part for operation `orderList()` */
  static readonly OrderListPath = '/order_list';

  /**
   * Список заказов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderList()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderList$Response(
    params?: {

    /**
     * Период (day, week, month, dd.mm.YYYY-dd.mm.YYYY)
     */
      time_add?: any;

    /**
     * Статус заказа (ID берем из запроса - order_status)
     */
      status_id?: Array<string>;

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
 * Поле сортировки
 */
'field'?: 'id' | 'status';

/**
 * Направление сортировки
 */
'dir'?: 'asc' | 'desc';
}>;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Всего позиций
 */
'total'?: number;

/**
 * Позиции
 */
'items'?: Array<{

/**
 * ID
 */
'id': number;

/**
 * ID статуса заказа
 */
'status_id': number;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * ID заказчика
 */
'customer_id': number;

/**
 * ID контрагента
 */
'contractor_id': number;

/**
 * ID КП
 */
'offer_id': number;

/**
 * ID границы
 */
'border_id': number;

/**
 * ID страны отправления
 */
'departure_country_id': number;

/**
 * ID города отправления
 */
'departure_city_id': number;

/**
 * ID пункта отправления
 */
'departure_point_id': number;

/**
 * ID страны прибытия
 */
'arrival_country_id': number;

/**
 * ID города прибытия
 */
'arrival_city_id': number;

/**
 * ID пункта прибытия
 */
'arrival_point_id': number;

/**
 * ID вида транспорта
 */
'transport_kind_id': number;

/**
 * Номер документа ТС
 */
'doc_tc_number'?: string;

/**
 * Track ТС
 */
'track_tc'?: string;

/**
 * Track СВХ
 */
'track_svh'?: string;

/**
 * TT
 */
'tt'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * События
 */
'events': Array<{

/**
 * Текст события
 */
'text'?: string;

/**
 * Дата события
 */
'date'?: string;

/**
 * Дата события кратко
 */
'date_short'?: string;
}>;

/**
 * Настройка статусов
 */
'statuses': Array<{

/**
 * ID статуса
 */
'status_id'?: number;

/**
 * Планируемая дата статуса
 */
'scheduled_date'?: string;

/**
 * Фактическая дата статуса
 */
'done_date'?: string;

/**
 * Дата для таблицы
 */
'date': string;

/**
 * Класс для ячейки
 */
'class': string;
}>;

/**
 * ID статуса движения груза
 */
'cargo_status_id': number;

/**
 * Статус движения груза
 */
'cargo_status': string;

/**
 * Следующее планируемое события
 */
'next_events': {
};

/**
 * Дата создания
 */
'time_add': string;

/**
 * Статус заказа
 */
'status': number;

/**
 * Наименование заказчика
 */
'customer_name': string;

/**
 * Наименование контрагента
 */
'contractor_name': string;

/**
 * Наименование страны отправления
 */
'departure_country_name': string;

/**
 * Наименование города отправления
 */
'departure_city_name': string;

/**
 * Наименование пункта отправления
 */
'departure_point_name': string;

/**
 * Откуда
 */
'departure_text': string;

/**
 * Наименование страны прибытия
 */
'arrival_country_name': string;

/**
 * Наименование города прибытия
 */
'arrival_city_name': string;

/**
 * Наименование пункта прибытия
 */
'arrival_point_name': string;

/**
 * Откуда
 */
'arrival_text': string;
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, OrderService.OrderListPath, 'get');
    if (params) {
      rb.query('time_add', params.time_add, {});
      rb.query('status_id', params.status_id, {"style":"form","explode":false});
      rb.query('start', params.start, {});
      rb.query('count', params.count, {});
      rb.query('sort', params.sort, {"style":"form","explode":false});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Всего позиций
         */
        'total'?: number;
        
        /**
         * Позиции
         */
        'items'?: Array<{
        
        /**
         * ID
         */
        'id': number;
        
        /**
         * ID статуса заказа
         */
        'status_id': number;
        
        /**
         * ID Запроса
         */
        'request_id': number;
        
        /**
         * ID заказчика
         */
        'customer_id': number;
        
        /**
         * ID контрагента
         */
        'contractor_id': number;
        
        /**
         * ID КП
         */
        'offer_id': number;
        
        /**
         * ID границы
         */
        'border_id': number;
        
        /**
         * ID страны отправления
         */
        'departure_country_id': number;
        
        /**
         * ID города отправления
         */
        'departure_city_id': number;
        
        /**
         * ID пункта отправления
         */
        'departure_point_id': number;
        
        /**
         * ID страны прибытия
         */
        'arrival_country_id': number;
        
        /**
         * ID города прибытия
         */
        'arrival_city_id': number;
        
        /**
         * ID пункта прибытия
         */
        'arrival_point_id': number;
        
        /**
         * ID вида транспорта
         */
        'transport_kind_id': number;
        
        /**
         * Номер документа ТС
         */
        'doc_tc_number'?: string;
        
        /**
         * Track ТС
         */
        'track_tc'?: string;
        
        /**
         * Track СВХ
         */
        'track_svh'?: string;
        
        /**
         * TT
         */
        'tt'?: string;
        
        /**
         * Комментарий
         */
        'comment'?: string;
        
        /**
         * События
         */
        'events': Array<{
        
        /**
         * Текст события
         */
        'text'?: string;
        
        /**
         * Дата события
         */
        'date'?: string;
        
        /**
         * Дата события кратко
         */
        'date_short'?: string;
        }>;
        
        /**
         * Настройка статусов
         */
        'statuses': Array<{
        
        /**
         * ID статуса
         */
        'status_id'?: number;
        
        /**
         * Планируемая дата статуса
         */
        'scheduled_date'?: string;
        
        /**
         * Фактическая дата статуса
         */
        'done_date'?: string;
        
        /**
         * Дата для таблицы
         */
        'date': string;
        
        /**
         * Класс для ячейки
         */
        'class': string;
        }>;
        
        /**
         * ID статуса движения груза
         */
        'cargo_status_id': number;
        
        /**
         * Статус движения груза
         */
        'cargo_status': string;
        
        /**
         * Следующее планируемое события
         */
        'next_events': {
        };
        
        /**
         * Дата создания
         */
        'time_add': string;
        
        /**
         * Статус заказа
         */
        'status': number;
        
        /**
         * Наименование заказчика
         */
        'customer_name': string;
        
        /**
         * Наименование контрагента
         */
        'contractor_name': string;
        
        /**
         * Наименование страны отправления
         */
        'departure_country_name': string;
        
        /**
         * Наименование города отправления
         */
        'departure_city_name': string;
        
        /**
         * Наименование пункта отправления
         */
        'departure_point_name': string;
        
        /**
         * Откуда
         */
        'departure_text': string;
        
        /**
         * Наименование страны прибытия
         */
        'arrival_country_name': string;
        
        /**
         * Наименование города прибытия
         */
        'arrival_city_name': string;
        
        /**
         * Наименование пункта прибытия
         */
        'arrival_point_name': string;
        
        /**
         * Откуда
         */
        'arrival_text': string;
        }>;
        }>;
      })
    );
  }

  /**
   * Список заказов.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderList(
    params?: {

    /**
     * Период (day, week, month, dd.mm.YYYY-dd.mm.YYYY)
     */
      time_add?: any;

    /**
     * Статус заказа (ID берем из запроса - order_status)
     */
      status_id?: Array<string>;

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
 * Поле сортировки
 */
'field'?: 'id' | 'status';

/**
 * Направление сортировки
 */
'dir'?: 'asc' | 'desc';
}>;
    },
    context?: HttpContext
  ): Observable<{

/**
 * Всего позиций
 */
'total'?: number;

/**
 * Позиции
 */
'items'?: Array<{

/**
 * ID
 */
'id': number;

/**
 * ID статуса заказа
 */
'status_id': number;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * ID заказчика
 */
'customer_id': number;

/**
 * ID контрагента
 */
'contractor_id': number;

/**
 * ID КП
 */
'offer_id': number;

/**
 * ID границы
 */
'border_id': number;

/**
 * ID страны отправления
 */
'departure_country_id': number;

/**
 * ID города отправления
 */
'departure_city_id': number;

/**
 * ID пункта отправления
 */
'departure_point_id': number;

/**
 * ID страны прибытия
 */
'arrival_country_id': number;

/**
 * ID города прибытия
 */
'arrival_city_id': number;

/**
 * ID пункта прибытия
 */
'arrival_point_id': number;

/**
 * ID вида транспорта
 */
'transport_kind_id': number;

/**
 * Номер документа ТС
 */
'doc_tc_number'?: string;

/**
 * Track ТС
 */
'track_tc'?: string;

/**
 * Track СВХ
 */
'track_svh'?: string;

/**
 * TT
 */
'tt'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * События
 */
'events': Array<{

/**
 * Текст события
 */
'text'?: string;

/**
 * Дата события
 */
'date'?: string;

/**
 * Дата события кратко
 */
'date_short'?: string;
}>;

/**
 * Настройка статусов
 */
'statuses': Array<{

/**
 * ID статуса
 */
'status_id'?: number;

/**
 * Планируемая дата статуса
 */
'scheduled_date'?: string;

/**
 * Фактическая дата статуса
 */
'done_date'?: string;

/**
 * Дата для таблицы
 */
'date': string;

/**
 * Класс для ячейки
 */
'class': string;
}>;

/**
 * ID статуса движения груза
 */
'cargo_status_id': number;

/**
 * Статус движения груза
 */
'cargo_status': string;

/**
 * Следующее планируемое события
 */
'next_events': {
};

/**
 * Дата создания
 */
'time_add': string;

/**
 * Статус заказа
 */
'status': number;

/**
 * Наименование заказчика
 */
'customer_name': string;

/**
 * Наименование контрагента
 */
'contractor_name': string;

/**
 * Наименование страны отправления
 */
'departure_country_name': string;

/**
 * Наименование города отправления
 */
'departure_city_name': string;

/**
 * Наименование пункта отправления
 */
'departure_point_name': string;

/**
 * Откуда
 */
'departure_text': string;

/**
 * Наименование страны прибытия
 */
'arrival_country_name': string;

/**
 * Наименование города прибытия
 */
'arrival_city_name': string;

/**
 * Наименование пункта прибытия
 */
'arrival_point_name': string;

/**
 * Откуда
 */
'arrival_text': string;
}>;
}> {
    return this.orderList$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Всего позиций
 */
'total'?: number;

/**
 * Позиции
 */
'items'?: Array<{

/**
 * ID
 */
'id': number;

/**
 * ID статуса заказа
 */
'status_id': number;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * ID заказчика
 */
'customer_id': number;

/**
 * ID контрагента
 */
'contractor_id': number;

/**
 * ID КП
 */
'offer_id': number;

/**
 * ID границы
 */
'border_id': number;

/**
 * ID страны отправления
 */
'departure_country_id': number;

/**
 * ID города отправления
 */
'departure_city_id': number;

/**
 * ID пункта отправления
 */
'departure_point_id': number;

/**
 * ID страны прибытия
 */
'arrival_country_id': number;

/**
 * ID города прибытия
 */
'arrival_city_id': number;

/**
 * ID пункта прибытия
 */
'arrival_point_id': number;

/**
 * ID вида транспорта
 */
'transport_kind_id': number;

/**
 * Номер документа ТС
 */
'doc_tc_number'?: string;

/**
 * Track ТС
 */
'track_tc'?: string;

/**
 * Track СВХ
 */
'track_svh'?: string;

/**
 * TT
 */
'tt'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * События
 */
'events': Array<{

/**
 * Текст события
 */
'text'?: string;

/**
 * Дата события
 */
'date'?: string;

/**
 * Дата события кратко
 */
'date_short'?: string;
}>;

/**
 * Настройка статусов
 */
'statuses': Array<{

/**
 * ID статуса
 */
'status_id'?: number;

/**
 * Планируемая дата статуса
 */
'scheduled_date'?: string;

/**
 * Фактическая дата статуса
 */
'done_date'?: string;

/**
 * Дата для таблицы
 */
'date': string;

/**
 * Класс для ячейки
 */
'class': string;
}>;

/**
 * ID статуса движения груза
 */
'cargo_status_id': number;

/**
 * Статус движения груза
 */
'cargo_status': string;

/**
 * Следующее планируемое события
 */
'next_events': {
};

/**
 * Дата создания
 */
'time_add': string;

/**
 * Статус заказа
 */
'status': number;

/**
 * Наименование заказчика
 */
'customer_name': string;

/**
 * Наименование контрагента
 */
'contractor_name': string;

/**
 * Наименование страны отправления
 */
'departure_country_name': string;

/**
 * Наименование города отправления
 */
'departure_city_name': string;

/**
 * Наименование пункта отправления
 */
'departure_point_name': string;

/**
 * Откуда
 */
'departure_text': string;

/**
 * Наименование страны прибытия
 */
'arrival_country_name': string;

/**
 * Наименование города прибытия
 */
'arrival_city_name': string;

/**
 * Наименование пункта прибытия
 */
'arrival_point_name': string;

/**
 * Откуда
 */
'arrival_text': string;
}>;
}>): {

/**
 * Всего позиций
 */
'total'?: number;

/**
 * Позиции
 */
'items'?: Array<{

/**
 * ID
 */
'id': number;

/**
 * ID статуса заказа
 */
'status_id': number;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * ID заказчика
 */
'customer_id': number;

/**
 * ID контрагента
 */
'contractor_id': number;

/**
 * ID КП
 */
'offer_id': number;

/**
 * ID границы
 */
'border_id': number;

/**
 * ID страны отправления
 */
'departure_country_id': number;

/**
 * ID города отправления
 */
'departure_city_id': number;

/**
 * ID пункта отправления
 */
'departure_point_id': number;

/**
 * ID страны прибытия
 */
'arrival_country_id': number;

/**
 * ID города прибытия
 */
'arrival_city_id': number;

/**
 * ID пункта прибытия
 */
'arrival_point_id': number;

/**
 * ID вида транспорта
 */
'transport_kind_id': number;

/**
 * Номер документа ТС
 */
'doc_tc_number'?: string;

/**
 * Track ТС
 */
'track_tc'?: string;

/**
 * Track СВХ
 */
'track_svh'?: string;

/**
 * TT
 */
'tt'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * События
 */
'events': Array<{

/**
 * Текст события
 */
'text'?: string;

/**
 * Дата события
 */
'date'?: string;

/**
 * Дата события кратко
 */
'date_short'?: string;
}>;

/**
 * Настройка статусов
 */
'statuses': Array<{

/**
 * ID статуса
 */
'status_id'?: number;

/**
 * Планируемая дата статуса
 */
'scheduled_date'?: string;

/**
 * Фактическая дата статуса
 */
'done_date'?: string;

/**
 * Дата для таблицы
 */
'date': string;

/**
 * Класс для ячейки
 */
'class': string;
}>;

/**
 * ID статуса движения груза
 */
'cargo_status_id': number;

/**
 * Статус движения груза
 */
'cargo_status': string;

/**
 * Следующее планируемое события
 */
'next_events': {
};

/**
 * Дата создания
 */
'time_add': string;

/**
 * Статус заказа
 */
'status': number;

/**
 * Наименование заказчика
 */
'customer_name': string;

/**
 * Наименование контрагента
 */
'contractor_name': string;

/**
 * Наименование страны отправления
 */
'departure_country_name': string;

/**
 * Наименование города отправления
 */
'departure_city_name': string;

/**
 * Наименование пункта отправления
 */
'departure_point_name': string;

/**
 * Откуда
 */
'departure_text': string;

/**
 * Наименование страны прибытия
 */
'arrival_country_name': string;

/**
 * Наименование города прибытия
 */
'arrival_city_name': string;

/**
 * Наименование пункта прибытия
 */
'arrival_point_name': string;

/**
 * Откуда
 */
'arrival_text': string;
}>;
} => r.body)
    );
  }

  /** Path part for operation `orderInfo()` */
  static readonly OrderInfoPath = '/order_info';

  /**
   * Данны по заказу.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderInfo$Response(
    params: {

    /**
     * ID Заказа
     */
      id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * ID статуса заказа
 */
'status_id': number;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * ID заказчика
 */
'customer_id': number;

/**
 * ID контрагента
 */
'contractor_id': number;

/**
 * ID КП
 */
'offer_id': number;

/**
 * ID границы
 */
'border_id': number;

/**
 * ID страны отправления
 */
'departure_country_id': number;

/**
 * ID города отправления
 */
'departure_city_id': number;

/**
 * ID пункта отправления
 */
'departure_point_id': number;

/**
 * ID страны прибытия
 */
'arrival_country_id': number;

/**
 * ID города прибытия
 */
'arrival_city_id': number;

/**
 * ID пункта прибытия
 */
'arrival_point_id': number;

/**
 * ID вида транспорта
 */
'transport_kind_id': number;

/**
 * Номер документа ТС
 */
'doc_tc_number'?: string;

/**
 * Track ТС
 */
'track_tc'?: string;

/**
 * Track СВХ
 */
'track_svh'?: string;

/**
 * TT
 */
'tt'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * События
 */
'events': Array<{

/**
 * Текст события
 */
'text'?: string;

/**
 * Дата события
 */
'date'?: string;

/**
 * Дата события кратко
 */
'date_short'?: string;
}>;

/**
 * Настройка статусов
 */
'statuses': Array<{

/**
 * ID статуса
 */
'status_id'?: number;

/**
 * Планируемая дата статуса
 */
'scheduled_date'?: string;

/**
 * Фактическая дата статуса
 */
'done_date'?: string;

/**
 * Дата для таблицы
 */
'date': string;

/**
 * Класс для ячейки
 */
'class': string;
}>;

/**
 * ID статуса движения груза
 */
'cargo_status_id': number;

/**
 * Статус движения груза
 */
'cargo_status': string;

/**
 * Следующее планируемое события
 */
'next_events': {
};

/**
 * Дата создания
 */
'time_add': string;

/**
 * Статус заказа
 */
'status': number;

/**
 * Наименование заказчика
 */
'customer_name': string;

/**
 * Наименование контрагента
 */
'contractor_name': string;

/**
 * Наименование страны отправления
 */
'departure_country_name': string;

/**
 * Наименование города отправления
 */
'departure_city_name': string;

/**
 * Наименование пункта отправления
 */
'departure_point_name': string;

/**
 * Откуда
 */
'departure_text': string;

/**
 * Наименование страны прибытия
 */
'arrival_country_name': string;

/**
 * Наименование города прибытия
 */
'arrival_city_name': string;

/**
 * Наименование пункта прибытия
 */
'arrival_point_name': string;

/**
 * Откуда
 */
'arrival_text': string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, OrderService.OrderInfoPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * ID
         */
        'id': number;
        
        /**
         * ID статуса заказа
         */
        'status_id': number;
        
        /**
         * ID Запроса
         */
        'request_id': number;
        
        /**
         * ID заказчика
         */
        'customer_id': number;
        
        /**
         * ID контрагента
         */
        'contractor_id': number;
        
        /**
         * ID КП
         */
        'offer_id': number;
        
        /**
         * ID границы
         */
        'border_id': number;
        
        /**
         * ID страны отправления
         */
        'departure_country_id': number;
        
        /**
         * ID города отправления
         */
        'departure_city_id': number;
        
        /**
         * ID пункта отправления
         */
        'departure_point_id': number;
        
        /**
         * ID страны прибытия
         */
        'arrival_country_id': number;
        
        /**
         * ID города прибытия
         */
        'arrival_city_id': number;
        
        /**
         * ID пункта прибытия
         */
        'arrival_point_id': number;
        
        /**
         * ID вида транспорта
         */
        'transport_kind_id': number;
        
        /**
         * Номер документа ТС
         */
        'doc_tc_number'?: string;
        
        /**
         * Track ТС
         */
        'track_tc'?: string;
        
        /**
         * Track СВХ
         */
        'track_svh'?: string;
        
        /**
         * TT
         */
        'tt'?: string;
        
        /**
         * Комментарий
         */
        'comment'?: string;
        
        /**
         * События
         */
        'events': Array<{
        
        /**
         * Текст события
         */
        'text'?: string;
        
        /**
         * Дата события
         */
        'date'?: string;
        
        /**
         * Дата события кратко
         */
        'date_short'?: string;
        }>;
        
        /**
         * Настройка статусов
         */
        'statuses': Array<{
        
        /**
         * ID статуса
         */
        'status_id'?: number;
        
        /**
         * Планируемая дата статуса
         */
        'scheduled_date'?: string;
        
        /**
         * Фактическая дата статуса
         */
        'done_date'?: string;
        
        /**
         * Дата для таблицы
         */
        'date': string;
        
        /**
         * Класс для ячейки
         */
        'class': string;
        }>;
        
        /**
         * ID статуса движения груза
         */
        'cargo_status_id': number;
        
        /**
         * Статус движения груза
         */
        'cargo_status': string;
        
        /**
         * Следующее планируемое события
         */
        'next_events': {
        };
        
        /**
         * Дата создания
         */
        'time_add': string;
        
        /**
         * Статус заказа
         */
        'status': number;
        
        /**
         * Наименование заказчика
         */
        'customer_name': string;
        
        /**
         * Наименование контрагента
         */
        'contractor_name': string;
        
        /**
         * Наименование страны отправления
         */
        'departure_country_name': string;
        
        /**
         * Наименование города отправления
         */
        'departure_city_name': string;
        
        /**
         * Наименование пункта отправления
         */
        'departure_point_name': string;
        
        /**
         * Откуда
         */
        'departure_text': string;
        
        /**
         * Наименование страны прибытия
         */
        'arrival_country_name': string;
        
        /**
         * Наименование города прибытия
         */
        'arrival_city_name': string;
        
        /**
         * Наименование пункта прибытия
         */
        'arrival_point_name': string;
        
        /**
         * Откуда
         */
        'arrival_text': string;
        }>;
      })
    );
  }

  /**
   * Данны по заказу.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderInfo(
    params: {

    /**
     * ID Заказа
     */
      id: number;
    },
    context?: HttpContext
  ): Observable<{

/**
 * ID
 */
'id': number;

/**
 * ID статуса заказа
 */
'status_id': number;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * ID заказчика
 */
'customer_id': number;

/**
 * ID контрагента
 */
'contractor_id': number;

/**
 * ID КП
 */
'offer_id': number;

/**
 * ID границы
 */
'border_id': number;

/**
 * ID страны отправления
 */
'departure_country_id': number;

/**
 * ID города отправления
 */
'departure_city_id': number;

/**
 * ID пункта отправления
 */
'departure_point_id': number;

/**
 * ID страны прибытия
 */
'arrival_country_id': number;

/**
 * ID города прибытия
 */
'arrival_city_id': number;

/**
 * ID пункта прибытия
 */
'arrival_point_id': number;

/**
 * ID вида транспорта
 */
'transport_kind_id': number;

/**
 * Номер документа ТС
 */
'doc_tc_number'?: string;

/**
 * Track ТС
 */
'track_tc'?: string;

/**
 * Track СВХ
 */
'track_svh'?: string;

/**
 * TT
 */
'tt'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * События
 */
'events': Array<{

/**
 * Текст события
 */
'text'?: string;

/**
 * Дата события
 */
'date'?: string;

/**
 * Дата события кратко
 */
'date_short'?: string;
}>;

/**
 * Настройка статусов
 */
'statuses': Array<{

/**
 * ID статуса
 */
'status_id'?: number;

/**
 * Планируемая дата статуса
 */
'scheduled_date'?: string;

/**
 * Фактическая дата статуса
 */
'done_date'?: string;

/**
 * Дата для таблицы
 */
'date': string;

/**
 * Класс для ячейки
 */
'class': string;
}>;

/**
 * ID статуса движения груза
 */
'cargo_status_id': number;

/**
 * Статус движения груза
 */
'cargo_status': string;

/**
 * Следующее планируемое события
 */
'next_events': {
};

/**
 * Дата создания
 */
'time_add': string;

/**
 * Статус заказа
 */
'status': number;

/**
 * Наименование заказчика
 */
'customer_name': string;

/**
 * Наименование контрагента
 */
'contractor_name': string;

/**
 * Наименование страны отправления
 */
'departure_country_name': string;

/**
 * Наименование города отправления
 */
'departure_city_name': string;

/**
 * Наименование пункта отправления
 */
'departure_point_name': string;

/**
 * Откуда
 */
'departure_text': string;

/**
 * Наименование страны прибытия
 */
'arrival_country_name': string;

/**
 * Наименование города прибытия
 */
'arrival_city_name': string;

/**
 * Наименование пункта прибытия
 */
'arrival_point_name': string;

/**
 * Откуда
 */
'arrival_text': string;
}> {
    return this.orderInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * ID статуса заказа
 */
'status_id': number;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * ID заказчика
 */
'customer_id': number;

/**
 * ID контрагента
 */
'contractor_id': number;

/**
 * ID КП
 */
'offer_id': number;

/**
 * ID границы
 */
'border_id': number;

/**
 * ID страны отправления
 */
'departure_country_id': number;

/**
 * ID города отправления
 */
'departure_city_id': number;

/**
 * ID пункта отправления
 */
'departure_point_id': number;

/**
 * ID страны прибытия
 */
'arrival_country_id': number;

/**
 * ID города прибытия
 */
'arrival_city_id': number;

/**
 * ID пункта прибытия
 */
'arrival_point_id': number;

/**
 * ID вида транспорта
 */
'transport_kind_id': number;

/**
 * Номер документа ТС
 */
'doc_tc_number'?: string;

/**
 * Track ТС
 */
'track_tc'?: string;

/**
 * Track СВХ
 */
'track_svh'?: string;

/**
 * TT
 */
'tt'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * События
 */
'events': Array<{

/**
 * Текст события
 */
'text'?: string;

/**
 * Дата события
 */
'date'?: string;

/**
 * Дата события кратко
 */
'date_short'?: string;
}>;

/**
 * Настройка статусов
 */
'statuses': Array<{

/**
 * ID статуса
 */
'status_id'?: number;

/**
 * Планируемая дата статуса
 */
'scheduled_date'?: string;

/**
 * Фактическая дата статуса
 */
'done_date'?: string;

/**
 * Дата для таблицы
 */
'date': string;

/**
 * Класс для ячейки
 */
'class': string;
}>;

/**
 * ID статуса движения груза
 */
'cargo_status_id': number;

/**
 * Статус движения груза
 */
'cargo_status': string;

/**
 * Следующее планируемое события
 */
'next_events': {
};

/**
 * Дата создания
 */
'time_add': string;

/**
 * Статус заказа
 */
'status': number;

/**
 * Наименование заказчика
 */
'customer_name': string;

/**
 * Наименование контрагента
 */
'contractor_name': string;

/**
 * Наименование страны отправления
 */
'departure_country_name': string;

/**
 * Наименование города отправления
 */
'departure_city_name': string;

/**
 * Наименование пункта отправления
 */
'departure_point_name': string;

/**
 * Откуда
 */
'departure_text': string;

/**
 * Наименование страны прибытия
 */
'arrival_country_name': string;

/**
 * Наименование города прибытия
 */
'arrival_city_name': string;

/**
 * Наименование пункта прибытия
 */
'arrival_point_name': string;

/**
 * Откуда
 */
'arrival_text': string;
}>): {

/**
 * ID
 */
'id': number;

/**
 * ID статуса заказа
 */
'status_id': number;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * ID заказчика
 */
'customer_id': number;

/**
 * ID контрагента
 */
'contractor_id': number;

/**
 * ID КП
 */
'offer_id': number;

/**
 * ID границы
 */
'border_id': number;

/**
 * ID страны отправления
 */
'departure_country_id': number;

/**
 * ID города отправления
 */
'departure_city_id': number;

/**
 * ID пункта отправления
 */
'departure_point_id': number;

/**
 * ID страны прибытия
 */
'arrival_country_id': number;

/**
 * ID города прибытия
 */
'arrival_city_id': number;

/**
 * ID пункта прибытия
 */
'arrival_point_id': number;

/**
 * ID вида транспорта
 */
'transport_kind_id': number;

/**
 * Номер документа ТС
 */
'doc_tc_number'?: string;

/**
 * Track ТС
 */
'track_tc'?: string;

/**
 * Track СВХ
 */
'track_svh'?: string;

/**
 * TT
 */
'tt'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * События
 */
'events': Array<{

/**
 * Текст события
 */
'text'?: string;

/**
 * Дата события
 */
'date'?: string;

/**
 * Дата события кратко
 */
'date_short'?: string;
}>;

/**
 * Настройка статусов
 */
'statuses': Array<{

/**
 * ID статуса
 */
'status_id'?: number;

/**
 * Планируемая дата статуса
 */
'scheduled_date'?: string;

/**
 * Фактическая дата статуса
 */
'done_date'?: string;

/**
 * Дата для таблицы
 */
'date': string;

/**
 * Класс для ячейки
 */
'class': string;
}>;

/**
 * ID статуса движения груза
 */
'cargo_status_id': number;

/**
 * Статус движения груза
 */
'cargo_status': string;

/**
 * Следующее планируемое события
 */
'next_events': {
};

/**
 * Дата создания
 */
'time_add': string;

/**
 * Статус заказа
 */
'status': number;

/**
 * Наименование заказчика
 */
'customer_name': string;

/**
 * Наименование контрагента
 */
'contractor_name': string;

/**
 * Наименование страны отправления
 */
'departure_country_name': string;

/**
 * Наименование города отправления
 */
'departure_city_name': string;

/**
 * Наименование пункта отправления
 */
'departure_point_name': string;

/**
 * Откуда
 */
'departure_text': string;

/**
 * Наименование страны прибытия
 */
'arrival_country_name': string;

/**
 * Наименование города прибытия
 */
'arrival_city_name': string;

/**
 * Наименование пункта прибытия
 */
'arrival_point_name': string;

/**
 * Откуда
 */
'arrival_text': string;
} => r.body)
    );
  }

  /** Path part for operation `orderMakeFromOffer()` */
  static readonly OrderMakeFromOfferPath = '/order_make_from_offer';

  /**
   * Создание заказа на основе КП.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderMakeFromOffer()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  orderMakeFromOffer$Response(
    params?: {
      body?: {

/**
 * ID КП
 */
'id': number;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, OrderService.OrderMakeFromOfferPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
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
   * Создание заказа на основе КП.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderMakeFromOffer$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  orderMakeFromOffer(
    params?: {
      body?: {

/**
 * ID КП
 */
'id': number;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.orderMakeFromOffer$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>): {

/**
 * Статус выполнения
 */
'result': 'OK';
} => r.body)
    );
  }

  /** Path part for operation `orderMake()` */
  static readonly OrderMakePath = '/order_make';

  /**
   * Создание заказа.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderMake()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  orderMake$Response(
    params?: {
      body?: {

/**
 * ID статуса заказа
 */
'status_id': number;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * ID заказчика
 */
'customer_id': number;

/**
 * ID контрагента
 */
'contractor_id': number;

/**
 * ID КП
 */
'offer_id': number;

/**
 * ID границы
 */
'border_id': number;

/**
 * ID страны отправления
 */
'departure_country_id': number;

/**
 * ID города отправления
 */
'departure_city_id': number;

/**
 * ID пункта отправления
 */
'departure_point_id': number;

/**
 * ID страны прибытия
 */
'arrival_country_id': number;

/**
 * ID города прибытия
 */
'arrival_city_id': number;

/**
 * ID пункта прибытия
 */
'arrival_point_id': number;

/**
 * ID вида транспорта
 */
'transport_kind_id': number;

/**
 * Номер документа ТС
 */
'doc_tc_number'?: string;

/**
 * Track ТС
 */
'track_tc'?: string;

/**
 * Track СВХ
 */
'track_svh'?: string;

/**
 * TT
 */
'tt'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * События
 */
'events'?: Array<{

/**
 * Текст события
 */
'text'?: string;

/**
 * Дата события
 */
'date'?: string;
}>;

/**
 * Настройка статусов
 */
'statuses'?: Array<{

/**
 * ID статуса
 */
'status_id'?: number;

/**
 * Планируемая дата статуса
 */
'scheduled_date'?: string;

/**
 * Фактическая дата статуса
 */
'done_date'?: string;

/**
 * Фактическая дата для таблицы
 */
'date'?: string;

/**
 * Класс для ячейки таблицы
 */
'class'?: string;
}>;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, OrderService.OrderMakePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
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
   * Создание заказа.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderMake$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  orderMake(
    params?: {
      body?: {

/**
 * ID статуса заказа
 */
'status_id': number;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * ID заказчика
 */
'customer_id': number;

/**
 * ID контрагента
 */
'contractor_id': number;

/**
 * ID КП
 */
'offer_id': number;

/**
 * ID границы
 */
'border_id': number;

/**
 * ID страны отправления
 */
'departure_country_id': number;

/**
 * ID города отправления
 */
'departure_city_id': number;

/**
 * ID пункта отправления
 */
'departure_point_id': number;

/**
 * ID страны прибытия
 */
'arrival_country_id': number;

/**
 * ID города прибытия
 */
'arrival_city_id': number;

/**
 * ID пункта прибытия
 */
'arrival_point_id': number;

/**
 * ID вида транспорта
 */
'transport_kind_id': number;

/**
 * Номер документа ТС
 */
'doc_tc_number'?: string;

/**
 * Track ТС
 */
'track_tc'?: string;

/**
 * Track СВХ
 */
'track_svh'?: string;

/**
 * TT
 */
'tt'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * События
 */
'events'?: Array<{

/**
 * Текст события
 */
'text'?: string;

/**
 * Дата события
 */
'date'?: string;
}>;

/**
 * Настройка статусов
 */
'statuses'?: Array<{

/**
 * ID статуса
 */
'status_id'?: number;

/**
 * Планируемая дата статуса
 */
'scheduled_date'?: string;

/**
 * Фактическая дата статуса
 */
'done_date'?: string;

/**
 * Фактическая дата для таблицы
 */
'date'?: string;

/**
 * Класс для ячейки таблицы
 */
'class'?: string;
}>;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.orderMake$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>): {

/**
 * Статус выполнения
 */
'result': 'OK';
} => r.body)
    );
  }

  /** Path part for operation `orderUpdate()` */
  static readonly OrderUpdatePath = '/order_update';

  /**
   * Редактирование заказа.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  orderUpdate$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * ID статуса заказа
 */
'status_id'?: number;

/**
 * ID Запроса
 */
'request_id'?: number;

/**
 * ID заказчика
 */
'customer_id'?: number;

/**
 * ID контрагента
 */
'contractor_id'?: number;

/**
 * ID КП
 */
'offer_id'?: number;

/**
 * ID границы
 */
'border_id'?: number;

/**
 * ID страны отправления
 */
'departure_country_id'?: number;

/**
 * ID города отправления
 */
'departure_city_id'?: number;

/**
 * ID пункта отправления
 */
'departure_point_id'?: number;

/**
 * ID страны прибытия
 */
'arrival_country_id'?: number;

/**
 * ID города прибытия
 */
'arrival_city_id'?: number;

/**
 * ID пункта прибытия
 */
'arrival_point_id'?: number;

/**
 * ID вида транспорта
 */
'transport_kind_id'?: number;

/**
 * Номер документа ТС
 */
'doc_tc_number'?: string;

/**
 * Track ТС
 */
'track_tc'?: string;

/**
 * Track СВХ
 */
'track_svh'?: string;

/**
 * TT
 */
'tt'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * События
 */
'events'?: Array<{

/**
 * Текст события
 */
'text'?: string;

/**
 * Дата события
 */
'date'?: string;
}>;

/**
 * Настройка статусов
 */
'statuses'?: Array<{

/**
 * ID статуса
 */
'status_id'?: number;

/**
 * Планируемая дата статуса
 */
'scheduled_date'?: string;

/**
 * Фактическая дата статуса
 */
'done_date'?: string;

/**
 * Фактическая дата для таблицы
 */
'date'?: string;

/**
 * Класс для ячейки таблицы
 */
'class'?: string;
}>;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, OrderService.OrderUpdatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
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
   * Редактирование заказа.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  orderUpdate(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * ID статуса заказа
 */
'status_id'?: number;

/**
 * ID Запроса
 */
'request_id'?: number;

/**
 * ID заказчика
 */
'customer_id'?: number;

/**
 * ID контрагента
 */
'contractor_id'?: number;

/**
 * ID КП
 */
'offer_id'?: number;

/**
 * ID границы
 */
'border_id'?: number;

/**
 * ID страны отправления
 */
'departure_country_id'?: number;

/**
 * ID города отправления
 */
'departure_city_id'?: number;

/**
 * ID пункта отправления
 */
'departure_point_id'?: number;

/**
 * ID страны прибытия
 */
'arrival_country_id'?: number;

/**
 * ID города прибытия
 */
'arrival_city_id'?: number;

/**
 * ID пункта прибытия
 */
'arrival_point_id'?: number;

/**
 * ID вида транспорта
 */
'transport_kind_id'?: number;

/**
 * Номер документа ТС
 */
'doc_tc_number'?: string;

/**
 * Track ТС
 */
'track_tc'?: string;

/**
 * Track СВХ
 */
'track_svh'?: string;

/**
 * TT
 */
'tt'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * События
 */
'events'?: Array<{

/**
 * Текст события
 */
'text'?: string;

/**
 * Дата события
 */
'date'?: string;
}>;

/**
 * Настройка статусов
 */
'statuses'?: Array<{

/**
 * ID статуса
 */
'status_id'?: number;

/**
 * Планируемая дата статуса
 */
'scheduled_date'?: string;

/**
 * Фактическая дата статуса
 */
'done_date'?: string;

/**
 * Фактическая дата для таблицы
 */
'date'?: string;

/**
 * Класс для ячейки таблицы
 */
'class'?: string;
}>;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.orderUpdate$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>): {

/**
 * Статус выполнения
 */
'result': 'OK';
} => r.body)
    );
  }

  /** Path part for operation `orderDelete()` */
  static readonly OrderDeletePath = '/order_delete';

  /**
   * Удаление заказа.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  orderDelete$Response(
    params?: {
      body?: {

/**
 * ID удаляемого заказа
 */
'id': number;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, OrderService.OrderDeletePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
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
   * Удаление заказа.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  orderDelete(
    params?: {
      body?: {

/**
 * ID удаляемого заказа
 */
'id': number;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.orderDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>): {

/**
 * Статус выполнения
 */
'result': 'OK';
} => r.body)
    );
  }

}
