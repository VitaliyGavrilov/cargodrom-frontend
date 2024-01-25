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
     * Вид запроса (ID берем из запроса - request_type)
     */
      request_type_id?: number;

    /**
     * Статус CRM (ID берем из запроса - request_status)
     */
      status_id?: number;

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
'field': 'id' | 'name' | 'order_count' | 'order_day_last' | 'order_delay_payment';

/**
 * Направление сортировки
 */
'dir': 'asc' | 'desc';
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
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Контрагент
 */
'customer_name'?: string;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

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
 * Документы паспорта безопасности
 */
'cargo_danger_file'?: {
};

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
 * Валюта по стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

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
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

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
}>;

/**
 * Параметры таблицы
 */
'column'?: Array<string>;

/**
 * Поля сортировки
 */
'sort'?: Array<string>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestListPath, 'get');
    if (params) {
      rb.query('request_type_id', params.request_type_id, {});
      rb.query('status_id', params.status_id, {});
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
         * Клиент (ID берем из запроса - customer_list)
         */
        'customer_id'?: number;
        
        /**
         * Контрагент
         */
        'customer_name'?: string;
        
        /**
         * Вид запроса (ID берем из запроса - request_type)
         */
        'request_type_id'?: number;
        
        /**
         * Вид перевозки (ID берем из запроса - transport_kind)
         */
        'transport_kind_id'?: string;
        
        /**
         * Тип транспорта (ID берем из запроса - transport_type)
         */
        'transport_type_id'?: number;
        
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
         * Документы паспорта безопасности
         */
        'cargo_danger_file'?: {
        };
        
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
         * Валюта по стоимости груза (ID берем из запроса - settings_get из поля currency)
         */
        'cargo_currency_id'?: string;
        
        /**
         * Готовность
         */
        'cargo_readiness'?: string;
        
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
         * Город/Порт (ID берем из запроса - direction_city)
         */
        'incoterms_city_id'?: number;
        
        /**
         * Город/Порт
         */
        'incoterms_city_name'?: string;
        
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
        }>;
        
        /**
         * Параметры таблицы
         */
        'column'?: Array<string>;
        
        /**
         * Поля сортировки
         */
        'sort'?: Array<string>;
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
     * Вид запроса (ID берем из запроса - request_type)
     */
      request_type_id?: number;

    /**
     * Статус CRM (ID берем из запроса - request_status)
     */
      status_id?: number;

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
'field': 'id' | 'name' | 'order_count' | 'order_day_last' | 'order_delay_payment';

/**
 * Направление сортировки
 */
'dir': 'asc' | 'desc';
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
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Контрагент
 */
'customer_name'?: string;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

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
 * Документы паспорта безопасности
 */
'cargo_danger_file'?: {
};

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
 * Валюта по стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

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
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

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
}>;

/**
 * Параметры таблицы
 */
'column'?: Array<string>;

/**
 * Поля сортировки
 */
'sort'?: Array<string>;
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
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Контрагент
 */
'customer_name'?: string;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

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
 * Документы паспорта безопасности
 */
'cargo_danger_file'?: {
};

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
 * Валюта по стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

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
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

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
}>;

/**
 * Параметры таблицы
 */
'column'?: Array<string>;

/**
 * Поля сортировки
 */
'sort'?: Array<string>;
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
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Контрагент
 */
'customer_name'?: string;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

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
 * Документы паспорта безопасности
 */
'cargo_danger_file'?: {
};

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
 * Валюта по стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

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
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

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
}>;

/**
 * Параметры таблицы
 */
'column'?: Array<string>;

/**
 * Поля сортировки
 */
'sort'?: Array<string>;
} => r.body)
    );
  }

  /** Path part for operation `requestListSearch()` */
  static readonly RequestListSearchPath = '/request_list_search';

  /**
   * Параметры формы поиска.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestListSearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestListSearch$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

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
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestListSearchPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
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
      })
    );
  }

  /**
   * Параметры формы поиска.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestListSearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestListSearch(
    params?: {
    },
    context?: HttpContext
  ): Observable<{

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
}> {
    return this.requestListSearch$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

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
}>): {

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
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Контрагент
 */
'customer_name'?: string;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

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
 * Документы паспорта безопасности
 */
'cargo_danger_file'?: {
};

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
 * Валюта по стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

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
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

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
         * Клиент (ID берем из запроса - customer_list)
         */
        'customer_id'?: number;
        
        /**
         * Контрагент
         */
        'customer_name'?: string;
        
        /**
         * Вид запроса (ID берем из запроса - request_type)
         */
        'request_type_id'?: number;
        
        /**
         * Вид перевозки (ID берем из запроса - transport_kind)
         */
        'transport_kind_id'?: string;
        
        /**
         * Тип транспорта (ID берем из запроса - transport_type)
         */
        'transport_type_id'?: number;
        
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
         * Документы паспорта безопасности
         */
        'cargo_danger_file'?: {
        };
        
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
         * Валюта по стоимости груза (ID берем из запроса - settings_get из поля currency)
         */
        'cargo_currency_id'?: string;
        
        /**
         * Готовность
         */
        'cargo_readiness'?: string;
        
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
         * Город/Порт (ID берем из запроса - direction_city)
         */
        'incoterms_city_id'?: number;
        
        /**
         * Город/Порт
         */
        'incoterms_city_name'?: string;
        
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
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Контрагент
 */
'customer_name'?: string;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

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
 * Документы паспорта безопасности
 */
'cargo_danger_file'?: {
};

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
 * Валюта по стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

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
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

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
 * Документы (файлы)
 */
'documents_file'?: {
};
}> {
    return this.requestInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Контрагент
 */
'customer_name'?: string;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

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
 * Документы паспорта безопасности
 */
'cargo_danger_file'?: {
};

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
 * Валюта по стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

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
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

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
 * Документы (файлы)
 */
'documents_file'?: {
};
}>): {

/**
 * Клиент (ID берем из запроса - customer_list)
 */
'customer_id'?: number;

/**
 * Контрагент
 */
'customer_name'?: string;

/**
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

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
 * Документы паспорта безопасности
 */
'cargo_danger_file'?: {
};

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
 * Валюта по стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

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
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

/**
 * Город/Порт
 */
'incoterms_city_name'?: string;

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
'transport_kind_id': string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id': number;

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
 * Валюта по стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

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
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

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
'transport_kind_id': string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id': number;

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
 * Валюта по стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

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
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

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
 * ID запроса
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
'transport_kind_id'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

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
 * Валюта по стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

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
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

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
 * ID запроса
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
'transport_kind_id'?: string;

/**
 * Тип транспорта (ID берем из запроса - transport_type)
 */
'transport_type_id'?: number;

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
 * Валюта по стоимости груза (ID берем из запроса - settings_get из поля currency)
 */
'cargo_currency_id'?: string;

/**
 * Готовность
 */
'cargo_readiness'?: string;

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
 * Город/Порт (ID берем из запроса - direction_city)
 */
'incoterms_city_id'?: number;

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
      kind_id: string;
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
      kind_id: string;
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
      kind_id: string;
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
      kind_id: string;
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
      kind_id: string;
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
      kind_id: string;
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

}
