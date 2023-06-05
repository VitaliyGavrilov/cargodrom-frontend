/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';



/**
 * Работа с клиентами
 */
@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation customerList
   */
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
  customerList$Response(params?: {

    /**
     * Поиск клиента по названию...
     */
    name?: string;

    /**
     * Страна (ID берем из запроса - direction_country)
     */
    country_id?: number;

    /**
     * ИНН
     */
    inn?: string;

    /**
     * Контактное лицо
     */
    contact_fio?: string;

    /**
     * Группа (ID берем из запроса - customer_group_list)
     */
    group_id?: number;

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
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<{

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
 * Должность руководителя (ID берем из запроса - customer_head_position)
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
 * Валюта счета
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
 * Тип клиента (ID берем из запроса - system_counterparty)
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
 * Заказы
 */
'order_data'?: {

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
};
}>;

/**
 * Всего позиций
 */
'total'?: number;

/**
 * Параметры таблицы
 */
'listing'?: Array<{

/**
 * Выводимая переменая
 */
'field'?: string;

/**
 * Наименование столбца
 */
'name'?: string;

/**
 * Ширина столбца
 */
'width'?: string;

/**
 * Разрешение сортировки
 */
'sort'?: boolean;

/**
 * Вложенные столбцы
 */
'columns'?: Array<{

/**
 * Переменая
 */
'field'?: string;

/**
 * Наименование столбца
 */
'name'?: string;

/**
 * Ширина столбца
 */
'width'?: string;

/**
 * Разрешение сортировки
 */
'sort'?: boolean;
}>;
}>;

/**
 * Параметры поиска
 */
'search'?: Array<{

/**
 * Поиск в заголовке
 */
'header'?: Array<{

/**
 * Переменая
 */
'field'?: string;

/**
 * Тип запроса
 */
'type'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Поиск основной
 */
'main'?: Array<{

/**
 * Переменая
 */
'field'?: string;

/**
 * Тип запроса
 */
'type'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Поиск расширенный
 */
'additional'?: Array<{

/**
 * Переменая
 */
'field'?: string;

/**
 * Тип запроса
 */
'type'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;
}>;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerListPath, 'get');
    if (params) {
      rb.query('name', params.name, {});
      rb.query('country_id', params.country_id, {});
      rb.query('inn', params.inn, {});
      rb.query('contact_fio', params.contact_fio, {});
      rb.query('group_id', params.group_id, {});
      rb.query('start', params.start, {});
      rb.query('count', params.count, {});
      rb.query('sort', params.sort, {"style":"form","explode":false});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<{
        
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
         * Должность руководителя (ID берем из запроса - customer_head_position)
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
         * Валюта счета
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
         * Тип клиента (ID берем из запроса - system_counterparty)
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
         * Заказы
         */
        'order_data'?: {
        
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
        };
        }>;
        
        /**
         * Всего позиций
         */
        'total'?: number;
        
        /**
         * Параметры таблицы
         */
        'listing'?: Array<{
        
        /**
         * Выводимая переменая
         */
        'field'?: string;
        
        /**
         * Наименование столбца
         */
        'name'?: string;
        
        /**
         * Ширина столбца
         */
        'width'?: string;
        
        /**
         * Разрешение сортировки
         */
        'sort'?: boolean;
        
        /**
         * Вложенные столбцы
         */
        'columns'?: Array<{
        
        /**
         * Переменая
         */
        'field'?: string;
        
        /**
         * Наименование столбца
         */
        'name'?: string;
        
        /**
         * Ширина столбца
         */
        'width'?: string;
        
        /**
         * Разрешение сортировки
         */
        'sort'?: boolean;
        }>;
        }>;
        
        /**
         * Параметры поиска
         */
        'search'?: Array<{
        
        /**
         * Поиск в заголовке
         */
        'header'?: Array<{
        
        /**
         * Переменая
         */
        'field'?: string;
        
        /**
         * Тип запроса
         */
        'type'?: string;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>;
        
        /**
         * Поиск основной
         */
        'main'?: Array<{
        
        /**
         * Переменая
         */
        'field'?: string;
        
        /**
         * Тип запроса
         */
        'type'?: string;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>;
        
        /**
         * Поиск расширенный
         */
        'additional'?: Array<{
        
        /**
         * Переменая
         */
        'field'?: string;
        
        /**
         * Тип запроса
         */
        'type'?: string;
        
        /**
         * Наименование
         */
        'name'?: string;
        }>;
        }>;
        }>>;
      })
    );
  }

  /**
   * Список клиентов.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerList(params?: {

    /**
     * Поиск клиента по названию...
     */
    name?: string;

    /**
     * Страна (ID берем из запроса - direction_country)
     */
    country_id?: number;

    /**
     * ИНН
     */
    inn?: string;

    /**
     * Контактное лицо
     */
    contact_fio?: string;

    /**
     * Группа (ID берем из запроса - customer_group_list)
     */
    group_id?: number;

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
    context?: HttpContext
  }
): Observable<Array<{

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
 * Должность руководителя (ID берем из запроса - customer_head_position)
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
 * Валюта счета
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
 * Тип клиента (ID берем из запроса - system_counterparty)
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
 * Заказы
 */
'order_data'?: {

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
};
}>;

/**
 * Всего позиций
 */
'total'?: number;

/**
 * Параметры таблицы
 */
'listing'?: Array<{

/**
 * Выводимая переменая
 */
'field'?: string;

/**
 * Наименование столбца
 */
'name'?: string;

/**
 * Ширина столбца
 */
'width'?: string;

/**
 * Разрешение сортировки
 */
'sort'?: boolean;

/**
 * Вложенные столбцы
 */
'columns'?: Array<{

/**
 * Переменая
 */
'field'?: string;

/**
 * Наименование столбца
 */
'name'?: string;

/**
 * Ширина столбца
 */
'width'?: string;

/**
 * Разрешение сортировки
 */
'sort'?: boolean;
}>;
}>;

/**
 * Параметры поиска
 */
'search'?: Array<{

/**
 * Поиск в заголовке
 */
'header'?: Array<{

/**
 * Переменая
 */
'field'?: string;

/**
 * Тип запроса
 */
'type'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Поиск основной
 */
'main'?: Array<{

/**
 * Переменая
 */
'field'?: string;

/**
 * Тип запроса
 */
'type'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Поиск расширенный
 */
'additional'?: Array<{

/**
 * Переменая
 */
'field'?: string;

/**
 * Тип запроса
 */
'type'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;
}>;
}>> {

    return this.customerList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<{

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
 * Должность руководителя (ID берем из запроса - customer_head_position)
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
 * Валюта счета
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
 * Тип клиента (ID берем из запроса - system_counterparty)
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
 * Заказы
 */
'order_data'?: {

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
};
}>;

/**
 * Всего позиций
 */
'total'?: number;

/**
 * Параметры таблицы
 */
'listing'?: Array<{

/**
 * Выводимая переменая
 */
'field'?: string;

/**
 * Наименование столбца
 */
'name'?: string;

/**
 * Ширина столбца
 */
'width'?: string;

/**
 * Разрешение сортировки
 */
'sort'?: boolean;

/**
 * Вложенные столбцы
 */
'columns'?: Array<{

/**
 * Переменая
 */
'field'?: string;

/**
 * Наименование столбца
 */
'name'?: string;

/**
 * Ширина столбца
 */
'width'?: string;

/**
 * Разрешение сортировки
 */
'sort'?: boolean;
}>;
}>;

/**
 * Параметры поиска
 */
'search'?: Array<{

/**
 * Поиск в заголовке
 */
'header'?: Array<{

/**
 * Переменая
 */
'field'?: string;

/**
 * Тип запроса
 */
'type'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Поиск основной
 */
'main'?: Array<{

/**
 * Переменая
 */
'field'?: string;

/**
 * Тип запроса
 */
'type'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Поиск расширенный
 */
'additional'?: Array<{

/**
 * Переменая
 */
'field'?: string;

/**
 * Тип запроса
 */
'type'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;
}>;
}>>) => r.body as Array<{

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
 * Должность руководителя (ID берем из запроса - customer_head_position)
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
 * Валюта счета
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
 * Тип клиента (ID берем из запроса - system_counterparty)
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
 * Заказы
 */
'order_data'?: {

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
};
}>;

/**
 * Всего позиций
 */
'total'?: number;

/**
 * Параметры таблицы
 */
'listing'?: Array<{

/**
 * Выводимая переменая
 */
'field'?: string;

/**
 * Наименование столбца
 */
'name'?: string;

/**
 * Ширина столбца
 */
'width'?: string;

/**
 * Разрешение сортировки
 */
'sort'?: boolean;

/**
 * Вложенные столбцы
 */
'columns'?: Array<{

/**
 * Переменая
 */
'field'?: string;

/**
 * Наименование столбца
 */
'name'?: string;

/**
 * Ширина столбца
 */
'width'?: string;

/**
 * Разрешение сортировки
 */
'sort'?: boolean;
}>;
}>;

/**
 * Параметры поиска
 */
'search'?: Array<{

/**
 * Поиск в заголовке
 */
'header'?: Array<{

/**
 * Переменая
 */
'field'?: string;

/**
 * Тип запроса
 */
'type'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Поиск основной
 */
'main'?: Array<{

/**
 * Переменая
 */
'field'?: string;

/**
 * Тип запроса
 */
'type'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;

/**
 * Поиск расширенный
 */
'additional'?: Array<{

/**
 * Переменая
 */
'field'?: string;

/**
 * Тип запроса
 */
'type'?: string;

/**
 * Наименование
 */
'name'?: string;
}>;
}>;
}>)
    );
  }

  /**
   * Path part for operation customerInfo
   */
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
  customerInfo$Response(params: {

    /**
     * ID клиента
     */
    id: number;
    context?: HttpContext
  }
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
 * Должность руководителя (ID берем из запроса - customer_head_position)
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
 * Валюта счета
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
 * Тип клиента (ID берем из запроса - system_counterparty)
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
 * Заказы
 */
'order_data'?: {

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
};

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

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
         * Должность руководителя (ID берем из запроса - customer_head_position)
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
         * Валюта счета
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
         * Тип клиента (ID берем из запроса - system_counterparty)
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
         * Заказы
         */
        'order_data'?: {
        
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
        };
        
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerInfo(params: {

    /**
     * ID клиента
     */
    id: number;
    context?: HttpContext
  }
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
 * Должность руководителя (ID берем из запроса - customer_head_position)
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
 * Валюта счета
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
 * Тип клиента (ID берем из запроса - system_counterparty)
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
 * Заказы
 */
'order_data'?: {

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
};

/**
 * Документы (файлы)
 */
'documents_file'?: {
};
}> {

    return this.customerInfo$Response(params).pipe(
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
 * Должность руководителя (ID берем из запроса - customer_head_position)
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
 * Валюта счета
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
 * Тип клиента (ID берем из запроса - system_counterparty)
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
 * Заказы
 */
'order_data'?: {

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
};

/**
 * Документы (файлы)
 */
'documents_file'?: {
};
}>) => r.body as {

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
 * Должность руководителя (ID берем из запроса - customer_head_position)
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
 * Валюта счета
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
 * Тип клиента (ID берем из запроса - system_counterparty)
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
 * Заказы
 */
'order_data'?: {

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
};

/**
 * Документы (файлы)
 */
'documents_file'?: {
};
})
    );
  }

  /**
   * Path part for operation customerCreate
   */
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
  customerCreate$Response(params?: {
    context?: HttpContext
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
 * Должность руководителя (ID берем из запроса - customer_head_position)
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
 * Валюта счета
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
 * Тип клиента (ID берем из запроса - system_counterparty)
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
  }
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

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerCreate(params?: {
    context?: HttpContext
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
 * Должность руководителя (ID берем из запроса - customer_head_position)
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
 * Валюта счета
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
 * Тип клиента (ID берем из запроса - system_counterparty)
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
  }
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

    return this.customerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
}>) => r.body as {

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
})
    );
  }

  /**
   * Path part for operation customerUpdate
   */
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
  customerUpdate$Response(params?: {
    context?: HttpContext
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
 * Должность руководителя (ID берем из запроса - customer_head_position)
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
 * Валюта счета
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
 * Тип клиента (ID берем из запроса - system_counterparty)
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
  }
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

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerUpdate(params?: {
    context?: HttpContext
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
 * Должность руководителя (ID берем из запроса - customer_head_position)
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
 * Валюта счета
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
 * Тип клиента (ID берем из запроса - system_counterparty)
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
  }
): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {

    return this.customerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>) => r.body as {

/**
 * Статус выполнения
 */
'result': 'OK';
})
    );
  }

  /**
   * Path part for operation customerDelete
   */
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
  customerDelete$Response(params?: {
    context?: HttpContext
    body?: {

/**
 * ID удаляемого клиента
 */
'id': number;
}
  }
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

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerDelete(params?: {
    context?: HttpContext
    body?: {

/**
 * ID удаляемого клиента
 */
'id': number;
}
  }
): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {

    return this.customerDelete$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>) => r.body as {

/**
 * Статус выполнения
 */
'result': 'OK';
})
    );
  }

  /**
   * Path part for operation customerFiles
   */
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
  customerFiles$Response(params: {

    /**
     * ID элемента
     */
    item_id: number;

    /**
     * Переменная формы
     */
    var?: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{

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

    const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerFilesPath, 'get');
    if (params) {
      rb.query('item_id', params.item_id, {});
      rb.query('var', params.var, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
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
        }>;
      })
    );
  }

  /**
   * Список файлов.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerFiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerFiles(params: {

    /**
     * ID элемента
     */
    item_id: number;

    /**
     * Переменная формы
     */
    var?: string;
    context?: HttpContext
  }
): Observable<{

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
}> {

    return this.customerFiles$Response(params).pipe(
      map((r: StrictHttpResponse<{

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
}>) => r.body as {

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
})
    );
  }

  /**
   * Path part for operation customerFileCreate
   */
  static readonly CustomerFileCreatePath = '/customer_file_create';

  /**
   * Файлы: добавление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerFileCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerFileCreate$Response(params?: {
    context?: HttpContext
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
'file': Blob;
}
  }
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
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerFileCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerFileCreate(params?: {
    context?: HttpContext
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
'file': Blob;
}
  }
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

    return this.customerFileCreate$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
}>) => r.body as {

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
})
    );
  }

  /**
   * Path part for operation customerFileDelete
   */
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
  customerFileDelete$Response(params?: {
    context?: HttpContext
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
  }
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

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerFileDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerFileDelete(params?: {
    context?: HttpContext
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
  }
): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {

    return this.customerFileDelete$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>) => r.body as {

/**
 * Статус выполнения
 */
'result': 'OK';
})
    );
  }

  /**
   * Path part for operation customerGroupList
   */
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
  customerGroupList$Response(params?: {

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
    context?: HttpContext
  }
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

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerGroupList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerGroupList(params?: {

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
    context?: HttpContext
  }
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

    return this.customerGroupList$Response(params).pipe(
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
}>) => r.body as {

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
})
    );
  }

  /**
   * Path part for operation customerGroupInfo
   */
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
  customerGroupInfo$Response(params?: {

    /**
     * ID группы
     */
    id?: number;
    context?: HttpContext
  }
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

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerGroupInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerGroupInfo(params?: {

    /**
     * ID группы
     */
    id?: number;
    context?: HttpContext
  }
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

    return this.customerGroupInfo$Response(params).pipe(
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
}>) => r.body as {

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
})
    );
  }

  /**
   * Path part for operation customerGroupCreate
   */
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
  customerGroupCreate$Response(params?: {
    context?: HttpContext
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
  }
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

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerGroupCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerGroupCreate(params?: {
    context?: HttpContext
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
  }
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

    return this.customerGroupCreate$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
}>) => r.body as {

/**
 * ID созданной записи
 */
'id': number;

/**
 * Статус выполнения
 */
'result': 'OK';
})
    );
  }

  /**
   * Path part for operation customerGroupUpdate
   */
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
  customerGroupUpdate$Response(params?: {
    context?: HttpContext
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
  }
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

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerGroupUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerGroupUpdate(params?: {
    context?: HttpContext
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
  }
): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {

    return this.customerGroupUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>) => r.body as {

/**
 * Статус выполнения
 */
'result': 'OK';
})
    );
  }

  /**
   * Path part for operation customerGroupDelete
   */
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
  customerGroupDelete$Response(params?: {
    context?: HttpContext
    body?: {

/**
 * ID удаляемой группы
 */
'id': number;
}
  }
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

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `customerGroupDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customerGroupDelete(params?: {
    context?: HttpContext
    body?: {

/**
 * ID удаляемой группы
 */
'id': number;
}
  }
): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {

    return this.customerGroupDelete$Response(params).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>) => r.body as {

/**
 * Статус выполнения
 */
'result': 'OK';
})
    );
  }

}
