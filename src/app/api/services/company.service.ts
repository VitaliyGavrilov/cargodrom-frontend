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
 * Работа с компаниями
 */
@Injectable({ providedIn: 'root' })
export class CompanyService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `companyList()` */
  static readonly CompanyListPath = '/company_list';

  /**
   * Компания: список.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyList()` instead.
   *
   * This method doesn't expect any request body.
   */
  companyList$Response(
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
'id': number;

/**
 * Наименование полное
 */
'name'?: string;

/**
 * Наименование сокращенное
 */
'name_short'?: string;

/**
 * Юридический адрес
 */
'jur_address'?: string;

/**
 * Почтовый адрес
 */
'post_address'?: string;

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
 * Номер телефона
 */
'phone'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Вебсайт
 */
'website'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Ф.И.О.
 */
'responsible_person_id'?: number;

/**
 * Ф.И.О.
 */
'responsible_person_fio'?: string;

/**
 * Должность
 */
'responsible_person_position'?: string;

/**
 * Основание
 */
'responsible_person_base'?: string;

/**
 * Ф.И.О.
 */
'chief_accountant_id'?: number;

/**
 * Наименование
 */
'bank_name'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Расчетный счет
 */
'bank_rs'?: string;

/**
 * Корреспондентский счет
 */
'bank_ks'?: string;

/**
 * Валюта счета
 */
'bank_currency'?: string;

/**
 * Full name
 */
'noresident_name'?: string;

/**
 * Address
 */
'noresident_address'?: string;

/**
 * Phone / fax
 */
'noresident_phone'?: string;

/**
 * Email
 */
'noresident_email'?: string;

/**
 * Website
 */
'noresident_website'?: string;

/**
 * Skype
 */
'noresident_skype'?: string;

/**
 * Full name
 */
'noresident_signatory_id'?: number;

/**
 * Position
 */
'noresident_signatory_position'?: string;

/**
 * Bank name
 */
'noresident_bank_name'?: string;

/**
 * Bank address
 */
'noresident_bank_address'?: string;

/**
 * Account Number
 */
'noresident_bank_rs'?: string;

/**
 * Account currency
 */
'noresident_bank_currency'?: string;

/**
 * Account name
 */
'noresident_bank_rs_name'?: string;

/**
 * Swift code
 */
'noresident_bank_swift'?: string;

/**
 * Intermediary bank
 */
'noresident_bank_im'?: string;

/**
 * Система налогообложения (ID берем из запроса - tax_system)
 */
'tax_system'?: number;

/**
 * Основная валюта счетов
 */
'base_currency'?: string;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Главная фирма
 */
'general'?: boolean;

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
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyListPath, 'get');
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
        'id': number;
        
        /**
         * Наименование полное
         */
        'name'?: string;
        
        /**
         * Наименование сокращенное
         */
        'name_short'?: string;
        
        /**
         * Юридический адрес
         */
        'jur_address'?: string;
        
        /**
         * Почтовый адрес
         */
        'post_address'?: string;
        
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
         * Номер телефона
         */
        'phone'?: string;
        
        /**
         * Email
         */
        'email'?: string;
        
        /**
         * Вебсайт
         */
        'website'?: string;
        
        /**
         * Skype
         */
        'skype'?: string;
        
        /**
         * Ф.И.О.
         */
        'responsible_person_id'?: number;
        
        /**
         * Ф.И.О.
         */
        'responsible_person_fio'?: string;
        
        /**
         * Должность
         */
        'responsible_person_position'?: string;
        
        /**
         * Основание
         */
        'responsible_person_base'?: string;
        
        /**
         * Ф.И.О.
         */
        'chief_accountant_id'?: number;
        
        /**
         * Наименование
         */
        'bank_name'?: string;
        
        /**
         * БИК
         */
        'bank_bik'?: string;
        
        /**
         * КПП
         */
        'bank_kpp'?: string;
        
        /**
         * Расчетный счет
         */
        'bank_rs'?: string;
        
        /**
         * Корреспондентский счет
         */
        'bank_ks'?: string;
        
        /**
         * Валюта счета
         */
        'bank_currency'?: string;
        
        /**
         * Full name
         */
        'noresident_name'?: string;
        
        /**
         * Address
         */
        'noresident_address'?: string;
        
        /**
         * Phone / fax
         */
        'noresident_phone'?: string;
        
        /**
         * Email
         */
        'noresident_email'?: string;
        
        /**
         * Website
         */
        'noresident_website'?: string;
        
        /**
         * Skype
         */
        'noresident_skype'?: string;
        
        /**
         * Full name
         */
        'noresident_signatory_id'?: number;
        
        /**
         * Position
         */
        'noresident_signatory_position'?: string;
        
        /**
         * Bank name
         */
        'noresident_bank_name'?: string;
        
        /**
         * Bank address
         */
        'noresident_bank_address'?: string;
        
        /**
         * Account Number
         */
        'noresident_bank_rs'?: string;
        
        /**
         * Account currency
         */
        'noresident_bank_currency'?: string;
        
        /**
         * Account name
         */
        'noresident_bank_rs_name'?: string;
        
        /**
         * Swift code
         */
        'noresident_bank_swift'?: string;
        
        /**
         * Intermediary bank
         */
        'noresident_bank_im'?: string;
        
        /**
         * Система налогообложения (ID берем из запроса - tax_system)
         */
        'tax_system'?: number;
        
        /**
         * Основная валюта счетов
         */
        'base_currency'?: string;
        
        /**
         * Порядок для сортировки (меньше - выше)
         */
        'num'?: number;
        
        /**
         * Главная фирма
         */
        'general'?: boolean;
        
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
   * Компания: список.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  companyList(
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
'id': number;

/**
 * Наименование полное
 */
'name'?: string;

/**
 * Наименование сокращенное
 */
'name_short'?: string;

/**
 * Юридический адрес
 */
'jur_address'?: string;

/**
 * Почтовый адрес
 */
'post_address'?: string;

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
 * Номер телефона
 */
'phone'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Вебсайт
 */
'website'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Ф.И.О.
 */
'responsible_person_id'?: number;

/**
 * Ф.И.О.
 */
'responsible_person_fio'?: string;

/**
 * Должность
 */
'responsible_person_position'?: string;

/**
 * Основание
 */
'responsible_person_base'?: string;

/**
 * Ф.И.О.
 */
'chief_accountant_id'?: number;

/**
 * Наименование
 */
'bank_name'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Расчетный счет
 */
'bank_rs'?: string;

/**
 * Корреспондентский счет
 */
'bank_ks'?: string;

/**
 * Валюта счета
 */
'bank_currency'?: string;

/**
 * Full name
 */
'noresident_name'?: string;

/**
 * Address
 */
'noresident_address'?: string;

/**
 * Phone / fax
 */
'noresident_phone'?: string;

/**
 * Email
 */
'noresident_email'?: string;

/**
 * Website
 */
'noresident_website'?: string;

/**
 * Skype
 */
'noresident_skype'?: string;

/**
 * Full name
 */
'noresident_signatory_id'?: number;

/**
 * Position
 */
'noresident_signatory_position'?: string;

/**
 * Bank name
 */
'noresident_bank_name'?: string;

/**
 * Bank address
 */
'noresident_bank_address'?: string;

/**
 * Account Number
 */
'noresident_bank_rs'?: string;

/**
 * Account currency
 */
'noresident_bank_currency'?: string;

/**
 * Account name
 */
'noresident_bank_rs_name'?: string;

/**
 * Swift code
 */
'noresident_bank_swift'?: string;

/**
 * Intermediary bank
 */
'noresident_bank_im'?: string;

/**
 * Система налогообложения (ID берем из запроса - tax_system)
 */
'tax_system'?: number;

/**
 * Основная валюта счетов
 */
'base_currency'?: string;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Главная фирма
 */
'general'?: boolean;

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
    return this.companyList$Response(params, context).pipe(
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
 * Наименование полное
 */
'name'?: string;

/**
 * Наименование сокращенное
 */
'name_short'?: string;

/**
 * Юридический адрес
 */
'jur_address'?: string;

/**
 * Почтовый адрес
 */
'post_address'?: string;

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
 * Номер телефона
 */
'phone'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Вебсайт
 */
'website'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Ф.И.О.
 */
'responsible_person_id'?: number;

/**
 * Ф.И.О.
 */
'responsible_person_fio'?: string;

/**
 * Должность
 */
'responsible_person_position'?: string;

/**
 * Основание
 */
'responsible_person_base'?: string;

/**
 * Ф.И.О.
 */
'chief_accountant_id'?: number;

/**
 * Наименование
 */
'bank_name'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Расчетный счет
 */
'bank_rs'?: string;

/**
 * Корреспондентский счет
 */
'bank_ks'?: string;

/**
 * Валюта счета
 */
'bank_currency'?: string;

/**
 * Full name
 */
'noresident_name'?: string;

/**
 * Address
 */
'noresident_address'?: string;

/**
 * Phone / fax
 */
'noresident_phone'?: string;

/**
 * Email
 */
'noresident_email'?: string;

/**
 * Website
 */
'noresident_website'?: string;

/**
 * Skype
 */
'noresident_skype'?: string;

/**
 * Full name
 */
'noresident_signatory_id'?: number;

/**
 * Position
 */
'noresident_signatory_position'?: string;

/**
 * Bank name
 */
'noresident_bank_name'?: string;

/**
 * Bank address
 */
'noresident_bank_address'?: string;

/**
 * Account Number
 */
'noresident_bank_rs'?: string;

/**
 * Account currency
 */
'noresident_bank_currency'?: string;

/**
 * Account name
 */
'noresident_bank_rs_name'?: string;

/**
 * Swift code
 */
'noresident_bank_swift'?: string;

/**
 * Intermediary bank
 */
'noresident_bank_im'?: string;

/**
 * Система налогообложения (ID берем из запроса - tax_system)
 */
'tax_system'?: number;

/**
 * Основная валюта счетов
 */
'base_currency'?: string;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Главная фирма
 */
'general'?: boolean;

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
'id': number;

/**
 * Наименование полное
 */
'name'?: string;

/**
 * Наименование сокращенное
 */
'name_short'?: string;

/**
 * Юридический адрес
 */
'jur_address'?: string;

/**
 * Почтовый адрес
 */
'post_address'?: string;

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
 * Номер телефона
 */
'phone'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Вебсайт
 */
'website'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Ф.И.О.
 */
'responsible_person_id'?: number;

/**
 * Ф.И.О.
 */
'responsible_person_fio'?: string;

/**
 * Должность
 */
'responsible_person_position'?: string;

/**
 * Основание
 */
'responsible_person_base'?: string;

/**
 * Ф.И.О.
 */
'chief_accountant_id'?: number;

/**
 * Наименование
 */
'bank_name'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Расчетный счет
 */
'bank_rs'?: string;

/**
 * Корреспондентский счет
 */
'bank_ks'?: string;

/**
 * Валюта счета
 */
'bank_currency'?: string;

/**
 * Full name
 */
'noresident_name'?: string;

/**
 * Address
 */
'noresident_address'?: string;

/**
 * Phone / fax
 */
'noresident_phone'?: string;

/**
 * Email
 */
'noresident_email'?: string;

/**
 * Website
 */
'noresident_website'?: string;

/**
 * Skype
 */
'noresident_skype'?: string;

/**
 * Full name
 */
'noresident_signatory_id'?: number;

/**
 * Position
 */
'noresident_signatory_position'?: string;

/**
 * Bank name
 */
'noresident_bank_name'?: string;

/**
 * Bank address
 */
'noresident_bank_address'?: string;

/**
 * Account Number
 */
'noresident_bank_rs'?: string;

/**
 * Account currency
 */
'noresident_bank_currency'?: string;

/**
 * Account name
 */
'noresident_bank_rs_name'?: string;

/**
 * Swift code
 */
'noresident_bank_swift'?: string;

/**
 * Intermediary bank
 */
'noresident_bank_im'?: string;

/**
 * Система налогообложения (ID берем из запроса - tax_system)
 */
'tax_system'?: number;

/**
 * Основная валюта счетов
 */
'base_currency'?: string;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Главная фирма
 */
'general'?: boolean;

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

  /** Path part for operation `companyInfo()` */
  static readonly CompanyInfoPath = '/company_info';

  /**
   * Компания: данные.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  companyInfo$Response(
    params: {

    /**
     * ID компании
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
 * Наименование полное
 */
'name'?: string;

/**
 * Наименование сокращенное
 */
'name_short'?: string;

/**
 * Юридический адрес
 */
'jur_address'?: string;

/**
 * Почтовый адрес
 */
'post_address'?: string;

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
 * Номер телефона
 */
'phone'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Вебсайт
 */
'website'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Ф.И.О.
 */
'responsible_person_id'?: number;

/**
 * Ф.И.О.
 */
'responsible_person_fio'?: string;

/**
 * Должность
 */
'responsible_person_position'?: string;

/**
 * Основание
 */
'responsible_person_base'?: string;

/**
 * Ф.И.О.
 */
'chief_accountant_id'?: number;

/**
 * Наименование
 */
'bank_name'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Расчетный счет
 */
'bank_rs'?: string;

/**
 * Корреспондентский счет
 */
'bank_ks'?: string;

/**
 * Валюта счета
 */
'bank_currency'?: string;

/**
 * Full name
 */
'noresident_name'?: string;

/**
 * Address
 */
'noresident_address'?: string;

/**
 * Phone / fax
 */
'noresident_phone'?: string;

/**
 * Email
 */
'noresident_email'?: string;

/**
 * Website
 */
'noresident_website'?: string;

/**
 * Skype
 */
'noresident_skype'?: string;

/**
 * Full name
 */
'noresident_signatory_id'?: number;

/**
 * Position
 */
'noresident_signatory_position'?: string;

/**
 * Bank name
 */
'noresident_bank_name'?: string;

/**
 * Bank address
 */
'noresident_bank_address'?: string;

/**
 * Account Number
 */
'noresident_bank_rs'?: string;

/**
 * Account currency
 */
'noresident_bank_currency'?: string;

/**
 * Account name
 */
'noresident_bank_rs_name'?: string;

/**
 * Swift code
 */
'noresident_bank_swift'?: string;

/**
 * Intermediary bank
 */
'noresident_bank_im'?: string;

/**
 * Система налогообложения (ID берем из запроса - tax_system)
 */
'tax_system'?: number;

/**
 * Основная валюта счетов
 */
'base_currency'?: string;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Главная фирма
 */
'general'?: boolean;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyInfoPath, 'get');
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
         * Наименование полное
         */
        'name'?: string;
        
        /**
         * Наименование сокращенное
         */
        'name_short'?: string;
        
        /**
         * Юридический адрес
         */
        'jur_address'?: string;
        
        /**
         * Почтовый адрес
         */
        'post_address'?: string;
        
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
         * Номер телефона
         */
        'phone'?: string;
        
        /**
         * Email
         */
        'email'?: string;
        
        /**
         * Вебсайт
         */
        'website'?: string;
        
        /**
         * Skype
         */
        'skype'?: string;
        
        /**
         * Ф.И.О.
         */
        'responsible_person_id'?: number;
        
        /**
         * Ф.И.О.
         */
        'responsible_person_fio'?: string;
        
        /**
         * Должность
         */
        'responsible_person_position'?: string;
        
        /**
         * Основание
         */
        'responsible_person_base'?: string;
        
        /**
         * Ф.И.О.
         */
        'chief_accountant_id'?: number;
        
        /**
         * Наименование
         */
        'bank_name'?: string;
        
        /**
         * БИК
         */
        'bank_bik'?: string;
        
        /**
         * КПП
         */
        'bank_kpp'?: string;
        
        /**
         * Расчетный счет
         */
        'bank_rs'?: string;
        
        /**
         * Корреспондентский счет
         */
        'bank_ks'?: string;
        
        /**
         * Валюта счета
         */
        'bank_currency'?: string;
        
        /**
         * Full name
         */
        'noresident_name'?: string;
        
        /**
         * Address
         */
        'noresident_address'?: string;
        
        /**
         * Phone / fax
         */
        'noresident_phone'?: string;
        
        /**
         * Email
         */
        'noresident_email'?: string;
        
        /**
         * Website
         */
        'noresident_website'?: string;
        
        /**
         * Skype
         */
        'noresident_skype'?: string;
        
        /**
         * Full name
         */
        'noresident_signatory_id'?: number;
        
        /**
         * Position
         */
        'noresident_signatory_position'?: string;
        
        /**
         * Bank name
         */
        'noresident_bank_name'?: string;
        
        /**
         * Bank address
         */
        'noresident_bank_address'?: string;
        
        /**
         * Account Number
         */
        'noresident_bank_rs'?: string;
        
        /**
         * Account currency
         */
        'noresident_bank_currency'?: string;
        
        /**
         * Account name
         */
        'noresident_bank_rs_name'?: string;
        
        /**
         * Swift code
         */
        'noresident_bank_swift'?: string;
        
        /**
         * Intermediary bank
         */
        'noresident_bank_im'?: string;
        
        /**
         * Система налогообложения (ID берем из запроса - tax_system)
         */
        'tax_system'?: number;
        
        /**
         * Основная валюта счетов
         */
        'base_currency'?: string;
        
        /**
         * Порядок для сортировки (меньше - выше)
         */
        'num'?: number;
        
        /**
         * Главная фирма
         */
        'general'?: boolean;
        
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
   * Компания: данные.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  companyInfo(
    params: {

    /**
     * ID компании
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
 * Наименование полное
 */
'name'?: string;

/**
 * Наименование сокращенное
 */
'name_short'?: string;

/**
 * Юридический адрес
 */
'jur_address'?: string;

/**
 * Почтовый адрес
 */
'post_address'?: string;

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
 * Номер телефона
 */
'phone'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Вебсайт
 */
'website'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Ф.И.О.
 */
'responsible_person_id'?: number;

/**
 * Ф.И.О.
 */
'responsible_person_fio'?: string;

/**
 * Должность
 */
'responsible_person_position'?: string;

/**
 * Основание
 */
'responsible_person_base'?: string;

/**
 * Ф.И.О.
 */
'chief_accountant_id'?: number;

/**
 * Наименование
 */
'bank_name'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Расчетный счет
 */
'bank_rs'?: string;

/**
 * Корреспондентский счет
 */
'bank_ks'?: string;

/**
 * Валюта счета
 */
'bank_currency'?: string;

/**
 * Full name
 */
'noresident_name'?: string;

/**
 * Address
 */
'noresident_address'?: string;

/**
 * Phone / fax
 */
'noresident_phone'?: string;

/**
 * Email
 */
'noresident_email'?: string;

/**
 * Website
 */
'noresident_website'?: string;

/**
 * Skype
 */
'noresident_skype'?: string;

/**
 * Full name
 */
'noresident_signatory_id'?: number;

/**
 * Position
 */
'noresident_signatory_position'?: string;

/**
 * Bank name
 */
'noresident_bank_name'?: string;

/**
 * Bank address
 */
'noresident_bank_address'?: string;

/**
 * Account Number
 */
'noresident_bank_rs'?: string;

/**
 * Account currency
 */
'noresident_bank_currency'?: string;

/**
 * Account name
 */
'noresident_bank_rs_name'?: string;

/**
 * Swift code
 */
'noresident_bank_swift'?: string;

/**
 * Intermediary bank
 */
'noresident_bank_im'?: string;

/**
 * Система налогообложения (ID берем из запроса - tax_system)
 */
'tax_system'?: number;

/**
 * Основная валюта счетов
 */
'base_currency'?: string;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Главная фирма
 */
'general'?: boolean;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}> {
    return this.companyInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * Наименование полное
 */
'name'?: string;

/**
 * Наименование сокращенное
 */
'name_short'?: string;

/**
 * Юридический адрес
 */
'jur_address'?: string;

/**
 * Почтовый адрес
 */
'post_address'?: string;

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
 * Номер телефона
 */
'phone'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Вебсайт
 */
'website'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Ф.И.О.
 */
'responsible_person_id'?: number;

/**
 * Ф.И.О.
 */
'responsible_person_fio'?: string;

/**
 * Должность
 */
'responsible_person_position'?: string;

/**
 * Основание
 */
'responsible_person_base'?: string;

/**
 * Ф.И.О.
 */
'chief_accountant_id'?: number;

/**
 * Наименование
 */
'bank_name'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Расчетный счет
 */
'bank_rs'?: string;

/**
 * Корреспондентский счет
 */
'bank_ks'?: string;

/**
 * Валюта счета
 */
'bank_currency'?: string;

/**
 * Full name
 */
'noresident_name'?: string;

/**
 * Address
 */
'noresident_address'?: string;

/**
 * Phone / fax
 */
'noresident_phone'?: string;

/**
 * Email
 */
'noresident_email'?: string;

/**
 * Website
 */
'noresident_website'?: string;

/**
 * Skype
 */
'noresident_skype'?: string;

/**
 * Full name
 */
'noresident_signatory_id'?: number;

/**
 * Position
 */
'noresident_signatory_position'?: string;

/**
 * Bank name
 */
'noresident_bank_name'?: string;

/**
 * Bank address
 */
'noresident_bank_address'?: string;

/**
 * Account Number
 */
'noresident_bank_rs'?: string;

/**
 * Account currency
 */
'noresident_bank_currency'?: string;

/**
 * Account name
 */
'noresident_bank_rs_name'?: string;

/**
 * Swift code
 */
'noresident_bank_swift'?: string;

/**
 * Intermediary bank
 */
'noresident_bank_im'?: string;

/**
 * Система налогообложения (ID берем из запроса - tax_system)
 */
'tax_system'?: number;

/**
 * Основная валюта счетов
 */
'base_currency'?: string;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Главная фирма
 */
'general'?: boolean;

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
 * Наименование полное
 */
'name'?: string;

/**
 * Наименование сокращенное
 */
'name_short'?: string;

/**
 * Юридический адрес
 */
'jur_address'?: string;

/**
 * Почтовый адрес
 */
'post_address'?: string;

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
 * Номер телефона
 */
'phone'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Вебсайт
 */
'website'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Ф.И.О.
 */
'responsible_person_id'?: number;

/**
 * Ф.И.О.
 */
'responsible_person_fio'?: string;

/**
 * Должность
 */
'responsible_person_position'?: string;

/**
 * Основание
 */
'responsible_person_base'?: string;

/**
 * Ф.И.О.
 */
'chief_accountant_id'?: number;

/**
 * Наименование
 */
'bank_name'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Расчетный счет
 */
'bank_rs'?: string;

/**
 * Корреспондентский счет
 */
'bank_ks'?: string;

/**
 * Валюта счета
 */
'bank_currency'?: string;

/**
 * Full name
 */
'noresident_name'?: string;

/**
 * Address
 */
'noresident_address'?: string;

/**
 * Phone / fax
 */
'noresident_phone'?: string;

/**
 * Email
 */
'noresident_email'?: string;

/**
 * Website
 */
'noresident_website'?: string;

/**
 * Skype
 */
'noresident_skype'?: string;

/**
 * Full name
 */
'noresident_signatory_id'?: number;

/**
 * Position
 */
'noresident_signatory_position'?: string;

/**
 * Bank name
 */
'noresident_bank_name'?: string;

/**
 * Bank address
 */
'noresident_bank_address'?: string;

/**
 * Account Number
 */
'noresident_bank_rs'?: string;

/**
 * Account currency
 */
'noresident_bank_currency'?: string;

/**
 * Account name
 */
'noresident_bank_rs_name'?: string;

/**
 * Swift code
 */
'noresident_bank_swift'?: string;

/**
 * Intermediary bank
 */
'noresident_bank_im'?: string;

/**
 * Система налогообложения (ID берем из запроса - tax_system)
 */
'tax_system'?: number;

/**
 * Основная валюта счетов
 */
'base_currency'?: string;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Главная фирма
 */
'general'?: boolean;

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

  /** Path part for operation `companyCreate()` */
  static readonly CompanyCreatePath = '/company_create';

  /**
   * Компания: добавление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyCreate$Response(
    params?: {
      body?: {

/**
 * Наименование полное
 */
'name': string;

/**
 * Наименование сокращенное
 */
'name_short'?: string;

/**
 * Юридический адрес
 */
'jur_address'?: string;

/**
 * Почтовый адрес
 */
'post_address'?: string;

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
 * Номер телефона
 */
'phone'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Вебсайт
 */
'website'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Ф.И.О.
 */
'responsible_person_id'?: number;

/**
 * Должность
 */
'responsible_person_position'?: string;

/**
 * Основание
 */
'responsible_person_base'?: string;

/**
 * Ф.И.О.
 */
'chief_accountant_id'?: number;

/**
 * Наименование
 */
'bank_name'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Расчетный счет
 */
'bank_rs'?: string;

/**
 * Корреспондентский счет
 */
'bank_ks'?: string;

/**
 * Валюта счета
 */
'bank_currency'?: string;

/**
 * Full name
 */
'noresident_name'?: string;

/**
 * Address
 */
'noresident_address'?: string;

/**
 * Phone / fax
 */
'noresident_phone'?: string;

/**
 * Email
 */
'noresident_email'?: string;

/**
 * Website
 */
'noresident_website'?: string;

/**
 * Skype
 */
'noresident_skype'?: string;

/**
 * Full name
 */
'noresident_signatory_id'?: number;

/**
 * Position
 */
'noresident_signatory_position'?: string;

/**
 * Bank name
 */
'noresident_bank_name'?: string;

/**
 * Bank address
 */
'noresident_bank_address'?: string;

/**
 * Account Number
 */
'noresident_bank_rs'?: string;

/**
 * Account currency
 */
'noresident_bank_currency'?: string;

/**
 * Account name
 */
'noresident_bank_rs_name'?: string;

/**
 * Swift code
 */
'noresident_bank_swift'?: string;

/**
 * Intermediary bank
 */
'noresident_bank_im'?: string;

/**
 * Система налогообложения (ID берем из запроса - tax_system)
 */
'tax_system'?: number;

/**
 * Основная валюта счетов
 */
'base_currency'?: string;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Главная фирма
 */
'general'?: boolean;
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
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyCreatePath, 'post');
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
   * Компания: добавление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyCreate(
    params?: {
      body?: {

/**
 * Наименование полное
 */
'name': string;

/**
 * Наименование сокращенное
 */
'name_short'?: string;

/**
 * Юридический адрес
 */
'jur_address'?: string;

/**
 * Почтовый адрес
 */
'post_address'?: string;

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
 * Номер телефона
 */
'phone'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Вебсайт
 */
'website'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Ф.И.О.
 */
'responsible_person_id'?: number;

/**
 * Должность
 */
'responsible_person_position'?: string;

/**
 * Основание
 */
'responsible_person_base'?: string;

/**
 * Ф.И.О.
 */
'chief_accountant_id'?: number;

/**
 * Наименование
 */
'bank_name'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Расчетный счет
 */
'bank_rs'?: string;

/**
 * Корреспондентский счет
 */
'bank_ks'?: string;

/**
 * Валюта счета
 */
'bank_currency'?: string;

/**
 * Full name
 */
'noresident_name'?: string;

/**
 * Address
 */
'noresident_address'?: string;

/**
 * Phone / fax
 */
'noresident_phone'?: string;

/**
 * Email
 */
'noresident_email'?: string;

/**
 * Website
 */
'noresident_website'?: string;

/**
 * Skype
 */
'noresident_skype'?: string;

/**
 * Full name
 */
'noresident_signatory_id'?: number;

/**
 * Position
 */
'noresident_signatory_position'?: string;

/**
 * Bank name
 */
'noresident_bank_name'?: string;

/**
 * Bank address
 */
'noresident_bank_address'?: string;

/**
 * Account Number
 */
'noresident_bank_rs'?: string;

/**
 * Account currency
 */
'noresident_bank_currency'?: string;

/**
 * Account name
 */
'noresident_bank_rs_name'?: string;

/**
 * Swift code
 */
'noresident_bank_swift'?: string;

/**
 * Intermediary bank
 */
'noresident_bank_im'?: string;

/**
 * Система налогообложения (ID берем из запроса - tax_system)
 */
'tax_system'?: number;

/**
 * Основная валюта счетов
 */
'base_currency'?: string;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Главная фирма
 */
'general'?: boolean;
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
    return this.companyCreate$Response(params, context).pipe(
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

  /** Path part for operation `companyUpdate()` */
  static readonly CompanyUpdatePath = '/company_update';

  /**
   * Компания: обновление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyUpdate$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * Наименование полное
 */
'name': string;

/**
 * Наименование сокращенное
 */
'name_short'?: string;

/**
 * Юридический адрес
 */
'jur_address'?: string;

/**
 * Почтовый адрес
 */
'post_address'?: string;

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
 * Номер телефона
 */
'phone'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Вебсайт
 */
'website'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Ф.И.О.
 */
'responsible_person_id'?: number;

/**
 * Должность
 */
'responsible_person_position'?: string;

/**
 * Основание
 */
'responsible_person_base'?: string;

/**
 * Ф.И.О.
 */
'chief_accountant_id'?: number;

/**
 * Наименование
 */
'bank_name'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Расчетный счет
 */
'bank_rs'?: string;

/**
 * Корреспондентский счет
 */
'bank_ks'?: string;

/**
 * Валюта счета
 */
'bank_currency'?: string;

/**
 * Full name
 */
'noresident_name'?: string;

/**
 * Address
 */
'noresident_address'?: string;

/**
 * Phone / fax
 */
'noresident_phone'?: string;

/**
 * Email
 */
'noresident_email'?: string;

/**
 * Website
 */
'noresident_website'?: string;

/**
 * Skype
 */
'noresident_skype'?: string;

/**
 * Full name
 */
'noresident_signatory_id'?: number;

/**
 * Position
 */
'noresident_signatory_position'?: string;

/**
 * Bank name
 */
'noresident_bank_name'?: string;

/**
 * Bank address
 */
'noresident_bank_address'?: string;

/**
 * Account Number
 */
'noresident_bank_rs'?: string;

/**
 * Account currency
 */
'noresident_bank_currency'?: string;

/**
 * Account name
 */
'noresident_bank_rs_name'?: string;

/**
 * Swift code
 */
'noresident_bank_swift'?: string;

/**
 * Intermediary bank
 */
'noresident_bank_im'?: string;

/**
 * Система налогообложения (ID берем из запроса - tax_system)
 */
'tax_system'?: number;

/**
 * Основная валюта счетов
 */
'base_currency'?: string;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Главная фирма
 */
'general'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyUpdatePath, 'post');
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
   * Компания: обновление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyUpdate(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * Наименование полное
 */
'name': string;

/**
 * Наименование сокращенное
 */
'name_short'?: string;

/**
 * Юридический адрес
 */
'jur_address'?: string;

/**
 * Почтовый адрес
 */
'post_address'?: string;

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
 * Номер телефона
 */
'phone'?: string;

/**
 * Email
 */
'email'?: string;

/**
 * Вебсайт
 */
'website'?: string;

/**
 * Skype
 */
'skype'?: string;

/**
 * Ф.И.О.
 */
'responsible_person_id'?: number;

/**
 * Должность
 */
'responsible_person_position'?: string;

/**
 * Основание
 */
'responsible_person_base'?: string;

/**
 * Ф.И.О.
 */
'chief_accountant_id'?: number;

/**
 * Наименование
 */
'bank_name'?: string;

/**
 * БИК
 */
'bank_bik'?: string;

/**
 * КПП
 */
'bank_kpp'?: string;

/**
 * Расчетный счет
 */
'bank_rs'?: string;

/**
 * Корреспондентский счет
 */
'bank_ks'?: string;

/**
 * Валюта счета
 */
'bank_currency'?: string;

/**
 * Full name
 */
'noresident_name'?: string;

/**
 * Address
 */
'noresident_address'?: string;

/**
 * Phone / fax
 */
'noresident_phone'?: string;

/**
 * Email
 */
'noresident_email'?: string;

/**
 * Website
 */
'noresident_website'?: string;

/**
 * Skype
 */
'noresident_skype'?: string;

/**
 * Full name
 */
'noresident_signatory_id'?: number;

/**
 * Position
 */
'noresident_signatory_position'?: string;

/**
 * Bank name
 */
'noresident_bank_name'?: string;

/**
 * Bank address
 */
'noresident_bank_address'?: string;

/**
 * Account Number
 */
'noresident_bank_rs'?: string;

/**
 * Account currency
 */
'noresident_bank_currency'?: string;

/**
 * Account name
 */
'noresident_bank_rs_name'?: string;

/**
 * Swift code
 */
'noresident_bank_swift'?: string;

/**
 * Intermediary bank
 */
'noresident_bank_im'?: string;

/**
 * Система налогообложения (ID берем из запроса - tax_system)
 */
'tax_system'?: number;

/**
 * Основная валюта счетов
 */
'base_currency'?: string;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Главная фирма
 */
'general'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.companyUpdate$Response(params, context).pipe(
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

  /** Path part for operation `companyDelete()` */
  static readonly CompanyDeletePath = '/company_delete';

  /**
   * Компания: удаление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyDelete$Response(
    params?: {
      body?: {

/**
 * ID удаляемого компании
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
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyDeletePath, 'post');
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
   * Компания: удаление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyDelete(
    params?: {
      body?: {

/**
 * ID удаляемого компании
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
    return this.companyDelete$Response(params, context).pipe(
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

  /** Path part for operation `companyDepartmentList()` */
  static readonly CompanyDepartmentListPath = '/company_department_list';

  /**
   * Подразделения: список.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyDepartmentList()` instead.
   *
   * This method doesn't expect any request body.
   */
  companyDepartmentList$Response(
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
 * Количество должностей
 */
'count_position'?: number;

/**
 * Количество сотрудников
 */
'count_user'?: number;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;

/**
 * Руководитель подразделения
 */
'leader_user'?: string;

/**
 * ID Руководителя подразделения
 */
'leader_user_id'?: number;

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
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyDepartmentListPath, 'get');
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
         * Количество должностей
         */
        'count_position'?: number;
        
        /**
         * Количество сотрудников
         */
        'count_user'?: number;
        
        /**
         * Порядок (меньше - выше)
         */
        'num'?: number;
        
        /**
         * Руководитель подразделения
         */
        'leader_user'?: string;
        
        /**
         * ID Руководителя подразделения
         */
        'leader_user_id'?: number;
        
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
   * Подразделения: список.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyDepartmentList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  companyDepartmentList(
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
 * Количество должностей
 */
'count_position'?: number;

/**
 * Количество сотрудников
 */
'count_user'?: number;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;

/**
 * Руководитель подразделения
 */
'leader_user'?: string;

/**
 * ID Руководителя подразделения
 */
'leader_user_id'?: number;

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
    return this.companyDepartmentList$Response(params, context).pipe(
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
 * Количество должностей
 */
'count_position'?: number;

/**
 * Количество сотрудников
 */
'count_user'?: number;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;

/**
 * Руководитель подразделения
 */
'leader_user'?: string;

/**
 * ID Руководителя подразделения
 */
'leader_user_id'?: number;

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
 * Количество должностей
 */
'count_position'?: number;

/**
 * Количество сотрудников
 */
'count_user'?: number;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;

/**
 * Руководитель подразделения
 */
'leader_user'?: string;

/**
 * ID Руководителя подразделения
 */
'leader_user_id'?: number;

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

  /** Path part for operation `companyDepartmentInfo()` */
  static readonly CompanyDepartmentInfoPath = '/company_department_info';

  /**
   * Подразделения: данные.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyDepartmentInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  companyDepartmentInfo$Response(
    params?: {

    /**
     * ID подразделения
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
 * Количество должностей
 */
'count_position'?: number;

/**
 * Количество сотрудников
 */
'count_user'?: number;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;

/**
 * ID Руководителя подразделения
 */
'leader_user_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyDepartmentInfoPath, 'get');
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
         * Количество должностей
         */
        'count_position'?: number;
        
        /**
         * Количество сотрудников
         */
        'count_user'?: number;
        
        /**
         * Порядок (меньше - выше)
         */
        'num'?: number;
        
        /**
         * ID Руководителя подразделения
         */
        'leader_user_id'?: number;
        
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
   * Подразделения: данные.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyDepartmentInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  companyDepartmentInfo(
    params?: {

    /**
     * ID подразделения
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
 * Количество должностей
 */
'count_position'?: number;

/**
 * Количество сотрудников
 */
'count_user'?: number;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;

/**
 * ID Руководителя подразделения
 */
'leader_user_id'?: number;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}> {
    return this.companyDepartmentInfo$Response(params, context).pipe(
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
 * Количество должностей
 */
'count_position'?: number;

/**
 * Количество сотрудников
 */
'count_user'?: number;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;

/**
 * ID Руководителя подразделения
 */
'leader_user_id'?: number;

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
 * Количество должностей
 */
'count_position'?: number;

/**
 * Количество сотрудников
 */
'count_user'?: number;

/**
 * Порядок (меньше - выше)
 */
'num'?: number;

/**
 * ID Руководителя подразделения
 */
'leader_user_id'?: number;

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

  /** Path part for operation `companyDepartmentCreate()` */
  static readonly CompanyDepartmentCreatePath = '/company_department_create';

  /**
   * Подразделения: добавление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyDepartmentCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyDepartmentCreate$Response(
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
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyDepartmentCreatePath, 'post');
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
   * Подразделения: добавление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyDepartmentCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyDepartmentCreate(
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
    return this.companyDepartmentCreate$Response(params, context).pipe(
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

  /** Path part for operation `companyDepartmentUpdate()` */
  static readonly CompanyDepartmentUpdatePath = '/company_department_update';

  /**
   * Подразделения: обновление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyDepartmentUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyDepartmentUpdate$Response(
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
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyDepartmentUpdatePath, 'post');
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
   * Подразделения: обновление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyDepartmentUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyDepartmentUpdate(
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
    return this.companyDepartmentUpdate$Response(params, context).pipe(
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

  /** Path part for operation `companyDepartmentDelete()` */
  static readonly CompanyDepartmentDeletePath = '/company_department_delete';

  /**
   * Подразделения: удаление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyDepartmentDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyDepartmentDelete$Response(
    params?: {
      body?: {

/**
 * ID удаляемого подразделения
 */
'id': number;

/**
 * Удалять вместе с должностями
 */
'with_position'?: boolean;

/**
 * Удалять вместе с сотрудниками
 */
'with_staff'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyDepartmentDeletePath, 'post');
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
   * Подразделения: удаление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyDepartmentDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyDepartmentDelete(
    params?: {
      body?: {

/**
 * ID удаляемого подразделения
 */
'id': number;

/**
 * Удалять вместе с должностями
 */
'with_position'?: boolean;

/**
 * Удалять вместе с сотрудниками
 */
'with_staff'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.companyDepartmentDelete$Response(params, context).pipe(
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

  /** Path part for operation `companyPositionList()` */
  static readonly CompanyPositionListPath = '/company_position_list';

  /**
   * Должности: список.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyPositionList()` instead.
   *
   * This method doesn't expect any request body.
   */
  companyPositionList$Response(
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
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Права доступа к разделам {permission_object: {permission_action: permission_rule}} (ID берем из запроса - settings_get)
 */
'permission'?: {
};

/**
 * Порядок для сортировки (меньше - выше)
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
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyPositionListPath, 'get');
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
        'id': number;
        
        /**
         * Наименование
         */
        'name'?: string;
        
        /**
         * Права доступа к разделам {permission_object: {permission_action: permission_rule}} (ID берем из запроса - settings_get)
         */
        'permission'?: {
        };
        
        /**
         * Порядок для сортировки (меньше - выше)
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
   * Должности: список.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyPositionList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  companyPositionList(
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
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Права доступа к разделам {permission_object: {permission_action: permission_rule}} (ID берем из запроса - settings_get)
 */
'permission'?: {
};

/**
 * Порядок для сортировки (меньше - выше)
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
    return this.companyPositionList$Response(params, context).pipe(
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
 * Наименование
 */
'name'?: string;

/**
 * Права доступа к разделам {permission_object: {permission_action: permission_rule}} (ID берем из запроса - settings_get)
 */
'permission'?: {
};

/**
 * Порядок для сортировки (меньше - выше)
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
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Права доступа к разделам {permission_object: {permission_action: permission_rule}} (ID берем из запроса - settings_get)
 */
'permission'?: {
};

/**
 * Порядок для сортировки (меньше - выше)
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

  /** Path part for operation `companyPositionInfo()` */
  static readonly CompanyPositionInfoPath = '/company_position_info';

  /**
   * Должности: данные.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyPositionInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  companyPositionInfo$Response(
    params: {

    /**
     * ID должности
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
 * Наименование
 */
'name'?: string;

/**
 * Права доступа к разделам {permission_object: {permission_action: permission_rule}} (ID берем из запроса - settings_get)
 */
'permission'?: {
};

/**
 * Порядок для сортировки (меньше - выше)
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
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyPositionInfoPath, 'get');
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
         * Наименование
         */
        'name'?: string;
        
        /**
         * Права доступа к разделам {permission_object: {permission_action: permission_rule}} (ID берем из запроса - settings_get)
         */
        'permission'?: {
        };
        
        /**
         * Порядок для сортировки (меньше - выше)
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
   * Должности: данные.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyPositionInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  companyPositionInfo(
    params: {

    /**
     * ID должности
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
 * Наименование
 */
'name'?: string;

/**
 * Права доступа к разделам {permission_object: {permission_action: permission_rule}} (ID берем из запроса - settings_get)
 */
'permission'?: {
};

/**
 * Порядок для сортировки (меньше - выше)
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
    return this.companyPositionInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Права доступа к разделам {permission_object: {permission_action: permission_rule}} (ID берем из запроса - settings_get)
 */
'permission'?: {
};

/**
 * Порядок для сортировки (меньше - выше)
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
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Права доступа к разделам {permission_object: {permission_action: permission_rule}} (ID берем из запроса - settings_get)
 */
'permission'?: {
};

/**
 * Порядок для сортировки (меньше - выше)
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

  /** Path part for operation `companyPositionCreate()` */
  static readonly CompanyPositionCreatePath = '/company_position_create';

  /**
   * Должности: добавление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyPositionCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyPositionCreate$Response(
    params?: {
      body?: {

/**
 * Наименование
 */
'name': string;

/**
 * Права доступа к разделам {permission_object: {permission_action: permission_rule}} (ID берем из запроса - settings_get)
 */
'permission'?: {
};

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
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyPositionCreatePath, 'post');
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
   * Должности: добавление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyPositionCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyPositionCreate(
    params?: {
      body?: {

/**
 * Наименование
 */
'name': string;

/**
 * Права доступа к разделам {permission_object: {permission_action: permission_rule}} (ID берем из запроса - settings_get)
 */
'permission'?: {
};

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
    return this.companyPositionCreate$Response(params, context).pipe(
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

  /** Path part for operation `companyPositionUpdate()` */
  static readonly CompanyPositionUpdatePath = '/company_position_update';

  /**
   * Должности: обновление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyPositionUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyPositionUpdate$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Права доступа к разделам {permission_object: {permission_action: permission_rule}} (ID берем из запроса - settings_get)
 */
'permission'?: {
};

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
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyPositionUpdatePath, 'post');
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
   * Должности: обновление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyPositionUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyPositionUpdate(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * Наименование
 */
'name'?: string;

/**
 * Права доступа к разделам {permission_object: {permission_action: permission_rule}} (ID берем из запроса - settings_get)
 */
'permission'?: {
};

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
    return this.companyPositionUpdate$Response(params, context).pipe(
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

  /** Path part for operation `companyPositionDelete()` */
  static readonly CompanyPositionDeletePath = '/company_position_delete';

  /**
   * Должности: удаление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyPositionDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyPositionDelete$Response(
    params?: {
      body?: {

/**
 * ID удаляемой должности
 */
'id': number;

/**
 * Удалять сотрудников с этой должностью
 */
'delete_staff'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyPositionDeletePath, 'post');
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
   * Должности: удаление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyPositionDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyPositionDelete(
    params?: {
      body?: {

/**
 * ID удаляемой должности
 */
'id': number;

/**
 * Удалять сотрудников с этой должностью
 */
'delete_staff'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.companyPositionDelete$Response(params, context).pipe(
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

  /** Path part for operation `companyEmployeeList()` */
  static readonly CompanyEmployeeListPath = '/company_employee_list';

  /**
   * Сотрудники: список.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyEmployeeList()` instead.
   *
   * This method doesn't expect any request body.
   */
  companyEmployeeList$Response(
    params?: {

    /**
     * ID подразделения
     */
      department_id?: number;

    /**
     * ID должности
     */
      position_id?: number;

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
'id': number;

/**
 * Email
 */
'email'?: string;

/**
 * Пароль
 */
'password'?: string;

/**
 * Доступ в систему
 */
'access'?: boolean;

/**
 * Телефон
 */
'phone'?: string;

/**
 * Skype
 */
'skype'?: string;

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
 * Дата рождения
 */
'birth_date'?: string;

/**
 * Дата трудоустройства
 */
'employment_date'?: string;

/**
 * Дата увольнения
 */
'dismissal_date'?: string;

/**
 * ID компании
 */
'company_id'?: number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * ID подразделения
 */
'department_id'?: number;

/**
 * Наименование подразделения
 */
'department_name'?: string;

/**
 * ID должности
 */
'position_id'?: number;

/**
 * Наименование должности
 */
'position_name'?: string;

/**
 * Руководитель подразделения
 */
'department_leader'?: boolean;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Пароль создан
 */
'has_password'?: boolean;

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
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyEmployeeListPath, 'get');
    if (params) {
      rb.query('department_id', params.department_id, {});
      rb.query('position_id', params.position_id, {});
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
        'id': number;
        
        /**
         * Email
         */
        'email'?: string;
        
        /**
         * Пароль
         */
        'password'?: string;
        
        /**
         * Доступ в систему
         */
        'access'?: boolean;
        
        /**
         * Телефон
         */
        'phone'?: string;
        
        /**
         * Skype
         */
        'skype'?: string;
        
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
         * Дата рождения
         */
        'birth_date'?: string;
        
        /**
         * Дата трудоустройства
         */
        'employment_date'?: string;
        
        /**
         * Дата увольнения
         */
        'dismissal_date'?: string;
        
        /**
         * ID компании
         */
        'company_id'?: number;
        
        /**
         * Наименование компании
         */
        'company_name'?: string;
        
        /**
         * ID подразделения
         */
        'department_id'?: number;
        
        /**
         * Наименование подразделения
         */
        'department_name'?: string;
        
        /**
         * ID должности
         */
        'position_id'?: number;
        
        /**
         * Наименование должности
         */
        'position_name'?: string;
        
        /**
         * Руководитель подразделения
         */
        'department_leader'?: boolean;
        
        /**
         * Порядок для сортировки (меньше - выше)
         */
        'num'?: number;
        
        /**
         * Пароль создан
         */
        'has_password'?: boolean;
        
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
   * Сотрудники: список.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyEmployeeList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  companyEmployeeList(
    params?: {

    /**
     * ID подразделения
     */
      department_id?: number;

    /**
     * ID должности
     */
      position_id?: number;

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
'id': number;

/**
 * Email
 */
'email'?: string;

/**
 * Пароль
 */
'password'?: string;

/**
 * Доступ в систему
 */
'access'?: boolean;

/**
 * Телефон
 */
'phone'?: string;

/**
 * Skype
 */
'skype'?: string;

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
 * Дата рождения
 */
'birth_date'?: string;

/**
 * Дата трудоустройства
 */
'employment_date'?: string;

/**
 * Дата увольнения
 */
'dismissal_date'?: string;

/**
 * ID компании
 */
'company_id'?: number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * ID подразделения
 */
'department_id'?: number;

/**
 * Наименование подразделения
 */
'department_name'?: string;

/**
 * ID должности
 */
'position_id'?: number;

/**
 * Наименование должности
 */
'position_name'?: string;

/**
 * Руководитель подразделения
 */
'department_leader'?: boolean;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Пароль создан
 */
'has_password'?: boolean;

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
    return this.companyEmployeeList$Response(params, context).pipe(
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
 * Email
 */
'email'?: string;

/**
 * Пароль
 */
'password'?: string;

/**
 * Доступ в систему
 */
'access'?: boolean;

/**
 * Телефон
 */
'phone'?: string;

/**
 * Skype
 */
'skype'?: string;

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
 * Дата рождения
 */
'birth_date'?: string;

/**
 * Дата трудоустройства
 */
'employment_date'?: string;

/**
 * Дата увольнения
 */
'dismissal_date'?: string;

/**
 * ID компании
 */
'company_id'?: number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * ID подразделения
 */
'department_id'?: number;

/**
 * Наименование подразделения
 */
'department_name'?: string;

/**
 * ID должности
 */
'position_id'?: number;

/**
 * Наименование должности
 */
'position_name'?: string;

/**
 * Руководитель подразделения
 */
'department_leader'?: boolean;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Пароль создан
 */
'has_password'?: boolean;

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
'id': number;

/**
 * Email
 */
'email'?: string;

/**
 * Пароль
 */
'password'?: string;

/**
 * Доступ в систему
 */
'access'?: boolean;

/**
 * Телефон
 */
'phone'?: string;

/**
 * Skype
 */
'skype'?: string;

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
 * Дата рождения
 */
'birth_date'?: string;

/**
 * Дата трудоустройства
 */
'employment_date'?: string;

/**
 * Дата увольнения
 */
'dismissal_date'?: string;

/**
 * ID компании
 */
'company_id'?: number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * ID подразделения
 */
'department_id'?: number;

/**
 * Наименование подразделения
 */
'department_name'?: string;

/**
 * ID должности
 */
'position_id'?: number;

/**
 * Наименование должности
 */
'position_name'?: string;

/**
 * Руководитель подразделения
 */
'department_leader'?: boolean;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Пароль создан
 */
'has_password'?: boolean;

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

  /** Path part for operation `companyEmployeeInfo()` */
  static readonly CompanyEmployeeInfoPath = '/company_employee_info';

  /**
   * Сотрудники: данные.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyEmployeeInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  companyEmployeeInfo$Response(
    params: {

    /**
     * ID сотрудника
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
 * Email
 */
'email'?: string;

/**
 * Пароль
 */
'password'?: string;

/**
 * Доступ в систему
 */
'access'?: boolean;

/**
 * Телефон
 */
'phone'?: string;

/**
 * Skype
 */
'skype'?: string;

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
 * Дата рождения
 */
'birth_date'?: string;

/**
 * Дата трудоустройства
 */
'employment_date'?: string;

/**
 * Дата увольнения
 */
'dismissal_date'?: string;

/**
 * ID компании
 */
'company_id'?: number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * ID подразделения
 */
'department_id'?: number;

/**
 * Наименование подразделения
 */
'department_name'?: string;

/**
 * ID должности
 */
'position_id'?: number;

/**
 * Наименование должности
 */
'position_name'?: string;

/**
 * Руководитель подразделения
 */
'department_leader'?: boolean;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Пароль создан
 */
'has_password'?: boolean;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyEmployeeInfoPath, 'get');
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
         * Email
         */
        'email'?: string;
        
        /**
         * Пароль
         */
        'password'?: string;
        
        /**
         * Доступ в систему
         */
        'access'?: boolean;
        
        /**
         * Телефон
         */
        'phone'?: string;
        
        /**
         * Skype
         */
        'skype'?: string;
        
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
         * Дата рождения
         */
        'birth_date'?: string;
        
        /**
         * Дата трудоустройства
         */
        'employment_date'?: string;
        
        /**
         * Дата увольнения
         */
        'dismissal_date'?: string;
        
        /**
         * ID компании
         */
        'company_id'?: number;
        
        /**
         * Наименование компании
         */
        'company_name'?: string;
        
        /**
         * ID подразделения
         */
        'department_id'?: number;
        
        /**
         * Наименование подразделения
         */
        'department_name'?: string;
        
        /**
         * ID должности
         */
        'position_id'?: number;
        
        /**
         * Наименование должности
         */
        'position_name'?: string;
        
        /**
         * Руководитель подразделения
         */
        'department_leader'?: boolean;
        
        /**
         * Порядок для сортировки (меньше - выше)
         */
        'num'?: number;
        
        /**
         * Пароль создан
         */
        'has_password'?: boolean;
        
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
   * Сотрудники: данные.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyEmployeeInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  companyEmployeeInfo(
    params: {

    /**
     * ID сотрудника
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
 * Email
 */
'email'?: string;

/**
 * Пароль
 */
'password'?: string;

/**
 * Доступ в систему
 */
'access'?: boolean;

/**
 * Телефон
 */
'phone'?: string;

/**
 * Skype
 */
'skype'?: string;

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
 * Дата рождения
 */
'birth_date'?: string;

/**
 * Дата трудоустройства
 */
'employment_date'?: string;

/**
 * Дата увольнения
 */
'dismissal_date'?: string;

/**
 * ID компании
 */
'company_id'?: number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * ID подразделения
 */
'department_id'?: number;

/**
 * Наименование подразделения
 */
'department_name'?: string;

/**
 * ID должности
 */
'position_id'?: number;

/**
 * Наименование должности
 */
'position_name'?: string;

/**
 * Руководитель подразделения
 */
'department_leader'?: boolean;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Пароль создан
 */
'has_password'?: boolean;

/**
 * Время создания
 */
'time_add'?: string;

/**
 * Время изменения
 */
'time_edit'?: string;
}> {
    return this.companyEmployeeInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID
 */
'id': number;

/**
 * Email
 */
'email'?: string;

/**
 * Пароль
 */
'password'?: string;

/**
 * Доступ в систему
 */
'access'?: boolean;

/**
 * Телефон
 */
'phone'?: string;

/**
 * Skype
 */
'skype'?: string;

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
 * Дата рождения
 */
'birth_date'?: string;

/**
 * Дата трудоустройства
 */
'employment_date'?: string;

/**
 * Дата увольнения
 */
'dismissal_date'?: string;

/**
 * ID компании
 */
'company_id'?: number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * ID подразделения
 */
'department_id'?: number;

/**
 * Наименование подразделения
 */
'department_name'?: string;

/**
 * ID должности
 */
'position_id'?: number;

/**
 * Наименование должности
 */
'position_name'?: string;

/**
 * Руководитель подразделения
 */
'department_leader'?: boolean;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Пароль создан
 */
'has_password'?: boolean;

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
 * Email
 */
'email'?: string;

/**
 * Пароль
 */
'password'?: string;

/**
 * Доступ в систему
 */
'access'?: boolean;

/**
 * Телефон
 */
'phone'?: string;

/**
 * Skype
 */
'skype'?: string;

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
 * Дата рождения
 */
'birth_date'?: string;

/**
 * Дата трудоустройства
 */
'employment_date'?: string;

/**
 * Дата увольнения
 */
'dismissal_date'?: string;

/**
 * ID компании
 */
'company_id'?: number;

/**
 * Наименование компании
 */
'company_name'?: string;

/**
 * ID подразделения
 */
'department_id'?: number;

/**
 * Наименование подразделения
 */
'department_name'?: string;

/**
 * ID должности
 */
'position_id'?: number;

/**
 * Наименование должности
 */
'position_name'?: string;

/**
 * Руководитель подразделения
 */
'department_leader'?: boolean;

/**
 * Порядок для сортировки (меньше - выше)
 */
'num'?: number;

/**
 * Пароль создан
 */
'has_password'?: boolean;

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

  /** Path part for operation `companyEmployeeCreate()` */
  static readonly CompanyEmployeeCreatePath = '/company_employee_create';

  /**
   * Сотрудники: добавление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyEmployeeCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyEmployeeCreate$Response(
    params?: {
      body?: {

/**
 * Email
 */
'email'?: string;

/**
 * Пароль
 */
'password'?: string;

/**
 * Доступ в систему
 */
'access'?: boolean;

/**
 * Телефон
 */
'phone'?: string;

/**
 * Skype
 */
'skype'?: string;

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
 * Дата рождения
 */
'birth_date'?: string;

/**
 * Дата трудоустройства
 */
'employment_date'?: string;

/**
 * Дата увольнения
 */
'dismissal_date'?: string;

/**
 * ID компании
 */
'company_id': number;

/**
 * ID подразделения
 */
'department_id': number;

/**
 * ID должности
 */
'position_id': number;

/**
 * Руководитель подразделения
 */
'department_leader'?: boolean;

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
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyEmployeeCreatePath, 'post');
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
   * Сотрудники: добавление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyEmployeeCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyEmployeeCreate(
    params?: {
      body?: {

/**
 * Email
 */
'email'?: string;

/**
 * Пароль
 */
'password'?: string;

/**
 * Доступ в систему
 */
'access'?: boolean;

/**
 * Телефон
 */
'phone'?: string;

/**
 * Skype
 */
'skype'?: string;

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
 * Дата рождения
 */
'birth_date'?: string;

/**
 * Дата трудоустройства
 */
'employment_date'?: string;

/**
 * Дата увольнения
 */
'dismissal_date'?: string;

/**
 * ID компании
 */
'company_id': number;

/**
 * ID подразделения
 */
'department_id': number;

/**
 * ID должности
 */
'position_id': number;

/**
 * Руководитель подразделения
 */
'department_leader'?: boolean;

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
    return this.companyEmployeeCreate$Response(params, context).pipe(
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

  /** Path part for operation `companyEmployeeUpdate()` */
  static readonly CompanyEmployeeUpdatePath = '/company_employee_update';

  /**
   * Сотрудники: обновление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyEmployeeUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyEmployeeUpdate$Response(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * Email
 */
'email'?: string;

/**
 * Пароль
 */
'password'?: string;

/**
 * Доступ в систему
 */
'access'?: boolean;

/**
 * Телефон
 */
'phone'?: string;

/**
 * Skype
 */
'skype'?: string;

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
 * Дата рождения
 */
'birth_date'?: string;

/**
 * Дата трудоустройства
 */
'employment_date'?: string;

/**
 * Дата увольнения
 */
'dismissal_date'?: string;

/**
 * ID компании
 */
'company_id'?: number;

/**
 * ID подразделения
 */
'department_id'?: number;

/**
 * ID должности
 */
'position_id'?: number;

/**
 * Руководитель подразделения
 */
'department_leader'?: boolean;

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
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyEmployeeUpdatePath, 'post');
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
   * Сотрудники: обновление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyEmployeeUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyEmployeeUpdate(
    params?: {
      body?: {

/**
 * ID
 */
'id': number;

/**
 * Email
 */
'email'?: string;

/**
 * Пароль
 */
'password'?: string;

/**
 * Доступ в систему
 */
'access'?: boolean;

/**
 * Телефон
 */
'phone'?: string;

/**
 * Skype
 */
'skype'?: string;

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
 * Дата рождения
 */
'birth_date'?: string;

/**
 * Дата трудоустройства
 */
'employment_date'?: string;

/**
 * Дата увольнения
 */
'dismissal_date'?: string;

/**
 * ID компании
 */
'company_id'?: number;

/**
 * ID подразделения
 */
'department_id'?: number;

/**
 * ID должности
 */
'position_id'?: number;

/**
 * Руководитель подразделения
 */
'department_leader'?: boolean;

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
    return this.companyEmployeeUpdate$Response(params, context).pipe(
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

  /** Path part for operation `companyEmployeeDelete()` */
  static readonly CompanyEmployeeDeletePath = '/company_employee_delete';

  /**
   * Сотрудники: удаление.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `companyEmployeeDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyEmployeeDelete$Response(
    params?: {
      body?: {

/**
 * ID удаляемого сотрудника
 */
'id'?: number;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, CompanyService.CompanyEmployeeDeletePath, 'post');
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
   * Сотрудники: удаление.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `companyEmployeeDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  companyEmployeeDelete(
    params?: {
      body?: {

/**
 * ID удаляемого сотрудника
 */
'id'?: number;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.companyEmployeeDelete$Response(params, context).pipe(
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
