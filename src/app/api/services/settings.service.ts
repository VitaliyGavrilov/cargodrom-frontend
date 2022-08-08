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
 * Настройки
 */
@Injectable({
  providedIn: 'root',
})
export class SettingsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation settingsGet
   */
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
  settingsGet$Response(params?: {
  }): Observable<StrictHttpResponse<{

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
 * Способ уведомления: SMS
 */
'notify_by_sms'?: boolean;

/**
 * Способ уведомления: E-mail
 */
'notify_by_email'?: boolean;

/**
 * Способ уведомления: Skype
 */
'notify_by_skype'?: boolean;

/**
 * Способ уведомления: Сообщение в системе
 */
'notify_by_system'?: boolean;

/**
 * Уведомления: Смена пароля
 */
'notify_change_password'?: boolean;

/**
 * Уведомления: Смена контактных данных
 */
'notify_change_contact'?: boolean;

/**
 * Уведомления: Вход в систему с другого устройства
 */
'notify_other_login'?: boolean;

/**
 * Уведомления: Добавление ставки
 */
'notify_add_rate'?: boolean;

/**
 * Уведомления: Добавление подрядчика
 */
'notify_add_contractor'?: boolean;

/**
 * Уведомления: Изменение тарифов
 */
'notify_change_tariff'?: boolean;

/**
 * Уведомления: Изменение курса валюты
 */
'notify_change_currency'?: boolean;

/**
 * Уведомления: Изменение параметров ставки
 */
'notify_change_rate_param'?: boolean;

/**
 * Брендирование: Логотип вашей компании, url
 */
'branding_logo'?: string;

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
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
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
}>> {

    const rb = new RequestBuilder(this.rootUrl, SettingsService.SettingsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
         * Способ уведомления: SMS
         */
        'notify_by_sms'?: boolean;
        
        /**
         * Способ уведомления: E-mail
         */
        'notify_by_email'?: boolean;
        
        /**
         * Способ уведомления: Skype
         */
        'notify_by_skype'?: boolean;
        
        /**
         * Способ уведомления: Сообщение в системе
         */
        'notify_by_system'?: boolean;
        
        /**
         * Уведомления: Смена пароля
         */
        'notify_change_password'?: boolean;
        
        /**
         * Уведомления: Смена контактных данных
         */
        'notify_change_contact'?: boolean;
        
        /**
         * Уведомления: Вход в систему с другого устройства
         */
        'notify_other_login'?: boolean;
        
        /**
         * Уведомления: Добавление ставки
         */
        'notify_add_rate'?: boolean;
        
        /**
         * Уведомления: Добавление подрядчика
         */
        'notify_add_contractor'?: boolean;
        
        /**
         * Уведомления: Изменение тарифов
         */
        'notify_change_tariff'?: boolean;
        
        /**
         * Уведомления: Изменение курса валюты
         */
        'notify_change_currency'?: boolean;
        
        /**
         * Уведомления: Изменение параметров ставки
         */
        'notify_change_rate_param'?: boolean;
        
        /**
         * Брендирование: Логотип вашей компании, url
         */
        'branding_logo'?: string;
        
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
        'id'?: number;
        
        /**
         * Наименование
         */
        'name'?: string;
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
        }>;
      })
    );
  }

  /**
   * Чтение настроек.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `settingsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  settingsGet(params?: {
  }): Observable<{

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
 * Способ уведомления: SMS
 */
'notify_by_sms'?: boolean;

/**
 * Способ уведомления: E-mail
 */
'notify_by_email'?: boolean;

/**
 * Способ уведомления: Skype
 */
'notify_by_skype'?: boolean;

/**
 * Способ уведомления: Сообщение в системе
 */
'notify_by_system'?: boolean;

/**
 * Уведомления: Смена пароля
 */
'notify_change_password'?: boolean;

/**
 * Уведомления: Смена контактных данных
 */
'notify_change_contact'?: boolean;

/**
 * Уведомления: Вход в систему с другого устройства
 */
'notify_other_login'?: boolean;

/**
 * Уведомления: Добавление ставки
 */
'notify_add_rate'?: boolean;

/**
 * Уведомления: Добавление подрядчика
 */
'notify_add_contractor'?: boolean;

/**
 * Уведомления: Изменение тарифов
 */
'notify_change_tariff'?: boolean;

/**
 * Уведомления: Изменение курса валюты
 */
'notify_change_currency'?: boolean;

/**
 * Уведомления: Изменение параметров ставки
 */
'notify_change_rate_param'?: boolean;

/**
 * Брендирование: Логотип вашей компании, url
 */
'branding_logo'?: string;

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
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
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
}> {

    return this.settingsGet$Response(params).pipe(
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
 * Способ уведомления: SMS
 */
'notify_by_sms'?: boolean;

/**
 * Способ уведомления: E-mail
 */
'notify_by_email'?: boolean;

/**
 * Способ уведомления: Skype
 */
'notify_by_skype'?: boolean;

/**
 * Способ уведомления: Сообщение в системе
 */
'notify_by_system'?: boolean;

/**
 * Уведомления: Смена пароля
 */
'notify_change_password'?: boolean;

/**
 * Уведомления: Смена контактных данных
 */
'notify_change_contact'?: boolean;

/**
 * Уведомления: Вход в систему с другого устройства
 */
'notify_other_login'?: boolean;

/**
 * Уведомления: Добавление ставки
 */
'notify_add_rate'?: boolean;

/**
 * Уведомления: Добавление подрядчика
 */
'notify_add_contractor'?: boolean;

/**
 * Уведомления: Изменение тарифов
 */
'notify_change_tariff'?: boolean;

/**
 * Уведомления: Изменение курса валюты
 */
'notify_change_currency'?: boolean;

/**
 * Уведомления: Изменение параметров ставки
 */
'notify_change_rate_param'?: boolean;

/**
 * Брендирование: Логотип вашей компании, url
 */
'branding_logo'?: string;

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
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
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
}>) => r.body as {

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
 * Способ уведомления: SMS
 */
'notify_by_sms'?: boolean;

/**
 * Способ уведомления: E-mail
 */
'notify_by_email'?: boolean;

/**
 * Способ уведомления: Skype
 */
'notify_by_skype'?: boolean;

/**
 * Способ уведомления: Сообщение в системе
 */
'notify_by_system'?: boolean;

/**
 * Уведомления: Смена пароля
 */
'notify_change_password'?: boolean;

/**
 * Уведомления: Смена контактных данных
 */
'notify_change_contact'?: boolean;

/**
 * Уведомления: Вход в систему с другого устройства
 */
'notify_other_login'?: boolean;

/**
 * Уведомления: Добавление ставки
 */
'notify_add_rate'?: boolean;

/**
 * Уведомления: Добавление подрядчика
 */
'notify_add_contractor'?: boolean;

/**
 * Уведомления: Изменение тарифов
 */
'notify_change_tariff'?: boolean;

/**
 * Уведомления: Изменение курса валюты
 */
'notify_change_currency'?: boolean;

/**
 * Уведомления: Изменение параметров ставки
 */
'notify_change_rate_param'?: boolean;

/**
 * Брендирование: Логотип вашей компании, url
 */
'branding_logo'?: string;

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
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
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
})
    );
  }

  /**
   * Path part for operation settingsUpdate
   */
  static readonly SettingsUpdatePath = '/settings_update';

  /**
   * Сохранение настроек.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `settingsUpdate()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  settingsUpdate$Response(params?: {
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
 * Способ уведомления: SMS
 */
'notify_by_sms'?: boolean;

/**
 * Способ уведомления: E-mail
 */
'notify_by_email'?: boolean;

/**
 * Способ уведомления: Skype
 */
'notify_by_skype'?: boolean;

/**
 * Способ уведомления: Сообщение в системе
 */
'notify_by_system'?: boolean;

/**
 * Уведомления: Смена пароля
 */
'notify_change_password'?: boolean;

/**
 * Уведомления: Смена контактных данных
 */
'notify_change_contact'?: boolean;

/**
 * Уведомления: Вход в систему с другого устройства
 */
'notify_other_login'?: boolean;

/**
 * Уведомления: Добавление ставки
 */
'notify_add_rate'?: boolean;

/**
 * Уведомления: Добавление подрядчика
 */
'notify_add_contractor'?: boolean;

/**
 * Уведомления: Изменение тарифов
 */
'notify_change_tariff'?: boolean;

/**
 * Уведомления: Изменение курса валюты
 */
'notify_change_currency'?: boolean;

/**
 * Уведомления: Изменение параметров ставки
 */
'notify_change_rate_param'?: boolean;

/**
 * Брендирование: Логотип вашей компании, строка base64 (svg, png, jpg, gif, bmp)
 */
'branding_logo'?: file;
}
  }): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, SettingsService.SettingsUpdatePath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
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
        'result': string;
        }>;
      })
    );
  }

  /**
   * Сохранение настроек.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `settingsUpdate$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  settingsUpdate(params?: {
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
 * Способ уведомления: SMS
 */
'notify_by_sms'?: boolean;

/**
 * Способ уведомления: E-mail
 */
'notify_by_email'?: boolean;

/**
 * Способ уведомления: Skype
 */
'notify_by_skype'?: boolean;

/**
 * Способ уведомления: Сообщение в системе
 */
'notify_by_system'?: boolean;

/**
 * Уведомления: Смена пароля
 */
'notify_change_password'?: boolean;

/**
 * Уведомления: Смена контактных данных
 */
'notify_change_contact'?: boolean;

/**
 * Уведомления: Вход в систему с другого устройства
 */
'notify_other_login'?: boolean;

/**
 * Уведомления: Добавление ставки
 */
'notify_add_rate'?: boolean;

/**
 * Уведомления: Добавление подрядчика
 */
'notify_add_contractor'?: boolean;

/**
 * Уведомления: Изменение тарифов
 */
'notify_change_tariff'?: boolean;

/**
 * Уведомления: Изменение курса валюты
 */
'notify_change_currency'?: boolean;

/**
 * Уведомления: Изменение параметров ставки
 */
'notify_change_rate_param'?: boolean;

/**
 * Брендирование: Логотип вашей компании, строка base64 (svg, png, jpg, gif, bmp)
 */
'branding_logo'?: file;
}
  }): Observable<{

/**
 * Статус выполнения
 */
'result': string;
}> {

    return this.settingsUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': string;
}>) => r.body as {

/**
 * Статус выполнения
 */
'result': string;
})
    );
  }

}
