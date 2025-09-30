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
 * Настройки
 */
@Injectable({ providedIn: 'root' })
export class SettingsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `settingsGet()` */
  static readonly SettingsGetPath = '/settings_get';

  /**
   * Чтение настроек.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `settingsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  settingsGet$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Общее: Язык интерфейса (ID берем из запроса - settings_get из поля language)
 */
'lang'?: string;

/**
 * Общее: Часовой пояс
 */
'timezone'?: string;

/**
 * Общее: Валюта №1 (ID берем из запроса - settings_get из поля currency)
 */
'currency_1'?: string;

/**
 * Общее: Валюта №2 (ID берем из запроса - settings_get из поля currency)
 */
'currency_2'?: string;

/**
 * Общее: Валюта №3 (ID берем из запроса - settings_get из поля currency)
 */
'currency_3'?: string;

/**
 * Способы уведомления
 */
'notify_type'?: Array<string>;

/**
 * События для уведомлений
 */
'notify_event'?: Array<string>;

/**
 * Брендирование: Логотип вашей компании, url
 */
'branding_logo'?: string;

/**
 * Брендирование: Имя файла логотипа
 */
'branding_logo_name'?: string;

/**
 * Брендирование: Использование брендовых цветов
 */
'branding_colors'?: {
};

/**
 * Виды налогообложения
 */
'tax'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Языки интерфейса
 */
'language'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Курсы валют
 */
'currency'?: Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Временные зоны: список
 */
'timezone_list'?: Array<{
}>;

/**
 * Способы уведомления: список
 */
'notify_types_list'?: Array<{
}>;

/**
 * События для уведомлений: список
 */
'notify_events_list'?: Array<{
}>;

/**
 * Объекты для разграничения доступа
 */
'permission_objects'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Правила доступа
 */
'permission_rules'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Значения варианта доступа
 */
'permission_values'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Стартовая страница
 */
'start_page'?: string;

/**
 * Цвета
 */
'colors'?: {
};
}>> {
    const rb = new RequestBuilder(this.rootUrl, SettingsService.SettingsGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Общее: Язык интерфейса (ID берем из запроса - settings_get из поля language)
         */
        'lang'?: string;
        
        /**
         * Общее: Часовой пояс
         */
        'timezone'?: string;
        
        /**
         * Общее: Валюта №1 (ID берем из запроса - settings_get из поля currency)
         */
        'currency_1'?: string;
        
        /**
         * Общее: Валюта №2 (ID берем из запроса - settings_get из поля currency)
         */
        'currency_2'?: string;
        
        /**
         * Общее: Валюта №3 (ID берем из запроса - settings_get из поля currency)
         */
        'currency_3'?: string;
        
        /**
         * Способы уведомления
         */
        'notify_type'?: Array<string>;
        
        /**
         * События для уведомлений
         */
        'notify_event'?: Array<string>;
        
        /**
         * Брендирование: Логотип вашей компании, url
         */
        'branding_logo'?: string;
        
        /**
         * Брендирование: Имя файла логотипа
         */
        'branding_logo_name'?: string;
        
        /**
         * Брендирование: Использование брендовых цветов
         */
        'branding_colors'?: {
        };
        
        /**
         * Виды налогообложения
         */
        'tax'?: Array<{
        
        /**
         * ID
         */
        'id'?: number;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>;
        
        /**
         * Языки интерфейса
         */
        'language'?: Array<{
        
        /**
         * ID
         */
        'id'?: number;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>;
        
        /**
         * Курсы валют
         */
        'currency'?: Array<{
        
        /**
         * ID
         */
        'id'?: string;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>;
        
        /**
         * Временные зоны: список
         */
        'timezone_list'?: Array<{
        }>;
        
        /**
         * Способы уведомления: список
         */
        'notify_types_list'?: Array<{
        }>;
        
        /**
         * События для уведомлений: список
         */
        'notify_events_list'?: Array<{
        }>;
        
        /**
         * Объекты для разграничения доступа
         */
        'permission_objects'?: Array<{
        
        /**
         * ID
         */
        'id'?: number;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>;
        
        /**
         * Правила доступа
         */
        'permission_rules'?: Array<{
        
        /**
         * ID
         */
        'id'?: number;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>;
        
        /**
         * Значения варианта доступа
         */
        'permission_values'?: Array<{
        
        /**
         * ID
         */
        'id'?: number;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>;
        
        /**
         * Стартовая страница
         */
        'start_page'?: string;
        
        /**
         * Цвета
         */
        'colors'?: {
        };
        }>;
      })
    );
  }

  /**
   * Чтение настроек.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `settingsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  settingsGet(
    params?: {
    },
    context?: HttpContext
  ): Observable<{

/**
 * Общее: Язык интерфейса (ID берем из запроса - settings_get из поля language)
 */
'lang'?: string;

/**
 * Общее: Часовой пояс
 */
'timezone'?: string;

/**
 * Общее: Валюта №1 (ID берем из запроса - settings_get из поля currency)
 */
'currency_1'?: string;

/**
 * Общее: Валюта №2 (ID берем из запроса - settings_get из поля currency)
 */
'currency_2'?: string;

/**
 * Общее: Валюта №3 (ID берем из запроса - settings_get из поля currency)
 */
'currency_3'?: string;

/**
 * Способы уведомления
 */
'notify_type'?: Array<string>;

/**
 * События для уведомлений
 */
'notify_event'?: Array<string>;

/**
 * Брендирование: Логотип вашей компании, url
 */
'branding_logo'?: string;

/**
 * Брендирование: Имя файла логотипа
 */
'branding_logo_name'?: string;

/**
 * Брендирование: Использование брендовых цветов
 */
'branding_colors'?: {
};

/**
 * Виды налогообложения
 */
'tax'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Языки интерфейса
 */
'language'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Курсы валют
 */
'currency'?: Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Временные зоны: список
 */
'timezone_list'?: Array<{
}>;

/**
 * Способы уведомления: список
 */
'notify_types_list'?: Array<{
}>;

/**
 * События для уведомлений: список
 */
'notify_events_list'?: Array<{
}>;

/**
 * Объекты для разграничения доступа
 */
'permission_objects'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Правила доступа
 */
'permission_rules'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Значения варианта доступа
 */
'permission_values'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Стартовая страница
 */
'start_page'?: string;

/**
 * Цвета
 */
'colors'?: {
};
}> {
    return this.settingsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Общее: Язык интерфейса (ID берем из запроса - settings_get из поля language)
 */
'lang'?: string;

/**
 * Общее: Часовой пояс
 */
'timezone'?: string;

/**
 * Общее: Валюта №1 (ID берем из запроса - settings_get из поля currency)
 */
'currency_1'?: string;

/**
 * Общее: Валюта №2 (ID берем из запроса - settings_get из поля currency)
 */
'currency_2'?: string;

/**
 * Общее: Валюта №3 (ID берем из запроса - settings_get из поля currency)
 */
'currency_3'?: string;

/**
 * Способы уведомления
 */
'notify_type'?: Array<string>;

/**
 * События для уведомлений
 */
'notify_event'?: Array<string>;

/**
 * Брендирование: Логотип вашей компании, url
 */
'branding_logo'?: string;

/**
 * Брендирование: Имя файла логотипа
 */
'branding_logo_name'?: string;

/**
 * Брендирование: Использование брендовых цветов
 */
'branding_colors'?: {
};

/**
 * Виды налогообложения
 */
'tax'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Языки интерфейса
 */
'language'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Курсы валют
 */
'currency'?: Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Временные зоны: список
 */
'timezone_list'?: Array<{
}>;

/**
 * Способы уведомления: список
 */
'notify_types_list'?: Array<{
}>;

/**
 * События для уведомлений: список
 */
'notify_events_list'?: Array<{
}>;

/**
 * Объекты для разграничения доступа
 */
'permission_objects'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Правила доступа
 */
'permission_rules'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Значения варианта доступа
 */
'permission_values'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Стартовая страница
 */
'start_page'?: string;

/**
 * Цвета
 */
'colors'?: {
};
}>): {

/**
 * Общее: Язык интерфейса (ID берем из запроса - settings_get из поля language)
 */
'lang'?: string;

/**
 * Общее: Часовой пояс
 */
'timezone'?: string;

/**
 * Общее: Валюта №1 (ID берем из запроса - settings_get из поля currency)
 */
'currency_1'?: string;

/**
 * Общее: Валюта №2 (ID берем из запроса - settings_get из поля currency)
 */
'currency_2'?: string;

/**
 * Общее: Валюта №3 (ID берем из запроса - settings_get из поля currency)
 */
'currency_3'?: string;

/**
 * Способы уведомления
 */
'notify_type'?: Array<string>;

/**
 * События для уведомлений
 */
'notify_event'?: Array<string>;

/**
 * Брендирование: Логотип вашей компании, url
 */
'branding_logo'?: string;

/**
 * Брендирование: Имя файла логотипа
 */
'branding_logo_name'?: string;

/**
 * Брендирование: Использование брендовых цветов
 */
'branding_colors'?: {
};

/**
 * Виды налогообложения
 */
'tax'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Языки интерфейса
 */
'language'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Курсы валют
 */
'currency'?: Array<{

/**
 * ID
 */
'id'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Временные зоны: список
 */
'timezone_list'?: Array<{
}>;

/**
 * Способы уведомления: список
 */
'notify_types_list'?: Array<{
}>;

/**
 * События для уведомлений: список
 */
'notify_events_list'?: Array<{
}>;

/**
 * Объекты для разграничения доступа
 */
'permission_objects'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Правила доступа
 */
'permission_rules'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Значения варианта доступа
 */
'permission_values'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Стартовая страница
 */
'start_page'?: string;

/**
 * Цвета
 */
'colors'?: {
};
} => r.body)
    );
  }

  /** Path part for operation `settingsUpdate()` */
  static readonly SettingsUpdatePath = '/settings_update';

  /**
   * Сохранение настроек.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `settingsUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  settingsUpdate$Response(
    params?: {
      body?: {

/**
 * Общее: Язык интерфейса (ID берем из запроса - settings_get из поля language)
 */
'lang'?: string;

/**
 * Общее: Часовой пояс
 */
'timezone'?: string;

/**
 * Общее: Валюта №1 (ID берем из запроса - settings_get из поля currency)
 */
'currency_1'?: string;

/**
 * Общее: Валюта №2 (ID берем из запроса - settings_get из поля currency)
 */
'currency_2'?: string;

/**
 * Общее: Валюта №3 (ID берем из запроса - settings_get из поля currency)
 */
'currency_3'?: string;

/**
 * Способы уведомления
 */
'notify_type'?: Array<string>;

/**
 * События для уведомлений
 */
'notify_event'?: Array<string>;

/**
 * Брендирование: Логотип вашей компании, строка base64 (svg, png, jpg, gif, bmp)
 */
'branding_logo'?: string;

/**
 * Брендирование: Имя файла логотипа
 */
'branding_logo_name'?: string;

/**
 * Брендирование: Использование брендовых цветов
 */
'branding_colors'?: {
};
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, SettingsService.SettingsUpdatePath, 'post');
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
   * Сохранение настроек.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `settingsUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  settingsUpdate(
    params?: {
      body?: {

/**
 * Общее: Язык интерфейса (ID берем из запроса - settings_get из поля language)
 */
'lang'?: string;

/**
 * Общее: Часовой пояс
 */
'timezone'?: string;

/**
 * Общее: Валюта №1 (ID берем из запроса - settings_get из поля currency)
 */
'currency_1'?: string;

/**
 * Общее: Валюта №2 (ID берем из запроса - settings_get из поля currency)
 */
'currency_2'?: string;

/**
 * Общее: Валюта №3 (ID берем из запроса - settings_get из поля currency)
 */
'currency_3'?: string;

/**
 * Способы уведомления
 */
'notify_type'?: Array<string>;

/**
 * События для уведомлений
 */
'notify_event'?: Array<string>;

/**
 * Брендирование: Логотип вашей компании, строка base64 (svg, png, jpg, gif, bmp)
 */
'branding_logo'?: string;

/**
 * Брендирование: Имя файла логотипа
 */
'branding_logo_name'?: string;

/**
 * Брендирование: Использование брендовых цветов
 */
'branding_colors'?: {
};
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.settingsUpdate$Response(params, context).pipe(
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

  /** Path part for operation `settingsFilterList()` */
  static readonly SettingsFilterListPath = '/settings_filter_list';

  /**
   * Фильтры.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `settingsFilterList()` instead.
   *
   * This method doesn't expect any request body.
   */
  settingsFilterList$Response(
    params: {

    /**
     * Раздел
     */
      table: string;

    /**
     * Начальная позиция
     */
      start?: number;

    /**
     * Лимит позиций на страницу
     */
      count?: number;
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
 * Раздел
 */
'table': string;

/**
 * Наименование фильтра
 */
'name': string;

/**
 * Тип фильтра
 */
'type': string;

/**
 * Тип фильтра текст
 */
'type_text'?: string;

/**
 * Тип фильтра фиксирован
 */
'type_fixed'?: boolean;

/**
 * Поле БД
 */
'field': string;

/**
 * Статус
 */
'show': boolean;

/**
 * Место
 */
'place': string;

/**
 * Место текст
 */
'place_text'?: string;
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, SettingsService.SettingsFilterListPath, 'get');
    if (params) {
      rb.query('table', params.table, {});
      rb.query('start', params.start, {});
      rb.query('count', params.count, {});
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
         * Раздел
         */
        'table': string;
        
        /**
         * Наименование фильтра
         */
        'name': string;
        
        /**
         * Тип фильтра
         */
        'type': string;
        
        /**
         * Тип фильтра текст
         */
        'type_text'?: string;
        
        /**
         * Тип фильтра фиксирован
         */
        'type_fixed'?: boolean;
        
        /**
         * Поле БД
         */
        'field': string;
        
        /**
         * Статус
         */
        'show': boolean;
        
        /**
         * Место
         */
        'place': string;
        
        /**
         * Место текст
         */
        'place_text'?: string;
        }>;
        }>;
      })
    );
  }

  /**
   * Фильтры.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `settingsFilterList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  settingsFilterList(
    params: {

    /**
     * Раздел
     */
      table: string;

    /**
     * Начальная позиция
     */
      start?: number;

    /**
     * Лимит позиций на страницу
     */
      count?: number;
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
 * Раздел
 */
'table': string;

/**
 * Наименование фильтра
 */
'name': string;

/**
 * Тип фильтра
 */
'type': string;

/**
 * Тип фильтра текст
 */
'type_text'?: string;

/**
 * Тип фильтра фиксирован
 */
'type_fixed'?: boolean;

/**
 * Поле БД
 */
'field': string;

/**
 * Статус
 */
'show': boolean;

/**
 * Место
 */
'place': string;

/**
 * Место текст
 */
'place_text'?: string;
}>;
}> {
    return this.settingsFilterList$Response(params, context).pipe(
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
 * Раздел
 */
'table': string;

/**
 * Наименование фильтра
 */
'name': string;

/**
 * Тип фильтра
 */
'type': string;

/**
 * Тип фильтра текст
 */
'type_text'?: string;

/**
 * Тип фильтра фиксирован
 */
'type_fixed'?: boolean;

/**
 * Поле БД
 */
'field': string;

/**
 * Статус
 */
'show': boolean;

/**
 * Место
 */
'place': string;

/**
 * Место текст
 */
'place_text'?: string;
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
 * Раздел
 */
'table': string;

/**
 * Наименование фильтра
 */
'name': string;

/**
 * Тип фильтра
 */
'type': string;

/**
 * Тип фильтра текст
 */
'type_text'?: string;

/**
 * Тип фильтра фиксирован
 */
'type_fixed'?: boolean;

/**
 * Поле БД
 */
'field': string;

/**
 * Статус
 */
'show': boolean;

/**
 * Место
 */
'place': string;

/**
 * Место текст
 */
'place_text'?: string;
}>;
} => r.body)
    );
  }

  /** Path part for operation `settingsFilterFormParam()` */
  static readonly SettingsFilterFormParamPath = '/settings_filter_form_param';

  /**
   * Параметры для форм.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `settingsFilterFormParam()` instead.
   *
   * This method doesn't expect any request body.
   */
  settingsFilterFormParam$Response(
    params?: {

    /**
     * Таблица/раздел
     */
      table?: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Таблицы/разделы
 */
'tables': Array<{
}>;

/**
 * Типы
 */
'types': Array<{
}>;

/**
 * Места
 */
'places'?: Array<{
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, SettingsService.SettingsFilterFormParamPath, 'get');
    if (params) {
      rb.query('table', params.table, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Таблицы/разделы
         */
        'tables': Array<{
        }>;
        
        /**
         * Типы
         */
        'types': Array<{
        }>;
        
        /**
         * Места
         */
        'places'?: Array<{
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
   * To access the full response (for headers, for example), `settingsFilterFormParam$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  settingsFilterFormParam(
    params?: {

    /**
     * Таблица/раздел
     */
      table?: string;
    },
    context?: HttpContext
  ): Observable<{

/**
 * Таблицы/разделы
 */
'tables': Array<{
}>;

/**
 * Типы
 */
'types': Array<{
}>;

/**
 * Места
 */
'places'?: Array<{
}>;
}> {
    return this.settingsFilterFormParam$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Таблицы/разделы
 */
'tables': Array<{
}>;

/**
 * Типы
 */
'types': Array<{
}>;

/**
 * Места
 */
'places'?: Array<{
}>;
}>): {

/**
 * Таблицы/разделы
 */
'tables': Array<{
}>;

/**
 * Типы
 */
'types': Array<{
}>;

/**
 * Места
 */
'places'?: Array<{
}>;
} => r.body)
    );
  }

  /** Path part for operation `settingsFilterSave()` */
  static readonly SettingsFilterSavePath = '/settings_filter_save';

  /**
   * Сохранение фильтра.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `settingsFilterSave()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  settingsFilterSave$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id'?: number;

/**
 * Раздел
 */
'table': string;

/**
 * Наименование фильтра
 */
'name': string;

/**
 * Тип фильтра
 */
'type': string;

/**
 * Поле БД
 */
'field': string;

/**
 * Статус
 */
'show': boolean;

/**
 * Место
 */
'place': string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, SettingsService.SettingsFilterSavePath, 'post');
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
   * Сохранение фильтра.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `settingsFilterSave$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  settingsFilterSave(
    params?: {
      body?: {

/**
 * ID
 */
'id'?: number;

/**
 * Раздел
 */
'table': string;

/**
 * Наименование фильтра
 */
'name': string;

/**
 * Тип фильтра
 */
'type': string;

/**
 * Поле БД
 */
'field': string;

/**
 * Статус
 */
'show': boolean;

/**
 * Место
 */
'place': string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.settingsFilterSave$Response(params, context).pipe(
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

  /** Path part for operation `settingsFilterSaveOrder()` */
  static readonly SettingsFilterSaveOrderPath = '/settings_filter_save_order';

  /**
   * Сохранение порядка фильтров.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `settingsFilterSaveOrder()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  settingsFilterSaveOrder$Response(
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
    const rb = new RequestBuilder(this.rootUrl, SettingsService.SettingsFilterSaveOrderPath, 'post');
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
   * Сохранение порядка фильтров.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `settingsFilterSaveOrder$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  settingsFilterSaveOrder(
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
    return this.settingsFilterSaveOrder$Response(params, context).pipe(
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

  /** Path part for operation `settingsFilterDelete()` */
  static readonly SettingsFilterDeletePath = '/settings_filter_delete';

  /**
   * Удаление фильтров.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `settingsFilterDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  settingsFilterDelete$Response(
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
    const rb = new RequestBuilder(this.rootUrl, SettingsService.SettingsFilterDeletePath, 'post');
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
   * Удаление фильтров.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `settingsFilterDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  settingsFilterDelete(
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
    return this.settingsFilterDelete$Response(params, context).pipe(
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
