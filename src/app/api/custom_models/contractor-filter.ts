export interface ContractorFilter {
  /**
   * Специализация (ID берем из запроса - transport_kind)
   */
  specialization?: Array<string>;

  /**
   * Минимальный рейтинг
   */
  rating?: number;

  /**
   * Доступ к торгам
   */
  allow_trade?: boolean;

  /**
   * Направление откуда (ID берем из запроса - direction_country)
   */
  country_departure?: number;

  /**
   * Направление куда (ID берем из запроса - direction_country)
   */
  country_arrival?: number;

  /**
   * Начальная позиция
   */
  start?: number;

  /**
   * Лимит позиций на страницу
   */
  count?: number;
}
