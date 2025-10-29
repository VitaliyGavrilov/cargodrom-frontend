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
 * Работа с контрагентами
 */
@Injectable({ providedIn: 'root' })
export class ContractorService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `contractorList()` */
  static readonly ContractorListPath = '/contractor_list';

  /**
   * Список контрагентов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorList()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorList$Response(
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
     * Фильтр
     */
      filter?: {
};

    /**
     * Сортировка
     */
      sort?: Array<{

/**
 * Поле сортировки
 */
'field'?: 'id' | 'name' | 'rating_nps_text' | 'trade_rating' | 'allow_trade' | 'avg_answer_time';

/**
 * Направление сортировки
 */
'dir'?: 'asc' | 'desc';
}>;

    /**
     * ID запроса торгов
     */
      bidding_request_id?: number;
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
 * Наименование подрядчика
 */
'name'?: string;

/**
 * Идентификатор (ИНН, Rec № и пр.)
 */
'ind'?: string;

/**
 * Страна нахождения
 */
'country_name'?: string;

/**
 * Страна нахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город
 */
'city_name'?: string;

/**
 * Город (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Адрес
 */
'address'?: string;

/**
 * Общий телефон
 */
'phone'?: string;

/**
 * Сайт компании
 */
'web'?: string;

/**
 * Язык общения
 */
'language_name'?: string;

/**
 * Язык общения (ID берем из запроса - settings_get из поля language)
 */
'language_id'?: string;

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Вид подрядчика
 */
'type_name'?: string;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Тип контрагента
 */
'counterparty_name'?: string;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Членство в ассоциациях
 */
'association_name'?: Array<string>;

/**
 * Членство в ассоциациях (ID берем из запроса - system_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения
 */
'tax_name'?: string;

/**
 * Система налогообложения (ID берем из запроса - system_tax_system)
 */
'tax_id'?: number;

/**
 * Формат отправки запроса
 */
'request_format_name'?: string;

/**
 * Формат отправки запроса (ID берем из запроса - contractor_request_format)
 */
'request_format_id'?: string;

/**
 * Участник торгов
 */
'allow_trade'?: boolean;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Участник торгов
 */
'allow_trade_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Моя оценка подрядчика (NPS)
 */
'user_rating_nps_text'?: string;

/**
 * Моя оценка подрядчика (NPS)
 */
'user_rating_nps'?: number;

/**
 * Средняя скорость ответа
 */
'avg_answer_time': string;

/**
 * Отзывы по работе с подрядчиком (всего)
 */
'review_count'?: number;

/**
 * Отзывы по работе с подрядчиком (позитивные)
 */
'review_positive_count'?: number;

/**
 * Отзывы по работе с подрядчиком (негативные)
 */
'review_negative_count'?: number;

/**
 * Отзывы по работе с подрядчиком (нейтральные)
 */
'review_neutral_count'?: number;

/**
 * Всего выполнено перевозок
 */
'order_count'?: number;

/**
 * % успешных торгов
 */
'trade_percent'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Количество контактных лиц
 */
'contact_count'?: number;

/**
 * Контактные лица
 */
'contacts'?: Array<{

/**
 * ID
 */
'id': number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса
 */
'city_name'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;

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
 * Контактные лица
 */
'contact_name'?: string;

/**
 * Контактная информация
 */
'contact_info'?: string;

/**
 * Контактная информация для таблицы
 */
'contact_info_tbl'?: string;

/**
 * Специализация
 */
'specialization'?: Array<string>;

/**
 * Специализация
 */
'specialization_text'?: any;

/**
 * Загрузка грузов
 */
'container'?: Array<string>;

/**
 * Загрузка грузов
 */
'container_text'?: string;

/**
 * Время создания
 */
'time'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;

/**
 * Запрос на торги отправлен
 */
'bidding_send'?: boolean;
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorListPath, 'get');
    if (params) {
      rb.query('start', params.start, {});
      rb.query('count', params.count, {});
      rb.query('filter', params.filter, {});
      rb.query('sort', params.sort, {"style":"form","explode":false});
      rb.query('bidding_request_id', params.bidding_request_id, {});
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
         * Наименование подрядчика
         */
        'name'?: string;
        
        /**
         * Идентификатор (ИНН, Rec № и пр.)
         */
        'ind'?: string;
        
        /**
         * Страна нахождения
         */
        'country_name'?: string;
        
        /**
         * Страна нахождения (ID берем из запроса - direction_country)
         */
        'country_id'?: number;
        
        /**
         * Город
         */
        'city_name'?: string;
        
        /**
         * Город (ID берем из запроса - direction_city)
         */
        'city_id'?: number;
        
        /**
         * Адрес
         */
        'address'?: string;
        
        /**
         * Общий телефон
         */
        'phone'?: string;
        
        /**
         * Сайт компании
         */
        'web'?: string;
        
        /**
         * Язык общения
         */
        'language_name'?: string;
        
        /**
         * Язык общения (ID берем из запроса - settings_get из поля language)
         */
        'language_id'?: string;
        
        /**
         * Агент транспортной компании
         */
        'carrier_name'?: string;
        
        /**
         * Агент транспортной компании (ID берем из запроса - transport_carrier)
         */
        'carrier_id'?: number;
        
        /**
         * Вид подрядчика
         */
        'type_name'?: string;
        
        /**
         * Вид подрядчика (ID берем из запроса - contractor_type)
         */
        'type_id'?: number;
        
        /**
         * Тип контрагента
         */
        'counterparty_name'?: string;
        
        /**
         * Тип контрагента (ID берем из запроса - system_counterparty)
         */
        'counterparty_id'?: number;
        
        /**
         * Членство в ассоциациях
         */
        'association_name'?: Array<string>;
        
        /**
         * Членство в ассоциациях (ID берем из запроса - system_association)
         */
        'association_id'?: Array<string>;
        
        /**
         * Система налогообложения
         */
        'tax_name'?: string;
        
        /**
         * Система налогообложения (ID берем из запроса - system_tax_system)
         */
        'tax_id'?: number;
        
        /**
         * Формат отправки запроса
         */
        'request_format_name'?: string;
        
        /**
         * Формат отправки запроса (ID берем из запроса - contractor_request_format)
         */
        'request_format_id'?: string;
        
        /**
         * Участник торгов
         */
        'allow_trade'?: boolean;
        
        /**
         * Валюта (ID берем из запроса - system_currency)
         */
        'currency'?: number;
        
        /**
         * Участник торгов
         */
        'allow_trade_text'?: string;
        
        /**
         * Рейтинг в системе (NPS)
         */
        'rating_nps_text'?: string;
        
        /**
         * Рейтинг в системе (NPS)
         */
        'rating_nps'?: number;
        
        /**
         * Моя оценка подрядчика (NPS)
         */
        'user_rating_nps_text'?: string;
        
        /**
         * Моя оценка подрядчика (NPS)
         */
        'user_rating_nps'?: number;
        
        /**
         * Средняя скорость ответа
         */
        'avg_answer_time': string;
        
        /**
         * Отзывы по работе с подрядчиком (всего)
         */
        'review_count'?: number;
        
        /**
         * Отзывы по работе с подрядчиком (позитивные)
         */
        'review_positive_count'?: number;
        
        /**
         * Отзывы по работе с подрядчиком (негативные)
         */
        'review_negative_count'?: number;
        
        /**
         * Отзывы по работе с подрядчиком (нейтральные)
         */
        'review_neutral_count'?: number;
        
        /**
         * Всего выполнено перевозок
         */
        'order_count'?: number;
        
        /**
         * % успешных торгов
         */
        'trade_percent'?: number;
        
        /**
         * Участие в торгах (общее количество)
         */
        'trade_count'?: number;
        
        /**
         * Количество выигранных торгов
         */
        'trade_success_count'?: number;
        
        /**
         * Количество проигранных торгов
         */
        'trade_fail_count'?: number;
        
        /**
         * Участие в торгах (результаты)
         */
        'trade_count_text'?: number;
        
        /**
         * Количество контактных лиц
         */
        'contact_count'?: number;
        
        /**
         * Контактные лица
         */
        'contacts'?: Array<{
        
        /**
         * ID
         */
        'id': number;
        
        /**
         * ФИО
         */
        'name'?: string;
        
        /**
         * Фамилия
         */
        'name_f'?: string;
        
        /**
         * Имя
         */
        'name_i'?: string;
        
        /**
         * Отчество
         */
        'name_o'?: string;
        
        /**
         * Должность
         */
        'position'?: string;
        
        /**
         * Местонахождение офиса
         */
        'city_name'?: string;
        
        /**
         * Местонахождение офиса (ID берем из запроса - direction_city)
         */
        'city_id'?: number;
        
        /**
         * Офисный телефон
         */
        'phone'?: string;
        
        /**
         * Мобильный телефон
         */
        'mobile_phone'?: string;
        
        /**
         * E-mail
         */
        'email'?: string;
        
        /**
         * Skype
         */
        'skype'?: string;
        
        /**
         * Telegram
         */
        'telegram'?: string;
        
        /**
         * Whatsapp
         */
        'whatsapp'?: string;
        
        /**
         * WeChat
         */
        'wechat'?: string;
        
        /**
         * Ответственный за направления
         */
        'direction'?: Array<{
        
        /**
         * Страна отправления
         */
        'direction_departure': number;
        
        /**
         * Страна прибытия
         */
        'direction_arrival': number;
        
        /**
         * Транспорт
         */
        'direction_items': Array<string>;
        }>;
        
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
         * Контактные лица
         */
        'contact_name'?: string;
        
        /**
         * Контактная информация
         */
        'contact_info'?: string;
        
        /**
         * Контактная информация для таблицы
         */
        'contact_info_tbl'?: string;
        
        /**
         * Специализация
         */
        'specialization'?: Array<string>;
        
        /**
         * Специализация
         */
        'specialization_text'?: any;
        
        /**
         * Загрузка грузов
         */
        'container'?: Array<string>;
        
        /**
         * Загрузка грузов
         */
        'container_text'?: string;
        
        /**
         * Время создания
         */
        'time'?: string;
        
        /**
         * Время изменения
         */
        'time_edit'?: string;
        
        /**
         * Запрос на торги отправлен
         */
        'bidding_send'?: boolean;
        }>;
        }>;
      })
    );
  }

  /**
   * Список контрагентов.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorList(
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
     * Фильтр
     */
      filter?: {
};

    /**
     * Сортировка
     */
      sort?: Array<{

/**
 * Поле сортировки
 */
'field'?: 'id' | 'name' | 'rating_nps_text' | 'trade_rating' | 'allow_trade' | 'avg_answer_time';

/**
 * Направление сортировки
 */
'dir'?: 'asc' | 'desc';
}>;

    /**
     * ID запроса торгов
     */
      bidding_request_id?: number;
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
 * Наименование подрядчика
 */
'name'?: string;

/**
 * Идентификатор (ИНН, Rec № и пр.)
 */
'ind'?: string;

/**
 * Страна нахождения
 */
'country_name'?: string;

/**
 * Страна нахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город
 */
'city_name'?: string;

/**
 * Город (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Адрес
 */
'address'?: string;

/**
 * Общий телефон
 */
'phone'?: string;

/**
 * Сайт компании
 */
'web'?: string;

/**
 * Язык общения
 */
'language_name'?: string;

/**
 * Язык общения (ID берем из запроса - settings_get из поля language)
 */
'language_id'?: string;

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Вид подрядчика
 */
'type_name'?: string;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Тип контрагента
 */
'counterparty_name'?: string;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Членство в ассоциациях
 */
'association_name'?: Array<string>;

/**
 * Членство в ассоциациях (ID берем из запроса - system_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения
 */
'tax_name'?: string;

/**
 * Система налогообложения (ID берем из запроса - system_tax_system)
 */
'tax_id'?: number;

/**
 * Формат отправки запроса
 */
'request_format_name'?: string;

/**
 * Формат отправки запроса (ID берем из запроса - contractor_request_format)
 */
'request_format_id'?: string;

/**
 * Участник торгов
 */
'allow_trade'?: boolean;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Участник торгов
 */
'allow_trade_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Моя оценка подрядчика (NPS)
 */
'user_rating_nps_text'?: string;

/**
 * Моя оценка подрядчика (NPS)
 */
'user_rating_nps'?: number;

/**
 * Средняя скорость ответа
 */
'avg_answer_time': string;

/**
 * Отзывы по работе с подрядчиком (всего)
 */
'review_count'?: number;

/**
 * Отзывы по работе с подрядчиком (позитивные)
 */
'review_positive_count'?: number;

/**
 * Отзывы по работе с подрядчиком (негативные)
 */
'review_negative_count'?: number;

/**
 * Отзывы по работе с подрядчиком (нейтральные)
 */
'review_neutral_count'?: number;

/**
 * Всего выполнено перевозок
 */
'order_count'?: number;

/**
 * % успешных торгов
 */
'trade_percent'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Количество контактных лиц
 */
'contact_count'?: number;

/**
 * Контактные лица
 */
'contacts'?: Array<{

/**
 * ID
 */
'id': number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса
 */
'city_name'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;

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
 * Контактные лица
 */
'contact_name'?: string;

/**
 * Контактная информация
 */
'contact_info'?: string;

/**
 * Контактная информация для таблицы
 */
'contact_info_tbl'?: string;

/**
 * Специализация
 */
'specialization'?: Array<string>;

/**
 * Специализация
 */
'specialization_text'?: any;

/**
 * Загрузка грузов
 */
'container'?: Array<string>;

/**
 * Загрузка грузов
 */
'container_text'?: string;

/**
 * Время создания
 */
'time'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;

/**
 * Запрос на торги отправлен
 */
'bidding_send'?: boolean;
}>;
}> {
    return this.contractorList$Response(params, context).pipe(
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
 * Наименование подрядчика
 */
'name'?: string;

/**
 * Идентификатор (ИНН, Rec № и пр.)
 */
'ind'?: string;

/**
 * Страна нахождения
 */
'country_name'?: string;

/**
 * Страна нахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город
 */
'city_name'?: string;

/**
 * Город (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Адрес
 */
'address'?: string;

/**
 * Общий телефон
 */
'phone'?: string;

/**
 * Сайт компании
 */
'web'?: string;

/**
 * Язык общения
 */
'language_name'?: string;

/**
 * Язык общения (ID берем из запроса - settings_get из поля language)
 */
'language_id'?: string;

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Вид подрядчика
 */
'type_name'?: string;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Тип контрагента
 */
'counterparty_name'?: string;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Членство в ассоциациях
 */
'association_name'?: Array<string>;

/**
 * Членство в ассоциациях (ID берем из запроса - system_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения
 */
'tax_name'?: string;

/**
 * Система налогообложения (ID берем из запроса - system_tax_system)
 */
'tax_id'?: number;

/**
 * Формат отправки запроса
 */
'request_format_name'?: string;

/**
 * Формат отправки запроса (ID берем из запроса - contractor_request_format)
 */
'request_format_id'?: string;

/**
 * Участник торгов
 */
'allow_trade'?: boolean;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Участник торгов
 */
'allow_trade_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Моя оценка подрядчика (NPS)
 */
'user_rating_nps_text'?: string;

/**
 * Моя оценка подрядчика (NPS)
 */
'user_rating_nps'?: number;

/**
 * Средняя скорость ответа
 */
'avg_answer_time': string;

/**
 * Отзывы по работе с подрядчиком (всего)
 */
'review_count'?: number;

/**
 * Отзывы по работе с подрядчиком (позитивные)
 */
'review_positive_count'?: number;

/**
 * Отзывы по работе с подрядчиком (негативные)
 */
'review_negative_count'?: number;

/**
 * Отзывы по работе с подрядчиком (нейтральные)
 */
'review_neutral_count'?: number;

/**
 * Всего выполнено перевозок
 */
'order_count'?: number;

/**
 * % успешных торгов
 */
'trade_percent'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Количество контактных лиц
 */
'contact_count'?: number;

/**
 * Контактные лица
 */
'contacts'?: Array<{

/**
 * ID
 */
'id': number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса
 */
'city_name'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;

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
 * Контактные лица
 */
'contact_name'?: string;

/**
 * Контактная информация
 */
'contact_info'?: string;

/**
 * Контактная информация для таблицы
 */
'contact_info_tbl'?: string;

/**
 * Специализация
 */
'specialization'?: Array<string>;

/**
 * Специализация
 */
'specialization_text'?: any;

/**
 * Загрузка грузов
 */
'container'?: Array<string>;

/**
 * Загрузка грузов
 */
'container_text'?: string;

/**
 * Время создания
 */
'time'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;

/**
 * Запрос на торги отправлен
 */
'bidding_send'?: boolean;
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
 * Наименование подрядчика
 */
'name'?: string;

/**
 * Идентификатор (ИНН, Rec № и пр.)
 */
'ind'?: string;

/**
 * Страна нахождения
 */
'country_name'?: string;

/**
 * Страна нахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город
 */
'city_name'?: string;

/**
 * Город (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Адрес
 */
'address'?: string;

/**
 * Общий телефон
 */
'phone'?: string;

/**
 * Сайт компании
 */
'web'?: string;

/**
 * Язык общения
 */
'language_name'?: string;

/**
 * Язык общения (ID берем из запроса - settings_get из поля language)
 */
'language_id'?: string;

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Вид подрядчика
 */
'type_name'?: string;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Тип контрагента
 */
'counterparty_name'?: string;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Членство в ассоциациях
 */
'association_name'?: Array<string>;

/**
 * Членство в ассоциациях (ID берем из запроса - system_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения
 */
'tax_name'?: string;

/**
 * Система налогообложения (ID берем из запроса - system_tax_system)
 */
'tax_id'?: number;

/**
 * Формат отправки запроса
 */
'request_format_name'?: string;

/**
 * Формат отправки запроса (ID берем из запроса - contractor_request_format)
 */
'request_format_id'?: string;

/**
 * Участник торгов
 */
'allow_trade'?: boolean;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Участник торгов
 */
'allow_trade_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Моя оценка подрядчика (NPS)
 */
'user_rating_nps_text'?: string;

/**
 * Моя оценка подрядчика (NPS)
 */
'user_rating_nps'?: number;

/**
 * Средняя скорость ответа
 */
'avg_answer_time': string;

/**
 * Отзывы по работе с подрядчиком (всего)
 */
'review_count'?: number;

/**
 * Отзывы по работе с подрядчиком (позитивные)
 */
'review_positive_count'?: number;

/**
 * Отзывы по работе с подрядчиком (негативные)
 */
'review_negative_count'?: number;

/**
 * Отзывы по работе с подрядчиком (нейтральные)
 */
'review_neutral_count'?: number;

/**
 * Всего выполнено перевозок
 */
'order_count'?: number;

/**
 * % успешных торгов
 */
'trade_percent'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Количество контактных лиц
 */
'contact_count'?: number;

/**
 * Контактные лица
 */
'contacts'?: Array<{

/**
 * ID
 */
'id': number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса
 */
'city_name'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;

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
 * Контактные лица
 */
'contact_name'?: string;

/**
 * Контактная информация
 */
'contact_info'?: string;

/**
 * Контактная информация для таблицы
 */
'contact_info_tbl'?: string;

/**
 * Специализация
 */
'specialization'?: Array<string>;

/**
 * Специализация
 */
'specialization_text'?: any;

/**
 * Загрузка грузов
 */
'container'?: Array<string>;

/**
 * Загрузка грузов
 */
'container_text'?: string;

/**
 * Время создания
 */
'time'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;

/**
 * Запрос на торги отправлен
 */
'bidding_send'?: boolean;
}>;
} => r.body)
    );
  }

  /** Path part for operation `contractorListParam()` */
  static readonly ContractorListParamPath = '/contractor_list_param';

  /**
   * Параметры вывода контрагентов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorListParam()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorListParam$Response(
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
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorListParamPath, 'get');
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
   * Параметры вывода контрагентов.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorListParam$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorListParam(
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
    return this.contractorListParam$Response(params, context).pipe(
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

  /** Path part for operation `contractorInfo()` */
  static readonly ContractorInfoPath = '/contractor_info';

  /**
   * Данные контрагента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorInfo$Response(
    params: {

    /**
     * ID контрагента
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
 * Наименование подрядчика
 */
'name'?: string;

/**
 * Идентификатор (ИНН, Rec № и пр.)
 */
'ind'?: string;

/**
 * Страна нахождения
 */
'country_name'?: string;

/**
 * Страна нахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город
 */
'city_name'?: string;

/**
 * Город (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Адрес
 */
'address'?: string;

/**
 * Общий телефон
 */
'phone'?: string;

/**
 * Сайт компании
 */
'web'?: string;

/**
 * Язык общения
 */
'language_name'?: string;

/**
 * Язык общения (ID берем из запроса - settings_get из поля language)
 */
'language_id'?: string;

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Вид подрядчика
 */
'type_name'?: string;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Тип контрагента
 */
'counterparty_name'?: string;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Членство в ассоциациях
 */
'association_name'?: Array<string>;

/**
 * Членство в ассоциациях (ID берем из запроса - system_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения
 */
'tax_name'?: string;

/**
 * Система налогообложения (ID берем из запроса - system_tax_system)
 */
'tax_id'?: number;

/**
 * Формат отправки запроса
 */
'request_format_name'?: string;

/**
 * Формат отправки запроса (ID берем из запроса - contractor_request_format)
 */
'request_format_id'?: string;

/**
 * Участник торгов
 */
'allow_trade'?: boolean;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Участник торгов
 */
'allow_trade_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Моя оценка подрядчика (NPS)
 */
'user_rating_nps_text'?: string;

/**
 * Моя оценка подрядчика (NPS)
 */
'user_rating_nps'?: number;

/**
 * Средняя скорость ответа
 */
'avg_answer_time': string;

/**
 * Отзывы по работе с подрядчиком (всего)
 */
'review_count'?: number;

/**
 * Отзывы по работе с подрядчиком (позитивные)
 */
'review_positive_count'?: number;

/**
 * Отзывы по работе с подрядчиком (негативные)
 */
'review_negative_count'?: number;

/**
 * Отзывы по работе с подрядчиком (нейтральные)
 */
'review_neutral_count'?: number;

/**
 * Всего выполнено перевозок
 */
'order_count'?: number;

/**
 * % успешных торгов
 */
'trade_percent'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Количество контактных лиц
 */
'contact_count'?: number;

/**
 * Контактные лица
 */
'contacts'?: Array<{

/**
 * ID
 */
'id': number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса
 */
'city_name'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;

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
 * Контактные лица
 */
'contact_name'?: string;

/**
 * Контактная информация
 */
'contact_info'?: string;

/**
 * Контактная информация для таблицы
 */
'contact_info_tbl'?: string;

/**
 * Специализация
 */
'specialization'?: Array<string>;

/**
 * Специализация
 */
'specialization_text'?: any;

/**
 * Загрузка грузов
 */
'container'?: Array<string>;

/**
 * Загрузка грузов
 */
'container_text'?: string;

/**
 * Время создания
 */
'time'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;

/**
 * Запрос на торги отправлен
 */
'bidding_send'?: boolean;
}>> {
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorInfoPath, 'get');
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
         * Наименование подрядчика
         */
        'name'?: string;
        
        /**
         * Идентификатор (ИНН, Rec № и пр.)
         */
        'ind'?: string;
        
        /**
         * Страна нахождения
         */
        'country_name'?: string;
        
        /**
         * Страна нахождения (ID берем из запроса - direction_country)
         */
        'country_id'?: number;
        
        /**
         * Город
         */
        'city_name'?: string;
        
        /**
         * Город (ID берем из запроса - direction_city)
         */
        'city_id'?: number;
        
        /**
         * Адрес
         */
        'address'?: string;
        
        /**
         * Общий телефон
         */
        'phone'?: string;
        
        /**
         * Сайт компании
         */
        'web'?: string;
        
        /**
         * Язык общения
         */
        'language_name'?: string;
        
        /**
         * Язык общения (ID берем из запроса - settings_get из поля language)
         */
        'language_id'?: string;
        
        /**
         * Агент транспортной компании
         */
        'carrier_name'?: string;
        
        /**
         * Агент транспортной компании (ID берем из запроса - transport_carrier)
         */
        'carrier_id'?: number;
        
        /**
         * Вид подрядчика
         */
        'type_name'?: string;
        
        /**
         * Вид подрядчика (ID берем из запроса - contractor_type)
         */
        'type_id'?: number;
        
        /**
         * Тип контрагента
         */
        'counterparty_name'?: string;
        
        /**
         * Тип контрагента (ID берем из запроса - system_counterparty)
         */
        'counterparty_id'?: number;
        
        /**
         * Членство в ассоциациях
         */
        'association_name'?: Array<string>;
        
        /**
         * Членство в ассоциациях (ID берем из запроса - system_association)
         */
        'association_id'?: Array<string>;
        
        /**
         * Система налогообложения
         */
        'tax_name'?: string;
        
        /**
         * Система налогообложения (ID берем из запроса - system_tax_system)
         */
        'tax_id'?: number;
        
        /**
         * Формат отправки запроса
         */
        'request_format_name'?: string;
        
        /**
         * Формат отправки запроса (ID берем из запроса - contractor_request_format)
         */
        'request_format_id'?: string;
        
        /**
         * Участник торгов
         */
        'allow_trade'?: boolean;
        
        /**
         * Валюта (ID берем из запроса - system_currency)
         */
        'currency'?: number;
        
        /**
         * Участник торгов
         */
        'allow_trade_text'?: string;
        
        /**
         * Рейтинг в системе (NPS)
         */
        'rating_nps_text'?: string;
        
        /**
         * Рейтинг в системе (NPS)
         */
        'rating_nps'?: number;
        
        /**
         * Моя оценка подрядчика (NPS)
         */
        'user_rating_nps_text'?: string;
        
        /**
         * Моя оценка подрядчика (NPS)
         */
        'user_rating_nps'?: number;
        
        /**
         * Средняя скорость ответа
         */
        'avg_answer_time': string;
        
        /**
         * Отзывы по работе с подрядчиком (всего)
         */
        'review_count'?: number;
        
        /**
         * Отзывы по работе с подрядчиком (позитивные)
         */
        'review_positive_count'?: number;
        
        /**
         * Отзывы по работе с подрядчиком (негативные)
         */
        'review_negative_count'?: number;
        
        /**
         * Отзывы по работе с подрядчиком (нейтральные)
         */
        'review_neutral_count'?: number;
        
        /**
         * Всего выполнено перевозок
         */
        'order_count'?: number;
        
        /**
         * % успешных торгов
         */
        'trade_percent'?: number;
        
        /**
         * Участие в торгах (общее количество)
         */
        'trade_count'?: number;
        
        /**
         * Количество выигранных торгов
         */
        'trade_success_count'?: number;
        
        /**
         * Количество проигранных торгов
         */
        'trade_fail_count'?: number;
        
        /**
         * Участие в торгах (результаты)
         */
        'trade_count_text'?: number;
        
        /**
         * Количество контактных лиц
         */
        'contact_count'?: number;
        
        /**
         * Контактные лица
         */
        'contacts'?: Array<{
        
        /**
         * ID
         */
        'id': number;
        
        /**
         * ФИО
         */
        'name'?: string;
        
        /**
         * Фамилия
         */
        'name_f'?: string;
        
        /**
         * Имя
         */
        'name_i'?: string;
        
        /**
         * Отчество
         */
        'name_o'?: string;
        
        /**
         * Должность
         */
        'position'?: string;
        
        /**
         * Местонахождение офиса
         */
        'city_name'?: string;
        
        /**
         * Местонахождение офиса (ID берем из запроса - direction_city)
         */
        'city_id'?: number;
        
        /**
         * Офисный телефон
         */
        'phone'?: string;
        
        /**
         * Мобильный телефон
         */
        'mobile_phone'?: string;
        
        /**
         * E-mail
         */
        'email'?: string;
        
        /**
         * Skype
         */
        'skype'?: string;
        
        /**
         * Telegram
         */
        'telegram'?: string;
        
        /**
         * Whatsapp
         */
        'whatsapp'?: string;
        
        /**
         * WeChat
         */
        'wechat'?: string;
        
        /**
         * Ответственный за направления
         */
        'direction'?: Array<{
        
        /**
         * Страна отправления
         */
        'direction_departure': number;
        
        /**
         * Страна прибытия
         */
        'direction_arrival': number;
        
        /**
         * Транспорт
         */
        'direction_items': Array<string>;
        }>;
        
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
         * Контактные лица
         */
        'contact_name'?: string;
        
        /**
         * Контактная информация
         */
        'contact_info'?: string;
        
        /**
         * Контактная информация для таблицы
         */
        'contact_info_tbl'?: string;
        
        /**
         * Специализация
         */
        'specialization'?: Array<string>;
        
        /**
         * Специализация
         */
        'specialization_text'?: any;
        
        /**
         * Загрузка грузов
         */
        'container'?: Array<string>;
        
        /**
         * Загрузка грузов
         */
        'container_text'?: string;
        
        /**
         * Время создания
         */
        'time'?: string;
        
        /**
         * Время изменения
         */
        'time_edit'?: string;
        
        /**
         * Запрос на торги отправлен
         */
        'bidding_send'?: boolean;
        }>;
      })
    );
  }

  /**
   * Данные контрагента.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorInfo(
    params: {

    /**
     * ID контрагента
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
 * Наименование подрядчика
 */
'name'?: string;

/**
 * Идентификатор (ИНН, Rec № и пр.)
 */
'ind'?: string;

/**
 * Страна нахождения
 */
'country_name'?: string;

/**
 * Страна нахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город
 */
'city_name'?: string;

/**
 * Город (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Адрес
 */
'address'?: string;

/**
 * Общий телефон
 */
'phone'?: string;

/**
 * Сайт компании
 */
'web'?: string;

/**
 * Язык общения
 */
'language_name'?: string;

/**
 * Язык общения (ID берем из запроса - settings_get из поля language)
 */
'language_id'?: string;

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Вид подрядчика
 */
'type_name'?: string;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Тип контрагента
 */
'counterparty_name'?: string;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Членство в ассоциациях
 */
'association_name'?: Array<string>;

/**
 * Членство в ассоциациях (ID берем из запроса - system_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения
 */
'tax_name'?: string;

/**
 * Система налогообложения (ID берем из запроса - system_tax_system)
 */
'tax_id'?: number;

/**
 * Формат отправки запроса
 */
'request_format_name'?: string;

/**
 * Формат отправки запроса (ID берем из запроса - contractor_request_format)
 */
'request_format_id'?: string;

/**
 * Участник торгов
 */
'allow_trade'?: boolean;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Участник торгов
 */
'allow_trade_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Моя оценка подрядчика (NPS)
 */
'user_rating_nps_text'?: string;

/**
 * Моя оценка подрядчика (NPS)
 */
'user_rating_nps'?: number;

/**
 * Средняя скорость ответа
 */
'avg_answer_time': string;

/**
 * Отзывы по работе с подрядчиком (всего)
 */
'review_count'?: number;

/**
 * Отзывы по работе с подрядчиком (позитивные)
 */
'review_positive_count'?: number;

/**
 * Отзывы по работе с подрядчиком (негативные)
 */
'review_negative_count'?: number;

/**
 * Отзывы по работе с подрядчиком (нейтральные)
 */
'review_neutral_count'?: number;

/**
 * Всего выполнено перевозок
 */
'order_count'?: number;

/**
 * % успешных торгов
 */
'trade_percent'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Количество контактных лиц
 */
'contact_count'?: number;

/**
 * Контактные лица
 */
'contacts'?: Array<{

/**
 * ID
 */
'id': number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса
 */
'city_name'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;

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
 * Контактные лица
 */
'contact_name'?: string;

/**
 * Контактная информация
 */
'contact_info'?: string;

/**
 * Контактная информация для таблицы
 */
'contact_info_tbl'?: string;

/**
 * Специализация
 */
'specialization'?: Array<string>;

/**
 * Специализация
 */
'specialization_text'?: any;

/**
 * Загрузка грузов
 */
'container'?: Array<string>;

/**
 * Загрузка грузов
 */
'container_text'?: string;

/**
 * Время создания
 */
'time'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;

/**
 * Запрос на торги отправлен
 */
'bidding_send'?: boolean;
}> {
    return this.contractorInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * Наименование подрядчика
 */
'name'?: string;

/**
 * Идентификатор (ИНН, Rec № и пр.)
 */
'ind'?: string;

/**
 * Страна нахождения
 */
'country_name'?: string;

/**
 * Страна нахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город
 */
'city_name'?: string;

/**
 * Город (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Адрес
 */
'address'?: string;

/**
 * Общий телефон
 */
'phone'?: string;

/**
 * Сайт компании
 */
'web'?: string;

/**
 * Язык общения
 */
'language_name'?: string;

/**
 * Язык общения (ID берем из запроса - settings_get из поля language)
 */
'language_id'?: string;

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Вид подрядчика
 */
'type_name'?: string;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Тип контрагента
 */
'counterparty_name'?: string;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Членство в ассоциациях
 */
'association_name'?: Array<string>;

/**
 * Членство в ассоциациях (ID берем из запроса - system_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения
 */
'tax_name'?: string;

/**
 * Система налогообложения (ID берем из запроса - system_tax_system)
 */
'tax_id'?: number;

/**
 * Формат отправки запроса
 */
'request_format_name'?: string;

/**
 * Формат отправки запроса (ID берем из запроса - contractor_request_format)
 */
'request_format_id'?: string;

/**
 * Участник торгов
 */
'allow_trade'?: boolean;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Участник торгов
 */
'allow_trade_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Моя оценка подрядчика (NPS)
 */
'user_rating_nps_text'?: string;

/**
 * Моя оценка подрядчика (NPS)
 */
'user_rating_nps'?: number;

/**
 * Средняя скорость ответа
 */
'avg_answer_time': string;

/**
 * Отзывы по работе с подрядчиком (всего)
 */
'review_count'?: number;

/**
 * Отзывы по работе с подрядчиком (позитивные)
 */
'review_positive_count'?: number;

/**
 * Отзывы по работе с подрядчиком (негативные)
 */
'review_negative_count'?: number;

/**
 * Отзывы по работе с подрядчиком (нейтральные)
 */
'review_neutral_count'?: number;

/**
 * Всего выполнено перевозок
 */
'order_count'?: number;

/**
 * % успешных торгов
 */
'trade_percent'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Количество контактных лиц
 */
'contact_count'?: number;

/**
 * Контактные лица
 */
'contacts'?: Array<{

/**
 * ID
 */
'id': number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса
 */
'city_name'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;

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
 * Контактные лица
 */
'contact_name'?: string;

/**
 * Контактная информация
 */
'contact_info'?: string;

/**
 * Контактная информация для таблицы
 */
'contact_info_tbl'?: string;

/**
 * Специализация
 */
'specialization'?: Array<string>;

/**
 * Специализация
 */
'specialization_text'?: any;

/**
 * Загрузка грузов
 */
'container'?: Array<string>;

/**
 * Загрузка грузов
 */
'container_text'?: string;

/**
 * Время создания
 */
'time'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;

/**
 * Запрос на торги отправлен
 */
'bidding_send'?: boolean;
}>): {

/**
 * ID
 */
'id': number;

/**
 * Наименование подрядчика
 */
'name'?: string;

/**
 * Идентификатор (ИНН, Rec № и пр.)
 */
'ind'?: string;

/**
 * Страна нахождения
 */
'country_name'?: string;

/**
 * Страна нахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город
 */
'city_name'?: string;

/**
 * Город (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Адрес
 */
'address'?: string;

/**
 * Общий телефон
 */
'phone'?: string;

/**
 * Сайт компании
 */
'web'?: string;

/**
 * Язык общения
 */
'language_name'?: string;

/**
 * Язык общения (ID берем из запроса - settings_get из поля language)
 */
'language_id'?: string;

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Вид подрядчика
 */
'type_name'?: string;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Тип контрагента
 */
'counterparty_name'?: string;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Членство в ассоциациях
 */
'association_name'?: Array<string>;

/**
 * Членство в ассоциациях (ID берем из запроса - system_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения
 */
'tax_name'?: string;

/**
 * Система налогообложения (ID берем из запроса - system_tax_system)
 */
'tax_id'?: number;

/**
 * Формат отправки запроса
 */
'request_format_name'?: string;

/**
 * Формат отправки запроса (ID берем из запроса - contractor_request_format)
 */
'request_format_id'?: string;

/**
 * Участник торгов
 */
'allow_trade'?: boolean;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Участник торгов
 */
'allow_trade_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Моя оценка подрядчика (NPS)
 */
'user_rating_nps_text'?: string;

/**
 * Моя оценка подрядчика (NPS)
 */
'user_rating_nps'?: number;

/**
 * Средняя скорость ответа
 */
'avg_answer_time': string;

/**
 * Отзывы по работе с подрядчиком (всего)
 */
'review_count'?: number;

/**
 * Отзывы по работе с подрядчиком (позитивные)
 */
'review_positive_count'?: number;

/**
 * Отзывы по работе с подрядчиком (негативные)
 */
'review_negative_count'?: number;

/**
 * Отзывы по работе с подрядчиком (нейтральные)
 */
'review_neutral_count'?: number;

/**
 * Всего выполнено перевозок
 */
'order_count'?: number;

/**
 * % успешных торгов
 */
'trade_percent'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Количество контактных лиц
 */
'contact_count'?: number;

/**
 * Контактные лица
 */
'contacts'?: Array<{

/**
 * ID
 */
'id': number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса
 */
'city_name'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;

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
 * Контактные лица
 */
'contact_name'?: string;

/**
 * Контактная информация
 */
'contact_info'?: string;

/**
 * Контактная информация для таблицы
 */
'contact_info_tbl'?: string;

/**
 * Специализация
 */
'specialization'?: Array<string>;

/**
 * Специализация
 */
'specialization_text'?: any;

/**
 * Загрузка грузов
 */
'container'?: Array<string>;

/**
 * Загрузка грузов
 */
'container_text'?: string;

/**
 * Время создания
 */
'time'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;

/**
 * Запрос на торги отправлен
 */
'bidding_send'?: boolean;
} => r.body)
    );
  }

  /** Path part for operation `contractorCreate()` */
  static readonly ContractorCreatePath = '/contractor_create';

  /**
   * Добавление контрагента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorCreate$Response(
    params?: {
      body?: {

/**
 * Наименование подрядчика
 */
'name': string;

/**
 * Идентификатор (ИНН, Rec № и пр.)
 */
'ind'?: string;

/**
 * Страна нахождения (ID берем из запроса - direction_country)
 */
'country_id': number;

/**
 * Город (ID берем из запроса - direction_city)
 */
'city_id': number;

/**
 * Адрес
 */
'address'?: string;

/**
 * Общий телефон
 */
'phone'?: string;

/**
 * Сайт компании
 */
'web'?: string;

/**
 * Язык общения (ID берем из запроса - settings_get из поля language)
 */
'language_id': string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id': number;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id': number;

/**
 * Членство в ассоциациях (ID берем из запроса - system_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения (ID берем из запроса - system_tax_system)
 */
'tax_id'?: number;

/**
 * Формат отправки запроса (ID берем из запроса - contractor_request_format)
 */
'request_format_id': string;

/**
 * Участник торгов
 */
'allow_trade'?: boolean;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency': number;

/**
 * Контактные лица
 */
'contacts'?: Array<{

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;
}>;
}
    },
    context?: HttpContext
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
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorCreatePath, 'post');
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
   * Добавление контрагента.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorCreate(
    params?: {
      body?: {

/**
 * Наименование подрядчика
 */
'name': string;

/**
 * Идентификатор (ИНН, Rec № и пр.)
 */
'ind'?: string;

/**
 * Страна нахождения (ID берем из запроса - direction_country)
 */
'country_id': number;

/**
 * Город (ID берем из запроса - direction_city)
 */
'city_id': number;

/**
 * Адрес
 */
'address'?: string;

/**
 * Общий телефон
 */
'phone'?: string;

/**
 * Сайт компании
 */
'web'?: string;

/**
 * Язык общения (ID берем из запроса - settings_get из поля language)
 */
'language_id': string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id': number;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id': number;

/**
 * Членство в ассоциациях (ID берем из запроса - system_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения (ID берем из запроса - system_tax_system)
 */
'tax_id'?: number;

/**
 * Формат отправки запроса (ID берем из запроса - contractor_request_format)
 */
'request_format_id': string;

/**
 * Участник торгов
 */
'allow_trade'?: boolean;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency': number;

/**
 * Контактные лица
 */
'contacts'?: Array<{

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;
}>;
}
    },
    context?: HttpContext
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
    return this.contractorCreate$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
}>): {

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
} => r.body)
    );
  }

  /** Path part for operation `contractorUpdate()` */
  static readonly ContractorUpdatePath = '/contractor_update';

  /**
   * Обновление контрагента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorUpdate$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * Наименование подрядчика
 */
'name'?: string;

/**
 * Идентификатор (ИНН, Rec № и пр.)
 */
'ind'?: string;

/**
 * Страна нахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Адрес
 */
'address'?: string;

/**
 * Общий телефон
 */
'phone'?: string;

/**
 * Сайт компании
 */
'web'?: string;

/**
 * Язык общения (ID берем из запроса - settings_get из поля language)
 */
'language_id'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Членство в ассоциациях (ID берем из запроса - system_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения (ID берем из запроса - system_tax_system)
 */
'tax_id'?: number;

/**
 * Формат отправки запроса (ID берем из запроса - contractor_request_format)
 */
'request_format_id'?: string;

/**
 * Участник торгов
 */
'allow_trade'?: boolean;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Контактные лица
 */
'contacts'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;
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
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorUpdatePath, 'post');
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
   * Обновление контрагента.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorUpdate(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * Наименование подрядчика
 */
'name'?: string;

/**
 * Идентификатор (ИНН, Rec № и пр.)
 */
'ind'?: string;

/**
 * Страна нахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Адрес
 */
'address'?: string;

/**
 * Общий телефон
 */
'phone'?: string;

/**
 * Сайт компании
 */
'web'?: string;

/**
 * Язык общения (ID берем из запроса - settings_get из поля language)
 */
'language_id'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Членство в ассоциациях (ID берем из запроса - system_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения (ID берем из запроса - system_tax_system)
 */
'tax_id'?: number;

/**
 * Формат отправки запроса (ID берем из запроса - contractor_request_format)
 */
'request_format_id'?: string;

/**
 * Участник торгов
 */
'allow_trade'?: boolean;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Контактные лица
 */
'contacts'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;
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
    return this.contractorUpdate$Response(params, context).pipe(
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

  /** Path part for operation `contractorDelete()` */
  static readonly ContractorDeletePath = '/contractor_delete';

  /**
   * Удаление контрагента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorDelete$Response(
    params?: {
      body?: {

/**
 * ID удаляемого контрагента
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
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorDeletePath, 'post');
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
   * Удаление контрагента.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorDelete(
    params?: {
      body?: {

/**
 * ID удаляемого контрагента
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
    return this.contractorDelete$Response(params, context).pipe(
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

  /** Path part for operation `contractorContactList()` */
  static readonly ContractorContactListPath = '/contractor_contact_list';

  /**
   * Список контактов контрагента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorContactList()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorContactList$Response(
    params: {

    /**
     * ID контрагента
     */
      id: number;

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
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса
 */
'city_name'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>>> {
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorContactListPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
      rb.query('start', params.start, {});
      rb.query('count', params.count, {});
      rb.query('sort', params.sort, {"style":"form","explode":false});
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
        'id': number;
        
        /**
         * ФИО
         */
        'name'?: string;
        
        /**
         * Фамилия
         */
        'name_f'?: string;
        
        /**
         * Имя
         */
        'name_i'?: string;
        
        /**
         * Отчество
         */
        'name_o'?: string;
        
        /**
         * Должность
         */
        'position'?: string;
        
        /**
         * Местонахождение офиса
         */
        'city_name'?: string;
        
        /**
         * Местонахождение офиса (ID берем из запроса - direction_city)
         */
        'city_id'?: number;
        
        /**
         * Офисный телефон
         */
        'phone'?: string;
        
        /**
         * Мобильный телефон
         */
        'mobile_phone'?: string;
        
        /**
         * E-mail
         */
        'email'?: string;
        
        /**
         * Skype
         */
        'skype'?: string;
        
        /**
         * Telegram
         */
        'telegram'?: string;
        
        /**
         * Whatsapp
         */
        'whatsapp'?: string;
        
        /**
         * WeChat
         */
        'wechat'?: string;
        
        /**
         * Ответственный за направления
         */
        'direction'?: Array<{
        
        /**
         * Страна отправления
         */
        'direction_departure': number;
        
        /**
         * Страна прибытия
         */
        'direction_arrival': number;
        
        /**
         * Транспорт
         */
        'direction_items': Array<string>;
        }>;
        
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
   * Список контактов контрагента.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorContactList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorContactList(
    params: {

    /**
     * ID контрагента
     */
      id: number;

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
    },
    context?: HttpContext
  ): Observable<Array<{

/**
 * ID
 */
'id': number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса
 */
'city_name'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>> {
    return this.contractorContactList$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса
 */
'city_name'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>>): Array<{

/**
 * ID
 */
'id': number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса
 */
'city_name'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}> => r.body)
    );
  }

  /** Path part for operation `contractorContactInfo()` */
  static readonly ContractorContactInfoPath = '/contractor_contact_info';

  /**
   * Данные контакта контрагента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorContactInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorContactInfo$Response(
    params: {

    /**
     * ID контакта
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
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса
 */
'city_name'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorContactInfoPath, 'get');
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
         * ФИО
         */
        'name'?: string;
        
        /**
         * Фамилия
         */
        'name_f'?: string;
        
        /**
         * Имя
         */
        'name_i'?: string;
        
        /**
         * Отчество
         */
        'name_o'?: string;
        
        /**
         * Должность
         */
        'position'?: string;
        
        /**
         * Местонахождение офиса
         */
        'city_name'?: string;
        
        /**
         * Местонахождение офиса (ID берем из запроса - direction_city)
         */
        'city_id'?: number;
        
        /**
         * Офисный телефон
         */
        'phone'?: string;
        
        /**
         * Мобильный телефон
         */
        'mobile_phone'?: string;
        
        /**
         * E-mail
         */
        'email'?: string;
        
        /**
         * Skype
         */
        'skype'?: string;
        
        /**
         * Telegram
         */
        'telegram'?: string;
        
        /**
         * Whatsapp
         */
        'whatsapp'?: string;
        
        /**
         * WeChat
         */
        'wechat'?: string;
        
        /**
         * Ответственный за направления
         */
        'direction'?: Array<{
        
        /**
         * Страна отправления
         */
        'direction_departure': number;
        
        /**
         * Страна прибытия
         */
        'direction_arrival': number;
        
        /**
         * Транспорт
         */
        'direction_items': Array<string>;
        }>;
        
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
   * Данные контакта контрагента.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorContactInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorContactInfo(
    params: {

    /**
     * ID контакта
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
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса
 */
'city_name'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}> {
    return this.contractorContactInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса
 */
'city_name'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>): {

/**
 * ID
 */
'id': number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса
 */
'city_name'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
} => r.body)
    );
  }

  /** Path part for operation `contractorContactCreate()` */
  static readonly ContractorContactCreatePath = '/contractor_contact_create';

  /**
   * Добавление контакта контрагента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorContactCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorContactCreate$Response(
    params?: {
      body?: {

/**
 * ID подрядчика
 */
'contractor_id': number;

/**
 * ФИО
 */
'name': string;

/**
 * Фамилия
 */
'name_f': string;

/**
 * Имя
 */
'name_i': string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone': string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email': string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;
}
    },
    context?: HttpContext
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
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorContactCreatePath, 'post');
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
   * Добавление контакта контрагента.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorContactCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorContactCreate(
    params?: {
      body?: {

/**
 * ID подрядчика
 */
'contractor_id': number;

/**
 * ФИО
 */
'name': string;

/**
 * Фамилия
 */
'name_f': string;

/**
 * Имя
 */
'name_i': string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone': string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email': string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
}>;
}
    },
    context?: HttpContext
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
    return this.contractorContactCreate$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
}>): {

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
} => r.body)
    );
  }

  /** Path part for operation `contractorContactUpdate()` */
  static readonly ContractorContactUpdatePath = '/contractor_contact_update';

  /**
   * Обновление контакта контрагента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorContactUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorContactUpdate$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * ID подрядчика
 */
'contractor_id'?: number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
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
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorContactUpdatePath, 'post');
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
   * Обновление контакта контрагента.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorContactUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorContactUpdate(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * ID подрядчика
 */
'contractor_id'?: number;

/**
 * ФИО
 */
'name'?: string;

/**
 * Фамилия
 */
'name_f'?: string;

/**
 * Имя
 */
'name_i'?: string;

/**
 * Отчество
 */
'name_o'?: string;

/**
 * Должность
 */
'position'?: string;

/**
 * Местонахождение офиса (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Офисный телефон
 */
'phone'?: string;

/**
 * Мобильный телефон
 */
'mobile_phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Telegram
 */
'telegram'?: string;

/**
 * Whatsapp
 */
'whatsapp'?: string;

/**
 * WeChat
 */
'wechat'?: string;

/**
 * Ответственный за направления
 */
'direction'?: Array<{

/**
 * Страна отправления
 */
'direction_departure': number;

/**
 * Страна прибытия
 */
'direction_arrival': number;

/**
 * Транспорт
 */
'direction_items': Array<string>;
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
    return this.contractorContactUpdate$Response(params, context).pipe(
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

  /** Path part for operation `contractorContactDelete()` */
  static readonly ContractorContactDeletePath = '/contractor_contact_delete';

  /**
   * Удаление контакта контрагента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorContactDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorContactDelete$Response(
    params?: {
      body?: {

/**
 * ID удаляемого контакта
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
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorContactDeletePath, 'post');
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
   * Удаление контакта контрагента.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorContactDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorContactDelete(
    params?: {
      body?: {

/**
 * ID удаляемого контакта
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
    return this.contractorContactDelete$Response(params, context).pipe(
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

  /** Path part for operation `contractorRequestFormat()` */
  static readonly ContractorRequestFormatPath = '/contractor_request_format';

  /**
   * Форматы отправки запроса.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorRequestFormat()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorRequestFormat$Response(
    params?: {
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
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorRequestFormatPath, 'get');
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
   * Форматы отправки запроса.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorRequestFormat$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorRequestFormat(
    params?: {
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
    return this.contractorRequestFormat$Response(params, context).pipe(
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

  /** Path part for operation `contractorType()` */
  static readonly ContractorTypePath = '/contractor_type';

  /**
   * Вид подрядчика.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorType()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorType$Response(
    params?: {
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

/**
 * Контакты обязательны
 */
'contact_required'?: boolean;
}>>> {
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorTypePath, 'get');
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
        'id'?: number;
        
        /**
         * Наименование
         */
        'name'?: string;
        
        /**
         * Контакты обязательны
         */
        'contact_required'?: boolean;
        }>>;
      })
    );
  }

  /**
   * Вид подрядчика.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorType(
    params?: {
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

/**
 * Контакты обязательны
 */
'contact_required'?: boolean;
}>> {
    return this.contractorType$Response(params, context).pipe(
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
 * Контакты обязательны
 */
'contact_required'?: boolean;
}>>): Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Контакты обязательны
 */
'contact_required'?: boolean;
}> => r.body)
    );
  }

  /** Path part for operation `contractorExport()` */
  static readonly ContractorExportPath = '/contractor_export';

  /**
   * Экспорт контрагентов в XLSX.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorExport()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorExport$Response(
    params?: {

    /**
     * Фильтр
     */
      filter?: {
};

    /**
     * Сортировка
     */
      sort?: Array<{

/**
 * Поле сортировки
 */
'field'?: 'id' | 'name' | 'rating_nps_text' | 'trade_rating' | 'allow_trade' | 'avg_answer_time';

/**
 * Направление сортировки
 */
'dir'?: 'asc' | 'desc';
}>;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Наименование
 */
'name'?: string;

/**
 * Base64 строка файла
 */
'data'?: string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorExportPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('sort', params.sort, {"style":"form","explode":false});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Наименование
         */
        'name'?: string;
        
        /**
         * Base64 строка файла
         */
        'data'?: string;
        }>;
      })
    );
  }

  /**
   * Экспорт контрагентов в XLSX.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorExport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorExport(
    params?: {

    /**
     * Фильтр
     */
      filter?: {
};

    /**
     * Сортировка
     */
      sort?: Array<{

/**
 * Поле сортировки
 */
'field'?: 'id' | 'name' | 'rating_nps_text' | 'trade_rating' | 'allow_trade' | 'avg_answer_time';

/**
 * Направление сортировки
 */
'dir'?: 'asc' | 'desc';
}>;
    },
    context?: HttpContext
  ): Observable<{

/**
 * Наименование
 */
'name'?: string;

/**
 * Base64 строка файла
 */
'data'?: string;
}> {
    return this.contractorExport$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Наименование
 */
'name'?: string;

/**
 * Base64 строка файла
 */
'data'?: string;
}>): {

/**
 * Наименование
 */
'name'?: string;

/**
 * Base64 строка файла
 */
'data'?: string;
} => r.body)
    );
  }

  /** Path part for operation `contractorImportTemplate()` */
  static readonly ContractorImportTemplatePath = '/contractor_import_template';

  /**
   * Шаблон экспорта контрагентов в XLSX.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorImportTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorImportTemplate$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Наименование
 */
'name'?: string;

/**
 * Base64 строка файла
 */
'data'?: string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorImportTemplatePath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Наименование
         */
        'name'?: string;
        
        /**
         * Base64 строка файла
         */
        'data'?: string;
        }>;
      })
    );
  }

  /**
   * Шаблон экспорта контрагентов в XLSX.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorImportTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorImportTemplate(
    params?: {
    },
    context?: HttpContext
  ): Observable<{

/**
 * Наименование
 */
'name'?: string;

/**
 * Base64 строка файла
 */
'data'?: string;
}> {
    return this.contractorImportTemplate$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Наименование
 */
'name'?: string;

/**
 * Base64 строка файла
 */
'data'?: string;
}>): {

/**
 * Наименование
 */
'name'?: string;

/**
 * Base64 строка файла
 */
'data'?: string;
} => r.body)
    );
  }

  /** Path part for operation `contractorImport()` */
  static readonly ContractorImportPath = '/contractor_import';

  /**
   * Импорт контрагентов в XLSX.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorImport()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorImport$Response(
    params?: {
      body?: {

/**
 * Наименование
 */
'name': string;

/**
 * Base64 строка файла
 */
'data': string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Код обновления
 */
'import_key'?: string;

/**
 * Результат обновления
 */
'result'?: {
};
}>> {
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorImportPath, 'post');
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
         * Код обновления
         */
        'import_key'?: string;
        
        /**
         * Результат обновления
         */
        'result'?: {
        };
        }>;
      })
    );
  }

  /**
   * Импорт контрагентов в XLSX.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorImport$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorImport(
    params?: {
      body?: {

/**
 * Наименование
 */
'name': string;

/**
 * Base64 строка файла
 */
'data': string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Код обновления
 */
'import_key'?: string;

/**
 * Результат обновления
 */
'result'?: {
};
}> {
    return this.contractorImport$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Код обновления
 */
'import_key'?: string;

/**
 * Результат обновления
 */
'result'?: {
};
}>): {

/**
 * Код обновления
 */
'import_key'?: string;

/**
 * Результат обновления
 */
'result'?: {
};
} => r.body)
    );
  }

  /** Path part for operation `contractorImportConfirm()` */
  static readonly ContractorImportConfirmPath = '/contractor_import_confirm';

  /**
   * Подтверждение импорта контрагентов в XLSX.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorImportConfirm()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorImportConfirm$Response(
    params?: {

    /**
     * Код обновления
     */
      import_key?: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorImportConfirmPath, 'get');
    if (params) {
      rb.query('import_key', params.import_key, {});
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
   * Подтверждение импорта контрагентов в XLSX.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorImportConfirm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorImportConfirm(
    params?: {

    /**
     * Код обновления
     */
      import_key?: string;
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.contractorImportConfirm$Response(params, context).pipe(
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

  /** Path part for operation `contractorImportResult()` */
  static readonly ContractorImportResultPath = '/contractor_import_result';

  /**
   * Получение файла с результатами обработки импорта в XLSX.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorImportResult()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorImportResult$Response(
    params?: {

    /**
     * Код обновления
     */
      import_key?: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Наименование
 */
'name'?: string;

/**
 * Base64 строка файла
 */
'data'?: string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorImportResultPath, 'get');
    if (params) {
      rb.query('import_key', params.import_key, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Наименование
         */
        'name'?: string;
        
        /**
         * Base64 строка файла
         */
        'data'?: string;
        }>;
      })
    );
  }

  /**
   * Получение файла с результатами обработки импорта в XLSX.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `contractorImportResult$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorImportResult(
    params?: {

    /**
     * Код обновления
     */
      import_key?: string;
    },
    context?: HttpContext
  ): Observable<{

/**
 * Наименование
 */
'name'?: string;

/**
 * Base64 строка файла
 */
'data'?: string;
}> {
    return this.contractorImportResult$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Наименование
 */
'name'?: string;

/**
 * Base64 строка файла
 */
'data'?: string;
}>): {

/**
 * Наименование
 */
'name'?: string;

/**
 * Base64 строка файла
 */
'data'?: string;
} => r.body)
    );
  }

}
