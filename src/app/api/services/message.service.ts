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
 * Сообщения
 */
@Injectable({ providedIn: 'root' })
export class MessageService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `messageList()` */
  static readonly MessageListPath = '/message_list';

  /**
   * Сообщения.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `messageList()` instead.
   *
   * This method doesn't expect any request body.
   */
  messageList$Response(
    params?: {

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
'field'?: 'id';

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
 * Дата создания
 */
'time_add': string;

/**
 * Дата создания
 */
'date': string;

/**
 * Тема
 */
'subject': string;

/**
 * Текст сообщения
 */
'text': string;

/**
 * Доп. данные
 */
'data'?: {
};

/**
 * Кому пользователь
 */
'to_user_id'?: number;

/**
 * Кому фирма
 */
'to_company_id'?: number;

/**
 * Кому контрагент
 */
'to_contractor_id'?: number;

/**
 * Статус
 */
'status': string;

/**
 * Статус
 */
'status_text': string;
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, MessageService.MessageListPath, 'get');
    if (params) {
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
         * Дата создания
         */
        'time_add': string;
        
        /**
         * Дата создания
         */
        'date': string;
        
        /**
         * Тема
         */
        'subject': string;
        
        /**
         * Текст сообщения
         */
        'text': string;
        
        /**
         * Доп. данные
         */
        'data'?: {
        };
        
        /**
         * Кому пользователь
         */
        'to_user_id'?: number;
        
        /**
         * Кому фирма
         */
        'to_company_id'?: number;
        
        /**
         * Кому контрагент
         */
        'to_contractor_id'?: number;
        
        /**
         * Статус
         */
        'status': string;
        
        /**
         * Статус
         */
        'status_text': string;
        }>;
        }>;
      })
    );
  }

  /**
   * Сообщения.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `messageList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  messageList(
    params?: {

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
'field'?: 'id';

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
 * Дата создания
 */
'time_add': string;

/**
 * Дата создания
 */
'date': string;

/**
 * Тема
 */
'subject': string;

/**
 * Текст сообщения
 */
'text': string;

/**
 * Доп. данные
 */
'data'?: {
};

/**
 * Кому пользователь
 */
'to_user_id'?: number;

/**
 * Кому фирма
 */
'to_company_id'?: number;

/**
 * Кому контрагент
 */
'to_contractor_id'?: number;

/**
 * Статус
 */
'status': string;

/**
 * Статус
 */
'status_text': string;
}>;
}> {
    return this.messageList$Response(params, context).pipe(
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
 * Дата создания
 */
'time_add': string;

/**
 * Дата создания
 */
'date': string;

/**
 * Тема
 */
'subject': string;

/**
 * Текст сообщения
 */
'text': string;

/**
 * Доп. данные
 */
'data'?: {
};

/**
 * Кому пользователь
 */
'to_user_id'?: number;

/**
 * Кому фирма
 */
'to_company_id'?: number;

/**
 * Кому контрагент
 */
'to_contractor_id'?: number;

/**
 * Статус
 */
'status': string;

/**
 * Статус
 */
'status_text': string;
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
 * Дата создания
 */
'time_add': string;

/**
 * Дата создания
 */
'date': string;

/**
 * Тема
 */
'subject': string;

/**
 * Текст сообщения
 */
'text': string;

/**
 * Доп. данные
 */
'data'?: {
};

/**
 * Кому пользователь
 */
'to_user_id'?: number;

/**
 * Кому фирма
 */
'to_company_id'?: number;

/**
 * Кому контрагент
 */
'to_contractor_id'?: number;

/**
 * Статус
 */
'status': string;

/**
 * Статус
 */
'status_text': string;
}>;
} => r.body)
    );
  }

  /** Path part for operation `messageListParam()` */
  static readonly MessageListParamPath = '/message_list_param';

  /**
   * Параметры вывода клиентов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `messageListParam()` instead.
   *
   * This method doesn't expect any request body.
   */
  messageListParam$Response(
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
    const rb = new RequestBuilder(this.rootUrl, MessageService.MessageListParamPath, 'get');
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
   * Параметры вывода клиентов.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `messageListParam$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  messageListParam(
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
    return this.messageListParam$Response(params, context).pipe(
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

  /** Path part for operation `messageFormParam()` */
  static readonly MessageFormParamPath = '/message_form_param';

  /**
   * Параметры для форм.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `messageFormParam()` instead.
   *
   * This method doesn't expect any request body.
   */
  messageFormParam$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статусы
 */
'status': Array<{
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, MessageService.MessageFormParamPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Статусы
         */
        'status': Array<{
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
   * To access the full response (for headers, for example), `messageFormParam$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  messageFormParam(
    params?: {
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статусы
 */
'status': Array<{
}>;
}> {
    return this.messageFormParam$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статусы
 */
'status': Array<{
}>;
}>): {

/**
 * Статусы
 */
'status': Array<{
}>;
} => r.body)
    );
  }

  /** Path part for operation `messageSave()` */
  static readonly MessageSavePath = '/message_save';

  /**
   * Сохранение сообщения.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `messageSave()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  messageSave$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id'?: number;

/**
 * Тема
 */
'subject': string;

/**
 * Текст сообщения
 */
'text': string;

/**
 * Доп. данные
 */
'data'?: {
};

/**
 * Кому пользователь
 */
'to_user_id'?: number;

/**
 * Кому фирма
 */
'to_company_id'?: number;

/**
 * Кому контрагент
 */
'to_contractor_id'?: number;

/**
 * Статус
 */
'status': string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, MessageService.MessageSavePath, 'post');
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
   * Сохранение сообщения.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `messageSave$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  messageSave(
    params?: {
      body?: {

/**
 * ID
 */
'id'?: number;

/**
 * Тема
 */
'subject': string;

/**
 * Текст сообщения
 */
'text': string;

/**
 * Доп. данные
 */
'data'?: {
};

/**
 * Кому пользователь
 */
'to_user_id'?: number;

/**
 * Кому фирма
 */
'to_company_id'?: number;

/**
 * Кому контрагент
 */
'to_contractor_id'?: number;

/**
 * Статус
 */
'status': string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.messageSave$Response(params, context).pipe(
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

  /** Path part for operation `messageSetRead()` */
  static readonly MessageSetReadPath = '/message_set_read';

  /**
   * Установка статуса прочтения.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `messageSetRead()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  messageSetRead$Response(
    params?: {
      body?: {

/**
 * ID
 */
'ids': Array<number>;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, MessageService.MessageSetReadPath, 'post');
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
   * Установка статуса прочтения.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `messageSetRead$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  messageSetRead(
    params?: {
      body?: {

/**
 * ID
 */
'ids': Array<number>;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.messageSetRead$Response(params, context).pipe(
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

  /** Path part for operation `messageGetNew()` */
  static readonly MessageGetNewPath = '/message_get_new';

  /**
   * Получить новые сообщения.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `messageGetNew()` instead.
   *
   * This method doesn't expect any request body.
   */
  messageGetNew$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<{

/**
 * От кого
 */
'from': string;

/**
 * Тема
 */
'subject': string;

/**
 * Текст
 */
'text': string;

/**
 * Время создания
 */
'time_add': string;
}>>> {
    const rb = new RequestBuilder(this.rootUrl, MessageService.MessageGetNewPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<{
        
        /**
         * От кого
         */
        'from': string;
        
        /**
         * Тема
         */
        'subject': string;
        
        /**
         * Текст
         */
        'text': string;
        
        /**
         * Время создания
         */
        'time_add': string;
        }>>;
      })
    );
  }

  /**
   * Получить новые сообщения.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `messageGetNew$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  messageGetNew(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<{

/**
 * От кого
 */
'from': string;

/**
 * Тема
 */
'subject': string;

/**
 * Текст
 */
'text': string;

/**
 * Время создания
 */
'time_add': string;
}>> {
    return this.messageGetNew$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * От кого
 */
'from': string;

/**
 * Тема
 */
'subject': string;

/**
 * Текст
 */
'text': string;

/**
 * Время создания
 */
'time_add': string;
}>>): Array<{

/**
 * От кого
 */
'from': string;

/**
 * Тема
 */
'subject': string;

/**
 * Текст
 */
'text': string;

/**
 * Время создания
 */
'time_add': string;
}> => r.body)
    );
  }

  /** Path part for operation `messageDelete()` */
  static readonly MessageDeletePath = '/message_delete';

  /**
   * Удаление сообщения.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `messageDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  messageDelete$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id': Array<number>;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, MessageService.MessageDeletePath, 'post');
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
   * Удаление сообщения.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `messageDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  messageDelete(
    params?: {
      body?: {

/**
 * ID
 */
'id': Array<number>;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.messageDelete$Response(params, context).pipe(
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
