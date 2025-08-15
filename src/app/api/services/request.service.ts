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
'field'?: 'id' | 'time_add' | 'customer_name' | 'departure_text' | 'arrival_text' | 'status_crm_name' | 'rate_contractor_name';

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
 * Имя клиента
 */
'customer_name'?: string;

/**
 * Телефон клиента
 */
'customer_phone'?: string;

/**
 * Email клиента
 */
'customer_email'?: string;

/**
 * Наименование клиента
 */
'customer_text'?: string;

/**
 * Доп. инфо клиента
 */
'customer_info'?: string;

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
'transport_type_name'?: string;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Тип груза
 */
'cargo_type_text': string;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
 */
'cargo_package_name'?: string;

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
 * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
 */
'cargo_package_name'?: string;

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
 * Настройка рассылки запроса
 */
'send_to'?: 'contractor' | 'employee';

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
 * Кол-во отправленных заявок на запрос
 */
'count_rate_send'?: number;

/**
 * Кол-во отвеченных заявок на запрос
 */
'count_rate_answer'?: number;

/**
 * Кол-во отправленных/отвеченных заявок на запрос
 */
'count_rate_text'?: string;

/**
 * Флаги
 */
'kso': {
};

/**
 * Переводы
 */
'translate': {
};

/**
 * Вкладки
 */
'tabs': Array<string>;

/**
 * Класс строки
 */
'row_class'?: string;

/**
 * Класс ячейки
 */
'cell_class'?: string;
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
         * Имя клиента
         */
        'customer_name'?: string;
        
        /**
         * Телефон клиента
         */
        'customer_phone'?: string;
        
        /**
         * Email клиента
         */
        'customer_email'?: string;
        
        /**
         * Наименование клиента
         */
        'customer_text'?: string;
        
        /**
         * Доп. инфо клиента
         */
        'customer_info'?: string;
        
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
        'transport_type_name'?: string;
        
        /**
         * Наименование груза
         */
        'cargo_description'?: string;
        
        /**
         * Тип груза (ID берем из запроса - cargo_type)
         */
        'cargo_type_id'?: number;
        
        /**
         * Тип груза
         */
        'cargo_type_text': string;
        
        /**
         * Вид упаковки (ID берем из запроса - cargo_package)
         */
        'cargo_package_id'?: number;
        
        /**
         * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
         */
        'cargo_package_name'?: string;
        
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
         * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
         */
        'cargo_package_name'?: string;
        
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
         * Настройка рассылки запроса
         */
        'send_to'?: 'contractor' | 'employee';
        
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
         * Кол-во отправленных заявок на запрос
         */
        'count_rate_send'?: number;
        
        /**
         * Кол-во отвеченных заявок на запрос
         */
        'count_rate_answer'?: number;
        
        /**
         * Кол-во отправленных/отвеченных заявок на запрос
         */
        'count_rate_text'?: string;
        
        /**
         * Флаги
         */
        'kso': {
        };
        
        /**
         * Переводы
         */
        'translate': {
        };
        
        /**
         * Вкладки
         */
        'tabs': Array<string>;
        
        /**
         * Класс строки
         */
        'row_class'?: string;
        
        /**
         * Класс ячейки
         */
        'cell_class'?: string;
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
'field'?: 'id' | 'time_add' | 'customer_name' | 'departure_text' | 'arrival_text' | 'status_crm_name' | 'rate_contractor_name';

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
 * Имя клиента
 */
'customer_name'?: string;

/**
 * Телефон клиента
 */
'customer_phone'?: string;

/**
 * Email клиента
 */
'customer_email'?: string;

/**
 * Наименование клиента
 */
'customer_text'?: string;

/**
 * Доп. инфо клиента
 */
'customer_info'?: string;

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
'transport_type_name'?: string;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Тип груза
 */
'cargo_type_text': string;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
 */
'cargo_package_name'?: string;

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
 * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
 */
'cargo_package_name'?: string;

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
 * Настройка рассылки запроса
 */
'send_to'?: 'contractor' | 'employee';

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
 * Кол-во отправленных заявок на запрос
 */
'count_rate_send'?: number;

/**
 * Кол-во отвеченных заявок на запрос
 */
'count_rate_answer'?: number;

/**
 * Кол-во отправленных/отвеченных заявок на запрос
 */
'count_rate_text'?: string;

/**
 * Флаги
 */
'kso': {
};

/**
 * Переводы
 */
'translate': {
};

/**
 * Вкладки
 */
'tabs': Array<string>;

/**
 * Класс строки
 */
'row_class'?: string;

/**
 * Класс ячейки
 */
'cell_class'?: string;
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
 * Имя клиента
 */
'customer_name'?: string;

/**
 * Телефон клиента
 */
'customer_phone'?: string;

/**
 * Email клиента
 */
'customer_email'?: string;

/**
 * Наименование клиента
 */
'customer_text'?: string;

/**
 * Доп. инфо клиента
 */
'customer_info'?: string;

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
'transport_type_name'?: string;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Тип груза
 */
'cargo_type_text': string;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
 */
'cargo_package_name'?: string;

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
 * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
 */
'cargo_package_name'?: string;

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
 * Настройка рассылки запроса
 */
'send_to'?: 'contractor' | 'employee';

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
 * Кол-во отправленных заявок на запрос
 */
'count_rate_send'?: number;

/**
 * Кол-во отвеченных заявок на запрос
 */
'count_rate_answer'?: number;

/**
 * Кол-во отправленных/отвеченных заявок на запрос
 */
'count_rate_text'?: string;

/**
 * Флаги
 */
'kso': {
};

/**
 * Переводы
 */
'translate': {
};

/**
 * Вкладки
 */
'tabs': Array<string>;

/**
 * Класс строки
 */
'row_class'?: string;

/**
 * Класс ячейки
 */
'cell_class'?: string;
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
 * Имя клиента
 */
'customer_name'?: string;

/**
 * Телефон клиента
 */
'customer_phone'?: string;

/**
 * Email клиента
 */
'customer_email'?: string;

/**
 * Наименование клиента
 */
'customer_text'?: string;

/**
 * Доп. инфо клиента
 */
'customer_info'?: string;

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
'transport_type_name'?: string;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Тип груза
 */
'cargo_type_text': string;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
 */
'cargo_package_name'?: string;

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
 * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
 */
'cargo_package_name'?: string;

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
 * Настройка рассылки запроса
 */
'send_to'?: 'contractor' | 'employee';

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
 * Кол-во отправленных заявок на запрос
 */
'count_rate_send'?: number;

/**
 * Кол-во отвеченных заявок на запрос
 */
'count_rate_answer'?: number;

/**
 * Кол-во отправленных/отвеченных заявок на запрос
 */
'count_rate_text'?: string;

/**
 * Флаги
 */
'kso': {
};

/**
 * Переводы
 */
'translate': {
};

/**
 * Вкладки
 */
'tabs': Array<string>;

/**
 * Класс строки
 */
'row_class'?: string;

/**
 * Класс ячейки
 */
'cell_class'?: string;
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
 * Имя клиента
 */
'customer_name'?: string;

/**
 * Телефон клиента
 */
'customer_phone'?: string;

/**
 * Email клиента
 */
'customer_email'?: string;

/**
 * Наименование клиента
 */
'customer_text'?: string;

/**
 * Доп. инфо клиента
 */
'customer_info'?: string;

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
'transport_type_name'?: string;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Тип груза
 */
'cargo_type_text': string;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
 */
'cargo_package_name'?: string;

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
 * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
 */
'cargo_package_name'?: string;

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
 * Настройка рассылки запроса
 */
'send_to'?: 'contractor' | 'employee';

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
 * Кол-во отправленных заявок на запрос
 */
'count_rate_send'?: number;

/**
 * Кол-во отвеченных заявок на запрос
 */
'count_rate_answer'?: number;

/**
 * Кол-во отправленных/отвеченных заявок на запрос
 */
'count_rate_text'?: string;

/**
 * Флаги
 */
'kso': {
};

/**
 * Переводы
 */
'translate': {
};

/**
 * Вкладки
 */
'tabs': Array<string>;

/**
 * Класс строки
 */
'row_class'?: string;

/**
 * Класс ячейки
 */
'cell_class'?: string;

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
         * Имя клиента
         */
        'customer_name'?: string;
        
        /**
         * Телефон клиента
         */
        'customer_phone'?: string;
        
        /**
         * Email клиента
         */
        'customer_email'?: string;
        
        /**
         * Наименование клиента
         */
        'customer_text'?: string;
        
        /**
         * Доп. инфо клиента
         */
        'customer_info'?: string;
        
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
        'transport_type_name'?: string;
        
        /**
         * Наименование груза
         */
        'cargo_description'?: string;
        
        /**
         * Тип груза (ID берем из запроса - cargo_type)
         */
        'cargo_type_id'?: number;
        
        /**
         * Тип груза
         */
        'cargo_type_text': string;
        
        /**
         * Вид упаковки (ID берем из запроса - cargo_package)
         */
        'cargo_package_id'?: number;
        
        /**
         * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
         */
        'cargo_package_name'?: string;
        
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
         * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
         */
        'cargo_package_name'?: string;
        
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
         * Настройка рассылки запроса
         */
        'send_to'?: 'contractor' | 'employee';
        
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
         * Кол-во отправленных заявок на запрос
         */
        'count_rate_send'?: number;
        
        /**
         * Кол-во отвеченных заявок на запрос
         */
        'count_rate_answer'?: number;
        
        /**
         * Кол-во отправленных/отвеченных заявок на запрос
         */
        'count_rate_text'?: string;
        
        /**
         * Флаги
         */
        'kso': {
        };
        
        /**
         * Переводы
         */
        'translate': {
        };
        
        /**
         * Вкладки
         */
        'tabs': Array<string>;
        
        /**
         * Класс строки
         */
        'row_class'?: string;
        
        /**
         * Класс ячейки
         */
        'cell_class'?: string;
        
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
 * Имя клиента
 */
'customer_name'?: string;

/**
 * Телефон клиента
 */
'customer_phone'?: string;

/**
 * Email клиента
 */
'customer_email'?: string;

/**
 * Наименование клиента
 */
'customer_text'?: string;

/**
 * Доп. инфо клиента
 */
'customer_info'?: string;

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
'transport_type_name'?: string;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Тип груза
 */
'cargo_type_text': string;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
 */
'cargo_package_name'?: string;

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
 * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
 */
'cargo_package_name'?: string;

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
 * Настройка рассылки запроса
 */
'send_to'?: 'contractor' | 'employee';

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
 * Кол-во отправленных заявок на запрос
 */
'count_rate_send'?: number;

/**
 * Кол-во отвеченных заявок на запрос
 */
'count_rate_answer'?: number;

/**
 * Кол-во отправленных/отвеченных заявок на запрос
 */
'count_rate_text'?: string;

/**
 * Флаги
 */
'kso': {
};

/**
 * Переводы
 */
'translate': {
};

/**
 * Вкладки
 */
'tabs': Array<string>;

/**
 * Класс строки
 */
'row_class'?: string;

/**
 * Класс ячейки
 */
'cell_class'?: string;

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
 * Имя клиента
 */
'customer_name'?: string;

/**
 * Телефон клиента
 */
'customer_phone'?: string;

/**
 * Email клиента
 */
'customer_email'?: string;

/**
 * Наименование клиента
 */
'customer_text'?: string;

/**
 * Доп. инфо клиента
 */
'customer_info'?: string;

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
'transport_type_name'?: string;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Тип груза
 */
'cargo_type_text': string;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
 */
'cargo_package_name'?: string;

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
 * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
 */
'cargo_package_name'?: string;

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
 * Настройка рассылки запроса
 */
'send_to'?: 'contractor' | 'employee';

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
 * Кол-во отправленных заявок на запрос
 */
'count_rate_send'?: number;

/**
 * Кол-во отвеченных заявок на запрос
 */
'count_rate_answer'?: number;

/**
 * Кол-во отправленных/отвеченных заявок на запрос
 */
'count_rate_text'?: string;

/**
 * Флаги
 */
'kso': {
};

/**
 * Переводы
 */
'translate': {
};

/**
 * Вкладки
 */
'tabs': Array<string>;

/**
 * Класс строки
 */
'row_class'?: string;

/**
 * Класс ячейки
 */
'cell_class'?: string;

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
 * Имя клиента
 */
'customer_name'?: string;

/**
 * Телефон клиента
 */
'customer_phone'?: string;

/**
 * Email клиента
 */
'customer_email'?: string;

/**
 * Наименование клиента
 */
'customer_text'?: string;

/**
 * Доп. инфо клиента
 */
'customer_info'?: string;

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
'transport_type_name'?: string;

/**
 * Наименование груза
 */
'cargo_description'?: string;

/**
 * Тип груза (ID берем из запроса - cargo_type)
 */
'cargo_type_id'?: number;

/**
 * Тип груза
 */
'cargo_type_text': string;

/**
 * Вид упаковки (ID берем из запроса - cargo_package)
 */
'cargo_package_id'?: number;

/**
 * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
 */
'cargo_package_name'?: string;

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
 * Вид упаковки (Наименование) (ID берем из запроса - cargo_package)
 */
'cargo_package_name'?: string;

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
 * Настройка рассылки запроса
 */
'send_to'?: 'contractor' | 'employee';

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
 * Кол-во отправленных заявок на запрос
 */
'count_rate_send'?: number;

/**
 * Кол-во отвеченных заявок на запрос
 */
'count_rate_answer'?: number;

/**
 * Кол-во отправленных/отвеченных заявок на запрос
 */
'count_rate_text'?: string;

/**
 * Флаги
 */
'kso': {
};

/**
 * Переводы
 */
'translate': {
};

/**
 * Вкладки
 */
'tabs': Array<string>;

/**
 * Класс строки
 */
'row_class'?: string;

/**
 * Класс ячейки
 */
'cell_class'?: string;

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
 * Настройка рассылки запроса
 */
'send_to'?: 'contractor' | 'employee';
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
 * Настройка рассылки запроса
 */
'send_to'?: 'contractor' | 'employee';
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
 * Настройка рассылки запроса
 */
'send_to'?: 'contractor' | 'employee';

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
 * Настройка рассылки запроса
 */
'send_to'?: 'contractor' | 'employee';

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
   * Проверка и сохранение выбора контрагентов для отправки запроса.
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
   * Проверка и сохранение выбора контрагентов для отправки запроса.
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

  /** Path part for operation `requestEmployeeSelectGet()` */
  static readonly RequestEmployeeSelectGetPath = '/request_employee_select_get';

  /**
   * Получение ID сотрудников выбранных для отправки запроса.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestEmployeeSelectGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestEmployeeSelectGet$Response(
    params: {

    /**
     * ID запроса
     */
      id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * ID Сотрудника
 */
'employee_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestEmployeeSelectGetPath, 'get');
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
         * ID Сотрудника
         */
        'employee_id'?: number;
        
        /**
         * Время создания
         */
        'time_add'?: string;
        }>;
      })
    );
  }

  /**
   * Получение ID сотрудников выбранных для отправки запроса.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestEmployeeSelectGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestEmployeeSelectGet(
    params: {

    /**
     * ID запроса
     */
      id: number;
    },
    context?: HttpContext
  ): Observable<{

/**
 * ID Сотрудника
 */
'employee_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;
}> {
    return this.requestEmployeeSelectGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID Сотрудника
 */
'employee_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;
}>): {

/**
 * ID Сотрудника
 */
'employee_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;
} => r.body)
    );
  }

  /** Path part for operation `requestEmployeeSelectUpdate()` */
  static readonly RequestEmployeeSelectUpdatePath = '/request_employee_select_update';

  /**
   * Обновление выбора сотрудников для отправки запроса.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestEmployeeSelectUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestEmployeeSelectUpdate$Response(
    params?: {
      body?: {

/**
 * ID запроса
 */
'id': number;

/**
 * ID Сотрудников
 */
'employee_id'?: Array<number>;

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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestEmployeeSelectUpdatePath, 'post');
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
   * Обновление выбора сотрудников для отправки запроса.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestEmployeeSelectUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestEmployeeSelectUpdate(
    params?: {
      body?: {

/**
 * ID запроса
 */
'id': number;

/**
 * ID Сотрудников
 */
'employee_id'?: Array<number>;

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
    return this.requestEmployeeSelectUpdate$Response(params, context).pipe(
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

  /** Path part for operation `requestSaveEmployeeBidding()` */
  static readonly RequestSaveEmployeeBiddingPath = '/request_save_employee_bidding';

  /**
   * Проверка и сохранение выбора контрагентов для отправки запроса.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestSaveEmployeeBidding()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestSaveEmployeeBidding$Response(
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestSaveEmployeeBiddingPath, 'post');
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
   * Проверка и сохранение выбора контрагентов для отправки запроса.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestSaveEmployeeBidding$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestSaveEmployeeBidding(
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
    return this.requestSaveEmployeeBidding$Response(params, context).pipe(
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
'field'?: 'id' | 'time_add' | 'customer_name' | 'departure_text' | 'arrival_text' | 'status_crm_name' | 'rate_contractor_name';

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
'field'?: 'id' | 'time_add' | 'customer_name' | 'departure_text' | 'arrival_text' | 'status_crm_name' | 'rate_contractor_name';

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
 * Cargo type
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
         * Cargo type
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
 * Cargo type
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
 * Cargo type
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
 * Cargo type
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
 * Cargo type
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
 * Cargo type
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
   * Ставки по запросу от контрагента (форма добавления ставок).
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
 * Валюта
 */
'currency': number;

/**
 * Страна отправления, ID
 */
'departure_country_id'?: string;

/**
 * Город отправления, ID
 */
'departure_city_id'?: string;

/**
 * Аэропорт вылета, ID
 */
'departure_point_id'?: string;

/**
 * Страна назначения, ID
 */
'arrival_country_id'?: string;

/**
 * Город назначения, ID
 */
'arrival_city_id'?: string;

/**
 * Аэропорт прибытия, ID
 */
'arrival_point_id'?: string;

/**
 * Вид перевозки, ID
 */
'transport_kind_id'?: string;

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
 * Cargo type
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
 * Транспортная компания (ИАТА) (ID берем из запроса - transport_carrier)
 */
'carrier_name': string;

/**
 * Транспортная компания (Описание) (ID берем из запроса - transport_carrier)
 */
'carrier_desc': string;

/**
 * ID Маршрут (ID берем из запроса - direction_route)
 */
'route_id'?: number;

/**
 * Наименование маршрута
 */
'route_name': string;

/**
 * Расписание отправления (Departure schedule)
 */
'departure_schedule'?: Array<string>;

/**
 * Ближайшие рейсы (Nearest flight etd)
 */
'nearest_flight'?: Array<string>;

/**
 * Валюта
 */
'currency': number;

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
 * Ставка действует до
 */
'valid_time'?: string;

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
'field'?: string;

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
         * Валюта
         */
        'currency': number;
        
        /**
         * Страна отправления, ID
         */
        'departure_country_id'?: string;
        
        /**
         * Город отправления, ID
         */
        'departure_city_id'?: string;
        
        /**
         * Аэропорт вылета, ID
         */
        'departure_point_id'?: string;
        
        /**
         * Страна назначения, ID
         */
        'arrival_country_id'?: string;
        
        /**
         * Город назначения, ID
         */
        'arrival_city_id'?: string;
        
        /**
         * Аэропорт прибытия, ID
         */
        'arrival_point_id'?: string;
        
        /**
         * Вид перевозки, ID
         */
        'transport_kind_id'?: string;
        
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
         * Cargo type
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
         * Транспортная компания (ИАТА) (ID берем из запроса - transport_carrier)
         */
        'carrier_name': string;
        
        /**
         * Транспортная компания (Описание) (ID берем из запроса - transport_carrier)
         */
        'carrier_desc': string;
        
        /**
         * ID Маршрут (ID берем из запроса - direction_route)
         */
        'route_id'?: number;
        
        /**
         * Наименование маршрута
         */
        'route_name': string;
        
        /**
         * Расписание отправления (Departure schedule)
         */
        'departure_schedule'?: Array<string>;
        
        /**
         * Ближайшие рейсы (Nearest flight etd)
         */
        'nearest_flight'?: Array<string>;
        
        /**
         * Валюта
         */
        'currency': number;
        
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
         * Ставка действует до
         */
        'valid_time'?: string;
        
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
        'field'?: string;
        
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
   * Ставки по запросу от контрагента (форма добавления ставок).
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
 * Валюта
 */
'currency': number;

/**
 * Страна отправления, ID
 */
'departure_country_id'?: string;

/**
 * Город отправления, ID
 */
'departure_city_id'?: string;

/**
 * Аэропорт вылета, ID
 */
'departure_point_id'?: string;

/**
 * Страна назначения, ID
 */
'arrival_country_id'?: string;

/**
 * Город назначения, ID
 */
'arrival_city_id'?: string;

/**
 * Аэропорт прибытия, ID
 */
'arrival_point_id'?: string;

/**
 * Вид перевозки, ID
 */
'transport_kind_id'?: string;

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
 * Cargo type
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
 * Транспортная компания (ИАТА) (ID берем из запроса - transport_carrier)
 */
'carrier_name': string;

/**
 * Транспортная компания (Описание) (ID берем из запроса - transport_carrier)
 */
'carrier_desc': string;

/**
 * ID Маршрут (ID берем из запроса - direction_route)
 */
'route_id'?: number;

/**
 * Наименование маршрута
 */
'route_name': string;

/**
 * Расписание отправления (Departure schedule)
 */
'departure_schedule'?: Array<string>;

/**
 * Ближайшие рейсы (Nearest flight etd)
 */
'nearest_flight'?: Array<string>;

/**
 * Валюта
 */
'currency': number;

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
 * Ставка действует до
 */
'valid_time'?: string;

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
'field'?: string;

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
 * Валюта
 */
'currency': number;

/**
 * Страна отправления, ID
 */
'departure_country_id'?: string;

/**
 * Город отправления, ID
 */
'departure_city_id'?: string;

/**
 * Аэропорт вылета, ID
 */
'departure_point_id'?: string;

/**
 * Страна назначения, ID
 */
'arrival_country_id'?: string;

/**
 * Город назначения, ID
 */
'arrival_city_id'?: string;

/**
 * Аэропорт прибытия, ID
 */
'arrival_point_id'?: string;

/**
 * Вид перевозки, ID
 */
'transport_kind_id'?: string;

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
 * Cargo type
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
 * Транспортная компания (ИАТА) (ID берем из запроса - transport_carrier)
 */
'carrier_name': string;

/**
 * Транспортная компания (Описание) (ID берем из запроса - transport_carrier)
 */
'carrier_desc': string;

/**
 * ID Маршрут (ID берем из запроса - direction_route)
 */
'route_id'?: number;

/**
 * Наименование маршрута
 */
'route_name': string;

/**
 * Расписание отправления (Departure schedule)
 */
'departure_schedule'?: Array<string>;

/**
 * Ближайшие рейсы (Nearest flight etd)
 */
'nearest_flight'?: Array<string>;

/**
 * Валюта
 */
'currency': number;

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
 * Ставка действует до
 */
'valid_time'?: string;

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
'field'?: string;

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
 * Валюта
 */
'currency': number;

/**
 * Страна отправления, ID
 */
'departure_country_id'?: string;

/**
 * Город отправления, ID
 */
'departure_city_id'?: string;

/**
 * Аэропорт вылета, ID
 */
'departure_point_id'?: string;

/**
 * Страна назначения, ID
 */
'arrival_country_id'?: string;

/**
 * Город назначения, ID
 */
'arrival_city_id'?: string;

/**
 * Аэропорт прибытия, ID
 */
'arrival_point_id'?: string;

/**
 * Вид перевозки, ID
 */
'transport_kind_id'?: string;

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
 * Cargo type
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
 * Транспортная компания (ИАТА) (ID берем из запроса - transport_carrier)
 */
'carrier_name': string;

/**
 * Транспортная компания (Описание) (ID берем из запроса - transport_carrier)
 */
'carrier_desc': string;

/**
 * ID Маршрут (ID берем из запроса - direction_route)
 */
'route_id'?: number;

/**
 * Наименование маршрута
 */
'route_name': string;

/**
 * Расписание отправления (Departure schedule)
 */
'departure_schedule'?: Array<string>;

/**
 * Ближайшие рейсы (Nearest flight etd)
 */
'nearest_flight'?: Array<string>;

/**
 * Валюта
 */
'currency': number;

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
 * Ставка действует до
 */
'valid_time'?: string;

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
'field'?: string;

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
 * Транспортная компания (ИАТА) (ID берем из запроса - transport_carrier)
 */
'carrier_name': string;

/**
 * Транспортная компания (Описание) (ID берем из запроса - transport_carrier)
 */
'carrier_desc': string;

/**
 * ID Маршрут (ID берем из запроса - direction_route)
 */
'route_id'?: number;

/**
 * Наименование маршрута
 */
'route_name': string;

/**
 * Расписание отправления (Departure schedule)
 */
'departure_schedule'?: Array<string>;

/**
 * Ближайшие рейсы (Nearest flight etd)
 */
'nearest_flight'?: Array<string>;

/**
 * Валюта
 */
'currency': number;

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
 * Ставка действует до
 */
'valid_time'?: string;

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
'field'?: string;

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
 * Транспортная компания (ИАТА) (ID берем из запроса - transport_carrier)
 */
'carrier_name': string;

/**
 * Транспортная компания (Описание) (ID берем из запроса - transport_carrier)
 */
'carrier_desc': string;

/**
 * ID Маршрут (ID берем из запроса - direction_route)
 */
'route_id'?: number;

/**
 * Наименование маршрута
 */
'route_name': string;

/**
 * Расписание отправления (Departure schedule)
 */
'departure_schedule'?: Array<string>;

/**
 * Ближайшие рейсы (Nearest flight etd)
 */
'nearest_flight'?: Array<string>;

/**
 * Валюта
 */
'currency': number;

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
 * Ставка действует до
 */
'valid_time'?: string;

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
'field'?: string;

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

  /** Path part for operation `requestRateFormParam()` */
  static readonly RequestRateFormParamPath = '/request_rate_form_param';

  /**
   * Параметры для форм.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRateFormParam()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateFormParam$Response(
    params: {

    /**
     * ID Запроса
     */
      request_id: number;

    /**
     * Метод (final, customs, point, transporter, other)
     */
      method: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Услуги
 */
'charges'?: Array<{
}>;

/**
 * Валюты
 */
'currency': Array<{
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateFormParamPath, 'get');
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
         * Услуги
         */
        'charges'?: Array<{
        }>;
        
        /**
         * Валюты
         */
        'currency': Array<{
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
   * To access the full response (for headers, for example), `requestRateFormParam$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateFormParam(
    params: {

    /**
     * ID Запроса
     */
      request_id: number;

    /**
     * Метод (final, customs, point, transporter, other)
     */
      method: string;
    },
    context?: HttpContext
  ): Observable<{

/**
 * Услуги
 */
'charges'?: Array<{
}>;

/**
 * Валюты
 */
'currency': Array<{
}>;
}> {
    return this.requestRateFormParam$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Услуги
 */
'charges'?: Array<{
}>;

/**
 * Валюты
 */
'currency': Array<{
}>;
}>): {

/**
 * Услуги
 */
'charges'?: Array<{
}>;

/**
 * Валюты
 */
'currency': Array<{
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

  /** Path part for operation `requestRateDelete()` */
  static readonly RequestRateDeletePath = '/request_rate_delete';

  /**
   * Удаление ставки запроса.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRateDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRateDelete$Response(
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateDeletePath, 'post');
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
   * Удаление ставки запроса.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRateDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRateDelete(
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
    return this.requestRateDelete$Response(params, context).pipe(
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

  /** Path part for operation `requestRateDouble()` */
  static readonly RequestRateDoublePath = '/request_rate_double';

  /**
   * Дублирование ставок запроса.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRateDouble()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRateDouble$Response(
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateDoublePath, 'post');
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
   * Дублирование ставок запроса.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRateDouble$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRateDouble(
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
    return this.requestRateDouble$Response(params, context).pipe(
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
     * Подрядчики
     */
      contractor?: number;

    /**
     * Авиалинии
     */
      carrier?: number;

    /**
     * Тип маршрута (ID берем из запроса - direction_flight)
     */
      departure_flight?: number;

    /**
     * Аэропорт вылета
     */
      departure_point?: number;

    /**
     * Аэропорт прибытия
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
 * Дата создания
 */
'time_add': string;

/**
 * Дата запроса
 */
'time_request'?: string;

/**
 * Дата ответа
 */
'time_answer'?: string;

/**
 * Ставка действует до
 */
'valid_time'?: string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Дата запроса
 */
'time_request'?: string;
};

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Подрядчик
 */
'contractor': {

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * ID подрядчика (ID берем из запроса - contractor_list)
 */
'id': number;

/**
 * Подрядчик
 */
'name': string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * % выигранных торгов
 */
'trade_success_percent'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * % проигранных торгов
 */
'trade_fail_percent'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Email
 */
'email'?: string;

/**
 * Телефон
 */
'phone'?: string;
};

/**
 * ID транспортной компания (код) (ID берем из запроса - transport_carrier)
 */
'carrier_name': string;

/**
 * ID транспортной компания (наименование) (ID берем из запроса - transport_carrier)
 */
'carrier_desc'?: string;

/**
 * Транспортная компания
 */
'carrier': {

/**
 * Наименование
 */
'name': string;

/**
 * IATA
 */
'iata': number;
};

/**
 * ID маршрута (ID берем из запроса - direction_route)
 */
'route_id'?: number;

/**
 * Наименование маршрута
 */
'route_name': string;

/**
 * Маршрут
 */
'route': {

/**
 * Наименование
 */
'name': string;

/**
 * Тип транспорта
 */
'kind_key': string;

/**
 * Тип маршрута
 */
'route_type': string;

/**
 * Тип маршрута (иконка)
 */
'route_type_key': string;
};

/**
 * Пункт назначения
 */
'point'?: {
};

/**
 * Пункт отправки
 */
'departure_point'?: {
};

/**
 * Расписание
 */
'departure_schedule': Array<string>;

/**
 * Расписание дней вылета
 */
'departure_schedule_text': Array<string>;

/**
 * Расписание дней вылета
 */
'departure_schedule_text2': string;

/**
 * Свободные места
 */
'nearest_flight': Array<string>;

/**
 * Свободные места
 */
'nearest_flight_text': string;

/**
 * Время транзита
 */
'transit_time': {

/**
 * Время транзита От
 */
'from': number;

/**
 * Время транзита До
 */
'to': number;
};

/**
 * Время транзита
 */
'transit_time_text': string;

/**
 * Тип ставки
 */
'rate_type': 'detail' | 'single';

/**
 * Сумма
 */
'total_cost': number;

/**
 * Ставка
 */
'total_cost_text': string;

/**
 * Валюта
 */
'currecy_text': string;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Включение прибыли (Profit is included)
 */
'profit_include'?: boolean;

/**
 * Значения ставок
 */
'values': Array<{

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
'price': number;

/**
 * Количество
 */
'value': number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;

/**
 * Наименование
 */
'name': string;

/**
 * Стоимость
 */
'cost': string;

/**
 * Стоимость
 */
'cost_text': string;
}>;

/**
 * Наименование статей затрат
 */
'service_items': string;

/**
 * Сводная информация
 */
'summary_data': Array<{

/**
 * Наименование
 */
'name': string;

/**
 * Значение
 */
'value': string;

/**
 * Широкая колонка
 */
'wide_row'?: boolean;
}>;

/**
 * Примечание
 */
'comment'?: string;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateCustomsListPath, 'get');
    if (params) {
      rb.query('request_id', params.request_id, {});
      rb.query('contractor', params.contractor, {});
      rb.query('carrier', params.carrier, {});
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
         * Дата создания
         */
        'time_add': string;
        
        /**
         * Дата запроса
         */
        'time_request'?: string;
        
        /**
         * Дата ответа
         */
        'time_answer'?: string;
        
        /**
         * Ставка действует до
         */
        'valid_time'?: string;
        
        /**
         * ID Запроса
         */
        'request_id': number;
        
        /**
         * Запрос
         */
        'request': {
        
        /**
         * Кол-во мест
         */
        'cargo_places_count'?: number;
        
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
         * Объем, м3
         */
        'cargo_places_volume'?: number;
        
        /**
         * Дата запроса
         */
        'time_request'?: string;
        };
        
        /**
         * ID контрагента (ID берем из запроса - contractor_list)
         */
        'contractor_id': number;
        
        /**
         * Подрядчик
         */
        'contractor': {
        
        /**
         * Агент транспортной компании
         */
        'carrier_name'?: string;
        
        /**
         * Агент транспортной компании (ID берем из запроса - transport_carrier)
         */
        'carrier_id'?: number;
        
        /**
         * ID подрядчика (ID берем из запроса - contractor_list)
         */
        'id': number;
        
        /**
         * Подрядчик
         */
        'name': string;
        
        /**
         * Рейтинг в системе (NPS)
         */
        'rating_nps_text'?: string;
        
        /**
         * Рейтинг в системе (NPS)
         */
        'rating_nps'?: number;
        
        /**
         * Участие в торгах (общее количество)
         */
        'trade_count'?: number;
        
        /**
         * Количество выигранных торгов
         */
        'trade_success_count'?: number;
        
        /**
         * % выигранных торгов
         */
        'trade_success_percent'?: number;
        
        /**
         * Количество проигранных торгов
         */
        'trade_fail_count'?: number;
        
        /**
         * % проигранных торгов
         */
        'trade_fail_percent'?: number;
        
        /**
         * Участие в торгах (результаты)
         */
        'trade_count_text'?: number;
        
        /**
         * Email
         */
        'email'?: string;
        
        /**
         * Телефон
         */
        'phone'?: string;
        };
        
        /**
         * ID транспортной компания (код) (ID берем из запроса - transport_carrier)
         */
        'carrier_name': string;
        
        /**
         * ID транспортной компания (наименование) (ID берем из запроса - transport_carrier)
         */
        'carrier_desc'?: string;
        
        /**
         * Транспортная компания
         */
        'carrier': {
        
        /**
         * Наименование
         */
        'name': string;
        
        /**
         * IATA
         */
        'iata': number;
        };
        
        /**
         * ID маршрута (ID берем из запроса - direction_route)
         */
        'route_id'?: number;
        
        /**
         * Наименование маршрута
         */
        'route_name': string;
        
        /**
         * Маршрут
         */
        'route': {
        
        /**
         * Наименование
         */
        'name': string;
        
        /**
         * Тип транспорта
         */
        'kind_key': string;
        
        /**
         * Тип маршрута
         */
        'route_type': string;
        
        /**
         * Тип маршрута (иконка)
         */
        'route_type_key': string;
        };
        
        /**
         * Пункт назначения
         */
        'point'?: {
        };
        
        /**
         * Пункт отправки
         */
        'departure_point'?: {
        };
        
        /**
         * Расписание
         */
        'departure_schedule': Array<string>;
        
        /**
         * Расписание дней вылета
         */
        'departure_schedule_text': Array<string>;
        
        /**
         * Расписание дней вылета
         */
        'departure_schedule_text2': string;
        
        /**
         * Свободные места
         */
        'nearest_flight': Array<string>;
        
        /**
         * Свободные места
         */
        'nearest_flight_text': string;
        
        /**
         * Время транзита
         */
        'transit_time': {
        
        /**
         * Время транзита От
         */
        'from': number;
        
        /**
         * Время транзита До
         */
        'to': number;
        };
        
        /**
         * Время транзита
         */
        'transit_time_text': string;
        
        /**
         * Тип ставки
         */
        'rate_type': 'detail' | 'single';
        
        /**
         * Сумма
         */
        'total_cost': number;
        
        /**
         * Ставка
         */
        'total_cost_text': string;
        
        /**
         * Валюта
         */
        'currecy_text': string;
        
        /**
         * Валюта (ID берем из запроса - system_currency)
         */
        'currency'?: number;
        
        /**
         * Включение прибыли (Profit is included)
         */
        'profit_include'?: boolean;
        
        /**
         * Значения ставок
         */
        'values': Array<{
        
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
        'price': number;
        
        /**
         * Количество
         */
        'value': number;
        
        /**
         * Фиксированная надбавка
         */
        'fix'?: number;
        
        /**
         * Комментарий
         */
        'comment'?: string;
        
        /**
         * Признак выбора
         */
        'select'?: boolean;
        
        /**
         * Наименование
         */
        'name': string;
        
        /**
         * Стоимость
         */
        'cost': string;
        
        /**
         * Стоимость
         */
        'cost_text': string;
        }>;
        
        /**
         * Наименование статей затрат
         */
        'service_items': string;
        
        /**
         * Сводная информация
         */
        'summary_data': Array<{
        
        /**
         * Наименование
         */
        'name': string;
        
        /**
         * Значение
         */
        'value': string;
        
        /**
         * Широкая колонка
         */
        'wide_row'?: boolean;
        }>;
        
        /**
         * Примечание
         */
        'comment'?: string;
        
        /**
         * В итоговом
         */
        'selected'?: boolean;
        
        /**
         * В коммерческом предложении
         */
        'offer'?: boolean;
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
     * Подрядчики
     */
      contractor?: number;

    /**
     * Авиалинии
     */
      carrier?: number;

    /**
     * Тип маршрута (ID берем из запроса - direction_flight)
     */
      departure_flight?: number;

    /**
     * Аэропорт вылета
     */
      departure_point?: number;

    /**
     * Аэропорт прибытия
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
 * Дата создания
 */
'time_add': string;

/**
 * Дата запроса
 */
'time_request'?: string;

/**
 * Дата ответа
 */
'time_answer'?: string;

/**
 * Ставка действует до
 */
'valid_time'?: string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Дата запроса
 */
'time_request'?: string;
};

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Подрядчик
 */
'contractor': {

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * ID подрядчика (ID берем из запроса - contractor_list)
 */
'id': number;

/**
 * Подрядчик
 */
'name': string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * % выигранных торгов
 */
'trade_success_percent'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * % проигранных торгов
 */
'trade_fail_percent'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Email
 */
'email'?: string;

/**
 * Телефон
 */
'phone'?: string;
};

/**
 * ID транспортной компания (код) (ID берем из запроса - transport_carrier)
 */
'carrier_name': string;

/**
 * ID транспортной компания (наименование) (ID берем из запроса - transport_carrier)
 */
'carrier_desc'?: string;

/**
 * Транспортная компания
 */
'carrier': {

/**
 * Наименование
 */
'name': string;

/**
 * IATA
 */
'iata': number;
};

/**
 * ID маршрута (ID берем из запроса - direction_route)
 */
'route_id'?: number;

/**
 * Наименование маршрута
 */
'route_name': string;

/**
 * Маршрут
 */
'route': {

/**
 * Наименование
 */
'name': string;

/**
 * Тип транспорта
 */
'kind_key': string;

/**
 * Тип маршрута
 */
'route_type': string;

/**
 * Тип маршрута (иконка)
 */
'route_type_key': string;
};

/**
 * Пункт назначения
 */
'point'?: {
};

/**
 * Пункт отправки
 */
'departure_point'?: {
};

/**
 * Расписание
 */
'departure_schedule': Array<string>;

/**
 * Расписание дней вылета
 */
'departure_schedule_text': Array<string>;

/**
 * Расписание дней вылета
 */
'departure_schedule_text2': string;

/**
 * Свободные места
 */
'nearest_flight': Array<string>;

/**
 * Свободные места
 */
'nearest_flight_text': string;

/**
 * Время транзита
 */
'transit_time': {

/**
 * Время транзита От
 */
'from': number;

/**
 * Время транзита До
 */
'to': number;
};

/**
 * Время транзита
 */
'transit_time_text': string;

/**
 * Тип ставки
 */
'rate_type': 'detail' | 'single';

/**
 * Сумма
 */
'total_cost': number;

/**
 * Ставка
 */
'total_cost_text': string;

/**
 * Валюта
 */
'currecy_text': string;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Включение прибыли (Profit is included)
 */
'profit_include'?: boolean;

/**
 * Значения ставок
 */
'values': Array<{

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
'price': number;

/**
 * Количество
 */
'value': number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;

/**
 * Наименование
 */
'name': string;

/**
 * Стоимость
 */
'cost': string;

/**
 * Стоимость
 */
'cost_text': string;
}>;

/**
 * Наименование статей затрат
 */
'service_items': string;

/**
 * Сводная информация
 */
'summary_data': Array<{

/**
 * Наименование
 */
'name': string;

/**
 * Значение
 */
'value': string;

/**
 * Широкая колонка
 */
'wide_row'?: boolean;
}>;

/**
 * Примечание
 */
'comment'?: string;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
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
 * Дата создания
 */
'time_add': string;

/**
 * Дата запроса
 */
'time_request'?: string;

/**
 * Дата ответа
 */
'time_answer'?: string;

/**
 * Ставка действует до
 */
'valid_time'?: string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Дата запроса
 */
'time_request'?: string;
};

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Подрядчик
 */
'contractor': {

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * ID подрядчика (ID берем из запроса - contractor_list)
 */
'id': number;

/**
 * Подрядчик
 */
'name': string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * % выигранных торгов
 */
'trade_success_percent'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * % проигранных торгов
 */
'trade_fail_percent'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Email
 */
'email'?: string;

/**
 * Телефон
 */
'phone'?: string;
};

/**
 * ID транспортной компания (код) (ID берем из запроса - transport_carrier)
 */
'carrier_name': string;

/**
 * ID транспортной компания (наименование) (ID берем из запроса - transport_carrier)
 */
'carrier_desc'?: string;

/**
 * Транспортная компания
 */
'carrier': {

/**
 * Наименование
 */
'name': string;

/**
 * IATA
 */
'iata': number;
};

/**
 * ID маршрута (ID берем из запроса - direction_route)
 */
'route_id'?: number;

/**
 * Наименование маршрута
 */
'route_name': string;

/**
 * Маршрут
 */
'route': {

/**
 * Наименование
 */
'name': string;

/**
 * Тип транспорта
 */
'kind_key': string;

/**
 * Тип маршрута
 */
'route_type': string;

/**
 * Тип маршрута (иконка)
 */
'route_type_key': string;
};

/**
 * Пункт назначения
 */
'point'?: {
};

/**
 * Пункт отправки
 */
'departure_point'?: {
};

/**
 * Расписание
 */
'departure_schedule': Array<string>;

/**
 * Расписание дней вылета
 */
'departure_schedule_text': Array<string>;

/**
 * Расписание дней вылета
 */
'departure_schedule_text2': string;

/**
 * Свободные места
 */
'nearest_flight': Array<string>;

/**
 * Свободные места
 */
'nearest_flight_text': string;

/**
 * Время транзита
 */
'transit_time': {

/**
 * Время транзита От
 */
'from': number;

/**
 * Время транзита До
 */
'to': number;
};

/**
 * Время транзита
 */
'transit_time_text': string;

/**
 * Тип ставки
 */
'rate_type': 'detail' | 'single';

/**
 * Сумма
 */
'total_cost': number;

/**
 * Ставка
 */
'total_cost_text': string;

/**
 * Валюта
 */
'currecy_text': string;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Включение прибыли (Profit is included)
 */
'profit_include'?: boolean;

/**
 * Значения ставок
 */
'values': Array<{

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
'price': number;

/**
 * Количество
 */
'value': number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;

/**
 * Наименование
 */
'name': string;

/**
 * Стоимость
 */
'cost': string;

/**
 * Стоимость
 */
'cost_text': string;
}>;

/**
 * Наименование статей затрат
 */
'service_items': string;

/**
 * Сводная информация
 */
'summary_data': Array<{

/**
 * Наименование
 */
'name': string;

/**
 * Значение
 */
'value': string;

/**
 * Широкая колонка
 */
'wide_row'?: boolean;
}>;

/**
 * Примечание
 */
'comment'?: string;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
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
 * Дата запроса
 */
'time_request'?: string;

/**
 * Дата ответа
 */
'time_answer'?: string;

/**
 * Ставка действует до
 */
'valid_time'?: string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Дата запроса
 */
'time_request'?: string;
};

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Подрядчик
 */
'contractor': {

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * ID подрядчика (ID берем из запроса - contractor_list)
 */
'id': number;

/**
 * Подрядчик
 */
'name': string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * % выигранных торгов
 */
'trade_success_percent'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * % проигранных торгов
 */
'trade_fail_percent'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Email
 */
'email'?: string;

/**
 * Телефон
 */
'phone'?: string;
};

/**
 * ID транспортной компания (код) (ID берем из запроса - transport_carrier)
 */
'carrier_name': string;

/**
 * ID транспортной компания (наименование) (ID берем из запроса - transport_carrier)
 */
'carrier_desc'?: string;

/**
 * Транспортная компания
 */
'carrier': {

/**
 * Наименование
 */
'name': string;

/**
 * IATA
 */
'iata': number;
};

/**
 * ID маршрута (ID берем из запроса - direction_route)
 */
'route_id'?: number;

/**
 * Наименование маршрута
 */
'route_name': string;

/**
 * Маршрут
 */
'route': {

/**
 * Наименование
 */
'name': string;

/**
 * Тип транспорта
 */
'kind_key': string;

/**
 * Тип маршрута
 */
'route_type': string;

/**
 * Тип маршрута (иконка)
 */
'route_type_key': string;
};

/**
 * Пункт назначения
 */
'point'?: {
};

/**
 * Пункт отправки
 */
'departure_point'?: {
};

/**
 * Расписание
 */
'departure_schedule': Array<string>;

/**
 * Расписание дней вылета
 */
'departure_schedule_text': Array<string>;

/**
 * Расписание дней вылета
 */
'departure_schedule_text2': string;

/**
 * Свободные места
 */
'nearest_flight': Array<string>;

/**
 * Свободные места
 */
'nearest_flight_text': string;

/**
 * Время транзита
 */
'transit_time': {

/**
 * Время транзита От
 */
'from': number;

/**
 * Время транзита До
 */
'to': number;
};

/**
 * Время транзита
 */
'transit_time_text': string;

/**
 * Тип ставки
 */
'rate_type': 'detail' | 'single';

/**
 * Сумма
 */
'total_cost': number;

/**
 * Ставка
 */
'total_cost_text': string;

/**
 * Валюта
 */
'currecy_text': string;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Включение прибыли (Profit is included)
 */
'profit_include'?: boolean;

/**
 * Значения ставок
 */
'values': Array<{

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
'price': number;

/**
 * Количество
 */
'value': number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;

/**
 * Наименование
 */
'name': string;

/**
 * Стоимость
 */
'cost': string;

/**
 * Стоимость
 */
'cost_text': string;
}>;

/**
 * Наименование статей затрат
 */
'service_items': string;

/**
 * Сводная информация
 */
'summary_data': Array<{

/**
 * Наименование
 */
'name': string;

/**
 * Значение
 */
'value': string;

/**
 * Широкая колонка
 */
'wide_row'?: boolean;
}>;

/**
 * Примечание
 */
'comment'?: string;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
}>;
} => r.body)
    );
  }

  /** Path part for operation `requestRateCustomsSave()` */
  static readonly RequestRateCustomsSavePath = '/request_rate_customs_save';

  /**
   * Ставка запроса До границы.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRateCustomsSave()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRateCustomsSave$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id'?: number;

/**
 * Дата запроса
 */
'time_request'?: string;

/**
 * Дата ответа
 */
'time_answer'?: string;

/**
 * Ставка действует до
 */
'valid_time'?: string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * ID транспортной компания (код) (ID берем из запроса - transport_carrier)
 */
'carrier_name': string;

/**
 * ID транспортной компания (наименование) (ID берем из запроса - transport_carrier)
 */
'carrier_desc'?: string;

/**
 * ID маршрута (ID берем из запроса - direction_route)
 */
'route_id'?: number;

/**
 * Наименование маршрута
 */
'route_name': string;

/**
 * Расписание
 */
'departure_schedule': Array<string>;

/**
 * Свободные места
 */
'nearest_flight': Array<string>;

/**
 * Время транзита
 */
'transit_time': {

/**
 * Время транзита От
 */
'from': number;

/**
 * Время транзита До
 */
'to': number;
};

/**
 * Тип ставки
 */
'rate_type': 'detail' | 'single';

/**
 * Сумма
 */
'total_cost'?: number;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Включение прибыли (Profit is included)
 */
'profit_include'?: boolean;

/**
 * Значения ставок
 */
'values': Array<{

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
'price': number;

/**
 * Количество
 */
'value': number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;
}>;

/**
 * Примечание
 */
'comment'?: string;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateCustomsSavePath, 'post');
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
   * Ставка запроса До границы.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRateCustomsSave$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRateCustomsSave(
    params?: {
      body?: {

/**
 * ID
 */
'id'?: number;

/**
 * Дата запроса
 */
'time_request'?: string;

/**
 * Дата ответа
 */
'time_answer'?: string;

/**
 * Ставка действует до
 */
'valid_time'?: string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * ID транспортной компания (код) (ID берем из запроса - transport_carrier)
 */
'carrier_name': string;

/**
 * ID транспортной компания (наименование) (ID берем из запроса - transport_carrier)
 */
'carrier_desc'?: string;

/**
 * ID маршрута (ID берем из запроса - direction_route)
 */
'route_id'?: number;

/**
 * Наименование маршрута
 */
'route_name': string;

/**
 * Расписание
 */
'departure_schedule': Array<string>;

/**
 * Свободные места
 */
'nearest_flight': Array<string>;

/**
 * Время транзита
 */
'transit_time': {

/**
 * Время транзита От
 */
'from': number;

/**
 * Время транзита До
 */
'to': number;
};

/**
 * Тип ставки
 */
'rate_type': 'detail' | 'single';

/**
 * Сумма
 */
'total_cost'?: number;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Включение прибыли (Profit is included)
 */
'profit_include'?: boolean;

/**
 * Значения ставок
 */
'values': Array<{

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
'price': number;

/**
 * Количество
 */
'value': number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;
}>;

/**
 * Примечание
 */
'comment'?: string;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.requestRateCustomsSave$Response(params, context).pipe(
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
     * Наименование аэропорта
     */
      point?: number;

    /**
     * Вид прайса
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
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

/**
 * Вес, кг
 */
'cargo_places_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес, кг
 */
'cargo_places_paid_weight'?: number;
};

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Подрядчик
 */
'contractor': {

/**
 * Подрядчик
 */
'name': string;

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * % выигранных торгов
 */
'trade_success_percent'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * % проигранных торгов
 */
'trade_fail_percent'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Email
 */
'email'?: string;

/**
 * Телефон
 */
'phone'?: string;
};

/**
 * ID аэропорта
 */
'point_id': number;

/**
 * Аэропорт
 */
'point': {

/**
 * Наименование
 */
'name': string;

/**
 * Адрес
 */
'address'?: string;

/**
 * Адрес СВХ
 */
'svh_address'?: string;

/**
 * Сайт
 */
'web'?: string;

/**
 * Широта
 */
'lat'?: string;

/**
 * Долгота
 */
'long'?: string;

/**
 * График работы (будни)
 */
'schedule_work'?: string;

/**
 * График работы (вых.)
 */
'schedule_weekend_work'?: string;
};

/**
 * Вид рейса
 */
'point_action_id': number;

/**
 * Вид рейса
 */
'point_action': {

/**
 * Наименование
 */
'name': string;
};

/**
 * Значения ставок
 */
'values': Array<{

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
'price': number;

/**
 * Количество
 */
'value': number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;

/**
 * Наименование
 */
'name': string;

/**
 * Стоимость
 */
'cost': string;

/**
 * Стоимость
 */
'cost_text': string;
}>;

/**
 * Наименование статей затрат
 */
'service_items': string;

/**
 * Сумма
 */
'total_cost': number;

/**
 * Сумма
 */
'total_cost_text': string;

/**
 * Валюта
 */
'currecy_text'?: string;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Сводная информация
 */
'summary_data': Array<{

/**
 * Наименование
 */
'name': string;

/**
 * Значение
 */
'value': string;

/**
 * Широкая колонка
 */
'wide_row'?: boolean;
}>;

/**
 * Комментарий (Your Comment)
 */
'comment'?: string;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
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
         * Дата создания
         */
        'time_add': string;
        
        /**
         * ID Запроса
         */
        'request_id': number;
        
        /**
         * Запрос
         */
        'request': {
        
        /**
         * Кол-во мест
         */
        'cargo_places_count'?: number;
        
        /**
         * Вес, кг
         */
        'cargo_places_weight'?: number;
        
        /**
         * Плотность, кг/м3
         */
        'cargo_places_density'?: number;
        
        /**
         * Объем, м3
         */
        'cargo_places_volume'?: number;
        
        /**
         * Оплачиваемый вес, кг
         */
        'cargo_places_paid_weight'?: number;
        };
        
        /**
         * ID контрагента (ID берем из запроса - contractor_list)
         */
        'contractor_id': number;
        
        /**
         * Подрядчик
         */
        'contractor': {
        
        /**
         * Подрядчик
         */
        'name': string;
        
        /**
         * Агент транспортной компании
         */
        'carrier_name'?: string;
        
        /**
         * Агент транспортной компании (ID берем из запроса - transport_carrier)
         */
        'carrier_id'?: number;
        
        /**
         * Рейтинг в системе (NPS)
         */
        'rating_nps_text'?: string;
        
        /**
         * Рейтинг в системе (NPS)
         */
        'rating_nps'?: number;
        
        /**
         * Участие в торгах (общее количество)
         */
        'trade_count'?: number;
        
        /**
         * Количество выигранных торгов
         */
        'trade_success_count'?: number;
        
        /**
         * % выигранных торгов
         */
        'trade_success_percent'?: number;
        
        /**
         * Количество проигранных торгов
         */
        'trade_fail_count'?: number;
        
        /**
         * % проигранных торгов
         */
        'trade_fail_percent'?: number;
        
        /**
         * Участие в торгах (результаты)
         */
        'trade_count_text'?: number;
        
        /**
         * Email
         */
        'email'?: string;
        
        /**
         * Телефон
         */
        'phone'?: string;
        };
        
        /**
         * ID аэропорта
         */
        'point_id': number;
        
        /**
         * Аэропорт
         */
        'point': {
        
        /**
         * Наименование
         */
        'name': string;
        
        /**
         * Адрес
         */
        'address'?: string;
        
        /**
         * Адрес СВХ
         */
        'svh_address'?: string;
        
        /**
         * Сайт
         */
        'web'?: string;
        
        /**
         * Широта
         */
        'lat'?: string;
        
        /**
         * Долгота
         */
        'long'?: string;
        
        /**
         * График работы (будни)
         */
        'schedule_work'?: string;
        
        /**
         * График работы (вых.)
         */
        'schedule_weekend_work'?: string;
        };
        
        /**
         * Вид рейса
         */
        'point_action_id': number;
        
        /**
         * Вид рейса
         */
        'point_action': {
        
        /**
         * Наименование
         */
        'name': string;
        };
        
        /**
         * Значения ставок
         */
        'values': Array<{
        
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
        'price': number;
        
        /**
         * Количество
         */
        'value': number;
        
        /**
         * Фиксированная надбавка
         */
        'fix'?: number;
        
        /**
         * Комментарий
         */
        'comment'?: string;
        
        /**
         * Признак выбора
         */
        'select'?: boolean;
        
        /**
         * Наименование
         */
        'name': string;
        
        /**
         * Стоимость
         */
        'cost': string;
        
        /**
         * Стоимость
         */
        'cost_text': string;
        }>;
        
        /**
         * Наименование статей затрат
         */
        'service_items': string;
        
        /**
         * Сумма
         */
        'total_cost': number;
        
        /**
         * Сумма
         */
        'total_cost_text': string;
        
        /**
         * Валюта
         */
        'currecy_text'?: string;
        
        /**
         * Валюта (ID берем из запроса - system_currency)
         */
        'currency'?: number;
        
        /**
         * Сводная информация
         */
        'summary_data': Array<{
        
        /**
         * Наименование
         */
        'name': string;
        
        /**
         * Значение
         */
        'value': string;
        
        /**
         * Широкая колонка
         */
        'wide_row'?: boolean;
        }>;
        
        /**
         * Комментарий (Your Comment)
         */
        'comment'?: string;
        
        /**
         * В итоговом
         */
        'selected'?: boolean;
        
        /**
         * В коммерческом предложении
         */
        'offer'?: boolean;
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
     * Наименование аэропорта
     */
      point?: number;

    /**
     * Вид прайса
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
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

/**
 * Вес, кг
 */
'cargo_places_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес, кг
 */
'cargo_places_paid_weight'?: number;
};

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Подрядчик
 */
'contractor': {

/**
 * Подрядчик
 */
'name': string;

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * % выигранных торгов
 */
'trade_success_percent'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * % проигранных торгов
 */
'trade_fail_percent'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Email
 */
'email'?: string;

/**
 * Телефон
 */
'phone'?: string;
};

/**
 * ID аэропорта
 */
'point_id': number;

/**
 * Аэропорт
 */
'point': {

/**
 * Наименование
 */
'name': string;

/**
 * Адрес
 */
'address'?: string;

/**
 * Адрес СВХ
 */
'svh_address'?: string;

/**
 * Сайт
 */
'web'?: string;

/**
 * Широта
 */
'lat'?: string;

/**
 * Долгота
 */
'long'?: string;

/**
 * График работы (будни)
 */
'schedule_work'?: string;

/**
 * График работы (вых.)
 */
'schedule_weekend_work'?: string;
};

/**
 * Вид рейса
 */
'point_action_id': number;

/**
 * Вид рейса
 */
'point_action': {

/**
 * Наименование
 */
'name': string;
};

/**
 * Значения ставок
 */
'values': Array<{

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
'price': number;

/**
 * Количество
 */
'value': number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;

/**
 * Наименование
 */
'name': string;

/**
 * Стоимость
 */
'cost': string;

/**
 * Стоимость
 */
'cost_text': string;
}>;

/**
 * Наименование статей затрат
 */
'service_items': string;

/**
 * Сумма
 */
'total_cost': number;

/**
 * Сумма
 */
'total_cost_text': string;

/**
 * Валюта
 */
'currecy_text'?: string;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Сводная информация
 */
'summary_data': Array<{

/**
 * Наименование
 */
'name': string;

/**
 * Значение
 */
'value': string;

/**
 * Широкая колонка
 */
'wide_row'?: boolean;
}>;

/**
 * Комментарий (Your Comment)
 */
'comment'?: string;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
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
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

/**
 * Вес, кг
 */
'cargo_places_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес, кг
 */
'cargo_places_paid_weight'?: number;
};

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Подрядчик
 */
'contractor': {

/**
 * Подрядчик
 */
'name': string;

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * % выигранных торгов
 */
'trade_success_percent'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * % проигранных торгов
 */
'trade_fail_percent'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Email
 */
'email'?: string;

/**
 * Телефон
 */
'phone'?: string;
};

/**
 * ID аэропорта
 */
'point_id': number;

/**
 * Аэропорт
 */
'point': {

/**
 * Наименование
 */
'name': string;

/**
 * Адрес
 */
'address'?: string;

/**
 * Адрес СВХ
 */
'svh_address'?: string;

/**
 * Сайт
 */
'web'?: string;

/**
 * Широта
 */
'lat'?: string;

/**
 * Долгота
 */
'long'?: string;

/**
 * График работы (будни)
 */
'schedule_work'?: string;

/**
 * График работы (вых.)
 */
'schedule_weekend_work'?: string;
};

/**
 * Вид рейса
 */
'point_action_id': number;

/**
 * Вид рейса
 */
'point_action': {

/**
 * Наименование
 */
'name': string;
};

/**
 * Значения ставок
 */
'values': Array<{

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
'price': number;

/**
 * Количество
 */
'value': number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;

/**
 * Наименование
 */
'name': string;

/**
 * Стоимость
 */
'cost': string;

/**
 * Стоимость
 */
'cost_text': string;
}>;

/**
 * Наименование статей затрат
 */
'service_items': string;

/**
 * Сумма
 */
'total_cost': number;

/**
 * Сумма
 */
'total_cost_text': string;

/**
 * Валюта
 */
'currecy_text'?: string;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Сводная информация
 */
'summary_data': Array<{

/**
 * Наименование
 */
'name': string;

/**
 * Значение
 */
'value': string;

/**
 * Широкая колонка
 */
'wide_row'?: boolean;
}>;

/**
 * Комментарий (Your Comment)
 */
'comment'?: string;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
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
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

/**
 * Вес, кг
 */
'cargo_places_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес, кг
 */
'cargo_places_paid_weight'?: number;
};

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Подрядчик
 */
'contractor': {

/**
 * Подрядчик
 */
'name': string;

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * % выигранных торгов
 */
'trade_success_percent'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * % проигранных торгов
 */
'trade_fail_percent'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Email
 */
'email'?: string;

/**
 * Телефон
 */
'phone'?: string;
};

/**
 * ID аэропорта
 */
'point_id': number;

/**
 * Аэропорт
 */
'point': {

/**
 * Наименование
 */
'name': string;

/**
 * Адрес
 */
'address'?: string;

/**
 * Адрес СВХ
 */
'svh_address'?: string;

/**
 * Сайт
 */
'web'?: string;

/**
 * Широта
 */
'lat'?: string;

/**
 * Долгота
 */
'long'?: string;

/**
 * График работы (будни)
 */
'schedule_work'?: string;

/**
 * График работы (вых.)
 */
'schedule_weekend_work'?: string;
};

/**
 * Вид рейса
 */
'point_action_id': number;

/**
 * Вид рейса
 */
'point_action': {

/**
 * Наименование
 */
'name': string;
};

/**
 * Значения ставок
 */
'values': Array<{

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
'price': number;

/**
 * Количество
 */
'value': number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;

/**
 * Наименование
 */
'name': string;

/**
 * Стоимость
 */
'cost': string;

/**
 * Стоимость
 */
'cost_text': string;
}>;

/**
 * Наименование статей затрат
 */
'service_items': string;

/**
 * Сумма
 */
'total_cost': number;

/**
 * Сумма
 */
'total_cost_text': string;

/**
 * Валюта
 */
'currecy_text'?: string;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Сводная информация
 */
'summary_data': Array<{

/**
 * Наименование
 */
'name': string;

/**
 * Значение
 */
'value': string;

/**
 * Широкая колонка
 */
'wide_row'?: boolean;
}>;

/**
 * Комментарий (Your Comment)
 */
'comment'?: string;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
}>;
} => r.body)
    );
  }

  /** Path part for operation `requestRatePointSave()` */
  static readonly RequestRatePointSavePath = '/request_rate_point_save';

  /**
   * Ставки запроса Складские (СВХ).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRatePointSave()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRatePointSave$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id'?: number;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * ID аэропорта
 */
'point_id': number;

/**
 * Вид рейса
 */
'point_action_id': number;

/**
 * Значения ставок
 */
'values': Array<{

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
'price': number;

/**
 * Количество
 */
'value': number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;
}>;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Комментарий (Your Comment)
 */
'comment'?: string;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRatePointSavePath, 'post');
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
   * Ставки запроса Складские (СВХ).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRatePointSave$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRatePointSave(
    params?: {
      body?: {

/**
 * ID
 */
'id'?: number;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * ID аэропорта
 */
'point_id': number;

/**
 * Вид рейса
 */
'point_action_id': number;

/**
 * Значения ставок
 */
'values': Array<{

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
'price': number;

/**
 * Количество
 */
'value': number;

/**
 * Фиксированная надбавка
 */
'fix'?: number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;
}>;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Комментарий (Your Comment)
 */
'comment'?: string;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.requestRatePointSave$Response(params, context).pipe(
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
     * Наименование аэропорта
     */
      arrival_point?: number;

    /**
     * Подрядчики
     */
      contractor?: number;

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
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

/**
 * Вес, кг
 */
'cargo_places_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес, кг
 */
'cargo_places_paid_weight'?: number;
};

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Подрядчик
 */
'contractor': {

/**
 * Подрядчик
 */
'name': string;

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * % выигранных торгов
 */
'trade_success_percent'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * % проигранных торгов
 */
'trade_fail_percent'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Email
 */
'email'?: string;

/**
 * Телефон
 */
'phone'?: string;
};

/**
 * ID аэропорта
 */
'point_id': number;

/**
 * Аэропорт
 */
'point': {

/**
 * Наименование
 */
'name': string;

/**
 * Адрес
 */
'address'?: string;
};

/**
 * Город отправки
 */
'departure_city': {
};

/**
 * Город прибытия
 */
'arrival_city': {
};

/**
 * Вид рейса
 */
'point_action_id': number;

/**
 * Вид рейса
 */
'point_action': {

/**
 * Наименование
 */
'name': string;
};

/**
 * Срок (дней), от
 */
'days_min'?: string;

/**
 * Срок (дней), до
 */
'days_max'?: string;

/**
 * Срок, дн.
 */
'period'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Доставки
 */
'values': Array<{

/**
 * Тип транспорта
 */
'kind_id': number;

/**
 * Город убытия
 */
'departure_city_id': number;

/**
 * Город прибытия
 */
'arrival_city_id': number;

/**
 * Время транзита мин., дней
 */
'days_min': number;

/**
 * Время транзита макс., дней
 */
'days_max': number;

/**
 * Сумма за перевозку
 */
'amount': number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Тип транспорта
 */
'kind': {
};

/**
 * Город убытия
 */
'departure_city': {
};

/**
 * Город прибытия
 */
'arrival_city': {
};

/**
 * Стоимость
 */
'cost': string;

/**
 * Стоимость
 */
'cost_text': string;
}>;

/**
 * Наименование этапов доставки
 */
'service_items': string;

/**
 * Сумма
 */
'total_cost': number;

/**
 * Сумма
 */
'total_cost_text': string;

/**
 * Валюта
 */
'currecy_text': string;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Сводная информация
 */
'summary_data': Array<{

/**
 * Наименование
 */
'name': string;

/**
 * Значение
 */
'value': string;

/**
 * Широкая колонка
 */
'wide_row'?: boolean;
}>;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateTransporterListPath, 'get');
    if (params) {
      rb.query('request_id', params.request_id, {});
      rb.query('arrival_point', params.arrival_point, {});
      rb.query('contractor', params.contractor, {});
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
         * ID Запроса
         */
        'request_id': number;
        
        /**
         * Запрос
         */
        'request': {
        
        /**
         * Кол-во мест
         */
        'cargo_places_count'?: number;
        
        /**
         * Вес, кг
         */
        'cargo_places_weight'?: number;
        
        /**
         * Плотность, кг/м3
         */
        'cargo_places_density'?: number;
        
        /**
         * Объем, м3
         */
        'cargo_places_volume'?: number;
        
        /**
         * Оплачиваемый вес, кг
         */
        'cargo_places_paid_weight'?: number;
        };
        
        /**
         * ID контрагента (ID берем из запроса - contractor_list)
         */
        'contractor_id': number;
        
        /**
         * Подрядчик
         */
        'contractor': {
        
        /**
         * Подрядчик
         */
        'name': string;
        
        /**
         * Агент транспортной компании
         */
        'carrier_name'?: string;
        
        /**
         * Агент транспортной компании (ID берем из запроса - transport_carrier)
         */
        'carrier_id'?: number;
        
        /**
         * Рейтинг в системе (NPS)
         */
        'rating_nps_text'?: string;
        
        /**
         * Рейтинг в системе (NPS)
         */
        'rating_nps'?: number;
        
        /**
         * Участие в торгах (общее количество)
         */
        'trade_count'?: number;
        
        /**
         * Количество выигранных торгов
         */
        'trade_success_count'?: number;
        
        /**
         * % выигранных торгов
         */
        'trade_success_percent'?: number;
        
        /**
         * Количество проигранных торгов
         */
        'trade_fail_count'?: number;
        
        /**
         * % проигранных торгов
         */
        'trade_fail_percent'?: number;
        
        /**
         * Участие в торгах (результаты)
         */
        'trade_count_text'?: number;
        
        /**
         * Email
         */
        'email'?: string;
        
        /**
         * Телефон
         */
        'phone'?: string;
        };
        
        /**
         * ID аэропорта
         */
        'point_id': number;
        
        /**
         * Аэропорт
         */
        'point': {
        
        /**
         * Наименование
         */
        'name': string;
        
        /**
         * Адрес
         */
        'address'?: string;
        };
        
        /**
         * Город отправки
         */
        'departure_city': {
        };
        
        /**
         * Город прибытия
         */
        'arrival_city': {
        };
        
        /**
         * Вид рейса
         */
        'point_action_id': number;
        
        /**
         * Вид рейса
         */
        'point_action': {
        
        /**
         * Наименование
         */
        'name': string;
        };
        
        /**
         * Срок (дней), от
         */
        'days_min'?: string;
        
        /**
         * Срок (дней), до
         */
        'days_max'?: string;
        
        /**
         * Срок, дн.
         */
        'period'?: string;
        
        /**
         * Комментарий
         */
        'comment'?: string;
        
        /**
         * Доставки
         */
        'values': Array<{
        
        /**
         * Тип транспорта
         */
        'kind_id': number;
        
        /**
         * Город убытия
         */
        'departure_city_id': number;
        
        /**
         * Город прибытия
         */
        'arrival_city_id': number;
        
        /**
         * Время транзита мин., дней
         */
        'days_min': number;
        
        /**
         * Время транзита макс., дней
         */
        'days_max': number;
        
        /**
         * Сумма за перевозку
         */
        'amount': number;
        
        /**
         * Комментарий
         */
        'comment'?: string;
        
        /**
         * Тип транспорта
         */
        'kind': {
        };
        
        /**
         * Город убытия
         */
        'departure_city': {
        };
        
        /**
         * Город прибытия
         */
        'arrival_city': {
        };
        
        /**
         * Стоимость
         */
        'cost': string;
        
        /**
         * Стоимость
         */
        'cost_text': string;
        }>;
        
        /**
         * Наименование этапов доставки
         */
        'service_items': string;
        
        /**
         * Сумма
         */
        'total_cost': number;
        
        /**
         * Сумма
         */
        'total_cost_text': string;
        
        /**
         * Валюта
         */
        'currecy_text': string;
        
        /**
         * Валюта (ID берем из запроса - system_currency)
         */
        'currency'?: number;
        
        /**
         * Сводная информация
         */
        'summary_data': Array<{
        
        /**
         * Наименование
         */
        'name': string;
        
        /**
         * Значение
         */
        'value': string;
        
        /**
         * Широкая колонка
         */
        'wide_row'?: boolean;
        }>;
        
        /**
         * В итоговом
         */
        'selected'?: boolean;
        
        /**
         * В коммерческом предложении
         */
        'offer'?: boolean;
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
     * Наименование аэропорта
     */
      arrival_point?: number;

    /**
     * Подрядчики
     */
      contractor?: number;

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
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

/**
 * Вес, кг
 */
'cargo_places_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес, кг
 */
'cargo_places_paid_weight'?: number;
};

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Подрядчик
 */
'contractor': {

/**
 * Подрядчик
 */
'name': string;

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * % выигранных торгов
 */
'trade_success_percent'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * % проигранных торгов
 */
'trade_fail_percent'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Email
 */
'email'?: string;

/**
 * Телефон
 */
'phone'?: string;
};

/**
 * ID аэропорта
 */
'point_id': number;

/**
 * Аэропорт
 */
'point': {

/**
 * Наименование
 */
'name': string;

/**
 * Адрес
 */
'address'?: string;
};

/**
 * Город отправки
 */
'departure_city': {
};

/**
 * Город прибытия
 */
'arrival_city': {
};

/**
 * Вид рейса
 */
'point_action_id': number;

/**
 * Вид рейса
 */
'point_action': {

/**
 * Наименование
 */
'name': string;
};

/**
 * Срок (дней), от
 */
'days_min'?: string;

/**
 * Срок (дней), до
 */
'days_max'?: string;

/**
 * Срок, дн.
 */
'period'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Доставки
 */
'values': Array<{

/**
 * Тип транспорта
 */
'kind_id': number;

/**
 * Город убытия
 */
'departure_city_id': number;

/**
 * Город прибытия
 */
'arrival_city_id': number;

/**
 * Время транзита мин., дней
 */
'days_min': number;

/**
 * Время транзита макс., дней
 */
'days_max': number;

/**
 * Сумма за перевозку
 */
'amount': number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Тип транспорта
 */
'kind': {
};

/**
 * Город убытия
 */
'departure_city': {
};

/**
 * Город прибытия
 */
'arrival_city': {
};

/**
 * Стоимость
 */
'cost': string;

/**
 * Стоимость
 */
'cost_text': string;
}>;

/**
 * Наименование этапов доставки
 */
'service_items': string;

/**
 * Сумма
 */
'total_cost': number;

/**
 * Сумма
 */
'total_cost_text': string;

/**
 * Валюта
 */
'currecy_text': string;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Сводная информация
 */
'summary_data': Array<{

/**
 * Наименование
 */
'name': string;

/**
 * Значение
 */
'value': string;

/**
 * Широкая колонка
 */
'wide_row'?: boolean;
}>;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
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
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

/**
 * Вес, кг
 */
'cargo_places_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес, кг
 */
'cargo_places_paid_weight'?: number;
};

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Подрядчик
 */
'contractor': {

/**
 * Подрядчик
 */
'name': string;

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * % выигранных торгов
 */
'trade_success_percent'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * % проигранных торгов
 */
'trade_fail_percent'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Email
 */
'email'?: string;

/**
 * Телефон
 */
'phone'?: string;
};

/**
 * ID аэропорта
 */
'point_id': number;

/**
 * Аэропорт
 */
'point': {

/**
 * Наименование
 */
'name': string;

/**
 * Адрес
 */
'address'?: string;
};

/**
 * Город отправки
 */
'departure_city': {
};

/**
 * Город прибытия
 */
'arrival_city': {
};

/**
 * Вид рейса
 */
'point_action_id': number;

/**
 * Вид рейса
 */
'point_action': {

/**
 * Наименование
 */
'name': string;
};

/**
 * Срок (дней), от
 */
'days_min'?: string;

/**
 * Срок (дней), до
 */
'days_max'?: string;

/**
 * Срок, дн.
 */
'period'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Доставки
 */
'values': Array<{

/**
 * Тип транспорта
 */
'kind_id': number;

/**
 * Город убытия
 */
'departure_city_id': number;

/**
 * Город прибытия
 */
'arrival_city_id': number;

/**
 * Время транзита мин., дней
 */
'days_min': number;

/**
 * Время транзита макс., дней
 */
'days_max': number;

/**
 * Сумма за перевозку
 */
'amount': number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Тип транспорта
 */
'kind': {
};

/**
 * Город убытия
 */
'departure_city': {
};

/**
 * Город прибытия
 */
'arrival_city': {
};

/**
 * Стоимость
 */
'cost': string;

/**
 * Стоимость
 */
'cost_text': string;
}>;

/**
 * Наименование этапов доставки
 */
'service_items': string;

/**
 * Сумма
 */
'total_cost': number;

/**
 * Сумма
 */
'total_cost_text': string;

/**
 * Валюта
 */
'currecy_text': string;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Сводная информация
 */
'summary_data': Array<{

/**
 * Наименование
 */
'name': string;

/**
 * Значение
 */
'value': string;

/**
 * Широкая колонка
 */
'wide_row'?: boolean;
}>;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
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
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

/**
 * Вес, кг
 */
'cargo_places_weight'?: number;

/**
 * Плотность, кг/м3
 */
'cargo_places_density'?: number;

/**
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Оплачиваемый вес, кг
 */
'cargo_places_paid_weight'?: number;
};

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Подрядчик
 */
'contractor': {

/**
 * Подрядчик
 */
'name': string;

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * % выигранных торгов
 */
'trade_success_percent'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * % проигранных торгов
 */
'trade_fail_percent'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Email
 */
'email'?: string;

/**
 * Телефон
 */
'phone'?: string;
};

/**
 * ID аэропорта
 */
'point_id': number;

/**
 * Аэропорт
 */
'point': {

/**
 * Наименование
 */
'name': string;

/**
 * Адрес
 */
'address'?: string;
};

/**
 * Город отправки
 */
'departure_city': {
};

/**
 * Город прибытия
 */
'arrival_city': {
};

/**
 * Вид рейса
 */
'point_action_id': number;

/**
 * Вид рейса
 */
'point_action': {

/**
 * Наименование
 */
'name': string;
};

/**
 * Срок (дней), от
 */
'days_min'?: string;

/**
 * Срок (дней), до
 */
'days_max'?: string;

/**
 * Срок, дн.
 */
'period'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Доставки
 */
'values': Array<{

/**
 * Тип транспорта
 */
'kind_id': number;

/**
 * Город убытия
 */
'departure_city_id': number;

/**
 * Город прибытия
 */
'arrival_city_id': number;

/**
 * Время транзита мин., дней
 */
'days_min': number;

/**
 * Время транзита макс., дней
 */
'days_max': number;

/**
 * Сумма за перевозку
 */
'amount': number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Тип транспорта
 */
'kind': {
};

/**
 * Город убытия
 */
'departure_city': {
};

/**
 * Город прибытия
 */
'arrival_city': {
};

/**
 * Стоимость
 */
'cost': string;

/**
 * Стоимость
 */
'cost_text': string;
}>;

/**
 * Наименование этапов доставки
 */
'service_items': string;

/**
 * Сумма
 */
'total_cost': number;

/**
 * Сумма
 */
'total_cost_text': string;

/**
 * Валюта
 */
'currecy_text': string;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * Сводная информация
 */
'summary_data': Array<{

/**
 * Наименование
 */
'name': string;

/**
 * Значение
 */
'value': string;

/**
 * Широкая колонка
 */
'wide_row'?: boolean;
}>;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
}>;
} => r.body)
    );
  }

  /** Path part for operation `requestRateTransporterSave()` */
  static readonly RequestRateTransporterSavePath = '/request_rate_transporter_save';

  /**
   * Ставка запроса Вывоз.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRateTransporterSave()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRateTransporterSave$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id'?: number;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * ID аэропорта
 */
'point_id': number;

/**
 * Вид рейса
 */
'point_action_id': number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Доставки
 */
'values': Array<{

/**
 * Тип транспорта
 */
'kind_id': number;

/**
 * Город убытия
 */
'departure_city_id': number;

/**
 * Город прибытия
 */
'arrival_city_id': number;

/**
 * Время транзита мин., дней
 */
'days_min': number;

/**
 * Время транзита макс., дней
 */
'days_max': number;

/**
 * Сумма за перевозку
 */
'amount': number;

/**
 * Комментарий
 */
'comment'?: string;
}>;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateTransporterSavePath, 'post');
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
   * Ставка запроса Вывоз.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRateTransporterSave$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRateTransporterSave(
    params?: {
      body?: {

/**
 * ID
 */
'id'?: number;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * ID контрагента (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * ID аэропорта
 */
'point_id': number;

/**
 * Вид рейса
 */
'point_action_id': number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Доставки
 */
'values': Array<{

/**
 * Тип транспорта
 */
'kind_id': number;

/**
 * Город убытия
 */
'departure_city_id': number;

/**
 * Город прибытия
 */
'arrival_city_id': number;

/**
 * Время транзита мин., дней
 */
'days_min': number;

/**
 * Время транзита макс., дней
 */
'days_max': number;

/**
 * Сумма за перевозку
 */
'amount': number;

/**
 * Комментарий
 */
'comment'?: string;
}>;

/**
 * Валюта (ID берем из запроса - system_currency)
 */
'currency'?: number;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.requestRateTransporterSave$Response(params, context).pipe(
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
     * Коммерческое
     */
      offer?: number;

    /**
     * Подрядчики (ID берем из запроса - contractor_list)
     */
      contractor?: number;

    /**
     * Авиалинии (ID берем из запроса - transport_carrier)
     */
      carrier?: number;

    /**
     * Тип маршрута (ID берем из запроса - direction_flight)
     */
      departure_flight?: string;

    /**
     * Аэропорт вылета (ID берем из запроса - direction_point)
     */
      departure_point?: number;

    /**
     * Аэропорт (ID берем из запроса - direction_point)
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
 * Дата создания
 */
'time_add': string;

/**
 * ID Ставка до границы
 */
'custom_id': number;

/**
 * Ставка до границы
 */
'custom': {
};

/**
 * ID Ставка СВХ
 */
'storage_id': number;

/**
 * Ставка СВХ
 */
'storage': {
};

/**
 * ID Ставка доставки
 */
'delivery_id': number;

/**
 * Ставка доставки
 */
'delivery': {
};

/**
 * ID других услуг
 */
'other_id': number;

/**
 * Другие услуги
 */
'other': {
};

/**
 * Итого: До границы
 */
'customs_rate': string;

/**
 * Итого: Перевозка
 */
'delivery_rate': string;

/**
 * Итого: СВХ
 */
'svh_rate': string;

/**
 * Итого: Локальные
 */
'local_rate': string;

/**
 * Сумма
 */
'total_cost': number;

/**
 * Сумма
 */
'total_cost_text': string;

/**
 * Маршрут
 */
'route_text': string;

/**
 * Срок (дней), от
 */
'days_min'?: string;

/**
 * Срок (дней), до
 */
'days_max'?: string;

/**
 * Срок, дн.
 */
'period'?: string;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;

/**
 * Класс строки
 */
'row_class'?: string;

/**
 * Класс ячейки
 */
'cell_class'?: string;
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateFinalListPath, 'get');
    if (params) {
      rb.query('request_id', params.request_id, {});
      rb.query('offer', params.offer, {});
      rb.query('contractor', params.contractor, {});
      rb.query('carrier', params.carrier, {});
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
         * Дата создания
         */
        'time_add': string;
        
        /**
         * ID Ставка до границы
         */
        'custom_id': number;
        
        /**
         * Ставка до границы
         */
        'custom': {
        };
        
        /**
         * ID Ставка СВХ
         */
        'storage_id': number;
        
        /**
         * Ставка СВХ
         */
        'storage': {
        };
        
        /**
         * ID Ставка доставки
         */
        'delivery_id': number;
        
        /**
         * Ставка доставки
         */
        'delivery': {
        };
        
        /**
         * ID других услуг
         */
        'other_id': number;
        
        /**
         * Другие услуги
         */
        'other': {
        };
        
        /**
         * Итого: До границы
         */
        'customs_rate': string;
        
        /**
         * Итого: Перевозка
         */
        'delivery_rate': string;
        
        /**
         * Итого: СВХ
         */
        'svh_rate': string;
        
        /**
         * Итого: Локальные
         */
        'local_rate': string;
        
        /**
         * Сумма
         */
        'total_cost': number;
        
        /**
         * Сумма
         */
        'total_cost_text': string;
        
        /**
         * Маршрут
         */
        'route_text': string;
        
        /**
         * Срок (дней), от
         */
        'days_min'?: string;
        
        /**
         * Срок (дней), до
         */
        'days_max'?: string;
        
        /**
         * Срок, дн.
         */
        'period'?: string;
        
        /**
         * В итоговом
         */
        'selected'?: boolean;
        
        /**
         * В коммерческом предложении
         */
        'offer'?: boolean;
        
        /**
         * Класс строки
         */
        'row_class'?: string;
        
        /**
         * Класс ячейки
         */
        'cell_class'?: string;
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
     * Коммерческое
     */
      offer?: number;

    /**
     * Подрядчики (ID берем из запроса - contractor_list)
     */
      contractor?: number;

    /**
     * Авиалинии (ID берем из запроса - transport_carrier)
     */
      carrier?: number;

    /**
     * Тип маршрута (ID берем из запроса - direction_flight)
     */
      departure_flight?: string;

    /**
     * Аэропорт вылета (ID берем из запроса - direction_point)
     */
      departure_point?: number;

    /**
     * Аэропорт (ID берем из запроса - direction_point)
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
 * Дата создания
 */
'time_add': string;

/**
 * ID Ставка до границы
 */
'custom_id': number;

/**
 * Ставка до границы
 */
'custom': {
};

/**
 * ID Ставка СВХ
 */
'storage_id': number;

/**
 * Ставка СВХ
 */
'storage': {
};

/**
 * ID Ставка доставки
 */
'delivery_id': number;

/**
 * Ставка доставки
 */
'delivery': {
};

/**
 * ID других услуг
 */
'other_id': number;

/**
 * Другие услуги
 */
'other': {
};

/**
 * Итого: До границы
 */
'customs_rate': string;

/**
 * Итого: Перевозка
 */
'delivery_rate': string;

/**
 * Итого: СВХ
 */
'svh_rate': string;

/**
 * Итого: Локальные
 */
'local_rate': string;

/**
 * Сумма
 */
'total_cost': number;

/**
 * Сумма
 */
'total_cost_text': string;

/**
 * Маршрут
 */
'route_text': string;

/**
 * Срок (дней), от
 */
'days_min'?: string;

/**
 * Срок (дней), до
 */
'days_max'?: string;

/**
 * Срок, дн.
 */
'period'?: string;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;

/**
 * Класс строки
 */
'row_class'?: string;

/**
 * Класс ячейки
 */
'cell_class'?: string;
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
 * Дата создания
 */
'time_add': string;

/**
 * ID Ставка до границы
 */
'custom_id': number;

/**
 * Ставка до границы
 */
'custom': {
};

/**
 * ID Ставка СВХ
 */
'storage_id': number;

/**
 * Ставка СВХ
 */
'storage': {
};

/**
 * ID Ставка доставки
 */
'delivery_id': number;

/**
 * Ставка доставки
 */
'delivery': {
};

/**
 * ID других услуг
 */
'other_id': number;

/**
 * Другие услуги
 */
'other': {
};

/**
 * Итого: До границы
 */
'customs_rate': string;

/**
 * Итого: Перевозка
 */
'delivery_rate': string;

/**
 * Итого: СВХ
 */
'svh_rate': string;

/**
 * Итого: Локальные
 */
'local_rate': string;

/**
 * Сумма
 */
'total_cost': number;

/**
 * Сумма
 */
'total_cost_text': string;

/**
 * Маршрут
 */
'route_text': string;

/**
 * Срок (дней), от
 */
'days_min'?: string;

/**
 * Срок (дней), до
 */
'days_max'?: string;

/**
 * Срок, дн.
 */
'period'?: string;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;

/**
 * Класс строки
 */
'row_class'?: string;

/**
 * Класс ячейки
 */
'cell_class'?: string;
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
 * ID Ставка до границы
 */
'custom_id': number;

/**
 * Ставка до границы
 */
'custom': {
};

/**
 * ID Ставка СВХ
 */
'storage_id': number;

/**
 * Ставка СВХ
 */
'storage': {
};

/**
 * ID Ставка доставки
 */
'delivery_id': number;

/**
 * Ставка доставки
 */
'delivery': {
};

/**
 * ID других услуг
 */
'other_id': number;

/**
 * Другие услуги
 */
'other': {
};

/**
 * Итого: До границы
 */
'customs_rate': string;

/**
 * Итого: Перевозка
 */
'delivery_rate': string;

/**
 * Итого: СВХ
 */
'svh_rate': string;

/**
 * Итого: Локальные
 */
'local_rate': string;

/**
 * Сумма
 */
'total_cost': number;

/**
 * Сумма
 */
'total_cost_text': string;

/**
 * Маршрут
 */
'route_text': string;

/**
 * Срок (дней), от
 */
'days_min'?: string;

/**
 * Срок (дней), до
 */
'days_max'?: string;

/**
 * Срок, дн.
 */
'period'?: string;

/**
 * В итоговом
 */
'selected'?: boolean;

/**
 * В коммерческом предложении
 */
'offer'?: boolean;

/**
 * Класс строки
 */
'row_class'?: string;

/**
 * Класс ячейки
 */
'cell_class'?: string;
}>;
} => r.body)
    );
  }

  /** Path part for operation `requestRateFinaleDelete()` */
  static readonly RequestRateFinaleDeletePath = '/request_rate_finale_delete';

  /**
   * Удаление финальные пересечения ставок.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRateFinaleDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRateFinaleDelete$Response(
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateFinaleDeletePath, 'post');
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
   * Удаление финальные пересечения ставок.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRateFinaleDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRateFinaleDelete(
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
    return this.requestRateFinaleDelete$Response(params, context).pipe(
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

  /** Path part for operation `requestRateOtherList()` */
  static readonly RequestRateOtherListPath = '/request_rate_other_list';

  /**
   * Ставки запроса Другие.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRateOtherList()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateOtherList$Response(
    params: {

    /**
     * ID Запроса
     */
      request_id: number;

    /**
     * Подрядчики
     */
      contractor?: number;

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
 * ID Запроса
 */
'request_id': number;

/**
 * Примечание
 */
'comment'?: string;

/**
 * Сумма
 */
'total_cost': number;

/**
 * Сумма
 */
'total_cost_text': string;

/**
 * Валюта приведенная
 */
'currency'?: number;

/**
 * Валюта приведенная
 */
'currency_text'?: string;

/**
 * Значения ставок
 */
'values': Array<{

/**
 * Наименование поля
 */
'field': string;

/**
 * Стоимость услуги
 */
'price': number;

/**
 * Стоимость услуги
 */
'price_text': string;

/**
 * Количество
 */
'count'?: number;

/**
 * Количество
 */
'count_text'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;

/**
 * Подрядчик (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Вид рейса
 */
'point_action_id'?: number;

/**
 * Город
 */
'city_id': number;

/**
 * Валюта
 */
'currency': number;

/**
 * Наименование услуги
 */
'name': string;

/**
 * Стоимость
 */
'cost': string;

/**
 * Стоимость
 */
'cost_text': string;

/**
 * Город
 */
'city_name': string;

/**
 * Вид рейса
 */
'point_action'?: string;

/**
 * Подрядчик
 */
'contractor': {

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * ID подрядчика (ID берем из запроса - contractor_list)
 */
'id': number;

/**
 * Подрядчик
 */
'name': string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * % выигранных торгов
 */
'trade_success_percent'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * % проигранных торгов
 */
'trade_fail_percent'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Email
 */
'email'?: string;

/**
 * Телефон
 */
'phone'?: string;
};
}>;

/**
 * Наименование статей затрат
 */
'service_items'?: string;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Стоимость товаров
 */
'cargo_cost'?: number;

/**
 * Дата запроса
 */
'time_request'?: string;
};
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateOtherListPath, 'get');
    if (params) {
      rb.query('request_id', params.request_id, {});
      rb.query('contractor', params.contractor, {});
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
         * ID Запроса
         */
        'request_id': number;
        
        /**
         * Примечание
         */
        'comment'?: string;
        
        /**
         * Сумма
         */
        'total_cost': number;
        
        /**
         * Сумма
         */
        'total_cost_text': string;
        
        /**
         * Валюта приведенная
         */
        'currency'?: number;
        
        /**
         * Валюта приведенная
         */
        'currency_text'?: string;
        
        /**
         * Значения ставок
         */
        'values': Array<{
        
        /**
         * Наименование поля
         */
        'field': string;
        
        /**
         * Стоимость услуги
         */
        'price': number;
        
        /**
         * Стоимость услуги
         */
        'price_text': string;
        
        /**
         * Количество
         */
        'count'?: number;
        
        /**
         * Количество
         */
        'count_text'?: string;
        
        /**
         * Комментарий
         */
        'comment'?: string;
        
        /**
         * Признак выбора
         */
        'select'?: boolean;
        
        /**
         * Подрядчик (ID берем из запроса - contractor_list)
         */
        'contractor_id': number;
        
        /**
         * Вид рейса
         */
        'point_action_id'?: number;
        
        /**
         * Город
         */
        'city_id': number;
        
        /**
         * Валюта
         */
        'currency': number;
        
        /**
         * Наименование услуги
         */
        'name': string;
        
        /**
         * Стоимость
         */
        'cost': string;
        
        /**
         * Стоимость
         */
        'cost_text': string;
        
        /**
         * Город
         */
        'city_name': string;
        
        /**
         * Вид рейса
         */
        'point_action'?: string;
        
        /**
         * Подрядчик
         */
        'contractor': {
        
        /**
         * Агент транспортной компании
         */
        'carrier_name'?: string;
        
        /**
         * Агент транспортной компании (ID берем из запроса - transport_carrier)
         */
        'carrier_id'?: number;
        
        /**
         * ID подрядчика (ID берем из запроса - contractor_list)
         */
        'id': number;
        
        /**
         * Подрядчик
         */
        'name': string;
        
        /**
         * Рейтинг в системе (NPS)
         */
        'rating_nps_text'?: string;
        
        /**
         * Рейтинг в системе (NPS)
         */
        'rating_nps'?: number;
        
        /**
         * Участие в торгах (общее количество)
         */
        'trade_count'?: number;
        
        /**
         * Количество выигранных торгов
         */
        'trade_success_count'?: number;
        
        /**
         * % выигранных торгов
         */
        'trade_success_percent'?: number;
        
        /**
         * Количество проигранных торгов
         */
        'trade_fail_count'?: number;
        
        /**
         * % проигранных торгов
         */
        'trade_fail_percent'?: number;
        
        /**
         * Участие в торгах (результаты)
         */
        'trade_count_text'?: number;
        
        /**
         * Email
         */
        'email'?: string;
        
        /**
         * Телефон
         */
        'phone'?: string;
        };
        }>;
        
        /**
         * Наименование статей затрат
         */
        'service_items'?: string;
        
        /**
         * Запрос
         */
        'request': {
        
        /**
         * Кол-во мест
         */
        'cargo_places_count'?: number;
        
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
         * Объем, м3
         */
        'cargo_places_volume'?: number;
        
        /**
         * Стоимость товаров
         */
        'cargo_cost'?: number;
        
        /**
         * Дата запроса
         */
        'time_request'?: string;
        };
        }>;
        }>;
      })
    );
  }

  /**
   * Ставки запроса Другие.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRateOtherList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestRateOtherList(
    params: {

    /**
     * ID Запроса
     */
      request_id: number;

    /**
     * Подрядчики
     */
      contractor?: number;

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
 * ID Запроса
 */
'request_id': number;

/**
 * Примечание
 */
'comment'?: string;

/**
 * Сумма
 */
'total_cost': number;

/**
 * Сумма
 */
'total_cost_text': string;

/**
 * Валюта приведенная
 */
'currency'?: number;

/**
 * Валюта приведенная
 */
'currency_text'?: string;

/**
 * Значения ставок
 */
'values': Array<{

/**
 * Наименование поля
 */
'field': string;

/**
 * Стоимость услуги
 */
'price': number;

/**
 * Стоимость услуги
 */
'price_text': string;

/**
 * Количество
 */
'count'?: number;

/**
 * Количество
 */
'count_text'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;

/**
 * Подрядчик (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Вид рейса
 */
'point_action_id'?: number;

/**
 * Город
 */
'city_id': number;

/**
 * Валюта
 */
'currency': number;

/**
 * Наименование услуги
 */
'name': string;

/**
 * Стоимость
 */
'cost': string;

/**
 * Стоимость
 */
'cost_text': string;

/**
 * Город
 */
'city_name': string;

/**
 * Вид рейса
 */
'point_action'?: string;

/**
 * Подрядчик
 */
'contractor': {

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * ID подрядчика (ID берем из запроса - contractor_list)
 */
'id': number;

/**
 * Подрядчик
 */
'name': string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * % выигранных торгов
 */
'trade_success_percent'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * % проигранных торгов
 */
'trade_fail_percent'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Email
 */
'email'?: string;

/**
 * Телефон
 */
'phone'?: string;
};
}>;

/**
 * Наименование статей затрат
 */
'service_items'?: string;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Стоимость товаров
 */
'cargo_cost'?: number;

/**
 * Дата запроса
 */
'time_request'?: string;
};
}>;
}> {
    return this.requestRateOtherList$Response(params, context).pipe(
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
 * ID Запроса
 */
'request_id': number;

/**
 * Примечание
 */
'comment'?: string;

/**
 * Сумма
 */
'total_cost': number;

/**
 * Сумма
 */
'total_cost_text': string;

/**
 * Валюта приведенная
 */
'currency'?: number;

/**
 * Валюта приведенная
 */
'currency_text'?: string;

/**
 * Значения ставок
 */
'values': Array<{

/**
 * Наименование поля
 */
'field': string;

/**
 * Стоимость услуги
 */
'price': number;

/**
 * Стоимость услуги
 */
'price_text': string;

/**
 * Количество
 */
'count'?: number;

/**
 * Количество
 */
'count_text'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;

/**
 * Подрядчик (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Вид рейса
 */
'point_action_id'?: number;

/**
 * Город
 */
'city_id': number;

/**
 * Валюта
 */
'currency': number;

/**
 * Наименование услуги
 */
'name': string;

/**
 * Стоимость
 */
'cost': string;

/**
 * Стоимость
 */
'cost_text': string;

/**
 * Город
 */
'city_name': string;

/**
 * Вид рейса
 */
'point_action'?: string;

/**
 * Подрядчик
 */
'contractor': {

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * ID подрядчика (ID берем из запроса - contractor_list)
 */
'id': number;

/**
 * Подрядчик
 */
'name': string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * % выигранных торгов
 */
'trade_success_percent'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * % проигранных торгов
 */
'trade_fail_percent'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Email
 */
'email'?: string;

/**
 * Телефон
 */
'phone'?: string;
};
}>;

/**
 * Наименование статей затрат
 */
'service_items'?: string;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Стоимость товаров
 */
'cargo_cost'?: number;

/**
 * Дата запроса
 */
'time_request'?: string;
};
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
 * ID Запроса
 */
'request_id': number;

/**
 * Примечание
 */
'comment'?: string;

/**
 * Сумма
 */
'total_cost': number;

/**
 * Сумма
 */
'total_cost_text': string;

/**
 * Валюта приведенная
 */
'currency'?: number;

/**
 * Валюта приведенная
 */
'currency_text'?: string;

/**
 * Значения ставок
 */
'values': Array<{

/**
 * Наименование поля
 */
'field': string;

/**
 * Стоимость услуги
 */
'price': number;

/**
 * Стоимость услуги
 */
'price_text': string;

/**
 * Количество
 */
'count'?: number;

/**
 * Количество
 */
'count_text'?: string;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;

/**
 * Подрядчик (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Вид рейса
 */
'point_action_id'?: number;

/**
 * Город
 */
'city_id': number;

/**
 * Валюта
 */
'currency': number;

/**
 * Наименование услуги
 */
'name': string;

/**
 * Стоимость
 */
'cost': string;

/**
 * Стоимость
 */
'cost_text': string;

/**
 * Город
 */
'city_name': string;

/**
 * Вид рейса
 */
'point_action'?: string;

/**
 * Подрядчик
 */
'contractor': {

/**
 * Агент транспортной компании
 */
'carrier_name'?: string;

/**
 * Агент транспортной компании (ID берем из запроса - transport_carrier)
 */
'carrier_id'?: number;

/**
 * ID подрядчика (ID берем из запроса - contractor_list)
 */
'id': number;

/**
 * Подрядчик
 */
'name': string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps_text'?: string;

/**
 * Рейтинг в системе (NPS)
 */
'rating_nps'?: number;

/**
 * Участие в торгах (общее количество)
 */
'trade_count'?: number;

/**
 * Количество выигранных торгов
 */
'trade_success_count'?: number;

/**
 * % выигранных торгов
 */
'trade_success_percent'?: number;

/**
 * Количество проигранных торгов
 */
'trade_fail_count'?: number;

/**
 * % проигранных торгов
 */
'trade_fail_percent'?: number;

/**
 * Участие в торгах (результаты)
 */
'trade_count_text'?: number;

/**
 * Email
 */
'email'?: string;

/**
 * Телефон
 */
'phone'?: string;
};
}>;

/**
 * Наименование статей затрат
 */
'service_items'?: string;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
 * Объем, м3
 */
'cargo_places_volume'?: number;

/**
 * Стоимость товаров
 */
'cargo_cost'?: number;

/**
 * Дата запроса
 */
'time_request'?: string;
};
}>;
} => r.body)
    );
  }

  /** Path part for operation `requestRateOtherSave()` */
  static readonly RequestRateOtherSavePath = '/request_rate_other_save';

  /**
   * Ставки запроса Другие.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRateOtherSave()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRateOtherSave$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id'?: number;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Примечание
 */
'comment'?: string;

/**
 * Значения ставок
 */
'values': Array<{

/**
 * Наименование поля
 */
'field': string;

/**
 * Стоимость услуги
 */
'price': number;

/**
 * Количество
 */
'count'?: number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;

/**
 * Подрядчик (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Вид рейса
 */
'point_action_id'?: number;

/**
 * Город
 */
'city_id': number;

/**
 * Валюта
 */
'currency': number;
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestRateOtherSavePath, 'post');
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
   * Ставки запроса Другие.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestRateOtherSave$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRateOtherSave(
    params?: {
      body?: {

/**
 * ID
 */
'id'?: number;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Примечание
 */
'comment'?: string;

/**
 * Значения ставок
 */
'values': Array<{

/**
 * Наименование поля
 */
'field': string;

/**
 * Стоимость услуги
 */
'price': number;

/**
 * Количество
 */
'count'?: number;

/**
 * Комментарий
 */
'comment'?: string;

/**
 * Признак выбора
 */
'select'?: boolean;

/**
 * Подрядчик (ID берем из запроса - contractor_list)
 */
'contractor_id': number;

/**
 * Вид рейса
 */
'point_action_id'?: number;

/**
 * Город
 */
'city_id': number;

/**
 * Валюта
 */
'currency': number;
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
    return this.requestRateOtherSave$Response(params, context).pipe(
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

  /** Path part for operation `requestOfferList()` */
  static readonly RequestOfferListPath = '/request_offer_list';

  /**
   * Коммерческие предложения.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestOfferList()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestOfferList$Response(
    params: {

    /**
     * ID Запроса
     */
      request_id: number;

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
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
};

/**
 * Параметры профитов
 */
'param': {

/**
 * Массив ставок До границы
 */
'custom'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Склад (СВХ)
 */
'storage'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Вывоз
 */
'delivery'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};
};

/**
 * Вх. ставка
 */
'rate_amount'?: string;

/**
 * Вх. ставка
 */
'rate_amount_text'?: string;

/**
 * Профит
 */
'profit_amount'?: string;

/**
 * Профит
 */
'profit_amount_text'?: string;

/**
 * %
 */
'profit_percent'?: string;

/**
 * %
 */
'profit_percent_text'?: string;

/**
 * Ставка итого
 */
'rate_total'?: string;

/**
 * Ставка итого
 */
'rate_total_text'?: string;

/**
 * Валидность
 */
'valid'?: string;

/**
 * Валидность
 */
'time_valid_text'?: string;

/**
 * Статус
 */
'status'?: number;

/**
 * ID главного рейта: До границы
 */
'custom_id'?: number;

/**
 * ID главного рейта: СВХ
 */
'storage_id'?: number;

/**
 * ID главного рейта: Вывоз
 */
'delivery_id'?: number;

/**
 * Статус
 */
'status_text'?: string;

/**
 * Данные для формы
 */
'form_data': {

/**
 * Статусы
 */
'statuses': Array<string>;
};

/**
 * Примечание
 */
'comment'?: string;
}>;

/**
 * Колонки
 */
'columns'?: Array<string>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestOfferListPath, 'get');
    if (params) {
      rb.query('request_id', params.request_id, {});
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
         * UID
         */
        'uid': string;
        
        /**
         * Дата создания
         */
        'time_add': string;
        
        /**
         * ID Запроса
         */
        'request_id': number;
        
        /**
         * Запрос
         */
        'request': {
        
        /**
         * Кол-во мест
         */
        'cargo_places_count'?: number;
        
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
        };
        
        /**
         * Параметры профитов
         */
        'param': {
        
        /**
         * Массив ставок До границы
         */
        'custom'?: {
        
        /**
         * Единый профит на все ставки
         */
        'one_profit'?: boolean;
        
        /**
         * Единый профит на все ставки - Сумма
         */
        'one_profit_amount'?: number;
        
        /**
         * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
         */
        'one_profit_amount_currency'?: number;
        
        /**
         * Единый профит на все ставки - Процент
         */
        'one_profit_percent'?: number;
        
        /**
         * Детализировать ставку в КП
         */
        'detail_items'?: boolean;
        
        /**
         * Ставки
         */
        'rows'?: Array<{
        
        /**
         * ID ставки
         */
        'id'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Итого Входящее
         */
        'income_total_cost'?: number;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Главный рейт, использовать для итогового КП
         */
        'main'?: boolean;
        
        /**
         * Услуги
         */
        'services'?: Array<{
        
        /**
         * ID Услуги
         */
        'field'?: string;
        
        /**
         * Стоимость
         */
        'amount'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Включено
         */
        'select'?: boolean;
        }>;
        }>;
        };
        
        /**
         * Массив ставок Склад (СВХ)
         */
        'storage'?: {
        
        /**
         * Единый профит на все ставки
         */
        'one_profit'?: boolean;
        
        /**
         * Единый профит на все ставки - Сумма
         */
        'one_profit_amount'?: number;
        
        /**
         * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
         */
        'one_profit_amount_currency'?: number;
        
        /**
         * Единый профит на все ставки - Процент
         */
        'one_profit_percent'?: number;
        
        /**
         * Детализировать ставку в КП
         */
        'detail_items'?: boolean;
        
        /**
         * Ставки
         */
        'rows'?: Array<{
        
        /**
         * ID ставки
         */
        'id'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Итого Входящее
         */
        'income_total_cost'?: number;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Главный рейт, использовать для итогового КП
         */
        'main'?: boolean;
        
        /**
         * Услуги
         */
        'services'?: Array<{
        
        /**
         * ID Услуги
         */
        'field'?: string;
        
        /**
         * Стоимость
         */
        'amount'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Включено
         */
        'select'?: boolean;
        }>;
        }>;
        };
        
        /**
         * Массив ставок Вывоз
         */
        'delivery'?: {
        
        /**
         * Единый профит на все ставки
         */
        'one_profit'?: boolean;
        
        /**
         * Единый профит на все ставки - Сумма
         */
        'one_profit_amount'?: number;
        
        /**
         * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
         */
        'one_profit_amount_currency'?: number;
        
        /**
         * Единый профит на все ставки - Процент
         */
        'one_profit_percent'?: number;
        
        /**
         * Детализировать ставку в КП
         */
        'detail_items'?: boolean;
        
        /**
         * Ставки
         */
        'rows'?: Array<{
        
        /**
         * ID ставки
         */
        'id'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Итого Входящее
         */
        'income_total_cost'?: number;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Главный рейт, использовать для итогового КП
         */
        'main'?: boolean;
        
        /**
         * Услуги
         */
        'services'?: Array<{
        
        /**
         * ID Услуги
         */
        'field'?: string;
        
        /**
         * Стоимость
         */
        'amount'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Включено
         */
        'select'?: boolean;
        }>;
        }>;
        };
        };
        
        /**
         * Вх. ставка
         */
        'rate_amount'?: string;
        
        /**
         * Вх. ставка
         */
        'rate_amount_text'?: string;
        
        /**
         * Профит
         */
        'profit_amount'?: string;
        
        /**
         * Профит
         */
        'profit_amount_text'?: string;
        
        /**
         * %
         */
        'profit_percent'?: string;
        
        /**
         * %
         */
        'profit_percent_text'?: string;
        
        /**
         * Ставка итого
         */
        'rate_total'?: string;
        
        /**
         * Ставка итого
         */
        'rate_total_text'?: string;
        
        /**
         * Валидность
         */
        'valid'?: string;
        
        /**
         * Валидность
         */
        'time_valid_text'?: string;
        
        /**
         * Статус
         */
        'status'?: number;
        
        /**
         * ID главного рейта: До границы
         */
        'custom_id'?: number;
        
        /**
         * ID главного рейта: СВХ
         */
        'storage_id'?: number;
        
        /**
         * ID главного рейта: Вывоз
         */
        'delivery_id'?: number;
        
        /**
         * Статус
         */
        'status_text'?: string;
        
        /**
         * Данные для формы
         */
        'form_data': {
        
        /**
         * Статусы
         */
        'statuses': Array<string>;
        };
        
        /**
         * Примечание
         */
        'comment'?: string;
        }>;
        
        /**
         * Колонки
         */
        'columns'?: Array<string>;
        }>;
      })
    );
  }

  /**
   * Коммерческие предложения.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestOfferList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestOfferList(
    params: {

    /**
     * ID Запроса
     */
      request_id: number;

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
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
};

/**
 * Параметры профитов
 */
'param': {

/**
 * Массив ставок До границы
 */
'custom'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Склад (СВХ)
 */
'storage'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Вывоз
 */
'delivery'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};
};

/**
 * Вх. ставка
 */
'rate_amount'?: string;

/**
 * Вх. ставка
 */
'rate_amount_text'?: string;

/**
 * Профит
 */
'profit_amount'?: string;

/**
 * Профит
 */
'profit_amount_text'?: string;

/**
 * %
 */
'profit_percent'?: string;

/**
 * %
 */
'profit_percent_text'?: string;

/**
 * Ставка итого
 */
'rate_total'?: string;

/**
 * Ставка итого
 */
'rate_total_text'?: string;

/**
 * Валидность
 */
'valid'?: string;

/**
 * Валидность
 */
'time_valid_text'?: string;

/**
 * Статус
 */
'status'?: number;

/**
 * ID главного рейта: До границы
 */
'custom_id'?: number;

/**
 * ID главного рейта: СВХ
 */
'storage_id'?: number;

/**
 * ID главного рейта: Вывоз
 */
'delivery_id'?: number;

/**
 * Статус
 */
'status_text'?: string;

/**
 * Данные для формы
 */
'form_data': {

/**
 * Статусы
 */
'statuses': Array<string>;
};

/**
 * Примечание
 */
'comment'?: string;
}>;

/**
 * Колонки
 */
'columns'?: Array<string>;
}> {
    return this.requestOfferList$Response(params, context).pipe(
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
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
};

/**
 * Параметры профитов
 */
'param': {

/**
 * Массив ставок До границы
 */
'custom'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Склад (СВХ)
 */
'storage'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Вывоз
 */
'delivery'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};
};

/**
 * Вх. ставка
 */
'rate_amount'?: string;

/**
 * Вх. ставка
 */
'rate_amount_text'?: string;

/**
 * Профит
 */
'profit_amount'?: string;

/**
 * Профит
 */
'profit_amount_text'?: string;

/**
 * %
 */
'profit_percent'?: string;

/**
 * %
 */
'profit_percent_text'?: string;

/**
 * Ставка итого
 */
'rate_total'?: string;

/**
 * Ставка итого
 */
'rate_total_text'?: string;

/**
 * Валидность
 */
'valid'?: string;

/**
 * Валидность
 */
'time_valid_text'?: string;

/**
 * Статус
 */
'status'?: number;

/**
 * ID главного рейта: До границы
 */
'custom_id'?: number;

/**
 * ID главного рейта: СВХ
 */
'storage_id'?: number;

/**
 * ID главного рейта: Вывоз
 */
'delivery_id'?: number;

/**
 * Статус
 */
'status_text'?: string;

/**
 * Данные для формы
 */
'form_data': {

/**
 * Статусы
 */
'statuses': Array<string>;
};

/**
 * Примечание
 */
'comment'?: string;
}>;

/**
 * Колонки
 */
'columns'?: Array<string>;
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
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
};

/**
 * Параметры профитов
 */
'param': {

/**
 * Массив ставок До границы
 */
'custom'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Склад (СВХ)
 */
'storage'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Вывоз
 */
'delivery'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};
};

/**
 * Вх. ставка
 */
'rate_amount'?: string;

/**
 * Вх. ставка
 */
'rate_amount_text'?: string;

/**
 * Профит
 */
'profit_amount'?: string;

/**
 * Профит
 */
'profit_amount_text'?: string;

/**
 * %
 */
'profit_percent'?: string;

/**
 * %
 */
'profit_percent_text'?: string;

/**
 * Ставка итого
 */
'rate_total'?: string;

/**
 * Ставка итого
 */
'rate_total_text'?: string;

/**
 * Валидность
 */
'valid'?: string;

/**
 * Валидность
 */
'time_valid_text'?: string;

/**
 * Статус
 */
'status'?: number;

/**
 * ID главного рейта: До границы
 */
'custom_id'?: number;

/**
 * ID главного рейта: СВХ
 */
'storage_id'?: number;

/**
 * ID главного рейта: Вывоз
 */
'delivery_id'?: number;

/**
 * Статус
 */
'status_text'?: string;

/**
 * Данные для формы
 */
'form_data': {

/**
 * Статусы
 */
'statuses': Array<string>;
};

/**
 * Примечание
 */
'comment'?: string;
}>;

/**
 * Колонки
 */
'columns'?: Array<string>;
} => r.body)
    );
  }

  /** Path part for operation `requestOfferMake()` */
  static readonly RequestOfferMakePath = '/request_offer_make';

  /**
   * Создание КП.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestOfferMake()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestOfferMake$Response(
    params?: {
      body?: {

/**
 * ID сводных запросов
 */
'id': Array<number>;

/**
 * Тип запроса
 */
'type'?: 'final' | 'custom' | 'svh' | 'delivery' | 'other';
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestOfferMakePath, 'post');
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
   * Создание КП.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestOfferMake$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestOfferMake(
    params?: {
      body?: {

/**
 * ID сводных запросов
 */
'id': Array<number>;

/**
 * Тип запроса
 */
'type'?: 'final' | 'custom' | 'svh' | 'delivery' | 'other';
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.requestOfferMake$Response(params, context).pipe(
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

  /** Path part for operation `requestOfferInfo()` */
  static readonly RequestOfferInfoPath = '/request_offer_info';

  /**
   * Данны по КП.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestOfferInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestOfferInfo$Response(
    params: {

    /**
     * ID КП
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
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
};

/**
 * Параметры профитов
 */
'param': {

/**
 * Массив ставок До границы
 */
'custom'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Склад (СВХ)
 */
'storage'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Вывоз
 */
'delivery'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};
};

/**
 * Вх. ставка
 */
'rate_amount'?: string;

/**
 * Вх. ставка
 */
'rate_amount_text'?: string;

/**
 * Профит
 */
'profit_amount'?: string;

/**
 * Профит
 */
'profit_amount_text'?: string;

/**
 * %
 */
'profit_percent'?: string;

/**
 * %
 */
'profit_percent_text'?: string;

/**
 * Ставка итого
 */
'rate_total'?: string;

/**
 * Ставка итого
 */
'rate_total_text'?: string;

/**
 * Валидность
 */
'valid'?: string;

/**
 * Валидность
 */
'time_valid_text'?: string;

/**
 * Статус
 */
'status'?: number;

/**
 * ID главного рейта: До границы
 */
'custom_id'?: number;

/**
 * ID главного рейта: СВХ
 */
'storage_id'?: number;

/**
 * ID главного рейта: Вывоз
 */
'delivery_id'?: number;

/**
 * Статус
 */
'status_text'?: string;

/**
 * Данные для формы
 */
'form_data': {

/**
 * Статусы
 */
'statuses': Array<string>;
};

/**
 * Примечание
 */
'comment'?: string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestOfferInfoPath, 'get');
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
         * UID
         */
        'uid': string;
        
        /**
         * Дата создания
         */
        'time_add': string;
        
        /**
         * ID Запроса
         */
        'request_id': number;
        
        /**
         * Запрос
         */
        'request': {
        
        /**
         * Кол-во мест
         */
        'cargo_places_count'?: number;
        
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
        };
        
        /**
         * Параметры профитов
         */
        'param': {
        
        /**
         * Массив ставок До границы
         */
        'custom'?: {
        
        /**
         * Единый профит на все ставки
         */
        'one_profit'?: boolean;
        
        /**
         * Единый профит на все ставки - Сумма
         */
        'one_profit_amount'?: number;
        
        /**
         * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
         */
        'one_profit_amount_currency'?: number;
        
        /**
         * Единый профит на все ставки - Процент
         */
        'one_profit_percent'?: number;
        
        /**
         * Детализировать ставку в КП
         */
        'detail_items'?: boolean;
        
        /**
         * Ставки
         */
        'rows'?: Array<{
        
        /**
         * ID ставки
         */
        'id'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Итого Входящее
         */
        'income_total_cost'?: number;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Главный рейт, использовать для итогового КП
         */
        'main'?: boolean;
        
        /**
         * Услуги
         */
        'services'?: Array<{
        
        /**
         * ID Услуги
         */
        'field'?: string;
        
        /**
         * Стоимость
         */
        'amount'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Включено
         */
        'select'?: boolean;
        }>;
        }>;
        };
        
        /**
         * Массив ставок Склад (СВХ)
         */
        'storage'?: {
        
        /**
         * Единый профит на все ставки
         */
        'one_profit'?: boolean;
        
        /**
         * Единый профит на все ставки - Сумма
         */
        'one_profit_amount'?: number;
        
        /**
         * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
         */
        'one_profit_amount_currency'?: number;
        
        /**
         * Единый профит на все ставки - Процент
         */
        'one_profit_percent'?: number;
        
        /**
         * Детализировать ставку в КП
         */
        'detail_items'?: boolean;
        
        /**
         * Ставки
         */
        'rows'?: Array<{
        
        /**
         * ID ставки
         */
        'id'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Итого Входящее
         */
        'income_total_cost'?: number;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Главный рейт, использовать для итогового КП
         */
        'main'?: boolean;
        
        /**
         * Услуги
         */
        'services'?: Array<{
        
        /**
         * ID Услуги
         */
        'field'?: string;
        
        /**
         * Стоимость
         */
        'amount'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Включено
         */
        'select'?: boolean;
        }>;
        }>;
        };
        
        /**
         * Массив ставок Вывоз
         */
        'delivery'?: {
        
        /**
         * Единый профит на все ставки
         */
        'one_profit'?: boolean;
        
        /**
         * Единый профит на все ставки - Сумма
         */
        'one_profit_amount'?: number;
        
        /**
         * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
         */
        'one_profit_amount_currency'?: number;
        
        /**
         * Единый профит на все ставки - Процент
         */
        'one_profit_percent'?: number;
        
        /**
         * Детализировать ставку в КП
         */
        'detail_items'?: boolean;
        
        /**
         * Ставки
         */
        'rows'?: Array<{
        
        /**
         * ID ставки
         */
        'id'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Итого Входящее
         */
        'income_total_cost'?: number;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Главный рейт, использовать для итогового КП
         */
        'main'?: boolean;
        
        /**
         * Услуги
         */
        'services'?: Array<{
        
        /**
         * ID Услуги
         */
        'field'?: string;
        
        /**
         * Стоимость
         */
        'amount'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Включено
         */
        'select'?: boolean;
        }>;
        }>;
        };
        };
        
        /**
         * Вх. ставка
         */
        'rate_amount'?: string;
        
        /**
         * Вх. ставка
         */
        'rate_amount_text'?: string;
        
        /**
         * Профит
         */
        'profit_amount'?: string;
        
        /**
         * Профит
         */
        'profit_amount_text'?: string;
        
        /**
         * %
         */
        'profit_percent'?: string;
        
        /**
         * %
         */
        'profit_percent_text'?: string;
        
        /**
         * Ставка итого
         */
        'rate_total'?: string;
        
        /**
         * Ставка итого
         */
        'rate_total_text'?: string;
        
        /**
         * Валидность
         */
        'valid'?: string;
        
        /**
         * Валидность
         */
        'time_valid_text'?: string;
        
        /**
         * Статус
         */
        'status'?: number;
        
        /**
         * ID главного рейта: До границы
         */
        'custom_id'?: number;
        
        /**
         * ID главного рейта: СВХ
         */
        'storage_id'?: number;
        
        /**
         * ID главного рейта: Вывоз
         */
        'delivery_id'?: number;
        
        /**
         * Статус
         */
        'status_text'?: string;
        
        /**
         * Данные для формы
         */
        'form_data': {
        
        /**
         * Статусы
         */
        'statuses': Array<string>;
        };
        
        /**
         * Примечание
         */
        'comment'?: string;
        }>;
      })
    );
  }

  /**
   * Данны по КП.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestOfferInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestOfferInfo(
    params: {

    /**
     * ID КП
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
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
};

/**
 * Параметры профитов
 */
'param': {

/**
 * Массив ставок До границы
 */
'custom'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Склад (СВХ)
 */
'storage'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Вывоз
 */
'delivery'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};
};

/**
 * Вх. ставка
 */
'rate_amount'?: string;

/**
 * Вх. ставка
 */
'rate_amount_text'?: string;

/**
 * Профит
 */
'profit_amount'?: string;

/**
 * Профит
 */
'profit_amount_text'?: string;

/**
 * %
 */
'profit_percent'?: string;

/**
 * %
 */
'profit_percent_text'?: string;

/**
 * Ставка итого
 */
'rate_total'?: string;

/**
 * Ставка итого
 */
'rate_total_text'?: string;

/**
 * Валидность
 */
'valid'?: string;

/**
 * Валидность
 */
'time_valid_text'?: string;

/**
 * Статус
 */
'status'?: number;

/**
 * ID главного рейта: До границы
 */
'custom_id'?: number;

/**
 * ID главного рейта: СВХ
 */
'storage_id'?: number;

/**
 * ID главного рейта: Вывоз
 */
'delivery_id'?: number;

/**
 * Статус
 */
'status_text'?: string;

/**
 * Данные для формы
 */
'form_data': {

/**
 * Статусы
 */
'statuses': Array<string>;
};

/**
 * Примечание
 */
'comment'?: string;
}> {
    return this.requestOfferInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
};

/**
 * Параметры профитов
 */
'param': {

/**
 * Массив ставок До границы
 */
'custom'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Склад (СВХ)
 */
'storage'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Вывоз
 */
'delivery'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};
};

/**
 * Вх. ставка
 */
'rate_amount'?: string;

/**
 * Вх. ставка
 */
'rate_amount_text'?: string;

/**
 * Профит
 */
'profit_amount'?: string;

/**
 * Профит
 */
'profit_amount_text'?: string;

/**
 * %
 */
'profit_percent'?: string;

/**
 * %
 */
'profit_percent_text'?: string;

/**
 * Ставка итого
 */
'rate_total'?: string;

/**
 * Ставка итого
 */
'rate_total_text'?: string;

/**
 * Валидность
 */
'valid'?: string;

/**
 * Валидность
 */
'time_valid_text'?: string;

/**
 * Статус
 */
'status'?: number;

/**
 * ID главного рейта: До границы
 */
'custom_id'?: number;

/**
 * ID главного рейта: СВХ
 */
'storage_id'?: number;

/**
 * ID главного рейта: Вывоз
 */
'delivery_id'?: number;

/**
 * Статус
 */
'status_text'?: string;

/**
 * Данные для формы
 */
'form_data': {

/**
 * Статусы
 */
'statuses': Array<string>;
};

/**
 * Примечание
 */
'comment'?: string;
}>): {

/**
 * ID
 */
'id': number;

/**
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
};

/**
 * Параметры профитов
 */
'param': {

/**
 * Массив ставок До границы
 */
'custom'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Склад (СВХ)
 */
'storage'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Вывоз
 */
'delivery'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};
};

/**
 * Вх. ставка
 */
'rate_amount'?: string;

/**
 * Вх. ставка
 */
'rate_amount_text'?: string;

/**
 * Профит
 */
'profit_amount'?: string;

/**
 * Профит
 */
'profit_amount_text'?: string;

/**
 * %
 */
'profit_percent'?: string;

/**
 * %
 */
'profit_percent_text'?: string;

/**
 * Ставка итого
 */
'rate_total'?: string;

/**
 * Ставка итого
 */
'rate_total_text'?: string;

/**
 * Валидность
 */
'valid'?: string;

/**
 * Валидность
 */
'time_valid_text'?: string;

/**
 * Статус
 */
'status'?: number;

/**
 * ID главного рейта: До границы
 */
'custom_id'?: number;

/**
 * ID главного рейта: СВХ
 */
'storage_id'?: number;

/**
 * ID главного рейта: Вывоз
 */
'delivery_id'?: number;

/**
 * Статус
 */
'status_text'?: string;

/**
 * Данные для формы
 */
'form_data': {

/**
 * Статусы
 */
'statuses': Array<string>;
};

/**
 * Примечание
 */
'comment'?: string;
} => r.body)
    );
  }

  /** Path part for operation `requestOfferSave()` */
  static readonly RequestOfferSavePath = '/request_offer_save';

  /**
   * Редактирование КП.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestOfferSave()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestOfferSave$Response(
    params?: {
      body?: {

/**
 * UID
 */
'uid': string;

/**
 * Параметры профитов
 */
'param'?: {

/**
 * Массив ставок До границы
 */
'custom'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Склад (СВХ)
 */
'storage'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Вывоз
 */
'delivery'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};
};

/**
 * Валидность
 */
'valid'?: string;

/**
 * Валидность
 */
'time_valid_text'?: string;

/**
 * Статус
 */
'status'?: number;

/**
 * ID главного рейта: До границы
 */
'custom_id'?: number;

/**
 * ID главного рейта: СВХ
 */
'storage_id'?: number;

/**
 * ID главного рейта: Вывоз
 */
'delivery_id'?: number;

/**
 * Примечание
 */
'comment'?: string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestOfferSavePath, 'post');
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
   * Редактирование КП.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestOfferSave$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestOfferSave(
    params?: {
      body?: {

/**
 * UID
 */
'uid': string;

/**
 * Параметры профитов
 */
'param'?: {

/**
 * Массив ставок До границы
 */
'custom'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Склад (СВХ)
 */
'storage'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Вывоз
 */
'delivery'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};
};

/**
 * Валидность
 */
'valid'?: string;

/**
 * Валидность
 */
'time_valid_text'?: string;

/**
 * Статус
 */
'status'?: number;

/**
 * ID главного рейта: До границы
 */
'custom_id'?: number;

/**
 * ID главного рейта: СВХ
 */
'storage_id'?: number;

/**
 * ID главного рейта: Вывоз
 */
'delivery_id'?: number;

/**
 * Примечание
 */
'comment'?: string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.requestOfferSave$Response(params, context).pipe(
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

  /** Path part for operation `requestOfferDelete()` */
  static readonly RequestOfferDeletePath = '/request_offer_delete';

  /**
   * Удаление КП.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestOfferDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestOfferDelete$Response(
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestOfferDeletePath, 'post');
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
   * Удаление КП.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestOfferDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestOfferDelete(
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
    return this.requestOfferDelete$Response(params, context).pipe(
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

  /** Path part for operation `requestOfferTxt()` */
  static readonly RequestOfferTxtPath = '/request_offer_txt';

  /**
   * Скачивание КП в формате TXT.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestOfferTxt()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestOfferTxt$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;
}
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

/**
 * Текст
 */
'text'?: string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestOfferTxtPath, 'post');
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
         * Наименование
         */
        'name'?: string;
        
        /**
         * Base64 строка файла
         */
        'data'?: string;
        
        /**
         * Текст
         */
        'text'?: string;
        }>;
      })
    );
  }

  /**
   * Скачивание КП в формате TXT.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestOfferTxt$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestOfferTxt(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;
}
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

/**
 * Текст
 */
'text'?: string;
}> {
    return this.requestOfferTxt$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Наименование
 */
'name'?: string;

/**
 * Base64 строка файла
 */
'data'?: string;

/**
 * Текст
 */
'text'?: string;
}>): {

/**
 * Наименование
 */
'name'?: string;

/**
 * Base64 строка файла
 */
'data'?: string;

/**
 * Текст
 */
'text'?: string;
} => r.body)
    );
  }

  /** Path part for operation `requestOfferPdf()` */
  static readonly RequestOfferPdfPath = '/request_offer_pdf';

  /**
   * Скачивание КП в формате PDF.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestOfferPdf()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestOfferPdf$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;
}
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestOfferPdfPath, 'post');
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
   * Скачивание КП в формате PDF.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestOfferPdf$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestOfferPdf(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;
}
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
    return this.requestOfferPdf$Response(params, context).pipe(
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

  /** Path part for operation `requestOfferCalc()` */
  static readonly RequestOfferCalcPath = '/request_offer_calc';

  /**
   * Расчет профита КП.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestOfferCalc()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestOfferCalc$Response(
    params?: {
      body?: {

/**
 * UID
 */
'uid': string;

/**
 * Параметры профитов
 */
'param'?: {

/**
 * Массив ставок До границы
 */
'custom'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Склад (СВХ)
 */
'storage'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Вывоз
 */
'delivery'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};
};
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
};

/**
 * Параметры профитов
 */
'param': {

/**
 * Массив ставок До границы
 */
'custom'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Склад (СВХ)
 */
'storage'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Вывоз
 */
'delivery'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};
};

/**
 * Вх. ставка
 */
'rate_amount'?: string;

/**
 * Вх. ставка
 */
'rate_amount_text'?: string;

/**
 * Профит
 */
'profit_amount'?: string;

/**
 * Профит
 */
'profit_amount_text'?: string;

/**
 * %
 */
'profit_percent'?: string;

/**
 * %
 */
'profit_percent_text'?: string;

/**
 * Ставка итого
 */
'rate_total'?: string;

/**
 * Ставка итого
 */
'rate_total_text'?: string;

/**
 * Статус
 */
'status_text'?: string;

/**
 * Данные для формы
 */
'form_data': {

/**
 * Статусы
 */
'statuses': Array<string>;
};
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestOfferCalcPath, 'post');
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
         * ID
         */
        'id': number;
        
        /**
         * UID
         */
        'uid': string;
        
        /**
         * Дата создания
         */
        'time_add': string;
        
        /**
         * ID Запроса
         */
        'request_id': number;
        
        /**
         * Запрос
         */
        'request': {
        
        /**
         * Кол-во мест
         */
        'cargo_places_count'?: number;
        
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
        };
        
        /**
         * Параметры профитов
         */
        'param': {
        
        /**
         * Массив ставок До границы
         */
        'custom'?: {
        
        /**
         * Единый профит на все ставки
         */
        'one_profit'?: boolean;
        
        /**
         * Единый профит на все ставки - Сумма
         */
        'one_profit_amount'?: number;
        
        /**
         * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
         */
        'one_profit_amount_currency'?: number;
        
        /**
         * Единый профит на все ставки - Процент
         */
        'one_profit_percent'?: number;
        
        /**
         * Детализировать ставку в КП
         */
        'detail_items'?: boolean;
        
        /**
         * Ставки
         */
        'rows'?: Array<{
        
        /**
         * ID ставки
         */
        'id'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Признак изменения значения
         */
        'profit_changed'?: boolean;
        
        /**
         * Итого Входящее
         */
        'income_total_cost'?: number;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Главный рейт, использовать для итогового КП
         */
        'main'?: boolean;
        
        /**
         * Услуги
         */
        'services'?: Array<{
        
        /**
         * ID Услуги
         */
        'field'?: string;
        
        /**
         * Стоимость
         */
        'amount'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Признак изменения значения
         */
        'profit_changed'?: boolean;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Включено
         */
        'select'?: boolean;
        }>;
        }>;
        };
        
        /**
         * Массив ставок Склад (СВХ)
         */
        'storage'?: {
        
        /**
         * Единый профит на все ставки
         */
        'one_profit'?: boolean;
        
        /**
         * Единый профит на все ставки - Сумма
         */
        'one_profit_amount'?: number;
        
        /**
         * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
         */
        'one_profit_amount_currency'?: number;
        
        /**
         * Единый профит на все ставки - Процент
         */
        'one_profit_percent'?: number;
        
        /**
         * Детализировать ставку в КП
         */
        'detail_items'?: boolean;
        
        /**
         * Ставки
         */
        'rows'?: Array<{
        
        /**
         * ID ставки
         */
        'id'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Признак изменения значения
         */
        'profit_changed'?: boolean;
        
        /**
         * Итого Входящее
         */
        'income_total_cost'?: number;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Главный рейт, использовать для итогового КП
         */
        'main'?: boolean;
        
        /**
         * Услуги
         */
        'services'?: Array<{
        
        /**
         * ID Услуги
         */
        'field'?: string;
        
        /**
         * Стоимость
         */
        'amount'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Признак изменения значения
         */
        'profit_changed'?: boolean;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Включено
         */
        'select'?: boolean;
        }>;
        }>;
        };
        
        /**
         * Массив ставок Вывоз
         */
        'delivery'?: {
        
        /**
         * Единый профит на все ставки
         */
        'one_profit'?: boolean;
        
        /**
         * Единый профит на все ставки - Сумма
         */
        'one_profit_amount'?: number;
        
        /**
         * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
         */
        'one_profit_amount_currency'?: number;
        
        /**
         * Единый профит на все ставки - Процент
         */
        'one_profit_percent'?: number;
        
        /**
         * Детализировать ставку в КП
         */
        'detail_items'?: boolean;
        
        /**
         * Ставки
         */
        'rows'?: Array<{
        
        /**
         * ID ставки
         */
        'id'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Признак изменения значения
         */
        'profit_changed'?: boolean;
        
        /**
         * Итого Входящее
         */
        'income_total_cost'?: number;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Главный рейт, использовать для итогового КП
         */
        'main'?: boolean;
        
        /**
         * Услуги
         */
        'services'?: Array<{
        
        /**
         * ID Услуги
         */
        'field'?: string;
        
        /**
         * Стоимость
         */
        'amount'?: number;
        
        /**
         * Профит - Сумма
         */
        'profit_amount'?: number;
        
        /**
         * Профит - Процент
         */
        'profit_percent'?: number;
        
        /**
         * Признак изменения значения
         */
        'profit_changed'?: boolean;
        
        /**
         * Итого
         */
        'total_cost'?: number;
        
        /**
         * Включено
         */
        'select'?: boolean;
        }>;
        }>;
        };
        };
        
        /**
         * Вх. ставка
         */
        'rate_amount'?: string;
        
        /**
         * Вх. ставка
         */
        'rate_amount_text'?: string;
        
        /**
         * Профит
         */
        'profit_amount'?: string;
        
        /**
         * Профит
         */
        'profit_amount_text'?: string;
        
        /**
         * %
         */
        'profit_percent'?: string;
        
        /**
         * %
         */
        'profit_percent_text'?: string;
        
        /**
         * Ставка итого
         */
        'rate_total'?: string;
        
        /**
         * Ставка итого
         */
        'rate_total_text'?: string;
        
        /**
         * Статус
         */
        'status_text'?: string;
        
        /**
         * Данные для формы
         */
        'form_data': {
        
        /**
         * Статусы
         */
        'statuses': Array<string>;
        };
        }>;
      })
    );
  }

  /**
   * Расчет профита КП.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestOfferCalc$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestOfferCalc(
    params?: {
      body?: {

/**
 * UID
 */
'uid': string;

/**
 * Параметры профитов
 */
'param'?: {

/**
 * Массив ставок До границы
 */
'custom'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Склад (СВХ)
 */
'storage'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Вывоз
 */
'delivery'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};
};
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * ID
 */
'id': number;

/**
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
};

/**
 * Параметры профитов
 */
'param': {

/**
 * Массив ставок До границы
 */
'custom'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Склад (СВХ)
 */
'storage'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Вывоз
 */
'delivery'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};
};

/**
 * Вх. ставка
 */
'rate_amount'?: string;

/**
 * Вх. ставка
 */
'rate_amount_text'?: string;

/**
 * Профит
 */
'profit_amount'?: string;

/**
 * Профит
 */
'profit_amount_text'?: string;

/**
 * %
 */
'profit_percent'?: string;

/**
 * %
 */
'profit_percent_text'?: string;

/**
 * Ставка итого
 */
'rate_total'?: string;

/**
 * Ставка итого
 */
'rate_total_text'?: string;

/**
 * Статус
 */
'status_text'?: string;

/**
 * Данные для формы
 */
'form_data': {

/**
 * Статусы
 */
'statuses': Array<string>;
};
}> {
    return this.requestOfferCalc$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
};

/**
 * Параметры профитов
 */
'param': {

/**
 * Массив ставок До границы
 */
'custom'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Склад (СВХ)
 */
'storage'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Вывоз
 */
'delivery'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};
};

/**
 * Вх. ставка
 */
'rate_amount'?: string;

/**
 * Вх. ставка
 */
'rate_amount_text'?: string;

/**
 * Профит
 */
'profit_amount'?: string;

/**
 * Профит
 */
'profit_amount_text'?: string;

/**
 * %
 */
'profit_percent'?: string;

/**
 * %
 */
'profit_percent_text'?: string;

/**
 * Ставка итого
 */
'rate_total'?: string;

/**
 * Ставка итого
 */
'rate_total_text'?: string;

/**
 * Статус
 */
'status_text'?: string;

/**
 * Данные для формы
 */
'form_data': {

/**
 * Статусы
 */
'statuses': Array<string>;
};
}>): {

/**
 * ID
 */
'id': number;

/**
 * UID
 */
'uid': string;

/**
 * Дата создания
 */
'time_add': string;

/**
 * ID Запроса
 */
'request_id': number;

/**
 * Запрос
 */
'request': {

/**
 * Кол-во мест
 */
'cargo_places_count'?: number;

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
};

/**
 * Параметры профитов
 */
'param': {

/**
 * Массив ставок До границы
 */
'custom'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Склад (СВХ)
 */
'storage'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};

/**
 * Массив ставок Вывоз
 */
'delivery'?: {

/**
 * Единый профит на все ставки
 */
'one_profit'?: boolean;

/**
 * Единый профит на все ставки - Сумма
 */
'one_profit_amount'?: number;

/**
 * Единый профит на все ставки - Валюта (ID берем из запроса - system_currency)
 */
'one_profit_amount_currency'?: number;

/**
 * Единый профит на все ставки - Процент
 */
'one_profit_percent'?: number;

/**
 * Детализировать ставку в КП
 */
'detail_items'?: boolean;

/**
 * Ставки
 */
'rows'?: Array<{

/**
 * ID ставки
 */
'id'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого Входящее
 */
'income_total_cost'?: number;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Главный рейт, использовать для итогового КП
 */
'main'?: boolean;

/**
 * Услуги
 */
'services'?: Array<{

/**
 * ID Услуги
 */
'field'?: string;

/**
 * Стоимость
 */
'amount'?: number;

/**
 * Профит - Сумма
 */
'profit_amount'?: number;

/**
 * Профит - Процент
 */
'profit_percent'?: number;

/**
 * Признак изменения значения
 */
'profit_changed'?: boolean;

/**
 * Итого
 */
'total_cost'?: number;

/**
 * Включено
 */
'select'?: boolean;
}>;
}>;
};
};

/**
 * Вх. ставка
 */
'rate_amount'?: string;

/**
 * Вх. ставка
 */
'rate_amount_text'?: string;

/**
 * Профит
 */
'profit_amount'?: string;

/**
 * Профит
 */
'profit_amount_text'?: string;

/**
 * %
 */
'profit_percent'?: string;

/**
 * %
 */
'profit_percent_text'?: string;

/**
 * Ставка итого
 */
'rate_total'?: string;

/**
 * Ставка итого
 */
'rate_total_text'?: string;

/**
 * Статус
 */
'status_text'?: string;

/**
 * Данные для формы
 */
'form_data': {

/**
 * Статусы
 */
'statuses': Array<string>;
};
} => r.body)
    );
  }

  /** Path part for operation `requestOfferDelRate()` */
  static readonly RequestOfferDelRatePath = '/request_offer_del_rate';

  /**
   * Удаление ставки из КП.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestOfferDelRate()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestOfferDelRate$Response(
    params: {

    /**
     * ID
     */
      id: number;

    /**
     * ID ставки для удаления
     */
      rate_id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestOfferDelRatePath, 'get');
    if (params) {
      rb.query('id', params.id, {});
      rb.query('rate_id', params.rate_id, {});
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
   * Удаление ставки из КП.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestOfferDelRate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestOfferDelRate(
    params: {

    /**
     * ID
     */
      id: number;

    /**
     * ID ставки для удаления
     */
      rate_id: number;
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.requestOfferDelRate$Response(params, context).pipe(
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

  /** Path part for operation `requestOfferCopy()` */
  static readonly RequestOfferCopyPath = '/request_offer_copy';

  /**
   * Копирование КП.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestOfferCopy()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestOfferCopy$Response(
    params: {

    /**
     * ID
     */
      id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestOfferCopyPath, 'get');
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
         * Статус выполнения
         */
        'result': 'OK';
        }>;
      })
    );
  }

  /**
   * Копирование КП.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestOfferCopy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestOfferCopy(
    params: {

    /**
     * ID
     */
      id: number;
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.requestOfferCopy$Response(params, context).pipe(
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

  /** Path part for operation `requestOfferSend()` */
  static readonly RequestOfferSendPath = '/request_offer_send';

  /**
   * Отправка КП.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestOfferSend()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestOfferSend$Response(
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestOfferSendPath, 'post');
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
   * Отправка КП.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestOfferSend$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestOfferSend(
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
    return this.requestOfferSend$Response(params, context).pipe(
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

  /** Path part for operation `requestOfferStatuses()` */
  static readonly RequestOfferStatusesPath = '/request_offer_statuses';

  /**
   * Статусы КП.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestOfferStatuses()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestOfferStatuses$Response(
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
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestOfferStatusesPath, 'get');
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
   * Статусы КП.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestOfferStatuses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestOfferStatuses(
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
    return this.requestOfferStatuses$Response(params, context).pipe(
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

  /** Path part for operation `requestOfferSetStatus()` */
  static readonly RequestOfferSetStatusPath = '/request_offer_set_status';

  /**
   * Установка статуса КП.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestOfferSetStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestOfferSetStatus$Response(
    params: {

    /**
     * ID
     */
      id: number;

    /**
     * ID статуса
     */
      status_id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, RequestService.RequestOfferSetStatusPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
      rb.query('status_id', params.status_id, {});
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
   * Установка статуса КП.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestOfferSetStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestOfferSetStatus(
    params: {

    /**
     * ID
     */
      id: number;

    /**
     * ID статуса
     */
      status_id: number;
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.requestOfferSetStatus$Response(params, context).pipe(
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
