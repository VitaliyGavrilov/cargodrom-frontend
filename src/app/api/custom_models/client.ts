export interface Client {
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
    'count'?: number;

    /**
     * Дней с последнего заказа
     */
    'days'?: number;

    /**
     * Дней с последнего заказа (расширенная строка)
     */
    'days_string'?: string;

    /**
     * Просрочка платежей
     */
    'delay_payment'?: number;

    /**
     * Просрочка платежей (расширенная строка)
     */
    'delay_payment_string'?: string;
  }
}
