import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  constructor() { }

  /**
   * Вычисляет точную сумму чисел из массива
   * @param values Массив чисел или строковых представлений чисел
   * @returns Сумма с точностью до 2 знаков после запятой
   */
  calculateSum(values: (number | string | null | undefined)[]): number {
    const numbers = this._convertToNumbers(values);
    const sum = numbers.reduce((acc, curr) => this._preciseAdd(acc, curr), 0);
    return this._roundToTwoDecimals(sum);
  }

  /**
   * Вычисляет произведение чисел из массива
   * @param values Массив чисел или строковых представлений чисел
   * @returns Произведение с точностью до 2 знаков после запятой
   */
  calculateProduct(values: (number | string | null | undefined)[]): number {
    const numbers = this._convertToNumbers(values);
    
    // Если массив пустой или все значения нулевые - возвращаем 0
    if (numbers.length === 0 || numbers.every(num => num === 0)) {
      return 0;
    }

    const product = numbers.reduce((acc, curr) => this._preciseMultiply(acc, curr), 1);
    return this._roundToTwoDecimals(product);
  }

  /**
   * Расчет ставки с учетом минимального и фиксированного значений
   * @param price Базовое значение (цена)
   * @param value Множитель
   * @param options Опциональные параметры {min?: number, fix?: number}
   * @returns Результат расчета с точностью до 2 знаков после запятой
   */
  calculateRate(
    price: number | string | null | undefined,
    value: number | string | null | undefined,
    options: { min?: number | string | null; fix?: number | string | null } = {}
  ): number {
    const numPrice = this._safeConvertToNumber(price);
    const numValue = this._safeConvertToNumber(value);
    const numMin = options.min !== undefined ? this._safeConvertToNumber(options.min) : undefined;
    const numFix = options.fix !== undefined ? this._safeConvertToNumber(options.fix) : undefined;

    // Если price или value равны 0 или не переданы - возвращаем 0
    if (numPrice === 0 || numValue === 0) {
      return 0;
    }

    let result = this._preciseMultiply(numPrice, numValue);

    // Применяем минимальное значение (если передано и не равно 0)
    if (numMin !== undefined && numMin !== 0 && result < numMin) {
      result = numMin;
    }

    // Применяем фиксированное значение (если передано и не равно 0)
    if (numFix !== undefined && numFix !== 0) {
      result = this._preciseAdd(result, numFix);
    }

    return this._roundToTwoDecimals(result);
  }

  // ========== ПРИВАТНЫЕ МЕТОДЫ ==========

  /**
   * Точное сложение чисел с плавающей запятой
   */
  private _preciseAdd(a: number, b: number): number {
    const aDecimals = (a.toString().split('.')[1] || '').length;
    const bDecimals = (b.toString().split('.')[1] || '').length;
    const maxDecimals = Math.max(aDecimals, bDecimals);
    const factor = Math.pow(10, maxDecimals);
    
    return (a * factor + b * factor) / factor;
  }

  /**
   * Точное умножение чисел с плавающей запятой
   */
  private _preciseMultiply(a: number, b: number): number {
    const aDecimals = (a.toString().split('.')[1] || '').length;
    const bDecimals = (b.toString().split('.')[1] || '').length;
    const factor = Math.pow(10, aDecimals + bDecimals);
    
    const aInt = a * Math.pow(10, aDecimals);
    const bInt = b * Math.pow(10, bDecimals);
    
    return (aInt * bInt) / factor;
  }

  /**
   * Округление до 2 знаков после запятой
   */
  private _roundToTwoDecimals(num: number): number {
    // Если число целое - возвращаем без дробной части
    if (Number.isInteger(num)) {
      return num;
    }
    return parseFloat((Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2));
  }

  /**
   * Конвертирует массив значений в массив чисел
   */
  private _convertToNumbers(values: (number | string | null | undefined)[]): number[] {
    return values.map(value => this._safeConvertToNumber(value));
  }

  /**
   * Безопасная конвертация в число с обработкой null/undefined/некорректных строк
   */
  private _safeConvertToNumber(value: number | string | null | undefined): number {
    if (value === null || value === undefined || value === '') {
      return 0;
    }

    // Если уже число - возвращаем как есть
    if (typeof value === 'number') {
      return value;
    }

    // Заменяем запятые на точки и удаляем пробелы
    const cleanedValue = value.toString()
      .replace(/,/g, '.')
      .replace(/\s/g, '');

    const num = parseFloat(cleanedValue);
    return isNaN(num) ? 0 : num;
  }
}