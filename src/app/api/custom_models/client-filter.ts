import { SortColumn } from "./sort-column";
import { Client } from "./client";

export interface ClientFilter {
  
  country_id?: number;
  group_id: number;
  inn?: string;
  contact_id?: number;
  
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
