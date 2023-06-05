import { SortColumn } from "./sort-column";
import { Client } from "./client";

export interface ClientFilter {
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
  sort?: SortColumn<Client>[];
}
