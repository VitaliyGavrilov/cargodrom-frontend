import { SortColumn } from "./sort-column";

//вид запроса
export interface RequestFormat {
  id: number;
  name: string;
}
//список запросов
export interface RequestList {
  total: number,
  items: Request[],
  column: [
    string
  ],
  sort: [
    string
  ]
}

export interface Incoterms {
  id: number,
  name: string,
  services_id: [string]
}

export interface RequestServices {
  id: number;
  name: string;
}


// запрос
export interface Request {

  id:number


//   **
//  * Клиент (ID берем из запроса - customer_list)
//  */
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
 * Вид запроса (ID берем из запроса - request_type)
 */
'request_type_id'?: number;

/**
 * Вид перевозки (ID берем из запроса - transport_kind)
 */
'transport_kind_id'?: string;

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
 * Валюта по стоимости груза (ID берем из запроса - settings_get из поля currency)
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
'status_id'?: string;

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
 * Дата создания
 */
'time_add'?: string;
}


//   id: number,
//   customer_id: number,
//   customer: string,
//   request_type_id: number,
//   transport_kind_id: string,
//   transport_type_id: number,
//   cargo_description: string,
//   cargo_type_id: number,
//   cargo_package_id: number,
//   cargo_temp_control: string,
//   cargo_danger: true,
//   cargo_danger_file: {},
//   cargo_places: [
//     {
//       num: number,
//       cargo_package_id: number,
//       stacking: true,
//       length: number,
//       width: number,
//       height: number,
//       weight: number,
//       count: number
//     }
//   ],
//   cargo_places_count: number,
//   cargo_places_weight: number,
//   cargo_places_volume: number,
//   cargo_places_paid_weight: number,
//   cargo_places_density: number,
//   cargo_cost: number,
//   cargo_currency_id: string,
//   cargo_file: {},
//   departure_city_id: number,
//   departure_country_id: number,
//   departure_point_id: number,
//   departure_address: string,
//   arrival_city_id: number,
//   arrival_country_id: number,
//   arrival_point_id: number,
//   arrival_address: string,
//   departure_flight: any,
//   incoterms_id: number,
//   services: [
//     string
//   ],
//   services_optional: [
//     string
//   ],
//   comment: string,
//   status_id: number,
//   status_crm_id: number,
//   manager_initiator_id: number,
//   manager_initiator_name: string,
//   manager_creator_id: number,
//   manager_creator_name: string,
//   manager_executor_id: number,
//   manager_executor_name: string
//   time_add:string



export interface RequestFilter {

  /**
   * Поиск запроса по номеру...
   */
  id?: string;

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
    contractor_id?: number;

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
    sort?: SortColumn<Request>[];
}


// export interface RequestFilter {

//   request_type_id?: number;


//   status_id?: string[];


//   start?: number;


//   count?: number;


//   sort?: SortColumn<Request>[];
// }





