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
 * Работа с клиентами
 */
@Injectable({ providedIn: 'root' })
export class CustomerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `customerList()` */
  static readonly CustomerListPath = '/customer_list';

  /**
   * Список клиентов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerList()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerList$Response(
    params?: {

    /**
     * Поиск клиента по названию...
     */
      name?: string;

    /**
     * Страна (ID берем из запроса - direction_country)
     */
      country_id?: number;

    /**
     * Группа (ID берем из запроса - customer_group_list)
     */
      group_id?: number;

    /**
     * ИНН
     */
      inn?: string;

    /**
     * Контактное лицо
     */
      contact_fio?: string;

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
 * ID
 */
'id': number;

/**
 * Наименование краткое
 */
'name'?: string;

/**
 * Наименование полное
 */
'name_full'?: string;

/**
 * Страна местонахождения
 */
'country_name'?: string;

/**
 * Страна местонахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город местонахождения
 */
'city_name'?: string;

/**
 * Город местонахождения (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Юридический адрес
 */
'address_legal'?: string;

/**
 * Юридический адрес
 */
'address_post'?: string;

/**
 * ИНН
 */
'inn'?: string;

/**
 * КПП
 */
'kpp'?: string;

/**
 * ОГРН
 */
'ogrn'?: string;

/**
 * ОКПО
 */
'okpo'?: string;

/**
 * Контактное лицо
 */
'contact_fio'?: string;

/**
 * Номер телефона
 */
'phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Сайт
 */
'web'?: string;

/**
 * Руководитель ФИО
 */
'head_name'?: string;

/**
 * Должность руководителя
 */
'head_position_name'?: string;

/**
 * Должность руководителя (ID берем из запроса - system_head_position)
 */
'head_position_id'?: string;

/**
 * Документы (ссылка)
 */
'documents_path'?: string;

/**
 * Адрес для корреспонденции
 */
'document_address'?: string;

/**
 * Контактное лицо для корреспонденции
 */
'document_contact_fio'?: string;

/**
 * Телефон для корреспонденции
 */
'document_contact_phone'?: string;

/**
 * Адрес для доставки груза
 */
'delivery_address'?: string;

/**
 * Контактное лицо для доставки груза
 */
'delivery_contact_fio'?: string;

/**
 * Телефон
 */
'delivery_contact_phone'?: string;

/**
 * График работы склада
 */
'warehouse_schedule'?: string;

/**
 * Подпись ФИО
 */
'signature_fio'?: string;

/**
 * Подпись должность
 */
'signature_position'?: string;

/**
 * Подпись основание
 */
'signature_basis'?: string;

/**
 * Главный бухгалтер
 */
'accountant_fio'?: string;

/**
 * Телефон главного бухгалтера
 */
'accountant_phone'?: string;

/**
 * Наименование банка
 */
'bank_name'?: string;

/**
 * Расчетный счет
 */
'bank_payment_account'?: string;

/**
 * Корреспондентный счет
 */
'bank_correspondent_account'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Валюта счета (ID берем из запроса - /system_currency)
 */
'currency'?: string;

/**
 * Группа
 */
'group_name'?: string;

/**
 * Группа (ID берем из запроса - customer_group_list)
 */
'group_id'?: number;

/**
 * Источник
 */
'source_name'?: string;

/**
 * Источник (ID берем из запроса - system_contact_source)
 */
'source_id'?: number;

/**
 * Тип контрагента
 */
'counterparty_name'?: string;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Статус
 */
'status_name'?: string;

/**
 * Статус (ID берем из запроса - system_customer_status)
 */
'status_id'?: number;

/**
 * Взаимодействие
 */
'interaction_name'?: string;

/**
 * Взаимодействие (ID берем из запроса - system_interaction)
 */
'interaction_id'?: number;

/**
 * Виды услуг
 */
'service_names'?: Array<string>;

/**
 * Виды услуг (ID берем из запроса - system_services)
 */
'service_ids'?: Array<number>;

/**
 * Отрасль деятельности
 */
'business_name'?: string;

/**
 * Отрасль деятельности (ID берем из запроса - system_business)
 */
'business_id'?: number;

/**
 * Примечание
 */
'note'?: string;

/**
 * Менеджер по клиенту
 */
'manager_name'?: string;

/**
 * Менеджер по клиенту (ID берем из запроса - company_employee_list)
 */
'manager_id'?: number;

/**
 * Менеджер продаж
 */
'manager_sale_name'?: string;

/**
 * Менеджер продаж (ID берем из запроса - company_employee_list)
 */
'manager_sale_id'?: number;

/**
 * Менеджер создания
 */
'user_name'?: string;

/**
 * Менеджер создания (ID берем из запроса - company_employee_list)
 */
'user_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;

/**
 * Количество заказов
 */
'order_count'?: string;

/**
 * Дней с последнего заказа
 */
'order_day_last'?: string;

/**
 * Просрочка платежей
 */
'order_delay_payment'?: string;
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
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerListPath, 'get');
    if (params) {
      rb.query('name', params.name, {});
      rb.query('country_id', params.country_id, {});
      rb.query('group_id', params.group_id, {});
      rb.query('inn', params.inn, {});
      rb.query('contact_fio', params.contact_fio, {});
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
         * Наименование краткое
         */
        'name'?: string;
        
        /**
         * Наименование полное
         */
        'name_full'?: string;
        
        /**
         * Страна местонахождения
         */
        'country_name'?: string;
        
        /**
         * Страна местонахождения (ID берем из запроса - direction_country)
         */
        'country_id'?: number;
        
        /**
         * Город местонахождения
         */
        'city_name'?: string;
        
        /**
         * Город местонахождения (ID берем из запроса - direction_city)
         */
        'city_id'?: number;
        
        /**
         * Юридический адрес
         */
        'address_legal'?: string;
        
        /**
         * Юридический адрес
         */
        'address_post'?: string;
        
        /**
         * ИНН
         */
        'inn'?: string;
        
        /**
         * КПП
         */
        'kpp'?: string;
        
        /**
         * ОГРН
         */
        'ogrn'?: string;
        
        /**
         * ОКПО
         */
        'okpo'?: string;
        
        /**
         * Контактное лицо
         */
        'contact_fio'?: string;
        
        /**
         * Номер телефона
         */
        'phone'?: string;
        
        /**
         * E-mail
         */
        'email'?: string;
        
        /**
         * Сайт
         */
        'web'?: string;
        
        /**
         * Руководитель ФИО
         */
        'head_name'?: string;
        
        /**
         * Должность руководителя
         */
        'head_position_name'?: string;
        
        /**
         * Должность руководителя (ID берем из запроса - system_head_position)
         */
        'head_position_id'?: string;
        
        /**
         * Документы (ссылка)
         */
        'documents_path'?: string;
        
        /**
         * Адрес для корреспонденции
         */
        'document_address'?: string;
        
        /**
         * Контактное лицо для корреспонденции
         */
        'document_contact_fio'?: string;
        
        /**
         * Телефон для корреспонденции
         */
        'document_contact_phone'?: string;
        
        /**
         * Адрес для доставки груза
         */
        'delivery_address'?: string;
        
        /**
         * Контактное лицо для доставки груза
         */
        'delivery_contact_fio'?: string;
        
        /**
         * Телефон
         */
        'delivery_contact_phone'?: string;
        
        /**
         * График работы склада
         */
        'warehouse_schedule'?: string;
        
        /**
         * Подпись ФИО
         */
        'signature_fio'?: string;
        
        /**
         * Подпись должность
         */
        'signature_position'?: string;
        
        /**
         * Подпись основание
         */
        'signature_basis'?: string;
        
        /**
         * Главный бухгалтер
         */
        'accountant_fio'?: string;
        
        /**
         * Телефон главного бухгалтера
         */
        'accountant_phone'?: string;
        
        /**
         * Наименование банка
         */
        'bank_name'?: string;
        
        /**
         * Расчетный счет
         */
        'bank_payment_account'?: string;
        
        /**
         * Корреспондентный счет
         */
        'bank_correspondent_account'?: string;
        
        /**
         * БИК
         */
        'bank_bik'?: string;
        
        /**
         * КПП
         */
        'bank_kpp'?: string;
        
        /**
         * Валюта счета (ID берем из запроса - /system_currency)
         */
        'currency'?: string;
        
        /**
         * Группа
         */
        'group_name'?: string;
        
        /**
         * Группа (ID берем из запроса - customer_group_list)
         */
        'group_id'?: number;
        
        /**
         * Источник
         */
        'source_name'?: string;
        
        /**
         * Источник (ID берем из запроса - system_contact_source)
         */
        'source_id'?: number;
        
        /**
         * Тип контрагента
         */
        'counterparty_name'?: string;
        
        /**
         * Тип контрагента (ID берем из запроса - system_counterparty)
         */
        'counterparty_id'?: number;
        
        /**
         * Статус
         */
        'status_name'?: string;
        
        /**
         * Статус (ID берем из запроса - system_customer_status)
         */
        'status_id'?: number;
        
        /**
         * Взаимодействие
         */
        'interaction_name'?: string;
        
        /**
         * Взаимодействие (ID берем из запроса - system_interaction)
         */
        'interaction_id'?: number;
        
        /**
         * Виды услуг
         */
        'service_names'?: Array<string>;
        
        /**
         * Виды услуг (ID берем из запроса - system_services)
         */
        'service_ids'?: Array<number>;
        
        /**
         * Отрасль деятельности
         */
        'business_name'?: string;
        
        /**
         * Отрасль деятельности (ID берем из запроса - system_business)
         */
        'business_id'?: number;
        
        /**
         * Примечание
         */
        'note'?: string;
        
        /**
         * Менеджер по клиенту
         */
        'manager_name'?: string;
        
        /**
         * Менеджер по клиенту (ID берем из запроса - company_employee_list)
         */
        'manager_id'?: number;
        
        /**
         * Менеджер продаж
         */
        'manager_sale_name'?: string;
        
        /**
         * Менеджер продаж (ID берем из запроса - company_employee_list)
         */
        'manager_sale_id'?: number;
        
        /**
         * Менеджер создания
         */
        'user_name'?: string;
        
        /**
         * Менеджер создания (ID берем из запроса - company_employee_list)
         */
        'user_id'?: number;
        
        /**
         * Время создания
         */
        'time_add'?: string;
        
        /**
         * Время изменения
         */
        'time_edit'?: string;
        
        /**
         * Количество заказов
         */
        'order_count'?: string;
        
        /**
         * Дней с последнего заказа
         */
        'order_day_last'?: string;
        
        /**
         * Просрочка платежей
         */
        'order_delay_payment'?: string;
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
   * Список клиентов.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customerList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerList(
    params?: {

    /**
     * Поиск клиента по названию...
     */
      name?: string;

    /**
     * Страна (ID берем из запроса - direction_country)
     */
      country_id?: number;

    /**
     * Группа (ID берем из запроса - customer_group_list)
     */
      group_id?: number;

    /**
     * ИНН
     */
      inn?: string;

    /**
     * Контактное лицо
     */
      contact_fio?: string;

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
 * ID
 */
'id': number;

/**
 * Наименование краткое
 */
'name'?: string;

/**
 * Наименование полное
 */
'name_full'?: string;

/**
 * Страна местонахождения
 */
'country_name'?: string;

/**
 * Страна местонахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город местонахождения
 */
'city_name'?: string;

/**
 * Город местонахождения (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Юридический адрес
 */
'address_legal'?: string;

/**
 * Юридический адрес
 */
'address_post'?: string;

/**
 * ИНН
 */
'inn'?: string;

/**
 * КПП
 */
'kpp'?: string;

/**
 * ОГРН
 */
'ogrn'?: string;

/**
 * ОКПО
 */
'okpo'?: string;

/**
 * Контактное лицо
 */
'contact_fio'?: string;

/**
 * Номер телефона
 */
'phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Сайт
 */
'web'?: string;

/**
 * Руководитель ФИО
 */
'head_name'?: string;

/**
 * Должность руководителя
 */
'head_position_name'?: string;

/**
 * Должность руководителя (ID берем из запроса - system_head_position)
 */
'head_position_id'?: string;

/**
 * Документы (ссылка)
 */
'documents_path'?: string;

/**
 * Адрес для корреспонденции
 */
'document_address'?: string;

/**
 * Контактное лицо для корреспонденции
 */
'document_contact_fio'?: string;

/**
 * Телефон для корреспонденции
 */
'document_contact_phone'?: string;

/**
 * Адрес для доставки груза
 */
'delivery_address'?: string;

/**
 * Контактное лицо для доставки груза
 */
'delivery_contact_fio'?: string;

/**
 * Телефон
 */
'delivery_contact_phone'?: string;

/**
 * График работы склада
 */
'warehouse_schedule'?: string;

/**
 * Подпись ФИО
 */
'signature_fio'?: string;

/**
 * Подпись должность
 */
'signature_position'?: string;

/**
 * Подпись основание
 */
'signature_basis'?: string;

/**
 * Главный бухгалтер
 */
'accountant_fio'?: string;

/**
 * Телефон главного бухгалтера
 */
'accountant_phone'?: string;

/**
 * Наименование банка
 */
'bank_name'?: string;

/**
 * Расчетный счет
 */
'bank_payment_account'?: string;

/**
 * Корреспондентный счет
 */
'bank_correspondent_account'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Валюта счета (ID берем из запроса - /system_currency)
 */
'currency'?: string;

/**
 * Группа
 */
'group_name'?: string;

/**
 * Группа (ID берем из запроса - customer_group_list)
 */
'group_id'?: number;

/**
 * Источник
 */
'source_name'?: string;

/**
 * Источник (ID берем из запроса - system_contact_source)
 */
'source_id'?: number;

/**
 * Тип контрагента
 */
'counterparty_name'?: string;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Статус
 */
'status_name'?: string;

/**
 * Статус (ID берем из запроса - system_customer_status)
 */
'status_id'?: number;

/**
 * Взаимодействие
 */
'interaction_name'?: string;

/**
 * Взаимодействие (ID берем из запроса - system_interaction)
 */
'interaction_id'?: number;

/**
 * Виды услуг
 */
'service_names'?: Array<string>;

/**
 * Виды услуг (ID берем из запроса - system_services)
 */
'service_ids'?: Array<number>;

/**
 * Отрасль деятельности
 */
'business_name'?: string;

/**
 * Отрасль деятельности (ID берем из запроса - system_business)
 */
'business_id'?: number;

/**
 * Примечание
 */
'note'?: string;

/**
 * Менеджер по клиенту
 */
'manager_name'?: string;

/**
 * Менеджер по клиенту (ID берем из запроса - company_employee_list)
 */
'manager_id'?: number;

/**
 * Менеджер продаж
 */
'manager_sale_name'?: string;

/**
 * Менеджер продаж (ID берем из запроса - company_employee_list)
 */
'manager_sale_id'?: number;

/**
 * Менеджер создания
 */
'user_name'?: string;

/**
 * Менеджер создания (ID берем из запроса - company_employee_list)
 */
'user_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;

/**
 * Количество заказов
 */
'order_count'?: string;

/**
 * Дней с последнего заказа
 */
'order_day_last'?: string;

/**
 * Просрочка платежей
 */
'order_delay_payment'?: string;
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
    return this.customerList$Response(params, context).pipe(
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
 * Наименование краткое
 */
'name'?: string;

/**
 * Наименование полное
 */
'name_full'?: string;

/**
 * Страна местонахождения
 */
'country_name'?: string;

/**
 * Страна местонахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город местонахождения
 */
'city_name'?: string;

/**
 * Город местонахождения (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Юридический адрес
 */
'address_legal'?: string;

/**
 * Юридический адрес
 */
'address_post'?: string;

/**
 * ИНН
 */
'inn'?: string;

/**
 * КПП
 */
'kpp'?: string;

/**
 * ОГРН
 */
'ogrn'?: string;

/**
 * ОКПО
 */
'okpo'?: string;

/**
 * Контактное лицо
 */
'contact_fio'?: string;

/**
 * Номер телефона
 */
'phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Сайт
 */
'web'?: string;

/**
 * Руководитель ФИО
 */
'head_name'?: string;

/**
 * Должность руководителя
 */
'head_position_name'?: string;

/**
 * Должность руководителя (ID берем из запроса - system_head_position)
 */
'head_position_id'?: string;

/**
 * Документы (ссылка)
 */
'documents_path'?: string;

/**
 * Адрес для корреспонденции
 */
'document_address'?: string;

/**
 * Контактное лицо для корреспонденции
 */
'document_contact_fio'?: string;

/**
 * Телефон для корреспонденции
 */
'document_contact_phone'?: string;

/**
 * Адрес для доставки груза
 */
'delivery_address'?: string;

/**
 * Контактное лицо для доставки груза
 */
'delivery_contact_fio'?: string;

/**
 * Телефон
 */
'delivery_contact_phone'?: string;

/**
 * График работы склада
 */
'warehouse_schedule'?: string;

/**
 * Подпись ФИО
 */
'signature_fio'?: string;

/**
 * Подпись должность
 */
'signature_position'?: string;

/**
 * Подпись основание
 */
'signature_basis'?: string;

/**
 * Главный бухгалтер
 */
'accountant_fio'?: string;

/**
 * Телефон главного бухгалтера
 */
'accountant_phone'?: string;

/**
 * Наименование банка
 */
'bank_name'?: string;

/**
 * Расчетный счет
 */
'bank_payment_account'?: string;

/**
 * Корреспондентный счет
 */
'bank_correspondent_account'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Валюта счета (ID берем из запроса - /system_currency)
 */
'currency'?: string;

/**
 * Группа
 */
'group_name'?: string;

/**
 * Группа (ID берем из запроса - customer_group_list)
 */
'group_id'?: number;

/**
 * Источник
 */
'source_name'?: string;

/**
 * Источник (ID берем из запроса - system_contact_source)
 */
'source_id'?: number;

/**
 * Тип контрагента
 */
'counterparty_name'?: string;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Статус
 */
'status_name'?: string;

/**
 * Статус (ID берем из запроса - system_customer_status)
 */
'status_id'?: number;

/**
 * Взаимодействие
 */
'interaction_name'?: string;

/**
 * Взаимодействие (ID берем из запроса - system_interaction)
 */
'interaction_id'?: number;

/**
 * Виды услуг
 */
'service_names'?: Array<string>;

/**
 * Виды услуг (ID берем из запроса - system_services)
 */
'service_ids'?: Array<number>;

/**
 * Отрасль деятельности
 */
'business_name'?: string;

/**
 * Отрасль деятельности (ID берем из запроса - system_business)
 */
'business_id'?: number;

/**
 * Примечание
 */
'note'?: string;

/**
 * Менеджер по клиенту
 */
'manager_name'?: string;

/**
 * Менеджер по клиенту (ID берем из запроса - company_employee_list)
 */
'manager_id'?: number;

/**
 * Менеджер продаж
 */
'manager_sale_name'?: string;

/**
 * Менеджер продаж (ID берем из запроса - company_employee_list)
 */
'manager_sale_id'?: number;

/**
 * Менеджер создания
 */
'user_name'?: string;

/**
 * Менеджер создания (ID берем из запроса - company_employee_list)
 */
'user_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;

/**
 * Количество заказов
 */
'order_count'?: string;

/**
 * Дней с последнего заказа
 */
'order_day_last'?: string;

/**
 * Просрочка платежей
 */
'order_delay_payment'?: string;
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
 * ID
 */
'id': number;

/**
 * Наименование краткое
 */
'name'?: string;

/**
 * Наименование полное
 */
'name_full'?: string;

/**
 * Страна местонахождения
 */
'country_name'?: string;

/**
 * Страна местонахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город местонахождения
 */
'city_name'?: string;

/**
 * Город местонахождения (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Юридический адрес
 */
'address_legal'?: string;

/**
 * Юридический адрес
 */
'address_post'?: string;

/**
 * ИНН
 */
'inn'?: string;

/**
 * КПП
 */
'kpp'?: string;

/**
 * ОГРН
 */
'ogrn'?: string;

/**
 * ОКПО
 */
'okpo'?: string;

/**
 * Контактное лицо
 */
'contact_fio'?: string;

/**
 * Номер телефона
 */
'phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Сайт
 */
'web'?: string;

/**
 * Руководитель ФИО
 */
'head_name'?: string;

/**
 * Должность руководителя
 */
'head_position_name'?: string;

/**
 * Должность руководителя (ID берем из запроса - system_head_position)
 */
'head_position_id'?: string;

/**
 * Документы (ссылка)
 */
'documents_path'?: string;

/**
 * Адрес для корреспонденции
 */
'document_address'?: string;

/**
 * Контактное лицо для корреспонденции
 */
'document_contact_fio'?: string;

/**
 * Телефон для корреспонденции
 */
'document_contact_phone'?: string;

/**
 * Адрес для доставки груза
 */
'delivery_address'?: string;

/**
 * Контактное лицо для доставки груза
 */
'delivery_contact_fio'?: string;

/**
 * Телефон
 */
'delivery_contact_phone'?: string;

/**
 * График работы склада
 */
'warehouse_schedule'?: string;

/**
 * Подпись ФИО
 */
'signature_fio'?: string;

/**
 * Подпись должность
 */
'signature_position'?: string;

/**
 * Подпись основание
 */
'signature_basis'?: string;

/**
 * Главный бухгалтер
 */
'accountant_fio'?: string;

/**
 * Телефон главного бухгалтера
 */
'accountant_phone'?: string;

/**
 * Наименование банка
 */
'bank_name'?: string;

/**
 * Расчетный счет
 */
'bank_payment_account'?: string;

/**
 * Корреспондентный счет
 */
'bank_correspondent_account'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Валюта счета (ID берем из запроса - /system_currency)
 */
'currency'?: string;

/**
 * Группа
 */
'group_name'?: string;

/**
 * Группа (ID берем из запроса - customer_group_list)
 */
'group_id'?: number;

/**
 * Источник
 */
'source_name'?: string;

/**
 * Источник (ID берем из запроса - system_contact_source)
 */
'source_id'?: number;

/**
 * Тип контрагента
 */
'counterparty_name'?: string;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Статус
 */
'status_name'?: string;

/**
 * Статус (ID берем из запроса - system_customer_status)
 */
'status_id'?: number;

/**
 * Взаимодействие
 */
'interaction_name'?: string;

/**
 * Взаимодействие (ID берем из запроса - system_interaction)
 */
'interaction_id'?: number;

/**
 * Виды услуг
 */
'service_names'?: Array<string>;

/**
 * Виды услуг (ID берем из запроса - system_services)
 */
'service_ids'?: Array<number>;

/**
 * Отрасль деятельности
 */
'business_name'?: string;

/**
 * Отрасль деятельности (ID берем из запроса - system_business)
 */
'business_id'?: number;

/**
 * Примечание
 */
'note'?: string;

/**
 * Менеджер по клиенту
 */
'manager_name'?: string;

/**
 * Менеджер по клиенту (ID берем из запроса - company_employee_list)
 */
'manager_id'?: number;

/**
 * Менеджер продаж
 */
'manager_sale_name'?: string;

/**
 * Менеджер продаж (ID берем из запроса - company_employee_list)
 */
'manager_sale_id'?: number;

/**
 * Менеджер создания
 */
'user_name'?: string;

/**
 * Менеджер создания (ID берем из запроса - company_employee_list)
 */
'user_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;

/**
 * Количество заказов
 */
'order_count'?: string;

/**
 * Дней с последнего заказа
 */
'order_day_last'?: string;

/**
 * Просрочка платежей
 */
'order_delay_payment'?: string;
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

  /** Path part for operation `customerListSearch()` */
  static readonly CustomerListSearchPath = '/customer_list_search';

  /**
   * Параметры формы поиска.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerListSearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerListSearch$Response(
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
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerListSearchPath, 'get');
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
   * To access the full response (for headers, for example), `customerListSearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerListSearch(
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
    return this.customerListSearch$Response(params, context).pipe(
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

  /** Path part for operation `customerInfo()` */
  static readonly CustomerInfoPath = '/customer_info';

  /**
   * Данные клиента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerInfo$Response(
    params: {

    /**
     * ID клиента
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
 * Наименование краткое
 */
'name'?: string;

/**
 * Наименование полное
 */
'name_full'?: string;

/**
 * Страна местонахождения
 */
'country_name'?: string;

/**
 * Страна местонахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город местонахождения
 */
'city_name'?: string;

/**
 * Город местонахождения (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Юридический адрес
 */
'address_legal'?: string;

/**
 * Юридический адрес
 */
'address_post'?: string;

/**
 * ИНН
 */
'inn'?: string;

/**
 * КПП
 */
'kpp'?: string;

/**
 * ОГРН
 */
'ogrn'?: string;

/**
 * ОКПО
 */
'okpo'?: string;

/**
 * Контактное лицо
 */
'contact_fio'?: string;

/**
 * Номер телефона
 */
'phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Сайт
 */
'web'?: string;

/**
 * Руководитель ФИО
 */
'head_name'?: string;

/**
 * Должность руководителя
 */
'head_position_name'?: string;

/**
 * Должность руководителя (ID берем из запроса - system_head_position)
 */
'head_position_id'?: string;

/**
 * Документы (ссылка)
 */
'documents_path'?: string;

/**
 * Адрес для корреспонденции
 */
'document_address'?: string;

/**
 * Контактное лицо для корреспонденции
 */
'document_contact_fio'?: string;

/**
 * Телефон для корреспонденции
 */
'document_contact_phone'?: string;

/**
 * Адрес для доставки груза
 */
'delivery_address'?: string;

/**
 * Контактное лицо для доставки груза
 */
'delivery_contact_fio'?: string;

/**
 * Телефон
 */
'delivery_contact_phone'?: string;

/**
 * График работы склада
 */
'warehouse_schedule'?: string;

/**
 * Подпись ФИО
 */
'signature_fio'?: string;

/**
 * Подпись должность
 */
'signature_position'?: string;

/**
 * Подпись основание
 */
'signature_basis'?: string;

/**
 * Главный бухгалтер
 */
'accountant_fio'?: string;

/**
 * Телефон главного бухгалтера
 */
'accountant_phone'?: string;

/**
 * Наименование банка
 */
'bank_name'?: string;

/**
 * Расчетный счет
 */
'bank_payment_account'?: string;

/**
 * Корреспондентный счет
 */
'bank_correspondent_account'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Валюта счета (ID берем из запроса - /system_currency)
 */
'currency'?: string;

/**
 * Группа
 */
'group_name'?: string;

/**
 * Группа (ID берем из запроса - customer_group_list)
 */
'group_id'?: number;

/**
 * Источник
 */
'source_name'?: string;

/**
 * Источник (ID берем из запроса - system_contact_source)
 */
'source_id'?: number;

/**
 * Тип контрагента
 */
'counterparty_name'?: string;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Статус
 */
'status_name'?: string;

/**
 * Статус (ID берем из запроса - system_customer_status)
 */
'status_id'?: number;

/**
 * Взаимодействие
 */
'interaction_name'?: string;

/**
 * Взаимодействие (ID берем из запроса - system_interaction)
 */
'interaction_id'?: number;

/**
 * Виды услуг
 */
'service_names'?: Array<string>;

/**
 * Виды услуг (ID берем из запроса - system_services)
 */
'service_ids'?: Array<number>;

/**
 * Отрасль деятельности
 */
'business_name'?: string;

/**
 * Отрасль деятельности (ID берем из запроса - system_business)
 */
'business_id'?: number;

/**
 * Примечание
 */
'note'?: string;

/**
 * Менеджер по клиенту
 */
'manager_name'?: string;

/**
 * Менеджер по клиенту (ID берем из запроса - company_employee_list)
 */
'manager_id'?: number;

/**
 * Менеджер продаж
 */
'manager_sale_name'?: string;

/**
 * Менеджер продаж (ID берем из запроса - company_employee_list)
 */
'manager_sale_id'?: number;

/**
 * Менеджер создания
 */
'user_name'?: string;

/**
 * Менеджер создания (ID берем из запроса - company_employee_list)
 */
'user_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;

/**
 * Количество заказов
 */
'order_count'?: string;

/**
 * Дней с последнего заказа
 */
'order_day_last'?: string;

/**
 * Просрочка платежей
 */
'order_delay_payment'?: string;

/**
 * Документы (файлы)
 */
'documents_file'?: {
};
}>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerInfoPath, 'get');
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
         * Наименование краткое
         */
        'name'?: string;
        
        /**
         * Наименование полное
         */
        'name_full'?: string;
        
        /**
         * Страна местонахождения
         */
        'country_name'?: string;
        
        /**
         * Страна местонахождения (ID берем из запроса - direction_country)
         */
        'country_id'?: number;
        
        /**
         * Город местонахождения
         */
        'city_name'?: string;
        
        /**
         * Город местонахождения (ID берем из запроса - direction_city)
         */
        'city_id'?: number;
        
        /**
         * Юридический адрес
         */
        'address_legal'?: string;
        
        /**
         * Юридический адрес
         */
        'address_post'?: string;
        
        /**
         * ИНН
         */
        'inn'?: string;
        
        /**
         * КПП
         */
        'kpp'?: string;
        
        /**
         * ОГРН
         */
        'ogrn'?: string;
        
        /**
         * ОКПО
         */
        'okpo'?: string;
        
        /**
         * Контактное лицо
         */
        'contact_fio'?: string;
        
        /**
         * Номер телефона
         */
        'phone'?: string;
        
        /**
         * E-mail
         */
        'email'?: string;
        
        /**
         * Сайт
         */
        'web'?: string;
        
        /**
         * Руководитель ФИО
         */
        'head_name'?: string;
        
        /**
         * Должность руководителя
         */
        'head_position_name'?: string;
        
        /**
         * Должность руководителя (ID берем из запроса - system_head_position)
         */
        'head_position_id'?: string;
        
        /**
         * Документы (ссылка)
         */
        'documents_path'?: string;
        
        /**
         * Адрес для корреспонденции
         */
        'document_address'?: string;
        
        /**
         * Контактное лицо для корреспонденции
         */
        'document_contact_fio'?: string;
        
        /**
         * Телефон для корреспонденции
         */
        'document_contact_phone'?: string;
        
        /**
         * Адрес для доставки груза
         */
        'delivery_address'?: string;
        
        /**
         * Контактное лицо для доставки груза
         */
        'delivery_contact_fio'?: string;
        
        /**
         * Телефон
         */
        'delivery_contact_phone'?: string;
        
        /**
         * График работы склада
         */
        'warehouse_schedule'?: string;
        
        /**
         * Подпись ФИО
         */
        'signature_fio'?: string;
        
        /**
         * Подпись должность
         */
        'signature_position'?: string;
        
        /**
         * Подпись основание
         */
        'signature_basis'?: string;
        
        /**
         * Главный бухгалтер
         */
        'accountant_fio'?: string;
        
        /**
         * Телефон главного бухгалтера
         */
        'accountant_phone'?: string;
        
        /**
         * Наименование банка
         */
        'bank_name'?: string;
        
        /**
         * Расчетный счет
         */
        'bank_payment_account'?: string;
        
        /**
         * Корреспондентный счет
         */
        'bank_correspondent_account'?: string;
        
        /**
         * БИК
         */
        'bank_bik'?: string;
        
        /**
         * КПП
         */
        'bank_kpp'?: string;
        
        /**
         * Валюта счета (ID берем из запроса - /system_currency)
         */
        'currency'?: string;
        
        /**
         * Группа
         */
        'group_name'?: string;
        
        /**
         * Группа (ID берем из запроса - customer_group_list)
         */
        'group_id'?: number;
        
        /**
         * Источник
         */
        'source_name'?: string;
        
        /**
         * Источник (ID берем из запроса - system_contact_source)
         */
        'source_id'?: number;
        
        /**
         * Тип контрагента
         */
        'counterparty_name'?: string;
        
        /**
         * Тип контрагента (ID берем из запроса - system_counterparty)
         */
        'counterparty_id'?: number;
        
        /**
         * Статус
         */
        'status_name'?: string;
        
        /**
         * Статус (ID берем из запроса - system_customer_status)
         */
        'status_id'?: number;
        
        /**
         * Взаимодействие
         */
        'interaction_name'?: string;
        
        /**
         * Взаимодействие (ID берем из запроса - system_interaction)
         */
        'interaction_id'?: number;
        
        /**
         * Виды услуг
         */
        'service_names'?: Array<string>;
        
        /**
         * Виды услуг (ID берем из запроса - system_services)
         */
        'service_ids'?: Array<number>;
        
        /**
         * Отрасль деятельности
         */
        'business_name'?: string;
        
        /**
         * Отрасль деятельности (ID берем из запроса - system_business)
         */
        'business_id'?: number;
        
        /**
         * Примечание
         */
        'note'?: string;
        
        /**
         * Менеджер по клиенту
         */
        'manager_name'?: string;
        
        /**
         * Менеджер по клиенту (ID берем из запроса - company_employee_list)
         */
        'manager_id'?: number;
        
        /**
         * Менеджер продаж
         */
        'manager_sale_name'?: string;
        
        /**
         * Менеджер продаж (ID берем из запроса - company_employee_list)
         */
        'manager_sale_id'?: number;
        
        /**
         * Менеджер создания
         */
        'user_name'?: string;
        
        /**
         * Менеджер создания (ID берем из запроса - company_employee_list)
         */
        'user_id'?: number;
        
        /**
         * Время создания
         */
        'time_add'?: string;
        
        /**
         * Время изменения
         */
        'time_edit'?: string;
        
        /**
         * Количество заказов
         */
        'order_count'?: string;
        
        /**
         * Дней с последнего заказа
         */
        'order_day_last'?: string;
        
        /**
         * Просрочка платежей
         */
        'order_delay_payment'?: string;
        
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
   * Данные клиента.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customerInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerInfo(
    params: {

    /**
     * ID клиента
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
 * Наименование краткое
 */
'name'?: string;

/**
 * Наименование полное
 */
'name_full'?: string;

/**
 * Страна местонахождения
 */
'country_name'?: string;

/**
 * Страна местонахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город местонахождения
 */
'city_name'?: string;

/**
 * Город местонахождения (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Юридический адрес
 */
'address_legal'?: string;

/**
 * Юридический адрес
 */
'address_post'?: string;

/**
 * ИНН
 */
'inn'?: string;

/**
 * КПП
 */
'kpp'?: string;

/**
 * ОГРН
 */
'ogrn'?: string;

/**
 * ОКПО
 */
'okpo'?: string;

/**
 * Контактное лицо
 */
'contact_fio'?: string;

/**
 * Номер телефона
 */
'phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Сайт
 */
'web'?: string;

/**
 * Руководитель ФИО
 */
'head_name'?: string;

/**
 * Должность руководителя
 */
'head_position_name'?: string;

/**
 * Должность руководителя (ID берем из запроса - system_head_position)
 */
'head_position_id'?: string;

/**
 * Документы (ссылка)
 */
'documents_path'?: string;

/**
 * Адрес для корреспонденции
 */
'document_address'?: string;

/**
 * Контактное лицо для корреспонденции
 */
'document_contact_fio'?: string;

/**
 * Телефон для корреспонденции
 */
'document_contact_phone'?: string;

/**
 * Адрес для доставки груза
 */
'delivery_address'?: string;

/**
 * Контактное лицо для доставки груза
 */
'delivery_contact_fio'?: string;

/**
 * Телефон
 */
'delivery_contact_phone'?: string;

/**
 * График работы склада
 */
'warehouse_schedule'?: string;

/**
 * Подпись ФИО
 */
'signature_fio'?: string;

/**
 * Подпись должность
 */
'signature_position'?: string;

/**
 * Подпись основание
 */
'signature_basis'?: string;

/**
 * Главный бухгалтер
 */
'accountant_fio'?: string;

/**
 * Телефон главного бухгалтера
 */
'accountant_phone'?: string;

/**
 * Наименование банка
 */
'bank_name'?: string;

/**
 * Расчетный счет
 */
'bank_payment_account'?: string;

/**
 * Корреспондентный счет
 */
'bank_correspondent_account'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Валюта счета (ID берем из запроса - /system_currency)
 */
'currency'?: string;

/**
 * Группа
 */
'group_name'?: string;

/**
 * Группа (ID берем из запроса - customer_group_list)
 */
'group_id'?: number;

/**
 * Источник
 */
'source_name'?: string;

/**
 * Источник (ID берем из запроса - system_contact_source)
 */
'source_id'?: number;

/**
 * Тип контрагента
 */
'counterparty_name'?: string;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Статус
 */
'status_name'?: string;

/**
 * Статус (ID берем из запроса - system_customer_status)
 */
'status_id'?: number;

/**
 * Взаимодействие
 */
'interaction_name'?: string;

/**
 * Взаимодействие (ID берем из запроса - system_interaction)
 */
'interaction_id'?: number;

/**
 * Виды услуг
 */
'service_names'?: Array<string>;

/**
 * Виды услуг (ID берем из запроса - system_services)
 */
'service_ids'?: Array<number>;

/**
 * Отрасль деятельности
 */
'business_name'?: string;

/**
 * Отрасль деятельности (ID берем из запроса - system_business)
 */
'business_id'?: number;

/**
 * Примечание
 */
'note'?: string;

/**
 * Менеджер по клиенту
 */
'manager_name'?: string;

/**
 * Менеджер по клиенту (ID берем из запроса - company_employee_list)
 */
'manager_id'?: number;

/**
 * Менеджер продаж
 */
'manager_sale_name'?: string;

/**
 * Менеджер продаж (ID берем из запроса - company_employee_list)
 */
'manager_sale_id'?: number;

/**
 * Менеджер создания
 */
'user_name'?: string;

/**
 * Менеджер создания (ID берем из запроса - company_employee_list)
 */
'user_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;

/**
 * Количество заказов
 */
'order_count'?: string;

/**
 * Дней с последнего заказа
 */
'order_day_last'?: string;

/**
 * Просрочка платежей
 */
'order_delay_payment'?: string;

/**
 * Документы (файлы)
 */
'documents_file'?: {
};
}> {
    return this.customerInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * Наименование краткое
 */
'name'?: string;

/**
 * Наименование полное
 */
'name_full'?: string;

/**
 * Страна местонахождения
 */
'country_name'?: string;

/**
 * Страна местонахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город местонахождения
 */
'city_name'?: string;

/**
 * Город местонахождения (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Юридический адрес
 */
'address_legal'?: string;

/**
 * Юридический адрес
 */
'address_post'?: string;

/**
 * ИНН
 */
'inn'?: string;

/**
 * КПП
 */
'kpp'?: string;

/**
 * ОГРН
 */
'ogrn'?: string;

/**
 * ОКПО
 */
'okpo'?: string;

/**
 * Контактное лицо
 */
'contact_fio'?: string;

/**
 * Номер телефона
 */
'phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Сайт
 */
'web'?: string;

/**
 * Руководитель ФИО
 */
'head_name'?: string;

/**
 * Должность руководителя
 */
'head_position_name'?: string;

/**
 * Должность руководителя (ID берем из запроса - system_head_position)
 */
'head_position_id'?: string;

/**
 * Документы (ссылка)
 */
'documents_path'?: string;

/**
 * Адрес для корреспонденции
 */
'document_address'?: string;

/**
 * Контактное лицо для корреспонденции
 */
'document_contact_fio'?: string;

/**
 * Телефон для корреспонденции
 */
'document_contact_phone'?: string;

/**
 * Адрес для доставки груза
 */
'delivery_address'?: string;

/**
 * Контактное лицо для доставки груза
 */
'delivery_contact_fio'?: string;

/**
 * Телефон
 */
'delivery_contact_phone'?: string;

/**
 * График работы склада
 */
'warehouse_schedule'?: string;

/**
 * Подпись ФИО
 */
'signature_fio'?: string;

/**
 * Подпись должность
 */
'signature_position'?: string;

/**
 * Подпись основание
 */
'signature_basis'?: string;

/**
 * Главный бухгалтер
 */
'accountant_fio'?: string;

/**
 * Телефон главного бухгалтера
 */
'accountant_phone'?: string;

/**
 * Наименование банка
 */
'bank_name'?: string;

/**
 * Расчетный счет
 */
'bank_payment_account'?: string;

/**
 * Корреспондентный счет
 */
'bank_correspondent_account'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Валюта счета (ID берем из запроса - /system_currency)
 */
'currency'?: string;

/**
 * Группа
 */
'group_name'?: string;

/**
 * Группа (ID берем из запроса - customer_group_list)
 */
'group_id'?: number;

/**
 * Источник
 */
'source_name'?: string;

/**
 * Источник (ID берем из запроса - system_contact_source)
 */
'source_id'?: number;

/**
 * Тип контрагента
 */
'counterparty_name'?: string;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Статус
 */
'status_name'?: string;

/**
 * Статус (ID берем из запроса - system_customer_status)
 */
'status_id'?: number;

/**
 * Взаимодействие
 */
'interaction_name'?: string;

/**
 * Взаимодействие (ID берем из запроса - system_interaction)
 */
'interaction_id'?: number;

/**
 * Виды услуг
 */
'service_names'?: Array<string>;

/**
 * Виды услуг (ID берем из запроса - system_services)
 */
'service_ids'?: Array<number>;

/**
 * Отрасль деятельности
 */
'business_name'?: string;

/**
 * Отрасль деятельности (ID берем из запроса - system_business)
 */
'business_id'?: number;

/**
 * Примечание
 */
'note'?: string;

/**
 * Менеджер по клиенту
 */
'manager_name'?: string;

/**
 * Менеджер по клиенту (ID берем из запроса - company_employee_list)
 */
'manager_id'?: number;

/**
 * Менеджер продаж
 */
'manager_sale_name'?: string;

/**
 * Менеджер продаж (ID берем из запроса - company_employee_list)
 */
'manager_sale_id'?: number;

/**
 * Менеджер создания
 */
'user_name'?: string;

/**
 * Менеджер создания (ID берем из запроса - company_employee_list)
 */
'user_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;

/**
 * Количество заказов
 */
'order_count'?: string;

/**
 * Дней с последнего заказа
 */
'order_day_last'?: string;

/**
 * Просрочка платежей
 */
'order_delay_payment'?: string;

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
 * Наименование краткое
 */
'name'?: string;

/**
 * Наименование полное
 */
'name_full'?: string;

/**
 * Страна местонахождения
 */
'country_name'?: string;

/**
 * Страна местонахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город местонахождения
 */
'city_name'?: string;

/**
 * Город местонахождения (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Юридический адрес
 */
'address_legal'?: string;

/**
 * Юридический адрес
 */
'address_post'?: string;

/**
 * ИНН
 */
'inn'?: string;

/**
 * КПП
 */
'kpp'?: string;

/**
 * ОГРН
 */
'ogrn'?: string;

/**
 * ОКПО
 */
'okpo'?: string;

/**
 * Контактное лицо
 */
'contact_fio'?: string;

/**
 * Номер телефона
 */
'phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Сайт
 */
'web'?: string;

/**
 * Руководитель ФИО
 */
'head_name'?: string;

/**
 * Должность руководителя
 */
'head_position_name'?: string;

/**
 * Должность руководителя (ID берем из запроса - system_head_position)
 */
'head_position_id'?: string;

/**
 * Документы (ссылка)
 */
'documents_path'?: string;

/**
 * Адрес для корреспонденции
 */
'document_address'?: string;

/**
 * Контактное лицо для корреспонденции
 */
'document_contact_fio'?: string;

/**
 * Телефон для корреспонденции
 */
'document_contact_phone'?: string;

/**
 * Адрес для доставки груза
 */
'delivery_address'?: string;

/**
 * Контактное лицо для доставки груза
 */
'delivery_contact_fio'?: string;

/**
 * Телефон
 */
'delivery_contact_phone'?: string;

/**
 * График работы склада
 */
'warehouse_schedule'?: string;

/**
 * Подпись ФИО
 */
'signature_fio'?: string;

/**
 * Подпись должность
 */
'signature_position'?: string;

/**
 * Подпись основание
 */
'signature_basis'?: string;

/**
 * Главный бухгалтер
 */
'accountant_fio'?: string;

/**
 * Телефон главного бухгалтера
 */
'accountant_phone'?: string;

/**
 * Наименование банка
 */
'bank_name'?: string;

/**
 * Расчетный счет
 */
'bank_payment_account'?: string;

/**
 * Корреспондентный счет
 */
'bank_correspondent_account'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Валюта счета (ID берем из запроса - /system_currency)
 */
'currency'?: string;

/**
 * Группа
 */
'group_name'?: string;

/**
 * Группа (ID берем из запроса - customer_group_list)
 */
'group_id'?: number;

/**
 * Источник
 */
'source_name'?: string;

/**
 * Источник (ID берем из запроса - system_contact_source)
 */
'source_id'?: number;

/**
 * Тип контрагента
 */
'counterparty_name'?: string;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Статус
 */
'status_name'?: string;

/**
 * Статус (ID берем из запроса - system_customer_status)
 */
'status_id'?: number;

/**
 * Взаимодействие
 */
'interaction_name'?: string;

/**
 * Взаимодействие (ID берем из запроса - system_interaction)
 */
'interaction_id'?: number;

/**
 * Виды услуг
 */
'service_names'?: Array<string>;

/**
 * Виды услуг (ID берем из запроса - system_services)
 */
'service_ids'?: Array<number>;

/**
 * Отрасль деятельности
 */
'business_name'?: string;

/**
 * Отрасль деятельности (ID берем из запроса - system_business)
 */
'business_id'?: number;

/**
 * Примечание
 */
'note'?: string;

/**
 * Менеджер по клиенту
 */
'manager_name'?: string;

/**
 * Менеджер по клиенту (ID берем из запроса - company_employee_list)
 */
'manager_id'?: number;

/**
 * Менеджер продаж
 */
'manager_sale_name'?: string;

/**
 * Менеджер продаж (ID берем из запроса - company_employee_list)
 */
'manager_sale_id'?: number;

/**
 * Менеджер создания
 */
'user_name'?: string;

/**
 * Менеджер создания (ID берем из запроса - company_employee_list)
 */
'user_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;

/**
 * Количество заказов
 */
'order_count'?: string;

/**
 * Дней с последнего заказа
 */
'order_day_last'?: string;

/**
 * Просрочка платежей
 */
'order_delay_payment'?: string;

/**
 * Документы (файлы)
 */
'documents_file'?: {
};
} => r.body)
    );
  }

  /** Path part for operation `customerCreate()` */
  static readonly CustomerCreatePath = '/customer_create';

  /**
   * Добавление клиента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerCreate$Response(
    params?: {
      body?: {

/**
 * Наименование краткое
 */
'name': string;

/**
 * Наименование полное
 */
'name_full': string;

/**
 * Страна местонахождения (ID берем из запроса - direction_country)
 */
'country_id': number;

/**
 * Город местонахождения (ID берем из запроса - direction_city)
 */
'city_id': number;

/**
 * Юридический адрес
 */
'address_legal'?: string;

/**
 * Юридический адрес
 */
'address_post'?: string;

/**
 * ИНН
 */
'inn'?: string;

/**
 * КПП
 */
'kpp'?: string;

/**
 * ОГРН
 */
'ogrn'?: string;

/**
 * ОКПО
 */
'okpo'?: string;

/**
 * Контактное лицо
 */
'contact_fio': string;

/**
 * Номер телефона
 */
'phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Сайт
 */
'web'?: string;

/**
 * Руководитель ФИО
 */
'head_name'?: string;

/**
 * Должность руководителя (ID берем из запроса - system_head_position)
 */
'head_position_id'?: string;

/**
 * Документы (ссылка)
 */
'documents_path'?: string;

/**
 * Адрес для корреспонденции
 */
'document_address'?: string;

/**
 * Контактное лицо для корреспонденции
 */
'document_contact_fio'?: string;

/**
 * Телефон для корреспонденции
 */
'document_contact_phone'?: string;

/**
 * Адрес для доставки груза
 */
'delivery_address'?: string;

/**
 * Контактное лицо для доставки груза
 */
'delivery_contact_fio'?: string;

/**
 * Телефон
 */
'delivery_contact_phone'?: string;

/**
 * График работы склада
 */
'warehouse_schedule'?: string;

/**
 * Подпись ФИО
 */
'signature_fio'?: string;

/**
 * Подпись должность
 */
'signature_position'?: string;

/**
 * Подпись основание
 */
'signature_basis'?: string;

/**
 * Главный бухгалтер
 */
'accountant_fio'?: string;

/**
 * Телефон главного бухгалтера
 */
'accountant_phone'?: string;

/**
 * Наименование банка
 */
'bank_name'?: string;

/**
 * Расчетный счет
 */
'bank_payment_account'?: string;

/**
 * Корреспондентный счет
 */
'bank_correspondent_account'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Валюта счета (ID берем из запроса - /system_currency)
 */
'currency'?: string;

/**
 * Группа (ID берем из запроса - customer_group_list)
 */
'group_id'?: number;

/**
 * Источник (ID берем из запроса - system_contact_source)
 */
'source_id'?: number;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Статус (ID берем из запроса - system_customer_status)
 */
'status_id'?: number;

/**
 * Взаимодействие (ID берем из запроса - system_interaction)
 */
'interaction_id'?: number;

/**
 * Виды услуг (ID берем из запроса - system_services)
 */
'service_ids'?: Array<number>;

/**
 * Отрасль деятельности (ID берем из запроса - system_business)
 */
'business_id'?: number;

/**
 * Примечание
 */
'note'?: string;

/**
 * Менеджер по клиенту (ID берем из запроса - company_employee_list)
 */
'manager_id'?: number;

/**
 * Менеджер продаж (ID берем из запроса - company_employee_list)
 */
'manager_sale_id'?: number;
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
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerCreatePath, 'post');
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
   * Добавление клиента.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerCreate(
    params?: {
      body?: {

/**
 * Наименование краткое
 */
'name': string;

/**
 * Наименование полное
 */
'name_full': string;

/**
 * Страна местонахождения (ID берем из запроса - direction_country)
 */
'country_id': number;

/**
 * Город местонахождения (ID берем из запроса - direction_city)
 */
'city_id': number;

/**
 * Юридический адрес
 */
'address_legal'?: string;

/**
 * Юридический адрес
 */
'address_post'?: string;

/**
 * ИНН
 */
'inn'?: string;

/**
 * КПП
 */
'kpp'?: string;

/**
 * ОГРН
 */
'ogrn'?: string;

/**
 * ОКПО
 */
'okpo'?: string;

/**
 * Контактное лицо
 */
'contact_fio': string;

/**
 * Номер телефона
 */
'phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Сайт
 */
'web'?: string;

/**
 * Руководитель ФИО
 */
'head_name'?: string;

/**
 * Должность руководителя (ID берем из запроса - system_head_position)
 */
'head_position_id'?: string;

/**
 * Документы (ссылка)
 */
'documents_path'?: string;

/**
 * Адрес для корреспонденции
 */
'document_address'?: string;

/**
 * Контактное лицо для корреспонденции
 */
'document_contact_fio'?: string;

/**
 * Телефон для корреспонденции
 */
'document_contact_phone'?: string;

/**
 * Адрес для доставки груза
 */
'delivery_address'?: string;

/**
 * Контактное лицо для доставки груза
 */
'delivery_contact_fio'?: string;

/**
 * Телефон
 */
'delivery_contact_phone'?: string;

/**
 * График работы склада
 */
'warehouse_schedule'?: string;

/**
 * Подпись ФИО
 */
'signature_fio'?: string;

/**
 * Подпись должность
 */
'signature_position'?: string;

/**
 * Подпись основание
 */
'signature_basis'?: string;

/**
 * Главный бухгалтер
 */
'accountant_fio'?: string;

/**
 * Телефон главного бухгалтера
 */
'accountant_phone'?: string;

/**
 * Наименование банка
 */
'bank_name'?: string;

/**
 * Расчетный счет
 */
'bank_payment_account'?: string;

/**
 * Корреспондентный счет
 */
'bank_correspondent_account'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Валюта счета (ID берем из запроса - /system_currency)
 */
'currency'?: string;

/**
 * Группа (ID берем из запроса - customer_group_list)
 */
'group_id'?: number;

/**
 * Источник (ID берем из запроса - system_contact_source)
 */
'source_id'?: number;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Статус (ID берем из запроса - system_customer_status)
 */
'status_id'?: number;

/**
 * Взаимодействие (ID берем из запроса - system_interaction)
 */
'interaction_id'?: number;

/**
 * Виды услуг (ID берем из запроса - system_services)
 */
'service_ids'?: Array<number>;

/**
 * Отрасль деятельности (ID берем из запроса - system_business)
 */
'business_id'?: number;

/**
 * Примечание
 */
'note'?: string;

/**
 * Менеджер по клиенту (ID берем из запроса - company_employee_list)
 */
'manager_id'?: number;

/**
 * Менеджер продаж (ID берем из запроса - company_employee_list)
 */
'manager_sale_id'?: number;
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
    return this.customerCreate$Response(params, context).pipe(
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

  /** Path part for operation `customerUpdate()` */
  static readonly CustomerUpdatePath = '/customer_update';

  /**
   * Обновление клиента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerUpdate$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * Наименование краткое
 */
'name'?: string;

/**
 * Наименование полное
 */
'name_full'?: string;

/**
 * Страна местонахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город местонахождения (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Юридический адрес
 */
'address_legal'?: string;

/**
 * Юридический адрес
 */
'address_post'?: string;

/**
 * ИНН
 */
'inn'?: string;

/**
 * КПП
 */
'kpp'?: string;

/**
 * ОГРН
 */
'ogrn'?: string;

/**
 * ОКПО
 */
'okpo'?: string;

/**
 * Контактное лицо
 */
'contact_fio'?: string;

/**
 * Номер телефона
 */
'phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Сайт
 */
'web'?: string;

/**
 * Руководитель ФИО
 */
'head_name'?: string;

/**
 * Должность руководителя (ID берем из запроса - system_head_position)
 */
'head_position_id'?: string;

/**
 * Документы (ссылка)
 */
'documents_path'?: string;

/**
 * Адрес для корреспонденции
 */
'document_address'?: string;

/**
 * Контактное лицо для корреспонденции
 */
'document_contact_fio'?: string;

/**
 * Телефон для корреспонденции
 */
'document_contact_phone'?: string;

/**
 * Адрес для доставки груза
 */
'delivery_address'?: string;

/**
 * Контактное лицо для доставки груза
 */
'delivery_contact_fio'?: string;

/**
 * Телефон
 */
'delivery_contact_phone'?: string;

/**
 * График работы склада
 */
'warehouse_schedule'?: string;

/**
 * Подпись ФИО
 */
'signature_fio'?: string;

/**
 * Подпись должность
 */
'signature_position'?: string;

/**
 * Подпись основание
 */
'signature_basis'?: string;

/**
 * Главный бухгалтер
 */
'accountant_fio'?: string;

/**
 * Телефон главного бухгалтера
 */
'accountant_phone'?: string;

/**
 * Наименование банка
 */
'bank_name'?: string;

/**
 * Расчетный счет
 */
'bank_payment_account'?: string;

/**
 * Корреспондентный счет
 */
'bank_correspondent_account'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Валюта счета (ID берем из запроса - /system_currency)
 */
'currency'?: string;

/**
 * Группа (ID берем из запроса - customer_group_list)
 */
'group_id'?: number;

/**
 * Источник (ID берем из запроса - system_contact_source)
 */
'source_id'?: number;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Статус (ID берем из запроса - system_customer_status)
 */
'status_id'?: number;

/**
 * Взаимодействие (ID берем из запроса - system_interaction)
 */
'interaction_id'?: number;

/**
 * Виды услуг (ID берем из запроса - system_services)
 */
'service_ids'?: Array<number>;

/**
 * Отрасль деятельности (ID берем из запроса - system_business)
 */
'business_id'?: number;

/**
 * Примечание
 */
'note'?: string;

/**
 * Менеджер по клиенту (ID берем из запроса - company_employee_list)
 */
'manager_id'?: number;

/**
 * Менеджер продаж (ID берем из запроса - company_employee_list)
 */
'manager_sale_id'?: number;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerUpdatePath, 'post');
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
   * Обновление клиента.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerUpdate(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * Наименование краткое
 */
'name'?: string;

/**
 * Наименование полное
 */
'name_full'?: string;

/**
 * Страна местонахождения (ID берем из запроса - direction_country)
 */
'country_id'?: number;

/**
 * Город местонахождения (ID берем из запроса - direction_city)
 */
'city_id'?: number;

/**
 * Юридический адрес
 */
'address_legal'?: string;

/**
 * Юридический адрес
 */
'address_post'?: string;

/**
 * ИНН
 */
'inn'?: string;

/**
 * КПП
 */
'kpp'?: string;

/**
 * ОГРН
 */
'ogrn'?: string;

/**
 * ОКПО
 */
'okpo'?: string;

/**
 * Контактное лицо
 */
'contact_fio'?: string;

/**
 * Номер телефона
 */
'phone'?: string;

/**
 * E-mail
 */
'email'?: string;

/**
 * Сайт
 */
'web'?: string;

/**
 * Руководитель ФИО
 */
'head_name'?: string;

/**
 * Должность руководителя (ID берем из запроса - system_head_position)
 */
'head_position_id'?: string;

/**
 * Документы (ссылка)
 */
'documents_path'?: string;

/**
 * Адрес для корреспонденции
 */
'document_address'?: string;

/**
 * Контактное лицо для корреспонденции
 */
'document_contact_fio'?: string;

/**
 * Телефон для корреспонденции
 */
'document_contact_phone'?: string;

/**
 * Адрес для доставки груза
 */
'delivery_address'?: string;

/**
 * Контактное лицо для доставки груза
 */
'delivery_contact_fio'?: string;

/**
 * Телефон
 */
'delivery_contact_phone'?: string;

/**
 * График работы склада
 */
'warehouse_schedule'?: string;

/**
 * Подпись ФИО
 */
'signature_fio'?: string;

/**
 * Подпись должность
 */
'signature_position'?: string;

/**
 * Подпись основание
 */
'signature_basis'?: string;

/**
 * Главный бухгалтер
 */
'accountant_fio'?: string;

/**
 * Телефон главного бухгалтера
 */
'accountant_phone'?: string;

/**
 * Наименование банка
 */
'bank_name'?: string;

/**
 * Расчетный счет
 */
'bank_payment_account'?: string;

/**
 * Корреспондентный счет
 */
'bank_correspondent_account'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Валюта счета (ID берем из запроса - /system_currency)
 */
'currency'?: string;

/**
 * Группа (ID берем из запроса - customer_group_list)
 */
'group_id'?: number;

/**
 * Источник (ID берем из запроса - system_contact_source)
 */
'source_id'?: number;

/**
 * Тип контрагента (ID берем из запроса - system_counterparty)
 */
'counterparty_id'?: number;

/**
 * Статус (ID берем из запроса - system_customer_status)
 */
'status_id'?: number;

/**
 * Взаимодействие (ID берем из запроса - system_interaction)
 */
'interaction_id'?: number;

/**
 * Виды услуг (ID берем из запроса - system_services)
 */
'service_ids'?: Array<number>;

/**
 * Отрасль деятельности (ID берем из запроса - system_business)
 */
'business_id'?: number;

/**
 * Примечание
 */
'note'?: string;

/**
 * Менеджер по клиенту (ID берем из запроса - company_employee_list)
 */
'manager_id'?: number;

/**
 * Менеджер продаж (ID берем из запроса - company_employee_list)
 */
'manager_sale_id'?: number;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.customerUpdate$Response(params, context).pipe(
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

  /** Path part for operation `customerDelete()` */
  static readonly CustomerDeletePath = '/customer_delete';

  /**
   * Удаление клиента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerDelete$Response(
    params?: {
      body?: {

/**
 * ID удаляемого клиента
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
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerDeletePath, 'post');
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
   * Удаление клиента.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customerDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerDelete(
    params?: {
      body?: {

/**
 * ID удаляемого клиента
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
    return this.customerDelete$Response(params, context).pipe(
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

  /** Path part for operation `customerFiles()` */
  static readonly CustomerFilesPath = '/customer_files';

  /**
   * Список файлов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerFiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerFiles$Response(
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
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerFilesPath, 'get');
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
   * To access the full response (for headers, for example), `customerFiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerFiles(
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
    return this.customerFiles$Response(params, context).pipe(
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

  /** Path part for operation `customerFileCreate()` */
  static readonly CustomerFileCreatePath = '/customer_file_create';

  /**
   * Файлы: добавление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerFileCreate()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  customerFileCreate$Response(
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
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerFileCreatePath, 'post');
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
   * To access the full response (for headers, for example), `customerFileCreate$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  customerFileCreate(
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
    return this.customerFileCreate$Response(params, context).pipe(
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

  /** Path part for operation `customerFileDelete()` */
  static readonly CustomerFileDeletePath = '/customer_file_delete';

  /**
   * Файлы: удаление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerFileDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerFileDelete$Response(
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
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerFileDeletePath, 'post');
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
   * To access the full response (for headers, for example), `customerFileDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerFileDelete(
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
    return this.customerFileDelete$Response(params, context).pipe(
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

  /** Path part for operation `customerGroupList()` */
  static readonly CustomerGroupListPath = '/customer_group_list';

  /**
   * Группы: список.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerGroupList()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerGroupList$Response(
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
  ): Observable<StrictHttpResponse<{

/**
 * Позиции
 */
'items'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Количество клиентов
 */
'count_customer'?: number;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;

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
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerGroupListPath, 'get');
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
         * Позиции
         */
        'items'?: Array<{
        
        /**
         * ID
         */
        'id'?: number;
        
        /**
         * Наименование
         */
        'name'?: string;
        
        /**
         * Количество клиентов
         */
        'count_customer'?: number;
        
        /**
         * Порядок (меньше - выше)
         */
        'num'?: number;
        
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
   * Группы: список.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customerGroupList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerGroupList(
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
  ): Observable<{

/**
 * Позиции
 */
'items'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Количество клиентов
 */
'count_customer'?: number;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;

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
    return this.customerGroupList$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Позиции
 */
'items'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Количество клиентов
 */
'count_customer'?: number;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;

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
}>): {

/**
 * Позиции
 */
'items'?: Array<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Количество клиентов
 */
'count_customer'?: number;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;

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
} => r.body)
    );
  }

  /** Path part for operation `customerGroupInfo()` */
  static readonly CustomerGroupInfoPath = '/customer_group_info';

  /**
   * Группы: данные.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerGroupInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerGroupInfo$Response(
    params?: {

    /**
     * ID группы
     */
      id?: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Количество клиентов
 */
'count_customer'?: number;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerGroupInfoPath, 'get');
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
        'id'?: number;
        
        /**
         * Наименование
         */
        'name'?: string;
        
        /**
         * Количество клиентов
         */
        'count_customer'?: number;
        
        /**
         * Порядок (меньше - выше)
         */
        'num'?: number;
        
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
   * Группы: данные.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customerGroupInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerGroupInfo(
    params?: {

    /**
     * ID группы
     */
      id?: number;
    },
    context?: HttpContext
  ): Observable<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Количество клиентов
 */
'count_customer'?: number;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}> {
    return this.customerGroupInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID
 */
'id'?: number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Количество клиентов
 */
'count_customer'?: number;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;

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
'id'?: number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Количество клиентов
 */
'count_customer'?: number;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;

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

  /** Path part for operation `customerGroupCreate()` */
  static readonly CustomerGroupCreatePath = '/customer_group_create';

  /**
   * Группы: добавление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerGroupCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerGroupCreate$Response(
    params?: {
      body?: {

/**
 * Наименование
 */
'name': string;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;
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
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerGroupCreatePath, 'post');
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
   * Группы: добавление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customerGroupCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerGroupCreate(
    params?: {
      body?: {

/**
 * Наименование
 */
'name': string;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;
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
    return this.customerGroupCreate$Response(params, context).pipe(
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

  /** Path part for operation `customerGroupUpdate()` */
  static readonly CustomerGroupUpdatePath = '/customer_group_update';

  /**
   * Группы: обновление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerGroupUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerGroupUpdate$Response(
    params?: {
      body?: {

/**
 * ID изменяемого подразделения
 */
'id': number;

/**
 * Наименование
 */
'name': string;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerGroupUpdatePath, 'post');
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
   * Группы: обновление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customerGroupUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerGroupUpdate(
    params?: {
      body?: {

/**
 * ID изменяемого подразделения
 */
'id': number;

/**
 * Наименование
 */
'name': string;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.customerGroupUpdate$Response(params, context).pipe(
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

  /** Path part for operation `customerGroupDelete()` */
  static readonly CustomerGroupDeletePath = '/customer_group_delete';

  /**
   * Группы: удаление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerGroupDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerGroupDelete$Response(
    params?: {
      body?: {

/**
 * ID удаляемой группы
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
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerGroupDeletePath, 'post');
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
   * Группы: удаление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customerGroupDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerGroupDelete(
    params?: {
      body?: {

/**
 * ID удаляемой группы
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
    return this.customerGroupDelete$Response(params, context).pipe(
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

  /** Path part for operation `customerExport()` */
  static readonly CustomerExportPath = '/customer_export';

  /**
   * Экспорт клиентов в XLSX.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerExport()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerExport$Response(
    params?: {

    /**
     * Поиск клиента по названию...
     */
      name?: string;

    /**
     * Страна (ID берем из запроса - direction_country)
     */
      country_id?: number;

    /**
     * Группа (ID берем из запроса - customer_group_list)
     */
      group_id?: number;

    /**
     * ИНН
     */
      inn?: string;

    /**
     * Контактное лицо
     */
      contact_fio?: string;

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
 * Наименование
 */
'name'?: string;

/**
 * Base64 строка файла
 */
'data'?: string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerExportPath, 'get');
    if (params) {
      rb.query('name', params.name, {});
      rb.query('country_id', params.country_id, {});
      rb.query('group_id', params.group_id, {});
      rb.query('inn', params.inn, {});
      rb.query('contact_fio', params.contact_fio, {});
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
   * Экспорт клиентов в XLSX.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customerExport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerExport(
    params?: {

    /**
     * Поиск клиента по названию...
     */
      name?: string;

    /**
     * Страна (ID берем из запроса - direction_country)
     */
      country_id?: number;

    /**
     * Группа (ID берем из запроса - customer_group_list)
     */
      group_id?: number;

    /**
     * ИНН
     */
      inn?: string;

    /**
     * Контактное лицо
     */
      contact_fio?: string;

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
 * Наименование
 */
'name'?: string;

/**
 * Base64 строка файла
 */
'data'?: string;
}> {
    return this.customerExport$Response(params, context).pipe(
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

  /** Path part for operation `customerImport()` */
  static readonly CustomerImportPath = '/customer_import';

  /**
   * Импорт контрагентов в XLSX.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerImport()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerImport$Response(
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
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerImportPath, 'post');
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
   * To access the full response (for headers, for example), `customerImport$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerImport(
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
    return this.customerImport$Response(params, context).pipe(
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

}
