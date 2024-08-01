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
 * Запросы
 */
@Injectable({ providedIn: 'root' })
export class RequestService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `requestList()` */
  static readonly RequestListPath = '/request_list';

  /**
   * Список запросов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestList()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestList$Response(
    params?: {

    /**
     * Поиск запроса по номеру...
     */
      id?: string;

    /**
     * Период (day, week, month, dd.mm.YYYY-dd.mm.YYYY)
     */
      time_add?: any;

    /**
     * Статус запроса (ID берем из запроса - request_status)
     */
      status_id?: Array<string>;

    /**
     * Вид запроса (ID берем из запроса - request_type)
     */
      request_type_id?: number;

    /**
     * Статус CRM (ID берем из запроса - request_status_crm)
     */
      status_crm_id?: Array<string>;

    /**
     * Страна отправления (ID берем из запроса - direction_country)
     */
      departure_country_id?: number;

    /**
     * Страна назначения (ID берем из запроса - direction_country)
     */
      arrival_country_id?: number;

    /**
     * Клиент (ID берем из запроса - customer_list)
     */
      customer_id?: number;

    /**
     * Подрядчик (ID берем из запроса - contractor_list)
     */
      rate_contractor_id?: number;

    /**
     * Город отправления (ID берем из запроса - direction_city)
     */
      departure_city_id?: number;

    /**
     * Город назначения (ID берем из запроса - direction_city)
     */
      arrival_city_id?: number;

    /**
     * Сотрудник (ID берем из запроса - company_employee_list)
     */
      manager_executor_id?: number;

    /**
     * Вид перевозки (ID берем из запроса - transport_kind)
     */
      transport_kind_id?: number;

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
'field'?: 'id' | 'time_add';

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
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Контрагент
 */
'customer_name'?: string;

/**
 * Телефон контрагента
 */
'customer_phone'?: string;

/**
 * Email контрагента
 */
'customer_email'?: string;

/**
 * Email контрагента
 */
'customer_text'?: string;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: number;

/**
 * Вид перевозки
 */
'transport_kind_name'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

/**
 * Тип транспорта
 */
'transport_type_name'?: number;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Температурный режим
 */
'cargo_temperature'?: {

/**
 * Температурный режим - признак
 */
'cargo_temperature_control'?: boolean;

/**
 * Температурный режим - минимальная температура
 */
'cargo_temperature_min'?: number;

/**
 * Температурный режим - максимальная температура
 */
'cargo_temperature_max'?: number;
};

/**
 * Наличие батареек, элементов питания или жидкостей
 */
'cargo_danger'?: boolean;

/**
 * Грузовые места
 */
'cargo_places'?: Array<{

/**
 * Номер места
 */
'num'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'stacking'?: boolean;

/**
 * Длина, см
 */
'length'?: number;

/**
 * Ширина, см
 */
'width'?: number;

/**
 * Высота, см
 */
'height'?: number;

/**
 * Вес, кг
 */
'weight'?: number;

/**
 * Количество
 */
'count'?: number;
}>;

/**
 * Раздельные места
 */
'cargo_separately'?: boolean;

/**
 * Итого мест
 */
'cargo_places_count'?: number;

/**
 * Итого вес
 */
'cargo_places_weight'?: number;

/**
 * Итого объем
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес
 */
'cargo_places_paid_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Стоимость груза
 */
'cargo_cost'?: number;

/**
 * Валюта стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Груз
 */
'cargo_text'?: string;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'cargo_places_stacking'?: boolean;

/**
 * Документы по грузу
 */
'cargo_file'?: {
};

/**
 * Город отправления (ID берем из запроса - direction_city)
 */
'departure_city_id'?: number;

/**
 * Город отправления
 */
'departure_city_name'?: string;

/**
 * Страна отправления (ID берем из запроса - direction_country)
 */
'departure_country_id'?: number;

/**
 * Страна отправления
 */
'departure_country_name'?: string;

/**
 * Аэропорт вылета (ID берем из запроса - direction_point)
 */
'departure_point_id'?: number;

/**
 * Аэропорт вылета
 */
'departure_point_name'?: string;

/**
 * Отправление
 */
'departure_text'?: string;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Город назначения (ID берем из запроса - direction_city)
 */
'arrival_city_id'?: number;

/**
 * Город назначения
 */
'arrival_city_name'?: string;

/**
 * Страна назначения (ID берем из запроса - direction_country)
 */
'arrival_country_id'?: number;

/**
 * Страна назначения
 */
'arrival_country_name'?: string;

/**
 * Аэропорт прибытия (ID берем из запроса - direction_point)
 */
'arrival_point_id'?: number;

/**
 * Аэропорт прибытия
 */
'arrival_point_name'?: string;

/**
 * Прибытие
 */
'arrival_text'?: string;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Рейсы (ID берем из запроса - direction_flight)
 */
'departure_flight'?: string;

/**
 * Условия поставки по Инкотермс (ID берем из запроса - request_incoterms)
 */
'incoterms_id'?: number;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

/**
 * Ставки дали
 */
'rates'?: string;

/**
 * Минимальная ставка Подрядчик ID
 */
'rate_contractor_id'?: number;

/**
 * Минимальная ставка Подрядчик
 */
'rate_contractor_name'?: string;

/**
 * Минимальная ставка Срок, дней
 */
'rate_delivery_days'?: string;

/**
 * Минимальная ставка Сумма
 */
'rate_delivery_cost'?: string;

/**
 * Профит сумма
 */
'profit_amount'?: string;

/**
 * Профит процент
 */
'profit_percent'?: string;

/**
 * Ставка клиенту
 */
'bid_client'?: string;

/**
 * Признак начала торгов
 */
'flag_bidding_start'?: boolean;

/**
 * Время начала торгов
 */
'time_bidding_start'?: string;

/**
 * Время рассылки информации по торгам
 */
'time_bidding_send'?: string;

/**
 * Услуги включаемые в ставку (ID берем из запроса - request_services)
 */
'services'?: Array<string>;

/**
 * Дополнительные услуги включаемые в ставку (ID берем из запроса - request_services_additional)
 */
'services_optional'?: Array<string>;

/**
 * Примечание по Запросу
 */
'comment'?: string;

/**
 * Статус Запроса (ID берем из запроса - request_status)
 */
'status_id'?: number;

/**
 * Статус CRM (ID берем из запроса - request_status_crm)
 */
'status_crm_id'?: number;

/**
 * Статус CRM
 */
'status_crm_name'?: string;

/**
 * Ответственный инициатор (ID берем из запроса - company_employee_list)
 */
'manager_initiator_id'?: number;

/**
 * Ответственный инициатор
 */
'manager_initiator_name'?: string;

/**
 * Ответственный создатель (ID берем из запроса - company_employee_list)
 */
'manager_creator_id'?: number;

/**
 * Ответственный создатель
 */
'manager_creator_name'?: string;

/**
 * Ответственный исполнитель (ID берем из запроса - company_employee_list)
 */
'manager_executor_id'?: number;

/**
 * Ответственный исполнитель
 */
'manager_executor_name'?: string;

/**
 * Дата создания
 */
'time_add'?: string;
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestListPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
      rb.query('time_add', params.time_add, {});
      rb.query('status_id', params.status_id, {"style":"form","explode":false});
      rb.query('request_type_id', params.request_type_id, {});
      rb.query('status_crm_id', params.status_crm_id, {"style":"form","explode":false});
      rb.query('departure_country_id', params.departure_country_id, {});
      rb.query('arrival_country_id', params.arrival_country_id, {});
      rb.query('customer_id', params.customer_id, {});
      rb.query('rate_contractor_id', params.rate_contractor_id, {});
      rb.query('departure_city_id', params.departure_city_id, {});
      rb.query('arrival_city_id', params.arrival_city_id, {});
      rb.query('manager_executor_id', params.manager_executor_id, {});
      rb.query('transport_kind_id', params.transport_kind_id, {});
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
         * Клиент (ID берем из запроса - customer_list)
         */
        'customer_id'?: number;
        
        /**
         * Контрагент
         */
        'customer_name'?: string;
        
        /**
         * Телефон контрагента
         */
        'customer_phone'?: string;
        
        /**
         * Email контрагента
         */
        'customer_email'?: string;
        
        /**
         * Email контрагента
         */
        'customer_text'?: string;
        
        /**
         * Вид запроса (ID берем из запроса - request_type)
         */
        'request_type_id'?: number;
        
        /**
         * Вид перевозки (ID берем из запроса - transport_kind)
         */
        'transport_kind_id'?: number;
        
        /**
         * Вид перевозки
         */
        'transport_kind_name'?: string;
        
        /**
         * Тип транспорта (ID берем из запроса - transport_type)
         */
        'transport_type_id'?: number;
        
        /**
         * Тип транспорта
         */
        'transport_type_name'?: number;
        
        /**
         * Наименование груза
         */
        'cargo_description'?: string;
        
        /**
         * Тип груза (ID берем из запроса - cargo_type)
         */
        'cargo_type_id'?: number;
        
        /**
         * Вид упаковки (ID берем из запроса - cargo_package)
         */
        'cargo_package_id'?: number;
        
        /**
         * Температурный режим
         */
        'cargo_temperature'?: {
        
        /**
         * Температурный режим - признак
         */
        'cargo_temperature_control'?: boolean;
        
        /**
         * Температурный режим - минимальная температура
         */
        'cargo_temperature_min'?: number;
        
        /**
         * Температурный режим - максимальная температура
         */
        'cargo_temperature_max'?: number;
        };
        
        /**
         * Наличие батареек, элементов питания или жидкостей
         */
        'cargo_danger'?: boolean;
        
        /**
         * Грузовые места
         */
        'cargo_places'?: Array<{
        
        /**
         * Номер места
         */
        'num'?: number;
        
        /**
         * Вид упаковки (ID берем из запроса - cargo_package)
         */
        'cargo_package_id'?: number;
        
        /**
         * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
         */
        'stacking'?: boolean;
        
        /**
         * Длина, см
         */
        'length'?: number;
        
        /**
         * Ширина, см
         */
        'width'?: number;
        
        /**
         * Высота, см
         */
        'height'?: number;
        
        /**
         * Вес, кг
         */
        'weight'?: number;
        
        /**
         * Количество
         */
        'count'?: number;
        }>;
        
        /**
         * Раздельные места
         */
        'cargo_separately'?: boolean;
        
        /**
         * Итого мест
         */
        'cargo_places_count'?: number;
        
        /**
         * Итого вес
         */
        'cargo_places_weight'?: number;
        
        /**
         * Итого объем
         */
        'cargo_places_volume'?: number;
        
        /**
         * Оплачиваемый вес
         */
        'cargo_places_paid_weight'?: number;
        
        /**
         * Плотность, кг/м3
         */
        'cargo_places_density'?: number;
        
        /**
         * Стоимость груза
         */
        'cargo_cost'?: number;
        
        /**
         * Валюта стоимости груза (ID берем из запроса - settings_get из поля currency)
         */
        'cargo_currency_id'?: string;
        
        /**
         * Готовность
         */
        'cargo_readiness'?: string;
        
        /**
         * Груз
         */
        'cargo_text'?: string;
        
        /**
         * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
         */
        'cargo_places_stacking'?: boolean;
        
        /**
         * Документы по грузу
         */
        'cargo_file'?: {
        };
        
        /**
         * Город отправления (ID берем из запроса - direction_city)
         */
        'departure_city_id'?: number;
        
        /**
         * Город отправления
         */
        'departure_city_name'?: string;
        
        /**
         * Страна отправления (ID берем из запроса - direction_country)
         */
        'departure_country_id'?: number;
        
        /**
         * Страна отправления
         */
        'departure_country_name'?: string;
        
        /**
         * Аэропорт вылета (ID берем из запроса - direction_point)
         */
        'departure_point_id'?: number;
        
        /**
         * Аэропорт вылета
         */
        'departure_point_name'?: string;
        
        /**
         * Отправление
         */
        'departure_text'?: string;
        
        /**
         * Адрес забора груза
         */
        'departure_address'?: string;
        
        /**
         * Город назначения (ID берем из запроса - direction_city)
         */
        'arrival_city_id'?: number;
        
        /**
         * Город назначения
         */
        'arrival_city_name'?: string;
        
        /**
         * Страна назначения (ID берем из запроса - direction_country)
         */
        'arrival_country_id'?: number;
        
        /**
         * Страна назначения
         */
        'arrival_country_name'?: string;
        
        /**
         * Аэропорт прибытия (ID берем из запроса - direction_point)
         */
        'arrival_point_id'?: number;
        
        /**
         * Аэропорт прибытия
         */
        'arrival_point_name'?: string;
        
        /**
         * Прибытие
         */
        'arrival_text'?: string;
        
        /**
         * Адрес доставки груза
         */
        'arrival_address'?: string;
        
        /**
         * Рейсы (ID берем из запроса - direction_flight)
         */
        'departure_flight'?: string;
        
        /**
         * Условия поставки по Инкотермс (ID берем из запроса - request_incoterms)
         */
        'incoterms_id'?: number;
        
        /**
         * Условия поставки по Инкотермс
         */
        'incoterms_name'?: string;
        
        /**
         * Город/Порт (ID берем из запроса - direction_city)
         */
        'incoterms_city_id'?: number;
        
        /**
         * Город/Порт
         */
        'incoterms_city_name'?: string;
        
        /**
         * Ставки дали
         */
        'rates'?: string;
        
        /**
         * Минимальная ставка Подрядчик ID
         */
        'rate_contractor_id'?: number;
        
        /**
         * Минимальная ставка Подрядчик
         */
        'rate_contractor_name'?: string;
        
        /**
         * Минимальная ставка Срок, дней
         */
        'rate_delivery_days'?: string;
        
        /**
         * Минимальная ставка Сумма
         */
        'rate_delivery_cost'?: string;
        
        /**
         * Профит сумма
         */
        'profit_amount'?: string;
        
        /**
         * Профит процент
         */
        'profit_percent'?: string;
        
        /**
         * Ставка клиенту
         */
        'bid_client'?: string;
        
        /**
         * Признак начала торгов
         */
        'flag_bidding_start'?: boolean;
        
        /**
         * Время начала торгов
         */
        'time_bidding_start'?: string;
        
        /**
         * Время рассылки информации по торгам
         */
        'time_bidding_send'?: string;
        
        /**
         * Услуги включаемые в ставку (ID берем из запроса - request_services)
         */
        'services'?: Array<string>;
        
        /**
         * Дополнительные услуги включаемые в ставку (ID берем из запроса - request_services_additional)
         */
        'services_optional'?: Array<string>;
        
        /**
         * Примечание по Запросу
         */
        'comment'?: string;
        
        /**
         * Статус Запроса (ID берем из запроса - request_status)
         */
        'status_id'?: number;
        
        /**
         * Статус CRM (ID берем из запроса - request_status_crm)
         */
        'status_crm_id'?: number;
        
        /**
         * Статус CRM
         */
        'status_crm_name'?: string;
        
        /**
         * Ответственный инициатор (ID берем из запроса - company_employee_list)
         */
        'manager_initiator_id'?: number;
        
        /**
         * Ответственный инициатор
         */
        'manager_initiator_name'?: string;
        
        /**
         * Ответственный создатель (ID берем из запроса - company_employee_list)
         */
        'manager_creator_id'?: number;
        
        /**
         * Ответственный создатель
         */
        'manager_creator_name'?: string;
        
        /**
         * Ответственный исполнитель (ID берем из запроса - company_employee_list)
         */
        'manager_executor_id'?: number;
        
        /**
         * Ответственный исполнитель
         */
        'manager_executor_name'?: string;
        
        /**
         * Дата создания
         */
        'time_add'?: string;
        }>;
        }>;
      })
    );
  }

  /**
   * Список запросов.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestList(
    params?: {

    /**
     * Поиск запроса по номеру...
     */
      id?: string;

    /**
     * Период (day, week, month, dd.mm.YYYY-dd.mm.YYYY)
     */
      time_add?: any;

    /**
     * Статус запроса (ID берем из запроса - request_status)
     */
      status_id?: Array<string>;

    /**
     * Вид запроса (ID берем из запроса - request_type)
     */
      request_type_id?: number;

    /**
     * Статус CRM (ID берем из запроса - request_status_crm)
     */
      status_crm_id?: Array<string>;

    /**
     * Страна отправления (ID берем из запроса - direction_country)
     */
      departure_country_id?: number;

    /**
     * Страна назначения (ID берем из запроса - direction_country)
     */
      arrival_country_id?: number;

    /**
     * Клиент (ID берем из запроса - customer_list)
     */
      customer_id?: number;

    /**
     * Подрядчик (ID берем из запроса - contractor_list)
     */
      rate_contractor_id?: number;

    /**
     * Город отправления (ID берем из запроса - direction_city)
     */
      departure_city_id?: number;

    /**
     * Город назначения (ID берем из запроса - direction_city)
     */
      arrival_city_id?: number;

    /**
     * Сотрудник (ID берем из запроса - company_employee_list)
     */
      manager_executor_id?: number;

    /**
     * Вид перевозки (ID берем из запроса - transport_kind)
     */
      transport_kind_id?: number;

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
'field'?: 'id' | 'time_add';

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
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Контрагент
 */
'customer_name'?: string;

/**
 * Телефон контрагента
 */
'customer_phone'?: string;

/**
 * Email контрагента
 */
'customer_email'?: string;

/**
 * Email контрагента
 */
'customer_text'?: string;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: number;

/**
 * Вид перевозки
 */
'transport_kind_name'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

/**
 * Тип транспорта
 */
'transport_type_name'?: number;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Температурный режим
 */
'cargo_temperature'?: {

/**
 * Температурный режим - признак
 */
'cargo_temperature_control'?: boolean;

/**
 * Температурный режим - минимальная температура
 */
'cargo_temperature_min'?: number;

/**
 * Температурный режим - максимальная температура
 */
'cargo_temperature_max'?: number;
};

/**
 * Наличие батареек, элементов питания или жидкостей
 */
'cargo_danger'?: boolean;

/**
 * Грузовые места
 */
'cargo_places'?: Array<{

/**
 * Номер места
 */
'num'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'stacking'?: boolean;

/**
 * Длина, см
 */
'length'?: number;

/**
 * Ширина, см
 */
'width'?: number;

/**
 * Высота, см
 */
'height'?: number;

/**
 * Вес, кг
 */
'weight'?: number;

/**
 * Количество
 */
'count'?: number;
}>;

/**
 * Раздельные места
 */
'cargo_separately'?: boolean;

/**
 * Итого мест
 */
'cargo_places_count'?: number;

/**
 * Итого вес
 */
'cargo_places_weight'?: number;

/**
 * Итого объем
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес
 */
'cargo_places_paid_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Стоимость груза
 */
'cargo_cost'?: number;

/**
 * Валюта стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Груз
 */
'cargo_text'?: string;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'cargo_places_stacking'?: boolean;

/**
 * Документы по грузу
 */
'cargo_file'?: {
};

/**
 * Город отправления (ID берем из запроса - direction_city)
 */
'departure_city_id'?: number;

/**
 * Город отправления
 */
'departure_city_name'?: string;

/**
 * Страна отправления (ID берем из запроса - direction_country)
 */
'departure_country_id'?: number;

/**
 * Страна отправления
 */
'departure_country_name'?: string;

/**
 * Аэропорт вылета (ID берем из запроса - direction_point)
 */
'departure_point_id'?: number;

/**
 * Аэропорт вылета
 */
'departure_point_name'?: string;

/**
 * Отправление
 */
'departure_text'?: string;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Город назначения (ID берем из запроса - direction_city)
 */
'arrival_city_id'?: number;

/**
 * Город назначения
 */
'arrival_city_name'?: string;

/**
 * Страна назначения (ID берем из запроса - direction_country)
 */
'arrival_country_id'?: number;

/**
 * Страна назначения
 */
'arrival_country_name'?: string;

/**
 * Аэропорт прибытия (ID берем из запроса - direction_point)
 */
'arrival_point_id'?: number;

/**
 * Аэропорт прибытия
 */
'arrival_point_name'?: string;

/**
 * Прибытие
 */
'arrival_text'?: string;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Рейсы (ID берем из запроса - direction_flight)
 */
'departure_flight'?: string;

/**
 * Условия поставки по Инкотермс (ID берем из запроса - request_incoterms)
 */
'incoterms_id'?: number;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

/**
 * Ставки дали
 */
'rates'?: string;

/**
 * Минимальная ставка Подрядчик ID
 */
'rate_contractor_id'?: number;

/**
 * Минимальная ставка Подрядчик
 */
'rate_contractor_name'?: string;

/**
 * Минимальная ставка Срок, дней
 */
'rate_delivery_days'?: string;

/**
 * Минимальная ставка Сумма
 */
'rate_delivery_cost'?: string;

/**
 * Профит сумма
 */
'profit_amount'?: string;

/**
 * Профит процент
 */
'profit_percent'?: string;

/**
 * Ставка клиенту
 */
'bid_client'?: string;

/**
 * Признак начала торгов
 */
'flag_bidding_start'?: boolean;

/**
 * Время начала торгов
 */
'time_bidding_start'?: string;

/**
 * Время рассылки информации по торгам
 */
'time_bidding_send'?: string;

/**
 * Услуги включаемые в ставку (ID берем из запроса - request_services)
 */
'services'?: Array<string>;

/**
 * Дополнительные услуги включаемые в ставку (ID берем из запроса - request_services_additional)
 */
'services_optional'?: Array<string>;

/**
 * Примечание по Запросу
 */
'comment'?: string;

/**
 * Статус Запроса (ID берем из запроса - request_status)
 */
'status_id'?: number;

/**
 * Статус CRM (ID берем из запроса - request_status_crm)
 */
'status_crm_id'?: number;

/**
 * Статус CRM
 */
'status_crm_name'?: string;

/**
 * Ответственный инициатор (ID берем из запроса - company_employee_list)
 */
'manager_initiator_id'?: number;

/**
 * Ответственный инициатор
 */
'manager_initiator_name'?: string;

/**
 * Ответственный создатель (ID берем из запроса - company_employee_list)
 */
'manager_creator_id'?: number;

/**
 * Ответственный создатель
 */
'manager_creator_name'?: string;

/**
 * Ответственный исполнитель (ID берем из запроса - company_employee_list)
 */
'manager_executor_id'?: number;

/**
 * Ответственный исполнитель
 */
'manager_executor_name'?: string;

/**
 * Дата создания
 */
'time_add'?: string;
}>;
}> {
    return this.requestList$Response(params, context).pipe(
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
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Контрагент
 */
'customer_name'?: string;

/**
 * Телефон контрагента
 */
'customer_phone'?: string;

/**
 * Email контрагента
 */
'customer_email'?: string;

/**
 * Email контрагента
 */
'customer_text'?: string;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: number;

/**
 * Вид перевозки
 */
'transport_kind_name'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

/**
 * Тип транспорта
 */
'transport_type_name'?: number;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Температурный режим
 */
'cargo_temperature'?: {

/**
 * Температурный режим - признак
 */
'cargo_temperature_control'?: boolean;

/**
 * Температурный режим - минимальная температура
 */
'cargo_temperature_min'?: number;

/**
 * Температурный режим - максимальная температура
 */
'cargo_temperature_max'?: number;
};

/**
 * Наличие батареек, элементов питания или жидкостей
 */
'cargo_danger'?: boolean;

/**
 * Грузовые места
 */
'cargo_places'?: Array<{

/**
 * Номер места
 */
'num'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'stacking'?: boolean;

/**
 * Длина, см
 */
'length'?: number;

/**
 * Ширина, см
 */
'width'?: number;

/**
 * Высота, см
 */
'height'?: number;

/**
 * Вес, кг
 */
'weight'?: number;

/**
 * Количество
 */
'count'?: number;
}>;

/**
 * Раздельные места
 */
'cargo_separately'?: boolean;

/**
 * Итого мест
 */
'cargo_places_count'?: number;

/**
 * Итого вес
 */
'cargo_places_weight'?: number;

/**
 * Итого объем
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес
 */
'cargo_places_paid_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Стоимость груза
 */
'cargo_cost'?: number;

/**
 * Валюта стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Груз
 */
'cargo_text'?: string;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'cargo_places_stacking'?: boolean;

/**
 * Документы по грузу
 */
'cargo_file'?: {
};

/**
 * Город отправления (ID берем из запроса - direction_city)
 */
'departure_city_id'?: number;

/**
 * Город отправления
 */
'departure_city_name'?: string;

/**
 * Страна отправления (ID берем из запроса - direction_country)
 */
'departure_country_id'?: number;

/**
 * Страна отправления
 */
'departure_country_name'?: string;

/**
 * Аэропорт вылета (ID берем из запроса - direction_point)
 */
'departure_point_id'?: number;

/**
 * Аэропорт вылета
 */
'departure_point_name'?: string;

/**
 * Отправление
 */
'departure_text'?: string;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Город назначения (ID берем из запроса - direction_city)
 */
'arrival_city_id'?: number;

/**
 * Город назначения
 */
'arrival_city_name'?: string;

/**
 * Страна назначения (ID берем из запроса - direction_country)
 */
'arrival_country_id'?: number;

/**
 * Страна назначения
 */
'arrival_country_name'?: string;

/**
 * Аэропорт прибытия (ID берем из запроса - direction_point)
 */
'arrival_point_id'?: number;

/**
 * Аэропорт прибытия
 */
'arrival_point_name'?: string;

/**
 * Прибытие
 */
'arrival_text'?: string;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Рейсы (ID берем из запроса - direction_flight)
 */
'departure_flight'?: string;

/**
 * Условия поставки по Инкотермс (ID берем из запроса - request_incoterms)
 */
'incoterms_id'?: number;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

/**
 * Ставки дали
 */
'rates'?: string;

/**
 * Минимальная ставка Подрядчик ID
 */
'rate_contractor_id'?: number;

/**
 * Минимальная ставка Подрядчик
 */
'rate_contractor_name'?: string;

/**
 * Минимальная ставка Срок, дней
 */
'rate_delivery_days'?: string;

/**
 * Минимальная ставка Сумма
 */
'rate_delivery_cost'?: string;

/**
 * Профит сумма
 */
'profit_amount'?: string;

/**
 * Профит процент
 */
'profit_percent'?: string;

/**
 * Ставка клиенту
 */
'bid_client'?: string;

/**
 * Признак начала торгов
 */
'flag_bidding_start'?: boolean;

/**
 * Время начала торгов
 */
'time_bidding_start'?: string;

/**
 * Время рассылки информации по торгам
 */
'time_bidding_send'?: string;

/**
 * Услуги включаемые в ставку (ID берем из запроса - request_services)
 */
'services'?: Array<string>;

/**
 * Дополнительные услуги включаемые в ставку (ID берем из запроса - request_services_additional)
 */
'services_optional'?: Array<string>;

/**
 * Примечание по Запросу
 */
'comment'?: string;

/**
 * Статус Запроса (ID берем из запроса - request_status)
 */
'status_id'?: number;

/**
 * Статус CRM (ID берем из запроса - request_status_crm)
 */
'status_crm_id'?: number;

/**
 * Статус CRM
 */
'status_crm_name'?: string;

/**
 * Ответственный инициатор (ID берем из запроса - company_employee_list)
 */
'manager_initiator_id'?: number;

/**
 * Ответственный инициатор
 */
'manager_initiator_name'?: string;

/**
 * Ответственный создатель (ID берем из запроса - company_employee_list)
 */
'manager_creator_id'?: number;

/**
 * Ответственный создатель
 */
'manager_creator_name'?: string;

/**
 * Ответственный исполнитель (ID берем из запроса - company_employee_list)
 */
'manager_executor_id'?: number;

/**
 * Ответственный исполнитель
 */
'manager_executor_name'?: string;

/**
 * Дата создания
 */
'time_add'?: string;
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
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Контрагент
 */
'customer_name'?: string;

/**
 * Телефон контрагента
 */
'customer_phone'?: string;

/**
 * Email контрагента
 */
'customer_email'?: string;

/**
 * Email контрагента
 */
'customer_text'?: string;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: number;

/**
 * Вид перевозки
 */
'transport_kind_name'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

/**
 * Тип транспорта
 */
'transport_type_name'?: number;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Температурный режим
 */
'cargo_temperature'?: {

/**
 * Температурный режим - признак
 */
'cargo_temperature_control'?: boolean;

/**
 * Температурный режим - минимальная температура
 */
'cargo_temperature_min'?: number;

/**
 * Температурный режим - максимальная температура
 */
'cargo_temperature_max'?: number;
};

/**
 * Наличие батареек, элементов питания или жидкостей
 */
'cargo_danger'?: boolean;

/**
 * Грузовые места
 */
'cargo_places'?: Array<{

/**
 * Номер места
 */
'num'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'stacking'?: boolean;

/**
 * Длина, см
 */
'length'?: number;

/**
 * Ширина, см
 */
'width'?: number;

/**
 * Высота, см
 */
'height'?: number;

/**
 * Вес, кг
 */
'weight'?: number;

/**
 * Количество
 */
'count'?: number;
}>;

/**
 * Раздельные места
 */
'cargo_separately'?: boolean;

/**
 * Итого мест
 */
'cargo_places_count'?: number;

/**
 * Итого вес
 */
'cargo_places_weight'?: number;

/**
 * Итого объем
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес
 */
'cargo_places_paid_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Стоимость груза
 */
'cargo_cost'?: number;

/**
 * Валюта стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Груз
 */
'cargo_text'?: string;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'cargo_places_stacking'?: boolean;

/**
 * Документы по грузу
 */
'cargo_file'?: {
};

/**
 * Город отправления (ID берем из запроса - direction_city)
 */
'departure_city_id'?: number;

/**
 * Город отправления
 */
'departure_city_name'?: string;

/**
 * Страна отправления (ID берем из запроса - direction_country)
 */
'departure_country_id'?: number;

/**
 * Страна отправления
 */
'departure_country_name'?: string;

/**
 * Аэропорт вылета (ID берем из запроса - direction_point)
 */
'departure_point_id'?: number;

/**
 * Аэропорт вылета
 */
'departure_point_name'?: string;

/**
 * Отправление
 */
'departure_text'?: string;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Город назначения (ID берем из запроса - direction_city)
 */
'arrival_city_id'?: number;

/**
 * Город назначения
 */
'arrival_city_name'?: string;

/**
 * Страна назначения (ID берем из запроса - direction_country)
 */
'arrival_country_id'?: number;

/**
 * Страна назначения
 */
'arrival_country_name'?: string;

/**
 * Аэропорт прибытия (ID берем из запроса - direction_point)
 */
'arrival_point_id'?: number;

/**
 * Аэропорт прибытия
 */
'arrival_point_name'?: string;

/**
 * Прибытие
 */
'arrival_text'?: string;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Рейсы (ID берем из запроса - direction_flight)
 */
'departure_flight'?: string;

/**
 * Условия поставки по Инкотермс (ID берем из запроса - request_incoterms)
 */
'incoterms_id'?: number;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

/**
 * Ставки дали
 */
'rates'?: string;

/**
 * Минимальная ставка Подрядчик ID
 */
'rate_contractor_id'?: number;

/**
 * Минимальная ставка Подрядчик
 */
'rate_contractor_name'?: string;

/**
 * Минимальная ставка Срок, дней
 */
'rate_delivery_days'?: string;

/**
 * Минимальная ставка Сумма
 */
'rate_delivery_cost'?: string;

/**
 * Профит сумма
 */
'profit_amount'?: string;

/**
 * Профит процент
 */
'profit_percent'?: string;

/**
 * Ставка клиенту
 */
'bid_client'?: string;

/**
 * Признак начала торгов
 */
'flag_bidding_start'?: boolean;

/**
 * Время начала торгов
 */
'time_bidding_start'?: string;

/**
 * Время рассылки информации по торгам
 */
'time_bidding_send'?: string;

/**
 * Услуги включаемые в ставку (ID берем из запроса - request_services)
 */
'services'?: Array<string>;

/**
 * Дополнительные услуги включаемые в ставку (ID берем из запроса - request_services_additional)
 */
'services_optional'?: Array<string>;

/**
 * Примечание по Запросу
 */
'comment'?: string;

/**
 * Статус Запроса (ID берем из запроса - request_status)
 */
'status_id'?: number;

/**
 * Статус CRM (ID берем из запроса - request_status_crm)
 */
'status_crm_id'?: number;

/**
 * Статус CRM
 */
'status_crm_name'?: string;

/**
 * Ответственный инициатор (ID берем из запроса - company_employee_list)
 */
'manager_initiator_id'?: number;

/**
 * Ответственный инициатор
 */
'manager_initiator_name'?: string;

/**
 * Ответственный создатель (ID берем из запроса - company_employee_list)
 */
'manager_creator_id'?: number;

/**
 * Ответственный создатель
 */
'manager_creator_name'?: string;

/**
 * Ответственный исполнитель (ID берем из запроса - company_employee_list)
 */
'manager_executor_id'?: number;

/**
 * Ответственный исполнитель
 */
'manager_executor_name'?: string;

/**
 * Дата создания
 */
'time_add'?: string;
}>;
} => r.body)
    );
  }

  /** Path part for operation `requestListParam()` */
  static readonly RequestListParamPath = '/request_list_param';

  /**
   * Параметры вывода запросов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestListParam()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestListParam$Response(
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
'column'?: Array<string>;

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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestListParamPath, 'get');
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
        'column'?: Array<string>;
        
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
   * To access the full response (for headers, for example), `requestListParam$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestListParam(
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
'column'?: Array<string>;

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
    return this.requestListParam$Response(params, context).pipe(
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
'column'?: Array<string>;

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
'column'?: Array<string>;

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

  /** Path part for operation `requestInfo()` */
  static readonly RequestInfoPath = '/request_info';

  /**
   * Данные запроса.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestInfo$Response(
    params: {

    /**
     * ID запроса
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
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Контрагент
 */
'customer_name'?: string;

/**
 * Телефон контрагента
 */
'customer_phone'?: string;

/**
 * Email контрагента
 */
'customer_email'?: string;

/**
 * Email контрагента
 */
'customer_text'?: string;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: number;

/**
 * Вид перевозки
 */
'transport_kind_name'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

/**
 * Тип транспорта
 */
'transport_type_name'?: number;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Температурный режим
 */
'cargo_temperature'?: {

/**
 * Температурный режим - признак
 */
'cargo_temperature_control'?: boolean;

/**
 * Температурный режим - минимальная температура
 */
'cargo_temperature_min'?: number;

/**
 * Температурный режим - максимальная температура
 */
'cargo_temperature_max'?: number;
};

/**
 * Наличие батареек, элементов питания или жидкостей
 */
'cargo_danger'?: boolean;

/**
 * Грузовые места
 */
'cargo_places'?: Array<{

/**
 * Номер места
 */
'num'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'stacking'?: boolean;

/**
 * Длина, см
 */
'length'?: number;

/**
 * Ширина, см
 */
'width'?: number;

/**
 * Высота, см
 */
'height'?: number;

/**
 * Вес, кг
 */
'weight'?: number;

/**
 * Количество
 */
'count'?: number;
}>;

/**
 * Раздельные места
 */
'cargo_separately'?: boolean;

/**
 * Итого мест
 */
'cargo_places_count'?: number;

/**
 * Итого вес
 */
'cargo_places_weight'?: number;

/**
 * Итого объем
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес
 */
'cargo_places_paid_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Стоимость груза
 */
'cargo_cost'?: number;

/**
 * Валюта стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Груз
 */
'cargo_text'?: string;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'cargo_places_stacking'?: boolean;

/**
 * Паспорта безопасности (файлы)
 */
'cargo_file'?: {
};

/**
 * Город отправления (ID берем из запроса - direction_city)
 */
'departure_city_id'?: number;

/**
 * Город отправления
 */
'departure_city_name'?: string;

/**
 * Страна отправления (ID берем из запроса - direction_country)
 */
'departure_country_id'?: number;

/**
 * Страна отправления
 */
'departure_country_name'?: string;

/**
 * Аэропорт вылета (ID берем из запроса - direction_point)
 */
'departure_point_id'?: number;

/**
 * Аэропорт вылета
 */
'departure_point_name'?: string;

/**
 * Отправление
 */
'departure_text'?: string;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Город назначения (ID берем из запроса - direction_city)
 */
'arrival_city_id'?: number;

/**
 * Город назначения
 */
'arrival_city_name'?: string;

/**
 * Страна назначения (ID берем из запроса - direction_country)
 */
'arrival_country_id'?: number;

/**
 * Страна назначения
 */
'arrival_country_name'?: string;

/**
 * Аэропорт прибытия (ID берем из запроса - direction_point)
 */
'arrival_point_id'?: number;

/**
 * Аэропорт прибытия
 */
'arrival_point_name'?: string;

/**
 * Прибытие
 */
'arrival_text'?: string;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Рейсы (ID берем из запроса - direction_flight)
 */
'departure_flight'?: string;

/**
 * Условия поставки по Инкотермс (ID берем из запроса - request_incoterms)
 */
'incoterms_id'?: number;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

/**
 * Ставки дали
 */
'rates'?: string;

/**
 * Минимальная ставка Подрядчик ID
 */
'rate_contractor_id'?: number;

/**
 * Минимальная ставка Подрядчик
 */
'rate_contractor_name'?: string;

/**
 * Минимальная ставка Срок, дней
 */
'rate_delivery_days'?: string;

/**
 * Минимальная ставка Сумма
 */
'rate_delivery_cost'?: string;

/**
 * Профит сумма
 */
'profit_amount'?: string;

/**
 * Профит процент
 */
'profit_percent'?: string;

/**
 * Ставка клиенту
 */
'bid_client'?: string;

/**
 * Признак начала торгов
 */
'flag_bidding_start'?: boolean;

/**
 * Время начала торгов
 */
'time_bidding_start'?: string;

/**
 * Время рассылки информации по торгам
 */
'time_bidding_send'?: string;

/**
 * Услуги включаемые в ставку (ID берем из запроса - request_services)
 */
'services'?: Array<string>;

/**
 * Дополнительные услуги включаемые в ставку (ID берем из запроса - request_services_additional)
 */
'services_optional'?: Array<string>;

/**
 * Примечание по Запросу
 */
'comment'?: string;

/**
 * Статус Запроса (ID берем из запроса - request_status)
 */
'status_id'?: number;

/**
 * Статус CRM (ID берем из запроса - request_status_crm)
 */
'status_crm_id'?: number;

/**
 * Статус CRM
 */
'status_crm_name'?: string;

/**
 * Ответственный инициатор (ID берем из запроса - company_employee_list)
 */
'manager_initiator_id'?: number;

/**
 * Ответственный инициатор
 */
'manager_initiator_name'?: string;

/**
 * Ответственный создатель (ID берем из запроса - company_employee_list)
 */
'manager_creator_id'?: number;

/**
 * Ответственный создатель
 */
'manager_creator_name'?: string;

/**
 * Ответственный исполнитель (ID берем из запроса - company_employee_list)
 */
'manager_executor_id'?: number;

/**
 * Ответственный исполнитель
 */
'manager_executor_name'?: string;

/**
 * Дата создания
 */
'time_add'?: string;

/**
 * Документы (файлы)
 */
'documents_file'?: {
};
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestInfoPath, 'get');
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
         * Клиент (ID берем из запроса - customer_list)
         */
        'customer_id'?: number;
        
        /**
         * Контрагент
         */
        'customer_name'?: string;
        
        /**
         * Телефон контрагента
         */
        'customer_phone'?: string;
        
        /**
         * Email контрагента
         */
        'customer_email'?: string;
        
        /**
         * Email контрагента
         */
        'customer_text'?: string;
        
        /**
         * Вид запроса (ID берем из запроса - request_type)
         */
        'request_type_id'?: number;
        
        /**
         * Вид перевозки (ID берем из запроса - transport_kind)
         */
        'transport_kind_id'?: number;
        
        /**
         * Вид перевозки
         */
        'transport_kind_name'?: string;
        
        /**
         * Тип транспорта (ID берем из запроса - transport_type)
         */
        'transport_type_id'?: number;
        
        /**
         * Тип транспорта
         */
        'transport_type_name'?: number;
        
        /**
         * Наименование груза
         */
        'cargo_description'?: string;
        
        /**
         * Тип груза (ID берем из запроса - cargo_type)
         */
        'cargo_type_id'?: number;
        
        /**
         * Вид упаковки (ID берем из запроса - cargo_package)
         */
        'cargo_package_id'?: number;
        
        /**
         * Температурный режим
         */
        'cargo_temperature'?: {
        
        /**
         * Температурный режим - признак
         */
        'cargo_temperature_control'?: boolean;
        
        /**
         * Температурный режим - минимальная температура
         */
        'cargo_temperature_min'?: number;
        
        /**
         * Температурный режим - максимальная температура
         */
        'cargo_temperature_max'?: number;
        };
        
        /**
         * Наличие батареек, элементов питания или жидкостей
         */
        'cargo_danger'?: boolean;
        
        /**
         * Грузовые места
         */
        'cargo_places'?: Array<{
        
        /**
         * Номер места
         */
        'num'?: number;
        
        /**
         * Вид упаковки (ID берем из запроса - cargo_package)
         */
        'cargo_package_id'?: number;
        
        /**
         * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
         */
        'stacking'?: boolean;
        
        /**
         * Длина, см
         */
        'length'?: number;
        
        /**
         * Ширина, см
         */
        'width'?: number;
        
        /**
         * Высота, см
         */
        'height'?: number;
        
        /**
         * Вес, кг
         */
        'weight'?: number;
        
        /**
         * Количество
         */
        'count'?: number;
        }>;
        
        /**
         * Раздельные места
         */
        'cargo_separately'?: boolean;
        
        /**
         * Итого мест
         */
        'cargo_places_count'?: number;
        
        /**
         * Итого вес
         */
        'cargo_places_weight'?: number;
        
        /**
         * Итого объем
         */
        'cargo_places_volume'?: number;
        
        /**
         * Оплачиваемый вес
         */
        'cargo_places_paid_weight'?: number;
        
        /**
         * Плотность, кг/м3
         */
        'cargo_places_density'?: number;
        
        /**
         * Стоимость груза
         */
        'cargo_cost'?: number;
        
        /**
         * Валюта стоимости груза (ID берем из запроса - settings_get из поля currency)
         */
        'cargo_currency_id'?: string;
        
        /**
         * Готовность
         */
        'cargo_readiness'?: string;
        
        /**
         * Груз
         */
        'cargo_text'?: string;
        
        /**
         * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
         */
        'cargo_places_stacking'?: boolean;
        
        /**
         * Паспорта безопасности (файлы)
         */
        'cargo_file'?: {
        };
        
        /**
         * Город отправления (ID берем из запроса - direction_city)
         */
        'departure_city_id'?: number;
        
        /**
         * Город отправления
         */
        'departure_city_name'?: string;
        
        /**
         * Страна отправления (ID берем из запроса - direction_country)
         */
        'departure_country_id'?: number;
        
        /**
         * Страна отправления
         */
        'departure_country_name'?: string;
        
        /**
         * Аэропорт вылета (ID берем из запроса - direction_point)
         */
        'departure_point_id'?: number;
        
        /**
         * Аэропорт вылета
         */
        'departure_point_name'?: string;
        
        /**
         * Отправление
         */
        'departure_text'?: string;
        
        /**
         * Адрес забора груза
         */
        'departure_address'?: string;
        
        /**
         * Город назначения (ID берем из запроса - direction_city)
         */
        'arrival_city_id'?: number;
        
        /**
         * Город назначения
         */
        'arrival_city_name'?: string;
        
        /**
         * Страна назначения (ID берем из запроса - direction_country)
         */
        'arrival_country_id'?: number;
        
        /**
         * Страна назначения
         */
        'arrival_country_name'?: string;
        
        /**
         * Аэропорт прибытия (ID берем из запроса - direction_point)
         */
        'arrival_point_id'?: number;
        
        /**
         * Аэропорт прибытия
         */
        'arrival_point_name'?: string;
        
        /**
         * Прибытие
         */
        'arrival_text'?: string;
        
        /**
         * Адрес доставки груза
         */
        'arrival_address'?: string;
        
        /**
         * Рейсы (ID берем из запроса - direction_flight)
         */
        'departure_flight'?: string;
        
        /**
         * Условия поставки по Инкотермс (ID берем из запроса - request_incoterms)
         */
        'incoterms_id'?: number;
        
        /**
         * Условия поставки по Инкотермс
         */
        'incoterms_name'?: string;
        
        /**
         * Город/Порт (ID берем из запроса - direction_city)
         */
        'incoterms_city_id'?: number;
        
        /**
         * Город/Порт
         */
        'incoterms_city_name'?: string;
        
        /**
         * Ставки дали
         */
        'rates'?: string;
        
        /**
         * Минимальная ставка Подрядчик ID
         */
        'rate_contractor_id'?: number;
        
        /**
         * Минимальная ставка Подрядчик
         */
        'rate_contractor_name'?: string;
        
        /**
         * Минимальная ставка Срок, дней
         */
        'rate_delivery_days'?: string;
        
        /**
         * Минимальная ставка Сумма
         */
        'rate_delivery_cost'?: string;
        
        /**
         * Профит сумма
         */
        'profit_amount'?: string;
        
        /**
         * Профит процент
         */
        'profit_percent'?: string;
        
        /**
         * Ставка клиенту
         */
        'bid_client'?: string;
        
        /**
         * Признак начала торгов
         */
        'flag_bidding_start'?: boolean;
        
        /**
         * Время начала торгов
         */
        'time_bidding_start'?: string;
        
        /**
         * Время рассылки информации по торгам
         */
        'time_bidding_send'?: string;
        
        /**
         * Услуги включаемые в ставку (ID берем из запроса - request_services)
         */
        'services'?: Array<string>;
        
        /**
         * Дополнительные услуги включаемые в ставку (ID берем из запроса - request_services_additional)
         */
        'services_optional'?: Array<string>;
        
        /**
         * Примечание по Запросу
         */
        'comment'?: string;
        
        /**
         * Статус Запроса (ID берем из запроса - request_status)
         */
        'status_id'?: number;
        
        /**
         * Статус CRM (ID берем из запроса - request_status_crm)
         */
        'status_crm_id'?: number;
        
        /**
         * Статус CRM
         */
        'status_crm_name'?: string;
        
        /**
         * Ответственный инициатор (ID берем из запроса - company_employee_list)
         */
        'manager_initiator_id'?: number;
        
        /**
         * Ответственный инициатор
         */
        'manager_initiator_name'?: string;
        
        /**
         * Ответственный создатель (ID берем из запроса - company_employee_list)
         */
        'manager_creator_id'?: number;
        
        /**
         * Ответственный создатель
         */
        'manager_creator_name'?: string;
        
        /**
         * Ответственный исполнитель (ID берем из запроса - company_employee_list)
         */
        'manager_executor_id'?: number;
        
        /**
         * Ответственный исполнитель
         */
        'manager_executor_name'?: string;
        
        /**
         * Дата создания
         */
        'time_add'?: string;
        
        /**
         * Документы (файлы)
         */
        'documents_file'?: {
        };
        }>;
      })
    );
  }

  /**
   * Данные запроса.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestInfo(
    params: {

    /**
     * ID запроса
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
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Контрагент
 */
'customer_name'?: string;

/**
 * Телефон контрагента
 */
'customer_phone'?: string;

/**
 * Email контрагента
 */
'customer_email'?: string;

/**
 * Email контрагента
 */
'customer_text'?: string;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: number;

/**
 * Вид перевозки
 */
'transport_kind_name'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

/**
 * Тип транспорта
 */
'transport_type_name'?: number;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Температурный режим
 */
'cargo_temperature'?: {

/**
 * Температурный режим - признак
 */
'cargo_temperature_control'?: boolean;

/**
 * Температурный режим - минимальная температура
 */
'cargo_temperature_min'?: number;

/**
 * Температурный режим - максимальная температура
 */
'cargo_temperature_max'?: number;
};

/**
 * Наличие батареек, элементов питания или жидкостей
 */
'cargo_danger'?: boolean;

/**
 * Грузовые места
 */
'cargo_places'?: Array<{

/**
 * Номер места
 */
'num'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'stacking'?: boolean;

/**
 * Длина, см
 */
'length'?: number;

/**
 * Ширина, см
 */
'width'?: number;

/**
 * Высота, см
 */
'height'?: number;

/**
 * Вес, кг
 */
'weight'?: number;

/**
 * Количество
 */
'count'?: number;
}>;

/**
 * Раздельные места
 */
'cargo_separately'?: boolean;

/**
 * Итого мест
 */
'cargo_places_count'?: number;

/**
 * Итого вес
 */
'cargo_places_weight'?: number;

/**
 * Итого объем
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес
 */
'cargo_places_paid_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Стоимость груза
 */
'cargo_cost'?: number;

/**
 * Валюта стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Груз
 */
'cargo_text'?: string;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'cargo_places_stacking'?: boolean;

/**
 * Паспорта безопасности (файлы)
 */
'cargo_file'?: {
};

/**
 * Город отправления (ID берем из запроса - direction_city)
 */
'departure_city_id'?: number;

/**
 * Город отправления
 */
'departure_city_name'?: string;

/**
 * Страна отправления (ID берем из запроса - direction_country)
 */
'departure_country_id'?: number;

/**
 * Страна отправления
 */
'departure_country_name'?: string;

/**
 * Аэропорт вылета (ID берем из запроса - direction_point)
 */
'departure_point_id'?: number;

/**
 * Аэропорт вылета
 */
'departure_point_name'?: string;

/**
 * Отправление
 */
'departure_text'?: string;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Город назначения (ID берем из запроса - direction_city)
 */
'arrival_city_id'?: number;

/**
 * Город назначения
 */
'arrival_city_name'?: string;

/**
 * Страна назначения (ID берем из запроса - direction_country)
 */
'arrival_country_id'?: number;

/**
 * Страна назначения
 */
'arrival_country_name'?: string;

/**
 * Аэропорт прибытия (ID берем из запроса - direction_point)
 */
'arrival_point_id'?: number;

/**
 * Аэропорт прибытия
 */
'arrival_point_name'?: string;

/**
 * Прибытие
 */
'arrival_text'?: string;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Рейсы (ID берем из запроса - direction_flight)
 */
'departure_flight'?: string;

/**
 * Условия поставки по Инкотермс (ID берем из запроса - request_incoterms)
 */
'incoterms_id'?: number;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

/**
 * Ставки дали
 */
'rates'?: string;

/**
 * Минимальная ставка Подрядчик ID
 */
'rate_contractor_id'?: number;

/**
 * Минимальная ставка Подрядчик
 */
'rate_contractor_name'?: string;

/**
 * Минимальная ставка Срок, дней
 */
'rate_delivery_days'?: string;

/**
 * Минимальная ставка Сумма
 */
'rate_delivery_cost'?: string;

/**
 * Профит сумма
 */
'profit_amount'?: string;

/**
 * Профит процент
 */
'profit_percent'?: string;

/**
 * Ставка клиенту
 */
'bid_client'?: string;

/**
 * Признак начала торгов
 */
'flag_bidding_start'?: boolean;

/**
 * Время начала торгов
 */
'time_bidding_start'?: string;

/**
 * Время рассылки информации по торгам
 */
'time_bidding_send'?: string;

/**
 * Услуги включаемые в ставку (ID берем из запроса - request_services)
 */
'services'?: Array<string>;

/**
 * Дополнительные услуги включаемые в ставку (ID берем из запроса - request_services_additional)
 */
'services_optional'?: Array<string>;

/**
 * Примечание по Запросу
 */
'comment'?: string;

/**
 * Статус Запроса (ID берем из запроса - request_status)
 */
'status_id'?: number;

/**
 * Статус CRM (ID берем из запроса - request_status_crm)
 */
'status_crm_id'?: number;

/**
 * Статус CRM
 */
'status_crm_name'?: string;

/**
 * Ответственный инициатор (ID берем из запроса - company_employee_list)
 */
'manager_initiator_id'?: number;

/**
 * Ответственный инициатор
 */
'manager_initiator_name'?: string;

/**
 * Ответственный создатель (ID берем из запроса - company_employee_list)
 */
'manager_creator_id'?: number;

/**
 * Ответственный создатель
 */
'manager_creator_name'?: string;

/**
 * Ответственный исполнитель (ID берем из запроса - company_employee_list)
 */
'manager_executor_id'?: number;

/**
 * Ответственный исполнитель
 */
'manager_executor_name'?: string;

/**
 * Дата создания
 */
'time_add'?: string;

/**
 * Документы (файлы)
 */
'documents_file'?: {
};
}> {
    return this.requestInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Контрагент
 */
'customer_name'?: string;

/**
 * Телефон контрагента
 */
'customer_phone'?: string;

/**
 * Email контрагента
 */
'customer_email'?: string;

/**
 * Email контрагента
 */
'customer_text'?: string;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: number;

/**
 * Вид перевозки
 */
'transport_kind_name'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

/**
 * Тип транспорта
 */
'transport_type_name'?: number;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Температурный режим
 */
'cargo_temperature'?: {

/**
 * Температурный режим - признак
 */
'cargo_temperature_control'?: boolean;

/**
 * Температурный режим - минимальная температура
 */
'cargo_temperature_min'?: number;

/**
 * Температурный режим - максимальная температура
 */
'cargo_temperature_max'?: number;
};

/**
 * Наличие батареек, элементов питания или жидкостей
 */
'cargo_danger'?: boolean;

/**
 * Грузовые места
 */
'cargo_places'?: Array<{

/**
 * Номер места
 */
'num'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'stacking'?: boolean;

/**
 * Длина, см
 */
'length'?: number;

/**
 * Ширина, см
 */
'width'?: number;

/**
 * Высота, см
 */
'height'?: number;

/**
 * Вес, кг
 */
'weight'?: number;

/**
 * Количество
 */
'count'?: number;
}>;

/**
 * Раздельные места
 */
'cargo_separately'?: boolean;

/**
 * Итого мест
 */
'cargo_places_count'?: number;

/**
 * Итого вес
 */
'cargo_places_weight'?: number;

/**
 * Итого объем
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес
 */
'cargo_places_paid_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Стоимость груза
 */
'cargo_cost'?: number;

/**
 * Валюта стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Груз
 */
'cargo_text'?: string;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'cargo_places_stacking'?: boolean;

/**
 * Паспорта безопасности (файлы)
 */
'cargo_file'?: {
};

/**
 * Город отправления (ID берем из запроса - direction_city)
 */
'departure_city_id'?: number;

/**
 * Город отправления
 */
'departure_city_name'?: string;

/**
 * Страна отправления (ID берем из запроса - direction_country)
 */
'departure_country_id'?: number;

/**
 * Страна отправления
 */
'departure_country_name'?: string;

/**
 * Аэропорт вылета (ID берем из запроса - direction_point)
 */
'departure_point_id'?: number;

/**
 * Аэропорт вылета
 */
'departure_point_name'?: string;

/**
 * Отправление
 */
'departure_text'?: string;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Город назначения (ID берем из запроса - direction_city)
 */
'arrival_city_id'?: number;

/**
 * Город назначения
 */
'arrival_city_name'?: string;

/**
 * Страна назначения (ID берем из запроса - direction_country)
 */
'arrival_country_id'?: number;

/**
 * Страна назначения
 */
'arrival_country_name'?: string;

/**
 * Аэропорт прибытия (ID берем из запроса - direction_point)
 */
'arrival_point_id'?: number;

/**
 * Аэропорт прибытия
 */
'arrival_point_name'?: string;

/**
 * Прибытие
 */
'arrival_text'?: string;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Рейсы (ID берем из запроса - direction_flight)
 */
'departure_flight'?: string;

/**
 * Условия поставки по Инкотермс (ID берем из запроса - request_incoterms)
 */
'incoterms_id'?: number;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

/**
 * Ставки дали
 */
'rates'?: string;

/**
 * Минимальная ставка Подрядчик ID
 */
'rate_contractor_id'?: number;

/**
 * Минимальная ставка Подрядчик
 */
'rate_contractor_name'?: string;

/**
 * Минимальная ставка Срок, дней
 */
'rate_delivery_days'?: string;

/**
 * Минимальная ставка Сумма
 */
'rate_delivery_cost'?: string;

/**
 * Профит сумма
 */
'profit_amount'?: string;

/**
 * Профит процент
 */
'profit_percent'?: string;

/**
 * Ставка клиенту
 */
'bid_client'?: string;

/**
 * Признак начала торгов
 */
'flag_bidding_start'?: boolean;

/**
 * Время начала торгов
 */
'time_bidding_start'?: string;

/**
 * Время рассылки информации по торгам
 */
'time_bidding_send'?: string;

/**
 * Услуги включаемые в ставку (ID берем из запроса - request_services)
 */
'services'?: Array<string>;

/**
 * Дополнительные услуги включаемые в ставку (ID берем из запроса - request_services_additional)
 */
'services_optional'?: Array<string>;

/**
 * Примечание по Запросу
 */
'comment'?: string;

/**
 * Статус Запроса (ID берем из запроса - request_status)
 */
'status_id'?: number;

/**
 * Статус CRM (ID берем из запроса - request_status_crm)
 */
'status_crm_id'?: number;

/**
 * Статус CRM
 */
'status_crm_name'?: string;

/**
 * Ответственный инициатор (ID берем из запроса - company_employee_list)
 */
'manager_initiator_id'?: number;

/**
 * Ответственный инициатор
 */
'manager_initiator_name'?: string;

/**
 * Ответственный создатель (ID берем из запроса - company_employee_list)
 */
'manager_creator_id'?: number;

/**
 * Ответственный создатель
 */
'manager_creator_name'?: string;

/**
 * Ответственный исполнитель (ID берем из запроса - company_employee_list)
 */
'manager_executor_id'?: number;

/**
 * Ответственный исполнитель
 */
'manager_executor_name'?: string;

/**
 * Дата создания
 */
'time_add'?: string;

/**
 * Документы (файлы)
 */
'documents_file'?: {
};
}>): {

/**
 * ID
 */
'id': number;

/**
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Контрагент
 */
'customer_name'?: string;

/**
 * Телефон контрагента
 */
'customer_phone'?: string;

/**
 * Email контрагента
 */
'customer_email'?: string;

/**
 * Email контрагента
 */
'customer_text'?: string;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: number;

/**
 * Вид перевозки
 */
'transport_kind_name'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

/**
 * Тип транспорта
 */
'transport_type_name'?: number;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Температурный режим
 */
'cargo_temperature'?: {

/**
 * Температурный режим - признак
 */
'cargo_temperature_control'?: boolean;

/**
 * Температурный режим - минимальная температура
 */
'cargo_temperature_min'?: number;

/**
 * Температурный режим - максимальная температура
 */
'cargo_temperature_max'?: number;
};

/**
 * Наличие батареек, элементов питания или жидкостей
 */
'cargo_danger'?: boolean;

/**
 * Грузовые места
 */
'cargo_places'?: Array<{

/**
 * Номер места
 */
'num'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'stacking'?: boolean;

/**
 * Длина, см
 */
'length'?: number;

/**
 * Ширина, см
 */
'width'?: number;

/**
 * Высота, см
 */
'height'?: number;

/**
 * Вес, кг
 */
'weight'?: number;

/**
 * Количество
 */
'count'?: number;
}>;

/**
 * Раздельные места
 */
'cargo_separately'?: boolean;

/**
 * Итого мест
 */
'cargo_places_count'?: number;

/**
 * Итого вес
 */
'cargo_places_weight'?: number;

/**
 * Итого объем
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес
 */
'cargo_places_paid_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Стоимость груза
 */
'cargo_cost'?: number;

/**
 * Валюта стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Груз
 */
'cargo_text'?: string;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'cargo_places_stacking'?: boolean;

/**
 * Паспорта безопасности (файлы)
 */
'cargo_file'?: {
};

/**
 * Город отправления (ID берем из запроса - direction_city)
 */
'departure_city_id'?: number;

/**
 * Город отправления
 */
'departure_city_name'?: string;

/**
 * Страна отправления (ID берем из запроса - direction_country)
 */
'departure_country_id'?: number;

/**
 * Страна отправления
 */
'departure_country_name'?: string;

/**
 * Аэропорт вылета (ID берем из запроса - direction_point)
 */
'departure_point_id'?: number;

/**
 * Аэропорт вылета
 */
'departure_point_name'?: string;

/**
 * Отправление
 */
'departure_text'?: string;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Город назначения (ID берем из запроса - direction_city)
 */
'arrival_city_id'?: number;

/**
 * Город назначения
 */
'arrival_city_name'?: string;

/**
 * Страна назначения (ID берем из запроса - direction_country)
 */
'arrival_country_id'?: number;

/**
 * Страна назначения
 */
'arrival_country_name'?: string;

/**
 * Аэропорт прибытия (ID берем из запроса - direction_point)
 */
'arrival_point_id'?: number;

/**
 * Аэропорт прибытия
 */
'arrival_point_name'?: string;

/**
 * Прибытие
 */
'arrival_text'?: string;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Рейсы (ID берем из запроса - direction_flight)
 */
'departure_flight'?: string;

/**
 * Условия поставки по Инкотермс (ID берем из запроса - request_incoterms)
 */
'incoterms_id'?: number;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

/**
 * Ставки дали
 */
'rates'?: string;

/**
 * Минимальная ставка Подрядчик ID
 */
'rate_contractor_id'?: number;

/**
 * Минимальная ставка Подрядчик
 */
'rate_contractor_name'?: string;

/**
 * Минимальная ставка Срок, дней
 */
'rate_delivery_days'?: string;

/**
 * Минимальная ставка Сумма
 */
'rate_delivery_cost'?: string;

/**
 * Профит сумма
 */
'profit_amount'?: string;

/**
 * Профит процент
 */
'profit_percent'?: string;

/**
 * Ставка клиенту
 */
'bid_client'?: string;

/**
 * Признак начала торгов
 */
'flag_bidding_start'?: boolean;

/**
 * Время начала торгов
 */
'time_bidding_start'?: string;

/**
 * Время рассылки информации по торгам
 */
'time_bidding_send'?: string;

/**
 * Услуги включаемые в ставку (ID берем из запроса - request_services)
 */
'services'?: Array<string>;

/**
 * Дополнительные услуги включаемые в ставку (ID берем из запроса - request_services_additional)
 */
'services_optional'?: Array<string>;

/**
 * Примечание по Запросу
 */
'comment'?: string;

/**
 * Статус Запроса (ID берем из запроса - request_status)
 */
'status_id'?: number;

/**
 * Статус CRM (ID берем из запроса - request_status_crm)
 */
'status_crm_id'?: number;

/**
 * Статус CRM
 */
'status_crm_name'?: string;

/**
 * Ответственный инициатор (ID берем из запроса - company_employee_list)
 */
'manager_initiator_id'?: number;

/**
 * Ответственный инициатор
 */
'manager_initiator_name'?: string;

/**
 * Ответственный создатель (ID берем из запроса - company_employee_list)
 */
'manager_creator_id'?: number;

/**
 * Ответственный создатель
 */
'manager_creator_name'?: string;

/**
 * Ответственный исполнитель (ID берем из запроса - company_employee_list)
 */
'manager_executor_id'?: number;

/**
 * Ответственный исполнитель
 */
'manager_executor_name'?: string;

/**
 * Дата создания
 */
'time_add'?: string;

/**
 * Документы (файлы)
 */
'documents_file'?: {
};
} => r.body)
    );
  }

  /** Path part for operation `requestCreate()` */
  static readonly RequestCreatePath = '/request_create';

  /**
   * Запросы: добавление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestCreate$Response(
    params?: {
      body?: {

/**
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id': number;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id': number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id': number;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id': number;

/**
 * Тип транспорта
 */
'transport_type_name'?: number;

/**
 * Наименование груза
 */
'cargo_description': string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Температурный режим
 */
'cargo_temperature'?: {

/**
 * Температурный режим - признак
 */
'cargo_temperature_control'?: boolean;

/**
 * Температурный режим - минимальная температура
 */
'cargo_temperature_min'?: number;

/**
 * Температурный режим - максимальная температура
 */
'cargo_temperature_max'?: number;
};

/**
 * Наличие батареек, элементов питания или жидкостей
 */
'cargo_danger'?: boolean;

/**
 * Грузовые места
 */
'cargo_places'?: Array<{

/**
 * Номер места
 */
'num'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'stacking'?: boolean;

/**
 * Длина, см
 */
'length'?: number;

/**
 * Ширина, см
 */
'width'?: number;

/**
 * Высота, см
 */
'height'?: number;

/**
 * Вес, кг
 */
'weight'?: number;

/**
 * Количество
 */
'count'?: number;
}>;

/**
 * Раздельные места
 */
'cargo_separately'?: boolean;

/**
 * Итого мест
 */
'cargo_places_count'?: number;

/**
 * Итого вес
 */
'cargo_places_weight'?: number;

/**
 * Итого объем
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес
 */
'cargo_places_paid_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Стоимость груза
 */
'cargo_cost'?: number;

/**
 * Валюта стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'cargo_places_stacking'?: boolean;

/**
 * Город отправления (ID берем из запроса - direction_city)
 */
'departure_city_id': number;

/**
 * Страна отправления (ID берем из запроса - direction_country)
 */
'departure_country_id': number;

/**
 * Аэропорт вылета (ID берем из запроса - direction_point)
 */
'departure_point_id'?: number;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Город назначения (ID берем из запроса - direction_city)
 */
'arrival_city_id': number;

/**
 * Страна назначения (ID берем из запроса - direction_country)
 */
'arrival_country_id': number;

/**
 * Аэропорт прибытия (ID берем из запроса - direction_point)
 */
'arrival_point_id'?: number;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Рейсы (ID берем из запроса - direction_flight)
 */
'departure_flight'?: string;

/**
 * Условия поставки по Инкотермс (ID берем из запроса - request_incoterms)
 */
'incoterms_id'?: number;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Признак начала торгов
 */
'flag_bidding_start'?: boolean;

/**
 * Услуги включаемые в ставку (ID берем из запроса - request_services)
 */
'services'?: Array<string>;

/**
 * Дополнительные услуги включаемые в ставку (ID берем из запроса - request_services_additional)
 */
'services_optional'?: Array<string>;

/**
 * Примечание по Запросу
 */
'comment'?: string;
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestCreatePath, 'post');
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
   * Запросы: добавление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestCreate(
    params?: {
      body?: {

/**
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id': number;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id': number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id': number;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id': number;

/**
 * Тип транспорта
 */
'transport_type_name'?: number;

/**
 * Наименование груза
 */
'cargo_description': string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Температурный режим
 */
'cargo_temperature'?: {

/**
 * Температурный режим - признак
 */
'cargo_temperature_control'?: boolean;

/**
 * Температурный режим - минимальная температура
 */
'cargo_temperature_min'?: number;

/**
 * Температурный режим - максимальная температура
 */
'cargo_temperature_max'?: number;
};

/**
 * Наличие батареек, элементов питания или жидкостей
 */
'cargo_danger'?: boolean;

/**
 * Грузовые места
 */
'cargo_places'?: Array<{

/**
 * Номер места
 */
'num'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'stacking'?: boolean;

/**
 * Длина, см
 */
'length'?: number;

/**
 * Ширина, см
 */
'width'?: number;

/**
 * Высота, см
 */
'height'?: number;

/**
 * Вес, кг
 */
'weight'?: number;

/**
 * Количество
 */
'count'?: number;
}>;

/**
 * Раздельные места
 */
'cargo_separately'?: boolean;

/**
 * Итого мест
 */
'cargo_places_count'?: number;

/**
 * Итого вес
 */
'cargo_places_weight'?: number;

/**
 * Итого объем
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес
 */
'cargo_places_paid_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Стоимость груза
 */
'cargo_cost'?: number;

/**
 * Валюта стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'cargo_places_stacking'?: boolean;

/**
 * Город отправления (ID берем из запроса - direction_city)
 */
'departure_city_id': number;

/**
 * Страна отправления (ID берем из запроса - direction_country)
 */
'departure_country_id': number;

/**
 * Аэропорт вылета (ID берем из запроса - direction_point)
 */
'departure_point_id'?: number;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Город назначения (ID берем из запроса - direction_city)
 */
'arrival_city_id': number;

/**
 * Страна назначения (ID берем из запроса - direction_country)
 */
'arrival_country_id': number;

/**
 * Аэропорт прибытия (ID берем из запроса - direction_point)
 */
'arrival_point_id'?: number;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Рейсы (ID берем из запроса - direction_flight)
 */
'departure_flight'?: string;

/**
 * Условия поставки по Инкотермс (ID берем из запроса - request_incoterms)
 */
'incoterms_id'?: number;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Признак начала торгов
 */
'flag_bidding_start'?: boolean;

/**
 * Услуги включаемые в ставку (ID берем из запроса - request_services)
 */
'services'?: Array<string>;

/**
 * Дополнительные услуги включаемые в ставку (ID берем из запроса - request_services_additional)
 */
'services_optional'?: Array<string>;

/**
 * Примечание по Запросу
 */
'comment'?: string;
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
    return this.requestCreate$Response(params, context).pipe(
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

  /** Path part for operation `requestUpdate()` */
  static readonly RequestUpdatePath = '/request_update';

  /**
   * Запросы: обновление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestUpdate$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: number;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

/**
 * Тип транспорта
 */
'transport_type_name'?: number;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Температурный режим
 */
'cargo_temperature'?: {

/**
 * Температурный режим - признак
 */
'cargo_temperature_control'?: boolean;

/**
 * Температурный режим - минимальная температура
 */
'cargo_temperature_min'?: number;

/**
 * Температурный режим - максимальная температура
 */
'cargo_temperature_max'?: number;
};

/**
 * Наличие батареек, элементов питания или жидкостей
 */
'cargo_danger'?: boolean;

/**
 * Грузовые места
 */
'cargo_places'?: Array<{

/**
 * Номер места
 */
'num'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'stacking'?: boolean;

/**
 * Длина, см
 */
'length'?: number;

/**
 * Ширина, см
 */
'width'?: number;

/**
 * Высота, см
 */
'height'?: number;

/**
 * Вес, кг
 */
'weight'?: number;

/**
 * Количество
 */
'count'?: number;
}>;

/**
 * Раздельные места
 */
'cargo_separately'?: boolean;

/**
 * Итого мест
 */
'cargo_places_count'?: number;

/**
 * Итого вес
 */
'cargo_places_weight'?: number;

/**
 * Итого объем
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес
 */
'cargo_places_paid_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Стоимость груза
 */
'cargo_cost'?: number;

/**
 * Валюта стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'cargo_places_stacking'?: boolean;

/**
 * Город отправления (ID берем из запроса - direction_city)
 */
'departure_city_id'?: number;

/**
 * Страна отправления (ID берем из запроса - direction_country)
 */
'departure_country_id'?: number;

/**
 * Аэропорт вылета (ID берем из запроса - direction_point)
 */
'departure_point_id'?: number;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Город назначения (ID берем из запроса - direction_city)
 */
'arrival_city_id'?: number;

/**
 * Страна назначения (ID берем из запроса - direction_country)
 */
'arrival_country_id'?: number;

/**
 * Аэропорт прибытия (ID берем из запроса - direction_point)
 */
'arrival_point_id'?: number;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Рейсы (ID берем из запроса - direction_flight)
 */
'departure_flight'?: string;

/**
 * Условия поставки по Инкотермс (ID берем из запроса - request_incoterms)
 */
'incoterms_id'?: number;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Признак начала торгов
 */
'flag_bidding_start'?: boolean;

/**
 * Услуги включаемые в ставку (ID берем из запроса - request_services)
 */
'services'?: Array<string>;

/**
 * Дополнительные услуги включаемые в ставку (ID берем из запроса - request_services_additional)
 */
'services_optional'?: Array<string>;

/**
 * Примечание по Запросу
 */
'comment'?: string;

/**
 * Статус Запроса (ID берем из запроса - request_status)
 */
'status_id'?: number;

/**
 * Статус CRM (ID берем из запроса - request_status_crm)
 */
'status_crm_id'?: number;

/**
 * Статус CRM
 */
'status_crm_name'?: string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestUpdatePath, 'post');
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
   * Запросы: обновление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestUpdate(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: number;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

/**
 * Тип транспорта
 */
'transport_type_name'?: number;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Температурный режим
 */
'cargo_temperature'?: {

/**
 * Температурный режим - признак
 */
'cargo_temperature_control'?: boolean;

/**
 * Температурный режим - минимальная температура
 */
'cargo_temperature_min'?: number;

/**
 * Температурный режим - максимальная температура
 */
'cargo_temperature_max'?: number;
};

/**
 * Наличие батареек, элементов питания или жидкостей
 */
'cargo_danger'?: boolean;

/**
 * Грузовые места
 */
'cargo_places'?: Array<{

/**
 * Номер места
 */
'num'?: number;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'stacking'?: boolean;

/**
 * Длина, см
 */
'length'?: number;

/**
 * Ширина, см
 */
'width'?: number;

/**
 * Высота, см
 */
'height'?: number;

/**
 * Вес, кг
 */
'weight'?: number;

/**
 * Количество
 */
'count'?: number;
}>;

/**
 * Раздельные места
 */
'cargo_separately'?: boolean;

/**
 * Итого мест
 */
'cargo_places_count'?: number;

/**
 * Итого вес
 */
'cargo_places_weight'?: number;

/**
 * Итого объем
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес
 */
'cargo_places_paid_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Стоимость груза
 */
'cargo_cost'?: number;

/**
 * Валюта стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Признак возможности штабелировать груз (ID берем из запроса - cargo_package)
 */
'cargo_places_stacking'?: boolean;

/**
 * Город отправления (ID берем из запроса - direction_city)
 */
'departure_city_id'?: number;

/**
 * Страна отправления (ID берем из запроса - direction_country)
 */
'departure_country_id'?: number;

/**
 * Аэропорт вылета (ID берем из запроса - direction_point)
 */
'departure_point_id'?: number;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Город назначения (ID берем из запроса - direction_city)
 */
'arrival_city_id'?: number;

/**
 * Страна назначения (ID берем из запроса - direction_country)
 */
'arrival_country_id'?: number;

/**
 * Аэропорт прибытия (ID берем из запроса - direction_point)
 */
'arrival_point_id'?: number;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Рейсы (ID берем из запроса - direction_flight)
 */
'departure_flight'?: string;

/**
 * Условия поставки по Инкотермс (ID берем из запроса - request_incoterms)
 */
'incoterms_id'?: number;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Признак начала торгов
 */
'flag_bidding_start'?: boolean;

/**
 * Услуги включаемые в ставку (ID берем из запроса - request_services)
 */
'services'?: Array<string>;

/**
 * Дополнительные услуги включаемые в ставку (ID берем из запроса - request_services_additional)
 */
'services_optional'?: Array<string>;

/**
 * Примечание по Запросу
 */
'comment'?: string;

/**
 * Статус Запроса (ID берем из запроса - request_status)
 */
'status_id'?: number;

/**
 * Статус CRM (ID берем из запроса - request_status_crm)
 */
'status_crm_id'?: number;

/**
 * Статус CRM
 */
'status_crm_name'?: string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.requestUpdate$Response(params, context).pipe(
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

  /** Path part for operation `requestDelete()` */
  static readonly RequestDeletePath = '/request_delete';

  /**
   * Удаление запроса.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestDelete$Response(
    params?: {
      body?: {

/**
 * ID удаляемого запроса
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestDeletePath, 'post');
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
   * Удаление запроса.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestDelete(
    params?: {
      body?: {

/**
 * ID удаляемого запроса
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
    return this.requestDelete$Response(params, context).pipe(
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

  /** Path part for operation `requestFiles()` */
  static readonly RequestFilesPath = '/request_files';

  /**
   * Список файлов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestFiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestFiles$Response(
    params: {

    /**
     * ID элемента
     */
      item_id: number;

    /**
     * Переменная формы
     */
      var?: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

/**
 * ID элемента
 */
'item_id': number;

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
}>>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestFilesPath, 'get');
    if (params) {
      rb.query('item_id', params.item_id, {});
      rb.query('var', params.var, {});
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
         * ID элемента
         */
        'item_id': number;
        
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
        }>>;
      })
    );
  }

  /**
   * Список файлов.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestFiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestFiles(
    params: {

    /**
     * ID элемента
     */
      item_id: number;

    /**
     * Переменная формы
     */
      var?: string;
    },
    context?: HttpContext
  ): Observable<Array<{

/**
 * ID
 */
'id': number;

/**
 * ID элемента
 */
'item_id': number;

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
    return this.requestFiles$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * ID
 */
'id': number;

/**
 * ID элемента
 */
'item_id': number;

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
}>>): Array<{

/**
 * ID
 */
'id': number;

/**
 * ID элемента
 */
'item_id': number;

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
}> => r.body)
    );
  }

  /** Path part for operation `requestFileCreate()` */
  static readonly RequestFileCreatePath = '/request_file_create';

  /**
   * Файлы: добавление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestFileCreate()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  requestFileCreate$Response(
    params?: {
      body?: {

/**
 * ID элемента
 */
'item_id': number;

/**
 * Переменная формы
 */
'var': string;

/**
 * Файл
 */
'file': file;
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestFileCreatePath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
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
   * Файлы: добавление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestFileCreate$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  requestFileCreate(
    params?: {
      body?: {

/**
 * ID элемента
 */
'item_id': number;

/**
 * Переменная формы
 */
'var': string;

/**
 * Файл
 */
'file': file;
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
    return this.requestFileCreate$Response(params, context).pipe(
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

  /** Path part for operation `requestFileDelete()` */
  static readonly RequestFileDeletePath = '/request_file_delete';

  /**
   * Файлы: удаление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestFileDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestFileDelete$Response(
    params?: {
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
 * Переменная формы
 */
'var': string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestFileDeletePath, 'post');
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
   * Файлы: удаление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestFileDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestFileDelete(
    params?: {
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
 * Переменная формы
 */
'var': string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.requestFileDelete$Response(params, context).pipe(
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

  /** Path part for operation `requestContractorSelectGet()` */
  static readonly RequestContractorSelectGetPath = '/request_contractor_select_get';

  /**
   * Получение ID контрагентов выбранных для отправки запроса.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestContractorSelectGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestContractorSelectGet$Response(
    params: {

    /**
     * ID запроса
     */
      id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * ID Контрагента
 */
'contractor_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestContractorSelectGetPath, 'get');
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
         * ID Контрагента
         */
        'contractor_id'?: number;
        
        /**
         * Время создания
         */
        'time_add'?: string;
        }>;
      })
    );
  }

  /**
   * Получение ID контрагентов выбранных для отправки запроса.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestContractorSelectGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestContractorSelectGet(
    params: {

    /**
     * ID запроса
     */
      id: number;
    },
    context?: HttpContext
  ): Observable<{

/**
 * ID Контрагента
 */
'contractor_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;
}> {
    return this.requestContractorSelectGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID Контрагента
 */
'contractor_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;
}>): {

/**
 * ID Контрагента
 */
'contractor_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;
} => r.body)
    );
  }

  /** Path part for operation `requestContractorSelectUpdate()` */
  static readonly RequestContractorSelectUpdatePath = '/request_contractor_select_update';

  /**
   * Обновление выбора контрагента для отправки запроса.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestContractorSelectUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestContractorSelectUpdate$Response(
    params?: {
      body?: {

/**
 * ID запроса
 */
'id': number;

/**
 * ID Контрагента
 */
'contractor_id'?: Array<number>;

/**
 * Признак выделения
 */
'checked'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestContractorSelectUpdatePath, 'post');
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
   * Обновление выбора контрагента для отправки запроса.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestContractorSelectUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestContractorSelectUpdate(
    params?: {
      body?: {

/**
 * ID запроса
 */
'id': number;

/**
 * ID Контрагента
 */
'contractor_id'?: Array<number>;

/**
 * Признак выделения
 */
'checked'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.requestContractorSelectUpdate$Response(params, context).pipe(
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

  /** Path part for operation `requestSaveBidding()` */
  static readonly RequestSaveBiddingPath = '/request_save_bidding';

  /**
   * Проверка и сохранения выбора контрагентов для отправки запроса.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestSaveBidding()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestSaveBidding$Response(
    params?: {
      body?: {

/**
 * ID запроса
 */
'id': number;

/**
 * Подтверждение (игнорировать ошибки)
 */
'confirm'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestSaveBiddingPath, 'post');
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
   * Проверка и сохранения выбора контрагентов для отправки запроса.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestSaveBidding$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestSaveBidding(
    params?: {
      body?: {

/**
 * ID запроса
 */
'id': number;

/**
 * Подтверждение (игнорировать ошибки)
 */
'confirm'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.requestSaveBidding$Response(params, context).pipe(
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

  /** Path part for operation `requestStatus()` */
  static readonly RequestStatusPath = '/request_status';

  /**
   * Статусы запроса.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestStatus$Response(
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
 * Тип
 */
'type'?: string;

/**
 * Цвет
 */
'color_name'?: string;
}>>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestStatusPath, 'get');
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
         * Тип
         */
        'type'?: string;
        
        /**
         * Цвет
         */
        'color_name'?: string;
        }>>;
      })
    );
  }

  /**
   * Статусы запроса.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestStatus(
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
 * Тип
 */
'type'?: string;

/**
 * Цвет
 */
'color_name'?: string;
}>> {
    return this.requestStatus$Response(params, context).pipe(
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
 * Тип
 */
'type'?: string;

/**
 * Цвет
 */
'color_name'?: string;
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
 * Тип
 */
'type'?: string;

/**
 * Цвет
 */
'color_name'?: string;
}> => r.body)
    );
  }

  /** Path part for operation `requestStatusCrm()` */
  static readonly RequestStatusCrmPath = '/request_status_crm';

  /**
   * Статусы CRM.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestStatusCrm()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestStatusCrm$Response(
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
 * Тип
 */
'type'?: string;

/**
 * Цвет
 */
'color_name'?: string;
}>>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestStatusCrmPath, 'get');
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
         * Тип
         */
        'type'?: string;
        
        /**
         * Цвет
         */
        'color_name'?: string;
        }>>;
      })
    );
  }

  /**
   * Статусы CRM.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestStatusCrm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestStatusCrm(
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
 * Тип
 */
'type'?: string;

/**
 * Цвет
 */
'color_name'?: string;
}>> {
    return this.requestStatusCrm$Response(params, context).pipe(
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
 * Тип
 */
'type'?: string;

/**
 * Цвет
 */
'color_name'?: string;
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
 * Тип
 */
'type'?: string;

/**
 * Цвет
 */
'color_name'?: string;
}> => r.body)
    );
  }

  /** Path part for operation `requestType()` */
  static readonly RequestTypePath = '/request_type';

  /**
   * Вид запроса.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestType()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestType$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Ключ
 */
'key'?: string;

/**
 * Наименование
 */
'name'?: string;
}>>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestTypePath, 'get');
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
         * Ключ
         */
        'key'?: string;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>>;
      })
    );
  }

  /**
   * Вид запроса.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestType(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Ключ
 */
'key'?: string;

/**
 * Наименование
 */
'name'?: string;
}>> {
    return this.requestType$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Ключ
 */
'key'?: string;

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
 * Ключ
 */
'key'?: string;

/**
 * Наименование
 */
'name'?: string;
}> => r.body)
    );
  }

  /** Path part for operation `requestServices()` */
  static readonly RequestServicesPath = '/request_services';

  /**
   * Услуги включаемые в ставку.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestServices()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestServices$Response(
    params: {

    /**
     * Вид перевозки (ID берем из запроса - transport_kind)
     */
      kind_id: number;
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestServicesPath, 'get');
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
   * Услуги включаемые в ставку.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestServices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestServices(
    params: {

    /**
     * Вид перевозки (ID берем из запроса - transport_kind)
     */
      kind_id: number;
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
    return this.requestServices$Response(params, context).pipe(
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

  /** Path part for operation `requestServicesAdditional()` */
  static readonly RequestServicesAdditionalPath = '/request_services_additional';

  /**
   * Дополнительные услуги включаемые в ставку.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestServicesAdditional()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestServicesAdditional$Response(
    params: {

    /**
     * Вид перевозки (ID берем из запроса - transport_kind)
     */
      kind_id: number;
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestServicesAdditionalPath, 'get');
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
   * Дополнительные услуги включаемые в ставку.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestServicesAdditional$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestServicesAdditional(
    params: {

    /**
     * Вид перевозки (ID берем из запроса - transport_kind)
     */
      kind_id: number;
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
    return this.requestServicesAdditional$Response(params, context).pipe(
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

  /** Path part for operation `requestIncoterms()` */
  static readonly RequestIncotermsPath = '/request_incoterms';

  /**
   * Условие поставки (Incoterms).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestIncoterms()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestIncoterms$Response(
    params: {

    /**
     * Вид перевозки (ID берем из запроса - transport_kind)
     */
      kind_id: number;
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
 * Услуги
 */
'services_id'?: Array<string>;
}>>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestIncotermsPath, 'get');
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
        
        /**
         * Услуги
         */
        'services_id'?: Array<string>;
        }>>;
      })
    );
  }

  /**
   * Условие поставки (Incoterms).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestIncoterms$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestIncoterms(
    params: {

    /**
     * Вид перевозки (ID берем из запроса - transport_kind)
     */
      kind_id: number;
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
 * Услуги
 */
'services_id'?: Array<string>;
}>> {
    return this.requestIncoterms$Response(params, context).pipe(
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
 * Услуги
 */
'services_id'?: Array<string>;
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
 * Услуги
 */
'services_id'?: Array<string>;
}> => r.body)
    );
  }

  /** Path part for operation `requestExport()` */
  static readonly RequestExportPath = '/request_export';

  /**
   * Экспорт запросов в XLSX.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestExport()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestExport$Response(
    params?: {

    /**
     * Поиск запроса по номеру...
     */
      id?: string;

    /**
     * Период (day, week, month, dd.mm.YYYY-dd.mm.YYYY)
     */
      time_add?: any;

    /**
     * Статус запроса (ID берем из запроса - request_status)
     */
      status_id?: Array<string>;

    /**
     * Вид запроса (ID берем из запроса - request_type)
     */
      request_type_id?: number;

    /**
     * Статус CRM (ID берем из запроса - request_status_crm)
     */
      status_crm_id?: Array<string>;

    /**
     * Страна отправления (ID берем из запроса - direction_country)
     */
      departure_country_id?: number;

    /**
     * Страна назначения (ID берем из запроса - direction_country)
     */
      arrival_country_id?: number;

    /**
     * Клиент (ID берем из запроса - customer_list)
     */
      customer_id?: number;

    /**
     * Подрядчик (ID берем из запроса - contractor_list)
     */
      rate_contractor_id?: number;

    /**
     * Город отправления (ID берем из запроса - direction_city)
     */
      departure_city_id?: number;

    /**
     * Город назначения (ID берем из запроса - direction_city)
     */
      arrival_city_id?: number;

    /**
     * Сотрудник (ID берем из запроса - company_employee_list)
     */
      manager_executor_id?: number;

    /**
     * Вид перевозки (ID берем из запроса - transport_kind)
     */
      transport_kind_id?: number;

    /**
     * Сортировка
     */
      sort?: Array<{

/**
 * Поле сортировки
 */
'field'?: 'id' | 'time_add';

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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestExportPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
      rb.query('time_add', params.time_add, {});
      rb.query('status_id', params.status_id, {"style":"form","explode":false});
      rb.query('request_type_id', params.request_type_id, {});
      rb.query('status_crm_id', params.status_crm_id, {"style":"form","explode":false});
      rb.query('departure_country_id', params.departure_country_id, {});
      rb.query('arrival_country_id', params.arrival_country_id, {});
      rb.query('customer_id', params.customer_id, {});
      rb.query('rate_contractor_id', params.rate_contractor_id, {});
      rb.query('departure_city_id', params.departure_city_id, {});
      rb.query('arrival_city_id', params.arrival_city_id, {});
      rb.query('manager_executor_id', params.manager_executor_id, {});
      rb.query('transport_kind_id', params.transport_kind_id, {});
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
   * Экспорт запросов в XLSX.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestExport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestExport(
    params?: {

    /**
     * Поиск запроса по номеру...
     */
      id?: string;

    /**
     * Период (day, week, month, dd.mm.YYYY-dd.mm.YYYY)
     */
      time_add?: any;

    /**
     * Статус запроса (ID берем из запроса - request_status)
     */
      status_id?: Array<string>;

    /**
     * Вид запроса (ID берем из запроса - request_type)
     */
      request_type_id?: number;

    /**
     * Статус CRM (ID берем из запроса - request_status_crm)
     */
      status_crm_id?: Array<string>;

    /**
     * Страна отправления (ID берем из запроса - direction_country)
     */
      departure_country_id?: number;

    /**
     * Страна назначения (ID берем из запроса - direction_country)
     */
      arrival_country_id?: number;

    /**
     * Клиент (ID берем из запроса - customer_list)
     */
      customer_id?: number;

    /**
     * Подрядчик (ID берем из запроса - contractor_list)
     */
      rate_contractor_id?: number;

    /**
     * Город отправления (ID берем из запроса - direction_city)
     */
      departure_city_id?: number;

    /**
     * Город назначения (ID берем из запроса - direction_city)
     */
      arrival_city_id?: number;

    /**
     * Сотрудник (ID берем из запроса - company_employee_list)
     */
      manager_executor_id?: number;

    /**
     * Вид перевозки (ID берем из запроса - transport_kind)
     */
      transport_kind_id?: number;

    /**
     * Сортировка
     */
      sort?: Array<{

/**
 * Поле сортировки
 */
'field'?: 'id' | 'time_add';

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
    return this.requestExport$Response(params, context).pipe(
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

  /** Path part for operation `requestImportTemplate()` */
  static readonly RequestImportTemplatePath = '/request_import_template';

  /**
   * Шаблон экспорта запросов в XLSX.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestImportTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestImportTemplate$Response(
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestImportTemplatePath, 'get');
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
   * Шаблон экспорта запросов в XLSX.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestImportTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestImportTemplate(
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
    return this.requestImportTemplate$Response(params, context).pipe(
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

  /** Path part for operation `requestImport()` */
  static readonly RequestImportPath = '/request_import';

  /**
   * Импорт запросов в XLSX.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestImport()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestImport$Response(
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestImportPath, 'post');
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
   * Импорт запросов в XLSX.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestImport$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestImport(
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
    return this.requestImport$Response(params, context).pipe(
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

  /** Path part for operation `requestImportConfirm()` */
  static readonly RequestImportConfirmPath = '/request_import_confirm';

  /**
   * Подтверждение импорта запросов в XLSX.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestImportConfirm()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestImportConfirm$Response(
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestImportConfirmPath, 'get');
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
   * Подтверждение импорта запросов в XLSX.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestImportConfirm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestImportConfirm(
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
    return this.requestImportConfirm$Response(params, context).pipe(
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

  /** Path part for operation `requestImportResult()` */
  static readonly RequestImportResultPath = '/request_import_result';

  /**
   * Получение файла с результатами обработки импорта в XLSX.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestImportResult()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestImportResult$Response(
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestImportResultPath, 'get');
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
   * To access the full response (for headers, for example), `requestImportResult$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestImportResult(
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
    return this.requestImportResult$Response(params, context).pipe(
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

  /** Path part for operation `requestTranslate()` */
  static readonly RequestTranslatePath = '/request_translate';

  /**
   * Данные перевода запроса.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestTranslate()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestTranslate$Response(
    params: {

    /**
     * ID запроса
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
 * Русский язык
 */
'ru'?: {

/**
 * Страна отправления
 */
'departure_country_name'?: string;

/**
 * Город отправления
 */
'departure_city_name'?: string;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Аэропорт вылета
 */
'departure_point_name'?: string;

/**
 * Страна назначения
 */
'arrival_country_name'?: string;

/**
 * Город назначения
 */
'arrival_city_name'?: string;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Аэропорт прибытия
 */
'arrival_point_name'?: string;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

/**
 * Рейсы
 */
'departure_flight_name'?: string;

/**
 * Товар
 */
'cargo_description'?: string;

/**
 * Тип груза
 */
'cargo_type_name'?: string;

/**
 * Условия перевозки
 */
'cargo_condition_carriage'?: string;

/**
 * Кол-во
 */
'cargo_places_count'?: number;

/**
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Вес, кг
 */
'cargo_places_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Оплачиваемый вес, кг
 */
'cargo_places_paid_weight'?: number;

/**
 * Габариты груза
 */
'cargo_dimensions'?: string;

/**
 * Примечание
 */
'comment'?: string;
};

/**
 * Английский язык
 */
'en'?: {

/**
 * Country of dispatch
 */
'departure_country_name'?: string;

/**
 * City of dispatch
 */
'departure_city_name'?: string;

/**
 * Address of pick-up
 */
'departure_address'?: string;

/**
 * Airport of departure
 */
'departure_point_name'?: string;

/**
 * Country of delivery
 */
'arrival_country_name'?: string;

/**
 * City of delivery
 */
'arrival_city_name'?: string;

/**
 * Address of departure
 */
'arrival_address'?: string;

/**
 * Airport of destination
 */
'arrival_point_name'?: string;

/**
 * Terms of delivery
 */
'incoterms_name'?: string;

/**
 * City/Port
 */
'incoterms_city_name'?: string;

/**
 * Type of flights
 */
'departure_flight_name'?: string;

/**
 * Commodity
 */
'cargo_description'?: string;

/**
 * Тип груза
 */
'cargo_type_name'?: string;

/**
 * Condition of carriage
 */
'cargo_condition_carriage'?: string;

/**
 * Total q-ty
 */
'cargo_places_count'?: number;

/**
 * Total m3
 */
'cargo_places_volume'?: number;

/**
 * Total kg
 */
'cargo_places_weight'?: number;

/**
 * Density
 */
'cargo_places_density'?: number;

/**
 * Chargeable weight, kg
 */
'cargo_places_paid_weight'?: number;

/**
 * Dimensions
 */
'cargo_dimensions'?: string;

/**
 * Notation
 */
'comment'?: string;
};

/**
 * Поля автоматического перевода
 */
'translate_auto'?: Array<string>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestTranslatePath, 'get');
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
         * Русский язык
         */
        'ru'?: {
        
        /**
         * Страна отправления
         */
        'departure_country_name'?: string;
        
        /**
         * Город отправления
         */
        'departure_city_name'?: string;
        
        /**
         * Адрес забора груза
         */
        'departure_address'?: string;
        
        /**
         * Аэропорт вылета
         */
        'departure_point_name'?: string;
        
        /**
         * Страна назначения
         */
        'arrival_country_name'?: string;
        
        /**
         * Город назначения
         */
        'arrival_city_name'?: string;
        
        /**
         * Адрес доставки груза
         */
        'arrival_address'?: string;
        
        /**
         * Аэропорт прибытия
         */
        'arrival_point_name'?: string;
        
        /**
         * Условия поставки по Инкотермс
         */
        'incoterms_name'?: string;
        
        /**
         * Город/Порт
         */
        'incoterms_city_name'?: string;
        
        /**
         * Рейсы
         */
        'departure_flight_name'?: string;
        
        /**
         * Товар
         */
        'cargo_description'?: string;
        
        /**
         * Тип груза
         */
        'cargo_type_name'?: string;
        
        /**
         * Условия перевозки
         */
        'cargo_condition_carriage'?: string;
        
        /**
         * Кол-во
         */
        'cargo_places_count'?: number;
        
        /**
         * Объем, м3
         */
        'cargo_places_volume'?: number;
        
        /**
         * Вес, кг
         */
        'cargo_places_weight'?: number;
        
        /**
         * Плотность, кг/м3
         */
        'cargo_places_density'?: number;
        
        /**
         * Оплачиваемый вес, кг
         */
        'cargo_places_paid_weight'?: number;
        
        /**
         * Габариты груза
         */
        'cargo_dimensions'?: string;
        
        /**
         * Примечание
         */
        'comment'?: string;
        };
        
        /**
         * Английский язык
         */
        'en'?: {
        
        /**
         * Country of dispatch
         */
        'departure_country_name'?: string;
        
        /**
         * City of dispatch
         */
        'departure_city_name'?: string;
        
        /**
         * Address of pick-up
         */
        'departure_address'?: string;
        
        /**
         * Airport of departure
         */
        'departure_point_name'?: string;
        
        /**
         * Country of delivery
         */
        'arrival_country_name'?: string;
        
        /**
         * City of delivery
         */
        'arrival_city_name'?: string;
        
        /**
         * Address of departure
         */
        'arrival_address'?: string;
        
        /**
         * Airport of destination
         */
        'arrival_point_name'?: string;
        
        /**
         * Terms of delivery
         */
        'incoterms_name'?: string;
        
        /**
         * City/Port
         */
        'incoterms_city_name'?: string;
        
        /**
         * Type of flights
         */
        'departure_flight_name'?: string;
        
        /**
         * Commodity
         */
        'cargo_description'?: string;
        
        /**
         * Тип груза
         */
        'cargo_type_name'?: string;
        
        /**
         * Condition of carriage
         */
        'cargo_condition_carriage'?: string;
        
        /**
         * Total q-ty
         */
        'cargo_places_count'?: number;
        
        /**
         * Total m3
         */
        'cargo_places_volume'?: number;
        
        /**
         * Total kg
         */
        'cargo_places_weight'?: number;
        
        /**
         * Density
         */
        'cargo_places_density'?: number;
        
        /**
         * Chargeable weight, kg
         */
        'cargo_places_paid_weight'?: number;
        
        /**
         * Dimensions
         */
        'cargo_dimensions'?: string;
        
        /**
         * Notation
         */
        'comment'?: string;
        };
        
        /**
         * Поля автоматического перевода
         */
        'translate_auto'?: Array<string>;
        }>;
      })
    );
  }

  /**
   * Данные перевода запроса.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestTranslate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestTranslate(
    params: {

    /**
     * ID запроса
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
 * Русский язык
 */
'ru'?: {

/**
 * Страна отправления
 */
'departure_country_name'?: string;

/**
 * Город отправления
 */
'departure_city_name'?: string;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Аэропорт вылета
 */
'departure_point_name'?: string;

/**
 * Страна назначения
 */
'arrival_country_name'?: string;

/**
 * Город назначения
 */
'arrival_city_name'?: string;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Аэропорт прибытия
 */
'arrival_point_name'?: string;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

/**
 * Рейсы
 */
'departure_flight_name'?: string;

/**
 * Товар
 */
'cargo_description'?: string;

/**
 * Тип груза
 */
'cargo_type_name'?: string;

/**
 * Условия перевозки
 */
'cargo_condition_carriage'?: string;

/**
 * Кол-во
 */
'cargo_places_count'?: number;

/**
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Вес, кг
 */
'cargo_places_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Оплачиваемый вес, кг
 */
'cargo_places_paid_weight'?: number;

/**
 * Габариты груза
 */
'cargo_dimensions'?: string;

/**
 * Примечание
 */
'comment'?: string;
};

/**
 * Английский язык
 */
'en'?: {

/**
 * Country of dispatch
 */
'departure_country_name'?: string;

/**
 * City of dispatch
 */
'departure_city_name'?: string;

/**
 * Address of pick-up
 */
'departure_address'?: string;

/**
 * Airport of departure
 */
'departure_point_name'?: string;

/**
 * Country of delivery
 */
'arrival_country_name'?: string;

/**
 * City of delivery
 */
'arrival_city_name'?: string;

/**
 * Address of departure
 */
'arrival_address'?: string;

/**
 * Airport of destination
 */
'arrival_point_name'?: string;

/**
 * Terms of delivery
 */
'incoterms_name'?: string;

/**
 * City/Port
 */
'incoterms_city_name'?: string;

/**
 * Type of flights
 */
'departure_flight_name'?: string;

/**
 * Commodity
 */
'cargo_description'?: string;

/**
 * Тип груза
 */
'cargo_type_name'?: string;

/**
 * Condition of carriage
 */
'cargo_condition_carriage'?: string;

/**
 * Total q-ty
 */
'cargo_places_count'?: number;

/**
 * Total m3
 */
'cargo_places_volume'?: number;

/**
 * Total kg
 */
'cargo_places_weight'?: number;

/**
 * Density
 */
'cargo_places_density'?: number;

/**
 * Chargeable weight, kg
 */
'cargo_places_paid_weight'?: number;

/**
 * Dimensions
 */
'cargo_dimensions'?: string;

/**
 * Notation
 */
'comment'?: string;
};

/**
 * Поля автоматического перевода
 */
'translate_auto'?: Array<string>;
}> {
    return this.requestTranslate$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * Русский язык
 */
'ru'?: {

/**
 * Страна отправления
 */
'departure_country_name'?: string;

/**
 * Город отправления
 */
'departure_city_name'?: string;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Аэропорт вылета
 */
'departure_point_name'?: string;

/**
 * Страна назначения
 */
'arrival_country_name'?: string;

/**
 * Город назначения
 */
'arrival_city_name'?: string;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Аэропорт прибытия
 */
'arrival_point_name'?: string;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

/**
 * Рейсы
 */
'departure_flight_name'?: string;

/**
 * Товар
 */
'cargo_description'?: string;

/**
 * Тип груза
 */
'cargo_type_name'?: string;

/**
 * Условия перевозки
 */
'cargo_condition_carriage'?: string;

/**
 * Кол-во
 */
'cargo_places_count'?: number;

/**
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Вес, кг
 */
'cargo_places_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Оплачиваемый вес, кг
 */
'cargo_places_paid_weight'?: number;

/**
 * Габариты груза
 */
'cargo_dimensions'?: string;

/**
 * Примечание
 */
'comment'?: string;
};

/**
 * Английский язык
 */
'en'?: {

/**
 * Country of dispatch
 */
'departure_country_name'?: string;

/**
 * City of dispatch
 */
'departure_city_name'?: string;

/**
 * Address of pick-up
 */
'departure_address'?: string;

/**
 * Airport of departure
 */
'departure_point_name'?: string;

/**
 * Country of delivery
 */
'arrival_country_name'?: string;

/**
 * City of delivery
 */
'arrival_city_name'?: string;

/**
 * Address of departure
 */
'arrival_address'?: string;

/**
 * Airport of destination
 */
'arrival_point_name'?: string;

/**
 * Terms of delivery
 */
'incoterms_name'?: string;

/**
 * City/Port
 */
'incoterms_city_name'?: string;

/**
 * Type of flights
 */
'departure_flight_name'?: string;

/**
 * Commodity
 */
'cargo_description'?: string;

/**
 * Тип груза
 */
'cargo_type_name'?: string;

/**
 * Condition of carriage
 */
'cargo_condition_carriage'?: string;

/**
 * Total q-ty
 */
'cargo_places_count'?: number;

/**
 * Total m3
 */
'cargo_places_volume'?: number;

/**
 * Total kg
 */
'cargo_places_weight'?: number;

/**
 * Density
 */
'cargo_places_density'?: number;

/**
 * Chargeable weight, kg
 */
'cargo_places_paid_weight'?: number;

/**
 * Dimensions
 */
'cargo_dimensions'?: string;

/**
 * Notation
 */
'comment'?: string;
};

/**
 * Поля автоматического перевода
 */
'translate_auto'?: Array<string>;
}>): {

/**
 * ID
 */
'id': number;

/**
 * Русский язык
 */
'ru'?: {

/**
 * Страна отправления
 */
'departure_country_name'?: string;

/**
 * Город отправления
 */
'departure_city_name'?: string;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Аэропорт вылета
 */
'departure_point_name'?: string;

/**
 * Страна назначения
 */
'arrival_country_name'?: string;

/**
 * Город назначения
 */
'arrival_city_name'?: string;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Аэропорт прибытия
 */
'arrival_point_name'?: string;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

/**
 * Рейсы
 */
'departure_flight_name'?: string;

/**
 * Товар
 */
'cargo_description'?: string;

/**
 * Тип груза
 */
'cargo_type_name'?: string;

/**
 * Условия перевозки
 */
'cargo_condition_carriage'?: string;

/**
 * Кол-во
 */
'cargo_places_count'?: number;

/**
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Вес, кг
 */
'cargo_places_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Оплачиваемый вес, кг
 */
'cargo_places_paid_weight'?: number;

/**
 * Габариты груза
 */
'cargo_dimensions'?: string;

/**
 * Примечание
 */
'comment'?: string;
};

/**
 * Английский язык
 */
'en'?: {

/**
 * Country of dispatch
 */
'departure_country_name'?: string;

/**
 * City of dispatch
 */
'departure_city_name'?: string;

/**
 * Address of pick-up
 */
'departure_address'?: string;

/**
 * Airport of departure
 */
'departure_point_name'?: string;

/**
 * Country of delivery
 */
'arrival_country_name'?: string;

/**
 * City of delivery
 */
'arrival_city_name'?: string;

/**
 * Address of departure
 */
'arrival_address'?: string;

/**
 * Airport of destination
 */
'arrival_point_name'?: string;

/**
 * Terms of delivery
 */
'incoterms_name'?: string;

/**
 * City/Port
 */
'incoterms_city_name'?: string;

/**
 * Type of flights
 */
'departure_flight_name'?: string;

/**
 * Commodity
 */
'cargo_description'?: string;

/**
 * Тип груза
 */
'cargo_type_name'?: string;

/**
 * Condition of carriage
 */
'cargo_condition_carriage'?: string;

/**
 * Total q-ty
 */
'cargo_places_count'?: number;

/**
 * Total m3
 */
'cargo_places_volume'?: number;

/**
 * Total kg
 */
'cargo_places_weight'?: number;

/**
 * Density
 */
'cargo_places_density'?: number;

/**
 * Chargeable weight, kg
 */
'cargo_places_paid_weight'?: number;

/**
 * Dimensions
 */
'cargo_dimensions'?: string;

/**
 * Notation
 */
'comment'?: string;
};

/**
 * Поля автоматического перевода
 */
'translate_auto'?: Array<string>;
} => r.body)
    );
  }

  /** Path part for operation `requestTranslateSave()` */
  static readonly RequestTranslateSavePath = '/request_translate_save';

  /**
   * Сохранение перевода запроса.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestTranslateSave()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestTranslateSave$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * Русский язык
 */
'ru'?: {

/**
 * Страна отправления
 */
'departure_country_name'?: string;

/**
 * Город отправления
 */
'departure_city_name'?: string;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Аэропорт вылета
 */
'departure_point_name'?: string;

/**
 * Страна назначения
 */
'arrival_country_name'?: string;

/**
 * Город назначения
 */
'arrival_city_name'?: string;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Аэропорт прибытия
 */
'arrival_point_name'?: string;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

/**
 * Рейсы
 */
'departure_flight_name'?: string;

/**
 * Товар
 */
'cargo_description'?: string;

/**
 * Тип груза
 */
'cargo_type_name'?: string;

/**
 * Условия перевозки
 */
'cargo_condition_carriage'?: string;

/**
 * Кол-во
 */
'cargo_places_count'?: number;

/**
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Вес, кг
 */
'cargo_places_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Оплачиваемый вес, кг
 */
'cargo_places_paid_weight'?: number;

/**
 * Габариты груза
 */
'cargo_dimensions'?: string;

/**
 * Примечание
 */
'comment'?: string;
};

/**
 * Английский язык
 */
'en'?: {

/**
 * Country of dispatch
 */
'departure_country_name'?: string;

/**
 * City of dispatch
 */
'departure_city_name'?: string;

/**
 * Address of pick-up
 */
'departure_address'?: string;

/**
 * Airport of departure
 */
'departure_point_name'?: string;

/**
 * Country of delivery
 */
'arrival_country_name'?: string;

/**
 * City of delivery
 */
'arrival_city_name'?: string;

/**
 * Address of departure
 */
'arrival_address'?: string;

/**
 * Airport of destination
 */
'arrival_point_name'?: string;

/**
 * Terms of delivery
 */
'incoterms_name'?: string;

/**
 * City/Port
 */
'incoterms_city_name'?: string;

/**
 * Type of flights
 */
'departure_flight_name'?: string;

/**
 * Commodity
 */
'cargo_description'?: string;

/**
 * Тип груза
 */
'cargo_type_name'?: string;

/**
 * Condition of carriage
 */
'cargo_condition_carriage'?: string;

/**
 * Total q-ty
 */
'cargo_places_count'?: number;

/**
 * Total m3
 */
'cargo_places_volume'?: number;

/**
 * Total kg
 */
'cargo_places_weight'?: number;

/**
 * Density
 */
'cargo_places_density'?: number;

/**
 * Chargeable weight, kg
 */
'cargo_places_paid_weight'?: number;

/**
 * Dimensions
 */
'cargo_dimensions'?: string;

/**
 * Notation
 */
'comment'?: string;
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestTranslateSavePath, 'post');
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
   * Сохранение перевода запроса.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestTranslateSave$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestTranslateSave(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * Русский язык
 */
'ru'?: {

/**
 * Страна отправления
 */
'departure_country_name'?: string;

/**
 * Город отправления
 */
'departure_city_name'?: string;

/**
 * Адрес забора груза
 */
'departure_address'?: string;

/**
 * Аэропорт вылета
 */
'departure_point_name'?: string;

/**
 * Страна назначения
 */
'arrival_country_name'?: string;

/**
 * Город назначения
 */
'arrival_city_name'?: string;

/**
 * Адрес доставки груза
 */
'arrival_address'?: string;

/**
 * Аэропорт прибытия
 */
'arrival_point_name'?: string;

/**
 * Условия поставки по Инкотермс
 */
'incoterms_name'?: string;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

/**
 * Рейсы
 */
'departure_flight_name'?: string;

/**
 * Товар
 */
'cargo_description'?: string;

/**
 * Тип груза
 */
'cargo_type_name'?: string;

/**
 * Условия перевозки
 */
'cargo_condition_carriage'?: string;

/**
 * Кол-во
 */
'cargo_places_count'?: number;

/**
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Вес, кг
 */
'cargo_places_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Оплачиваемый вес, кг
 */
'cargo_places_paid_weight'?: number;

/**
 * Габариты груза
 */
'cargo_dimensions'?: string;

/**
 * Примечание
 */
'comment'?: string;
};

/**
 * Английский язык
 */
'en'?: {

/**
 * Country of dispatch
 */
'departure_country_name'?: string;

/**
 * City of dispatch
 */
'departure_city_name'?: string;

/**
 * Address of pick-up
 */
'departure_address'?: string;

/**
 * Airport of departure
 */
'departure_point_name'?: string;

/**
 * Country of delivery
 */
'arrival_country_name'?: string;

/**
 * City of delivery
 */
'arrival_city_name'?: string;

/**
 * Address of departure
 */
'arrival_address'?: string;

/**
 * Airport of destination
 */
'arrival_point_name'?: string;

/**
 * Terms of delivery
 */
'incoterms_name'?: string;

/**
 * City/Port
 */
'incoterms_city_name'?: string;

/**
 * Type of flights
 */
'departure_flight_name'?: string;

/**
 * Commodity
 */
'cargo_description'?: string;

/**
 * Тип груза
 */
'cargo_type_name'?: string;

/**
 * Condition of carriage
 */
'cargo_condition_carriage'?: string;

/**
 * Total q-ty
 */
'cargo_places_count'?: number;

/**
 * Total m3
 */
'cargo_places_volume'?: number;

/**
 * Total kg
 */
'cargo_places_weight'?: number;

/**
 * Density
 */
'cargo_places_density'?: number;

/**
 * Chargeable weight, kg
 */
'cargo_places_paid_weight'?: number;

/**
 * Dimensions
 */
'cargo_dimensions'?: string;

/**
 * Notation
 */
'comment'?: string;
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
    return this.requestTranslateSave$Response(params, context).pipe(
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

  /** Path part for operation `requestRates()` */
  static readonly RequestRatesPath = '/request_rates';

  /**
   * Ставки по запросу от контрагента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRates()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRates$Response(
    params: {

    /**
     * UID запроса (из URL)
     */
      uid: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * ID Запроса
 */
'id': number;

/**
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Country of dispatch
 */
'departure_country_name'?: string;

/**
 * City of dispatch
 */
'departure_city_name'?: string;

/**
 * Address of pick-up
 */
'departure_address'?: string;

/**
 * Airport of departure
 */
'departure_point_name'?: string;

/**
 * Country of delivery
 */
'arrival_country_name'?: string;

/**
 * City of delivery
 */
'arrival_city_name'?: string;

/**
 * Address of departure
 */
'arrival_address'?: string;

/**
 * Airport of destination
 */
'arrival_point_name'?: string;

/**
 * Terms of delivery
 */
'incoterms_name'?: string;

/**
 * City/Port
 */
'incoterms_city_name'?: string;

/**
 * Type of flights
 */
'departure_flight_name'?: string;

/**
 * Commodity
 */
'cargo_description'?: string;

/**
 * Тип груза
 */
'cargo_type_name'?: string;

/**
 * Condition of carriage
 */
'cargo_condition_carriage'?: string;

/**
 * Total q-ty
 */
'cargo_places_count'?: number;

/**
 * Total m3
 */
'cargo_places_volume'?: number;

/**
 * Total kg
 */
'cargo_places_weight'?: number;

/**
 * Density
 */
'cargo_places_density'?: number;

/**
 * Chargeable weight, kg
 */
'cargo_places_paid_weight'?: number;

/**
 * Dimensions
 */
'cargo_dimensions'?: string;

/**
 * Notation
 */
'comment'?: string;

/**
 * Документы (файлы)
 */
'documents_file'?: {
};

/**
 * Паспорта безопасности (файлы)
 */
'cargo_file'?: {
};

/**
 * Ставки
 */
'rates'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Тип ставки
 */
'rate_type': 'detail' | 'single';

/**
 * Порядковый номер
 */
'num'?: string;

/**
 * Транспортная компания (Airline) (ID берем из запроса - transport_carrier)
 */
'carrier_id': number;

/**
 * Маршрут (Route) (ID берем из запроса - transport_route)
 */
'route_id': number;

/**
 * Расписание отправления (Departure schedule)
 */
'departure_schedule'?: Array<string>;

/**
 * Ближайшие рейсы (Nearest flight etd)
 */
'nearest_flight'?: Array<string>;

/**
 * Время транзита
 */
'transit_time'?: {

/**
 * Время транзита От
 */
'transit_time_from'?: number;

/**
 * Время транзита До
 */
'transit_time_to'?: number;
};

/**
 * Стоимость (Cost)
 */
'total_cost'?: number;

/**
 * Включение прибыли (Profit is included)
 */
'profit_include'?: boolean;

/**
 * Комментарий (Your Comment)
 */
'comment'?: number;

/**
 * Значения ставок
 */
'values'?: Array<{

/**
 * Наименование поля
 */
'field': string;

/**
 * Минимальная цена
 */
'min'?: number;

/**
 * Цена за единицу
 */
'price'?: number;

/**
 * Количество
 */
'value'?: number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Общая стоимость
 */
'cost'?: number;

/**
 * Комментарий
 */
'comment'?: number;

/**
 * Признак выбора
 */
'select'?: boolean;
}>;
}>;

/**
 * Расходы
 */
'charges'?: Array<{

/**
 * Наименование переменной
 */
'field_name': string;

/**
 * Наименование
 */
'name': string;

/**
 * Заголовок
 */
'title': string;

/**
 * Примечание
 */
'note': string;

/**
 * Единица изменений
 */
'unit': string;

/**
 * Возможно минимальное значение
 */
'field_min'?: boolean;

/**
 * Возможно фиксированное значение
 */
'field_fix'?: boolean;

/**
 * Возможен комментарий
 */
'field_comment'?: boolean;

/**
 * Признак выбранного
 */
'status'?: boolean;

/**
 * Запрет изменения
 */
'requare'?: boolean;
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRatesPath, 'get');
    if (params) {
      rb.query('uid', params.uid, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * ID Запроса
         */
        'id': number;
        
        /**
         * UID
         */
        'uid': string;
        
        /**
         * Дата создания
         */
        'time_add'?: string;
        
        /**
         * Готовность
         */
        'cargo_readiness'?: string;
        
        /**
         * Country of dispatch
         */
        'departure_country_name'?: string;
        
        /**
         * City of dispatch
         */
        'departure_city_name'?: string;
        
        /**
         * Address of pick-up
         */
        'departure_address'?: string;
        
        /**
         * Airport of departure
         */
        'departure_point_name'?: string;
        
        /**
         * Country of delivery
         */
        'arrival_country_name'?: string;
        
        /**
         * City of delivery
         */
        'arrival_city_name'?: string;
        
        /**
         * Address of departure
         */
        'arrival_address'?: string;
        
        /**
         * Airport of destination
         */
        'arrival_point_name'?: string;
        
        /**
         * Terms of delivery
         */
        'incoterms_name'?: string;
        
        /**
         * City/Port
         */
        'incoterms_city_name'?: string;
        
        /**
         * Type of flights
         */
        'departure_flight_name'?: string;
        
        /**
         * Commodity
         */
        'cargo_description'?: string;
        
        /**
         * Тип груза
         */
        'cargo_type_name'?: string;
        
        /**
         * Condition of carriage
         */
        'cargo_condition_carriage'?: string;
        
        /**
         * Total q-ty
         */
        'cargo_places_count'?: number;
        
        /**
         * Total m3
         */
        'cargo_places_volume'?: number;
        
        /**
         * Total kg
         */
        'cargo_places_weight'?: number;
        
        /**
         * Density
         */
        'cargo_places_density'?: number;
        
        /**
         * Chargeable weight, kg
         */
        'cargo_places_paid_weight'?: number;
        
        /**
         * Dimensions
         */
        'cargo_dimensions'?: string;
        
        /**
         * Notation
         */
        'comment'?: string;
        
        /**
         * Документы (файлы)
         */
        'documents_file'?: {
        };
        
        /**
         * Паспорта безопасности (файлы)
         */
        'cargo_file'?: {
        };
        
        /**
         * Ставки
         */
        'rates'?: Array<{
        
        /**
         * ID
         */
        'id'?: number;
        
        /**
         * Тип ставки
         */
        'rate_type': 'detail' | 'single';
        
        /**
         * Порядковый номер
         */
        'num'?: string;
        
        /**
         * Транспортная компания (Airline) (ID берем из запроса - transport_carrier)
         */
        'carrier_id': number;
        
        /**
         * Маршрут (Route) (ID берем из запроса - transport_route)
         */
        'route_id': number;
        
        /**
         * Расписание отправления (Departure schedule)
         */
        'departure_schedule'?: Array<string>;
        
        /**
         * Ближайшие рейсы (Nearest flight etd)
         */
        'nearest_flight'?: Array<string>;
        
        /**
         * Время транзита
         */
        'transit_time'?: {
        
        /**
         * Время транзита От
         */
        'transit_time_from'?: number;
        
        /**
         * Время транзита До
         */
        'transit_time_to'?: number;
        };
        
        /**
         * Стоимость (Cost)
         */
        'total_cost'?: number;
        
        /**
         * Включение прибыли (Profit is included)
         */
        'profit_include'?: boolean;
        
        /**
         * Комментарий (Your Comment)
         */
        'comment'?: number;
        
        /**
         * Значения ставок
         */
        'values'?: Array<{
        
        /**
         * Наименование поля
         */
        'field': string;
        
        /**
         * Минимальная цена
         */
        'min'?: number;
        
        /**
         * Цена за единицу
         */
        'price'?: number;
        
        /**
         * Количество
         */
        'value'?: number;
        
        /**
         * Фиксированная надбавка
         */
        'fix'?: number;
        
        /**
         * Общая стоимость
         */
        'cost'?: number;
        
        /**
         * Комментарий
         */
        'comment'?: number;
        
        /**
         * Признак выбора
         */
        'select'?: boolean;
        }>;
        }>;
        
        /**
         * Расходы
         */
        'charges'?: Array<{
        
        /**
         * Наименование переменной
         */
        'field_name': string;
        
        /**
         * Наименование
         */
        'name': string;
        
        /**
         * Заголовок
         */
        'title': string;
        
        /**
         * Примечание
         */
        'note': string;
        
        /**
         * Единица изменений
         */
        'unit': string;
        
        /**
         * Возможно минимальное значение
         */
        'field_min'?: boolean;
        
        /**
         * Возможно фиксированное значение
         */
        'field_fix'?: boolean;
        
        /**
         * Возможен комментарий
         */
        'field_comment'?: boolean;
        
        /**
         * Признак выбранного
         */
        'status'?: boolean;
        
        /**
         * Запрет изменения
         */
        'requare'?: boolean;
        }>;
        }>;
      })
    );
  }

  /**
   * Ставки по запросу от контрагента.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRates$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRates(
    params: {

    /**
     * UID запроса (из URL)
     */
      uid: string;
    },
    context?: HttpContext
  ): Observable<{

/**
 * ID Запроса
 */
'id': number;

/**
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Country of dispatch
 */
'departure_country_name'?: string;

/**
 * City of dispatch
 */
'departure_city_name'?: string;

/**
 * Address of pick-up
 */
'departure_address'?: string;

/**
 * Airport of departure
 */
'departure_point_name'?: string;

/**
 * Country of delivery
 */
'arrival_country_name'?: string;

/**
 * City of delivery
 */
'arrival_city_name'?: string;

/**
 * Address of departure
 */
'arrival_address'?: string;

/**
 * Airport of destination
 */
'arrival_point_name'?: string;

/**
 * Terms of delivery
 */
'incoterms_name'?: string;

/**
 * City/Port
 */
'incoterms_city_name'?: string;

/**
 * Type of flights
 */
'departure_flight_name'?: string;

/**
 * Commodity
 */
'cargo_description'?: string;

/**
 * Тип груза
 */
'cargo_type_name'?: string;

/**
 * Condition of carriage
 */
'cargo_condition_carriage'?: string;

/**
 * Total q-ty
 */
'cargo_places_count'?: number;

/**
 * Total m3
 */
'cargo_places_volume'?: number;

/**
 * Total kg
 */
'cargo_places_weight'?: number;

/**
 * Density
 */
'cargo_places_density'?: number;

/**
 * Chargeable weight, kg
 */
'cargo_places_paid_weight'?: number;

/**
 * Dimensions
 */
'cargo_dimensions'?: string;

/**
 * Notation
 */
'comment'?: string;

/**
 * Документы (файлы)
 */
'documents_file'?: {
};

/**
 * Паспорта безопасности (файлы)
 */
'cargo_file'?: {
};

/**
 * Ставки
 */
'rates'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Тип ставки
 */
'rate_type': 'detail' | 'single';

/**
 * Порядковый номер
 */
'num'?: string;

/**
 * Транспортная компания (Airline) (ID берем из запроса - transport_carrier)
 */
'carrier_id': number;

/**
 * Маршрут (Route) (ID берем из запроса - transport_route)
 */
'route_id': number;

/**
 * Расписание отправления (Departure schedule)
 */
'departure_schedule'?: Array<string>;

/**
 * Ближайшие рейсы (Nearest flight etd)
 */
'nearest_flight'?: Array<string>;

/**
 * Время транзита
 */
'transit_time'?: {

/**
 * Время транзита От
 */
'transit_time_from'?: number;

/**
 * Время транзита До
 */
'transit_time_to'?: number;
};

/**
 * Стоимость (Cost)
 */
'total_cost'?: number;

/**
 * Включение прибыли (Profit is included)
 */
'profit_include'?: boolean;

/**
 * Комментарий (Your Comment)
 */
'comment'?: number;

/**
 * Значения ставок
 */
'values'?: Array<{

/**
 * Наименование поля
 */
'field': string;

/**
 * Минимальная цена
 */
'min'?: number;

/**
 * Цена за единицу
 */
'price'?: number;

/**
 * Количество
 */
'value'?: number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Общая стоимость
 */
'cost'?: number;

/**
 * Комментарий
 */
'comment'?: number;

/**
 * Признак выбора
 */
'select'?: boolean;
}>;
}>;

/**
 * Расходы
 */
'charges'?: Array<{

/**
 * Наименование переменной
 */
'field_name': string;

/**
 * Наименование
 */
'name': string;

/**
 * Заголовок
 */
'title': string;

/**
 * Примечание
 */
'note': string;

/**
 * Единица изменений
 */
'unit': string;

/**
 * Возможно минимальное значение
 */
'field_min'?: boolean;

/**
 * Возможно фиксированное значение
 */
'field_fix'?: boolean;

/**
 * Возможен комментарий
 */
'field_comment'?: boolean;

/**
 * Признак выбранного
 */
'status'?: boolean;

/**
 * Запрет изменения
 */
'requare'?: boolean;
}>;
}> {
    return this.requestRates$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID Запроса
 */
'id': number;

/**
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Country of dispatch
 */
'departure_country_name'?: string;

/**
 * City of dispatch
 */
'departure_city_name'?: string;

/**
 * Address of pick-up
 */
'departure_address'?: string;

/**
 * Airport of departure
 */
'departure_point_name'?: string;

/**
 * Country of delivery
 */
'arrival_country_name'?: string;

/**
 * City of delivery
 */
'arrival_city_name'?: string;

/**
 * Address of departure
 */
'arrival_address'?: string;

/**
 * Airport of destination
 */
'arrival_point_name'?: string;

/**
 * Terms of delivery
 */
'incoterms_name'?: string;

/**
 * City/Port
 */
'incoterms_city_name'?: string;

/**
 * Type of flights
 */
'departure_flight_name'?: string;

/**
 * Commodity
 */
'cargo_description'?: string;

/**
 * Тип груза
 */
'cargo_type_name'?: string;

/**
 * Condition of carriage
 */
'cargo_condition_carriage'?: string;

/**
 * Total q-ty
 */
'cargo_places_count'?: number;

/**
 * Total m3
 */
'cargo_places_volume'?: number;

/**
 * Total kg
 */
'cargo_places_weight'?: number;

/**
 * Density
 */
'cargo_places_density'?: number;

/**
 * Chargeable weight, kg
 */
'cargo_places_paid_weight'?: number;

/**
 * Dimensions
 */
'cargo_dimensions'?: string;

/**
 * Notation
 */
'comment'?: string;

/**
 * Документы (файлы)
 */
'documents_file'?: {
};

/**
 * Паспорта безопасности (файлы)
 */
'cargo_file'?: {
};

/**
 * Ставки
 */
'rates'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Тип ставки
 */
'rate_type': 'detail' | 'single';

/**
 * Порядковый номер
 */
'num'?: string;

/**
 * Транспортная компания (Airline) (ID берем из запроса - transport_carrier)
 */
'carrier_id': number;

/**
 * Маршрут (Route) (ID берем из запроса - transport_route)
 */
'route_id': number;

/**
 * Расписание отправления (Departure schedule)
 */
'departure_schedule'?: Array<string>;

/**
 * Ближайшие рейсы (Nearest flight etd)
 */
'nearest_flight'?: Array<string>;

/**
 * Время транзита
 */
'transit_time'?: {

/**
 * Время транзита От
 */
'transit_time_from'?: number;

/**
 * Время транзита До
 */
'transit_time_to'?: number;
};

/**
 * Стоимость (Cost)
 */
'total_cost'?: number;

/**
 * Включение прибыли (Profit is included)
 */
'profit_include'?: boolean;

/**
 * Комментарий (Your Comment)
 */
'comment'?: number;

/**
 * Значения ставок
 */
'values'?: Array<{

/**
 * Наименование поля
 */
'field': string;

/**
 * Минимальная цена
 */
'min'?: number;

/**
 * Цена за единицу
 */
'price'?: number;

/**
 * Количество
 */
'value'?: number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Общая стоимость
 */
'cost'?: number;

/**
 * Комментарий
 */
'comment'?: number;

/**
 * Признак выбора
 */
'select'?: boolean;
}>;
}>;

/**
 * Расходы
 */
'charges'?: Array<{

/**
 * Наименование переменной
 */
'field_name': string;

/**
 * Наименование
 */
'name': string;

/**
 * Заголовок
 */
'title': string;

/**
 * Примечание
 */
'note': string;

/**
 * Единица изменений
 */
'unit': string;

/**
 * Возможно минимальное значение
 */
'field_min'?: boolean;

/**
 * Возможно фиксированное значение
 */
'field_fix'?: boolean;

/**
 * Возможен комментарий
 */
'field_comment'?: boolean;

/**
 * Признак выбранного
 */
'status'?: boolean;

/**
 * Запрет изменения
 */
'requare'?: boolean;
}>;
}>): {

/**
 * ID Запроса
 */
'id': number;

/**
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Country of dispatch
 */
'departure_country_name'?: string;

/**
 * City of dispatch
 */
'departure_city_name'?: string;

/**
 * Address of pick-up
 */
'departure_address'?: string;

/**
 * Airport of departure
 */
'departure_point_name'?: string;

/**
 * Country of delivery
 */
'arrival_country_name'?: string;

/**
 * City of delivery
 */
'arrival_city_name'?: string;

/**
 * Address of departure
 */
'arrival_address'?: string;

/**
 * Airport of destination
 */
'arrival_point_name'?: string;

/**
 * Terms of delivery
 */
'incoterms_name'?: string;

/**
 * City/Port
 */
'incoterms_city_name'?: string;

/**
 * Type of flights
 */
'departure_flight_name'?: string;

/**
 * Commodity
 */
'cargo_description'?: string;

/**
 * Тип груза
 */
'cargo_type_name'?: string;

/**
 * Condition of carriage
 */
'cargo_condition_carriage'?: string;

/**
 * Total q-ty
 */
'cargo_places_count'?: number;

/**
 * Total m3
 */
'cargo_places_volume'?: number;

/**
 * Total kg
 */
'cargo_places_weight'?: number;

/**
 * Density
 */
'cargo_places_density'?: number;

/**
 * Chargeable weight, kg
 */
'cargo_places_paid_weight'?: number;

/**
 * Dimensions
 */
'cargo_dimensions'?: string;

/**
 * Notation
 */
'comment'?: string;

/**
 * Документы (файлы)
 */
'documents_file'?: {
};

/**
 * Паспорта безопасности (файлы)
 */
'cargo_file'?: {
};

/**
 * Ставки
 */
'rates'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Тип ставки
 */
'rate_type': 'detail' | 'single';

/**
 * Порядковый номер
 */
'num'?: string;

/**
 * Транспортная компания (Airline) (ID берем из запроса - transport_carrier)
 */
'carrier_id': number;

/**
 * Маршрут (Route) (ID берем из запроса - transport_route)
 */
'route_id': number;

/**
 * Расписание отправления (Departure schedule)
 */
'departure_schedule'?: Array<string>;

/**
 * Ближайшие рейсы (Nearest flight etd)
 */
'nearest_flight'?: Array<string>;

/**
 * Время транзита
 */
'transit_time'?: {

/**
 * Время транзита От
 */
'transit_time_from'?: number;

/**
 * Время транзита До
 */
'transit_time_to'?: number;
};

/**
 * Стоимость (Cost)
 */
'total_cost'?: number;

/**
 * Включение прибыли (Profit is included)
 */
'profit_include'?: boolean;

/**
 * Комментарий (Your Comment)
 */
'comment'?: number;

/**
 * Значения ставок
 */
'values'?: Array<{

/**
 * Наименование поля
 */
'field': string;

/**
 * Минимальная цена
 */
'min'?: number;

/**
 * Цена за единицу
 */
'price'?: number;

/**
 * Количество
 */
'value'?: number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Общая стоимость
 */
'cost'?: number;

/**
 * Комментарий
 */
'comment'?: number;

/**
 * Признак выбора
 */
'select'?: boolean;
}>;
}>;

/**
 * Расходы
 */
'charges'?: Array<{

/**
 * Наименование переменной
 */
'field_name': string;

/**
 * Наименование
 */
'name': string;

/**
 * Заголовок
 */
'title': string;

/**
 * Примечание
 */
'note': string;

/**
 * Единица изменений
 */
'unit': string;

/**
 * Возможно минимальное значение
 */
'field_min'?: boolean;

/**
 * Возможно фиксированное значение
 */
'field_fix'?: boolean;

/**
 * Возможен комментарий
 */
'field_comment'?: boolean;

/**
 * Признак выбранного
 */
'status'?: boolean;

/**
 * Запрет изменения
 */
'requare'?: boolean;
}>;
} => r.body)
    );
  }

  /** Path part for operation `requestRatesSave()` */
  static readonly RequestRatesSavePath = '/request_rates_save';

  /**
   * Ставки по запросу от контрагента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRatesSave()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRatesSave$Response(
    params?: {
      body?: {

/**
 * ID Запроса
 */
'id'?: number;

/**
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Ставки
 */
'rates'?: Array<{

/**
 * Тип ставки
 */
'rate_type': 'detail' | 'single';

/**
 * Порядковый номер
 */
'num'?: string;

/**
 * Транспортная компания (Airline) (ID берем из запроса - transport_carrier)
 */
'carrier_id': number;

/**
 * Маршрут (Route) (ID берем из запроса - transport_route)
 */
'route_id': number;

/**
 * Расписание отправления (Departure schedule)
 */
'departure_schedule'?: Array<string>;

/**
 * Ближайшие рейсы (Nearest flight etd)
 */
'nearest_flight'?: Array<string>;

/**
 * Время транзита
 */
'transit_time'?: {

/**
 * Время транзита От
 */
'transit_time_from'?: number;

/**
 * Время транзита До
 */
'transit_time_to'?: number;
};

/**
 * Стоимость (Cost)
 */
'total_cost'?: number;

/**
 * Включение прибыли (Profit is included)
 */
'profit_include'?: boolean;

/**
 * Комментарий (Your Comment)
 */
'comment'?: number;

/**
 * Значения ставок
 */
'values'?: Array<{

/**
 * Наименование поля
 */
'field': string;

/**
 * Минимальная цена
 */
'min'?: number;

/**
 * Цена за единицу
 */
'price'?: number;

/**
 * Количество
 */
'value'?: number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Общая стоимость
 */
'cost'?: number;

/**
 * Комментарий
 */
'comment'?: number;

/**
 * Признак выбора
 */
'select'?: boolean;
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRatesSavePath, 'post');
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
   * Ставки по запросу от контрагента.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRatesSave$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRatesSave(
    params?: {
      body?: {

/**
 * ID Запроса
 */
'id'?: number;

/**
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

/**
 * Ставки
 */
'rates'?: Array<{

/**
 * Тип ставки
 */
'rate_type': 'detail' | 'single';

/**
 * Порядковый номер
 */
'num'?: string;

/**
 * Транспортная компания (Airline) (ID берем из запроса - transport_carrier)
 */
'carrier_id': number;

/**
 * Маршрут (Route) (ID берем из запроса - transport_route)
 */
'route_id': number;

/**
 * Расписание отправления (Departure schedule)
 */
'departure_schedule'?: Array<string>;

/**
 * Ближайшие рейсы (Nearest flight etd)
 */
'nearest_flight'?: Array<string>;

/**
 * Время транзита
 */
'transit_time'?: {

/**
 * Время транзита От
 */
'transit_time_from'?: number;

/**
 * Время транзита До
 */
'transit_time_to'?: number;
};

/**
 * Стоимость (Cost)
 */
'total_cost'?: number;

/**
 * Включение прибыли (Profit is included)
 */
'profit_include'?: boolean;

/**
 * Комментарий (Your Comment)
 */
'comment'?: number;

/**
 * Значения ставок
 */
'values'?: Array<{

/**
 * Наименование поля
 */
'field': string;

/**
 * Минимальная цена
 */
'min'?: number;

/**
 * Цена за единицу
 */
'price'?: number;

/**
 * Количество
 */
'value'?: number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Общая стоимость
 */
'cost'?: number;

/**
 * Комментарий
 */
'comment'?: number;

/**
 * Признак выбора
 */
'select'?: boolean;
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
    return this.requestRatesSave$Response(params, context).pipe(
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

  /** Path part for operation `requestRateFinalList()` */
  static readonly RequestRateFinalListPath = '/request_rate_final_list';

  /**
   * Ставки итоговые.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRateFinalList()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateFinalList$Response(
    params: {

    /**
     * ID Запроса
     */
      request_id: number;

    /**
     * Подрядчики (ID берем из запроса - contractor_list)
     */
      contractor?: number;

    /**
     * Авиалинии (ID берем из запроса - transport_carrier)
     */
      carrier?: Array<string>;

    /**
     * Тип маршрута (ID берем из запроса - direction_flight)
     */
      departure_flight?: string;

    /**
     * Аэропорт вылета (ID берем из запроса - direction_point)
     */
      departure_point?: number;

    /**
     * Аэропорт прибытия (ID берем из запроса - direction_point)
     */
      arrival_point?: number;

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
'field'?: 'time_request' | 'total_cost';

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
 * Дата запроса
 */
'time_request': string;

/**
 * Подрядчик
 */
'contractor_text': string;

/**
 * Подрядчик (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * AIR
 */
'carrier_iata': number;

/**
 * Авиалиния
 */
'carrier_text': string;

/**
 * Авиалиния (ID берем из запроса - transport_carrier)
 */
'carrier_id': string;

/**
 * Тип
 */
'kind_key': string;

/**
 * Расписание
 */
'departure_schedule_text': Array<string>;

/**
 * Расписание
 */
'departure_schedule': Array<string>;

/**
 * Маршрут
 */
'route_text': string;

/**
 * Срок.дн
 */
'period': string;

/**
 * До границы
 */
'customs_rate': string;

/**
 * Локальные
 */
'local_rate': string;

/**
 * Итого
 */
'total_rate': string;
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateFinalListPath, 'get');
    if (params) {
      rb.query('request_id', params.request_id, {});
      rb.query('contractor', params.contractor, {});
      rb.query('carrier', params.carrier, {"style":"form","explode":false});
      rb.query('departure_flight', params.departure_flight, {});
      rb.query('departure_point', params.departure_point, {});
      rb.query('arrival_point', params.arrival_point, {});
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
         * Дата запроса
         */
        'time_request': string;
        
        /**
         * Подрядчик
         */
        'contractor_text': string;
        
        /**
         * Подрядчик (ID берем из запроса - contractor_list)
         */
        'contractor_id': number;
        
        /**
         * AIR
         */
        'carrier_iata': number;
        
        /**
         * Авиалиния
         */
        'carrier_text': string;
        
        /**
         * Авиалиния (ID берем из запроса - transport_carrier)
         */
        'carrier_id': string;
        
        /**
         * Тип
         */
        'kind_key': string;
        
        /**
         * Расписание
         */
        'departure_schedule_text': Array<string>;
        
        /**
         * Расписание
         */
        'departure_schedule': Array<string>;
        
        /**
         * Маршрут
         */
        'route_text': string;
        
        /**
         * Срок.дн
         */
        'period': string;
        
        /**
         * До границы
         */
        'customs_rate': string;
        
        /**
         * Локальные
         */
        'local_rate': string;
        
        /**
         * Итого
         */
        'total_rate': string;
        }>;
        }>;
      })
    );
  }

  /**
   * Ставки итоговые.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRateFinalList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateFinalList(
    params: {

    /**
     * ID Запроса
     */
      request_id: number;

    /**
     * Подрядчики (ID берем из запроса - contractor_list)
     */
      contractor?: number;

    /**
     * Авиалинии (ID берем из запроса - transport_carrier)
     */
      carrier?: Array<string>;

    /**
     * Тип маршрута (ID берем из запроса - direction_flight)
     */
      departure_flight?: string;

    /**
     * Аэропорт вылета (ID берем из запроса - direction_point)
     */
      departure_point?: number;

    /**
     * Аэропорт прибытия (ID берем из запроса - direction_point)
     */
      arrival_point?: number;

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
'field'?: 'time_request' | 'total_cost';

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
 * Дата запроса
 */
'time_request': string;

/**
 * Подрядчик
 */
'contractor_text': string;

/**
 * Подрядчик (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * AIR
 */
'carrier_iata': number;

/**
 * Авиалиния
 */
'carrier_text': string;

/**
 * Авиалиния (ID берем из запроса - transport_carrier)
 */
'carrier_id': string;

/**
 * Тип
 */
'kind_key': string;

/**
 * Расписание
 */
'departure_schedule_text': Array<string>;

/**
 * Расписание
 */
'departure_schedule': Array<string>;

/**
 * Маршрут
 */
'route_text': string;

/**
 * Срок.дн
 */
'period': string;

/**
 * До границы
 */
'customs_rate': string;

/**
 * Локальные
 */
'local_rate': string;

/**
 * Итого
 */
'total_rate': string;
}>;
}> {
    return this.requestRateFinalList$Response(params, context).pipe(
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
 * Дата запроса
 */
'time_request': string;

/**
 * Подрядчик
 */
'contractor_text': string;

/**
 * Подрядчик (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * AIR
 */
'carrier_iata': number;

/**
 * Авиалиния
 */
'carrier_text': string;

/**
 * Авиалиния (ID берем из запроса - transport_carrier)
 */
'carrier_id': string;

/**
 * Тип
 */
'kind_key': string;

/**
 * Расписание
 */
'departure_schedule_text': Array<string>;

/**
 * Расписание
 */
'departure_schedule': Array<string>;

/**
 * Маршрут
 */
'route_text': string;

/**
 * Срок.дн
 */
'period': string;

/**
 * До границы
 */
'customs_rate': string;

/**
 * Локальные
 */
'local_rate': string;

/**
 * Итого
 */
'total_rate': string;
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
 * Дата запроса
 */
'time_request': string;

/**
 * Подрядчик
 */
'contractor_text': string;

/**
 * Подрядчик (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * AIR
 */
'carrier_iata': number;

/**
 * Авиалиния
 */
'carrier_text': string;

/**
 * Авиалиния (ID берем из запроса - transport_carrier)
 */
'carrier_id': string;

/**
 * Тип
 */
'kind_key': string;

/**
 * Расписание
 */
'departure_schedule_text': Array<string>;

/**
 * Расписание
 */
'departure_schedule': Array<string>;

/**
 * Маршрут
 */
'route_text': string;

/**
 * Срок.дн
 */
'period': string;

/**
 * До границы
 */
'customs_rate': string;

/**
 * Локальные
 */
'local_rate': string;

/**
 * Итого
 */
'total_rate': string;
}>;
} => r.body)
    );
  }

  /** Path part for operation `requestRateCustomsList()` */
  static readonly RequestRateCustomsListPath = '/request_rate_customs_list';

  /**
   * Ставки запроса До границы .
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRateCustomsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateCustomsList$Response(
    params: {

    /**
     * ID Запроса
     */
      request_id: number;

    /**
     * Подрядчики (ID берем из запроса - contractor_list)
     */
      contractor?: number;

    /**
     * Авиалинии (ID берем из запроса - transport_carrier)
     */
      carrier?: Array<string>;

    /**
     * Тип маршрута (ID берем из запроса - direction_flight)
     */
      departure_flight?: string;

    /**
     * Аэропорт вылета (ID берем из запроса - direction_point)
     */
      departure_point?: number;

    /**
     * Аэропорт прибытия (ID берем из запроса - direction_point)
     */
      arrival_point?: number;

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
'field'?: 'time_insert' | 'total_cost';

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
 * Дата запроса
 */
'time_request': string;

/**
 * Дата ответа
 */
'time_answer': string;

/**
 * Подрядчик
 */
'contractor_text': string;

/**
 * Подрядчик (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * AIR
 */
'carrier_iata': number;

/**
 * Авиалиния
 */
'carrier_text': string;

/**
 * Авиалиния (ID берем из запроса - transport_carrier)
 */
'carrier_id': string;

/**
 * Маршрут
 */
'route_text': string;

/**
 * Маршрут (ID берем из запроса - transport_route)
 */
'route_id': number;

/**
 * Тип
 */
'kind_key': string;

/**
 * Расписание
 */
'departure_schedule_text': Array<string>;

/**
 * Расписание
 */
'departure_schedule': Array<string>;

/**
 * Ставка
 */
'total_cost': string;

/**
 * Срок.дн
 */
'transit_time': string;

/**
 * Свободные места
 */
'nearest_flight': Array<string>;

/**
 * Свободные места
 */
'nearest_flight_text': string;

/**
 * В итоговом
 */
'selected': boolean;
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateCustomsListPath, 'get');
    if (params) {
      rb.query('request_id', params.request_id, {});
      rb.query('contractor', params.contractor, {});
      rb.query('carrier', params.carrier, {"style":"form","explode":false});
      rb.query('departure_flight', params.departure_flight, {});
      rb.query('departure_point', params.departure_point, {});
      rb.query('arrival_point', params.arrival_point, {});
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
         * Дата запроса
         */
        'time_request': string;
        
        /**
         * Дата ответа
         */
        'time_answer': string;
        
        /**
         * Подрядчик
         */
        'contractor_text': string;
        
        /**
         * Подрядчик (ID берем из запроса - contractor_list)
         */
        'contractor_id': number;
        
        /**
         * AIR
         */
        'carrier_iata': number;
        
        /**
         * Авиалиния
         */
        'carrier_text': string;
        
        /**
         * Авиалиния (ID берем из запроса - transport_carrier)
         */
        'carrier_id': string;
        
        /**
         * Маршрут
         */
        'route_text': string;
        
        /**
         * Маршрут (ID берем из запроса - transport_route)
         */
        'route_id': number;
        
        /**
         * Тип
         */
        'kind_key': string;
        
        /**
         * Расписание
         */
        'departure_schedule_text': Array<string>;
        
        /**
         * Расписание
         */
        'departure_schedule': Array<string>;
        
        /**
         * Ставка
         */
        'total_cost': string;
        
        /**
         * Срок.дн
         */
        'transit_time': string;
        
        /**
         * Свободные места
         */
        'nearest_flight': Array<string>;
        
        /**
         * Свободные места
         */
        'nearest_flight_text': string;
        
        /**
         * В итоговом
         */
        'selected': boolean;
        }>;
        }>;
      })
    );
  }

  /**
   * Ставки запроса До границы .
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRateCustomsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateCustomsList(
    params: {

    /**
     * ID Запроса
     */
      request_id: number;

    /**
     * Подрядчики (ID берем из запроса - contractor_list)
     */
      contractor?: number;

    /**
     * Авиалинии (ID берем из запроса - transport_carrier)
     */
      carrier?: Array<string>;

    /**
     * Тип маршрута (ID берем из запроса - direction_flight)
     */
      departure_flight?: string;

    /**
     * Аэропорт вылета (ID берем из запроса - direction_point)
     */
      departure_point?: number;

    /**
     * Аэропорт прибытия (ID берем из запроса - direction_point)
     */
      arrival_point?: number;

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
'field'?: 'time_insert' | 'total_cost';

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
 * Дата запроса
 */
'time_request': string;

/**
 * Дата ответа
 */
'time_answer': string;

/**
 * Подрядчик
 */
'contractor_text': string;

/**
 * Подрядчик (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * AIR
 */
'carrier_iata': number;

/**
 * Авиалиния
 */
'carrier_text': string;

/**
 * Авиалиния (ID берем из запроса - transport_carrier)
 */
'carrier_id': string;

/**
 * Маршрут
 */
'route_text': string;

/**
 * Маршрут (ID берем из запроса - transport_route)
 */
'route_id': number;

/**
 * Тип
 */
'kind_key': string;

/**
 * Расписание
 */
'departure_schedule_text': Array<string>;

/**
 * Расписание
 */
'departure_schedule': Array<string>;

/**
 * Ставка
 */
'total_cost': string;

/**
 * Срок.дн
 */
'transit_time': string;

/**
 * Свободные места
 */
'nearest_flight': Array<string>;

/**
 * Свободные места
 */
'nearest_flight_text': string;

/**
 * В итоговом
 */
'selected': boolean;
}>;
}> {
    return this.requestRateCustomsList$Response(params, context).pipe(
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
 * Дата запроса
 */
'time_request': string;

/**
 * Дата ответа
 */
'time_answer': string;

/**
 * Подрядчик
 */
'contractor_text': string;

/**
 * Подрядчик (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * AIR
 */
'carrier_iata': number;

/**
 * Авиалиния
 */
'carrier_text': string;

/**
 * Авиалиния (ID берем из запроса - transport_carrier)
 */
'carrier_id': string;

/**
 * Маршрут
 */
'route_text': string;

/**
 * Маршрут (ID берем из запроса - transport_route)
 */
'route_id': number;

/**
 * Тип
 */
'kind_key': string;

/**
 * Расписание
 */
'departure_schedule_text': Array<string>;

/**
 * Расписание
 */
'departure_schedule': Array<string>;

/**
 * Ставка
 */
'total_cost': string;

/**
 * Срок.дн
 */
'transit_time': string;

/**
 * Свободные места
 */
'nearest_flight': Array<string>;

/**
 * Свободные места
 */
'nearest_flight_text': string;

/**
 * В итоговом
 */
'selected': boolean;
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
 * Дата запроса
 */
'time_request': string;

/**
 * Дата ответа
 */
'time_answer': string;

/**
 * Подрядчик
 */
'contractor_text': string;

/**
 * Подрядчик (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * AIR
 */
'carrier_iata': number;

/**
 * Авиалиния
 */
'carrier_text': string;

/**
 * Авиалиния (ID берем из запроса - transport_carrier)
 */
'carrier_id': string;

/**
 * Маршрут
 */
'route_text': string;

/**
 * Маршрут (ID берем из запроса - transport_route)
 */
'route_id': number;

/**
 * Тип
 */
'kind_key': string;

/**
 * Расписание
 */
'departure_schedule_text': Array<string>;

/**
 * Расписание
 */
'departure_schedule': Array<string>;

/**
 * Ставка
 */
'total_cost': string;

/**
 * Срок.дн
 */
'transit_time': string;

/**
 * Свободные места
 */
'nearest_flight': Array<string>;

/**
 * Свободные места
 */
'nearest_flight_text': string;

/**
 * В итоговом
 */
'selected': boolean;
}>;
} => r.body)
    );
  }

  /** Path part for operation `requestRatePointList()` */
  static readonly RequestRatePointListPath = '/request_rate_point_list';

  /**
   * Ставки запроса Складские (СВХ).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRatePointList()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRatePointList$Response(
    params: {

    /**
     * ID Запроса
     */
      request_id: number;

    /**
     * Наименование аэропорта (ID берем из запроса - direction_point)
     */
      point?: number;

    /**
     * Вид прайса (ID берем из запроса - transport_point_action)
     */
      point_action?: number;

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
'field'?: 'cost';

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
 * Наименование Аэропорта
 */
'point': string;

/**
 * Вид прайса
 */
'price_type': string;

/**
 * Наименование статей затрат
 */
'cost_items': string;

/**
 * Сумма
 */
'cost': string;

/**
 * Примечание
 */
'notice'?: string;

/**
 * В итоговом
 */
'selected': boolean;
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRatePointListPath, 'get');
    if (params) {
      rb.query('request_id', params.request_id, {});
      rb.query('point', params.point, {});
      rb.query('point_action', params.point_action, {});
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
         * Наименование Аэропорта
         */
        'point': string;
        
        /**
         * Вид прайса
         */
        'price_type': string;
        
        /**
         * Наименование статей затрат
         */
        'cost_items': string;
        
        /**
         * Сумма
         */
        'cost': string;
        
        /**
         * Примечание
         */
        'notice'?: string;
        
        /**
         * В итоговом
         */
        'selected': boolean;
        }>;
        }>;
      })
    );
  }

  /**
   * Ставки запроса Складские (СВХ).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRatePointList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRatePointList(
    params: {

    /**
     * ID Запроса
     */
      request_id: number;

    /**
     * Наименование аэропорта (ID берем из запроса - direction_point)
     */
      point?: number;

    /**
     * Вид прайса (ID берем из запроса - transport_point_action)
     */
      point_action?: number;

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
'field'?: 'cost';

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
 * Наименование Аэропорта
 */
'point': string;

/**
 * Вид прайса
 */
'price_type': string;

/**
 * Наименование статей затрат
 */
'cost_items': string;

/**
 * Сумма
 */
'cost': string;

/**
 * Примечание
 */
'notice'?: string;

/**
 * В итоговом
 */
'selected': boolean;
}>;
}> {
    return this.requestRatePointList$Response(params, context).pipe(
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
 * Наименование Аэропорта
 */
'point': string;

/**
 * Вид прайса
 */
'price_type': string;

/**
 * Наименование статей затрат
 */
'cost_items': string;

/**
 * Сумма
 */
'cost': string;

/**
 * Примечание
 */
'notice'?: string;

/**
 * В итоговом
 */
'selected': boolean;
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
 * Наименование Аэропорта
 */
'point': string;

/**
 * Вид прайса
 */
'price_type': string;

/**
 * Наименование статей затрат
 */
'cost_items': string;

/**
 * Сумма
 */
'cost': string;

/**
 * Примечание
 */
'notice'?: string;

/**
 * В итоговом
 */
'selected': boolean;
}>;
} => r.body)
    );
  }

  /** Path part for operation `requestRateTransporterList()` */
  static readonly RequestRateTransporterListPath = '/request_rate_transporter_list';

  /**
   * Ставки запроса Вывоз.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRateTransporterList()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateTransporterList$Response(
    params: {

    /**
     * ID Запроса
     */
      request_id: number;

    /**
     * Наименование аэропорта (ID берем из запроса - direction_point)
     */
      point?: number;

    /**
     * Подрядчики (ID берем из запроса - contractor_list)
     */
      contractor?: number;

    /**
     * Тип ТС (ID берем из запроса - transport_type)
     */
      type?: number;

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
'field'?: 'cost';

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
 * Дата запроса
 */
'time_request': string;

/**
 * Дата ответа
 */
'time_answer': string;
'contractor_text': string;
'contractor_id': number;
'transport_type_text': string;
'transport_type_id': number;
'period': string;
'cost': string;
'notice'?: string;

/**
 * В итоговом
 */
'selected': boolean;
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateTransporterListPath, 'get');
    if (params) {
      rb.query('request_id', params.request_id, {});
      rb.query('point', params.point, {});
      rb.query('contractor', params.contractor, {});
      rb.query('type', params.type, {});
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
         * Дата запроса
         */
        'time_request': string;
        
        /**
         * Дата ответа
         */
        'time_answer': string;
        'contractor_text': string;
        'contractor_id': number;
        'transport_type_text': string;
        'transport_type_id': number;
        'period': string;
        'cost': string;
        'notice'?: string;
        
        /**
         * В итоговом
         */
        'selected': boolean;
        }>;
        }>;
      })
    );
  }

  /**
   * Ставки запроса Вывоз.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRateTransporterList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateTransporterList(
    params: {

    /**
     * ID Запроса
     */
      request_id: number;

    /**
     * Наименование аэропорта (ID берем из запроса - direction_point)
     */
      point?: number;

    /**
     * Подрядчики (ID берем из запроса - contractor_list)
     */
      contractor?: number;

    /**
     * Тип ТС (ID берем из запроса - transport_type)
     */
      type?: number;

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
'field'?: 'cost';

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
 * Дата запроса
 */
'time_request': string;

/**
 * Дата ответа
 */
'time_answer': string;
'contractor_text': string;
'contractor_id': number;
'transport_type_text': string;
'transport_type_id': number;
'period': string;
'cost': string;
'notice'?: string;

/**
 * В итоговом
 */
'selected': boolean;
}>;
}> {
    return this.requestRateTransporterList$Response(params, context).pipe(
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
 * Дата запроса
 */
'time_request': string;

/**
 * Дата ответа
 */
'time_answer': string;
'contractor_text': string;
'contractor_id': number;
'transport_type_text': string;
'transport_type_id': number;
'period': string;
'cost': string;
'notice'?: string;

/**
 * В итоговом
 */
'selected': boolean;
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
 * Дата запроса
 */
'time_request': string;

/**
 * Дата ответа
 */
'time_answer': string;
'contractor_text': string;
'contractor_id': number;
'transport_type_text': string;
'transport_type_id': number;
'period': string;
'cost': string;
'notice'?: string;

/**
 * В итоговом
 */
'selected': boolean;
}>;
} => r.body)
    );
  }

  /** Path part for operation `requestRateListParam()` */
  static readonly RequestRateListParamPath = '/request_rate_list_param';

  /**
   * Параметры вывода запросов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRateListParam()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateListParam$Response(
    params: {

    /**
     * ID Запроса
     */
      request_id: number;

    /**
     * Метод (final, customs, point, transporter)
     */
      method: string;
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
'column'?: Array<string>;

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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateListParamPath, 'get');
    if (params) {
      rb.query('request_id', params.request_id, {});
      rb.query('method', params.method, {});
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
        'column'?: Array<string>;
        
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
   * To access the full response (for headers, for example), `requestRateListParam$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateListParam(
    params: {

    /**
     * ID Запроса
     */
      request_id: number;

    /**
     * Метод (final, customs, point, transporter)
     */
      method: string;
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
'column'?: Array<string>;

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
    return this.requestRateListParam$Response(params, context).pipe(
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
'column'?: Array<string>;

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
'column'?: Array<string>;

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

  /** Path part for operation `requestRateFinalInfo()` */
  static readonly RequestRateFinalInfoPath = '/request_rate_final_info';

  /**
   * Ставка итоговая.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRateFinalInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateFinalInfo$Response(
    params: {

    /**
     * ID ставки
     */
      id: number;

    /**
     * ID Запроса
     */
      request_id: number;
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
'column'?: Array<string>;

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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateFinalInfoPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
      rb.query('request_id', params.request_id, {});
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
        'column'?: Array<string>;
        
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
   * Ставка итоговая.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRateFinalInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateFinalInfo(
    params: {

    /**
     * ID ставки
     */
      id: number;

    /**
     * ID Запроса
     */
      request_id: number;
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
'column'?: Array<string>;

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
    return this.requestRateFinalInfo$Response(params, context).pipe(
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
'column'?: Array<string>;

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
'column'?: Array<string>;

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

  /** Path part for operation `requestRateCustomsInfo()` */
  static readonly RequestRateCustomsInfoPath = '/request_rate_customs_info';

  /**
   * Ставка запроса До границы.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRateCustomsInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateCustomsInfo$Response(
    params: {

    /**
     * ID ставки
     */
      id: number;

    /**
     * ID Запроса
     */
      request_id: number;
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
'column'?: Array<string>;

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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateCustomsInfoPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
      rb.query('request_id', params.request_id, {});
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
        'column'?: Array<string>;
        
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
   * Ставка запроса До границы.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRateCustomsInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateCustomsInfo(
    params: {

    /**
     * ID ставки
     */
      id: number;

    /**
     * ID Запроса
     */
      request_id: number;
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
'column'?: Array<string>;

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
    return this.requestRateCustomsInfo$Response(params, context).pipe(
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
'column'?: Array<string>;

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
'column'?: Array<string>;

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

  /** Path part for operation `requestRatePointInfo()` */
  static readonly RequestRatePointInfoPath = '/request_rate_point_info';

  /**
   * Ставка запроса Складские (СВХ).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRatePointInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRatePointInfo$Response(
    params: {

    /**
     * ID ставки
     */
      id: number;

    /**
     * ID Запроса
     */
      request_id: number;
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
'column'?: Array<string>;

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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRatePointInfoPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
      rb.query('request_id', params.request_id, {});
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
        'column'?: Array<string>;
        
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
   * Ставка запроса Складские (СВХ).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRatePointInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRatePointInfo(
    params: {

    /**
     * ID ставки
     */
      id: number;

    /**
     * ID Запроса
     */
      request_id: number;
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
'column'?: Array<string>;

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
    return this.requestRatePointInfo$Response(params, context).pipe(
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
'column'?: Array<string>;

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
'column'?: Array<string>;

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

  /** Path part for operation `requestRateTransporterInfo()` */
  static readonly RequestRateTransporterInfoPath = '/request_rate_transporter_info';

  /**
   * Ставка запроса Вывоз.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRateTransporterInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateTransporterInfo$Response(
    params: {

    /**
     * ID ставки
     */
      id: number;

    /**
     * ID Запроса
     */
      request_id: number;
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
'column'?: Array<string>;

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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateTransporterInfoPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
      rb.query('request_id', params.request_id, {});
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
        'column'?: Array<string>;
        
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
   * Ставка запроса Вывоз.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRateTransporterInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateTransporterInfo(
    params: {

    /**
     * ID ставки
     */
      id: number;

    /**
     * ID Запроса
     */
      request_id: number;
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
'column'?: Array<string>;

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
    return this.requestRateTransporterInfo$Response(params, context).pipe(
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
'column'?: Array<string>;

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
'column'?: Array<string>;

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

}
