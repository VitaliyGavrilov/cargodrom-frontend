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
 * Работа с контрагентами
 */
@Injectable({
  providedIn: 'root',
})
export class ContractorService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation contractorRequestFormat
   */
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
  contractorRequestFormat$Response(params?: {
  }): Observable<StrictHttpResponse<Array<{

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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `contractorRequestFormat$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorRequestFormat(params?: {
  }): Observable<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>> {

    return this.contractorRequestFormat$Response(params).pipe(
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
   * Path part for operation contractorType
   */
  static readonly ContractorTypePath = '/contractor_type';

  /**
   * Виды подрядчиков.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorType()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorType$Response(params?: {
  }): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorTypePath, 'get');
    if (params) {
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
   * Виды подрядчиков.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `contractorType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorType(params?: {
  }): Observable<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>> {

    return this.contractorType$Response(params).pipe(
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
   * Path part for operation contractorAssociation
   */
  static readonly ContractorAssociationPath = '/contractor_association';

  /**
   * Ассоциации подрядчиков.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `contractorAssociation()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorAssociation$Response(params?: {
  }): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorAssociationPath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `contractorAssociation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorAssociation(params?: {
  }): Observable<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;
}>> {

    return this.contractorAssociation$Response(params).pipe(
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
   * Path part for operation contractorList
   */
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
  contractorList$Response(params?: {

    /**
     * Специализация (ID берем из запроса - transport_kind)
     */
    specialization?: Array<string>;

    /**
     * Минимальный рейтинг
     */
    rating?: number;

    /**
     * Доступ к торгам
     */
    allow_trade?: boolean;

    /**
     * Направление откуда (ID берем из запроса - direction_country)
     */
    country_departure?: number;

    /**
     * Направление куда (ID берем из запроса - direction_country)
     */
    country_arrival?: number;

    /**
     * Начальная позиция
     */
    start?: number;

    /**
     * Лимит позиций на страницу
     */
    count?: number;
  }): Observable<StrictHttpResponse<{

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
 * Вид подрядчика
 */
'type_name'?: string;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Членство в ассоциациях
 */
'association_name'?: string;

/**
 * Членство в ассоциациях (ID берем из запроса - contractor_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения
 */
'tax_name'?: string;

/**
 * Система налогообложения (ID берем из запроса - settings_get из поля tax)
 */
'tax_id'?: number;

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
 * ФИО
 */
'name'?: string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};

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
 * Контактнря информация
 */
'contact_info'?: string;

/**
 * Время создания
 */
'time'?: string;

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

    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorListPath, 'get');
    if (params) {
      rb.query('specialization', params.specialization, {"style":"form","explode":false});
      rb.query('rating', params.rating, {});
      rb.query('allow_trade', params.allow_trade, {});
      rb.query('country_departure', params.country_departure, {});
      rb.query('country_arrival', params.country_arrival, {});
      rb.query('start', params.start, {});
      rb.query('count', params.count, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
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
         * Вид подрядчика
         */
        'type_name'?: string;
        
        /**
         * Вид подрядчика (ID берем из запроса - contractor_type)
         */
        'type_id'?: number;
        
        /**
         * Членство в ассоциациях
         */
        'association_name'?: string;
        
        /**
         * Членство в ассоциациях (ID берем из запроса - contractor_association)
         */
        'association_id'?: Array<string>;
        
        /**
         * Система налогообложения
         */
        'tax_name'?: string;
        
        /**
         * Система налогообложения (ID берем из запроса - settings_get из поля tax)
         */
        'tax_id'?: number;
        
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
         * ФИО
         */
        'name'?: string;
        
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
         * Ответственный за направления (ID берем из запроса - direction_type)
         */
        'responsible_direction'?: Array<number>;
        
        /**
         * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
         */
        'responsible_param'?: {
        };
        
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
         * Контактнря информация
         */
        'contact_info'?: string;
        
        /**
         * Время создания
         */
        'time'?: string;
        
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
   * Список контрагентов.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `contractorList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorList(params?: {

    /**
     * Специализация (ID берем из запроса - transport_kind)
     */
    specialization?: Array<string>;

    /**
     * Минимальный рейтинг
     */
    rating?: number;

    /**
     * Доступ к торгам
     */
    allow_trade?: boolean;

    /**
     * Направление откуда (ID берем из запроса - direction_country)
     */
    country_departure?: number;

    /**
     * Направление куда (ID берем из запроса - direction_country)
     */
    country_arrival?: number;

    /**
     * Начальная позиция
     */
    start?: number;

    /**
     * Лимит позиций на страницу
     */
    count?: number;
  }): Observable<{

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
 * Вид подрядчика
 */
'type_name'?: string;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Членство в ассоциациях
 */
'association_name'?: string;

/**
 * Членство в ассоциациях (ID берем из запроса - contractor_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения
 */
'tax_name'?: string;

/**
 * Система налогообложения (ID берем из запроса - settings_get из поля tax)
 */
'tax_id'?: number;

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
 * ФИО
 */
'name'?: string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};

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
 * Контактнря информация
 */
'contact_info'?: string;

/**
 * Время создания
 */
'time'?: string;

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

    return this.contractorList$Response(params).pipe(
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
 * Вид подрядчика
 */
'type_name'?: string;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Членство в ассоциациях
 */
'association_name'?: string;

/**
 * Членство в ассоциациях (ID берем из запроса - contractor_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения
 */
'tax_name'?: string;

/**
 * Система налогообложения (ID берем из запроса - settings_get из поля tax)
 */
'tax_id'?: number;

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
 * ФИО
 */
'name'?: string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};

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
 * Контактнря информация
 */
'contact_info'?: string;

/**
 * Время создания
 */
'time'?: string;

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
 * Вид подрядчика
 */
'type_name'?: string;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Членство в ассоциациях
 */
'association_name'?: string;

/**
 * Членство в ассоциациях (ID берем из запроса - contractor_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения
 */
'tax_name'?: string;

/**
 * Система налогообложения (ID берем из запроса - settings_get из поля tax)
 */
'tax_id'?: number;

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
 * ФИО
 */
'name'?: string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};

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
 * Контактнря информация
 */
'contact_info'?: string;

/**
 * Время создания
 */
'time'?: string;

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
   * Path part for operation contractorInfo
   */
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
  contractorInfo$Response(params: {

    /**
     * ID контрагента
     */
    id: number;
  }): Observable<StrictHttpResponse<{

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
 * Вид подрядчика
 */
'type_name'?: string;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Членство в ассоциациях
 */
'association_name'?: string;

/**
 * Членство в ассоциациях (ID берем из запроса - contractor_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения
 */
'tax_name'?: string;

/**
 * Система налогообложения (ID берем из запроса - settings_get из поля tax)
 */
'tax_id'?: number;

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
 * ФИО
 */
'name'?: string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};

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
 * Контактнря информация
 */
'contact_info'?: string;

/**
 * Время создания
 */
'time'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorInfoPath, 'get');
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
         * Вид подрядчика
         */
        'type_name'?: string;
        
        /**
         * Вид подрядчика (ID берем из запроса - contractor_type)
         */
        'type_id'?: number;
        
        /**
         * Членство в ассоциациях
         */
        'association_name'?: string;
        
        /**
         * Членство в ассоциациях (ID берем из запроса - contractor_association)
         */
        'association_id'?: Array<string>;
        
        /**
         * Система налогообложения
         */
        'tax_name'?: string;
        
        /**
         * Система налогообложения (ID берем из запроса - settings_get из поля tax)
         */
        'tax_id'?: number;
        
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
         * ФИО
         */
        'name'?: string;
        
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
         * Ответственный за направления (ID берем из запроса - direction_type)
         */
        'responsible_direction'?: Array<number>;
        
        /**
         * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
         */
        'responsible_param'?: {
        };
        
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
         * Контактнря информация
         */
        'contact_info'?: string;
        
        /**
         * Время создания
         */
        'time'?: string;
        
        /**
         * Время изменения
         */
        'time_edit'?: string;
        }>;
      })
    );
  }

  /**
   * Данные контрагента.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `contractorInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorInfo(params: {

    /**
     * ID контрагента
     */
    id: number;
  }): Observable<{

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
 * Вид подрядчика
 */
'type_name'?: string;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Членство в ассоциациях
 */
'association_name'?: string;

/**
 * Членство в ассоциациях (ID берем из запроса - contractor_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения
 */
'tax_name'?: string;

/**
 * Система налогообложения (ID берем из запроса - settings_get из поля tax)
 */
'tax_id'?: number;

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
 * ФИО
 */
'name'?: string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};

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
 * Контактнря информация
 */
'contact_info'?: string;

/**
 * Время создания
 */
'time'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}> {

    return this.contractorInfo$Response(params).pipe(
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
 * Вид подрядчика
 */
'type_name'?: string;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Членство в ассоциациях
 */
'association_name'?: string;

/**
 * Членство в ассоциациях (ID берем из запроса - contractor_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения
 */
'tax_name'?: string;

/**
 * Система налогообложения (ID берем из запроса - settings_get из поля tax)
 */
'tax_id'?: number;

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
 * ФИО
 */
'name'?: string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};

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
 * Контактнря информация
 */
'contact_info'?: string;

/**
 * Время создания
 */
'time'?: string;

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
 * Вид подрядчика
 */
'type_name'?: string;

/**
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Членство в ассоциациях
 */
'association_name'?: string;

/**
 * Членство в ассоциациях (ID берем из запроса - contractor_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения
 */
'tax_name'?: string;

/**
 * Система налогообложения (ID берем из запроса - settings_get из поля tax)
 */
'tax_id'?: number;

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
 * ФИО
 */
'name'?: string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};

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
 * Контактнря информация
 */
'contact_info'?: string;

/**
 * Время создания
 */
'time'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
})
    );
  }

  /**
   * Path part for operation contractorCreate
   */
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
  contractorCreate$Response(params?: {
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
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id': number;

/**
 * Членство в ассоциациях (ID берем из запроса - contractor_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения (ID берем из запроса - settings_get из поля tax)
 */
'tax_id': number;

/**
 * Формат отправки запроса (ID берем из запроса - contractor_request_format)
 */
'request_format_id': string;

/**
 * Исключить Подрядчика из торгов
 */
'exclude_from_trade'?: boolean;

/**
 * Контактные лица
 */
'contacts'?: Array<{

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};
}>;
}
  }): Observable<StrictHttpResponse<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorCreatePath, 'post');
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
        'result': string;
        }>;
      })
    );
  }

  /**
   * Добавление контрагента.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `contractorCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorCreate(params?: {
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
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id': number;

/**
 * Членство в ассоциациях (ID берем из запроса - contractor_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения (ID берем из запроса - settings_get из поля tax)
 */
'tax_id': number;

/**
 * Формат отправки запроса (ID берем из запроса - contractor_request_format)
 */
'request_format_id': string;

/**
 * Исключить Подрядчика из торгов
 */
'exclude_from_trade'?: boolean;

/**
 * Контактные лица
 */
'contacts'?: Array<{

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};
}>;
}
  }): Observable<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': string;
}> {

    return this.contractorCreate$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': string;
}>) => r.body as {

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': string;
})
    );
  }

  /**
   * Path part for operation contractorUpdate
   */
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
  contractorUpdate$Response(params?: {
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
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Членство в ассоциациях (ID берем из запроса - contractor_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения (ID берем из запроса - settings_get из поля tax)
 */
'tax_id'?: number;

/**
 * Формат отправки запроса (ID берем из запроса - contractor_request_format)
 */
'request_format_id'?: string;

/**
 * Исключить Подрядчика из торгов
 */
'exclude_from_trade'?: boolean;

/**
 * Контактные лица
 */
'contacts'?: Array<{

/**
 * ID
 */
'id'?: number;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};
}>;
}
  }): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorUpdatePath, 'post');
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
        'result': string;
        }>;
      })
    );
  }

  /**
   * Обновление контрагента.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `contractorUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorUpdate(params?: {
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
 * Вид подрядчика (ID берем из запроса - contractor_type)
 */
'type_id'?: number;

/**
 * Членство в ассоциациях (ID берем из запроса - contractor_association)
 */
'association_id'?: Array<string>;

/**
 * Система налогообложения (ID берем из запроса - settings_get из поля tax)
 */
'tax_id'?: number;

/**
 * Формат отправки запроса (ID берем из запроса - contractor_request_format)
 */
'request_format_id'?: string;

/**
 * Исключить Подрядчика из торгов
 */
'exclude_from_trade'?: boolean;

/**
 * Контактные лица
 */
'contacts'?: Array<{

/**
 * ID
 */
'id'?: number;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};
}>;
}
  }): Observable<{

/**
 * Статус выполнения
 */
'result': string;
}> {

    return this.contractorUpdate$Response(params).pipe(
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

  /**
   * Path part for operation contractorDelete
   */
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
  contractorDelete$Response(params?: {
    body?: {

/**
 * ID удаляемого контрагента
 */
'id': number;
}
  }): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorDeletePath, 'post');
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
        'result': string;
        }>;
      })
    );
  }

  /**
   * Удаление контрагента.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `contractorDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorDelete(params?: {
    body?: {

/**
 * ID удаляемого контрагента
 */
'id': number;
}
  }): Observable<{

/**
 * Статус выполнения
 */
'result': string;
}> {

    return this.contractorDelete$Response(params).pipe(
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

  /**
   * Path part for operation contractorContactList
   */
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
  contractorContactList$Response(params: {

    /**
     * ID контрагента
     */
    id: number;
  }): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

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
 * ФИО
 */
'name'?: string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};

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
         * ФИО
         */
        'name'?: string;
        
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
         * Ответственный за направления (ID берем из запроса - direction_type)
         */
        'responsible_direction'?: Array<number>;
        
        /**
         * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
         */
        'responsible_param'?: {
        };
        
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `contractorContactList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorContactList(params: {

    /**
     * ID контрагента
     */
    id: number;
  }): Observable<Array<{

/**
 * ID
 */
'id': number;

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
 * ФИО
 */
'name'?: string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>> {

    return this.contractorContactList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

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
 * ФИО
 */
'name'?: string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};

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
 * ФИО
 */
'name'?: string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};

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
   * Path part for operation contractorContactInfo
   */
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
  contractorContactInfo$Response(params: {

    /**
     * ID контакта
     */
    id: number;
  }): Observable<StrictHttpResponse<{

/**
 * ID
 */
'id': number;

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
 * ФИО
 */
'name'?: string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};

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
         * ФИО
         */
        'name'?: string;
        
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
         * Ответственный за направления (ID берем из запроса - direction_type)
         */
        'responsible_direction'?: Array<number>;
        
        /**
         * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
         */
        'responsible_param'?: {
        };
        
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `contractorContactInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  contractorContactInfo(params: {

    /**
     * ID контакта
     */
    id: number;
  }): Observable<{

/**
 * ID
 */
'id': number;

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
 * ФИО
 */
'name'?: string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}> {

    return this.contractorContactInfo$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID
 */
'id': number;

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
 * ФИО
 */
'name'?: string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};

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
 * ФИО
 */
'name'?: string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};

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
   * Path part for operation contractorContactCreate
   */
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
  contractorContactCreate$Response(params?: {
    body?: {

/**
 * ID подрядчика
 */
'contractor_id': number;

/**
 * Фамилия
 */
'name_f': string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};
}
  }): Observable<StrictHttpResponse<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorContactCreatePath, 'post');
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
        'result': string;
        }>;
      })
    );
  }

  /**
   * Добавление контакта контрагента.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `contractorContactCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorContactCreate(params?: {
    body?: {

/**
 * ID подрядчика
 */
'contractor_id': number;

/**
 * Фамилия
 */
'name_f': string;

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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};
}
  }): Observable<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': string;
}> {

    return this.contractorContactCreate$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': string;
}>) => r.body as {

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': string;
})
    );
  }

  /**
   * Path part for operation contractorContactUpdate
   */
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
  contractorContactUpdate$Response(params?: {
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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};
}
  }): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorContactUpdatePath, 'post');
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
        'result': string;
        }>;
      })
    );
  }

  /**
   * Обновление контакта контрагента.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `contractorContactUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorContactUpdate(params?: {
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
 * Ответственный за направления (ID берем из запроса - direction_type)
 */
'responsible_direction'?: Array<number>;

/**
 * Ответственный за направления (distination_country_id: {departure_country_id: [array of transport_sub_kind]}, ...)
 */
'responsible_param'?: {
};
}
  }): Observable<{

/**
 * Статус выполнения
 */
'result': string;
}> {

    return this.contractorContactUpdate$Response(params).pipe(
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

  /**
   * Path part for operation contractorContactDelete
   */
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
  contractorContactDelete$Response(params?: {
    body?: {

/**
 * ID удаляемого контакта
 */
'id': number;
}
  }): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContractorService.ContractorContactDeletePath, 'post');
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
        'result': string;
        }>;
      })
    );
  }

  /**
   * Удаление контакта контрагента.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `contractorContactDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  contractorContactDelete(params?: {
    body?: {

/**
 * ID удаляемого контакта
 */
'id': number;
}
  }): Observable<{

/**
 * Статус выполнения
 */
'result': string;
}> {

    return this.contractorContactDelete$Response(params).pipe(
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
