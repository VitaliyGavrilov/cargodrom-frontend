/**
 * Интерфейс для представления валюты
 */
export interface Currency {
  id: number;
  code: string;
  name: string;
  char: string;
  currency?: number;
}

/**
 * Интерфейс для строки сводки по валютам
 */
export interface SummaryRow {
  title: string;
  url: string;
  items: {
    title: string;
    value: number;
  }[];
}

/**
 * Интерфейс для сводки по валютам
 */
export interface CurrencySummary {
  title: string;
  rows: SummaryRow[];
}

/**
 * Интерфейс полного ответа от API по валютам
 */
export interface CurrencyResponse {
  current: Currency[];
  summary: CurrencySummary;
}